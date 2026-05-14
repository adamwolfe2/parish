import Image from 'next/image';
import fs from 'node:fs';
import path from 'node:path';

type Publication = {
  slug: string;
  name: string;
  file?: string;
  format?: 'svg' | 'png';
};

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

function resolveLogo(slug: string): { file: string; format: 'svg' | 'png' } | null {
  for (const fmt of ['svg', 'png'] as const) {
    const file = `${slug}.${fmt}`;
    const fullPath = path.join(LOGOS_DIR, file);
    if (fs.existsSync(fullPath)) return { file, format: fmt };
  }
  return null;
}

export function PressMarks() {
  const resolved = publications.map((p) => ({ ...p, logo: resolveLogo(p.slug) }));

  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-[var(--color-hairline)]" />
        <p className="text-[0.7rem] uppercase tracking-[0.2em] font-medium text-[var(--color-slate)]">
          Original research featured in
        </p>
        <span className="h-px flex-1 bg-[var(--color-hairline)]" />
      </div>

      <ul className="mt-12 md:mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-[var(--color-hairline)] border border-[var(--color-hairline)]">
        {resolved.map((p) => (
          <li
            key={p.slug}
            className="bg-[var(--color-bone)] flex items-center justify-center px-5 py-8 md:py-10 min-h-[100px] md:min-h-[120px] transition-colors hover:bg-white"
          >
            {p.logo ? (
              <Image
                src={`/images/logos/${p.logo.file}`}
                alt={p.name}
                width={160}
                height={48}
                className="max-h-7 md:max-h-8 w-auto object-contain"
                style={{ maxWidth: '85%' }}
                unoptimized={p.logo.format === 'svg'}
              />
            ) : (
              <span className="font-[family-name:var(--font-display)] text-[0.95rem] text-[var(--color-basalt)] leading-tight text-center">
                {p.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
