'use client';

import { usePathname } from 'next/navigation';

/**
 * Hides the marketing header/footer on /studio so Bill's editor isn't wrapped
 * in site chrome. The Studio owns the whole viewport.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/studio')) return null;
  return <>{children}</>;
}
