import type { Metadata } from 'next';
import Link from 'next/link';
import { Kicker } from '@/components/editorial/Kicker';
import { ResearchCard } from '@/components/editorial/ResearchCard';
import { FadeIn } from '@/components/motion/FadeIn';
import { loadAllPosts, getAllCategories, getAllYears } from '@/lib/research';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Original analysis of corporate governance, tax structure, pensions, and capital markets — published by Parish & Company LLC since 1998.',
};

type SearchParams = Promise<{ topic?: string; year?: string; q?: string; page?: string }>;

const PAGE_SIZE = 20;

export default async function ResearchPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const all = loadAllPosts();
  const categories = getAllCategories().slice(0, 10);
  const years = getAllYears();

  const topic = sp.topic;
  const year = sp.year;
  const q = (sp.q || '').toLowerCase().trim();
  const page = Math.max(1, parseInt(sp.page || '1', 10) || 1);

  let filtered = all;
  if (topic) filtered = filtered.filter((p) => p.categories.includes(topic));
  if (year) filtered = filtered.filter((p) => p.publishedAt.startsWith(year));
  if (q) {
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.excerpt || '').toLowerCase().includes(q) ||
        p.categories.some((c) => c.toLowerCase().includes(q)),
    );
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const slice = filtered.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE);

  const buildHref = (overrides: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    const merged = { topic, year, q, page: String(pageSafe), ...overrides };
    for (const [k, v] of Object.entries(merged)) {
      if (v && v !== '1') params.set(k, v);
    }
    const s = params.toString();
    return s ? `/research?${s}` : '/research';
  };

  return (
    <>
      {/* Header */}
      <header className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-28">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <Kicker className="inline-block">Research</Kicker>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.15rem,4.2vw,3.5rem)] leading-[1.08] tracking-[-0.02em] text-[var(--color-basalt)]">
                Original analysis, published since 1998.
              </h1>
              <p className="mt-7 mx-auto max-w-2xl text-[var(--text-lead)] leading-[1.6] text-[var(--color-slate)]">
                {all.length} research notes on corporate governance, tax policy, pensions,
                capital markets, and the Pacific Northwest economy. Quoted in tier-one
                business journalism for more than two decades.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-12 flex flex-col sm:flex-row sm:items-end sm:justify-center gap-6 sm:gap-10 max-w-3xl mx-auto">
              <form action="/research" method="get" className="max-w-md flex-1">
                <label htmlFor="q" className="block text-[0.78rem] uppercase tracking-[0.12em] font-medium text-[var(--color-slate)] mb-2">
                  Search the archive
                </label>
                <div className="relative">
                  <input
                    id="q"
                    name="q"
                    type="search"
                    defaultValue={q}
                    placeholder="e.g. Romney IRA, Intel pension, Sondland"
                    className="w-full bg-transparent border-b border-[var(--color-hairline-strong)] py-2 pr-8 text-[1rem] focus:outline-none focus:border-[var(--color-moss)] transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--color-slate)] hover:text-[var(--color-moss)] transition-colors"
                    aria-label="Search the archive"
                  >
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </form>
              <Link
                href="/research/topics"
                className="link-editorial text-[0.95rem] self-start sm:self-end pb-2"
              >
                <span>Browse by topic</span>
                <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* Topic filter — wraps, no horizontal scroll */}
      <section className="bg-[var(--color-bone)] border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-5">
          <div className="flex flex-wrap items-center gap-1.5">
            <Link
              href={buildHref({ topic: undefined, page: undefined })}
              className={`inline-flex items-center min-h-[40px] px-3.5 py-2 text-[0.82rem] font-medium tracking-tight transition-colors ${
                !topic
                  ? 'bg-[var(--color-basalt)] text-[var(--color-bone)]'
                  : 'bg-transparent text-[var(--color-slate)] hover:text-[var(--color-basalt)] hover:bg-[var(--color-mist)]'
              }`}
            >
              All topics
            </Link>
            {categories.map((c) => (
              <Link
                key={c.name}
                href={buildHref({ topic: c.name, page: undefined })}
                className={`inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-[0.82rem] font-medium tracking-tight transition-colors ${
                  topic === c.name
                    ? 'bg-[var(--color-basalt)] text-[var(--color-bone)]'
                    : 'bg-transparent text-[var(--color-slate)] hover:text-[var(--color-basalt)] hover:bg-[var(--color-mist)]'
                }`}
              >
                <span>{c.name}</span>
                <span className={`tabular-nums text-[0.72rem] ${topic === c.name ? 'text-white/60' : 'text-[var(--color-slate)]/60'}`}>{c.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main feed + year sidebar */}
      <section>
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-12 md:py-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-9">
              {(topic || year || q) && (
                <div className="mb-8 flex flex-wrap items-center gap-3 text-[0.9rem] text-[var(--color-slate)]">
                  <span>Showing {total} {total === 1 ? 'note' : 'notes'}</span>
                  {topic && (
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 bg-[var(--color-mist)] text-[var(--color-basalt)] text-[0.82rem]">
                      Topic: {topic}
                      <Link href={buildHref({ topic: undefined, page: undefined })} className="hover:text-[var(--color-moss)]" aria-label="Remove topic filter">×</Link>
                    </span>
                  )}
                  {year && (
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 bg-[var(--color-mist)] text-[var(--color-basalt)] text-[0.82rem]">
                      Year: {year}
                      <Link href={buildHref({ year: undefined, page: undefined })} className="hover:text-[var(--color-moss)]" aria-label="Remove year filter">×</Link>
                    </span>
                  )}
                  {q && (
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 bg-[var(--color-mist)] text-[var(--color-basalt)] text-[0.82rem]">
                      &ldquo;{q}&rdquo;
                      <Link href={buildHref({ q: undefined, page: undefined })} className="hover:text-[var(--color-moss)]" aria-label="Clear search">×</Link>
                    </span>
                  )}
                </div>
              )}

              {slice.length === 0 ? (
                <div className="py-16 text-center text-[var(--color-slate)]">
                  No results. <Link href="/research" className="link-editorial"><span>Reset filters</span><span className="arrow">→</span></Link>
                </div>
              ) : (
                <ul className="border-b border-[var(--color-hairline)]">
                  {slice.map((post) => (
                    <li key={post.slug}>
                      <ResearchCard post={post} size="md" />
                    </li>
                  ))}
                </ul>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-10 flex items-center justify-between" aria-label="Pagination">
                  {pageSafe > 1 ? (
                    <Link
                      href={buildHref({ page: pageSafe > 2 ? String(pageSafe - 1) : undefined })}
                      className="inline-flex items-center min-h-[44px] text-[0.95rem] text-[var(--color-slate)] hover:text-[var(--color-basalt)] transition-colors"
                      rel="prev"
                    >
                      <span aria-hidden="true" className="mr-2">←</span>Previous
                    </Link>
                  ) : (
                    <span className="inline-flex items-center min-h-[44px] text-[0.95rem] text-[var(--color-slate)]/40 select-none" aria-hidden="true">
                      <span className="mr-2">←</span>Previous
                    </span>
                  )}
                  <span className="text-[0.9rem] text-[var(--color-slate)] font-[family-name:var(--font-mono)] tabular-nums">
                    Page {pageSafe} of {totalPages}
                  </span>
                  {pageSafe < totalPages ? (
                    <Link
                      href={buildHref({ page: String(pageSafe + 1) })}
                      className="inline-flex items-center min-h-[44px] text-[0.95rem] text-[var(--color-slate)] hover:text-[var(--color-basalt)] transition-colors"
                      rel="next"
                    >
                      Next<span aria-hidden="true" className="ml-2">→</span>
                    </Link>
                  ) : (
                    <span className="inline-flex items-center min-h-[44px] text-[0.95rem] text-[var(--color-slate)]/40 select-none" aria-hidden="true">
                      Next<span className="ml-2">→</span>
                    </span>
                  )}
                </nav>
              )}
            </div>

            {/* Year sidebar */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-40">
                <h2 className="text-[0.72rem] uppercase tracking-[0.15em] font-medium text-[var(--color-slate)] mb-5">
                  Archive by year
                </h2>
                <ul className="space-y-1.5 text-[0.92rem]">
                  {years.map((y) => (
                    <li key={y.year}>
                      <Link
                        href={buildHref({ year: year === y.year ? undefined : y.year, page: undefined })}
                        className={`group flex items-baseline justify-between gap-3 py-0.5 ${
                          year === y.year
                            ? 'text-[var(--color-basalt)] font-medium'
                            : 'text-[var(--color-slate)] hover:text-[var(--color-basalt)]'
                        }`}
                      >
                        <span className="font-[family-name:var(--font-mono)] tabular-nums">{y.year}</span>
                        <span className="flex-1 mx-2 border-b border-dotted border-[var(--color-hairline)]" />
                        <span className="font-[family-name:var(--font-mono)] tabular-nums text-[0.85rem]">{y.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
