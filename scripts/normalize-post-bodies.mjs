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

const stats = { emptyFigures: 0, demotedH1: 0, emptyParas: 0, imageRows: 0, files: 0 };

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

  // Group runs of consecutive SMALL images into a row.
  //
  // Bill stacked related images one after another — portraits of two US
  // Attorneys, then two more of Cohen and Khuzami — and in two posts typed
  // "Preet Bharara&nbsp;&nbsp;... Geoffrey Berman" underneath, which only makes
  // sense side by side. WordPress stacked them anyway (verified against the
  // Wayback Machine), so this renders his intent rather than reproducing a
  // limitation. 53 runs across the archive.
  //
  // Only small images group. Full-width document scans (ERISA filings, meeting
  // minutes) must keep the whole measure or the numbers become unreadable.
  const MAX_ROW_IMG_WIDTH = 500;
  const figureRe = /<figure\b[^>]*>[\s\S]*?<\/figure>/g;
  const chunks = [];
  let cursor = 0;
  const found = [...html.matchAll(figureRe)];
  let runStart = null;
  const flush = (run, endIdx) => {
    if (run.length < 2) return false;
    chunks.push(html.slice(cursor, run[0].index));
    // nested <figure> needs no class — CSS targets `figure:has(> figure)`,
    // which keeps the sanitiser allowlist untouched
    chunks.push('<figure>' + run.map((m) => m[0]).join('') + '</figure>');
    cursor = endIdx;
    stats.imageRows++;
    return true;
  };
  for (let i = 0; i < found.length; ) {
    const smallAt = (m) => {
      const w = /\bwidth="(\d+)"/.exec(m[0]);
      return w ? Number(w[1]) <= MAX_ROW_IMG_WIDTH : false;
    };
    if (!smallAt(found[i])) { i++; continue; }
    let j = i;
    const run = [];
    while (j < found.length && smallAt(found[j])) {
      // adjacent = only whitespace between this figure and the previous one
      if (run.length && html.slice(found[j - 1].index + found[j - 1][0].length, found[j].index).trim()) break;
      run.push(found[j]); j++;
    }
    if (run.length >= 2) flush(run, run[run.length - 1].index + run[run.length - 1][0].length);
    i = Math.max(j, i + 1);
  }
  if (chunks.length) { chunks.push(html.slice(cursor)); html = chunks.join(''); }

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
  `${DRY ? '[dry-run] ' : ''}files touched ${stats.files} · empty figures removed ${stats.emptyFigures} · h1 demoted ${stats.demotedH1} · posts with blank-paragraph cleanup ${stats.emptyParas} · image rows grouped ${stats.imageRows}`,
);
