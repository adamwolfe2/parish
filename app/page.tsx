import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '@/components/editorial/Hero';
import { PressMarks } from '@/components/editorial/PressMarks';
import { SectionDivider } from '@/components/editorial/SectionDivider';
import { EditorialLink } from '@/components/editorial/EditorialLink';
import { ResearchCard } from '@/components/editorial/ResearchCard';
import { MountainSilhouette } from '@/components/editorial/MountainSilhouette';
import { FadeIn } from '@/components/motion/FadeIn';
import { getLatestPosts, getFeaturedPosts } from '@/lib/research';

const services = [
  {
    title: 'Individual Investors',
    summary:
      'Discretionary management for individuals and families across long horizons. Direct access to the principal, never a junior advisor.',
    items: [
      'Evaluate current portfolio and mix of investments',
      'Set investment goals and recommend allocation',
      'Select stocks, mutual funds, bonds, and other instruments',
      'Model portfolios for investors wanting simplicity',
      'Review of insurance, real estate, credit, and new-business decisions',
    ],
  },
  {
    title: 'Trusts & Foundations',
    summary:
      'Institutional process with clear policy statements, proprietary GAP analysis, and disciplined monitoring against stated objectives.',
    items: [
      'Recommend high-quality investment alternatives',
      'Proprietary GAP analysis to monitor performance',
      'Evaluate outside money managers, if applicable',
      'Monitor every aspect of the plan for fiduciary implications',
      'Simplified performance reporting alongside brokerage statements',
    ],
  },
  {
    title: 'Retirement Plans · 401K, 403B',
    summary:
      'Plan design and ERISA 404C compliance review. Constant focus on overall fee reduction — both investment and administrative.',
    items: [
      'Plan design and evaluation',
      'Risk analysis, enrollment, and participant education',
      'Trustee development and education',
      'Quarterly performance briefings to management',
      'Interface with key vendors to simplify the plan',
    ],
  },
];

