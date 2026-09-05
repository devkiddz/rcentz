import { CircleHelp, HelpCircle, Plus } from 'lucide-react';

import { getTranslations } from 'next-intl/server';

import type { ServiceDetail } from '../../server/get-service-by-slug';

type ServiceFaqSectionProps = {
  service: ServiceDetail;
};

export async function ServiceFaqSection({ service }: ServiceFaqSectionProps) {
  const t = await getTranslations('ServiceFaq');

  if (service.faqs.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden border-t border-border py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[14%] top-[12%] size-[500px] rounded-full bg-theme-accent-faint blur-3xl"
      />

      <div className="rcentz-section relative">
        <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16">
          {/* =========================================
              INTRO
              ========================================= */}

          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-full border border-theme-accent/15 bg-theme-accent-soft">
                <HelpCircle className="size-3.5 text-theme-accent" />
              </div>

              <p className="font-mono text-[8px] uppercase tracking-[0.17em] text-theme-accent sm:text-[9px]">
                {t('eyebrow')}
              </p>

              <span className="h-px w-8 bg-theme-accent/30" />
            </div>

            <h2 className="mt-5 max-w-[560px] text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-[3rem]">
              {t('title')}
            </h2>

            <p className="mt-5 max-w-[500px] text-[12px] leading-7 text-muted sm:text-[13px]">
              {t('description')}
            </p>

            <div className="mt-7 flex items-start gap-3 rounded-[20px] border border-theme-accent/15 bg-theme-accent-faint p-4">
              <CircleHelp className="mt-0.5 size-4 shrink-0 text-theme-accent" />

              <p className="text-[10px] leading-5 text-muted sm:text-[11px] sm:leading-6">{t('helper')}</p>
            </div>
          </div>

          {/* =========================================
              FAQ ACCORDION
              ========================================= */}

          <div className="overflow-hidden rounded-[30px] border border-border bg-background">
            {service.faqs.map((faq, index) => (
              <details key={faq.id} className="group border-b border-border last:border-b-0">
                <summary className="flex cursor-pointer list-none items-start gap-4 px-5 py-5 sm:px-7 sm:py-6">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-theme-accent/15 bg-theme-accent-soft">
                    <span className="font-mono text-[7px] text-theme-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-5">
                      <h3 className="max-w-[680px] text-[13px] font-medium leading-6 tracking-[-0.015em] text-foreground sm:text-[15px]">
                        {faq.question}
                      </h3>

                      <div className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border transition-[border-color,background-color,transform] duration-300 group-open:rotate-45 group-open:border-theme-accent/20 group-open:bg-theme-accent-soft">
                        <Plus className="size-3.5 text-theme-accent" />
                      </div>
                    </div>

                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-open:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="max-w-[720px] pb-1 pr-8 pt-4 text-[11px] leading-6 text-muted sm:text-[13px] sm:leading-7">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </summary>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
