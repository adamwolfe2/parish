import Image from 'next/image';

type Stat = { value: string; label: string };

const stats: Stat[] = [
  { value: '27', label: 'Years independent' },
  { value: '199', label: 'Research notes published' },
  { value: '12', label: 'Tier-one publications' },
];

/**
 * Full-bleed mountain image overlaid with large stat numbers, in the
 * visual language of Vista's "Vista at a glance" band · massive thin
 * numerals across a hazy Cascades horizon.
 */
export function StatsBand() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="relative isolate overflow-hidden text-white"
    >
      <h2 id="stats-heading" className="sr-only">
        Parish &amp; Company at a glance
      </h2>

      <div className="absolute inset-0 z-0">
        <Image
          src="/images/mt-hood-hero.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={88}
          className="object-cover object-top"
        />
        {/* Wash for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink)]/30 via-[var(--color-ink)]/55 to-[var(--color-ink)]/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-24 md:py-36 lg:py-44">
        <p className="text-[0.7rem] uppercase tracking-[0.22em] font-medium text-white/80 mb-12 md:mb-20 flex items-center gap-3">
          <span className="h-px w-8 bg-[var(--color-brass)]" />
          <span>Parish &amp; Company at a glance</span>
        </p>

        <ul className="grid gap-y-14 gap-x-8 md:grid-cols-3 md:gap-x-12">
          {stats.map((s) => (
            <li key={s.label} className="text-center md:text-left">
              <p className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.03em] tabular-nums text-white">
                {s.value}
              </p>
              <p className="mt-3 text-[0.92rem] text-white/75 max-w-[20ch] mx-auto md:mx-0">
                {s.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
