import Link from 'next/link';
import { FoldedImage } from './FoldedImage';
import { TopoLines } from './TopoLines';

/**
 * New Vista-inspired hero. Short declarative copy on the left, a folded
 * editorial portrait on the right, and a subtle topographic line pattern
 * underneath. No em-dashes, generous whitespace, single thought per line.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bone)]">
      {/* Subtle topographic background, sits behind the content */}
      <TopoLines
        intensity={0.06}
        className="pointer-events-none absolute inset-0 w-full h-full text-[var(--color-moss)]"
      />

      <div className="relative z-10 mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-12 lg:gap-16 md:items-start">
          {/* Left: copy */}
          <div className="md:col-span-6 lg:col-span-6 md:pt-6 lg:pt-10">
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.04] tracking-[-0.02em] text-[var(--color-basalt)] max-w-[14ch]">
              Looking for clarity in your portfolio?
            </h1>

            <p className="mt-7 max-w-[44ch] text-[1.05rem] md:text-[1.1rem] leading-[1.6] text-[var(--color-slate)]">
              You&apos;ve come to the right place. Parish &amp; Company is an
              independent investment advisor that has spent 27 years helping
              clients tune out the noise and focus on what matters.
            </p>

            <p className="mt-5 max-w-[44ch] text-[1.05rem] md:text-[1.1rem] leading-[1.6] text-[var(--color-slate)]">
              Our approach is grounded in original research, not market hype
              or sales pressure. Just disciplined judgment, applied carefully,
              client by client.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[var(--color-moss)] text-[var(--color-moss)] hover:bg-[var(--color-moss)] hover:text-[var(--color-bone)] px-5 py-2.5 text-[0.9rem] min-h-[44px] font-medium tracking-tight transition-colors group rounded-full"
              >
                <span>Let&apos;s talk</span>
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">›</span>
              </Link>
            </div>
          </div>

          {/* Right: folded editorial image */}
          <div className="md:col-span-6 lg:col-span-6">
            <FoldedImage
              src="/images/portland-hero.webp"
              alt="The Pacific Northwest landscape from Portland, Oregon"
              fold="tl"
              aspect="aspect-[4/5] md:aspect-[5/6]"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
