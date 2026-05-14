import Link from 'next/link';

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
    <footer className="bg-[var(--color-ink)] text-[var(--color-bone)]">
      <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="font-[family-name:var(--font-display)] text-[1.4rem] tracking-tight">
              Parish <span className="text-[var(--color-brass)]">&</span> Company LLC
            </div>
            <p className="mt-4 text-[0.95rem] text-white/70 max-w-sm leading-relaxed">
              An independent Registered Investment Adviser in Lake Oswego, Oregon.
              Original research published since 1998.
            </p>
            <p className="mt-6 text-[0.85rem] text-white/55 italic max-w-sm leading-relaxed">
              No fees accepted from any investment company. A written guarantee against
              conflicts of interest is provided to every client.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-[0.7rem] uppercase tracking-[0.15em] text-white/50 font-medium mb-4">
              Site
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.95rem] text-white/85 hover:text-[var(--color-brass)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-[0.7rem] uppercase tracking-[0.15em] text-white/50 font-medium mb-4">
              Disclosures
            </h3>
            <ul className="space-y-2.5">
              {disclosureLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.95rem] text-white/85 hover:text-[var(--color-brass)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <p className="text-[0.825rem] text-white/55">
            © {year} Parish & Company LLC. All rights reserved.
          </p>
          <p className="text-[0.825rem] text-white/55">
            Registered Investment Adviser · State of Oregon
          </p>
        </div>
      </div>
    </footer>
  );
}
