import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Kicker } from '@/components/editorial/Kicker';
import { FadeIn } from '@/components/motion/FadeIn';
import { ResearchCard } from '@/components/editorial/ResearchCard';
import { loadAllPosts, getPostBySlug, formatPostDate } from '@/lib/research';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return loadAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Research' };
  return {
    title: post.title,
    description: post.excerpt || `Parish & Company research, ${formatPostDate(post.publishedAt)}.`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default async function ResearchPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const all = loadAllPosts();
  const related = all
    .filter((p) => p.slug !== post.slug && p.categories.some((c) => post.categories.includes(c)))
    .slice(0, 3);

  return (
    <article>
      <header className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-16 md:py-24">
          <FadeIn>
            <div className="max-w-[760px]">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.78rem] uppercase tracking-[0.1em] text-[var(--color-slate)] font-[family-name:var(--font-mono)] font-medium">
                <Link href="/research" className="hover:text-[var(--color-moss)]">Research</Link>
                {post.categories[0] && (
                  <>
                    <span aria-hidden="true">·</span>
                    <Link
                      href={`/research?topic=${encodeURIComponent(post.categories[0])}`}
                      className="text-[var(--color-moss)] hover:text-[var(--color-basalt)]"
                    >
                      {post.categories[0]}
                    </Link>
                  </>
                )}
              </div>

              <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] tracking-[-0.015em] text-[var(--color-basalt)]">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="mt-6 text-[var(--text-lead)] leading-[1.55] text-[var(--color-slate)]">
                  {post.excerpt}
                </p>
              )}

              <div className="mt-8 pt-6 border-t border-[var(--color-hairline)] flex flex-wrap gap-x-6 gap-y-2 text-[0.88rem] text-[var(--color-slate)]">
                <span>
                  <span className="text-[var(--color-basalt)] font-medium">By Bill Parish</span>
                </span>
                <span>·</span>
                <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              </div>
            </div>
          </FadeIn>
        </div>
      </header>

      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-16 md:py-20">
          <FadeIn>
            <div className="max-w-[680px] mx-auto prose-editorial">
              {post.excerpt && <p>{post.excerpt}</p>}
              <p className="text-[var(--color-slate)] italic">
                The full text of this research note will be available here once content migration
                is complete. In the interim, the original publication is preserved at the legacy
                archive.
              </p>
              {post.url && (
                <p>
                  <a href={post.url} target="_blank" rel="noopener noreferrer" className="link-editorial">
                    <span>View on the legacy archive</span>
                    <span className="arrow">→</span>
                  </a>
                </p>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-b border-[var(--color-hairline)] bg-[var(--color-mist)]/40">
          <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-16 md:py-20">
            <FadeIn>
              <Kicker className="mb-5">Related research</Kicker>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.55rem,2.5vw,2rem)] leading-[1.2] tracking-tight text-[var(--color-basalt)]">
                More from this topic.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1} className="mt-10">
              <ul className="border-t border-[var(--color-hairline)]">
                {related.map((p) => (
                  <li key={p.slug}>
                    <ResearchCard post={p} size="md" />
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </section>
      )}
    </article>
  );
}
