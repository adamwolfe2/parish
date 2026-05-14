'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/research', label: 'Research' },
  { href: '/philosophy', label: 'Philosophy' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="container nav" aria-label="Main">
      <Link href="/" className="nav-brand">Parish & Company LLC</Link>
      <div className="nav-items">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <motion.div key={item.href} whileHover={{ y: -1 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
              <Link className={`nav-link ${active ? 'active' : ''}`} href={item.href}>{item.label}</Link>
            </motion.div>
          );
        })}
      </div>
    </nav>
  );
}
