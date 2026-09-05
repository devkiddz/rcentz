'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { ServiceCategorySummary } from '../../server/get-service-categories';

import { ServiceRichCard } from './ServiceRichCard';

type ServiceCategorySliderProps = {
  category: ServiceCategorySummary;
};

const AUTO_PLAY_MS = 6500;

export function ServiceCategorySlider({ category }: ServiceCategorySliderProps) {
  const t = useTranslations('ServiceCategorySlider');

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
    if (isPaused || category.services.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      move('forward', true);
    }, AUTO_PLAY_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [category.services.length, isPaused, move]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="h-px w-8 shrink-0 bg-theme-accent/35" />

          <p className="truncate font-mono text-[7px] uppercase tracking-[0.12em] text-muted">
            {t('browseCategory', {
              category: category.name
            })}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label={t('previousServices', {
              category: category.name
            })}
            onClick={() => move('back', true)}
            disabled={!canGoBack && category.services.length <= 1}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-[border-color,background-color,transform,opacity] duration-200 hover:border-theme-accent/25 hover:bg-theme-accent-soft active:scale-95 disabled:cursor-not-allowed disabled:opacity-40">
            <ArrowLeft className="size-3.5" />
          </button>

          <button
            type="button"
            aria-label={t('nextServices', {
              category: category.name
            })}
            onClick={() => move('forward', true)}
            disabled={!canGoForward && category.services.length <= 1}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-[border-color,background-color,transform,opacity] duration-200 hover:border-theme-accent/25 hover:bg-theme-accent-soft active:scale-95 disabled:cursor-not-allowed disabled:opacity-40">
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-background to-transparent sm:w-8"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-background to-transparent sm:w-8"
        />

        <div
          ref={railRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-1 pb-2 pt-1"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
          {category.services.map((service, index) => (
            <ServiceRichCard key={service.id} service={service} categoryName={category.name} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
