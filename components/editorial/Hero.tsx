import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-bone)]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/portland-hero.webp"
          alt="Downtown Portland, Oregon skyline in autumn with Mt. Hood in the distance"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/96 via-[var(--color-ink)]/85 to-[var(--color-ink)]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/80 via-transparent to-[var(--color-ink)]/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-28 lg:py-32">
        <div className="max-w-[720px]">
          <p className="text-[0.7rem] uppercase tracking-[0.22em] font-medium text-[var(--color-brass)] mb-7 flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--color-brass)]" />
            <span>Parish &amp; Company LLC · Est. 1998</span>
          </p>

          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.15rem,4.2vw,3.5rem)] leading-[1.08] tracking-[-0.02em] text-white">
            Independent investment management <br className="hidden md:block" />and original research since 1998.
          </h1>

          <p className="mt-7 max-w-xl text-[1rem] md:text-[1.1rem] leading-[1.6] text-white/85">
            Serving individuals, families, trusts, foundations, and retirement plans
            from Lake Oswego, Oregon.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[var(--color-brass)] hover:bg-[var(--color-bone)] text-[var(--color-ink)] px-5 py-3 text-[0.9rem] min-h-[44px] font-medium tracking-tight transition-colors group"
            >
              <span>Schedule a conversation</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-[0.9rem] font-medium text-white/85 hover:text-white px-5 py-3 min-h-[44px] border border-white/25 hover:border-white/60 transition-colors group"
            >
              <span>Read the research</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
