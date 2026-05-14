import Link from 'next/link';
import { MountainSilhouette } from '@/components/editorial/MountainSilhouette';

export default function NotFound() {
  return (
    <section className="relative border-t border-b border-[var(--color-hairline)] bg-[var(--color-bone)] overflow-hidden">
      <MountainSilhouette
        variant="range"
        stretch
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 md:h-24 text-[var(--color-moss)] opacity-[0.15]"
      />
      <div className="relative mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-24 md:py-32 text-center">
        <p className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.18em] font-medium text-[var(--color-moss)]">
          Error 404
        </p>
        <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-[var(--color-basalt)] max-w-2xl mx-auto">
          The page you are looking for is not here.
        </h1>
        <p className="mt-7 mx-auto max-w-xl text-[1.05rem] leading-[1.65] text-[var(--color-slate)]">
          It may have been moved during the recent site migration. The full research archive
          and all four main pages remain intact.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[0.95rem]">
          <Link href="/" className="link-editorial">
            <span>Return home</span>
            <span className="arrow" aria-hidden="true">→</span>
          </Link>
          <Link href="/research" className="link-editorial">
            <span>Browse research</span>
            <span className="arrow" aria-hidden="true">→</span>
          </Link>
          <Link href="/contact" className="link-editorial">
            <span>Contact us</span>
            <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
