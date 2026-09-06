// app/services/page.tsx

import { HomeTechnologyRail } from '@/features/home/components/HomeTechnologyRail';

import { ServicesHero } from '@/features/services/components/hero/ServicesHero';

import { ServicesInspirationSection } from '@/features/services/components/inspiration/ServicesInspirationSection';

import { PopularServicesCarousel } from '@/features/services/components/summary/PopularServicesCarousel';

import { ServicesCategoryBlocks } from '@/features/services/components/summary/ServicesCategoryBlocks';

import { getPopularServices } from '@/features/services/server/get-popular-services';

import { getServiceCategories } from '@/features/services/server/get-service-categories';

export const revalidate = 300;

export default async function ServicesPage() {
  const [categories, popularServices] = await Promise.all([getServiceCategories(), getPopularServices()]);

  return (
    <main className="relative">
      <ServicesHero />

      <HomeTechnologyRail />

      <ServicesInspirationSection />

      <PopularServicesCarousel services={popularServices} />

      <ServicesCategoryBlocks categories={categories} />
    </main>
  );
}
