'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { useEffect, useState } from 'react';

export type PortfolioMediaItem = {
  id: string;
  url: string;
  alt: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  sortOrder: number;
};

type PortfolioMediaCarouselProps = {
  projectName: string;
  media: readonly PortfolioMediaItem[];
  className?: string;
  autoPlay?: boolean;
};

const SLIDE_DURATION = 11000;

export function PortfolioMediaCarousel({
  projectName,
  media,
  className,
  autoPlay = true
}: PortfolioMediaCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (activeIndex < media.length) {
      return;
    }

    setActiveIndex(0);
  }, [activeIndex, media.length]);

  useEffect(() => {
    if (!autoPlay || reduceMotion || paused || media.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex(current => (current + 1) % media.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(timer);
  }, [autoPlay, media.length, paused, reduceMotion]);

  function move(direction: -1 | 1) {
    if (media.length <= 1) {
      return;
    }

    setActiveIndex(current => {
      const next = current + direction;

      if (next < 0) {
        return media.length - 1;
      }

      if (next >= media.length) {
        return 0;
      }

      return next;
    });
  }

  if (!media.length) {
    return (
      <div
        className={[
          'relative flex min-h-[280px] items-center justify-center overflow-hidden bg-surface-muted/25',
          className ?? ''
        ].join(' ')}>
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-50 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] [background-size:64px_64px]"
        />

        <div className="relative z-10 max-w-xs p-8 text-center">
          <div className="mx-auto flex size-11 items-center justify-center rounded-2xl border border-border bg-background/85">
            <Images aria-hidden="true" className="size-4 text-muted" />
          </div>

          <p className="mt-4 text-sm font-medium">{projectName}</p>

          <p className="mt-2 text-[10px] leading-5 text-muted">
            Project media has not been attached yet.
          </p>
        </div>
      </div>
    );
  }

  const active = media[Math.min(activeIndex, media.length - 1)];

  return (
    <div
      className={[
        'relative min-h-[280px] overflow-hidden bg-black',
        className ?? ''
      ].join(' ')}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active.id}
          role="img"
          aria-label={active.alt ?? `${projectName} project screen`}
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: `url(${JSON.stringify(active.url)})`
          }}
          initial={reduceMotion ? false : { opacity: 0, scale: 1.012 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </AnimatePresence>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/78 via-black/20 to-transparent"
      />

      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 sm:inset-x-5 sm:bottom-5">
        <div className="min-w-0 rounded-xl border border-white/15 bg-black/45 px-3 py-2.5 text-white backdrop-blur-md">
          <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-white/55">
            {String(activeIndex + 1).padStart(2, '0')} / {String(media.length).padStart(2, '0')}
          </p>

          <p className="mt-1 max-w-[300px] truncate text-[9px] font-medium">
            {active.caption ?? projectName}
          </p>
        </div>

        {media.length > 1 ? (
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label={`Previous ${projectName} project screen`}
              className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition-colors hover:bg-black/70">
              <ChevronLeft aria-hidden="true" className="size-4" />
            </button>

            <button
              type="button"
              onClick={() => move(1)}
              aria-label={`Next ${projectName} project screen`}
              className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition-colors hover:bg-black/70">
              <ChevronRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        ) : null}
      </div>

      {media.length > 1 ? (
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-2 backdrop-blur-md sm:left-5 sm:top-5">
          {media.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${projectName} project screen ${index + 1}`}
              className={[
                'h-1 rounded-full transition-[width,opacity,background-color] duration-300',
                index === activeIndex
                  ? 'w-6 bg-white opacity-100'
                  : 'w-1.5 bg-white opacity-40 hover:opacity-75'
              ].join(' ')}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
