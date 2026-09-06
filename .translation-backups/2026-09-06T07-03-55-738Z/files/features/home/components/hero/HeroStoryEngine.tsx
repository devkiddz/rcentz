'use client';

import {
  Activity,
  Blocks,
  Boxes,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Database,
  Gauge,
  Layers3,
  MonitorSmartphone,
  Network,
  PackageCheck,
  Rocket,
  ServerCog,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  UserRoundCheck,
  Workflow
} from 'lucide-react';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { useEffect, useState } from 'react';

import { HeroIllustrationStory } from '@/features/home/components/hero/HeroIllustrationStory';

type DwellRange = readonly [number, number];

const STORIES = [
  {
    id: 'rcentz',

    label: 'Websites',

    dwell: [52000, 66000] as DwellRange,

    eyebrow: 'Website Development · E-commerce · Web Applications',

    title: 'We build websites that power success.',

    description:
      'Rcentz designs and develops professional, high-performance websites that help businesses attract customers, sell online, strengthen their brand and grow — from business websites and e-commerce stores to custom web applications.',

    variant: 'rcentz' as const,

    highlights: [
      {
        label: 'Business websites built to convert',

        icon: MonitorSmartphone,

        visual: 'icon' as const
      },

      {
        label: 'E-commerce stores built to sell',

        icon: ShoppingCart,

        visual: 'nodes' as const
      },

      {
        label: 'Custom web applications',

        icon: Blocks,

        visual: 'pulse' as const
      },

      {
        label: 'Redesigns that move you forward',

        icon: Rocket,

        visual: 'bars' as const
      }
    ]
  },

  {
    id: 'ai',

    label: 'Rcentz × AI',

    dwell: [58000, 74000] as DwellRange,

    eyebrow: 'Rcentz × AI · Faster Thinking · Smarter Execution',

    title: 'Turn ambitious ideas into working products faster.',

    description:
      'Rcentz combines human direction, engineering judgment and AI-assisted execution to explore faster, solve harder problems and move strong ideas toward production without sacrificing quality.',

    variant: 'ai' as const,

    highlights: [
      {
        label: 'Human-led product decisions',

        icon: UserRoundCheck,

        visual: 'icon' as const
      },

      {
        label: 'AI-accelerated engineering',

        icon: BrainCircuit,

        visual: 'pulse' as const
      },

      {
        label: 'Faster product iteration',

        icon: Sparkles,

        visual: 'bars' as const
      },

      {
        label: 'Reviewed before production',

        icon: ShieldCheck,

        visual: 'nodes' as const
      }
    ]
  },

  {
    id: 'system',

    label: 'Systems',

    dwell: [65000, 82000] as DwellRange,

    eyebrow: 'Frontend · Backend · Data · Infrastructure',

    title: 'Your business deserves more than a beautiful frontend.',

    description:
      'Rcentz builds complete digital systems where interfaces, authentication, databases, APIs, workflows and infrastructure work together to run real business operations.',

    variant: 'system' as const,

    highlights: [
      {
        label: 'Frontend + backend engineering',

        icon: Network,

        visual: 'nodes' as const
      },

      {
        label: 'Database + authentication',

        icon: Database,

        visual: 'pulse' as const
      },

      {
        label: 'APIs + business workflows',

        icon: Workflow,

        visual: 'bars' as const
      },

      {
        label: 'Production-ready deployment',

        icon: ServerCog,

        visual: 'icon' as const
      }
    ]
  },

  {
    id: 'data',

    label: 'Live Data',

    dwell: [54000, 70000] as DwellRange,

    eyebrow: 'Business Data · Activity · Decisions',

    title: 'Stop guessing. Build with data your business can use.',

    description:
      'Rcentz turns important actions, transactions and workflows into structured records that can power dashboards, automation, reporting and better business decisions.',

    variant: 'workflow' as const,

    highlights: [
      {
        label: 'Structured business records',

        icon: Database,

        visual: 'pulse' as const
      },

      {
        label: 'Traceable live activity',

        icon: Activity,

        visual: 'bars' as const
      }
    ]
  },

  {
    id: 'commerce',

    label: 'Commerce',

    dwell: [56000, 72000] as DwellRange,

    eyebrow: 'Products · Payments · Orders · Fulfilment',

    title: 'Build an online store designed to keep business moving.',

    description:
      'From product discovery and checkout to payment, orders and fulfilment, Rcentz connects the complete commerce journey into one experience built to sell and operate.',

    variant: 'commerce' as const,

    highlights: [
      {
        label: 'Product discovery + checkout',

        icon: ShoppingCart,

        visual: 'icon' as const
      },

      {
        label: 'Connected payment systems',

        icon: CreditCard,

        visual: 'pulse' as const
      },

      {
        label: 'Complete order lifecycle',

        icon: PackageCheck,

        visual: 'nodes' as const
      },

      {
        label: 'Fulfilment + delivery workflows',

        icon: Truck,

        visual: 'bars' as const
      }
    ]
  },

  {
    id: 'scale',

    label: 'Rcentz Core',

    dwell: [56000, 72000] as DwellRange,

    eyebrow: 'Build Once · Extend · Operate · Scale',

    title: 'Build today without rebuilding everything tomorrow.',

    description:
      'Rcentz creates reusable foundations that can grow from one website or application into broader services, commerce platforms and business systems as your needs expand.',

    variant: 'scale' as const,

    highlights: [
      {
        label: 'Shared system architecture',

        icon: Layers3,

        visual: 'nodes' as const
      },

      {
        label: 'Reusable product engines',

        icon: Blocks,

        visual: 'pulse' as const
      },

      {
        label: 'Multiple connected products',

        icon: Boxes,

        visual: 'icon' as const
      },

      {
        label: 'Expand without starting over',

        icon: Rocket,

        visual: 'bars' as const
      }
    ]
  }
] as const;

