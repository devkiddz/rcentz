import { HomeHeroCapabilities } from '@/features/home/components/hero/HomeHeroCapabilities';
import { HomeHeroIntro } from '@/features/home/components/hero/HomeHeroIntro';
import { HomeHeroWorkspace } from '@/features/home/components/hero/HomeHeroWorkspace';
import { RcentzAce } from '@/ui-shell/layers/RcentzAce';

export function HomeHero() {
  return (
    <section className="relative isolate">
      {/* HERO-BOUND RCENTZ ACE */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <RcentzAce />
      </div>

      {/* PRIMARY HERO */}
      <div className="rcentz-section relative z-10 pt-14 sm:pt-16 lg:pt-20">
        <div className="grid items-stretch gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-8">
          <HomeHeroIntro />

          <HomeHeroWorkspace />
        </div>

        {/* HERO → CONTENT BRIDGE */}
        <div className="relative z-20 mt-4 translate-y-1/2">
          <HomeHeroCapabilities />
        </div>
      </div>
    </section>
  );
}
