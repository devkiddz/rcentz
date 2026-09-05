import { ArrowDownRight, Layers3, MoveUpRight } from 'lucide-react';

import { getTranslations } from 'next-intl/server';

import type { ServiceDetail } from '../../server/get-service-by-slug';

type ServiceOverviewSectionProps = {
  service: ServiceDetail;
};

export async function ServiceOverviewSection({ service }: ServiceOverviewSectionProps) {
  const t = await getTranslations('ServiceOverview');

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-border py-20 sm:py-24 lg:py-28">
      {/* =========================================
          FULL-BLEED GRID ENVIRONMENT
          ========================================= */}

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rcentz-grid-fade opacity-70" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-theme-accent/[0.045]" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-theme-accent-faint blur-3xl"
      />

      {/* =========================================
          CONTENT
          ========================================= */}

      <div className="rcentz-section relative">
        <div className="mx-auto max-w-[920px] text-center">
          <div className="flex justify-center">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-8 bg-theme-accent/30" />

              <div className="flex size-7 items-center justify-center rounded-full border border-theme-accent/15 bg-theme-accent-soft">
                <Layers3 className="size-3.5 text-theme-accent" />
              </div>

              <p className="font-mono text-[8px] uppercase tracking-[0.17em] text-theme-accent sm:text-[9px]">
                {t('eyebrow')}
              </p>

              <span className="h-px w-8 bg-theme-accent/30" />
            </div>
          </div>

          <h2 className="mx-auto mt-6 max-w-[820px] text-[2.35rem] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-[3.2rem] lg:text-[3.65rem]">
            {t('title')}
          </h2>

          {service.description ? (
            <p className="mx-auto mt-7 max-w-[820px] text-[14px] leading-8 text-muted sm:text-[16px] sm:leading-8 lg:text-[17px] lg:leading-9">
              {service.description}
            </p>
          ) : null}

          {service.category ? (
            <div className="mx-auto mt-12 max-w-[780px] border-t border-theme-accent/15 pt-7 sm:mt-14">
              <div className="flex flex-col items-center">
                <div className="flex size-9 items-center justify-center rounded-full border border-theme-accent/15 bg-theme-accent-soft">
                  <ArrowDownRight className="size-3.5 text-theme-accent" />
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted">{t('partOf')}</p>

                  <span className="rounded-full border border-theme-accent/15 bg-theme-accent-soft px-3 py-1 text-[9px] font-medium text-foreground">
                    {service.category.name}
                  </span>
                </div>

                {service.category.description ? (
                  <p className="mx-auto mt-3 max-w-[720px] text-[12px] leading-6 text-muted sm:text-[13px] sm:leading-7">
                    {service.category.description}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex items-center justify-center gap-2 text-muted">
            <MoveUpRight className="size-3.5 text-theme-accent" />

            <p className="text-[10px] leading-5 sm:text-[11px]">{t('onboardingNote')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
