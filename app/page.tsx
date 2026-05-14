import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '@/components/editorial/Hero';
import { PressMarks } from '@/components/editorial/PressMarks';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { EditorialLink } from '@/components/editorial/EditorialLink';
import { ResearchCard } from '@/components/editorial/ResearchCard';
import { FadeIn } from '@/components/motion/FadeIn';
import { getLatestPosts, getFeaturedPosts } from '@/lib/research';

export default function HomePage() {
  const latest = getLatestPosts(4);
  const featured = getFeaturedPosts().slice(0, 3);

  return (
    <>
      <Hero />

      {/* Press marks */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-16 md:py-20">
          <FadeIn>
            <PressMarks />
          </FadeIn>
        </div>
      </section>

      {/* Notable research (curated) */}
      {featured.length > 0 && (
        <section className="border-b border-[var(--color-hairline)]">
          <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-28">
            <FadeIn>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHeader
                  kicker="Notable research"
                  title="Stories that broke wider."
                  dek="A selection of research that drove tier-one journalism. The work behind the work."
                />
                <EditorialLink href="/research">Browse the full archive</EditorialLink>
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

      {/* Latest research */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-28">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeader
                kicker="Latest"
                title="Most recent notes."
                dek="The most recent published work, in reverse chronological order. The full 203-note archive lives in research."
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

      {/* Philosophy preview */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-mist)]/40">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-28">
          <FadeIn>
            <div className="grid gap-12 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-5">
                <SectionHeader kicker="Philosophy" title="A disciplined process across four economic environments." />
              </div>
              <div className="md:col-span-7">
                <p className="text-[var(--text-lead)] leading-[1.55] text-[var(--color-basalt)]">
                  Parish &amp; Company manages client wealth through diligent research, quality long-term
                  investments, tax efficiency, and direct client communication. We replace emotion with the
                  fundamental logic needed to make careful, rational choices.
                </p>
                <p className="mt-6 text-[var(--text-lead)] leading-[1.55] text-[var(--color-slate)]">
                  Allocations are calibrated to four economic environments — Growth, Balanced, Conservative,
                  and Wealth Preservation — with a 30-year published record of forecasts and recommendations.
                </p>
                <div className="mt-10">
                  <EditorialLink href="/philosophy">Read the philosophy</EditorialLink>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About preview */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16 md:items-center">
            <FadeIn className="md:col-span-7 order-2 md:order-1">
              <SectionHeader kicker="About" title="Bill Parish." />
              <p className="mt-6 text-[var(--text-lead)] leading-[1.55] text-[var(--color-basalt)]">
                A Registered Investment Adviser based in Lake Oswego, Oregon. CPA, MBA, and former
                CFO with more than two decades of portfolio and financial research experience.
              </p>
              <p className="mt-4 text-[var(--text-lead)] leading-[1.55] text-[var(--color-slate)]">
                His original research has provided the analytical backbone for stories on
                Microsoft&apos;s stock-option tax avoidance, Romney&apos;s $100M IRA, Buffett&apos;s derivatives
                exposure, Intel&apos;s pension structure, Bain Capital, Gordon Sondland, the Mercer family,
                and Oregon PERS&apos; private-equity exposure — published in the New York Times, Wall Street
                Journal, Bloomberg, Barron&apos;s, the Financial Times, The Guardian, and Fortune.
              </p>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-[0.95rem] text-[var(--color-slate)]">
                <li>· MBA, Portland State University</li>
                <li>· BA, University of Oregon</li>
                <li>· Certified Public Accountant</li>
                <li>· Five languages spoken</li>
              </ul>
              <div className="mt-10">
                <EditorialLink href="/about">More about Parish &amp; Company</EditorialLink>
              </div>
            </FadeIn>

            <FadeIn className="md:col-span-5 order-1 md:order-2">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden border border-[var(--color-hairline)] bg-[var(--color-mist)]">
                <Image
                  src="/images/bill-parish-portrait.webp"
                  alt="Bill Parish, founder of Parish & Company LLC"
                  fill
                  sizes="(max-width: 768px) 90vw, 35vw"
                  className="object-cover grayscale"
                />
              </div>
              <p className="mt-3 text-center text-[0.78rem] uppercase tracking-[0.15em] text-[var(--color-slate)] font-medium">
                Bill Parish · President &amp; CEO
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Fiduciary guarantee callout */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-[0.72rem] uppercase tracking-[0.15em] font-medium text-[var(--color-moss)]">
                Fiduciary commitment
              </p>
              <p className="mt-5 font-[family-name:var(--font-display)] text-[clamp(1.55rem,2.8vw,2.15rem)] leading-[1.25] text-[var(--color-basalt)] italic">
                &ldquo;A written guarantee is provided to every client that no fees are accepted,
                either directly or indirectly, from any investment company on any client.&rdquo;
              </p>
              <p className="mt-6 text-[0.95rem] text-[var(--color-slate)]">
                Fees are charged at 0.75% per year with an annual minimum. Nothing else.
                <Link href="/about" className="ml-3 link-editorial">
                  <span>Read the full disclosure</span>
                  <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
