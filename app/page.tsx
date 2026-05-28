import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '@/components/editorial/Hero';
import { PressBand } from '@/components/editorial/PressBand';
import { SectionEyebrow } from '@/components/editorial/SectionEyebrow';
import { StatsBand } from '@/components/editorial/StatsBand';
import { FoldedImage } from '@/components/editorial/FoldedImage';
import { TopoLines } from '@/components/editorial/TopoLines';
import { ResearchCard } from '@/components/editorial/ResearchCard';
import { FadeIn } from '@/components/motion/FadeIn';
import { getLatestPosts, getFeaturedPosts } from '@/lib/research';

export default function HomePage() {
  const latest = getLatestPosts(3);
  const featured = getFeaturedPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <PressBand />

      {/* WORKING TOGETHER ---------------------------------------------- */}
      <section className="relative bg-[var(--color-bone)]">
        <div className="relative mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-24 md:py-32">
          <SectionEyebrow>Working together</SectionEyebrow>

          <FadeIn className="mt-16 grid gap-12 md:grid-cols-12 md:gap-12 lg:gap-16 md:items-center">
            <div className="md:col-span-5 lg:col-span-5 md:pl-8 lg:pl-16 flex md:justify-center">
              {/* Process illustration: three milestones connected by a topographic
                  contour, evoking a planned route through the Cascades. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 280 180"
                className="w-full max-w-[340px] text-[var(--color-moss)]"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Subtle topographic contour lines */}
                <g stroke="currentColor" strokeWidth="0.6" opacity="0.18">
                  <path d="M 10 150 Q 70 130 140 138 T 270 132" />
                  <path d="M 10 130 Q 70 110 140 118 T 270 112" />
                  <path d="M 10 110 Q 70 90 140 98 T 270 92" />
                  <path d="M 10 90 Q 70 70 140 78 T 270 72" />
                  <path d="M 10 70 Q 70 50 140 58 T 270 52" />
                  <path d="M 10 50 Q 70 30 140 38 T 270 32" />
                </g>

                {/* Mountain ridge silhouette */}
                <path
                  d="M 0 160 L 50 110 L 80 130 L 130 70 L 170 100 L 210 60 L 250 90 L 280 75 L 280 180 L 0 180 Z"
                  fill="var(--color-moss)"
                  fillOpacity="0.08"
                  stroke="none"
                />

                {/* The route — a confident dashed path between three milestones */}
                <path
                  d="M 36 148 Q 90 130 130 110 T 244 56"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeDasharray="1 4"
                  opacity="0.85"
                />

                {/* Milestone 1 — start */}
                <circle cx="36" cy="148" r="5" fill="var(--color-bone)" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="36" cy="148" r="1.6" fill="currentColor" stroke="none" />

                {/* Milestone 2 — midpoint */}
                <circle cx="130" cy="110" r="4" fill="var(--color-bone)" stroke="currentColor" strokeWidth="1.4" />

                {/* Milestone 3 — summit, with a small flag */}
                <line x1="244" y1="56" x2="244" y2="30" stroke="currentColor" strokeWidth="1.4" />
                <path d="M 244 30 L 260 35 L 244 42 Z" fill="currentColor" stroke="none" />
                <circle cx="244" cy="56" r="5" fill="var(--color-moss)" stroke="none" />

                {/* Tiny labels — barely-there typographic anchors */}
                <text x="36" y="170" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.55" letterSpacing="1">PLAN</text>
                <text x="130" y="132" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.55" letterSpacing="1">INVEST</text>
                <text x="244" y="22" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.55" letterSpacing="1">GROW</text>
              </svg>
            </div>

            <div className="md:col-span-7 lg:col-span-6">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.6vw,2.85rem)] leading-[1.1] tracking-[-0.02em] text-[var(--color-basalt)]">
                Your path. Our process.
              </h2>
              <p className="mt-6 max-w-[52ch] text-[1.05rem] leading-[1.65] text-[var(--color-slate)]">
                When to invest, how to plan around taxes, and how to weather
                a market cycle are all vital questions. Through direct
                conversations and disciplined research, we help you build a
                portfolio that fits your actual life.
              </p>
              <p className="mt-5 max-w-[52ch] text-[1.05rem] leading-[1.65] text-[var(--color-slate)]">
                We proudly serve individuals, families, trusts, foundations,
                and retirement plans across the Pacific Northwest.
              </p>
              <div className="mt-10">
                <Link href="/about" className="btn-editorial">
                  <span>Working together</span>
                  <span aria-hidden="true" className="arrow">›</span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WEALTH MANAGEMENT SERVICES ------------------------------------ */}
      <section className="relative bg-[var(--color-bone)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 pt-8 md:pt-12 pb-0">
          <SectionEyebrow>Wealth management services</SectionEyebrow>
        </div>

        {/* Full-bleed editorial image */}
        <FadeIn className="mt-12 md:mt-16">
          <div className="relative w-full aspect-[16/9] md:aspect-[16/7] overflow-hidden rounded-lg">
            <Image
              src="/images/multnomah-falls.jpg"
              alt="Multnomah Falls and the Benson Footbridge in the Columbia River Gorge, Oregon"
              fill
              sizes="100vw"
              quality={88}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--color-ink)]/35" />

            {/* Inset moss panel with headline */}
            <div className="absolute top-1/2 right-6 md:right-12 -translate-y-1/2 max-w-md">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -top-6 right-0 w-8 h-8 md:w-12 md:h-12 bg-[var(--color-bone)]"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
                />
                <div className="bg-[var(--color-moss)]/95 backdrop-blur-sm text-[var(--color-bone)] p-6 md:p-9">
                  <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] tracking-[-0.015em]">
                    Where independent research meets prudent portfolios.
                  </h2>
                  <Link href="/about#services" className="btn-editorial-light mt-6">
                    <span>Our services</span>
                    <span aria-hidden="true" className="arrow">›</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Services intro paragraph + research carousel-like card */}
        <div className="relative">
          <TopoLines intensity={0.05} className="pointer-events-none absolute inset-0 w-full h-full text-[var(--color-moss)]" />

          <div className="relative mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
            <FadeIn>
              <p className="max-w-[64ch] text-[1.05rem] md:text-[1.15rem] leading-[1.65] text-[var(--color-basalt)]">
                With wealth comes a steady stream of decisions, some
                exciting, some tedious, some overwhelming. We help you
                navigate those choices and build a portfolio that puts your
                mind at ease.
              </p>
            </FadeIn>

            <FadeIn delay={0.05} className="mt-16 grid gap-12 md:grid-cols-12 md:gap-12 lg:gap-16">
              <div className="md:col-span-7 lg:col-span-6">
                <p className="text-[0.75rem] uppercase tracking-[0.15em] text-[var(--color-slate)] font-medium">
                  Investment management
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="var(--color-moss)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M 6 30 L 14 22 L 22 26 L 32 14" />
                    <circle cx="32" cy="14" r="3" />
                    <circle cx="40" cy="38" r="6" />
                    <path d="M 36 34 L 44 42" />
                  </svg>
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.4vw,1.85rem)] leading-[1.2] tracking-[-0.01em] text-[var(--color-basalt)]">
                  Focus on what matters.
                </h3>
                <p className="mt-4 max-w-[52ch] text-[1rem] leading-[1.65] text-[var(--color-slate)]">
                  Skip the daily anxiety over which stocks to buy. Tap the
                  long history of global capital markets through a
                  disciplined process built on diligent research, long-term
                  quality, and tax efficiency.
                </p>
              </div>

              <div className="md:col-span-5 lg:col-span-6 md:flex md:items-end md:justify-end">
                <div className="w-full md:max-w-xs">
                  <p className="text-[0.75rem] uppercase tracking-[0.15em] text-[var(--color-slate)] font-medium mb-3">
                    Learn more about our services
                  </p>
                  <Link href="/about#services" className="btn-editorial">
                    <span>Our services</span>
                    <span aria-hidden="true" className="arrow">›</span>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FINANCIAL TRANSITIONS ----------------------------------------- */}
      <section className="relative bg-[var(--color-bone)]">
        <TopoLines intensity={0.05} className="pointer-events-none absolute inset-0 w-full h-full text-[var(--color-moss)]" />

        <div className="relative mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <SectionEyebrow>Financial transitions</SectionEyebrow>

          <FadeIn className="mt-12 max-w-[58ch]">
            <p className="text-[1.05rem] md:text-[1.15rem] leading-[1.65] text-[var(--color-basalt)]">
              Whether planned or unexpected, changes to your financial life
              can feel overwhelming. We support you through retirement, the
              sale of a business, complex compensation, and the receipt of
              an inheritance.
            </p>
          </FadeIn>

          <FadeIn delay={0.05} className="mt-16 grid gap-12 md:grid-cols-12 md:gap-12 lg:gap-16 md:items-center">
            <div className="md:col-span-6">
              <div className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-lg bg-[var(--color-mist)]">
                <Image
                  src="/images/donaldson-parish-hd.jpg"
                  alt="Bill Donaldson and Bill Parish shaking hands at an Ameritrade Institutional event"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div className="md:col-span-6">
              <p className="text-[0.75rem] uppercase tracking-[0.15em] text-[var(--color-slate)] font-medium">
                Retirement
              </p>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.4vw,1.85rem)] leading-[1.2] tracking-[-0.01em] text-[var(--color-basalt)]">
                Secure your future.
              </h3>
              <p className="mt-4 max-w-[52ch] text-[1rem] leading-[1.65] text-[var(--color-slate)]">
                After a lifetime of work, the move into retirement can feel
                harder than expected. We help you choose when to retire,
                model the lifestyle your portfolio will support, and draw
                income from your accounts tax-efficiently.
              </p>

              <div className="mt-8 border-t border-[var(--color-hairline)] pt-6 max-w-md">
                <p className="text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-slate)] font-medium">
                  Our experts on retirement
                </p>
                {latest[0] && (
                  <Link
                    href={`/research/${latest[0].slug}`}
                    className="mt-3 block text-[0.95rem] text-[var(--color-moss)] hover:text-[var(--color-moss-deep)] transition-colors"
                  >
                    {latest[0].title} ›
                  </Link>
                )}
                {latest[1] && (
                  <Link
                    href={`/research/${latest[1].slug}`}
                    className="mt-2 block text-[0.95rem] text-[var(--color-moss)] hover:text-[var(--color-moss-deep)] transition-colors"
                  >
                    {latest[1].title} ›
                  </Link>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* STATS BAND (Parish at a glance) ------------------------------- */}
      <StatsBand />

      {/* INSIGHTS ------------------------------------------------------- */}
      <section className="relative bg-[var(--color-bone)]">
        <div className="relative mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-24 md:py-32">
          <SectionEyebrow>Insights</SectionEyebrow>

          <FadeIn className="mt-12 max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.6vw,2.85rem)] leading-[1.1] tracking-[-0.02em] text-[var(--color-basalt)]">
              Parish &amp; Company insights.
            </h2>
            <p className="mt-5 max-w-[52ch] text-[1.05rem] leading-[1.6] text-[var(--color-slate)]">
              Get to know our thinking and cut through Wall Street&apos;s
              bias. No hype. Just original research, published since 1998.
            </p>
          </FadeIn>

          {(featured.length > 0 || latest.length > 0) && (
            <FadeIn delay={0.05} className="mt-14">
              <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
                {(featured.length > 0 ? featured : latest).slice(0, 3).map((post) => (
                  <ResearchCard key={post.slug} post={post} size="sm" />
                ))}
              </div>

              <div className="mt-12">
                <Link href="/research" className="btn-editorial">
                  <span>More articles</span>
                  <span aria-hidden="true" className="arrow">›</span>
                </Link>
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </>
  );
}
