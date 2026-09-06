import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { HomeServiceCard } from '@/features/home/components/services/HomeServiceCard';
import type { HomepageData } from '@/features/home/server/get-homepage-data';

type HomeServicesProps = { services: HomepageData['services'] };

export async function HomeServices({ services }: HomeServicesProps) {
  const t = await getTranslations('HomeServices');
  const visibleServices = services.slice(0, 6);
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
        {visibleServices[0] ? <HomeServiceCard service={visibleServices[0]} index={0} className="lg:col-span-2" /> : null}
        {visibleServices[1] ? <HomeServiceCard service={visibleServices[1]} index={1} /> : null}
        {visibleServices.slice(2, 5).map((service, offset) => <HomeServiceCard key={service.id} service={service} index={offset + 2} />)}
        {visibleServices[5] ? <HomeServiceCard service={visibleServices[5]} index={5} className="lg:col-span-3" /> : null}
      </div>
      <div className="mt-8">
        <Link href="/services" className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface-muted px-4 text-[12px] font-medium text-foreground transition-[background-color,border-color] hover:border-border-strong hover:bg-secondary">
          {t('cta')} <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
