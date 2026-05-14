import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="border-t border-b border-[var(--color-hairline)]">
      <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-24 md:py-32">
        <p className="text-[0.72rem] uppercase tracking-[0.15em] font-medium text-[var(--color-moss)]">
          Error 404
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-[var(--color-basalt)]">
          The page you are looking for is not here.
        </h1>
        <p className="mt-6 max-w-xl text-[var(--text-lead)] leading-[1.55] text-[var(--color-slate)]">
          It may have been moved during the recent site migration. The full research archive
          remains intact.
        </p>
        <div className="mt-10 flex flex-wrap gap-6 text-[0.95rem]">
          <Link href="/" className="link-editorial"><span>Return home</span><span className="arrow">→</span></Link>
          <Link href="/research" className="link-editorial"><span>Browse research</span><span className="arrow">→</span></Link>
        </div>
      </div>
    </section>
  );
}
