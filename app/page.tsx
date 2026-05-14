import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '@/components/editorial/Hero';
import { PressMarks } from '@/components/editorial/PressMarks';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { EditorialLink } from '@/components/editorial/EditorialLink';
import { ResearchCard } from '@/components/editorial/ResearchCard';
import { MountainSilhouette } from '@/components/editorial/MountainSilhouette';
import { FadeIn } from '@/components/motion/FadeIn';
import { getLatestPosts, getFeaturedPosts } from '@/lib/research';

const services = [
  {
    title: 'Individual Investors',
    summary:
      'Evaluate current portfolio and mix of investments. Provide guidance in defining and setting investment goals. Recommend overall asset allocation based upon stated objectives.',
    items: [
      'Stocks, mutual funds, bonds, and other instruments',
      'Model portfolios for investors wanting simplicity',
      'Review of insurance, real estate, credit, and new-business decisions',
    ],
  },
  {
    title: 'Trusts & Foundations',
    summary:
      'Evaluate stated goals and objectives. Recommend a mix of high-quality investment alternatives. Conduct proprietary GAP analysis to monitor performance.',
    items: [
      'Evaluate outside money managers, if applicable',
      'Monitor all key aspects of the plan for fiduciary implications',
      'Meet with management and trustees as requested',
    ],
  },
  {
    title: 'Retirement Plans, 401K and 403B',
    summary:
      'Plan design and evaluation. Risk analysis, enrollment and education for participants. ERISA compliance reviews to reduce 404C fiduciary risk.',
    items: [
      'Quarterly performance briefings to management',
      'Constant focus on overall fee reduction',
      'Interface with key vendors to improve and simplify the plan',
    ],
  },
];

