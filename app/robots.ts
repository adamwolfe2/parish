import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://parishinvestments.com';
// Block search engines on Vercel preview domains until the real domain is live.
const isPreview =
  siteUrl.includes('vercel.app') ||
  process.env.VERCEL_ENV === 'preview';

export default function robots(): MetadataRoute.Robots {
  if (isPreview) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    };
  }
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
