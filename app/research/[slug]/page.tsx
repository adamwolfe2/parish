import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Kicker } from '@/components/editorial/Kicker';
import { FadeIn } from '@/components/motion/FadeIn';
import { ResearchCard } from '@/components/editorial/ResearchCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { PostBody } from '@/components/editorial/PostBody';
import { CitationWidget } from '@/components/editorial/CitationWidget';
import { Newsletter } from '@/components/editorial/Newsletter';
import {
  loadAllPosts,
  getPostBySlug,
  formatPostDate,
  getAdjacentPosts,
  estimateReadingMinutes,
} from '@/lib/research';
import { getPostBody } from '@/lib/post-body';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://parishinvestments.com';

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

  const body = getPostBody(slug);
  const readingMin = estimateReadingMinutes(body?.bodyHtml, body?.bodyText);
  const { previous, next } = getAdjacentPosts(slug);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: 'en-US',
    url: `${siteUrl}/research/${post.slug}`,
    author: { '@type': 'Person', '@id': `${siteUrl}#bill-parish`, name: 'Bill Parish' },
    publisher: { '@id': `${siteUrl}#organization` },
    keywords: post.categories.join(', ') || undefined,
    image: `${siteUrl}/research/${post.slug}/opengraph-image`,
    wordCount: body?.bodyText ? body.bodyText.split(/\s+/).length : undefined,
  };

  return (
    <article>
      <JsonLd data={articleSchema} />

      {/* Header */}
      <header className="border-b border-[var(--color-hairline)] bg-[var(--color-bone)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-14 md:py-20">
          <FadeIn>
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-slate)] font-[family-name:var(--font-mono)] font-medium"
            >
              <Link href="/research" className="hover:text-[var(--color-moss)] transition-colors">
                Research
              </Link>
              {post.categories[0] && (
                <>
                  <span aria-hidden="true" className="text-[var(--color-hairline-strong)]">/</span>
                  <Link
                    href={`/research?topic=${encodeURIComponent(post.categories[0])}`}
                    className="text-[var(--color-moss)] hover:text-[var(--color-basalt)] transition-colors"
                  >
                    {post.categories[0]}
                  </Link>
                </>
              )}
            </nav>

            <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.015em] text-[var(--color-basalt)] max-w-[860px]">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-6 max-w-[700px] text-[var(--text-lead)] leading-[1.55] text-[var(--color-slate)]">
                {post.excerpt}
              </p>
            )}

            <div className="mt-9 pt-6 border-t border-[var(--color-hairline)] flex flex-wrap gap-x-7 gap-y-2 text-[0.85rem] text-[var(--color-slate)]">
              <span className="text-[var(--color-basalt)] font-medium">By Bill Parish</span>
              <span aria-hidden="true" className="text-[var(--color-hairline-strong)]">·</span>
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              {readingMin > 0 && (
                <>
                  <span aria-hidden="true" className="text-[var(--color-hairline-strong)]">·</span>
                  <span>{readingMin} min read</span>
                </>
              )}
            </div>
          </FadeIn>
        </div>
      </header>

      {/* Body */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-bone)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-14 md:py-20">
          <FadeIn>
            <div className="max-w-[700px] mx-auto">
              {body?.bodyHtml ? (
                <PostBody html={body.bodyHtml} />
              ) : (
                <div className="prose-editorial">
                  {post.excerpt && <p>{post.excerpt}</p>}
                  <p className="text-[var(--color-slate)] italic">
                    The full text of this research note is being migrated. In the interim,
                    the original publication is preserved at the legacy archive.
                  </p>
                  {post.url && (
                    <p>
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-editorial"
                      >
                        <span>View on the legacy archive</span>
                        <span className="arrow">→</span>
                      </a>
                    </p>
                  )}
                </div>
              )}

              {/* Post footer — sources + sharing + citation + subscribe */}
              <div className="mt-14 pt-8 border-t border-[var(--color-hairline-strong)] space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-[0.85rem] text-[var(--color-slate)]">
                  <p>
                    Originally published <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time> by Bill Parish.
                  </p>
                  <ShareLinks slug={slug} title={post.title} />
                </div>

                <CitationWidget
                  title={post.title}
                  publishedAt={post.publishedAt}
                  url={`${siteUrl}/research/${post.slug}`}
                />

                <Newsletter
                  variant="card"
                  heading="Subscribe to research"
                  dek="Receive new research notes from Parish & Company by email. No marketing, no third-party data sharing."
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Prev / next navigation */}
      {(previous || next) && (
        <section className="border-b border-[var(--color-hairline)] bg-[var(--color-mist)]/40">
          <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-10 md:py-14">
            <div className="grid gap-px md:grid-cols-2 bg-[var(--color-hairline)] border border-[var(--color-hairline)]">
              <AdjacentLink direction="previous" post={previous} />
              <AdjacentLink direction="next" post={next} />
            </div>
          </div>
        </section>
      )}

      {/* Related research */}
      {related.length > 0 && (
        <section className="border-b border-[var(--color-hairline)] bg-[var(--color-bone)]">
          <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-16 md:py-20">
            <FadeIn>
              <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
                <div>
                  <Kicker className="mb-3">Related research</Kicker>
                  <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.55rem,2.5vw,2rem)] leading-[1.2] tracking-tight text-[var(--color-basalt)]">
                    More on {post.categories[0] || 'this topic'}.
                  </h2>
                </div>
                <Link
                  href={`/research${post.categories[0] ? `?topic=${encodeURIComponent(post.categories[0])}` : ''}`}
                  className="link-editorial text-[0.95rem]"
                >
                  <span>Browse the archive</span>
                  <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.05} className="mt-10">
              <ul className="border-y border-[var(--color-hairline)]">
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

