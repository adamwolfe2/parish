'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Page-level smooth scroll. Mounts a Lenis instance with conservative
 * easing so the scroll feels weighty but never sluggish. Skipped if the
 * user has prefers-reduced-motion turned on.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Don't apply smooth scrolling inside Sanity Studio · it has its own
    // scrolling regions and Lenis interferes with the editor.
    if (window.location.pathname.startsWith('/studio')) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
