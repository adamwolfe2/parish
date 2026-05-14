#!/usr/bin/env node
// Scrape full post bodies from parishinvestments.com for each entry in
// content/post-index.json. Saves to content/posts/<slug>.json. Resumable
// (skips slugs already on disk). Respectful: 500ms sleep, max 3 concurrent.
// Caps total runtime at 15 minutes.

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const INDEX_PATH = path.join(ROOT, 'content/post-index.json')
const POSTS_DIR = path.join(ROOT, 'content/posts')
const LOG_PATH = path.join(POSTS_DIR, '_scrape-log.txt')
const MANIFEST_PATH = path.join(POSTS_DIR, '_manifest.json')

const SLEEP_MS = 500
const MAX_CONCURRENT = 3
const MAX_RUNTIME_MS = 15 * 60 * 1000
const REQUEST_TIMEOUT_MS = 30 * 1000
const USER_AGENT =
  'Mozilla/5.0 (compatible; ParishSiteRebuild/1.0; +https://parishinvestments.com/)'

const startTime = Date.now()

function timeLeft() {
  return MAX_RUNTIME_MS - (Date.now() - startTime)
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function appendLog(line) {
  const stamped = `[${new Date().toISOString()}] ${line}\n`
  process.stdout.write(stamped)
  try {
    await fs.appendFile(LOG_PATH, stamped, 'utf8')
  } catch {
    // ignore log write errors
  }
}

function deriveSlugFromUrl(url) {
  // URL like https://parishinvestments.com/2024/06/13/<slug>/
  try {
    const u = new URL(url)
    const parts = u.pathname.split('/').filter(Boolean)
    return parts[parts.length - 1] || null
  } catch {
    return null
  }
}

function decodeHtmlEntities(s) {
  if (!s) return s
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '…')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rdquo;/g, '”')
    .replace(/&ldquo;/g, '“')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)))
}

function htmlToText(html) {
  if (!html) return ''
  let txt = html
  // drop script/style
  txt = txt.replace(/<script[\s\S]*?<\/script>/gi, '')
  txt = txt.replace(/<style[\s\S]*?<\/style>/gi, '')
  // turn block-level closes into newlines
  txt = txt.replace(/<\/(p|div|li|h[1-6]|blockquote|tr|br|pre)>/gi, '\n')
  txt = txt.replace(/<br\s*\/?>/gi, '\n')
  // strip remaining tags
  txt = txt.replace(/<[^>]+>/g, '')
  txt = decodeHtmlEntities(txt)
  // collapse 3+ newlines to 2
  txt = txt.replace(/\n{3,}/g, '\n\n')
  // trim each line
  txt = txt
    .split('\n')
    .map((l) => l.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .trim()
  return txt
}

function extractImages(html) {
  if (!html) return []
  const images = []
  const seen = new Set()
  const re = /<img\b[^>]*>/gi
  let m
  while ((m = re.exec(html)) !== null) {
    const tag = m[0]
    const srcMatch = tag.match(/\bsrc=["']([^"']+)["']/i)
    if (!srcMatch) continue
    const src = srcMatch[1]
    if (seen.has(src)) continue
    seen.add(src)
    const altMatch = tag.match(/\balt=["']([^"']*)["']/i)
    images.push({ src, alt: altMatch ? decodeHtmlEntities(altMatch[1]) : '' })
  }
  return images
}

async function fetchWithTimeout(url, opts = {}, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      ...opts,
      signal: controller.signal,
      headers: {
        'User-Agent': USER_AGENT,
        Accept: opts.acceptJson ? 'application/json' : 'text/html,application/xhtml+xml',
        ...(opts.headers || {}),
      },
      redirect: 'follow',
    })
    return res
  } finally {
    clearTimeout(timer)
  }
}

async function tryWpApi(slug) {
  const apiUrl = `https://parishinvestments.com/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}`
  const res = await fetchWithTimeout(apiUrl, { acceptJson: true })
  if (!res.ok) {
    throw new Error(`WP API HTTP ${res.status}`)
  }
  const data = await res.json()
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('WP API empty result')
  }
  const post = data[0]
  return {
    source: 'wp-api',
    title: decodeHtmlEntities(post.title?.rendered || ''),
    publishedAt: post.date || null,
    bodyHtml: post.content?.rendered || '',
  }
}

