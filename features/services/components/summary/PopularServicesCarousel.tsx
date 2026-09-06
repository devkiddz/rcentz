'use client';

import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { PopularService } from '../../server/get-popular-services';

import { ServiceRichCard } from './ServiceRichCard';

type PopularServicesCarouselProps = {
  services: PopularService[];
  title?: string;
  description?: string;
};

const AUTO_PLAY_MS = 7000;

export function PopularServicesCarousel({ services, title, description }: PopularServicesCarouselProps) {
  const t = useTranslations('SuggestedServices');

  const railRef = useRef<HTMLDivElement>(null);

  const [canGoBack, setCanGoBack] = useState(false);

  const [canGoForward, setCanGoForward] = useState(true);

  const [isPaused, setIsPaused] = useState(false);

  const syncControls = useCallback(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    setCanGoBack(rail.scrollLeft > 8);

    setCanGoForward(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 8);
  }, []);

  const getScrollDistance = useCallback(() => {
    const rail = railRef.current;

    if (!rail) {
      return 0;
    }

    const firstCard = rail.firstElementChild as HTMLElement | null;

    if (!firstCard) {
      return Math.min(rail.clientWidth * 0.86, 760);
    }

    const railStyles = window.getComputedStyle(rail);

    const gap = Number.parseFloat(railStyles.columnGap || railStyles.gap || '16') || 16;

    return firstCard.offsetWidth + gap;
  }, []);

  const move = useCallback(
    (direction: 'back' | 'forward', wrap = false) => {
      const rail = railRef.current;

      if (!rail) {
        return;
      }

      const distance = getScrollDistance();

      const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 12;

      const atStart = rail.scrollLeft <= 12;

      if (direction === 'forward' && atEnd && wrap) {
        rail.scrollTo({
          left: 0,
          behavior: 'smooth'
        });

        return;
      }

      if (direction === 'back' && atStart && wrap) {
        rail.scrollTo({
          left: rail.scrollWidth - rail.clientWidth,
          behavior: 'smooth'
        });

        return;
      }

      rail.scrollBy({
        left: direction === 'forward' ? distance : -distance,
        behavior: 'smooth'
      });
    },
    [getScrollDistance]
  );

  useEffect(() => {
    syncControls();

    const rail = railRef.current;

    if (!rail) {
      return;
    }

    rail.addEventListener('scroll', syncControls, {
      passive: true
    });

    window.addEventListener('resize', syncControls);

    return () => {
      rail.removeEventListener('scroll', syncControls);

      window.removeEventListener('resize', syncControls);
    };
  }, [syncControls]);

  useEffect(() => {
    if (isPaused || services.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      move('forward', true);
    }, AUTO_PLAY_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPaused, move, services.length]);

  if (services.length === 0) {
    return null;
  }

  const resolvedTitle = title ?? t('title');

  const resolvedDescription = description ?? t('description');

  return (
    <section className="relative border-y border-border py-20 sm:py-24">
      <div className="rcentz-section">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div className="max-w-[620px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-theme-accent/15 bg-theme-accent-soft px-3.5 py-2">
              <Sparkles className="size-3.5 text-theme-accent" />

              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-theme-accent">
                {t('eyebrow')}
              </span>
            </div>

            <h2 className="mt-5 text-[2.25rem] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-[3.2rem]">
              {resolvedTitle}
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-[620px] text-[13px] leading-7 text-muted sm:text-[15px]">
              {resolvedDescription}
            </p>
          </div>
        </div>

        <div
          className="relative mt-10 sm:mt-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-theme-accent/35" />

              <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted">
                {t('swipeToExplore')}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label={t('previousServices')}
                onClick={() => move('back', true)}
                disabled={!canGoBack && services.length <= 1}
                className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-[border-color,background-color,transform,opacity] duration-200 hover:border-theme-accent/25 hover:bg-theme-accent-soft active:scale-95 disabled:cursor-not-allowed disabled:opacity-40">
                <ArrowLeft className="size-3.5" />
              </button>

              <button
                type="button"
                aria-label={t('nextServices')}
                onClick={() => move('forward', true)}
                disabled={!canGoForward && services.length <= 1}
                className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-[border-color,background-color,transform,opacity] duration-200 hover:border-theme-accent/25 hover:bg-theme-accent-soft active:scale-95 disabled:cursor-not-allowed disabled:opacity-40">
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-background to-transparent sm:w-10"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-background to-transparent sm:w-10"
            />

            <div
              ref={railRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-1 pb-3 pt-1"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}>
              {services.map((item, index) => (
                <ServiceRichCard
                  key={item.service.id}
                  service={item.service}
                  categoryName={item.categoryName}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
