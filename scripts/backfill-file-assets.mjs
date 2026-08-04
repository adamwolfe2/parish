#!/usr/bin/env node
/**
 * Same problem as backfill-body-images.mjs, different asset type: posts link out
 * to PDFs (press clippings) and MP3s (radio segments) that lived on the old
 * WordPress uploads path. That origin now serves this Next.js site, so every one
 * of those links 404s. Pull them into Sanity and repoint the hrefs.
 *
 * Usage: SANITY_AUTH_TOKEN=sk... node scripts/backfill-file-assets.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const POSTS_DIR = path.join(root, 'content/posts');

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) { console.error('Missing SANITY_AUTH_TOKEN'); process.exit(1); }

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4he5cl9g',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  token,
  useCdn: false,
});

const FILE_RE = /href="(https?:\/\/[^"]+\.(?:pdf|mp3|doc|docx|xls|xlsx|zip))"/gi;
const UA = { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36' };

function resolveHref(u) {
  const photon = u.match(/^https?:\/\/i\d\.wp\.com\/(.+)$/);
  if (photon) u = 'https://' + photon[1];
  u = u.split('?')[0];
  const own = u.match(/^https?:\/\/(?:www\.)?parishinvestments\.com\/wp-content\/uploads\/(.+)$/);
  return own ? 'https://parishinvestments.files.wordpress.com/' + own[1] : u;
}

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.json'));
const wanted = new Set();
for (const f of files) {
  const h = JSON.parse(fs.readFileSync(path.join(POSTS_DIR, f), 'utf8')).bodyHtml || '';
  for (const m of h.matchAll(FILE_RE)) wanted.add(m[1]);
}
console.log(`file assets referenced: ${wanted.size}`);

const map = {};
let ok = 0, fail = 0;
for (const original of wanted) {
  for (const candidate of [resolveHref(original), original]) {
    try {
      const res = await fetch(candidate, { headers: UA });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 200) continue;
      const asset = await client.assets.upload('file', buf, {
        filename: decodeURIComponent(path.basename(new URL(candidate).pathname)),
        contentType: res.headers.get('content-type') || undefined,
      });
      map[original] = asset.url;
      ok++;
      break;
    } catch { /* try next candidate */ }
  }
  if (!map[original]) fail++;
}
console.log(`✓ ${ok} uploaded, ${fail} unavailable`);

let rewritten = 0, dropped = 0, changedFiles = 0;
for (const f of files) {
  const fp = path.join(POSTS_DIR, f);
  const json = JSON.parse(fs.readFileSync(fp, 'utf8'));
  if (!json.bodyHtml) continue;
  let changed = false;
  const next = json.bodyHtml.replace(FILE_RE, (m, url) => {
    if (map[url]) { changed = true; rewritten++; return `href="${map[url]}"`; }
    if (/parishinvestments\.com\/wp-content|billparish\.files\.wordpress\.com|i\d\.wp\.com/.test(url)) {
      changed = true; dropped++; return 'data-dead-link=""'; // sanitizer drops unknown attrs
    }
    return m;
  });
  if (!changed) continue;
  fs.writeFileSync(fp, JSON.stringify({ ...json, bodyHtml: next }, null, 2) + '\n');
  changedFiles++;
}
console.log(`✓ ${rewritten} links repointed, ${dropped} dead links neutralised, ${changedFiles} posts touched`);
