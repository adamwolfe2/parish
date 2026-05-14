import { mockPosts, type ResearchPost } from '@/data/research';
import { sanityClient } from '@/sanity/lib/client';
import { postBySlugQuery, postsQuery } from '@/sanity/lib/queries';

type SanityTopic = { title: string; slug: string };
type SanityPost = {
  title: string;
  slug: string;
  dek?: string;
  publishedAt: string;
  estimatedReadMinutes?: number;
  topics?: SanityTopic[];
};

function normalizePost(post: SanityPost): ResearchPost {
  return {
    title: post.title,
    slug: post.slug,
    dek: post.dek ?? '',
    publishedAt: post.publishedAt,
    estimatedReadMinutes: post.estimatedReadMinutes ?? 5,
    topics: post.topics ?? [],
  };
}

export async function getResearchPosts(): Promise<ResearchPost[]> {
  if (!sanityClient) return mockPosts;

  try {
    const posts = await sanityClient.fetch<SanityPost[]>(postsQuery);
    if (!posts?.length) return mockPosts;
    return posts.map(normalizePost);
  } catch {
    return mockPosts;
  }
}

export async function getResearchPostBySlug(slug: string): Promise<ResearchPost | null> {
  if (!sanityClient) return mockPosts.find((entry) => entry.slug === slug) ?? null;

  try {
    const post = await sanityClient.fetch<SanityPost | null>(postBySlugQuery, { slug });
    if (!post) return null;
    return normalizePost(post);
  } catch {
    return mockPosts.find((entry) => entry.slug === slug) ?? null;
  }
}
