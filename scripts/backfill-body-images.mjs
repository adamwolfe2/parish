#!/usr/bin/env node
/**
 * Backfill inline images into Sanity post bodies.
 *
 * Root cause this fixes: the original migration converted bodyHtml with
 * htmlToBlocks() but passed no `rules`, so block-tools silently dropped every
 * <img>. 160 posts lost 487 images. uploadImage() existed but was never wired
 * into the conversion path.
 *
 * The old WordPress origin (parishinvestments.com/wp-content/uploads) is gone —
 * it now serves the Next.js site — but the WordPress.com media library behind it
 * is still live at parishinvestments.files.wordpress.com. We rewrite to that.
 *
 * Usage:
 *   SANITY_AUTH_TOKEN=sk... node scripts/backfill-body-images.mjs [--dry-run] [--only=slug]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';
import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';
import { JSDOM } from 'jsdom';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const POSTS_DIR = path.join(root, 'content/posts');
const CACHE = path.join(root, '.image-cache');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const ONLY = (() => {
  const a = args.find((x) => x.startsWith('--only='));
  return a ? new Set(a.split('=')[1].split(',')) : null;
})();

const token = process.env.SANITY_AUTH_TOKEN;
if (!token && !DRY_RUN) {
  console.error('Missing SANITY_AUTH_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4he5cl9g',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  token,
  useCdn: false,
});

// ---------- URL resolution ----------
// Jetpack Photon (i0.wp.com/<origin-without-scheme>) proxies the real origin.
// Bill's own uploads live on the still-live WordPress.com media host.
export function resolveSrc(src) {
  let u = String(src).trim();
  const photon = u.match(/^https?:\/\/i\d\.wp\.com\/(.+)$/);
  if (photon) u = 'https://' + photon[1];
  u = u.split('?')[0].split('#')[0];
  const own = u.match(/^https?:\/\/(?:www\.)?parishinvestments\.(?:com|wpcomstaging\.com)\/wp-content\/uploads\/(.+)$/);
  if (own) return 'https://parishinvestments.files.wordpress.com/' + own[1];
  return u;
}

// ---------- schema for block-tools ----------
const defaultSchema = Schema.compile({
  name: 'default',
  types: [
    {
      type: 'object',
      name: 'post',
      fields: [
        {
          name: 'body',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'H4', value: 'h4' },
                { title: 'Quote', value: 'blockquote' },
              ],
              lists: [
                { title: 'Bullet', value: 'bullet' },
                { title: 'Numbered', value: 'number' },
              ],
              marks: {
                decorators: [
                  { title: 'Strong', value: 'strong' },
                  { title: 'Emphasis', value: 'em' },
                ],
                annotations: [{ type: 'object', name: 'link', fields: [{ type: 'url', name: 'href' }] }],
              },
            },
            { type: 'image' },
          ],
        },
      ],
    },
  ],
});
const blockContentType = defaultSchema.get('post').fields.find((f) => f.name === 'body').type;

function cleanHtml(html) {
  return html
    .replace(/\sclass="[^"]*"/g, '')
    .replace(/\sstyle="[^"]*"/g, '')
    .replace(/<!--[\s\S]*?-->/g, '');
}

function imgSrcs(html) {
  const dom = new JSDOM(cleanHtml(html));
  return [...dom.window.document.querySelectorAll('img')].map((el) => ({
    src: el.getAttribute('src') || '',
    alt: el.getAttribute('alt') || '',
  }));
}

// ---------- fetch + upload, with an on-disk cache so reruns are cheap ----------
const UA = { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36' };

async function download(url) {
  fs.mkdirSync(CACHE, { recursive: true });
  const key = path.join(CACHE, encodeURIComponent(url).slice(-180));
  if (fs.existsSync(key) && fs.statSync(key).size > 0) return fs.readFileSync(key);
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 100) throw new Error('too small');
  fs.writeFileSync(key, buf);
  return buf;
}

// image-<hash>-<w>x<h>-<ext>  ->  https://cdn.sanity.io/images/<proj>/<ds>/<hash>-<w>x<h>.<ext>
export function assetUrl(assetId) {
  const m = /^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/.exec(assetId);
  if (!m) throw new Error(`unexpected asset id: ${assetId}`);
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4he5cl9g';
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${m[1]}-${m[2]}.${m[3]}`;
}

async function mapWithLimit(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        out[idx] = await fn(items[idx], idx);
      }
    }),
  );
  return out;
}

// ---------- main ----------
const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.json'));
const posts = files
  .map((f) => JSON.parse(fs.readFileSync(path.join(POSTS_DIR, f), 'utf8')))
  .filter((p) => p.slug && p.bodyHtml && (!ONLY || ONLY.has(p.slug)));

const wanted = new Map(); // resolvedUrl -> null | assetId
for (const p of posts) for (const { src } of imgSrcs(p.bodyHtml)) {
  if (/^https?:/i.test(src)) wanted.set(resolveSrc(src), null);
}

const withImgs = posts.filter((p) => imgSrcs(p.bodyHtml).some((i) => /^https?:/i.test(i.src)));
console.log(`posts: ${posts.length}  with images: ${withImgs.length}  unique images: ${wanted.size}`);

if (DRY_RUN) {
  const urls = [...wanted.keys()];
  const probe = await mapWithLimit(urls.slice(0, 40), 10, async (u) => {
    try { await download(u); return true; } catch { return false; }
  });
  console.log(`[dry-run] probe 40 urls -> reachable ${probe.filter(Boolean).length}/40`);
  process.exit(0);
}

console.log('\n→ Uploading images to Sanity (content-addressed, duplicates collapse)...');
let ok = 0, fail = 0;
const failures = [];
await mapWithLimit([...wanted.keys()], 6, async (url) => {
  try {
    const buf = await download(url);
    const asset = await client.assets.upload('image', buf, {
      filename: decodeURIComponent(path.basename(new URL(url).pathname)),
    });
    wanted.set(url, asset._id);
    if (++ok % 25 === 0) console.log(`   uploaded ${ok}/${wanted.size}`);
  } catch (err) {
    fail++;
    failures.push({ url, err: err.message });
    wanted.set(url, null);
  }
});
console.log(`✓ images: ${ok} uploaded, ${fail} unavailable`);
if (failures.length) fs.writeFileSync(path.join(root, 'scripts/.image-failures.json'), JSON.stringify(failures, null, 2));

// Persist resolvedUrl -> Sanity CDN url so the local bodyHtml rewrite (below)
// and any rerun can reuse it without re-uploading.
const cdnByResolved = Object.fromEntries(
  [...wanted.entries()].filter(([, id]) => id).map(([url, id]) => [url, assetUrl(id)]),
);
fs.writeFileSync(path.join(root, 'scripts/.image-map.json'), JSON.stringify(cdnByResolved, null, 2));

// rules run synchronously, so the asset map must already be populated
const rules = [
  {
    deserialize(el, next, block) {
      if (el.tagName?.toLowerCase() !== 'img') return undefined;
      const assetId = wanted.get(resolveSrc(el.getAttribute('src') || ''));
      if (!assetId) return undefined; // drop unrecoverable images rather than emit a broken ref
      return block({
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
        alt: el.getAttribute('alt') || undefined,
      });
    },
  },
];

console.log('\n→ Patching post bodies...');
const existing = await client.fetch('*[_type=="post"]{_id,"slug":slug.current}');
const idBySlug = new Map(existing.map((p) => [p.slug, p._id]));

let patched = 0, skipped = 0, noMatch = 0;
for (const p of posts) {
  const _id = idBySlug.get(p.slug);
  if (!_id) { noMatch++; continue; }
  const blocks = htmlToBlocks(cleanHtml(p.bodyHtml), blockContentType, {
    parseHtml: (html) => new JSDOM(html).window.document,
    rules,
  });
  const imgCount = blocks.filter((b) => b._type === 'image').length;
  if (!imgCount) { skipped++; continue; }
  await client.patch(_id).set({ body: blocks }).commit({ visibility: 'async' });
  patched++;
  if (patched % 25 === 0) console.log(`   patched ${patched}`);
}
console.log(`\n✓ done. patched ${patched}, no images ${skipped}, slug not in Sanity ${noMatch}`);

// ---------- rewrite local bodyHtml to the Sanity CDN ----------
// The article pages render content/posts/*.json bodyHtml directly (lib/post-body.ts),
// NOT the Sanity body — so Sanity alone does not fix the broken images on the site.
// Point every <img src> at the asset we now own.
console.log('\n→ Rewriting local bodyHtml image URLs to the Sanity CDN...');
let filesChanged = 0, srcRewritten = 0, srcUnresolved = 0;
for (const f of files) {
  const fp = path.join(POSTS_DIR, f);
  const json = JSON.parse(fs.readFileSync(fp, 'utf8'));
  if (!json.bodyHtml || (ONLY && !ONLY.has(json.slug))) continue;
  let changed = false;
  const next = json.bodyHtml.replace(/(<img\b[^>]*?\bsrc=")([^"]+)(")/gi, (m, pre, src, post) => {
    if (src.startsWith('https://cdn.sanity.io/')) return m;
    const cdn = cdnByResolved[resolveSrc(src)];
    if (!cdn) { srcUnresolved++; return m; }
    changed = true; srcRewritten++;
    return pre + cdn + post;
  });
  if (!changed) continue;
  fs.writeFileSync(fp, JSON.stringify({ ...json, bodyHtml: next }, null, 2) + '\n');
  filesChanged++;
}
console.log(`✓ rewrote ${srcRewritten} image urls across ${filesChanged} files (${srcUnresolved} unresolved)`);
