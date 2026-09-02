import { HeroStoryEngine } from '@/features/home/components/hero/HeroStoryEngine';
import { HomeHeroCapabilities } from '@/features/home/components/hero/HomeHeroCapabilities';
import { HomeHeroEnvironment } from '@/features/home/components/hero/HomeHeroEnvironment';

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <HomeHeroEnvironment />

      <div className="rcentz-section relative z-10 pt-2 sm:pt-3 lg:pt-5">
        <HeroStoryEngine />

        <div className="relative z-30 mt-1 translate-y-1/2 sm:mt-2">
          <HomeHeroCapabilities />
        </div>
      </div>
    </section>
  );
}
