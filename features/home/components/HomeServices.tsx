import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { getTranslations } from 'next-intl/server';

import { HomeServiceCard } from '@/features/home/components/services/HomeServiceCard';

import type { HomepageData } from '@/features/home/server/get-homepage-data';

type HomeServicesProps = {
  services: HomepageData['services'];
};

const BUSINESS_MANAGEMENT_SLUG = 'business-management-system';

const BROKER_TRADING_SLUG = 'broker-trading-dashboard-development';

const BUSINESS_CATEGORY_SLUG = 'business-systems';

const FINANCIAL_CATEGORY_SLUG = 'financial-regulated-platforms';

export async function HomeServices({ services }: HomeServicesProps) {
  const t = await getTranslations('HomeServices');

  const visibleServices = services.slice(0, 6);

  const businessManagement =
    visibleServices.find(service => service.slug === BUSINESS_MANAGEMENT_SLUG) ??
    visibleServices.find(service => service.category?.slug === BUSINESS_CATEGORY_SLUG) ??
    visibleServices[0];

  const brokerTrading =
    visibleServices.find(service => service.slug === BROKER_TRADING_SLUG) ??
    visibleServices.find(
      service => service.category?.slug === FINANCIAL_CATEGORY_SLUG && service.id !== businessManagement?.id
    ) ??
    visibleServices.find(service => service.id !== businessManagement?.id);

  const reservedIds = new Set([businessManagement?.id, brokerTrading?.id].filter(Boolean));

  const remainingServices = visibleServices.filter(service => !reservedIds.has(service.id));

  return (
    <section id="services" className="rcentz-section border-t border-border py-20 sm:py-24">
      <div className="max-w-5xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{t('eyebrow')}</p>

        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl lg:text-5xl">
          {t('titlePrimary')} <span className="text-muted">{t('titleSecondary')}</span>
        </h2>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-muted sm:text-base">{t('description')}</p>
      </div>

      <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-3">
        {businessManagement ? (
          <HomeServiceCard service={businessManagement} index={0} className="lg:col-span-2" />
        ) : null}

        {brokerTrading ? <HomeServiceCard service={brokerTrading} index={1} /> : null}

        {remainingServices.slice(0, 3).map((service, index) => (
          <HomeServiceCard key={service.id} service={service} index={index + 2} />
        ))}

        {remainingServices[3] ? (
          <HomeServiceCard service={remainingServices[3]} index={5} className="lg:col-span-3" />
        ) : null}
      </div>

      <div className="mt-8">
        <Link
          href="/services"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface-muted px-4 text-[12px] font-medium text-foreground transition-[background-color,border-color] hover:border-border-strong hover:bg-secondary">
          {t('cta')}

          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
