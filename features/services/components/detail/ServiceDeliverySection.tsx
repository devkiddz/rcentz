import { ArrowDownRight, CalendarRange, CheckCircle2, Clock3, Milestone } from 'lucide-react';

import { getTranslations } from 'next-intl/server';

import type { ServiceDetail } from '../../server/get-service-by-slug';

type ServiceDeliverySectionProps = {
  service: ServiceDetail;
};

type DeliveryTranslator = Awaited<ReturnType<typeof getTranslations<'ServiceDelivery'>>>;

function formatRange(t: DeliveryTranslator, min?: number | null, max?: number | null) {
  if (min && max) {
    return t('rangeBetween', {
      min,
      max
    });
  }

  if (min) {
    return t('rangeFrom', {
      min
    });
  }

  if (max) {
    return t('rangeUpTo', {
      max
    });
  }

  return t('confirmedAfterDiscovery');
}

export async function ServiceDeliverySection({ service }: ServiceDeliverySectionProps) {
  const t = await getTranslations('ServiceDelivery');

  const hasDeliveryRange = Boolean(service.deliveryMinDays) || Boolean(service.deliveryMaxDays);

  const hasMilestones = service.milestoneTemplates.length > 0;

  if (!hasDeliveryRange && !hasMilestones) {
    return null;
  }

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface-muted/10 py-20 sm:py-24 lg:py-28">
      {/* =========================================
          ENVIRONMENT
          ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[12%] bottom-[8%] size-[520px] rounded-full bg-theme-accent-faint blur-3xl"
      />

      <div className="rcentz-section relative">
        {/* =========================================
            INTRO
            ========================================= */}

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-14">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-full border border-theme-accent/15 bg-theme-accent-soft">
                <CalendarRange className="size-3.5 text-theme-accent" />
              </div>

              <p className="font-mono text-[8px] uppercase tracking-[0.17em] text-theme-accent sm:text-[9px]">
                {t('eyebrow')}
              </p>

              <span className="h-px w-8 bg-theme-accent/30" />
            </div>

            <h2 className="mt-5 max-w-[700px] text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-[3rem] lg:text-[3.45rem]">
              {t('title')}
            </h2>
          </div>

          <p className="max-w-[620px] text-[13px] leading-7 text-muted sm:text-[15px] sm:leading-8 lg:justify-self-end">
            {t('description')}
          </p>
        </div>

        {/* =========================================
            DELIVERY SUMMARY
            ========================================= */}

        <div className="mt-12 grid gap-5 sm:mt-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-8">
          <aside className="relative overflow-hidden rounded-[30px] border border-border bg-background p-6 sm:p-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 size-52 rounded-full bg-theme-accent-faint blur-3xl"
            />

            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <div className="flex size-10 items-center justify-center rounded-[15px] border border-theme-accent/15 bg-theme-accent-soft">
                  <Clock3 className="size-4 text-theme-accent" />
                </div>

                <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted">
                  {t('planningEstimate')}
                </span>
              </div>

              <p className="mt-7 font-mono text-[7px] uppercase tracking-[0.13em] text-muted">
                {t('typicalDeliveryRange')}
              </p>

              <p className="mt-2 text-[2.4rem] font-semibold leading-none tracking-[-0.055em] text-foreground sm:text-[3rem]">
                {formatRange(t, service.deliveryMinDays, service.deliveryMaxDays)}
              </p>

              {service.deliveryNote ? (
                <p className="mt-5 text-[12px] leading-7 text-muted sm:text-[13px]">{service.deliveryNote}</p>
              ) : null}

              <div className="mt-7 border-t border-border pt-5">
                <div className="flex items-start gap-3">
                  <ArrowDownRight className="mt-0.5 size-3.5 shrink-0 text-theme-accent" />

                  <div>
                    <p className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted">
                      {t('important')}
                    </p>

                    <p className="mt-2 text-[10px] leading-5 text-muted sm:text-[11px] sm:leading-6">
                      {t('planningDisclaimer')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* =========================================
              MILESTONE JOURNEY
              ========================================= */}

          {hasMilestones ? (
            <div>
              <div className="flex items-center gap-2">
                <Milestone className="size-4 text-theme-accent" />

                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                  {t('milestoneJourney')}
                </p>
              </div>

              <div className="relative mt-7">
                <div
                  aria-hidden="true"
                  className="absolute bottom-7 left-[19px] top-7 w-px bg-border sm:left-[23px]"
                />

                <div className="space-y-4">
                  {service.milestoneTemplates.map((milestone, index) => {
                    const isLast = index === service.milestoneTemplates.length - 1;

                    return (
                      <article
                        key={milestone.id}
                        className="relative grid grid-cols-[40px_1fr] gap-4 sm:grid-cols-[48px_1fr] sm:gap-5">
                        <div className="relative z-10">
                          <div className="flex size-10 items-center justify-center rounded-full border border-theme-accent/15 bg-background sm:size-12">
                            {isLast ? (
                              <CheckCircle2 className="size-4 text-theme-accent" />
                            ) : (
                              <span className="font-mono text-[7px] text-theme-accent">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="rounded-[26px] border border-border bg-background p-5 sm:p-6">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0">
                              <p className="font-mono text-[7px] uppercase tracking-[0.13em] text-theme-accent">
                                {t('stage', {
                                  number: String(index + 1).padStart(2, '0')
                                })}
                              </p>

                              <h3 className="mt-2 text-[17px] font-semibold tracking-[-0.035em] text-foreground sm:text-[19px]">
                                {milestone.title}
                              </h3>
                            </div>

                            {milestone.minDays || milestone.maxDays ? (
                              <span className="w-fit whitespace-nowrap rounded-full border border-border px-2.5 py-1 font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
                                {formatRange(t, milestone.minDays, milestone.maxDays)}
                              </span>
                            ) : null}
                          </div>

                          {milestone.description ? (
                            <p className="mt-4 max-w-[700px] text-[12px] leading-6 text-muted sm:text-[13px] sm:leading-7">
                              {milestone.description}
                            </p>
                          ) : null}

                          {milestone.purpose ? (
                            <div className="mt-5 grid gap-2 sm:grid-cols-[110px_1fr]">
                              <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted">
                                {t('purpose')}
                              </p>

                              <p className="text-[10px] leading-5 text-foreground/75 sm:text-[11px] sm:leading-6">
                                {milestone.purpose}
                              </p>
                            </div>
                          ) : null}

                          {milestone.expectedOutcome ? (
                            <div className="mt-4 border-t border-border pt-4">
                              <div className="grid gap-2 sm:grid-cols-[110px_1fr]">
                                <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted">
                                  {t('stageOutcome')}
                                </p>

                                <p className="text-[10px] leading-5 text-muted sm:text-[11px] sm:leading-6">
                                  {milestone.expectedOutcome}
                                </p>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
