import fs from 'node:fs';
import path from 'node:path';
import DOMPurify from 'isomorphic-dompurify';

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

const ALLOWED_TAGS = [
  'p', 'br', 'a', 'em', 'strong', 'i', 'b', 'u', 'span',
  'h2', 'h3', 'h4',
  'ul', 'ol', 'li',
  'blockquote', 'figure', 'figcaption',
  'img',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'hr',
];

const ALLOWED_ATTRS = [
  'href', 'title', 'rel', 'target',
  'src', 'alt', 'width', 'height', 'loading',
  'scope', 'colspan', 'rowspan',
];

// Allow only http/https/mailto/tel/relative URLs. Block javascript:/data:/vbscript:/file:.
const SAFE_URL_REGEX = /^(?:(?:https?|mailto|tel):|\/(?!\/)|#|\?|$)/i;

/**
 * DOM-based sanitizer for WordPress-imported post bodies.
 * Strips scripts, iframes, styles, dangerous protocols, event handlers,
 * forms, and any tag not on the allowlist.
 */
export function sanitizePostHtml(html: string): string {
  if (!html) return '';

  // Strip WordPress shortcodes before DOMPurify (DOMPurify doesn't know about them).
  let cleaned = html.replace(/\[[a-z0-9_-]+(?:\s[^\]]*)?\]/gi, '');

  // First pass: rewrite legacy WP permalinks to /research/<slug>.
  cleaned = cleaned.replace(/href="([^"]+)"/g, (m, raw: string) => {
    return `href="${rewriteInternalLink(raw)}"`;
  });

  // Use DOMPurify with a strict allowlist.
  const safe = DOMPurify.sanitize(cleaned, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ALLOWED_ATTRS,
    ALLOW_DATA_ATTR: false,
    ALLOWED_URI_REGEXP: SAFE_URL_REGEX,
    FORBID_TAGS: ['script', 'style', 'iframe', 'noscript', 'svg', 'math', 'object', 'embed', 'form', 'input', 'button'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style', 'class', 'id', 'srcset', 'sizes'],
    KEEP_CONTENT: true,
    USE_PROFILES: { html: true },
  });

  // Post-process anchor tags: add rel + target on external links, omit on internal.
  return safe.replace(
    /<a\s+([^>]*?)href="([^"]+)"([^>]*)>/gi,
    (match, before: string, href: string, after: string) => {
      const isInternal = href.startsWith('/') || href.startsWith('#');
      if (isInternal) return match;
      const hasRel = /rel=/i.test(before + after);
      const hasTarget = /target=/i.test(before + after);
      const additions = [
        hasRel ? '' : 'rel="noopener noreferrer"',
        hasTarget ? '' : 'target="_blank"',
      ].filter(Boolean).join(' ');
      return `<a ${before}href="${href}"${after}${additions ? ' ' + additions : ''}>`;
    },
  );
}

/**
 * Rewrite WordPress-style permalinks to the new /research/<slug> pattern.
 * Examples:
 *   /2012/02/22/inside-mitt-romneys-tax-return/ → /research/inside-mitt-romneys-tax-return
 *   /1998/07/13/post-name/                       → /research/post-name
 *   https://parishinvestments.com/2012/02/.../   → /research/<slug>
 */
function rewriteInternalLink(href: string): string {
  if (!href) return href;
  // Strip legacy domain to relative
  const stripped = href.replace(/^https?:\/\/(?:www\.)?parishinvestments\.com/i, '');
  const wpMatch = stripped.match(/^\/(\d{4})\/(\d{2})\/(\d{2})\/([^/?#]+)\/?(.*)$/);
  if (wpMatch) {
    const slug = wpMatch[4];
    const rest = wpMatch[5] || '';
    return `/research/${slug}${rest}`;
  }
  if (/^\/(blog|blog-2|blog-3|selected-media-archive)\/?$/i.test(stripped)) return '/research';
  if (/^\/(our-company|parish-company|services)\/?$/i.test(stripped)) return '/about';
  if (/^\/(investment-philosophy)\/?$/i.test(stripped)) return '/philosophy';
  return stripped || href;
}
