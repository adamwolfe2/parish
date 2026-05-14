import fs from 'node:fs';
import path from 'node:path';

export type ResearchPost = {
  slug: string;
  title: string;
  publishedAt: string;
  categories: string[];
  excerpt?: string;
  url?: string;
};

type RawIndexEntry = {
  url?: string;
  slug?: string;
  title?: string;
  date?: string;
  publishedAt?: string;
  categories?: string[];
  excerpt?: string;
};

const SCRAPED_INDEX_PATH = path.join(process.cwd(), 'scraped', 'post-index.json');
const FALLBACK_INDEX_PATH = path.join(process.cwd(), 'content', 'post-index.json');

let cache: ResearchPost[] | null = null;

function slugFromUrl(url: string | undefined, fallback: string): string {
  if (!url) return fallback;
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] || fallback;
  } catch {
    return fallback;
  }
}

function normalize(raw: RawIndexEntry, idx: number): ResearchPost | null {
  const title = (raw.title || '').replace(/&#8217;/g, "'").replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&#8211;/g, '–').trim();
  if (!title) return null;
  const publishedAt = raw.publishedAt || raw.date || '';
  if (!publishedAt) return null;
  const slug = raw.slug || slugFromUrl(raw.url, `post-${idx}`);
  const categories = (raw.categories || []).filter((c) => c && c !== 'Uncategorized');
  const excerpt = raw.excerpt
    ? raw.excerpt
        .replace(/<[^>]+>/g, '')
        .replace(/&#8217;/g, "'")
        .replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"')
        .replace(/&#8211;/g, '–')
        .replace(/&amp;/g, '&')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    : undefined;
  return { slug, title, publishedAt, categories, excerpt, url: raw.url };
}

/**
 * Async loader that merges Sanity-authored posts with the file-based
 * archive. Sanity entries win on slug collisions. Use this in route
 * handlers and pages where async is OK.
 */
export async function loadAllPostsAsync(): Promise<ResearchPost[]> {
  const file = loadAllPosts();
  try {
    const { fetchSanityPosts } = await import('@/sanity/lib/research-source');
    const sanity = await fetchSanityPosts();
    if (sanity.length === 0) return file;
    const bySlug = new Map<string, ResearchPost>();
    for (const p of file) bySlug.set(p.slug, p);
    for (const p of sanity) bySlug.set(p.slug, p); // Sanity overrides
    return Array.from(bySlug.values()).sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  } catch {
    return file;
  }
}

export function loadAllPosts(): ResearchPost[] {
  if (cache) return cache;
  let raw: RawIndexEntry[] = [];
  const tryPath = fs.existsSync(SCRAPED_INDEX_PATH)
    ? SCRAPED_INDEX_PATH
    : fs.existsSync(FALLBACK_INDEX_PATH)
    ? FALLBACK_INDEX_PATH
    : null;
  if (tryPath) {
    try {
      const text = fs.readFileSync(tryPath, 'utf8');
      raw = JSON.parse(text);
    } catch {
      raw = [];
    }
  }
  const posts = raw
    .filter((p) => {
      const t = (p.title || '').toUpperCase();
      if (t.startsWith('DRAFT')) return false;
      if (t.startsWith('ROUGH DRAFT')) return false;
      const slug = p.slug || (p.url || '').split('/').filter(Boolean).pop() || '';
      if (/^(draft|rough-draft)-/i.test(slug)) return false;
      return true;
    })
    .map((entry, i) => normalize(entry, i))
    .filter((p): p is ResearchPost => p !== null)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  cache = posts;
  return posts;
}

export function getLatestPosts(limit = 6): ResearchPost[] {
  return loadAllPosts().slice(0, limit);
}

export function getFeaturedPosts(): ResearchPost[] {
  try {
    const file = path.join(process.cwd(), 'content', 'featured-research.json');
    if (!fs.existsSync(file)) return [];
    const data = JSON.parse(fs.readFileSync(file, 'utf8')) as { slugs?: string[] };
    const all = loadAllPosts();
    const map = new Map(all.map((p) => [p.slug, p] as const));
    return (data.slugs || [])
      .map((s) => map.get(s))
      .filter((p): p is ResearchPost => Boolean(p));
  } catch {
    return [];
  }
}

export function getAllCategories(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of loadAllPosts()) {
    for (const c of p.categories) {
      counts.set(c, (counts.get(c) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllYears(): { year: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of loadAllPosts()) {
    const y = p.publishedAt.slice(0, 4);
    counts.set(y, (counts.get(y) || 0) + 1);
  }
  if (counts.size === 0) return [];
  // Fill in missing years between min and max so the archive doesn't appear to skip.
  const years = Array.from(counts.keys()).map((y) => parseInt(y, 10));
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const result: { year: string; count: number }[] = [];
  for (let y = maxYear; y >= minYear; y--) {
    const key = String(y);
    result.push({ year: key, count: counts.get(key) || 0 });
  }
  return result;
}

export function getPostBySlug(slug: string): ResearchPost | null {
  return loadAllPosts().find((p) => p.slug === slug) || null;
}

export function getAdjacentPosts(slug: string): { previous: ResearchPost | null; next: ResearchPost | null } {
  const posts = loadAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { previous: null, next: null };
  // Newest first in array, so "previous" (older) is at higher idx
  return {
    next: idx > 0 ? posts[idx - 1] : null,
    previous: idx < posts.length - 1 ? posts[idx + 1] : null,
  };
}

/**
 * Estimate reading time from a body HTML or plain text string.
 * Uses 220 words/min — relaxed pace for substantive analysis.
 */
export function estimateReadingMinutes(html?: string, text?: string): number {
  const source = text || (html ? html.replace(/<[^>]+>/g, ' ') : '');
  if (!source) return 0;
  const words = source.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatPostDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso.slice(0, 10);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
