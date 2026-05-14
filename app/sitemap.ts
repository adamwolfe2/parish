import type { MetadataRoute } from 'next';
import { getResearchPosts } from '@/sanity/lib/research';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://parishinvestments.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/research', '/about', '/philosophy', '/contact'].map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const posts = await getResearchPosts();
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/research/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
