'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error boundary caught:', error);
  }, [error]);

  return (
    <section className="border-t border-b border-[var(--color-hairline)] bg-[var(--color-bone)]">
      <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-24 md:py-32 text-center">
        <p className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.18em] font-medium text-[var(--color-moss)]">
          Something went wrong
        </p>
        <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-[var(--color-basalt)] max-w-2xl mx-auto">
          An unexpected error occurred while rendering this page.
        </h1>
        <p className="mt-6 mx-auto max-w-xl text-[1.05rem] leading-[1.65] text-[var(--color-slate)]">
          Please try again. If the problem persists, you may{' '}
          <Link href="/contact" className="text-[var(--color-moss)] underline decoration-[var(--color-moss)]/40 underline-offset-[6px] hover:decoration-[var(--color-moss)]">
            contact us
          </Link>{' '}
          directly.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 bg-[var(--color-moss)] hover:bg-[var(--color-moss-deep)] text-white px-6 py-3 text-[0.95rem] font-medium tracking-tight transition-colors group"
          >
            <span>Try again</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">↻</span>
          </button>
          <Link href="/" className="link-editorial text-[0.95rem]">
            <span>Return home</span>
            <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
