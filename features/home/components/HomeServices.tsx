import { ArrowUpRight } from 'lucide-react';

import type { HomepageData } from '@/features/home/server/get-homepage-data';

type HomeServicesProps = {
  services: HomepageData['services'];
};

function formatPrice(currency: string, amount: number) {
  return new Intl.NumberFormat(currency === 'NGN' ? 'en-NG' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

export function HomeServices({ services }: HomeServicesProps) {
  return (
    <section id="services" className="rcentz-section border-t border-border py-20">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Services</p>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">What we build.</h2>
        </div>

        <p className="hidden max-w-sm text-right text-sm leading-6 text-muted md:block">
          Selected services currently available through the Rcentz system.
        </p>
      </div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
        {services.map(service => {
          const ngnPrice = service.prices.find(price => price.currency === 'NGN');

          return (
            <article key={service.id} className="bg-background p-6 transition-colors hover:bg-surface-raised">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                    {service.category?.name ?? service.type}
                  </p>

                  <h3 className="mt-3 text-base font-semibold tracking-[-0.02em]">{service.name}</h3>
                </div>

                <ArrowUpRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-muted" />
              </div>

              {service.shortDescription ? (
                <p className="mt-4 max-w-lg text-sm leading-6 text-muted">{service.shortDescription}</p>
              ) : null}

              {ngnPrice ? (
                <p className="mt-6 font-mono text-[10px] text-muted">
                  From{' '}
                  <span className="text-foreground">
                    {formatPrice(ngnPrice.currency, ngnPrice.priceFrom)}
                  </span>
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
