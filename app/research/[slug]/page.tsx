import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageFade } from '@/components/motion/PageFade';
import { getResearchPostBySlug } from '@/sanity/lib/research';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://parishinvestments.com';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getResearchPostBySlug(slug);

  if (!post) {
    return { title: 'Research | Parish & Company' };
  }

  return {
    title: `${post.title} | Parish & Company`,
    description: post.dek,
    alternates: { canonical: `${baseUrl}/research/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.dek,
      type: 'article',
      publishedTime: post.publishedAt,
      url: `${baseUrl}/research/${post.slug}`,
    },
  };
}

export default async function ResearchPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getResearchPostBySlug(slug);

  if (!post) return notFound();

  return (
    <PageFade>
      <main className="container page">
        <section className="section">
          <p className="kicker">{post.topics[0]?.title ?? 'Research'}</p>
          <h1 className="h1">{post.title}</h1>
          <p className="meta">{post.publishedAt} · {post.estimatedReadMinutes} min read · By Bill Parish</p>
          <p className="lead">{post.dek}</p>
        </section>
        <section className="section">
          <p className="lead">This route is wired for Sanity fetch with a local fallback. Portable Text body rendering and source footnotes are next.</p>
          <p><Link href="/research" className="text-link">Back to research index →</Link></p>
        </section>
      </main>
    </PageFade>
  );
}
