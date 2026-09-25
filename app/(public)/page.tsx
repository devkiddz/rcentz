import { getTranslations } from 'next-intl/server';

import { HomeHero } from '@/features/home/components/HomeHero';
import { ProductShowcase } from '@/features/product-showcase';
import { HomeProjects } from '@/features/home/components/HomeProjects';
import { HomeServices } from '@/features/home/components/HomeServices';

import { HomeClosingExperience } from '@/features/home/components/closing/HomeClosingExperience';

import { HomeTechnologyEcosystem } from '@/features/home/components/ecosystem/HomeTechnologyEcosystem';

import { HomePricing } from '@/features/home/components/pricing/HomePricing';

import { getHomepageData } from '@/features/home/server/get-homepage-data';

import { getResolvedLocale } from '@/features/i18n/server/get-resolved-locale';

import { getProducts } from '@/features/products/server/get-products';

import { PopularServicesCarousel } from '@/features/services/components/summary/PopularServicesCarousel';

import { getPopularServices } from '@/features/services/server/get-popular-services';

export const revalidate = 300;

export default async function Home() {
  const locale = await getResolvedLocale();

  const [homepageData, popularServices, products, t] = await Promise.all([
    getHomepageData(locale),
    getPopularServices(),
    getProducts(),
    getTranslations('PopularServicesHome')
  ]);

  const { services, projects, pricingServices } = homepageData;

  return (
    <main className="relative">
      <HomeHero />

      <HomeTechnologyEcosystem />

      <ProductShowcase products={products} />

      <HomeServices services={services} />

      <PopularServicesCarousel services={popularServices} title={t('title')} description={t('description')} />

      <HomeProjects projects={projects} />

      <HomePricing services={pricingServices} />

      <HomeClosingExperience />
    </main>
  );
}
