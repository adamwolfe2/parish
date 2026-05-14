/**
 * Hybrid research source. Posts from Sanity (new content authored by Bill)
 * are merged with the file-based archive (203 historical WordPress posts
 * we migrated). Sanity entries take precedence over file entries with the
 * same slug.
 *
 * This lets Bill start publishing immediately via Sanity Studio while the
 * legacy archive keeps serving as a read-only research backstop.
 */
import { sanityClient } from './client';
import { postsQuery, postBySlugQuery } from './queries';
import { isSanityConfigured } from '@/sanity/env';
import type { ResearchPost } from '@/lib/research';

type SanityPostRow = {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt?: string;
  featured?: boolean;
  categories?: string[];
};

function normalize(row: SanityPostRow): ResearchPost {
  return {
    slug: row.slug,
    title: row.title,
    publishedAt: row.publishedAt,
    excerpt: row.excerpt,
    categories: row.categories || [],
    url: undefined,
  };
}

export async function fetchSanityPosts(): Promise<ResearchPost[]> {
  if (!isSanityConfigured || !sanityClient) return [];
  try {
    const rows = await sanityClient.fetch<SanityPostRow[]>(postsQuery, {}, {
      next: { revalidate: 60, tags: ['posts'] },
    });
    return (rows || []).map(normalize);
  } catch (err) {
    console.error('[sanity] fetchSanityPosts failed', err);
    return [];
  }
}

type SanityPostFull = SanityPostRow & {
  body?: unknown;
  sources?: { label?: string; url?: string }[];
  originalPublication?: string;
  originalPublicationUrl?: string;
  heroImage?: unknown;
  heroImageCaption?: string;
};

export async function fetchSanityPostBySlug(slug: string): Promise<SanityPostFull | null> {
  if (!isSanityConfigured || !sanityClient) return null;
  try {
    const row = await sanityClient.fetch<SanityPostFull | null>(postBySlugQuery, { slug }, {
      next: { revalidate: 60, tags: [`post:${slug}`] },
    });
    return row;
  } catch (err) {
    console.error('[sanity] fetchSanityPostBySlug failed', err);
    return null;
  }
}
