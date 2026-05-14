'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

type FadeInProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  delay?: number;
  amount?: number;
  y?: number;
};

/**
 * Reveal helper. Content is fully visible by default — we only animate
 * subtle upward translation on first scroll into view. If the user prefers
 * reduced motion (or this renders during SSR without JS), content is
 * statically visible.
 *
 * Critically: starting opacity is 1, NOT 0. The previous implementation
 * left content at opacity 0 until the viewport detector triggered, which
 * produced apparently-blank pages on slow connections and made the body
 * copy of Philosophy / About / individual research notes invisible.
 */
export function FadeIn({ children, delay = 0, amount = 0.05, y = 16, ...rest }: FadeInProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <div {...(rest as object)}>{children}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 1, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
