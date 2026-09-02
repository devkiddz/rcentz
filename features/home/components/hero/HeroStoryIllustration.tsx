'use client';

import { CommerceJourneyStory } from '@/features/home/components/hero/stories/CommerceJourneyStory';
import { DatabaseRecordingStory } from '@/features/home/components/hero/stories/DatabaseRecordingStory';
import { RcentzGlobeStory } from '@/features/home/components/hero/stories/RcentzGlobeStory';
import { RcentzWebsiteStory } from '@/features/home/components/hero/stories/RcentzWebsiteStory';

export type HeroIllustrationVariant = 'rcentz' | 'workflow' | 'commerce' | 'scale';

type HeroStoryIllustrationProps = {
  variant: HeroIllustrationVariant;
};

export function HeroStoryIllustration({ variant }: HeroStoryIllustrationProps) {
  return (
    <div className="relative min-h-[405px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--theme-accent-faint),transparent_68%)]" />

      {variant === 'rcentz' ? <RcentzWebsiteStory /> : null}

      {variant === 'workflow' ? <DatabaseRecordingStory /> : null}

      {variant === 'commerce' ? <CommerceJourneyStory /> : null}

      {variant === 'scale' ? <RcentzGlobeStory /> : null}
    </div>
  );
}
