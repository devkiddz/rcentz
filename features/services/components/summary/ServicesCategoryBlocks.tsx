import { Blocks, ChevronRight } from 'lucide-react';

import { getTranslations } from 'next-intl/server';

import type { ServiceCategorySummary } from '../../server/get-service-categories';

import { ServiceCategorySlider } from './ServiceCategorySlider';

type ServicesCategoryBlocksProps = {
  categories: ServiceCategorySummary[];
};

export async function ServicesCategoryBlocks({ categories }: ServicesCategoryBlocksProps) {
  if (categories.length === 0) {
    return null;
  }

  const t = await getTranslations('ServicesCategoryBlocks');

  return (
    <section className="relative py-20 sm:py-24">
      <div className="rcentz-section">
        {/* =========================================
            MASTER INTRO
            ========================================= */}

        <div className="mx-auto max-w-[820px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-theme-accent/15 bg-theme-accent-soft px-3.5 py-2">
            <Blocks className="size-3.5 text-theme-accent" />

            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-theme-accent">
              {t('eyebrow')}
            </span>
          </div>

          <h2 className="mt-5 text-[2.35rem] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-[3.35rem]">
            {t('titleLineOne')}
            <br />
            {t('titleLineTwo')}
          </h2>

          <p className="mx-auto mt-5 max-w-[680px] text-[13px] leading-7 text-muted sm:text-[15px]">
            {t('description')}
          </p>
        </div>

        {/* =========================================
            CATEGORY SECTIONS
            ========================================= */}

        <div className="mt-16 space-y-10 sm:mt-20 sm:space-y-12">
          {categories.map((category, categoryIndex) => {
            const even = categoryIndex % 2 === 0;

            const serviceCount = category.services.length;

            return (
              <section
                id={category.slug}
                key={category.id}
                className={[
                  'relative scroll-mt-28 overflow-hidden rounded-[32px] border border-border',
                  'px-5 py-8 sm:px-7 sm:py-10 lg:px-9 lg:py-11',
                  even ? 'bg-surface-muted/18' : 'bg-background'
                ].join(' ')}>
                <div
                  aria-hidden="true"
                  className={[
                    'pointer-events-none absolute -top-24 size-64 rounded-full blur-3xl',
                    even ? '-right-16 bg-theme-accent/[0.07]' : '-left-16 bg-foreground/[0.04]'
                  ].join(' ')}
                />

                <div className="relative grid gap-7 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
                  <div>
                    <div className="flex items-center gap-3.5">
                      <span className="flex size-10 items-center justify-center rounded-full border border-theme-accent/15 bg-theme-accent-soft font-mono text-[9px] font-medium text-theme-accent">
                        {String(categoryIndex + 1).padStart(2, '0')}
                      </span>

                      <div>
                        <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted">
                          {t('categoryLabel')}
                        </p>

                        <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.12em] text-theme-accent">
                          {t('serviceCount', {
                            count: serviceCount
                          })}
                        </p>
                      </div>
                    </div>

                    <h3 className="mt-6 max-w-[520px] text-[2rem] font-semibold leading-[0.98] tracking-[-0.05em] text-foreground sm:text-[2.65rem]">
                      {category.name}
                    </h3>
                  </div>

                  <div className="lg:justify-self-end">
                    {category.description ? (
                      <p className="max-w-[660px] text-[13px] leading-7 text-muted sm:text-[15px] sm:leading-7">
                        {category.description}
                      </p>
                    ) : null}

                    <div className="mt-5 flex items-center gap-2.5 text-[10px] font-medium text-foreground sm:text-[11px]">
                      <ChevronRight className="size-3.5 text-theme-accent" />

                      <span>{t('exploreHint')}</span>
                    </div>
                  </div>
                </div>

                <div className="relative mt-8 border-t border-border pt-6">
                  <ServiceCategorySlider category={category} />
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
