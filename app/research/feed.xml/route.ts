import { loadAllPosts, formatPostDate } from '@/lib/research';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://parishinvestments.com';

function xmlEscape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' } as const)[c] || c);
}

export const dynamic = 'force-static';

export async function GET() {
  const posts = loadAllPosts().slice(0, 50);
  const items = posts.map((p) => `
    <item>
      <title>${xmlEscape(p.title)}</title>
      <link>${siteUrl}/research/${p.slug}</link>
      <guid isPermaLink="true">${siteUrl}/research/${p.slug}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      ${p.excerpt ? `<description>${xmlEscape(p.excerpt)}</description>` : ''}
      ${p.categories.map((c) => `<category>${xmlEscape(c)}</category>`).join('')}
    </item>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Parish &amp; Company — Research</title>
    <link>${siteUrl}/research</link>
    <description>Original investment research from Parish &amp; Company LLC. Published since 1998.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/research/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  // intentionally referenced for clarity
  void formatPostDate;

  return new Response(xml, {
    headers: { 'content-type': 'application/rss+xml; charset=utf-8' },
  });
}
