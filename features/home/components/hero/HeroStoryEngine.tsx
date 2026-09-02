'use client';

import Link from 'next/link';
import {
  AppWindow,
  ArrowRight,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  LayoutDashboard,
  MessageSquareText,
  ServerCog,
  ShoppingCart,
  Sparkles
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

import {
  HeroIllustrationStory,
  type HeroServiceSlide
} from '@/features/home/components/hero/HeroIllustrationStory';
import { HomeHeroIntro } from '@/features/home/components/hero/HomeHeroIntro';
import { HomeHeroWorkspace } from '@/features/home/components/hero/HomeHeroWorkspace';

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

const RCENTZ_SERVICE_SLIDES: readonly HeroServiceSlide[] = [
  {
    label: 'Web Development',
    description: 'Modern responsive websites built for performance and conversion.',
    icon: Code2
  },
  {
    label: 'Web Applications',
    description: 'Custom application systems designed around real business workflows.',
    icon: AppWindow
  },
  {
    label: 'E-commerce Solutions',
    description: 'Connected online stores, checkout flows and commerce experiences.',
    icon: ShoppingCart
  },
  {
    label: 'UI/UX Design',
    description: 'Clean user-focused interfaces for web and application products.',
    icon: Sparkles
  },
  {
    label: 'Systems & Dashboards',
    description: 'Operational, reporting and business management dashboards.',
    icon: LayoutDashboard
  },
  {
    label: 'Online Banking / Fintech',
    description: 'Interface systems for modern fintech and financial platforms.',
    icon: Building2
  },
  {
    label: 'Brokers Dashboards',
    description: 'Structured dashboards for trading, brokerage and market workflows.',
    icon: ServerCog
  },
  {
    label: 'Maintenance & Support',
    description: 'Updates, ongoing improvements and dependable system support.',
    icon: MessageSquareText
  }
];

const RCENTZ_STORY = {
  eyebrow: 'Websites · Systems · Business',
  title: 'We build the digital systems that power modern businesses',
  description:
    'Premium digital solutions for modern businesses — designed to perform, built to scale and connected to real operations.',
  mobileDescription:
    'From business websites and e-commerce to dashboards, fintech interfaces and custom applications, Rcentz builds connected digital systems around how businesses actually operate.',
  mobileHighlights: [
    'Responsive by design',
    'Built for real business workflows',
    'Scalable from website to full system'
  ] as const,
  status: 'Building production systems',
  variant: 'rcentz' as const,
  serviceSlides: RCENTZ_SERVICE_SLIDES
};

const ILLUSTRATION_STORIES = [
  {
    eyebrow: 'Data · Prisma · Databases',
    title: 'When A Business activity becomes structured data.',
    description:
      'Watch application events become persistent records as users, projects and activity move through the system.',
    mobileDescription:
      'Every meaningful action can become durable system history — captured, organized and ready to power dashboards, workflows and future decisions.',
    mobileHighlights: [
      'Structured records',
      'Persistent application state',
      'Traceable business activity'
    ] as const,
    status: 'Live database activity',
    variant: 'workflow' as const
  },
  {
    eyebrow: 'Commerce · Payments · Delivery',
    title: 'One purchase. One connected journey.',
    description:
      'From product selection and payment routing to fulfilment, notifications and final delivery.',
    mobileDescription:
      'A purchase is more than a checkout screen. Rcentz connects the commercial flow so the order can move cleanly from intent to payment, fulfilment and delivery.',
    mobileHighlights: [
      'Checkout & payment routing',
      'Order state & notifications',
      'Fulfilment & delivery'
    ] as const,
    status: 'Order lifecycle active',
    variant: 'commerce' as const
  },
  {
    eyebrow: 'Foundation · Products · Scale',
    title: 'One foundation. Multiple products.',
    description: 'Commerce, projects, services and platforms operate around one reusable Rcentz foundation.',
    mobileDescription:
      'Instead of rebuilding the same foundations for every product, shared engines can support new services, platforms and business experiences as Rcentz grows.',
    mobileHighlights: [
      'Shared architecture',
      'Reusable product engines',
      'Built to expand without starting over'
    ] as const,
    status: 'Rcentz ecosystem active',
    variant: 'scale' as const
  }
];

const SYSTEM_MOBILE_HIGHLIGHTS = [
  'Frontend + backend connected',
  'Database, auth and APIs working together',
  'Structured for production growth'
] as const;

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
      return <HeroIllustrationStory {...RCENTZ_STORY} />;
    }

    if (activeIndex === 1) {
      return (
        <div
          className={[
            'grid',
            'items-start',
            'lg:min-h-[500px]',
            'lg:grid-cols-[0.86fr_1.14fr]',
            'lg:items-stretch',
            'lg:gap-8'
          ].join(' ')}>
          {/* MOBILE SYSTEM COPY */}

          <div className="relative z-20 px-1 pt-1 lg:hidden">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-theme-accent" />

              <p className="font-mono text-[7px] font-medium uppercase tracking-[0.16em] text-muted">
                Software · Systems · Scale
              </p>
            </div>

            <h2
              className={[
                'mt-3',
                'max-w-[350px]',
                'text-balance',
                'text-[1.75rem]',
                'font-semibold',
                'leading-[1.02]',
                'tracking-[-0.05em]'
              ].join(' ')}>
              We engineer the technology that powers{' '}
              <span
                className={[
                  'bg-gradient-to-r',
                  'from-foreground',
                  'via-theme-accent',
                  'to-theme-accent-strong',
                  'bg-clip-text',
                  'text-transparent'
                ].join(' ')}>
                market leaders...
              </span>
            </h2>

            <p className="mt-3 max-w-[380px] text-[12px] leading-[1.65] text-muted">
              Connected software, data and production infrastructure built as one working system.
            </p>

            <p className="mt-4 max-w-[390px] text-[11px] leading-[1.7] text-muted">
              The interface is only one layer. Underneath it, Rcentz connects application logic, database
              records, authentication and server behaviour so the product works as a complete operational
              system.
            </p>

            <div className="mt-3 grid gap-1.5">
              {SYSTEM_MOBILE_HIGHLIGHTS.map(highlight => (
                <div
                  key={highlight}
                  className="flex items-center gap-2 font-mono text-[7px] uppercase tracking-[0.08em] text-muted">
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-full border border-theme-accent/16 bg-theme-accent-soft">
                    <Check className="size-2.5 text-theme-accent" />
                  </span>

                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <Link
                href="/work"
                className={[
                  'inline-flex h-9 items-center justify-center gap-2 rounded-full',
                  'bg-primary px-4',
                  'text-[11px] font-medium text-primary-foreground',
                  'transition-[opacity,transform]',
                  'hover:opacity-90',
                  'active:scale-[0.98]'
                ].join(' ')}>
                View our work
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>

              <Link
                href="/services"
                className={[
                  'inline-flex h-9 items-center justify-center gap-2 rounded-full',
                  'border border-border',
                  'bg-background/40 px-4 backdrop-blur-xl',
                  'text-[11px] font-medium text-foreground',
                  'transition-[background-color,border-color,transform]',
                  'hover:border-border-strong',
                  'hover:bg-surface-muted',
                  'active:scale-[0.98]'
                ].join(' ')}>
                Explore services
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* DESKTOP INTRO */}

          <div className="hidden lg:block">
            <HomeHeroIntro />
          </div>

          {/* WORKSPACE */}

          <div className="mt-4 min-w-0 sm:mt-5 lg:mt-0">
            <HomeHeroWorkspace />
          </div>
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

      <div className="relative z-40 mt-1 flex justify-center sm:mt-2">
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
