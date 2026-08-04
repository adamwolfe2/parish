#!/usr/bin/env node
/**
 * One-time structural normalisation of the WordPress-imported post bodies.
 * Content-preserving only — this never invents or rewrites prose.
 *
 *  1. Drop <figure> wrappers left with no image (WordPress had some, and the
 *     dead-asset cleanup created more). They render as empty bordered boxes.
 *  2. Demote in-body <h1> to <h2>. The page template already renders the post
 *     title as the sole <h1>; a second one is oversized and wrong for SEO.
 *  3. Drop empty <p> / stray <br> runs left behind by removed embeds.
 *
 * Usage: node scripts/normalize-post-bodies.mjs [--dry-run]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, '..', 'content/posts');
const DRY = process.argv.includes('--dry-run');

const stats = { emptyFigures: 0, demotedH1: 0, emptyParas: 0, files: 0 };

for (const file of fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.json'))) {
  const fp = path.join(POSTS_DIR, file);
  const json = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const before = json.bodyHtml;
  if (!before) continue;
  let html = before;

  html = html.replace(/<figure\b[^>]*>([\s\S]*?)<\/figure>/gi, (m, inner) => {
    if (/<img\b/i.test(inner)) return m;
    stats.emptyFigures++;
    // keep any caption text so nothing readable is lost
    const caption = inner.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return caption ? `<p>${caption}</p>` : '';
  });

  html = html.replace(/<(\/?)h1\b([^>]*)>/gi, (m, slash, attrs) => {
    if (!slash) stats.demotedH1++;
    return `<${slash}h2${attrs}>`;
  });

  const beforeParas = html;
  html = html
    .replace(/<p\b[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, '')
    .replace(/(?:<br\s*\/?>\s*){3,}/gi, '<br />');
  if (html !== beforeParas) stats.emptyParas++;

  if (html === before) continue;
  stats.files++;
  if (!DRY) {
    fs.writeFileSync(fp, JSON.stringify({ ...json, bodyHtml: html }, null, 2) + '\n');
  }
}

console.log(
  `${DRY ? '[dry-run] ' : ''}files touched ${stats.files} · empty figures removed ${stats.emptyFigures} · h1 demoted ${stats.demotedH1} · posts with blank-paragraph cleanup ${stats.emptyParas}`,
);
