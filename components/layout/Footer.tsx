import Link from 'next/link';
import { MountainSilhouette } from '@/components/editorial/MountainSilhouette';

const navLinks = [
  { href: '/research', label: 'Research' },
  { href: '/philosophy', label: 'Philosophy' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const disclosureLinks = [
  { href: '/form-adv', label: 'Form ADV' },
  { href: '/code-of-ethics', label: 'Code of Ethics' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--color-mist)]/55" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      {/* PNW silhouette — full-width mountain divider at the very top of the footer */}
      <div aria-hidden="true" className="relative w-full h-24 md:h-32 overflow-hidden border-t border-[var(--color-hairline)]">
        <MountainSilhouette
          variant="hood"
          stretch
          className="absolute inset-0 w-full h-full text-[var(--color-moss)] opacity-[0.30]"
        />
      </div>

      <div className="relative mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 pt-12 md:pt-16 pb-12">
        <div className="grid gap-12 md:gap-16 md:grid-cols-12 border-b border-[var(--color-hairline)] pb-12 md:pb-16">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="font-[family-name:var(--font-display)] text-[1.45rem] tracking-tight text-[var(--color-basalt)] hover:text-[var(--color-moss)] transition-colors"
            >
              Parish <span className="text-[var(--color-moss)]">&amp;</span> Company LLC
            </Link>
            <p className="mt-5 text-[0.95rem] text-[var(--color-slate)] max-w-sm leading-[1.65]">
              An independent Registered Investment Adviser in Lake Oswego, Oregon.
              Original research published since 1998.
            </p>
            <p className="mt-6 text-[0.85rem] text-[var(--color-slate)]/85 italic max-w-sm leading-[1.65]">
              No fees accepted from any investment company, either directly or indirectly.
              A written guarantee against conflicts of interest is provided to every client.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-slate)] font-medium mb-5">
              Site
            </h3>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.95rem] text-[var(--color-basalt)] hover:text-[var(--color-moss)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-slate)] font-medium mb-5">
              Disclosures
            </h3>
            <ul className="space-y-3">
              {disclosureLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.95rem] text-[var(--color-basalt)] hover:text-[var(--color-moss)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <p className="text-[0.82rem] text-[var(--color-slate)]">
            © {year} Parish &amp; Company LLC. All rights reserved.
          </p>
          <p className="text-[0.82rem] text-[var(--color-slate)]">
            Registered Investment Adviser · State of Oregon
          </p>
        </div>
      </div>
    </footer>
  );
}
