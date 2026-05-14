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
    .filter((p) => !((p.title || '').toUpperCase().startsWith('DRAFT')))
    .map((entry, i) => normalize(entry, i))
    .filter((p): p is ResearchPost => p !== null)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  cache = posts;
  return posts;
}

export function getLatestPosts(limit = 6): ResearchPost[] {
  return loadAllPosts().slice(0, limit);
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
  return Array.from(counts.entries())
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => (a.year < b.year ? 1 : -1));
}

export function getPostBySlug(slug: string): ResearchPost | null {
  return loadAllPosts().find((p) => p.slug === slug) || null;
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
