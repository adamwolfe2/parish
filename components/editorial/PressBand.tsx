import Image from 'next/image';
import fs from 'node:fs';
import path from 'node:path';

type Publication = { slug: string; name: string };

const publications: Publication[] = [
  { slug: 'nyt', name: 'The New York Times' },
  { slug: 'wsj', name: 'The Wall Street Journal' },
  { slug: 'bloomberg', name: 'Bloomberg' },
  { slug: 'barrons', name: "Barron's" },
  { slug: 'ft', name: 'Financial Times' },
  { slug: 'la-times', name: 'Los Angeles Times' },
  { slug: 'the-guardian', name: 'The Guardian' },
  { slug: 'npr', name: 'NPR' },
  { slug: 'usa-today', name: 'USA Today' },
  { slug: 'fortune', name: 'Fortune' },
  { slug: 'oregonian', name: 'The Oregonian' },
  { slug: 'willamette-week', name: 'Willamette Week' },
];

const LOGOS_DIR = path.join(process.cwd(), 'public', 'images', 'logos');

function resolveLogo(slug: string): { file: string; isSvg: boolean } | null {
  for (const fmt of ['svg', 'png'] as const) {
    const file = `${slug}.${fmt}`;
    if (fs.existsSync(path.join(LOGOS_DIR, file))) {
      return { file, isSvg: fmt === 'svg' };
    }
  }
  return null;
}

/**
 * Cream press band that sits directly under the hero. Reads as a
 * credibility footer, not site chrome. Logos at ~28px height with generous
 * spacing.
 */
export function PressBand() {
  const resolved = publications.map((p) => ({ ...p, logo: resolveLogo(p.slug) }));

  return (
    <section
      aria-label="Press credentials"
      className="bg-[var(--color-bone)] border-b border-[var(--color-hairline)]"
    >
      <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-10 md:py-12">
        <p className="text-[0.65rem] uppercase tracking-[0.22em] font-medium text-[var(--color-slate)] text-center mb-7">
          Featured research in
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 md:gap-x-14 gap-y-7">
          {resolved.map((p) => (
            <li key={p.slug} className="flex items-center" style={{ height: 32 }}>
              {p.logo ? (
                <Image
                  src={`/images/logos/${p.logo.file}`}
                  alt={p.name}
                  width={160}
                  height={32}
                  className="h-6 md:h-7 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                  unoptimized={p.logo.isSvg}
                />
              ) : (
                <span className="font-[family-name:var(--font-display)] text-[0.95rem] text-[var(--color-basalt)]/85">
                  {p.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
