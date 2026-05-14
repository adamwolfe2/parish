'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

const items = [
  { href: '/research', label: 'Research' },
  { href: '/philosophy', label: 'Philosophy' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[var(--color-bone)]/90 backdrop-blur-md border-b border-[var(--color-hairline)]'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-[1.15rem] md:text-[1.25rem] tracking-tight text-[var(--color-basalt)] hover:text-[var(--color-moss)] transition-colors"
          >
            Parish <span className="text-[var(--color-moss)]">&</span> Company
          </Link>

          <nav className="hidden md:flex items-center gap-9" aria-label="Primary">
            {items.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative text-[0.95rem] tracking-tight transition-colors',
                    active
                      ? 'text-[var(--color-basalt)]'
                      : 'text-[var(--color-slate)] hover:text-[var(--color-basalt)]',
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-0 right-0 h-px bg-[var(--color-moss)] transition-transform duration-300 origin-left',
                      active ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-3 -mr-3 text-[var(--color-basalt)] min-w-[44px] min-h-[44px] inline-flex items-center justify-center"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M3 6h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <nav id="mobile-nav" className="md:hidden pb-6 pt-2 border-t border-[var(--color-hairline)]" aria-label="Mobile">
            <ul className="space-y-1">
              {items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'block py-3 text-base',
                        active ? 'text-[var(--color-basalt)]' : 'text-[var(--color-slate)]',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
