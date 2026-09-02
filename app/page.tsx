import { HomeCTA } from '@/features/home/components/HomeCTA';
import { HomeHero } from '@/features/home/components/HomeHero';
import { HomeProjects } from '@/features/home/components/HomeProjects';
import { HomeServices } from '@/features/home/components/HomeServices';
import { getHomepageData } from '@/features/home/server/get-homepage-data';

export const revalidate = 300;

export default async function Home() {
  const { services, projects } = await getHomepageData();

  return (
    <main className="relative">
      <HomeHero />

      <HomeServices services={services} />

      <HomeProjects projects={projects} />

      <HomeCTA />
    </main>
  );
}
