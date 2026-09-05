// app/services/page.tsx

import { HomeTechnologyRail } from '@/features/home/components/HomeTechnologyRail';
import { ServicesHero } from '@/features/services/components/hero/ServicesHero';
import { ServicesInspirationSection } from '@/features/services/components/inspiration/ServicesInspirationSection';
import { ServicesCategoryBlocks } from '@/features/services/components/summary/ServicesCategoryBlocks';

import { getServiceCategories } from '@/features/services/server/get-service-categories';

export const revalidate = 300;

export default async function ServicesPage() {
  const categories = await getServiceCategories();

  return (
    <main className="relative">
      <ServicesHero />

      <HomeTechnologyRail />

      <ServicesInspirationSection />

      <ServicesCategoryBlocks categories={categories} />
    </main>
  );
}
