import { ArrowUpRight, Boxes, Check, Cpu, Layers3 } from 'lucide-react';

import { getTranslations } from 'next-intl/server';

import type { ServiceDetail } from '../../server/get-service-by-slug';

type ServiceTechnologySectionProps = {
  service: ServiceDetail;
};

export async function ServiceTechnologySection({ service }: ServiceTechnologySectionProps) {
  const t = await getTranslations('ServiceTechnology');

  if (service.technologies.length === 0) {
    return null;
  }

  const featuredTechnologies = service.technologies.filter(technology => technology.featured);

  const supportingTechnologies = service.technologies.filter(technology => !technology.featured);

  return (
    <section
      className="relative w-screen overflow-hidden border-y border-border py-20 sm:py-24 lg:py-28"
      style={{
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)'
      }}>
      {/* =========================================
          FULL-BLEED GRID ENVIRONMENT
          ========================================= */}

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rcentz-grid-fade opacity-70" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-theme-accent/[0.04]" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[18%] h-[560px] w-[980px] -translate-x-1/2 rounded-full bg-theme-accent-faint blur-3xl"
      />

      {/* =========================================
          CONTENT
          ========================================= */}

      <div className="rcentz-section relative">
        {/* =========================================
            INTRO
            ========================================= */}

        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:gap-14">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-full border border-theme-accent/15 bg-theme-accent-soft">
                <Cpu className="size-3.5 text-theme-accent" />
              </div>

              <p className="font-mono text-[8px] uppercase tracking-[0.17em] text-theme-accent sm:text-[9px]">
                {t('eyebrow')}
              </p>

              <span className="h-px w-8 bg-theme-accent/30" />
            </div>

            <h2 className="mt-5 max-w-[720px] text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-[3rem] lg:text-[3.45rem]">
              {t('title')}
            </h2>
          </div>

          <p className="max-w-[620px] text-[13px] leading-7 text-muted sm:text-[15px] sm:leading-8 lg:justify-self-end">
            {t('description')}
          </p>
        </div>

        {/* =========================================
            FEATURED TECHNOLOGY
            ========================================= */}

        {featuredTechnologies.length > 0 ? (
          <div className="mt-12 grid gap-4 sm:mt-14 lg:grid-cols-2">
            {featuredTechnologies.map((technology, index) => (
              <article
                key={technology.id}
                className="group relative overflow-hidden rounded-[30px] border border-theme-accent/15 bg-background/90 p-6 backdrop-blur-xl sm:p-7">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 size-52 rounded-full bg-theme-accent-faint blur-3xl"
                />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex size-11 items-center justify-center rounded-[16px] border border-theme-accent/15 bg-theme-accent-soft">
                      <Boxes className="size-4 text-theme-accent" />
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-2">
                      {technology.category ? (
                        <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[6px] uppercase tracking-[0.11em] text-muted">
                          {technology.category}
                        </span>
                      ) : null}

                      <span className="rounded-full border border-theme-accent/15 bg-theme-accent-soft px-2.5 py-1 font-mono text-[6px] uppercase tracking-[0.11em] text-theme-accent">
                        {t('coreTechnology')}
                      </span>

                      <span className="font-mono text-[7px] text-muted">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-6 text-[21px] font-semibold tracking-[-0.04em] text-foreground sm:text-[24px]">
                    {technology.name}
                  </h3>

                  {technology.description ? (
                    <p className="mt-4 max-w-[560px] text-[13px] leading-7 text-muted sm:text-[14px]">
                      {technology.description}
                    </p>
                  ) : null}

                  {technology.purpose ? (
                    <div className="mt-6 flex items-start gap-3 rounded-[20px] border border-border bg-surface-muted/20 p-4">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-theme-accent" />

                      <div>
                        <p className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted">
                          {t('roleInSolution')}
                        </p>

                        <p className="mt-2 text-[11px] leading-6 text-foreground/80 sm:text-[12px]">
                          {technology.purpose}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {technology.rationale ? (
                    <div className="mt-5 border-t border-border pt-5">
                      <div className="flex items-start gap-3">
                        <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-theme-accent" />

                        <div>
                          <p className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted">
                            {t('whyItFits')}
                          </p>

                          <p className="mt-2 max-w-[560px] text-[11px] leading-6 text-muted sm:text-[12px] sm:leading-7">
                            {technology.rationale}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {/* =========================================
            SUPPORTING TECHNOLOGY
            ========================================= */}

        {supportingTechnologies.length > 0 ? (
          <div
            className={[
              'grid gap-3 sm:grid-cols-2 lg:grid-cols-3',
              featuredTechnologies.length > 0 ? 'mt-4' : 'mt-12 sm:mt-14'
            ].join(' ')}>
            {supportingTechnologies.map((technology, index) => (
              <article
                key={technology.id}
                className="group rounded-[24px] border border-border bg-background/75 p-5 backdrop-blur-xl transition-[border-color,transform] hover:-translate-y-0.5 hover:border-theme-accent/20 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-9 items-center justify-center rounded-[13px] border border-theme-accent/15 bg-theme-accent-soft">
                    <Layers3 className="size-3.5 text-theme-accent" />
                  </div>

                  <div className="flex items-center gap-2">
                    {technology.category ? (
                      <span className="rounded-full border border-border px-2 py-1 font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
                        {technology.category}
                      </span>
                    ) : null}

                    <span className="font-mono text-[7px] text-muted">
                      {String(index + featuredTechnologies.length + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.035em] text-foreground sm:text-[19px]">
                  {technology.name}
                </h3>

                {technology.description ? (
                  <p className="mt-3 text-[12px] leading-6 text-muted sm:text-[13px] sm:leading-7">
                    {technology.description}
                  </p>
                ) : null}

                {technology.purpose ? (
                  <div className="mt-5 flex items-start gap-2.5">
                    <Check className="mt-1 size-3 shrink-0 text-theme-accent" />

                    <p className="text-[10px] leading-5 text-foreground/75 sm:text-[11px] sm:leading-6">
                      {technology.purpose}
                    </p>
                  </div>
                ) : null}

                {technology.rationale ? (
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="font-mono text-[6px] uppercase tracking-[0.11em] text-muted">
                      {t('whyItFits')}
                    </p>

                    <p className="mt-2 text-[10px] leading-5 text-muted sm:text-[11px] sm:leading-6">
                      {technology.rationale}
                    </p>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
