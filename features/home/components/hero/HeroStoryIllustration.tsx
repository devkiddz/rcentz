import { HomeHeroWorkspace } from '@/features/home/components/hero/HomeHeroWorkspace';

import { AICollaborationStory } from '@/features/home/components/hero/stories/AICollaborationStory';
import { CommerceJourneyStory } from '@/features/home/components/hero/stories/CommerceJourneyStory';
import { DatabaseRecordingStory } from '@/features/home/components/hero/stories/DatabaseRecordingStory';
import { RcentzGlobeStory } from '@/features/home/components/hero/stories/RcentzGlobeStory';
import { RcentzWebsiteStory } from '@/features/home/components/hero/stories/RcentzWebsiteStory';

export type HeroIllustrationVariant = 'rcentz' | 'ai' | 'system' | 'workflow' | 'commerce' | 'scale';

type HeroStoryIllustrationProps = {
  variant: HeroIllustrationVariant;
};

export function HeroStoryIllustration({ variant }: HeroStoryIllustrationProps) {
  return (
    <div className="relative min-h-[405px]">
      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',
          'absolute inset-0',
          'bg-[radial-gradient(circle_at_center,var(--theme-accent-faint),transparent_68%)]'
        ].join(' ')}
      />

      {variant === 'rcentz' ? <RcentzWebsiteStory /> : null}

      {variant === 'ai' ? <AICollaborationStory /> : null}

      {variant === 'system' ? <HomeHeroWorkspace /> : null}

      {variant === 'workflow' ? <DatabaseRecordingStory /> : null}

      {variant === 'commerce' ? <CommerceJourneyStory /> : null}

      {variant === 'scale' ? <RcentzGlobeStory /> : null}
    </div>
  );
}
