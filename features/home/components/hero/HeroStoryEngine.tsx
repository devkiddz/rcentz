'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

import { HeroIllustrationStory } from '@/features/home/components/hero/HeroIllustrationStory';
import { HomeHeroIntro } from '@/features/home/components/hero/HomeHeroIntro';
import { HomeHeroWorkspace } from '@/features/home/components/hero/HomeHeroWorkspace';
import { RcentzWebsiteStory } from '@/features/home/components/hero/stories/RcentzWebsiteStory';

const STORIES = [
  {
    id: 'delivery',
    label: 'Rcentz',
    duration: 14000
  },
  {
    id: 'system',
    label: 'System',
    duration: 15500
  },
  {
    id: 'data',
    label: 'Live Data',
    duration: 14000
  },
  {
    id: 'commerce',
    label: 'Commerce',
    duration: 15500
  },
  {
    id: 'scale',
    label: 'Rcentz Core',
    duration: 16000
  }
] as const;

const ILLUSTRATION_STORIES = [
  {
    eyebrow: 'Data · Prisma · Databases',
    title: 'Business activity becomes structured data.',
    description:
      'Watch application events become persistent records as users, projects and activity move through the system.',
    status: 'Live database activity',
    variant: 'workflow' as const
  },
  {
    eyebrow: 'Commerce · Payments · Delivery',
    title: 'One purchase. One connected journey.',
    description:
      'From product selection and payment routing to fulfilment, notifications and final delivery.',
    status: 'Order lifecycle active',
    variant: 'commerce' as const
  },
  {
    eyebrow: 'Foundation · Products · Scale',
    title: 'One foundation. Multiple products.',
    description: 'Commerce, projects, services and platforms operate around one reusable Rcentz foundation.',
    status: 'Rcentz ecosystem active',
    variant: 'scale' as const
  }
];

export function HeroStoryEngine() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveIndex(current => (current + 1) % STORIES.length);
    }, STORIES[activeIndex].duration);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeIndex, reduceMotion]);

  function showPreviousStory() {
    setActiveIndex(current => (current - 1 + STORIES.length) % STORIES.length);
  }

  function showNextStory() {
    setActiveIndex(current => (current + 1) % STORIES.length);
  }

  function renderActiveStory() {
    if (activeIndex === 0) {
      return <RcentzWebsiteStory />;
    }

    if (activeIndex === 1) {
      return (
        <div className="grid min-h-[500px] items-stretch gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-8">
          <HomeHeroIntro />

          <HomeHeroWorkspace />
        </div>
      );
    }

    return <HeroIllustrationStory {...ILLUSTRATION_STORIES[activeIndex - 2]} />;
  }

  return (
    <div className="relative">
      {/* STORY STAGE */}

      <div className="grid">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={activeIndex}
            style={{
              gridArea: '1 / 1'
            }}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 5,
                    filter: 'blur(3px)'
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)'
            }}
            exit={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: -4,
                    filter: 'blur(2px)'
                  }
            }
            transition={{
              duration: 1.05,
              ease: [0.22, 1, 0.36, 1]
            }}>
            {renderActiveStory()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* STORY CONTROLLER */}

      <div className="relative z-40 mt-2 flex justify-center sm:mt-3">
        <div
          className={[
            'inline-flex',
            'max-w-full',
            'items-center gap-1',
            'rounded-full',
            'border border-border',
            'bg-background/72',
            'p-1',
            'shadow-lg',
            'backdrop-blur-2xl'
          ].join(' ')}>
          <button
            type="button"
            aria-label="Previous story"
            onClick={showPreviousStory}
            className={[
              'flex size-8 shrink-0',
              'items-center justify-center',
              'rounded-full',
              'text-muted',
              'transition-colors',
              'hover:bg-surface-muted',
              'hover:text-foreground'
            ].join(' ')}>
            <ChevronLeft aria-hidden="true" className="size-3.5" />
          </button>

          <div className="flex items-center gap-0.5">
            {STORIES.map((story, index) => {
              const active = index === activeIndex;

              return (
                <button
                  key={story.id}
                  type="button"
                  aria-label={`Show ${story.label} story`}
                  aria-current={active ? 'true' : undefined}
                  onClick={() => setActiveIndex(index)}
                  className={[
                    'relative',
                    'flex h-8',
                    'items-center gap-2',
                    'rounded-full',
                    'px-2.5',
                    'sm:px-3',
                    'transition-colors'
                  ].join(' ')}>
                  {active ? (
                    <motion.span
                      layoutId="hero-story-active"
                      transition={{
                        type: 'spring',
                        stiffness: 340,
                        damping: 32
                      }}
                      className={[
                        'absolute inset-0',
                        'rounded-full',
                        'border',
                        'border-theme-accent/25',
                        'bg-theme-accent-soft'
                      ].join(' ')}
                    />
                  ) : null}

                  <motion.span
                    animate={{
                      scale: active ? 1 : 0.68,
                      opacity: active ? 1 : 0.35
                    }}
                    transition={{
                      duration: 0.3
                    }}
                    className={[
                      'relative z-10',
                      'size-1.5',
                      'rounded-full',
                      active ? 'bg-theme-accent' : 'bg-muted'
                    ].join(' ')}
                  />

                  <span
                    className={[
                      'relative z-10',
                      'font-mono',
                      'text-[7px]',
                      'tracking-[0.11em]',
                      active ? 'text-foreground' : 'text-muted'
                    ].join(' ')}>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span
                    className={[
                      'relative z-10',
                      'hidden',
                      'text-[8px]',
                      'font-medium',
                      'sm:inline',
                      active ? 'text-foreground' : 'text-muted'
                    ].join(' ')}>
                    {story.label}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Next story"
            onClick={showNextStory}
            className={[
              'flex size-8 shrink-0',
              'items-center justify-center',
              'rounded-full',
              'text-muted',
              'transition-colors',
              'hover:bg-surface-muted',
              'hover:text-foreground'
            ].join(' ')}>
            <ChevronRight aria-hidden="true" className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
