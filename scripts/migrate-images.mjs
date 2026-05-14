#!/usr/bin/env node
/**
 * Repair migration for posts whose original WordPress body was image-only
 * (screenshots of news articles with no text). htmlToBlocks discards those
 * because they have no block-level text content.
 *
 * This script:
 *   1. Finds posts where Sanity body is empty
 *   2. Extracts img src URLs from the original bodyHtml
 *   3. Uploads each image to Sanity as a permanent asset
 *   4. Replaces the body with image blocks + a fallback text note
 *
 * Usage:
 *   SANITY_AUTH_TOKEN=sk... node scripts/migrate-images.mjs [--dry-run] [--only=slug]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const ONLY = (() => {
  const a = args.find((x) => x.startsWith('--only='));
  return a ? new Set(a.split('=')[1].split(',')) : null;
})();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4he5cl9g';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_AUTH_TOKEN;

if (!token && !DRY_RUN) {
  console.error('\n✗ Missing SANITY_AUTH_TOKEN.\n');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  token,
  useCdn: false,
});

const POSTS_DIR = path.join(root, 'content/posts');

function randomKey() {
  return Math.random().toString(36).slice(2, 14);
}

// ---------- find empty-body posts in Sanity ----------
async function getEmptyBodyPosts() {
  const query = `*[_type=="post" && (!defined(body) || count(body) == 0)]{"slug": slug.current, _id, title}`;
  return await client.fetch(query);
}

async function uploadFromUrl(url) {
  try {
    const cleanUrl = url.replace(/&amp;/g, '&').split('?')[0]; // strip query string + decode entities
    console.log('   uploading', cleanUrl.slice(0, 80));
    const res = await fetch(cleanUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Sanity Migrator)' },
    });
    if (!res.ok) {
      console.log('   ! fetch failed:', res.status);
      return null;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const filename = path.basename(new URL(cleanUrl).pathname);
    const asset = await client.assets.upload('image', buf, { filename });
    return asset._id;
  } catch (err) {
    console.log('   ! upload error:', err.message);
    return null;
  }
}

function extractImageSrcs(html) {
  const doc = new JSDOM(html).window.document;
  const imgs = [...doc.querySelectorAll('img')];
  return imgs
    .map((img) => img.getAttribute('data-orig-file') || img.getAttribute('src'))
    .filter((s) => s && /^https?:\/\//.test(s));
}

async function repairPost(post) {
  const slug = post.slug;
  const bodyFile = path.join(POSTS_DIR, `${slug}.json`);
  if (!fs.existsSync(bodyFile)) {
    console.log(`  - ${slug}: no source file`);
    return { skipped: true };
  }
  const data = JSON.parse(fs.readFileSync(bodyFile, 'utf8'));
  const html = data.bodyHtml || '';
  const srcs = extractImageSrcs(html);

  if (srcs.length === 0) {
    console.log(`  - ${slug}: no images found in source`);
    return { skipped: true };
  }

  console.log(`  · ${slug}: ${srcs.length} image(s)`);
  if (DRY_RUN) return { ok: true, dry: true, imageCount: srcs.length };

  const blocks = [];
  for (const src of srcs) {
    const assetId = await uploadFromUrl(src);
    if (assetId) {
      blocks.push({
        _key: randomKey(),
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
      });
    }
  }

  // Add a citation block at the end if there's a link in the original HTML
  const doc = new JSDOM(html).window.document;
  const links = [...doc.querySelectorAll('a[href^="http"]')].filter(
    (a) => !a.getAttribute('href').includes('parishinvestments.com')
            && !a.getAttribute('href').includes('billparish.com'),
  );
  if (links.length > 0) {
    blocks.push({
      _key: randomKey(),
      _type: 'block',
      style: 'normal',
      children: [
        { _key: randomKey(), _type: 'span', marks: [], text: 'Read the original article: ' },
        {
          _key: randomKey(),
          _type: 'span',
          marks: ['linkMark'],
          text: links[0].textContent.trim() || 'source',
        },
      ],
      markDefs: [
        {
          _key: 'linkMark',
          _type: 'link',
          href: links[0].getAttribute('href'),
        },
      ],
    });
  }

  if (blocks.length === 0) {
    console.log(`   ! no successful uploads — leaving as-is`);
    return { failed: true };
  }

  await client.patch(post._id).set({ body: blocks }).commit();
  console.log(`   ✓ patched with ${blocks.length} blocks`);
  return { ok: true, blockCount: blocks.length };
}

// ---------- main ----------
(async () => {
  const posts = await getEmptyBodyPosts();
  console.log(`\n• Found ${posts.length} posts with empty body in Sanity`);

  const targets = ONLY ? posts.filter((p) => ONLY.has(p.slug)) : posts;
  if (targets.length === 0) {
    console.log('Nothing to migrate. Exiting.');
    return;
  }

  console.log(`→ Repairing ${targets.length} posts${DRY_RUN ? ' (dry run)' : ''}...\n`);

  let success = 0;
  let failed = 0;
  let skipped = 0;
  for (const p of targets) {
    try {
      const r = await repairPost(p);
      if (r.ok) success++;
      else if (r.skipped) skipped++;
      else failed++;
    } catch (err) {
      console.log(`  ✗ ${p.slug}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n• ${success} repaired, ${failed} failed, ${skipped} skipped`);

  if (!DRY_RUN) {
    console.log('\nFiring revalidation webhook...');
    await fetch('https://parishinvestments.vercel.app/api/revalidate?secret=fb96b4147f6a38e1325ce02d5e75f1a4', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _type: 'post' }),
    });
    console.log('✓ Done');
  }
})();
