'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { HomepageData } from '@/features/home/server/get-homepage-data';

type Project = HomepageData['projects'][number];

type ProjectScreenshotCarouselProps = {
  project: Project;
  featured?: boolean;
};

const SLIDE_DURATION = 12000;

export function ProjectScreenshotCarousel({ project, featured = false }: ProjectScreenshotCarouselProps) {
  const reduceMotion = useReducedMotion();
  const screenshots = project.media;
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
      <div className="flex h-full min-h-[250px] items-center justify-center bg-surface-muted/20 p-8">
        <div className="max-w-xs text-center">
          <div className="mx-auto flex size-10 items-center justify-center rounded-xl border border-border bg-background">
            <Images aria-hidden="true" className="size-4 text-muted" />
          </div>

          <p className="mt-4 text-sm font-medium">Project screenshots</p>
          <p className="mt-2 text-[10px] leading-5 text-muted">
            No portfolio media has been attached to {project.name} yet.
          </p>
        </div>
      </div>
    );
  }

  const active = screenshots[activeIndex];

  return (
    <div
      className="relative h-full min-h-[250px] overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active.id}
          className="absolute inset-0"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.012 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}>
          <Image
            src={active.url}
            alt={active.alt ?? `${project.name} screenshot ${activeIndex + 1}`}
            fill
            sizes={featured ? '(max-width: 1024px) 100vw, 60vw' : '(max-width: 1024px) 100vw, 33vw'}
            className="object-cover object-top"
            priority={featured && activeIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent"
      />

      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
        <div className="min-w-0 rounded-xl border border-white/15 bg-black/45 px-3 py-2 text-white backdrop-blur-md">
          <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/55">
            {String(activeIndex + 1).padStart(2, '0')} / {String(screenshots.length).padStart(2, '0')}
          </p>

          <p className="mt-1 truncate text-[9px] font-medium">{active.caption ?? project.name}</p>
        </div>

        {screenshots.length > 1 ? (
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label={`Previous ${project.name} screenshot`}
              className="inline-flex size-8 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition-colors hover:bg-black/70">
              <ChevronLeft aria-hidden="true" className="size-3.5" />
            </button>

            <button
              type="button"
              onClick={() => move(1)}
              aria-label={`Next ${project.name} screenshot`}
              className="inline-flex size-8 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition-colors hover:bg-black/70">
              <ChevronRight aria-hidden="true" className="size-3.5" />
            </button>
          </div>
        ) : null}
      </div>

      {screenshots.length > 1 ? (
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-2 backdrop-blur-md">
          {screenshots.map((screenshot, index) => (
            <button
              key={screenshot.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${project.name} screenshot ${index + 1}`}
              className={[
                'h-1 rounded-full transition-[width,opacity,background-color] duration-300',
                index === activeIndex
                  ? 'w-5 bg-white opacity-100'
                  : 'w-1.5 bg-white opacity-40 hover:opacity-75'
              ].join(' ')}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