export default function HomePage() {
  const latest = getLatestPosts(5);
  const featured = getFeaturedPosts().slice(0, 3);

  return (
    <>
      <Hero />

      {/* I — Mission */}
      <section className="bg-[var(--color-bone)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 pt-24 md:pt-32 pb-20 md:pb-28">
          <FadeIn>
            <SectionDivider numeral="i" label="The firm" />

            <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-5">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-basalt)]">
                  Independent advice.<br />
                  Original research.<br />
                  <span className="text-[var(--color-moss)]">No conflicts.</span>
                </h2>
              </div>
              <div className="md:col-span-7 md:pt-2">
                <p className="text-[clamp(1.15rem,1.5vw,1.3rem)] leading-[1.55] text-[var(--color-basalt)] max-w-prose">
                  A nationally recognized registered investment management firm based in
                  Portland, Oregon — specializing in asset management for individuals,
                  families, and institutions throughout the Northwest.
                </p>
                <p className="mt-6 text-[1.05rem] leading-[1.7] text-[var(--color-slate)] max-w-prose">
                  My goal is to make prudent decisions based upon each client&apos;s specific
                  needs. That requires a disciplined approach designed to achieve competitive
                  long-term returns while controlling risks — diligent research, quality
                  long-term investments, tax efficiency, and direct client communication.
                </p>
                <p className="mt-5 text-[1.05rem] leading-[1.7] text-[var(--color-slate)] max-w-prose">
                  A written guarantee is provided to every client that no fees are accepted,
                  either directly or indirectly, from any investment company. Removing such
                  conflicts of interest is the foundation of long-term oriented investment.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* II — What we do (Services) */}
      <section className="border-t border-[var(--color-hairline)] bg-[var(--color-mist)]/45">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-24 md:py-32">
          <FadeIn>
            <SectionDivider numeral="ii" label="Services" />

            <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-16 md:items-end">
              <div className="md:col-span-7">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-basalt)]">
                  Three categories of clients. One disciplined process.
                </h2>
              </div>
              <div className="md:col-span-5 md:pl-8 md:border-l md:border-[var(--color-hairline-strong)]">
                <p className="text-[1.05rem] leading-[1.65] text-[var(--color-slate)] max-w-md">
                  The same investment process is applied across every relationship.
                  Fees are charged at .75 percent per year with an annual minimum — no
                  commissions, no kickbacks, no revenue-sharing.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.05} className="mt-16">
            <div className="grid gap-px bg-[var(--color-hairline-strong)] md:grid-cols-3 border border-[var(--color-hairline-strong)]">
              {services.map((s, i) => (
                <article
                  key={s.title}
                  className="group bg-[var(--color-bone)] p-8 md:p-10 transition-colors hover:bg-white"
                >
                  <p className="font-[family-name:var(--font-mono)] text-[0.72rem] tracking-[0.15em] text-[var(--color-moss)] font-medium">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-[1.45rem] leading-[1.15] tracking-[-0.01em] text-[var(--color-basalt)]">
                    {s.title}
                  </h3>
                  <p className="mt-5 text-[0.95rem] leading-[1.65] text-[var(--color-slate)]">
                    {s.summary}
                  </p>
                  <ul className="mt-7 pt-6 border-t border-[var(--color-hairline)] space-y-2.5">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[0.9rem] leading-[1.55] text-[var(--color-basalt)]"
                      >
                        <span aria-hidden="true" className="text-[var(--color-moss)] mt-1 text-[0.7rem]">
                          ▸
                        </span>
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

      {/* III — Founder */}
      <section className="border-t border-[var(--color-hairline)] bg-[var(--color-bone)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-24 md:py-32">
          <FadeIn>
            <SectionDivider numeral="iii" label="Founder" />
          </FadeIn>

          <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-16 md:items-start">
            <FadeIn className="md:col-span-5">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden bg-[var(--color-mist)]">
                <Image
                  src="/images/bill-parish-portrait.webp"
                  alt="Bill Parish, founder and principal of Parish & Company LLC"
                  fill
                  sizes="(max-width: 768px) 90vw, 38vw"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-ink)]/90 via-[var(--color-ink)]/45 to-transparent p-6 pt-16">
                  <p className="text-[0.7rem] uppercase tracking-[0.18em] font-medium text-[var(--color-brass)]">
                    Principal &amp; Founder
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-display)] text-[1.5rem] text-white">
                    Bill Parish
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.05} className="md:col-span-7">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.8vw,3rem)] leading-[1.1] tracking-[-0.015em] text-[var(--color-basalt)]">
                A 27-year practice you can actually reach.
              </h2>

              <p className="mt-7 text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.6] text-[var(--color-basalt)] max-w-prose">
                Choosing Parish &amp; Company provides a more personalized service and level
                of support. The firm focuses upon investment selection and client relations —
                providing long-term continuity and stability, especially in this age of
                mergers.
              </p>

              <p className="mt-5 text-[1rem] leading-[1.7] text-[var(--color-slate)] max-w-prose">
                Clients include exceptionally large portfolios in addition to smaller
                portfolios, although smaller portfolios are only accepted based upon a strong
                personal connection or relationship with an existing client. Fees charged are
                .75 percent per year with an annual minimum.
              </p>

              <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 border-t border-[var(--color-hairline)] pt-8">
                <Credential label="Education" value="MBA · Portland State University &nbsp;·&nbsp; BA · University of Oregon" />
                <Credential label="Credentials" value="Registered Investment Adviser &nbsp;·&nbsp; CPA" />
                <Credential label="Experience" value="Chief Financial Officer &nbsp;·&nbsp; Senior Analyst &nbsp;·&nbsp; Portfolio Manager" />
                <Credential label="Languages" value="English &nbsp;·&nbsp; Spanish &nbsp;·&nbsp; French &nbsp;·&nbsp; Italian &nbsp;·&nbsp; Russian" />
              </dl>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-[var(--color-moss)] hover:bg-[var(--color-moss-deep)] text-white px-6 py-3 text-[0.95rem] font-medium tracking-tight transition-colors group"
                >
                  <span>Read full background</span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
                <EditorialLink href="/contact">Schedule a conversation</EditorialLink>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* IV — Fiduciary commitment */}
      <section className="relative bg-[var(--color-moss)] text-white overflow-hidden">
        <MountainSilhouette className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 md:h-28 text-white opacity-[0.12]" />
        <div className="relative mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-28">
          <FadeIn>
            <SectionDivider numeral="iv" label="Fiduciary commitment" className="[&_*]:!text-white/80 [&_span:first-child]:!text-[var(--color-brass)] [&_span.h-px]:!bg-white/30" />

            <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-16 md:items-start">
              <div className="md:col-span-7">
                <p className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.2] italic">
                  &ldquo;A written guarantee is provided to every client that no fees are
                  accepted, either directly or indirectly, from any investment company on
                  any client. Removing such conflicts of interest is a key ingredient to
                  successful long-term oriented investment.&rdquo;
                </p>
              </div>
              <div className="md:col-span-5 md:pl-8 md:border-l md:border-white/25">
                <p className="font-[family-name:var(--font-display)] text-[2rem] leading-tight text-white">
                  .75 percent per year
                </p>
                <p className="mt-2 text-[0.95rem] text-white/80 leading-relaxed">
                  Annual fee with annual minimum.<br />
                  The only compensation comes from the client.
                </p>
                <Link
                  href="/philosophy"
                  className="mt-6 inline-flex items-center gap-2 text-[0.92rem] font-medium border-b border-white/40 hover:border-white pb-0.5 transition-colors"
                >
                  <span>Read the full philosophy</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* V — Press marks */}
      <section className="border-t border-[var(--color-hairline)] bg-[var(--color-bone)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <SectionDivider numeral="v" label="In the press" />
            <div className="mt-12">
              <PressMarks />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* VI — Notable research */}
      {featured.length > 0 && (
        <section className="border-t border-[var(--color-hairline)] bg-[var(--color-bone)]">
          <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-24 md:py-32">
            <FadeIn>
              <SectionDivider numeral="vi" label="Notable research" />

              <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-16 md:items-end">
                <div className="md:col-span-7">
                  <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-basalt)]">
                    Stories that broke wider.
                  </h2>
                </div>
                <div className="md:col-span-5 md:pl-8 md:border-l md:border-[var(--color-hairline-strong)]">
                  <p className="text-[1.05rem] leading-[1.65] text-[var(--color-slate)] max-w-md">
                    A selection of research that drove tier-one journalism. The analytical
                    backbone behind major reporting.
                  </p>
                  <EditorialLink href="/research" className="mt-5">Browse the archive</EditorialLink>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.05} className="mt-16">
              <ul className="border-y border-[var(--color-hairline-strong)]">
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

      {/* VII — Philosophy preview */}
      <section className="relative border-t border-[var(--color-hairline)] bg-[var(--color-mist)]/55 overflow-hidden">
        <MountainSilhouette className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 md:h-32 text-[var(--color-moss)] opacity-[0.16]" />
        <div className="relative mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-24 md:py-32">
          <FadeIn>
            <SectionDivider numeral="vii" label="Philosophy" />

            <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-5">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-basalt)]">
                  A disciplined process across four economic environments.
                </h2>
                <p className="mt-7 text-[1.05rem] leading-[1.7] text-[var(--color-slate)] max-w-md">
                  Four economic environments and asset allocation strategies are recognized
                  by Parish &amp; Company. The current environment is defined as{' '}
                  <span className="text-[var(--color-basalt)] font-medium">balanced / conservative</span>.
                </p>
                <EditorialLink href="/philosophy" className="mt-7">Read the philosophy</EditorialLink>
              </div>

              <div className="md:col-span-7">
                <div className="bg-[var(--color-bone)] border border-[var(--color-hairline)]">
                  <div className="grid grid-cols-[1fr,auto,auto] items-center px-5 md:px-7 py-4 border-b border-[var(--color-hairline-strong)] bg-[var(--color-mist)]/70">
                    <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.12em] text-[var(--color-slate)] font-medium">
                      Environment
                    </p>
                    <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.12em] text-[var(--color-slate)] font-medium pl-8 md:pl-14">
                      Stocks
                    </p>
                    <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.12em] text-[var(--color-slate)] font-medium pl-8 md:pl-14">
                      Fixed Income
                    </p>
                  </div>
                  {[
                    { env: 'Growth', stocks: 75, fixed: 25 },
                    { env: 'Balanced', stocks: 50, fixed: 50 },
                    { env: 'Conservative', stocks: 25, fixed: 75 },
                    { env: 'Wealth Preservation', stocks: 0, fixed: 100 },
                  ].map((row) => (
                    <div
                      key={row.env}
                      className="grid grid-cols-[1fr,auto,auto] items-center px-5 md:px-7 py-4 border-b border-[var(--color-hairline)] last:border-b-0"
                    >
                      <p className="font-[family-name:var(--font-display)] text-[1.05rem] text-[var(--color-basalt)]">
                        {row.env}
                      </p>
                      <p className="font-[family-name:var(--font-mono)] tabular-nums text-[0.95rem] text-[var(--color-basalt)] pl-8 md:pl-14 text-right">
                        {row.stocks}%
                      </p>
                      <p className="font-[family-name:var(--font-mono)] tabular-nums text-[0.95rem] text-[var(--color-basalt)] pl-8 md:pl-14 text-right">
                        {row.fixed}%
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[0.85rem] text-[var(--color-slate)] italic leading-relaxed">
                  Past recommendations do not in any way guarantee the success of future
                  recommendations.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* VIII — Latest research */}
      <section className="border-t border-[var(--color-hairline)] bg-[var(--color-bone)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-24 md:py-32">
          <FadeIn>
            <SectionDivider numeral="viii" label="Latest" />

            <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-16 md:items-end">
              <div className="md:col-span-7">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-basalt)]">
                  Most recent notes.
                </h2>
              </div>
              <div className="md:col-span-5 md:pl-8 md:border-l md:border-[var(--color-hairline-strong)]">
                <p className="text-[1.05rem] leading-[1.65] text-[var(--color-slate)] max-w-md">
                  Reverse chronological. The full archive lives in research.
                </p>
                <EditorialLink href="/research" className="mt-5">View all research</EditorialLink>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.05} className="mt-16">
            <ul className="border-y border-[var(--color-hairline-strong)]">
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
      <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-[var(--color-slate)] font-medium">
        {label}
      </dt>
      <dd
        className="mt-2 text-[0.98rem] text-[var(--color-basalt)] leading-snug"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}
