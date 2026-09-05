import { ArrowUpRight, CircleDollarSign, Info, Layers3 } from 'lucide-react';

import { getLocale, getTranslations } from 'next-intl/server';

import type { ServiceDetail } from '../../server/get-service-by-slug';

type ServicePricePanelProps = {
  service: ServiceDetail;
};

function formatMoney(amount: number, currency: string, locale: string) {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString(locale)}`;
  }
}

export async function ServicePricePanel({ service }: ServicePricePanelProps) {
  const t = await getTranslations('ServicePricing');

  const locale = await getLocale();

  const prices = service.prices.map(price => ({
    ...price,

    priceFrom: Number(price.priceFrom),

    priceTo: price.priceTo === null ? null : Number(price.priceTo)
  }));

  if (prices.length === 0) {
    return null;
  }

  return (
    <aside className="relative overflow-hidden rounded-[30px] border border-border bg-background p-6 sm:p-7">
      {/* =========================================
          ENVIRONMENT
          ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-theme-accent-faint blur-3xl"
      />

      <div className="relative">
        {/* =========================================
            HEADER
            ========================================= */}

        <div className="flex items-start justify-between gap-4">
          <div className="flex size-10 items-center justify-center rounded-[15px] border border-theme-accent/15 bg-theme-accent-soft">
            <CircleDollarSign className="size-4 text-theme-accent" />
          </div>

          <span className="rounded-full border border-theme-accent/15 bg-theme-accent-soft px-2.5 py-1 font-mono text-[6px] uppercase tracking-[0.12em] text-theme-accent">
            {t('planningRange')}
          </span>
        </div>

        <div className="mt-6">
          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">{t('pricingGuide')}</p>

          <h3 className="mt-3 max-w-[420px] text-[1.85rem] font-semibold leading-[1] tracking-[-0.05em] text-foreground sm:text-[2.15rem]">
            {t('title')}
          </h3>

          <p className="mt-4 max-w-[470px] text-[11px] leading-6 text-muted sm:text-[12px] sm:leading-7">
            {t('description')}
          </p>
        </div>

        {/* =========================================
            PRICE OPTIONS
            ========================================= */}

        <div className="mt-7 space-y-3">
          {prices.map((price, index) => (
            <article key={price.id} className="rounded-[22px] border border-border bg-surface-muted/20 p-5">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[7px] uppercase tracking-[0.13em] text-theme-accent">
                      {price.currency}
                    </span>

                    <span className="font-mono text-[6px] text-muted">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <p className="mt-2 text-[10px] text-muted">{t('typicalStartingPoint')}</p>
                </div>

                <div className="text-right">
                  <p className="text-[23px] font-semibold leading-none tracking-[-0.05em] text-foreground sm:text-[27px]">
                    {formatMoney(price.priceFrom, price.currency, locale)}
                  </p>

                  {price.priceTo !== null ? (
                    <p className="mt-2 text-[8px] leading-4 text-muted">
                      {t.rich('typicalScopeRange', {
                        amount: chunks => <span className="font-medium text-foreground/80">{chunks}</span>,

                        value: formatMoney(price.priceTo, price.currency, locale)
                      })}
                    </p>
                  ) : null}
                </div>
              </div>

              {price.priceTo !== null ? (
                <div className="mt-5 h-1 overflow-hidden rounded-full bg-border">
                  <div className="h-full w-[42%] rounded-full bg-theme-accent/70" />
                </div>
              ) : null}
            </article>
          ))}
        </div>

        {/* =========================================
            WHAT AFFECTS THE QUOTE
            ========================================= */}

        <div className="mt-6 rounded-[22px] border border-theme-accent/15 bg-theme-accent-faint p-5">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 size-4 shrink-0 text-theme-accent" />

            <div>
              <p className="font-mono text-[7px] uppercase tracking-[0.13em] text-theme-accent">
                {t('quoteFactorsTitle')}
              </p>

              <p className="mt-2 text-[10px] leading-5 text-muted sm:text-[11px] sm:leading-6">
                {t('quoteFactorsDescription')}
              </p>
            </div>
          </div>
        </div>

        {/* =========================================
            CUSTOM SCOPE HANDOFF
            ========================================= */}

        <div className="mt-6 border-t border-border pt-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface-muted/25">
                <Layers3 className="size-3.5 text-theme-accent" />
              </div>

              <div>
                <p className="text-[11px] font-medium text-foreground sm:text-[12px]">
                  {t('customScopeTitle')}
                </p>

                <p className="mt-1 max-w-[330px] text-[9px] leading-5 text-muted sm:text-[10px]">
                  {t('customScopeDescription')}
                </p>
              </div>
            </div>

            <ArrowUpRight className="mt-1 size-4 shrink-0 text-theme-accent" />
          </div>
        </div>
      </div>
    </aside>
  );
}
