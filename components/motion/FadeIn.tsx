'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

type FadeInProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  delay?: number;
  amount?: number;
  y?: number;
};

export function FadeIn({ children, delay = 0, amount = 0.15, y = 20, ...rest }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