function AdjacentLink({
  direction,
  post,
}: {
  direction: 'previous' | 'next';
  post: { slug: string; title: string; publishedAt: string } | null;
}) {
  if (!post) {
    return (
      <div className="bg-[var(--color-bone)]/40 p-6 md:p-8 min-h-[120px]" />
    );
  }
  const label = direction === 'previous' ? 'Previous note' : 'Next note';
  const arrow = direction === 'previous' ? '←' : '→';
  return (
    <Link
      href={`/research/${post.slug}`}
      className={`group block bg-[var(--color-bone)] p-6 md:p-8 transition-colors hover:bg-white ${
        direction === 'next' ? 'md:text-right' : ''
      }`}
    >
      <p
        className={`flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-slate)] font-medium ${
          direction === 'next' ? 'md:justify-end' : ''
        }`}
      >
        {direction === 'previous' && <span aria-hidden="true">{arrow}</span>}
        <span>{label}</span>
        {direction === 'next' && <span aria-hidden="true">{arrow}</span>}
      </p>
      <p className="mt-3 font-[family-name:var(--font-display)] text-[1.05rem] md:text-[1.15rem] leading-[1.25] text-[var(--color-basalt)] group-hover:text-[var(--color-moss)] transition-colors">
        {post.title}
      </p>
      <p className="mt-2 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.1em] text-[var(--color-slate)]">
        {formatPostDate(post.publishedAt)}
      </p>
    </Link>
  );
}

function ShareLinks({ slug, title }: { slug: string; title: string }) {
  const url = `${siteUrl}/research/${slug}`;
  const encoded = encodeURIComponent(url);
  const encTitle = encodeURIComponent(title);
  return (
    <div className="flex items-center gap-4 text-[0.8rem]">
      <span className="font-[family-name:var(--font-mono)] uppercase tracking-[0.14em] text-[var(--color-slate)]">
        Share
      </span>
      <a
        href={`mailto:?subject=${encTitle}&body=${encoded}`}
        className="text-[var(--color-slate)] hover:text-[var(--color-moss)] transition-colors"
      >
        Email
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--color-slate)] hover:text-[var(--color-moss)] transition-colors"
      >
        LinkedIn
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encTitle}&url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--color-slate)] hover:text-[var(--color-moss)] transition-colors"
      >
        X
      </a>
    </div>
  );
}
