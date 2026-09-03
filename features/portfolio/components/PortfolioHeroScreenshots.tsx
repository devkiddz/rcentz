'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { useEffect, useState } from 'react';

type PortfolioHeroScreenshot = {
  id: string;
  url: string;
  alt: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  sortOrder: number;
  projectId: string;
  projectName: string;
  projectSlug: string;
  projectType: string;
};

type PortfolioHeroScreenshotsProps = {
  screenshots: PortfolioHeroScreenshot[];
};

const SLIDE_DURATION = 11000;

function humanize(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function PortfolioHeroScreenshots({ screenshots }: PortfolioHeroScreenshotsProps) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion || paused || screenshots.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex(current => (current + 1) % screenshots.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, screenshots.length]);

  function move(direction: -1 | 1) {
    if (screenshots.length <= 1) {
      return;
    }

    setActiveIndex(current => {
      const next = current + direction;

      if (next < 0) {
        return screenshots.length - 1;
      }

      if (next >= screenshots.length) {
        return 0;
      }

      return next;
    });
  }

  if (!screenshots.length) {
    return (
      <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-[28px] border border-border bg-surface-muted/20 p-8 sm:min-h-[410px] lg:min-h-[500px]">
        <div aria-hidden="true" className="absolute inset-0 opacity-60 rcentz-grid-fade" />

        <div className="relative z-10 max-w-xs text-center">
          <div className="mx-auto flex size-10 items-center justify-center rounded-xl border border-border bg-background">
            <Images aria-hidden="true" className="size-4 text-muted" />
          </div>

          <p className="mt-4 text-sm font-medium">Portfolio screenshots</p>
          <p className="mt-2 text-[10px] leading-5 text-muted">
            Published project media will appear here when screenshots are attached.
          </p>
        </div>
      </div>
    );
  }

  const active = screenshots[activeIndex];

  return (
    <div
      className="relative min-h-[340px] overflow-hidden rounded-[28px] border border-border bg-black shadow-lg sm:min-h-[410px] lg:min-h-[500px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${active.projectId}-${active.id}`}
          className="absolute inset-0"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.012 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}>
          <Image
            src={active.url}
            alt={active.alt ?? `${active.projectName} portfolio screenshot`}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-top"
            priority={activeIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/82 via-black/28 to-transparent"
      />

      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-2 text-white backdrop-blur-md sm:left-5 sm:top-5">
        <span className="size-1.5 rounded-full bg-theme-accent" />
        <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-white/70">
          {humanize(active.projectType)}
        </span>
      </div>

      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 sm:inset-x-5 sm:bottom-5">
        <div className="min-w-0 rounded-xl border border-white/15 bg-black/45 px-3 py-2.5 text-white backdrop-blur-md">
          <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-white/55">
            {String(activeIndex + 1).padStart(2, '0')} / {String(screenshots.length).padStart(2, '0')}
          </p>

          <p className="mt-1 max-w-[320px] truncate text-[10px] font-medium">{active.projectName}</p>

          {active.caption ? (
            <p className="mt-1 max-w-[320px] truncate text-[8px] text-white/55">{active.caption}</p>
          ) : null}
        </div>

        {screenshots.length > 1 ? (
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous portfolio screenshot"
              className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition-colors hover:bg-black/70">
              <ChevronLeft aria-hidden="true" className="size-4" />
            </button>

            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next portfolio screenshot"
              className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition-colors hover:bg-black/70">
              <ChevronRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