export default function HomePage() {
  const latest = getLatestPosts(4);
  const featured = getFeaturedPosts().slice(0, 3);

  return (
    <>
      <Hero />

      {/* Mission statement — clear value prop */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-bone)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="grid gap-10 md:grid-cols-12 md:gap-16 md:items-start">
              <div className="md:col-span-4">
                <p className="text-[0.72rem] uppercase tracking-[0.15em] font-medium text-[var(--color-moss)]">
                  Mission
                </p>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.015em] text-[var(--color-basalt)]">
                  Independent advice. <br />Original research. <br />No conflicts.
                </h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-[clamp(1.15rem,1.5vw,1.3rem)] leading-[1.55] text-[var(--color-basalt)]">
                  A nationally recognized registered investment management firm based in
                  Portland, Oregon specializing in asset management for individuals,
                  families, and institutions throughout the Northwest.
                </p>
                <p className="mt-6 text-[1.05rem] leading-[1.65] text-[var(--color-slate)]">
                  My goal is to make prudent decisions based upon each client&apos;s specific
                  needs. This requires a disciplined approach designed to achieve
                  competitive long-term returns while controlling risks.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services snapshot */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-mist)]/50">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeader
                kicker="What we do"
                title="Three categories of clients. One process."
                dek="A disciplined investment process applied across every relationship — with the same principal you'll always speak with."
              />
              <EditorialLink href="/about">Full services overview</EditorialLink>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-14">
            <div className="grid gap-6 md:grid-cols-3">
              {services.map((s) => (
                <article
                  key={s.title}
                  className="group relative bg-[var(--color-bone)] border border-[var(--color-hairline)] p-7 md:p-8 transition-all hover:border-[var(--color-moss)] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(20,23,31,0.08)]"
                >
                  <div className="absolute top-0 left-0 w-0 h-1 bg-[var(--color-moss)] transition-all duration-300 group-hover:w-full" />
                  <h3 className="font-[family-name:var(--font-display)] text-[1.4rem] leading-[1.2] text-[var(--color-basalt)]">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-[0.95rem] leading-[1.6] text-[var(--color-slate)]">
                    {s.summary}
                  </p>
                  <ul className="mt-6 pt-5 border-t border-[var(--color-hairline)] space-y-1.5">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[0.9rem] text-[var(--color-basalt)]">
                        <span aria-hidden="true" className="text-[var(--color-moss)] mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Press marks */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-16 md:py-20">
          <FadeIn>
            <PressMarks />
          </FadeIn>
        </div>
      </section>

      {/* Founder — color photo, big presence */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16 md:items-center">
            <FadeIn className="md:col-span-5">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden border border-[var(--color-hairline)] bg-[var(--color-mist)] shadow-[0_24px_60px_rgba(20,23,31,0.12)]">
                <Image
                  src="/images/bill-parish-portrait.webp"
                  alt="Bill Parish, founder and principal of Parish & Company LLC"
                  fill
                  sizes="(max-width: 768px) 90vw, 38vw"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-ink)]/85 via-[var(--color-ink)]/40 to-transparent p-6">
                  <p className="text-[0.7rem] uppercase tracking-[0.15em] font-medium text-[var(--color-brass)]">
                    Principal &amp; Founder
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-display)] text-[1.5rem] text-white">
                    Bill Parish
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.05} className="md:col-span-7">
              <p className="text-[0.72rem] uppercase tracking-[0.15em] font-medium text-[var(--color-moss)]">
                Meet Bill
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.015em] text-[var(--color-basalt)]">
                A 27-year practice you can actually reach.
              </h2>
              <p className="mt-6 text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.6] text-[var(--color-basalt)]">
                Choosing Parish &amp; Company provides a more personalized service and level
                of support. The firm focuses upon investment selection and client relations,
                providing long-term continuity and stability — especially in this age of
                mergers.
              </p>
              <p className="mt-4 text-[1rem] leading-[1.65] text-[var(--color-slate)]">
                Clients include exceptionally large portfolios in addition to smaller
                portfolios, although smaller portfolios are only accepted based upon a
                strong personal connection or relationship with an existing client. Fees
                charged are .75 percent per year with an annual minimum.
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[var(--color-hairline)] pt-8">
                <Credential label="Education" value="MBA Portland State · BA University of Oregon" />
                <Credential label="Credentials" value="Registered Investment Adviser · CPA" />
                <Credential label="Experience" value="CFO · Senior Analyst · Portfolio Manager" />
                <Credential label="Languages" value="English · Spanish · French · Italian · Russian" />
              </dl>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-[var(--color-moss)] hover:bg-[var(--color-moss-deep)] text-white px-6 py-3 text-[0.95rem] font-medium tracking-tight transition-colors group"
                >
                  <span>More about Parish &amp; Company</span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
                <EditorialLink href="/contact">Schedule a conversation</EditorialLink>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Fiduciary commitment — bold colored callout */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-moss)] text-white">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-16 md:py-20">
          <FadeIn>
            <div className="grid gap-8 md:grid-cols-12 md:gap-12 md:items-center">
              <div className="md:col-span-7">
                <p className="text-[0.72rem] uppercase tracking-[0.18em] font-medium text-white/70">
                  Fiduciary commitment
                </p>
                <p className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.25] italic">
                  &ldquo;A written guarantee is provided to every client that no fees are
                  accepted, either directly or indirectly, from any investment company on
                  any client.&rdquo;
                </p>
              </div>
              <div className="md:col-span-5">
                <div className="border-l border-white/30 pl-6 md:pl-8">
                  <p className="font-[family-name:var(--font-display)] text-[1.65rem] leading-tight">
                    0.75% / year
                  </p>
                  <p className="mt-2 text-[0.95rem] text-white/85">
                    Annual fee with annual minimum. No commissions, no kickbacks, no
                    revenue-sharing — the only compensation comes from the client.
                  </p>
                  <Link
                    href="/philosophy"
                    className="mt-5 inline-flex items-center gap-2 text-[0.9rem] font-medium border-b border-white/40 hover:border-white pb-0.5 transition-colors"
                  >
                    Read the full philosophy
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Notable research */}
      {featured.length > 0 && (
        <section className="border-b border-[var(--color-hairline)]">
          <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-28">
            <FadeIn>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHeader
                  kicker="Notable research"
                  title="Stories that broke wider."
                  dek="A selection of research that drove tier-one journalism. The analytical backbone behind major reporting."
                />
                <EditorialLink href="/research">Browse the archive</EditorialLink>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="mt-14">
              <ul className="border-b border-[var(--color-hairline)]">
                {featured.map((post) => (
                  <li key={post.slug}>
                    <ResearchCard post={post} size="lg" />
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Philosophy preview */}
      <section className="relative border-b border-[var(--color-hairline)] bg-[var(--color-mist)]/50 overflow-hidden">
        <MountainSilhouette className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 md:h-32 text-[var(--color-moss)] opacity-[0.18]" />
        <div className="relative mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-28">
          <FadeIn>
            <div className="grid gap-12 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-5">
                <SectionHeader kicker="Philosophy" title="A disciplined process across four economic environments." />
              </div>
              <div className="md:col-span-7">
                <p className="text-[var(--text-lead)] leading-[1.55] text-[var(--color-basalt)]">
                  Four economic environments and asset allocation strategies are
                  recognized by Parish &amp; Company. The current environment is defined as{' '}
                  <span className="italic">balanced &#x2F; conservative</span>.
                </p>
                <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { env: 'Growth', stocks: '75' },
                    { env: 'Balanced', stocks: '50' },
                    { env: 'Conservative', stocks: '25' },
                    { env: 'Wealth Preservation', stocks: '0' },
                  ].map((a) => (
                    <div key={a.env} className="bg-[var(--color-bone)] border border-[var(--color-hairline)] p-4">
                      <div className="font-[family-name:var(--font-display)] text-[1.85rem] tabular-nums text-[var(--color-moss)]">
                        {a.stocks}<span className="text-[1.1rem] align-top">%</span>
                      </div>
                      <div className="mt-1 text-[0.78rem] uppercase tracking-[0.08em] text-[var(--color-slate)] font-medium leading-tight">
                        {a.env}
                      </div>
                      <div className="text-[0.7rem] text-[var(--color-slate)]/70 mt-0.5">stocks</div>
                    </div>
                  ))}
                </div>
                <div className="mt-10">
                  <EditorialLink href="/philosophy">Read the philosophy</EditorialLink>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Latest research */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-28">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeader
                kicker="Latest"
                title="Most recent notes."
                dek="The full 203-note archive lives in research."
              />
              <EditorialLink href="/research">View all</EditorialLink>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-14">
            <ul className="border-b border-[var(--color-hairline)]">
              {latest.map((post) => (
                <li key={post.slug}>
                  <ResearchCard post={post} size="md" />
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

function Credential({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.7rem] uppercase tracking-[0.12em] text-[var(--color-slate)] font-medium">
        {label}
      </dt>
      <dd className="mt-1.5 text-[0.95rem] text-[var(--color-basalt)] leading-snug">{value}</dd>
    </div>
  );
}
