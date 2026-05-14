import type { MetadataRoute } from 'next';
import { loadAllPosts } from '@/lib/research';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://parishinvestments.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/research`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/philosophy`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/contact`, changeFrequency: 'yearly', priority: 0.5 },
  ];

  const posts: MetadataRoute.Sitemap = loadAllPosts().map((p) => ({
    url: `${siteUrl}/research/${p.slug}`,
    lastModified: p.publishedAt,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticPages, ...posts];
}
