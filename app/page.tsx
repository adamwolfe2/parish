import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '@/components/editorial/Hero';
import { PressBand } from '@/components/editorial/PressBand';
import { SectionDivider } from '@/components/editorial/SectionDivider';
import { EditorialLink } from '@/components/editorial/EditorialLink';
import { ResearchCard } from '@/components/editorial/ResearchCard';
import { MountainSilhouette } from '@/components/editorial/MountainSilhouette';
import { AllocationBars } from '@/components/editorial/AllocationBars';
import { Newsletter } from '@/components/editorial/Newsletter';
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
      <PressBand />

      {/* I — Mission */}
      <section className="relative bg-[var(--color-bone)] overflow-hidden">
        <MountainSilhouette variant="ridge" stretch className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 md:h-14 text-[var(--color-moss)] opacity-[0.10]" />
        <div className="relative mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <SectionDivider numeral="i" label="The firm" />

            <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-5">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.4vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-[var(--color-basalt)]">
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
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <SectionDivider numeral="ii" label="Services" />

            <h2 className="mt-8 font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-basalt)] max-w-3xl">
              Three categories of clients. One disciplined process — applied across every relationship.
            </h2>
          </FadeIn>

          <FadeIn delay={0.05} className="mt-12">
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
      <section className="relative border-t border-[var(--color-hairline)] bg-[var(--color-bone)] overflow-hidden">
        <MountainSilhouette variant="range" stretch className="pointer-events-none absolute top-0 left-0 right-0 h-12 md:h-16 text-[var(--color-moss)] opacity-[0.08] rotate-180" />
        <div className="relative mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="flex justify-center">
              <SectionDivider numeral="iii" label="Founder" />
            </div>
          </FadeIn>

          <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-14 lg:gap-16 md:items-center">
            {/* Bill's portrait */}
            <FadeIn className="md:col-span-5">
              <figure className="relative mx-auto md:ml-auto md:mr-0 w-full max-w-[420px]">
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-mist)] border border-[var(--color-hairline)] shadow-[0_24px_64px_-24px_rgba(20,23,31,0.25)]">
                  <Image
                    src="/images/bill-parish-headshot.webp"
                    alt="Bill Parish, founder of Parish & Company LLC"
                    fill
                    sizes="(max-width: 768px) 90vw, 420px"
                    quality={92}
                    priority
                    className="object-cover object-center"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-ink)]/75 via-[var(--color-ink)]/25 to-transparent" />
                  <figcaption className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[0.68rem] uppercase tracking-[0.18em] font-medium text-[var(--color-brass)]">
                      Principal &amp; Founder
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-display)] text-[1.5rem] text-white tracking-tight">
                      Bill Parish
                    </p>
                  </figcaption>
                </div>
              </figure>
            </FadeIn>

            {/* Content */}
            <FadeIn delay={0.05} className="md:col-span-7">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.015em] text-[var(--color-basalt)]">
                A 27-year practice grounded in original research.
              </h2>
              <p className="mt-6 text-[1.05rem] leading-[1.7] text-[var(--color-basalt)] max-w-prose">
                Bill Parish is a Registered Investment Adviser, CPA, MBA, and former CFO.
                His original research has provided the analytical backbone for reporting in
                The New York Times, The Wall Street Journal, Bloomberg, Barron&rsquo;s,
                Financial Times, and The Guardian over more than two decades.
              </p>

              <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-[var(--color-hairline)] pt-7">
                <Credential label="Education" value="MBA · Portland State BA · University of Oregon" />
                <Credential label="Credentials" value="Registered Investment Adviser · CPA" />
                <Credential label="Experience" value="CFO · Senior Analyst · Portfolio Manager" />
                <Credential label="Languages" value="English · Spanish · French · Italian · Russian" />
              </dl>

              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
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
        <MountainSilhouette stretch className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 md:h-28 text-white opacity-[0.14]" />
        <div className="relative mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-28">
          <FadeIn>
            <SectionDivider numeral="iv" label="Fiduciary commitment" className="[&_*]:!text-white/80 [&_span:first-child]:!text-[var(--color-brass)] [&_span.h-px]:!bg-white/30" />

            <div className="mt-10 max-w-4xl">
              <blockquote className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.25]">
                <p>
                  &ldquo;A written guarantee is provided to every client that{' '}
                  <em>no fees are accepted, either directly or indirectly,</em> from any
                  investment company on any client. Removing such conflicts of interest is
                  a key ingredient to successful long-term oriented investment.&rdquo;
                </p>
              </blockquote>
              <div className="mt-10 pt-8 border-t border-white/20">
                <Link
                  href="/philosophy"
                  className="inline-flex items-center gap-2 text-[0.92rem] font-medium border-b border-white/40 hover:border-white pb-0.5 transition-colors"
                >
                  <span>Read the full philosophy</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* V — Notable research */}
      {featured.length > 0 && (
        <section className="border-t border-[var(--color-hairline)] bg-[var(--color-bone)]">
          <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
            <FadeIn>
              <SectionDivider numeral="v" label="Notable research" />

              <div className="mt-8 flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-basalt)] max-w-2xl">
                  Original analysis cited across tier-one journalism.
                </h2>
                <EditorialLink href="/research">Browse the archive</EditorialLink>
              </div>
            </FadeIn>

            <FadeIn delay={0.05} className="mt-10">
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
        <MountainSilhouette stretch className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 md:h-20 text-[var(--color-moss)] opacity-[0.18]" />
        <div className="relative mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 pt-20 md:pt-24 pb-24 md:pb-28">
          <FadeIn>
            <SectionDivider numeral="vi" label="Philosophy" />

            <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-12 md:items-start">
              <div className="md:col-span-5">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.4vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-[var(--color-basalt)]">
                  A disciplined process across four economic environments.
                </h2>
                <p className="mt-5 text-[0.98rem] leading-[1.65] text-[var(--color-slate)]">
                  Four economic environments and asset allocation strategies are recognized
                  by Parish &amp; Company. The current environment is defined as{' '}
                  <span className="text-[var(--color-basalt)] font-medium">balanced / conservative</span>.
                </p>
                <EditorialLink href="/philosophy" className="mt-6">Read the philosophy</EditorialLink>
              </div>

              <div className="md:col-span-7">
                <AllocationBars />
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
      <section className="relative border-t border-[var(--color-hairline)] bg-[var(--color-bone)] overflow-hidden">
        <MountainSilhouette variant="range" stretch className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 md:h-20 text-[var(--color-moss)] opacity-[0.12]" />
        <div className="relative mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <SectionDivider numeral="vii" label="Latest" />

            <div className="mt-8 flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-basalt)] max-w-2xl">
                Most recent notes.
              </h2>
              <EditorialLink href="/research">View all research</EditorialLink>
            </div>
          </FadeIn>

          <FadeIn delay={0.05} className="mt-10">
            <ul className="border-y border-[var(--color-hairline-strong)]">
              {latest.map((post) => (
                <li key={post.slug}>
                  <ResearchCard post={post} size="md" />
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-14 max-w-2xl mx-auto">
            <Newsletter
              variant="card"
              heading="Subscribe"
              dek="New research notes delivered by email — corporate governance, pensions, tax policy, and Pacific Northwest finance. No marketing, no third-party data sharing. Unsubscribe with one click."
            />
          </FadeIn>
        </div>
      </section>
    </>
  );
}

function Credential({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-[family-name:var(--font-mono)] text-[0.68rem] tracking-[0.15em] text-[var(--color-moss)] font-medium uppercase">
        {label}
      </dt>
      <dd className="mt-1.5 text-[0.92rem] text-[var(--color-basalt)] leading-[1.5]">
        {value}
      </dd>
    </div>
  );
}
