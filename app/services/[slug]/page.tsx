import type { Metadata } from 'next';

import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';

import { ServiceDetail } from '@/features/services/components/detail/ServiceDetail';
import { getServiceBySlug } from '@/features/services/server/get-service-by-slug';
import { getVisitorCurrency } from '@/features/services/server/get-visitor-currency';
import { defaultLocale, isSupportedLocale, type SupportedLocale } from '@/i18n/config';

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 300;

async function getResolvedLocale(): Promise<SupportedLocale> {
  const locale = await getLocale();

  return isSupportedLocale(locale) ? locale : defaultLocale;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  const [currency, locale] = await Promise.all([getVisitorCurrency(), getResolvedLocale()]);

  const service = await getServiceBySlug(slug, currency, locale);

  if (!service) {
    return {
      title: 'Service not found | Rcentz Systems'
    };
  }

  return {
    title: `${service.name} | Rcentz Systems`,

    description:
      service.shortDescription ?? service.description ?? `Explore ${service.name} from Rcentz Systems.`
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;

  const [currency, locale] = await Promise.all([getVisitorCurrency(), getResolvedLocale()]);

  const service = await getServiceBySlug(slug, currency, locale);

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}
