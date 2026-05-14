import { PageFade } from '@/components/motion/PageFade';

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <PageFade>
      <main className="container page">
        <section className="section">
          <h1 className="h1">Topic: {slug.replaceAll('-', ' ')}</h1>
          <p className="lead">Topic archive route scaffold is in place for Sanity-backed filtering in the next integration pass.</p>
        </section>
      </main>
    </PageFade>
  );
}
