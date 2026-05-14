import { NextResponse } from 'next/server';
import { getResearchPosts } from '@/sanity/lib/research';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://parishinvestments.com';

function xmlEscape(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export async function GET() {
  const posts = await getResearchPosts();

  const items = posts
    .map((post) => {
      const link = `${baseUrl}/research/${post.slug}`;
      return `
        <item>
          <title>${xmlEscape(post.title)}</title>
          <link>${xmlEscape(link)}</link>
          <guid>${xmlEscape(link)}</guid>
          <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
          <description>${xmlEscape(post.dek)}</description>
        </item>`;
    })
    .join('');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>Parish &amp; Company Research</title>
        <link>${xmlEscape(`${baseUrl}/research`)}</link>
        <description>Original analysis from Parish &amp; Company.</description>
        ${items}
      </channel>
    </rss>`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
