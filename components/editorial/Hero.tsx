import Image from 'next/image';
import Link from 'next/link';
import { Kicker } from './Kicker';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Image side */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[58%] z-0">
        <div className="relative h-full w-full">
          <Image
            src="/images/mt-hood.jpg"
            alt="Mt. Hood at dawn, viewed from Trillium Lake, Oregon"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 58vw"
            className="object-cover grayscale contrast-[1.08] brightness-[0.92]"
          />
          {/* Bone wash for legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bone)] via-[var(--color-bone)]/55 to-[var(--color-bone)]/10 md:from-[var(--color-bone)] md:via-[var(--color-bone)]/65 md:to-[var(--color-bone)]/0" />
          {/* Mobile darker overlay */}
          <div className="absolute inset-0 bg-[var(--color-bone)]/40 md:bg-transparent" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-32 lg:py-40">
        <div className="max-w-[640px] md:max-w-[680px]">
          <Kicker className="mb-7">Parish & Company LLC · Since 1998</Kicker>

          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02] tracking-[-0.02em] text-[var(--color-basalt)]">
            Independent investment research and management.
          </h1>

          <p className="mt-8 max-w-xl text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.55] text-[var(--color-slate)] font-[family-name:var(--font-display)] italic">
            A 27-year record of original analysis across corporate governance,
            tax structure, pensions, and capital markets.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/research"
              className="link-editorial text-[1rem]"
            >
              <span>Read the latest research</span>
              <span className="arrow" aria-hidden="true">→</span>
            </Link>
            <Link
              href="/philosophy"
              className="text-[0.95rem] text-[var(--color-slate)] hover:text-[var(--color-basalt)] transition-colors border-b border-transparent hover:border-[var(--color-hairline-strong)]"
            >
              Our philosophy
            </Link>
          </div>
        </div>
      </div>

      {/* Hairline footer with publication metadata */}
      <div className="relative z-10 border-t border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.72rem] uppercase tracking-[0.15em] text-[var(--color-slate)] font-[family-name:var(--font-mono)] font-medium">
          <span>Vol. XXVII</span>
          <span aria-hidden="true" className="text-[var(--color-hairline-strong)]">·</span>
          <span>Issued from Lake Oswego, Oregon</span>
          <span aria-hidden="true" className="text-[var(--color-hairline-strong)] hidden md:inline">·</span>
          <span className="hidden md:inline">Research published since 1998</span>
        </div>
      </div>
    </section>
  );
}
