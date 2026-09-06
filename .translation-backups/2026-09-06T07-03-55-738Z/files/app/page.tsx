import { HomeHero } from '@/features/home/components/HomeHero';

import { HomeProjects } from '@/features/home/components/HomeProjects';

import { HomeServices } from '@/features/home/components/HomeServices';

import { HomeTechnologyEcosystem } from '@/features/home/components/ecosystem/HomeTechnologyEcosystem';

import { HomePricing } from '@/features/home/components/pricing/HomePricing';

import { HomeClosingExperience } from '@/features/home/components/closing/HomeClosingExperience';

import { getHomepageData } from '@/features/home/server/get-homepage-data';

export const revalidate = 300;

export default async function Home() {
  const { services, projects, pricingServices } = await getHomepageData();

  return (
    <main className="relative">
      <HomeHero />

      <HomeTechnologyEcosystem />

      <HomeServices services={services} />

      <HomeProjects projects={projects} />

      <HomePricing services={pricingServices} />

      <HomeClosingExperience />
    </main>
  );
}
