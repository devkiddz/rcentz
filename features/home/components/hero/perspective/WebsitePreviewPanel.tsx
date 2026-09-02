'use client';

import { motion, useReducedMotion } from 'motion/react';

import { PerspectiveSurface } from '@/features/home/components/hero/perspective/PerspectiveSurface';

export function WebsitePreviewPanel() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.94 }}
      animate={{ opacity: 1, y: reduceMotion ? 0 : [0, -4, 0], scale: 1 }}
      transition={{
        opacity: { delay: reduceMotion ? 0 : 0.7, duration: 0.65 },
        scale: { delay: reduceMotion ? 0 : 0.7, duration: 0.65 },
        y: { duration: 5.1, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }
      }}
      className="relative overflow-hidden rounded-xl border border-theme-accent/18 bg-background/97 p-3 shadow-2xl backdrop-blur-2xl">
      <PerspectiveSurface />

      <div className="relative z-10">
        <div className="flex items-center justify-between font-mono text-[4.5px] text-muted">
          <div className="flex gap-3">
            <span>Home</span>
            <span>Features</span>
            <span>Pricing</span>
            <span>About</span>
          </div>
          <span>☰</span>
        </div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.95 }}
          className="mt-5 text-[9px] font-semibold leading-[1.2] lg:text-[11px]">
          Built for speed.
          <br />
          Designed to scale.
        </motion.p>

        <p className="mt-2 max-w-[150px] text-[5px] leading-3 text-muted">
          Powerful digital experiences that drive real results.
        </p>

        <motion.div
          initial={reduceMotion ? false : { width: 0 }}
          animate={{ width: '58%' }}
          transition={{ delay: reduceMotion ? 0 : 1.1, duration: 0.8 }}
          className="mt-4 h-1 rounded-full bg-theme-accent"
        />

        <div className="mt-4 flex items-end justify-between">
          <span className="rounded-md bg-theme-accent-soft px-2 py-1 font-mono text-[4.5px] text-theme-accent">
            Get Started
          </span>

          <div className="relative h-14 w-20">
            {Array.from({ length: 18 }).map((_, index) => {
              const left = (index * 19) % 88;
              const top = (index * 31) % 75;

              return (
                <motion.span
                  key={index}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: [0.18, 0.9, 0.18],
                          scale: [0.7, 1.15, 0.7]
                        }
                  }
                  transition={{
                    duration: 2.1 + (index % 4) * 0.3,
                    repeat: Infinity,
                    delay: index * 0.07
                  }}
                  style={{ left: `${left}%`, top: `${top}%` }}
                  className="absolute size-1 rounded-full bg-theme-accent"
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
