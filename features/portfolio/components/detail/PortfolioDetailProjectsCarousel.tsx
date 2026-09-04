'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

import { DeliveryProfileChart, type DeliveryProfileDatum } from '@/components/charts/DeliveryProfileChart';

import { ReadinessGaugeChart } from '@/components/charts/ReadinessGaugeChart';

import type { PortfolioProject } from '@/features/portfolio/server/get-portfolio-projects';

import { PortfolioProjectVisual } from '../PortfolioProjectVisual';

type PortfolioDetailProjectsCarouselProps = {
  projects: PortfolioProject[];
};

function humanize(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function clampProgress(value: number) {
  return Math.max(0, Math.min(100, value));
}

function getDeliveryProfile(progress: number): DeliveryProfileDatum[] {
  const safeProgress = clampProgress(progress);

  const phases = ['Foundation', 'Structure', 'Build', 'Integrate', 'Validate', 'Release'];

  const phaseSize = 100 / phases.length;

  return phases.map((label, index) => {
    const phaseStart = index * phaseSize;
    const phaseEnd = phaseStart + phaseSize;

    const completed = clampProgress(((safeProgress - phaseStart) / phaseSize) * 100);

    const trajectory = safeProgress <= phaseStart ? 0 : safeProgress >= phaseEnd ? 100 : completed;

    return {
      label,
      completed,
      remaining: 100 - completed,
      trajectory
    };
  });
}

function CarouselProjectCard({ project }: { project: PortfolioProject }) {
  const safeProgress = clampProgress(project.progress);

  const visibleTechnologies = project.technologies.slice(0, 3);

  const remainingTechnologies = Math.max(project.technologies.length - visibleTechnologies.length, 0);

  const deliveryProfile = getDeliveryProfile(safeProgress);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-border bg-background/55 transition-[background-color,border-color,box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:border-border-strong hover:bg-background/85 hover:shadow-lg">
      {/* VISUAL */}
      <Link
        href={`/portfolio/${project.slug}`}
        aria-label={`View ${project.name} case study`}
        className="relative block h-[245px] overflow-hidden sm:h-[255px] lg:h-[235px]">
        <PortfolioProjectVisual project={project} />

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4">
          {project.featured ? (
            <span className="rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[7px] font-medium uppercase tracking-[0.14em] text-white/80 backdrop-blur-xl">
              Featured
            </span>
          ) : (
            <span />
          )}

          <span className="rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.12em] text-white/65 backdrop-blur-xl">
            {safeProgress}%
          </span>
        </div>
      </Link>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-5">
        {/* IDENTITY */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[7px] font-medium uppercase tracking-[0.15em] text-theme-accent-strong">
            {humanize(project.type)}
          </span>

          <span className="size-1 rounded-full bg-border-strong" />

          <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted">
            {humanize(project.status)}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">
          {project.name}
        </h3>

        <p className="mt-3 line-clamp-3 text-[12px] leading-6 text-muted">
          {project.tagline ?? project.description ?? 'Published Rcentz project.'}
        </p>

        {/* TECHNOLOGIES */}
        {visibleTechnologies.length > 0 ? (
          <div className="mt-5 flex flex-wrap items-center gap-1.5">
            {visibleTechnologies.map(technology => (
              <span
                key={technology.slug}
                className="rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.11em] text-muted">
                {technology.name}
              </span>
            ))}

            {remainingTechnologies > 0 ? (
              <span className="rounded-full border border-border bg-theme-accent-faint px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.11em] text-theme-accent-strong">
                +{remainingTechnologies}
              </span>
            ) : null}
          </div>
        ) : null}

        {/* PROJECT DELIVERY SIGNALS */}
        <div className="mt-6 flex flex-col items-center">
          {/* DELIVERY PROFILE */}
          <div className="w-full max-w-[430px]">
            <div className="mb-2 flex items-center justify-between gap-4 px-1">
              <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted">Delivery profile</p>

              <span className="font-mono text-[7px] font-medium text-theme-accent-strong">
                {safeProgress}%
              </span>
            </div>

            <div className="mx-auto w-full overflow-hidden">
              <DeliveryProfileChart
                data={deliveryProfile}
                height={185}
                completedLabel="Phase completion"
                remainingLabel="Progress curve"
                trajectoryLabel="Trajectory"
                showLegend={false}
              />
            </div>
          </div>

          {/* READINESS */}
          <div className="mt-3 w-full max-w-[220px] text-center">
            <p className="mb-1 font-mono text-[7px] uppercase tracking-[0.15em] text-muted">Readiness</p>

            <div className="mx-auto w-full overflow-hidden">
              <ReadinessGaugeChart value={safeProgress} height={150} showLegend={false} />
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className={`mt-auto grid gap-2 pt-6 ${project.liveUrl ? 'grid-cols-2' : 'grid-cols-1'}`}>
          <Link
            href={`/portfolio/${project.slug}`}
            className="group/case inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-background px-3 text-[10px] font-medium text-foreground transition-[background-color,border-color,transform] hover:border-border-strong hover:bg-surface-muted active:scale-[0.98] sm:px-4 sm:text-[11px]">
            Case study
            <ArrowRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-300 group-hover/case:translate-x-0.5"
            />
          </Link>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group/live inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-3 text-[10px] font-medium text-primary-foreground transition-[opacity,transform] hover:opacity-90 active:scale-[0.98] sm:px-4 sm:text-[11px]">
              View live
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5"
              />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function PortfolioDetailProjectsCarousel({ projects }: PortfolioDetailProjectsCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(projects.length > 1);

  const getSlides = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return [];
    }

    return Array.from(viewport.querySelectorAll<HTMLElement>('[data-project-slide]'));
  }, []);

  const getSlideScrollPosition = useCallback((slide: HTMLElement, slides: HTMLElement[]) => {
    const firstSlide = slides[0];

    if (!firstSlide) {
      return 0;
    }

    return slide.offsetLeft - firstSlide.offsetLeft;
  }, []);

  const updateCarouselState = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const slides = getSlides();

    if (!slides.length) {
      setActiveIndex(0);
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const slidePosition = getSlideScrollPosition(slide, slides);

      const distance = Math.abs(slidePosition - viewport.scrollLeft);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex(nearestIndex);

    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);

    setCanScrollLeft(viewport.scrollLeft > 4);

    setCanScrollRight(viewport.scrollLeft < maxScrollLeft - 4);
  }, [getSlideScrollPosition, getSlides]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const viewport = viewportRef.current;

      if (!viewport) {
        return;
      }

      const slides = getSlides();

      if (!slides.length) {
        return;
      }

      const targetIndex = Math.max(0, Math.min(index, slides.length - 1));

      const target = slides[targetIndex];

      if (!target) {
        return;
      }

      viewport.scrollTo({
        left: getSlideScrollPosition(target, slides),
        behavior: 'smooth'
      });
    },
    [getSlideScrollPosition, getSlides]
  );

  const showPrevious = useCallback(() => {
    scrollToIndex(activeIndex - 1);
  }, [activeIndex, scrollToIndex]);

  const showNext = useCallback(() => {
    scrollToIndex(activeIndex + 1);
  }, [activeIndex, scrollToIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    updateCarouselState();

    viewport.addEventListener('scroll', updateCarouselState, {
      passive: true
    });

    window.addEventListener('resize', updateCarouselState);

    return () => {
      viewport.removeEventListener('scroll', updateCarouselState);

      window.removeEventListener('resize', updateCarouselState);
    };
  }, [projects.length, updateCarouselState]);

  if (!projects.length) {
    return null;
  }

  return (
    <section className="py-20 sm:py-24">
      <div className="rcentz-section">
        {/* HEADER */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-theme-accent" />

              <p className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-muted">
                More Rcentz work
              </p>
            </div>

            <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-[1.04] tracking-[-0.05em] text-foreground sm:text-4xl lg:text-[3rem]">
              Continue through the systems.
            </h2>

            <p className="mt-4 max-w-xl text-[13px] leading-6 text-muted">
              Explore other published projects, experiments and systems built through Rcentz.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/portfolio"
              className="group inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-[11px] font-medium text-foreground transition-[background-color,border-color] hover:border-border-strong hover:bg-surface-muted">
              View all projects
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <button
              type="button"
              onClick={showPrevious}
              disabled={!canScrollLeft}
              aria-label="Previous projects"
              className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-[background-color,border-color,opacity] hover:border-border-strong hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-30">
              <ArrowLeft aria-hidden="true" className="size-3.5" />
            </button>

            <button
              type="button"
              onClick={showNext}
              disabled={!canScrollRight}
              aria-label="Next projects"
              className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-[background-color,border-color,opacity] hover:border-border-strong hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-30">
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </button>
          </div>
        </div>

        {/* CAROUSEL */}
        <div
          ref={viewportRef}
          className="mt-10 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex snap-x snap-mandatory gap-5 sm:gap-6">
            {projects.map(project => (
              <div
                key={project.id}
                data-project-slide
                className="
                  w-[86vw]
                  max-w-[520px]
                  shrink-0
                  snap-start

                  sm:w-[calc((100%_-_1.5rem)/1.5)]
                  sm:max-w-none

                  md:w-[calc((100%_-_3rem)/2.5)]

                  lg:w-[calc((100%_-_3rem)/3)]
                ">
                <CarouselProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* CAROUSEL FOOTER */}
        <div className="mt-5 flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to ${project.name}`}
                className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                  index === activeIndex ? 'w-6 bg-theme-accent' : 'w-1.5 bg-border-strong'
                }`}
              />
            ))}
          </div>

          <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted">
            {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </p>
        </div>
      </div>
    </section>
  );
}
