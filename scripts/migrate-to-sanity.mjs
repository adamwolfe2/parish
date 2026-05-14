#!/usr/bin/env node
/**
 * Migrate the 203 WordPress research notes into Sanity.
 *
 * Reads:
 *   content/posts/*.json            — bodies + metadata scraped from WP
 *   content/post-index.json         — slug/title/date/categories
 *   content/featured-research.json  — editor-curated featured slugs
 *
 * Writes (idempotent, by deterministic _id):
 *   topic     documents — one per distinct WordPress category
 *   post      documents — one per slug, with body as Portable Text
 *
 * Usage:
 *   SANITY_AUTH_TOKEN=sk... \
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=4he5cl9g \
 *   NEXT_PUBLIC_SANITY_DATASET=production \
 *   node scripts/migrate-to-sanity.mjs [--dry-run] [--limit N] [--only=slug-1,slug-2] [--skip-images]
 *
 * The auth token must have Editor or Administrator rights. Create one at:
 *   https://www.sanity.io/manage/project/4he5cl9g/api → Tokens → Add API token
 *
 * Re-running is safe: each document's _id is derived from the slug, so a
 * second pass updates existing records rather than creating duplicates.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';
import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const SKIP_IMAGES = args.includes('--skip-images');
const LIMIT = (() => {
  const a = args.find((x) => x.startsWith('--limit'));
  if (!a) return Infinity;
  return parseInt(a.split('=')[1] || args[args.indexOf(a) + 1] || '0', 10) || Infinity;
})();
const ONLY = (() => {
  const a = args.find((x) => x.startsWith('--only='));
  if (!a) return null;
  return new Set(a.split('=')[1].split(','));
})();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4he5cl9g';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

if (!token && !DRY_RUN) {
  console.error('\n✗ Missing SANITY_AUTH_TOKEN (Editor role or higher).');
  console.error('  Create one at https://www.sanity.io/manage/project/' + projectId + '/api');
  console.error('  Then re-run with: SANITY_AUTH_TOKEN=sk... node scripts/migrate-to-sanity.mjs\n');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  token,
  useCdn: false,
});

const INDEX_FILE = path.join(root, 'content/post-index.json');
const POSTS_DIR = path.join(root, 'content/posts');
const FEATURED_FILE = path.join(root, 'content/featured-research.json');

if (!fs.existsSync(INDEX_FILE)) {
  console.error('Missing', INDEX_FILE);
  process.exit(1);
}

const index = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));
const featured = JSON.parse(fs.readFileSync(FEATURED_FILE, 'utf8')).slugs || [];
const featuredSet = new Set(featured);

// ---------- helpers ----------
const slugFromUrl = (url, fallback) => {
  if (!url) return fallback;
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] || fallback;
  } catch {
    return fallback;
  }
};

const decodeEntities = (s) =>
  (s || '')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();

const slugify = (s) =>
  s.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 64);

const topicIdFor = (name) => `topic-${slugify(name)}`;
// Sanity document IDs are capped at ~128 chars. Long WordPress slugs exceed
// that, so we hash the tail and keep a readable prefix.
const postIdFor = (slug) => {
  const base = `post-${slug}`;
  if (base.length <= 100) return base;
  // Stable short hash from the slug (FNV-1a) so re-runs hit the same _id.
  let h = 0x811c9dc5;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = (h * 0x01000193) >>> 0;
  }
  return `${base.slice(0, 88)}-${h.toString(16)}`;
};

// ---------- step 1: gather distinct topics ----------
const topicNames = new Set();
for (const entry of index) {
  const title = decodeEntities(entry.title || '');
  if (!title) continue;
  if (/^DRAFT/i.test(title) || /^ROUGH DRAFT/i.test(title)) continue;
  const slug = entry.slug || slugFromUrl(entry.url, '');
  if (/^(draft|rough-draft)-/i.test(slug)) continue;
  for (const c of entry.categories || []) {
    if (c && c !== 'Uncategorized') topicNames.add(c);
  }
}
console.log(`\n• Discovered ${topicNames.size} distinct topics:`);
for (const n of [...topicNames].sort()) console.log('   -', n);

// ---------- step 2: upsert topics ----------
async function migrateTopics() {
  const transactions = client.transaction();
  for (const name of topicNames) {
    const doc = {
      _id: topicIdFor(name),
      _type: 'topic',
      title: name,
      slug: { current: slugify(name) },
    };
    transactions.createOrReplace(doc);
  }
  if (DRY_RUN) {
    console.log('\n[dry-run] Would create/replace', topicNames.size, 'topic documents.');
    return;
  }
  console.log('\n→ Upserting', topicNames.size, 'topic documents...');
  await transactions.commit({ visibility: 'async' });
  console.log('✓ Topics done');
}

// ---------- step 3: convert + upload posts ----------
// Compile a minimal Sanity schema for block-tools so htmlToBlocks knows
// what marks/styles/annotations are permitted in our post body.
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
                annotations: [
                  {
                    type: 'object',
                    name: 'link',
                    fields: [{ type: 'url', name: 'href' }],
                  },
                ],
              },
            },
            { type: 'image' },
          ],
        },
      ],
    },
  ],
});
const blockContentType = defaultSchema
  .get('post')
  .fields.find((f) => f.name === 'body').type;

const blockToolsOpts = {
  parseHtml: (html) => new JSDOM(html).window.document,
};

async function uploadImage(srcUrl, alt) {
  if (SKIP_IMAGES) return null;
  try {
    const res = await fetch(srcUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 Sanity Migrator' },
    });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload('image', buf, {
      filename: path.basename(new URL(srcUrl).pathname),
    });
    return {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: alt || undefined,
    };
  } catch (err) {
    console.warn('   ! image upload failed for', srcUrl, err.message);
    return null;
  }
}

async function htmlToPortableText(html) {
  if (!html) return [];
  // Strip WordPress class/style cruft so block-tools doesn't choke.
  const cleaned = html
    .replace(/\sclass="[^"]*"/g, '')
    .replace(/\sstyle="[^"]*"/g, '')
    .replace(/<!--[\s\S]*?-->/g, '');
  return htmlToBlocks(cleaned, blockContentType, blockToolsOpts);
}

async function migratePost(entry, bodyData, idx, total) {
  const title = decodeEntities(entry.title || '');
  const slug = entry.slug || slugFromUrl(entry.url, `post-${idx}`);
  const publishedAt = entry.publishedAt || entry.date;
  if (!title || !publishedAt) return { skipped: 'missing fields' };

  const cats = (entry.categories || []).filter((c) => c && c !== 'Uncategorized');
  const topicRefs = cats.map((c) => ({
    _type: 'reference',
    _ref: topicIdFor(c),
    _key: slugify(c),
  }));

  const excerpt = entry.excerpt
    ? decodeEntities(entry.excerpt.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ')).slice(0, 500)
    : undefined;

  const body = await htmlToPortableText(bodyData?.bodyHtml || '');

  const doc = {
    _id: postIdFor(slug),
    _type: 'post',
    title,
    slug: { current: slug },
    publishedAt,
    excerpt,
    featured: featuredSet.has(slug),
    topics: topicRefs,
    body,
  };

  if (DRY_RUN) {
    return { ok: true, dryRun: true, blocks: body.length };
  }

  await client.createOrReplace(doc);
  return { ok: true, blocks: body.length };
}

async function migratePosts() {
  const eligible = index.filter((p) => {
    const t = decodeEntities(p.title || '');
    if (!t) return false;
    if (/^DRAFT/i.test(t) || /^ROUGH DRAFT/i.test(t)) return false;
    const s = p.slug || slugFromUrl(p.url, '');
    if (/^(draft|rough-draft)-/i.test(s)) return false;
    if (ONLY && !ONLY.has(s)) return false;
    return true;
  });

  const slice = eligible.slice(0, LIMIT);
  console.log(`\n→ Migrating ${slice.length} of ${eligible.length} eligible posts${DRY_RUN ? ' (dry run)' : ''}...\n`);

  let success = 0;
  let failed = 0;
  for (let i = 0; i < slice.length; i++) {
    const entry = slice[i];
    const slug = entry.slug || slugFromUrl(entry.url, `post-${i}`);
    const bodyFile = path.join(POSTS_DIR, `${slug}.json`);
    const bodyData = fs.existsSync(bodyFile) ? JSON.parse(fs.readFileSync(bodyFile, 'utf8')) : null;
    process.stdout.write(`  [${i + 1}/${slice.length}] ${slug.slice(0, 70).padEnd(70)} `);
    try {
      const res = await migratePost(entry, bodyData, i, slice.length);
      if (res.ok) {
        process.stdout.write(`✓ ${res.blocks ?? 0} blocks${res.dryRun ? ' (dry)' : ''}\n`);
        success++;
      } else {
        process.stdout.write(`- skipped (${res.skipped})\n`);
      }
    } catch (err) {
      process.stdout.write(`✗ ${err.message}\n`);
      failed++;
    }
  }

  console.log(`\n• ${success} succeeded, ${failed} failed, ${slice.length - success - failed} skipped`);
}

// ---------- main ----------
(async () => {
  console.log(`Sanity migration → ${projectId} / ${dataset}${DRY_RUN ? '  [DRY RUN]' : ''}`);
  await migrateTopics();
  await migratePosts();
  console.log('\n✓ Migration complete\n');
})().catch((err) => {
  console.error('\n✗ Migration failed:', err);
  process.exit(1);
});
