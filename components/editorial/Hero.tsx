import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  const yearsSince = new Date().getFullYear() - 1998;
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-bone)]">
      {/* Image side */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/mt-hood.jpg"
          alt="Mt. Hood at dawn, viewed from Trillium Lake, Oregon"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.02]"
        />
        {/* Editorial wash — keep image legible but text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/95 via-[var(--color-ink)]/80 to-[var(--color-ink)]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/80 via-transparent to-[var(--color-ink)]/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-24 md:py-36 lg:py-44">
        <div className="max-w-[720px]">
          <p className="text-[0.72rem] uppercase tracking-[0.22em] font-medium text-[var(--color-brass)] mb-8 flex items-center gap-4">
            <span className="h-px w-12 bg-[var(--color-brass)]" />
            <span>Parish &amp; Company LLC · Portland, Oregon · Est. 1998</span>
          </p>

          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.75rem,6.5vw,5.25rem)] leading-[1.02] tracking-[-0.025em] text-white">
            A nationally recognized investment management firm in the Pacific Northwest.
          </h1>

          <p className="mt-8 max-w-xl text-[clamp(1.1rem,1.4vw,1.25rem)] leading-[1.55] text-white/80">
            Asset management for individuals, families, and institutions throughout
            the Northwest. Prudent decisions grounded in {yearsSince} years of original
            research featured in The New York Times, The Wall Street Journal,
            Bloomberg, and Barron&rsquo;s.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[var(--color-brass)] hover:bg-[var(--color-bone)] text-[var(--color-ink)] px-7 py-3.5 text-[0.95rem] font-medium tracking-tight transition-colors group"
            >
              <span>Schedule a conversation</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white/80 text-white/90 hover:text-white px-7 py-3.5 text-[0.95rem] font-medium tracking-tight transition-colors group"
            >
              <span>Read the research</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stat strip — trust signals */}
      <div className="relative z-10 border-t border-white/10 bg-[var(--color-ink)]/60 backdrop-blur-md">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10">
          <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            <Stat label="Years independent" value={String(yearsSince)} />
            <Stat label="Research notes published" value="200+" />
            <Stat label="Tier-one publications" value="12" />
            <Stat label="Conflicts of interest" value="Zero" />
          </dl>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 md:px-8 py-7 md:py-9">
      <div className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.5vw,3rem)] leading-none tracking-[-0.02em] text-white tabular-nums">
        {value}
      </div>
      <div className="mt-2 text-[0.72rem] uppercase tracking-[0.14em] text-white/55 font-medium">
        {label}
      </div>
    </div>
  );
}
