import { HeroStoryEngine } from '@/features/home/components/hero/HeroStoryEngine';
import { HomeHeroCapabilities } from '@/features/home/components/hero/HomeHeroCapabilities';
import { HomeHeroEnvironment } from '@/features/home/components/hero/HomeHeroEnvironment';

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <HomeHeroEnvironment />

      <div className="rcentz-section relative z-10 pt-2 sm:pt-3 lg:pt-5">
        <div className="mx-auto w-full max-w-[1180px]">
          <HeroStoryEngine />
        </div>

        <div className="relative z-30 mt-8 pb-6 sm:mt-10 sm:pb-8 lg:mt-12 lg:pb-10">
          <HomeHeroCapabilities />
        </div>
      </div>
    </section>
  );
}
