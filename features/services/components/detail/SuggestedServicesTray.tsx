'use client';

import Link from 'next/link';

import { useRef } from 'react';

import { ArrowLeft, ArrowRight, ArrowUpRight, Layers3, Sparkles } from 'lucide-react';

import { useTranslations } from 'next-intl';

import type { SuggestedService } from '../../server/get-suggested-services';

type SuggestedServicesTrayProps = {
  services: SuggestedService[];
};

export function SuggestedServicesTray({ services }: SuggestedServicesTrayProps) {
  const t = useTranslations('SuggestedServices');

  const trayRef = useRef<HTMLDivElement>(null);

  if (services.length === 0) {
    return null;
  }

  function scrollTray(direction: 'left' | 'right') {
    const tray = trayRef.current;

    if (!tray) {
      return;
    }

    const amount = Math.min(tray.clientWidth * 0.82, 760);

    tray.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth'
    });
  }

  return (
    <section className="relative overflow-hidden border-t border-border py-20 sm:py-24 lg:py-28">
      {/* =========================================
          ENVIRONMENT
          ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] top-[8%] size-[520px] rounded-full bg-theme-accent-faint blur-3xl"
      />

      <div className="rcentz-section relative">
        {/* =========================================
            INTRO
            ========================================= */}

        <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[700px]">
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-full border border-theme-accent/15 bg-theme-accent-soft">
                <Sparkles className="size-3.5 text-theme-accent" />
              </div>

              <p className="font-mono text-[8px] uppercase tracking-[0.17em] text-theme-accent sm:text-[9px]">
                {t('eyebrow')}
              </p>

              <span className="h-px w-8 bg-theme-accent/30" />
            </div>

            <h2 className="mt-5 text-[2.15rem] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-[2.9rem] lg:text-[3.35rem]">
              {t('title')}
            </h2>

            <p className="mt-5 max-w-[610px] text-[13px] leading-7 text-muted sm:text-[14px] sm:leading-8">
              {t('description')}
            </p>
          </div>

          {/* =========================================
              CONTROLS
              ========================================= */}

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label={t('previousServices')}
              onClick={() => scrollTray('left')}
              className="flex size-10 items-center justify-center rounded-full border border-border bg-background/70 text-foreground transition-[background-color,border-color,transform] hover:border-theme-accent/25 hover:bg-theme-accent-soft active:scale-[0.96]">
              <ArrowLeft className="size-3.5" />
            </button>

            <button
              type="button"
              aria-label={t('nextServices')}
              onClick={() => scrollTray('right')}
              className="flex size-10 items-center justify-center rounded-full border border-border bg-background/70 text-foreground transition-[background-color,border-color,transform] hover:border-theme-accent/25 hover:bg-theme-accent-soft active:scale-[0.96]">
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>

        {/* =========================================
            SLIDING TRAY
            ========================================= */}

        <div
          ref={trayRef}
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] sm:mt-12 [&::-webkit-scrollbar]:hidden">
          {services.map((service, index) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group relative flex min-h-[300px] w-[84vw] max-w-[390px] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] border border-border bg-background/80 p-6 transition-[border-color,transform] hover:-translate-y-1 hover:border-theme-accent/25 sm:w-[350px] sm:p-7 lg:w-[370px]">
              {/* card atmosphere */}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-theme-accent-faint blur-3xl transition-transform duration-500 group-hover:scale-125"
              />

              <div className="relative flex h-full flex-col">
                {/* card top */}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-10 items-center justify-center rounded-[14px] border border-theme-accent/15 bg-theme-accent-soft">
                    <Layers3 className="size-4 text-theme-accent" />
                  </div>

                  <div className="flex items-center gap-2">
                    {service.featured ? (
                      <span className="rounded-full border border-theme-accent/15 bg-theme-accent-soft px-2.5 py-1 font-mono text-[6px] uppercase tracking-[0.11em] text-theme-accent">
                        {t('featured')}
                      </span>
                    ) : null}

                    <span className="font-mono text-[7px] text-muted">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* category */}

                {service.category ? (
                  <p className="mt-8 font-mono text-[7px] uppercase tracking-[0.14em] text-theme-accent">
                    {service.category.name}
                  </p>
                ) : null}

                {/* service */}

                <h3 className="mt-3 max-w-[320px] text-[21px] font-semibold leading-[1.05] tracking-[-0.045em] text-foreground sm:text-[23px]">
                  {service.name}
                </h3>

                {service.shortDescription ? (
                  <p className="mt-4 line-clamp-3 text-[12px] leading-6 text-muted sm:text-[13px] sm:leading-7">
                    {service.shortDescription}
                  </p>
                ) : null}

                {/* footer */}

                <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
                  <span className="text-[10px] font-medium text-foreground/75">{t('viewService')}</span>

                  <div className="flex size-8 items-center justify-center rounded-full border border-border bg-background transition-[background-color,border-color,transform] group-hover:border-theme-accent/20 group-hover:bg-theme-accent-soft">
                    <ArrowUpRight className="size-3.5 text-theme-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* mobile cue */}

        <div className="mt-3 flex items-center gap-2 sm:hidden">
          <span className="h-px flex-1 bg-border" />

          <p className="font-mono text-[6px] uppercase tracking-[0.13em] text-muted">{t('swipeToExplore')}</p>
        </div>
      </div>
    </section>
  );
}