function extractEntryContentFromHtml(html) {
  // Look for the typical WordPress post content wrapper
  // Try several patterns
  const patterns = [
    /<div\b[^>]*class=["'][^"']*\bentry-content\b[^"']*["'][^>]*>([\s\S]*?)<\/div>\s*(?:<footer|<div class="sharedaddy|<div id="jp-relatedposts|<div class="entry-meta|<\/article)/i,
    /<div\b[^>]*class=["'][^"']*\bentry-content\b[^"']*["'][^>]*>([\s\S]*)/i,
    /<article\b[^>]*>([\s\S]*?)<\/article>/i,
    /<main\b[^>]*>([\s\S]*?)<\/main>/i,
  ]
  for (const re of patterns) {
    const m = html.match(re)
    if (m && m[1] && m[1].length > 200) {
      let body = m[1]
      // Strip share/related/comments tail that may have leaked in
      body = body.replace(/<div class=["']sharedaddy[\s\S]*?<\/div>\s*<\/div>/gi, '')
      body = body.replace(/<div id=["']jp-relatedposts[\s\S]*?<\/div>/gi, '')
      body = body.replace(/<div\b[^>]*class=["'][^"']*comments[\s\S]*$/i, '')
      return body.trim()
    }
  }
  return null
}

function extractTitleFromHtml(html) {
  const m = html.match(/<h1\b[^>]*class=["'][^"']*entry-title[^"']*["'][^>]*>([\s\S]*?)<\/h1>/i)
  if (m) return decodeHtmlEntities(m[1].replace(/<[^>]+>/g, '').trim())
  const og = html.match(/<meta\b[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i)
  if (og) return decodeHtmlEntities(og[1])
  const t = html.match(/<title>([\s\S]*?)<\/title>/i)
  if (t) return decodeHtmlEntities(t[1].trim())
  return ''
}

function extractDateFromHtml(html) {
  const m = html.match(/<meta\b[^>]*property=["']article:published_time["'][^>]*content=["']([^"']+)["']/i)
  if (m) return m[1]
  const t = html.match(/<time\b[^>]*datetime=["']([^"']+)["']/i)
  if (t) return t[1]
  return null
}

async function tryHtml(url) {
  const res = await fetchWithTimeout(url)
  if (!res.ok) {
    throw new Error(`HTML HTTP ${res.status}`)
  }
  const html = await res.text()
  const body = extractEntryContentFromHtml(html)
  if (!body) {
    throw new Error('HTML: no entry-content found')
  }
  return {
    source: 'html',
    title: extractTitleFromHtml(html),
    publishedAt: extractDateFromHtml(html),
    bodyHtml: body,
  }
}

async function scrapeOne(entry) {
  const slug = deriveSlugFromUrl(entry.url)
  if (!slug) {
    return { ok: false, slug: null, url: entry.url, error: 'cannot derive slug' }
  }
  const outPath = path.join(POSTS_DIR, `${slug}.json`)
  // resume: skip if exists
  try {
    await fs.access(outPath)
    return { ok: true, slug, skipped: true }
  } catch {
    // not present, continue
  }

  let result
  let firstErr = null
  try {
    result = await tryWpApi(slug)
  } catch (err) {
    firstErr = err
    try {
      result = await tryHtml(entry.url)
    } catch (err2) {
      return {
        ok: false,
        slug,
        url: entry.url,
        error: `wp-api: ${firstErr.message}; html: ${err2.message}`,
      }
    }
  }

  const bodyHtml = result.bodyHtml || ''
  const bodyText = htmlToText(bodyHtml)
  const images = extractImages(bodyHtml)
  const payload = {
    slug,
    title: result.title || decodeHtmlEntities(entry.title || ''),
    publishedAt: result.publishedAt || entry.date || null,
    bodyHtml,
    bodyText,
    images,
    source: result.source,
    sourceUrl: entry.url,
  }
  await fs.writeFile(outPath, JSON.stringify(payload, null, 2), 'utf8')
  return { ok: true, slug, source: result.source, bytes: bodyHtml.length }
}

async function main() {
  await fs.mkdir(POSTS_DIR, { recursive: true })
  await appendLog(`Scrape started. cap=${MAX_RUNTIME_MS}ms concurrency=${MAX_CONCURRENT} sleep=${SLEEP_MS}ms`)
  const raw = await fs.readFile(INDEX_PATH, 'utf8')
  const entries = JSON.parse(raw)
  await appendLog(`Loaded ${entries.length} entries from post-index.json`)

  const successes = []
  const failures = []
  const skipped = []
  let cursor = 0
  let timedOut = false

  async function worker(id) {
    while (true) {
      if (timedOut) return
      if (timeLeft() < 2000) {
        timedOut = true
        await appendLog(`worker ${id}: runtime cap reached, stopping`)
        return
      }
      const i = cursor++
      if (i >= entries.length) return
      const entry = entries[i]
      const label = `${i + 1}/${entries.length}`
      try {
        const r = await scrapeOne(entry)
        if (r.ok && r.skipped) {
          skipped.push(r.slug)
          await appendLog(`${label} SKIP ${r.slug} (already on disk)`)
        } else if (r.ok) {
          successes.push({ slug: r.slug, source: r.source, bytes: r.bytes })
          await appendLog(`${label} OK   ${r.slug} (${r.source}, ${r.bytes}B)`)
        } else {
          failures.push({ slug: r.slug, url: r.url, error: r.error })
          await appendLog(`${label} FAIL ${r.slug || r.url}: ${r.error}`)
        }
      } catch (err) {
        failures.push({ slug: deriveSlugFromUrl(entry.url), url: entry.url, error: err.message })
        await appendLog(`${label} ERR  ${entry.url}: ${err.message}`)
      }
      // pacing
      await sleep(SLEEP_MS)
    }
  }

  const workers = Array.from({ length: MAX_CONCURRENT }, (_, i) => worker(i + 1))
  await Promise.all(workers)

  const manifest = {
    scrapedAt: new Date().toISOString(),
    totalEntries: entries.length,
    successes: successes.length,
    skipped: skipped.length,
    failures: failures.length,
    timedOut,
    runtimeMs: Date.now() - startTime,
    successSlugs: successes.map((s) => s.slug),
    skippedSlugs: skipped,
    failureDetails: failures,
  }
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8')
  await appendLog(
    `Done. success=${successes.length} skipped=${skipped.length} failures=${failures.length} timedOut=${timedOut}`,
  )
}

main().catch(async (err) => {
  await appendLog(`FATAL: ${err.stack || err.message}`)
  process.exit(1)
})
