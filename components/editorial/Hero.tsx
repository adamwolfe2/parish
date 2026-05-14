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
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/94 via-[var(--color-ink)]/80 to-[var(--color-ink)]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/75 via-transparent to-[var(--color-ink)]/25" />
      </div>

      <div className="relative z-10 mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-16 md:py-24 lg:py-28">
        <div className="max-w-[640px]">
          <p className="text-[0.7rem] uppercase tracking-[0.22em] font-medium text-[var(--color-brass)] mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--color-brass)]" />
            <span>Parish &amp; Company LLC · Portland, Oregon · Est. 1998</span>
          </p>

          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.15rem,4.2vw,3.5rem)] leading-[1.08] tracking-[-0.02em] text-white">
            A nationally recognized investment management firm in the Pacific Northwest.
          </h1>

          <p className="mt-6 max-w-xl text-[1rem] md:text-[1.05rem] leading-[1.6] text-white/75">
            Asset management for individuals, families, and institutions throughout the
            Northwest. Prudent decisions grounded in original research published since 1998.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[var(--color-brass)] hover:bg-[var(--color-bone)] text-[var(--color-ink)] px-5 py-2.5 text-[0.9rem] font-medium tracking-tight transition-colors group"
            >
              <span>Schedule a conversation</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-[0.9rem] font-medium text-white/85 hover:text-white px-5 py-2.5 border border-white/25 hover:border-white/60 transition-colors group"
            >
              <span>Read the research</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Press band */}
      <div className="relative z-10 border-t border-white/10 bg-[var(--color-ink)]/80 backdrop-blur-md">
        <MountainSilhouette className="pointer-events-none absolute -top-14 md:-top-16 left-0 right-0 h-14 md:h-16 text-[var(--color-brass)] opacity-[0.16]" />
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-5 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] font-medium text-white/50 whitespace-nowrap">
              Featured research in
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-1.5 font-[family-name:var(--font-display)] text-[0.88rem] md:text-[0.92rem] text-white/80">
              {featuredIn.map((p, i) => (
                <li key={p} className="flex items-center gap-6">
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
