import Link from 'next/link';

export default function PostNotFound() {
  return (
    <section className="border-t border-b border-[var(--color-hairline)] bg-[var(--color-bone)]">
      <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-24 md:py-32 text-center">
        <p className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.18em] font-medium text-[var(--color-moss)]">
          Error 404 · Research note not found
        </p>
        <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-[var(--color-basalt)] max-w-2xl mx-auto">
          That research note could not be located.
        </h1>
        <p className="mt-6 mx-auto max-w-xl text-[1.05rem] leading-[1.65] text-[var(--color-slate)]">
          It may have been moved during the recent site migration, or the slug may have changed.
          The full archive of 203 notes remains intact.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-[0.95rem]">
          <Link href="/research" className="link-editorial">
            <span>Return to the archive</span>
            <span className="arrow" aria-hidden="true">→</span>
          </Link>
          <Link href="/research/topics" className="link-editorial">
            <span>Browse by topic</span>
            <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