function getDwellDuration([minimum, maximum]: DwellRange) {
  return Math.round(minimum + Math.random() * (maximum - minimum));
}

export function HeroStoryEngine() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reduceMotion = Boolean(useReducedMotion());

  const activeStory = STORIES[activeIndex];

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    /*
     * The timing is deliberately variable.
     *
     * This prevents the visitor from subconsciously
     * learning "the Hero changes every 20 seconds".
     *
     * It should feel alive rather than scheduled.
     */
    const dwellDuration = getDwellDuration(activeStory.dwell);

    const timeout = window.setTimeout(() => {
      setActiveIndex(current => (current + 1) % STORIES.length);
    }, dwellDuration);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeIndex, activeStory.dwell, reduceMotion]);

  function showPreviousStory() {
    setActiveIndex(current => (current - 1 + STORIES.length) % STORIES.length);
  }

  function showNextStory() {
    setActiveIndex(current => (current + 1) % STORIES.length);
  }

  function showStory(index: number) {
    setActiveIndex(index);
  }

  return (
    <div className="relative">
      {/* ===============================
          STORY STAGE
          =============================== */}

      <div className="grid">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeStory.id}
            style={{
              gridArea: '1 / 1',

              willChange: reduceMotion ? 'auto' : 'transform, opacity'
            }}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 8,
                    scale: 0.998
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
              scale: 1
            }}
            exit={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    x: -6,
                    scale: 0.998
                  }
            }
            transition={{
              /*
               * Story changes should feel calm,
               * not like a carousel swipe.
               */
              duration: 0.72,

              ease: [0.22, 1, 0.36, 1]
            }}
            className="transform-gpu">
            <HeroIllustrationStory
              eyebrow={activeStory.eyebrow}
              title={activeStory.title}
              description={activeStory.description}
              highlights={activeStory.highlights}
              variant={activeStory.variant}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ===============================
          STORY CONTROLLER
          =============================== */}

      <div className="relative z-40 mt-2 flex justify-center sm:mt-3">
        <div
          className={[
            'inline-flex',
            'max-w-full',
            'items-center gap-1',
            'rounded-full',
            'border border-border',
            'bg-background/76',
            'p-1',
            'shadow-lg',
            'backdrop-blur-xl'
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
                  onClick={() => showStory(index)}
                  className={[
                    'relative',
                    'flex h-8',
                    'items-center gap-2',
                    'rounded-full',
                    'px-2',
                    'sm:px-3',
                    'transition-colors'
                  ].join(' ')}>
                  {active ? (
                    <motion.span
                      layoutId="hero-story-active"
                      transition={{
                        type: 'spring',

                        stiffness: 260,

                        damping: 30,

                        mass: 0.8
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
                      'md:inline',

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
