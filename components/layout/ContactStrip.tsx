import Link from 'next/link';

export function ContactStrip() {
  return (
    <section
      aria-label="Contact"
      className="bg-[var(--color-basalt)] text-[var(--color-bone)] border-y border-[var(--color-hairline-strong)]"
    >
      <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="text-[0.72rem] uppercase tracking-[0.15em] text-[var(--color-brass)] font-medium">
              Inquiries
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-tight">
              For new business, research inquiries, or media,{' '}
              <Link href="/contact" className="underline decoration-[var(--color-brass)] underline-offset-4 decoration-1 hover:text-[var(--color-brass)] transition-colors">
                contact us directly
              </Link>
              .
            </h2>
          </div>
          <div className="md:col-span-5 space-y-3 text-[0.95rem]">
            <p className="flex flex-col">
              <span className="text-white/55 text-[0.78rem] uppercase tracking-[0.12em]">Phone</span>
              <a href="tel:+15037265967" className="hover:text-[var(--color-brass)] transition-colors">
                (503) 726-5967
              </a>
            </p>
            <p className="flex flex-col">
              <span className="text-white/55 text-[0.78rem] uppercase tracking-[0.12em]">Email</span>
              <a href="mailto:bill@billparish.com" className="hover:text-[var(--color-brass)] transition-colors">
                bill@billparish.com
              </a>
            </p>
            <p className="flex flex-col">
              <span className="text-white/55 text-[0.78rem] uppercase tracking-[0.12em]">Address</span>
              <span>4949 Meadows Road, Suite 600</span>
              <span>Lake Oswego, Oregon 97035</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
