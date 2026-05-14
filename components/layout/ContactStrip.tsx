import Link from 'next/link';

export function ContactStrip() {
  return (
    <section
      aria-label="Contact"
      className="bg-[var(--color-bone)] border-y border-[var(--color-hairline)]"
    >
      <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16 md:items-end">
          <div className="md:col-span-7">
            <p className="text-[0.72rem] uppercase tracking-[0.18em] font-medium text-[var(--color-moss)] flex items-center gap-4">
              <span className="h-px w-10 bg-[var(--color-moss)]" />
              <span>Inquiries</span>
            </p>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.4vw,2.65rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-basalt)]">
              For new business, research inquiries, or media,{' '}
              <Link
                href="/contact"
                className="text-[var(--color-moss)] underline decoration-[var(--color-moss)]/40 hover:decoration-[var(--color-moss)] underline-offset-[6px] decoration-1 transition-colors"
              >
                contact us directly
              </Link>
              .
            </h2>
          </div>
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-5 md:gap-6">
            <ContactItem label="Phone" value="(503) 726-5967" href="tel:+15037265967" />
            <ContactItem label="Email" value="bill@billparish.com" href="mailto:bill@billparish.com" />
            <div className="sm:col-span-2 md:col-span-1">
              <p className="text-[0.72rem] uppercase tracking-[0.14em] font-medium text-[var(--color-slate)] mb-1.5">
                Office
              </p>
              <address className="not-italic text-[0.98rem] leading-[1.5] text-[var(--color-basalt)]">
                4949 Meadows Road, Suite 600<br />
                Lake Oswego, Oregon 97035
              </address>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <div>
      <p className="text-[0.72rem] uppercase tracking-[0.14em] font-medium text-[var(--color-slate)] mb-1.5">
        {label}
      </p>
      <a
        href={href}
        className="text-[0.98rem] text-[var(--color-basalt)] hover:text-[var(--color-moss)] transition-colors"
      >
        {value}
      </a>
    </div>
  );
}
