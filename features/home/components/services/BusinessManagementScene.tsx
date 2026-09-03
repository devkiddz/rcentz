'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { BusinessManagementGrowth } from './business-management/BusinessManagementGrowth';
import { BusinessManagementOperations } from './business-management/BusinessManagementOperations';

const chapters = [
  { id: 'operations', label: 'Operations' },
  { id: 'growth', label: 'Growth' }
] as const;

const SLIDE_DURATION = 16000;

export function BusinessManagementScene() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex(current => (current + 1) % chapters.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(timer);
  }, [isPaused, reduceMotion]);

  function move(direction: -1 | 1) {
    setActiveIndex(current => {
      const next = current + direction;

      if (next < 0) {
        return chapters.length - 1;
      }

      if (next >= chapters.length) {
        return 0;
      }

      return next;
    });
  }

  return (
    <div
      className="relative overflow-hidden p-4 sm:p-5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--theme-accent-soft)] opacity-20 blur-3xl"
      />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {chapters.map((chapter, index) => (
              <button
                key={chapter.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={[
                  'relative inline-flex h-8 items-center gap-2 overflow-hidden rounded-full border px-3',
                  'font-mono text-[8px] uppercase tracking-[0.14em]',
                  'transition-[background-color,border-color,color]',
                  index === activeIndex
                    ? 'border-border-strong bg-surface-raised text-foreground'
                    : 'border-border bg-background/70 text-muted hover:border-border-strong'
                ].join(' ')}>
                <span
                  className={[
                    'size-1.5 rounded-full',
                    index === activeIndex ? 'bg-[var(--theme-accent)]' : 'bg-border-strong'
                  ].join(' ')}
                />
                {String(index + 1).padStart(2, '0')} {chapter.label}
                {index === activeIndex && !reduceMotion && !isPaused ? (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px origin-left bg-[var(--theme-accent)]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                  />
                ) : null}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden font-mono text-[7px] uppercase tracking-[0.13em] text-muted sm:inline">
              {isPaused ? 'Paused' : 'Auto'}
            </span>

            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous business management illustration"
              className="inline-flex size-8 items-center justify-center rounded-full border border-border bg-background/70 text-muted transition-[background-color,border-color,color] hover:border-border-strong hover:bg-secondary hover:text-foreground">
              <ChevronLeft aria-hidden="true" className="size-3.5" />
            </button>

            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next business management illustration"
              className="inline-flex size-8 items-center justify-center rounded-full border border-border bg-background/70 text-muted transition-[background-color,border-color,color] hover:border-border-strong hover:bg-secondary hover:text-foreground">
              <ChevronRight aria-hidden="true" className="size-3.5" />
            </button>
          </div>
        </div>

        <div className="relative min-h-[445px] sm:min-h-[475px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={chapters[activeIndex].id}
              className="absolute inset-0"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: activeIndex === 0 ? -22 : 22
                    }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      x: activeIndex === 0 ? 22 : -22
                    }
              }
              transition={{ duration: 0.52, ease: 'easeOut' }}>
              {activeIndex === 0 ? <BusinessManagementOperations /> : <BusinessManagementGrowth />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
