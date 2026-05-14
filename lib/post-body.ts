import fs from 'node:fs';
import path from 'node:path';

export type PostBody = {
  slug: string;
  title: string;
  publishedAt: string;
  bodyHtml: string;
  bodyText?: string;
  images?: { src: string; alt?: string }[];
};

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export function getPostBody(slug: string): PostBody | null {
  const file = path.join(POSTS_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as PostBody;
  } catch {
    return null;
  }
}

const ALLOWED_TAGS = new Set([
  'p', 'br', 'a', 'em', 'strong', 'i', 'b', 'u', 'span',
  'h2', 'h3', 'h4',
  'ul', 'ol', 'li',
  'blockquote', 'figure', 'figcaption',
  'img',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'hr',
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(['href', 'title', 'rel', 'target']),
  img: new Set(['src', 'alt', 'width', 'height', 'loading']),
  th: new Set(['scope', 'colspan', 'rowspan']),
  td: new Set(['colspan', 'rowspan']),
};

/**
 * Minimal HTML sanitizer for WordPress-imported post bodies.
 * Strips inline styles, scripts, iframes, embeds, classes — keeps semantic markup only.
 */
export function sanitizePostHtml(html: string): string {
  if (!html) return '';

  // Strip script/style blocks entirely
  let cleaned = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, '');

  // Strip WordPress shortcodes still in body
  cleaned = cleaned.replace(/\[[a-z0-9_-]+(?:\s[^\]]*)?\]/gi, '');

  // Walk tags and filter
  cleaned = cleaned.replace(/<\/?([a-z0-9]+)([^>]*?)\/?>/gi, (full, tag: string, attrs: string) => {
    const t = tag.toLowerCase();
    if (!ALLOWED_TAGS.has(t)) return '';
    const allowed = ALLOWED_ATTRS[t];
    if (!allowed || !attrs.trim()) {
      // Re-emit tag without attributes
      return full.startsWith('</') ? `</${t}>` : `<${t}>`;
    }
    const safeAttrs: string[] = [];
    const re = /([a-z-]+)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+)))?/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(attrs))) {
      const name = m[1].toLowerCase();
      if (!allowed.has(name)) continue;
      const value = (m[3] ?? m[4] ?? m[5] ?? '').trim();
      // Block javascript: URLs and data: URLs except images
      if (/^\s*javascript:/i.test(value)) continue;
      if (name === 'href' && /^\s*data:/i.test(value)) continue;
      // Rewrite legacy WordPress URLs to new /research routes
      let v = value;
      if (t === 'a' && name === 'href') {
        v = rewriteInternalLink(value);
        if (/^https?:\/\/(?:www\.)?parishinvestments\.com\//i.test(v)) {
          // External link to legacy site — strip to relative for rewrite
          v = v.replace(/^https?:\/\/(?:www\.)?parishinvestments\.com/i, '');
          v = rewriteInternalLink(v);
        }
        if (v.startsWith('/research/') || v.startsWith('/')) {
          // Internal — no target=_blank
          safeAttrs.push(`href="${escapeAttr(v)}"`);
          continue;
        }
      }
      if (t === 'a' && name === 'href' && /^https?:/i.test(v)) {
        safeAttrs.push(`href="${escapeAttr(v)}"`);
        continue;
      }
      safeAttrs.push(v ? `${name}="${escapeAttr(v)}"` : name);
    }
    if (t === 'a' && safeAttrs.some((a) => a.startsWith('href='))) {
      const hrefAttr = safeAttrs.find((a) => a.startsWith('href=')) || '';
      const isInternal = /href="\//.test(hrefAttr);
      if (!isInternal) {
        if (!safeAttrs.some((a) => a.startsWith('rel='))) safeAttrs.push('rel="noopener noreferrer"');
        if (!safeAttrs.some((a) => a.startsWith('target='))) safeAttrs.push('target="_blank"');
      }
    }
    if (t === 'img') {
      if (!safeAttrs.some((a) => a.startsWith('loading='))) safeAttrs.push('loading="lazy"');
    }
    const space = safeAttrs.length ? ' ' + safeAttrs.join(' ') : '';
    return full.startsWith('</') ? `</${t}>` : `<${t}${space}>`;
  });

  return cleaned.trim();
}

function escapeAttr(s: string): string {
  return s.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Rewrite WordPress-style permalinks to the new /research/<slug> pattern.
 * Examples:
 *   /2012/02/22/inside-mitt-romneys-tax-return/ → /research/inside-mitt-romneys-tax-return
 *   /1998/07/13/post-name/                       → /research/post-name
 */
function rewriteInternalLink(href: string): string {
  if (!href) return href;
  const wpMatch = href.match(/^\/(\d{4})\/(\d{2})\/(\d{2})\/([^/?#]+)\/?(.*)$/);
  if (wpMatch) {
    const slug = wpMatch[4];
    const rest = wpMatch[5] || '';
    return `/research/${slug}${rest}`;
  }
  // Legacy top-level pages
  if (/^\/(blog|blog-2|blog-3|selected-media-archive)\/?$/i.test(href)) return '/research';
  if (/^\/(our-company|parish-company|services)\/?$/i.test(href)) return '/about';
  if (/^\/(investment-philosophy)\/?$/i.test(href)) return '/philosophy';
  return href;
}
