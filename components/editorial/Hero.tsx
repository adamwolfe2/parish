import Image from 'next/image';
import Link from 'next/link';
import { MountainSilhouette } from './MountainSilhouette';

const featuredIn = [
  'The New York Times',
  'The Wall Street Journal',
  'Bloomberg',
  "Barron's",
  'Financial Times',
  'The Guardian',
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-bone)]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/mt-hood.jpg"
          alt="Mt. Hood at dawn, viewed from Trillium Lake, Oregon"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/96 via-[var(--color-ink)]/85 to-[var(--color-ink)]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/85 via-transparent to-[var(--color-ink)]/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-28 md:py-40 lg:py-48">
        <div className="max-w-[760px]">
          <p className="text-[0.72rem] uppercase tracking-[0.22em] font-medium text-[var(--color-brass)] mb-9 flex items-center gap-4">
            <span className="h-px w-12 bg-[var(--color-brass)]" />
            <span>Parish &amp; Company LLC · Portland, Oregon · Est. 1998</span>
          </p>

          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.75rem,6.5vw,5.25rem)] leading-[1.02] tracking-[-0.025em] text-white">
            A nationally recognized investment management firm in the Pacific Northwest.
          </h1>

          <p className="mt-9 max-w-2xl text-[clamp(1.1rem,1.4vw,1.3rem)] leading-[1.55] text-white/80">
            Asset management for individuals, families, and institutions throughout the
            Northwest. Prudent decisions grounded in original research published since
            1998 and featured across tier-one business journalism.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-4">
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

      {/* Press band — earned credibility, not SaaS stats */}
      <div className="relative z-10 border-t border-white/10 bg-[var(--color-ink)]/75 backdrop-blur-md">
        {/* Subtle ridge silhouette under the press band */}
        <MountainSilhouette className="pointer-events-none absolute -top-16 md:-top-20 left-0 right-0 h-16 md:h-20 text-[var(--color-brass)] opacity-[0.18]" />
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-7 md:py-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
            <p className="text-[0.7rem] uppercase tracking-[0.18em] font-medium text-white/55 whitespace-nowrap">
              Featured research in
            </p>
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 font-[family-name:var(--font-display)] text-[0.95rem] md:text-[1rem] text-white/85">
              {featuredIn.map((p, i) => (
                <li key={p} className="flex items-center gap-7">
                  {i > 0 && <span aria-hidden="true" className="text-white/20 hidden md:inline">·</span>}
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
