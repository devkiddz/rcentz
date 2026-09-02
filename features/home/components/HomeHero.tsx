import { HeroStoryEngine } from '@/features/home/components/hero/HeroStoryEngine';
import { HomeHeroCapabilities } from '@/features/home/components/hero/HomeHeroCapabilities';
import { HomeHeroEnvironment } from '@/features/home/components/hero/HomeHeroEnvironment';

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* PERSISTENT RCENTZ STORY ENVIRONMENT */}
      <HomeHeroEnvironment />

      {/* STORY PLAYER */}
      <div className="rcentz-section relative z-10 pt-5 sm:pt-6">
        <HeroStoryEngine />

        {/* HERO → WEBSITE BRIDGE */}
        <div className="relative z-30 mt-2 translate-y-1/2">
          <HomeHeroCapabilities />
        </div>
      </div>
    </section>
  );
}
