'use client';

import { useState } from 'react';

import { ArrowUpRight, CheckCircle2, Flag, Sparkles } from 'lucide-react';

import { useTranslations } from 'next-intl';

import type { ServiceDetail } from '../../server/get-service-by-slug';

type ServiceFeaturesOutcomesSectionProps = {
  features: ServiceDetail['features'];
  outcomes: ServiceDetail['outcomes'];
};

type CapabilityTab = 'capabilities' | 'results';

export function ServiceFeaturesOutcomesSection({ features, outcomes }: ServiceFeaturesOutcomesSectionProps) {
  const t = useTranslations('ServiceFeatures');

  const hasFeatures = features.length > 0;

  const hasOutcomes = outcomes.length > 0;

  const [activeTab, setActiveTab] = useState<CapabilityTab>(hasFeatures ? 'capabilities' : 'results');

  if (!hasFeatures && !hasOutcomes) {
    return null;
  }

  const featuredFeatures = features.filter(feature => feature.featured);

  const standardFeatures = features.filter(feature => !feature.featured);

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface-muted/10 py-20 sm:py-24 lg:py-28">
      {/* =========================================
          ENVIRONMENT
          ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[14%] top-[10%] size-[520px] rounded-full bg-theme-accent-faint blur-3xl"
      />

      <div className="rcentz-section relative">
        {/* =========================================
            SECTION INTRO
            ========================================= */}

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-12">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-full border border-theme-accent/15 bg-theme-accent-soft">
                <Sparkles className="size-3.5 text-theme-accent" />
              </div>

              <p className="font-mono text-[8px] uppercase tracking-[0.17em] text-theme-accent sm:text-[9px]">
                {t('eyebrow')}
              </p>

              <span className="h-px w-8 bg-theme-accent/30" />
            </div>

            <h2 className="mt-5 max-w-[680px] text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-[3rem] lg:text-[3.45rem]">
              {t('title')}
            </h2>
          </div>

          <p className="max-w-[620px] text-[13px] leading-7 text-muted sm:text-[15px] sm:leading-8 lg:justify-self-end">
            {t('description')}
          </p>
        </div>

        {/* =========================================
            TABS
            ========================================= */}

        {hasFeatures && hasOutcomes ? (
          <div className="mt-10 sm:mt-12">
            <div
              role="tablist"
              aria-label={t('tabsAriaLabel')}
              className="inline-flex rounded-full border border-border bg-background/70 p-1 backdrop-blur-xl">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'capabilities'}
                onClick={() => setActiveTab('capabilities')}
                className={[
                  'inline-flex h-9 items-center gap-2 rounded-full px-4 text-[11px] font-medium transition-[background-color,color,box-shadow]',

                  activeTab === 'capabilities'
                    ? 'bg-foreground text-background shadow-sm'
                    : 'text-muted hover:text-foreground'
                ].join(' ')}>
                <CheckCircle2 className="size-3.5" />

                {t('capabilitiesTab')}
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'results'}
                onClick={() => setActiveTab('results')}
                className={[
                  'inline-flex h-9 items-center gap-2 rounded-full px-4 text-[11px] font-medium transition-[background-color,color,box-shadow]',

                  activeTab === 'results'
                    ? 'bg-foreground text-background shadow-sm'
                    : 'text-muted hover:text-foreground'
                ].join(' ')}>
                <Flag className="size-3.5" />

                {t('resultsTab')}
              </button>
            </div>
          </div>
        ) : null}

        {/* =========================================
            CAPABILITIES TAB
            ========================================= */}

        {hasFeatures && (activeTab === 'capabilities' || !hasOutcomes) ? (
          <div role="tabpanel" className="mt-10 sm:mt-12">
            {featuredFeatures.length > 0 ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {featuredFeatures.map((feature, index) => (
                  <article
                    key={feature.id}
                    className="group relative overflow-hidden rounded-[30px] border border-theme-accent/15 bg-background p-6 sm:p-7">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-20 -top-20 size-52 rounded-full bg-theme-accent-faint blur-3xl"
                    />

                    <div className="relative">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex size-10 items-center justify-center rounded-[15px] border border-theme-accent/15 bg-theme-accent-soft">
                          <CheckCircle2 className="size-4 text-theme-accent" />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="rounded-full border border-theme-accent/15 bg-theme-accent-soft px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.12em] text-theme-accent">
                            {t('featured')}
                          </span>

                          <span className="font-mono text-[7px] text-muted">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>

                      <h3 className="mt-6 max-w-[520px] text-[20px] font-semibold leading-tight tracking-[-0.04em] text-foreground sm:text-[22px]">
                        {feature.name}
                      </h3>

                      {feature.description ? (
                        <p className="mt-4 max-w-[560px] text-[13px] leading-7 text-muted sm:text-[14px]">
                          {feature.description}
                        </p>
                      ) : null}

                      {feature.expectedOutcome ? (
                        <div className="mt-6 border-t border-border pt-5">
                          <div className="flex items-start gap-3">
                            <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-theme-accent" />

                            <div>
                              <p className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted">
                                {t('expectedEffect')}
                              </p>

                              <p className="mt-2 text-[11px] leading-6 text-foreground/75 sm:text-[12px]">
                                {feature.expectedOutcome}
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

            {standardFeatures.length > 0 ? (
              <div
                className={[
                  'grid gap-3 sm:grid-cols-2 lg:grid-cols-3',

                  featuredFeatures.length > 0 ? 'mt-4' : ''
                ].join(' ')}>
                {standardFeatures.map((feature, index) => (
                  <article
                    key={feature.id}
                    className="group rounded-[24px] border border-border bg-background/75 p-5 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-theme-accent/20 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <CheckCircle2 className="size-4 text-theme-accent" />

                      <span className="font-mono text-[7px] text-muted">
                        {String(index + featuredFeatures.length + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="mt-5 text-[16px] font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-[18px]">
                      {feature.name}
                    </h3>

                    {feature.description ? (
                      <p className="mt-3 text-[12px] leading-6 text-muted sm:text-[13px] sm:leading-7">
                        {feature.description}
                      </p>
                    ) : null}

                    {feature.expectedOutcome ? (
                      <p className="mt-5 border-t border-border pt-4 text-[10px] leading-5 text-foreground/70 sm:text-[11px] sm:leading-6">
                        {feature.expectedOutcome}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {/* =========================================
            EXPECTED RESULTS TAB
            ========================================= */}

        {hasOutcomes && (activeTab === 'results' || !hasFeatures) ? (
          <div role="tabpanel" className="mt-10 sm:mt-12">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
              <div>
                <div className="flex items-center gap-2">
                  <Flag className="size-4 text-theme-accent" />

                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-theme-accent">
                    {t('resultsEyebrow')}
                  </p>
                </div>

                <h3 className="mt-4 max-w-[470px] text-[1.9rem] font-semibold leading-[1] tracking-[-0.05em] text-foreground sm:text-[2.45rem]">
                  {t('resultsTitle')}
                </h3>

                <p className="mt-5 max-w-[470px] text-[12px] leading-7 text-muted sm:text-[13px]">
                  {t('resultsDescription')}
                </p>
              </div>

              <div className="divide-y divide-border rounded-[30px] border border-border bg-background/80 px-5 sm:px-7">
                {outcomes.map((outcome, index) => (
                  <article
                    key={outcome.id}
                    className="grid gap-4 py-6 sm:grid-cols-[44px_1fr] sm:gap-5 sm:py-7">
                    <div className="flex size-9 items-center justify-center rounded-full border border-theme-accent/15 bg-theme-accent-soft">
                      <span className="font-mono text-[7px] text-theme-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-[16px] font-semibold tracking-[-0.03em] text-foreground sm:text-[18px]">
                        {outcome.title}
                      </h4>

                      {outcome.description ? (
                        <p className="mt-2 max-w-[650px] text-[12px] leading-6 text-muted sm:text-[13px] sm:leading-7">
                          {outcome.description}
                        </p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
