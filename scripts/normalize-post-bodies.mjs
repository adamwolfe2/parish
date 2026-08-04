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

const stats = { emptyFigures: 0, demotedH1: 0, emptyParas: 0, imageRows: 0, captions: 0, subheads: 0, files: 0 };

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
  // Depth-aware scan: a non-greedy /<figure>...<\/figure>/ mis-matches an
  // already-grouped row (outer open + first inner close) and would re-wrap it
  // on every run. Collect only top-level figures so this stays idempotent.
  const found = [];
  {
    const tagRe = /<(\/?)figure\b[^>]*>/g;
    let depth = 0, start = -1, m;
    while ((m = tagRe.exec(html))) {
      if (!m[1]) {
        if (depth === 0) start = m.index;
        depth++;
      } else if (depth > 0 && --depth === 0) {
        const text = html.slice(start, m.index + m[0].length);
        found.push({ 0: text, index: start });
      }
    }
  }
  const chunks = [];
  let cursor = 0;
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
      if (/<figure\b/.test(m[0].slice(m[0].indexOf('>') + 1))) return false; // already a row
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

  // Pull the label line that follows an image into the figure as a real caption.
  //
  // Bill wrote these as ordinary bold paragraphs ("Henry Kravis      George
  // Roberts"), so they currently render as body copy sitting under a picture.
  // For a row of N images whose label splits into exactly N segments, each name
  // is attached to the image it belongs to — which is what the &nbsp; runs were
  // reaching for. Otherwise the whole line captions the figure.
  {
    const topLevel = [];
    const tagRe = /<(\/?)figure\b[^>]*>/g;
    let depth = 0, start = -1, m;
    while ((m = tagRe.exec(html))) {
      if (!m[1]) { if (depth === 0) start = m.index; depth++; }
      else if (depth > 0 && --depth === 0) topLevel.push([start, m.index + m[0].length]);
    }
    const out = [];
    let cur = 0;
    for (const [s, e] of topLevel) {
      const fig = html.slice(s, e);
      if (/<\/figcaption>\s*<\/figure>\s*$/.test(fig)) continue; // already captioned
      const pm = /^\s*<p\b[^>]*>([\s\S]*?)<\/p>/.exec(html.slice(e));
      if (!pm) continue;
      const inner = pm[1].trim();
      const text = inner.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
      if (!text || text.length > 140 || /<a\b/i.test(inner)) continue;
      const isBold = /^\s*<strong>[\s\S]*?<\/strong>\s*(<br\s*\/?>)?\s*$/.test(inner);
      const kids = (fig.match(/<figure\b/g) || []).length - 1; // children of a grouped row
      const segments = text.split(/(?:\s|\u00a0){3,}/).map((x) => x.trim()).filter(Boolean);
      let rebuilt = null;
      if (kids >= 2 && segments.length === kids) {
        // per-image labels: "Preet Bharara      Geoffrey Berman" under a 2-up row
        let n = 0;
        rebuilt = fig.replace(/<\/figure>/g, (close, offset) =>
          offset === fig.length - close.length ? close : `<figcaption>${segments[n++] ?? ''}</figcaption></figure>`);
      } else if (isBold) {
        rebuilt = fig.replace(/<\/figure>\s*$/, `<figcaption>${text}</figcaption></figure>`);
      }
      if (!rebuilt) continue;
      out.push(html.slice(cur, s), rebuilt);
      cur = e + pm[0].length;
      stats.captions++;
    }
    if (out.length) { out.push(html.slice(cur)); html = out.join(''); }
  }

  // Bill marked section breaks by bolding a short line rather than using a
  // heading style — a very common WordPress habit. Promote those to real
  // headings so the posts get an outline instead of an unbroken wall.
  // Skips link lines, bare dates, and anything that reads as a sentence.
  html = html.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/g, (whole, inner) => {
    const trimmed = inner.trim();
    if (!/^\s*<strong>[\s\S]*?<\/strong>\s*(<br\s*\/?>)?\s*$/.test(trimmed)) return whole;
    if (/<a\b/i.test(trimmed)) return whole;
    const text = trimmed.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
    if (!text || text.length > 90) return whole;
    if (/[.!?]["”]?$/.test(text)) return whole;
    if (/^[A-Z][a-z]+ \d{1,2}, \d{4}$/.test(text)) return whole; // bare date line
    stats.subheads++;
    return `<h3>${text}</h3>`;
  });

  // A trailing <br> inside a bold paragraph makes <strong> stop being the only
  // element child, which breaks the `p:has(> strong:only-child)` rule that
  // styles Bill's key statements. Purely cosmetic to remove.
  html = html
    .replace(/(<br\s*\/?>\s*)+<\/strong>/gi, '</strong>')
    .replace(/<\/strong>(\s*<br\s*\/?>\s*)+<\/p>/gi, '</strong></p>');

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
  `${DRY ? '[dry-run] ' : ''}files touched ${stats.files} · empty figures removed ${stats.emptyFigures} · h1 demoted ${stats.demotedH1} · posts with blank-paragraph cleanup ${stats.emptyParas} · image rows grouped ${stats.imageRows} · captions ${stats.captions} · subheads ${stats.subheads}`,
);
