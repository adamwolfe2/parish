import { ImageResponse } from 'next/og';
import { getPostBySlug, formatPostDate, loadAllPosts } from '@/lib/research';

export const alt = 'Parish & Company research';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  return loadAllPosts().map((p) => ({ slug: p.slug }));
}

type Params = Promise<{ slug: string }>;

export default async function Image({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title || 'Research';
  const date = post ? formatPostDate(post.publishedAt) : '';
  const topic = post?.categories[0];

  const displayTitle = title.length > 140 ? title.slice(0, 137) + '…' : title;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#F7F4EE',
          padding: '64px 80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'serif',
          color: '#1A1F2B',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#4A6B4F',
              fontWeight: 500,
            }}
          >
            {topic ? `${topic} · Parish & Company` : 'Parish & Company Research'}
          </div>
          <div
            style={{
              fontSize: displayTitle.length > 80 ? 56 : 68,
              lineHeight: 1.08,
              letterSpacing: '-0.015em',
              fontWeight: 400,
              maxWidth: 1040,
            }}
          >
            {displayTitle}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ height: 1, width: '100%', background: 'rgba(26, 31, 43, 0.12)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#525866' }}>
            <span>By Bill Parish</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
