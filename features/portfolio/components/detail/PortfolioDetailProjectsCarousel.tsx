'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { PortfolioProjectCard } from '@/features/portfolio/components/PortfolioProjectCard';

import type { PortfolioProject } from '@/features/portfolio/server/get-portfolio-projects';

type PortfolioDetailProjectsCarouselProps = {
  projects: PortfolioProject[];
};

export function PortfolioDetailProjectsCarousel({ projects }: PortfolioDetailProjectsCarouselProps) {
  const t = useTranslations('PortfolioMoreProjects');

  const viewportRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const [canScrollRight, setCanScrollRight] = useState(projects.length > 1);

  const updateScrollState = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);

    setCanScrollLeft(viewport.scrollLeft > 4);

    setCanScrollRight(viewport.scrollLeft < maxScrollLeft - 4);
  }, []);

  const scrollProjects = useCallback((direction: 'previous' | 'next') => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const amount = viewport.clientWidth * 0.82;

    viewport.scrollBy({
      left: direction === 'next' ? amount : -amount,

      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    updateScrollState();

    viewport.addEventListener('scroll', updateScrollState, {
      passive: true
    });

    window.addEventListener('resize', updateScrollState);

    return () => {
      viewport.removeEventListener('scroll', updateScrollState);

      window.removeEventListener('resize', updateScrollState);
    };
  }, [projects.length, updateScrollState]);

  if (!projects.length) {
    return null;
  }

  return (
    <section className="border-t border-border py-20 sm:py-24">
      <div className="rcentz-section">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-theme-accent" />

              <p className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-muted">
                {t('eyebrow')}
              </p>
            </div>

            <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-[1.04] tracking-[-0.05em] text-foreground sm:text-4xl">
              {t('title')}
            </h2>

            <p className="mt-4 max-w-xl text-[13px] leading-6 text-muted">{t('description')}</p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/portfolio"
              className="group mr-1 inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-[11px] font-medium text-foreground transition-[background-color,border-color,transform] hover:-translate-y-px hover:border-border-strong hover:bg-surface-muted">
              {t('viewAll')}

              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <button
              type="button"
              onClick={() => {
                scrollProjects('previous');
              }}
              disabled={!canScrollLeft}
              aria-label={t('previous')}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-[background-color,border-color,opacity,transform] hover:-translate-y-px hover:border-border-strong hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-30">
              <ArrowLeft aria-hidden="true" className="size-3.5" />
            </button>

            <button
              type="button"
              onClick={() => {
                scrollProjects('next');
              }}
              disabled={!canScrollRight}
              aria-label={t('next')}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-[background-color,border-color,opacity,transform] hover:-translate-y-px hover:border-border-strong hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-30">
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </button>
          </div>
        </header>

        <div
          ref={viewportRef}
          className="
            mt-10
            flex
            snap-x
            snap-mandatory
            gap-6
            overflow-x-auto
            pb-4
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          ">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="
                  w-[88%]
                  shrink-0
                  snap-start
                  sm:w-[72%]
                  lg:w-[calc((100%-1.5rem)/2)]
                ">
              <PortfolioProjectCard project={project} index={index} featured={project.featured} />
            </div>
          ))}
        </div>

        {projects.length > 1 ? (
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {projects.map(project => (
              <span key={project.id} aria-hidden="true" className="h-1 w-6 rounded-full bg-border" />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
