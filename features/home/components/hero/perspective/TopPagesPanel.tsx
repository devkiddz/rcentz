'use client';

import { motion, useReducedMotion } from 'motion/react';

import { PerspectiveSurface } from '@/features/home/components/hero/perspective/PerspectiveSurface';

const PAGES = [
  ['/', '24.5K'],
  ['/products', '18.2K'],
  ['/pricing', '11.7K'],
  ['/about', '8.9K'],
  ['/contact', '6.3K']
] as const;

export function TopPagesPanel() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: 18, scale: 0.94 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: reduceMotion ? 0 : 0.55, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-xl border border-theme-accent/16 bg-background/96 p-3 shadow-2xl backdrop-blur-2xl">
      <PerspectiveSurface />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <p className="text-[7px] font-semibold lg:text-[8px]">Top Pages</p>
          <span className="font-mono text-[5px] uppercase tracking-[0.1em] text-muted">Views</span>
        </div>

        <div className="mt-3 space-y-2">
          {PAGES.map(([page, views], index) => (
            <motion.div
              key={page}
              initial={reduceMotion ? false : { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.75 + index * 0.08 }}
              className="flex items-center justify-between gap-3">
              <span className="font-mono text-[5px] text-muted lg:text-[6px]">{page}</span>
              <span className="font-mono text-[5px] text-foreground lg:text-[6px]">{views}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-3 inline-flex rounded-md border border-border bg-background/70 px-2 py-1 font-mono text-[5px] text-muted">
          View all
        </div>
      </div>
    </motion.div>
  );
}
