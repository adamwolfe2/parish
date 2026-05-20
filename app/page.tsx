import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '@/components/editorial/Hero';
import { PressBand } from '@/components/editorial/PressBand';
import { SectionEyebrow } from '@/components/editorial/SectionEyebrow';
import { StatsBand } from '@/components/editorial/StatsBand';
import { FoldedImage } from '@/components/editorial/FoldedImage';
import { TopoLines } from '@/components/editorial/TopoLines';
import { ResearchCard } from '@/components/editorial/ResearchCard';
import { Newsletter } from '@/components/editorial/Newsletter';
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
            <div className="md:col-span-5 lg:col-span-5 md:pl-8 lg:pl-16">
              <svg
                aria-hidden="true"
                viewBox="0 0 200 140"
                className="w-32 md:w-44 text-[var(--color-slate)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Dotted journey path from X to a flag */}
                <path
                  d="M 20 120 C 50 100, 70 80, 100 70 S 150 50, 170 30"
                  strokeDasharray="2 5"
                />
                <path d="M 14 114 L 26 126 M 26 114 L 14 126" />
                <circle cx="170" cy="26" r="6" fill="currentColor" stroke="none" />
                <path d="M 170 26 L 170 8" />
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
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 border border-[var(--color-moss)] text-[var(--color-moss)] hover:bg-[var(--color-moss)] hover:text-[var(--color-bone)] px-5 py-2.5 text-[0.9rem] min-h-[44px] font-medium tracking-tight transition-colors group rounded-full"
                >
                  <span>Working together</span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">›</span>
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
          <div className="relative w-full aspect-[16/9] md:aspect-[16/7] overflow-hidden">
            <Image
              src="/images/willamette-bridge.webp"
              alt="The Willamette River bridges at dusk, Portland, Oregon"
              fill
              sizes="100vw"
              quality={88}
              className="object-cover"
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
                <div className="bg-[var(--color-basalt)]/95 backdrop-blur-sm text-[var(--color-bone)] p-6 md:p-9">
                  <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] tracking-[-0.015em]">
                    Where independent research meets prudent portfolios.
                  </h2>
                  <Link
                    href="/about#services"
                    className="mt-6 inline-flex items-center gap-2 border border-[var(--color-brass)] text-[var(--color-brass)] hover:bg-[var(--color-brass)] hover:text-[var(--color-ink)] px-4 py-2 text-[0.85rem] min-h-[40px] font-medium tracking-tight transition-colors group rounded-full"
                  >
                    <span>Our services</span>
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">›</span>
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
                  <Link
                    href="/about#services"
                    className="inline-flex items-center gap-2 border border-[var(--color-moss)] text-[var(--color-moss)] hover:bg-[var(--color-moss)] hover:text-[var(--color-bone)] px-5 py-2.5 text-[0.9rem] min-h-[44px] font-medium tracking-tight transition-colors group rounded-full"
                  >
                    <span>Wealth management services</span>
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">›</span>
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
              <div className="relative w-full aspect-[5/4] overflow-hidden bg-[var(--color-mist)]">
                <Image
                  src="/images/donaldson-parish.webp"
                  alt="Bill Donaldson and Bill Parish"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={88}
                  className="object-cover"
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
                <Link
                  href="/research"
                  className="inline-flex items-center gap-2 border border-[var(--color-moss)] text-[var(--color-moss)] hover:bg-[var(--color-moss)] hover:text-[var(--color-bone)] px-5 py-2.5 text-[0.9rem] min-h-[44px] font-medium tracking-tight transition-colors group rounded-full"
                >
                  <span>More articles</span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">›</span>
                </Link>
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.1} className="mt-20 max-w-2xl">
            <Newsletter
              variant="card"
              heading="Subscribe to receive new research"
              dek="New research notes delivered by email. No marketing. No third-party data sharing."
            />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
