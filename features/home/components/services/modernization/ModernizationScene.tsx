'use client';

import {
  AnimatePresence,
  motion,
  useReducedMotion
} from 'motion/react';
import {
  useEffect,
  useState
} from 'react';

import { BusinessSystemUpgradeScene } from './BusinessSystemUpgradeScene';
import { CommerceEvolutionScene } from './CommerceEvolutionScene';
import { ModernizationNavigation } from './ModernizationNavigation';
import { WebsiteUpgradeScene } from './WebsiteUpgradeScene';
import { WordpressMigrationScene } from './WordpressMigrationScene';

const SLIDE_DURATION = 15000;

const SLIDES = [
  {
    id: 'wordpress',
    label: 'Migrate',
    eyebrow: 'Architecture migration',
    title: 'WordPress → Next.js',
    description:
      'Keep the content and business value. Replace the limitations underneath.'
  },
  {
    id: 'website',
    label: 'Upgrade',
    eyebrow: 'Website evolution',
    title: 'Static → Active',
    description:
      'Turn a passive website into a responsive business experience with real user flows.'
  },
  {
    id: 'commerce',
    label: 'Commerce',
    eyebrow: 'Commerce evolution',
    title: 'Store → Smart commerce',
    description:
      'Products, customers, checkout and operations react together as one system.'
  },
  {
    id: 'operations',
    label: 'Connect',
    eyebrow: 'Operations transformation',
    title: 'Manual → Connected',
    description:
      'Move people, projects, tasks and communication into one coherent workspace.'
  }
] as const;

export function ModernizationScene() {
  const reduceMotion = useReducedMotion();
  const [
    activeIndex,
    setActiveIndex
  ] = useState(0);
  const [
    paused,
    setPaused
  ] = useState(false);

  useEffect(() => {
    if (
      reduceMotion ||
      paused
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveIndex(
        current =>
          (current + 1) %
          SLIDES.length
      );
    }, SLIDE_DURATION);

    return () =>
      window.clearTimeout(timer);
  }, [
    activeIndex,
    paused,
    reduceMotion
  ]);

  const active =
    SLIDES[activeIndex];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() =>
        setPaused(true)
      }
      onMouseLeave={() =>
        setPaused(false)
      }>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 left-1/2 h-56 w-[62%] -translate-x-1/2 rounded-full bg-[var(--theme-accent-soft)] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [
                  0.14,
                  0.42,
                  0.14
                ],
                scale: [
                  0.96,
                  1.05,
                  0.96
                ]
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <div className="relative z-10 flex items-end justify-between gap-5 px-4 pt-4 sm:px-5">
        <div>
          <p className="font-mono text-[7px] uppercase tracking-[0.17em] text-[var(--theme-accent)]">
            {active.eyebrow}
          </p>

          <h4 className="mt-1.5 text-lg font-semibold tracking-[-0.035em] sm:text-xl">
            {active.title}
          </h4>
        </div>

        <p className="hidden max-w-sm text-right text-[9px] leading-4 text-muted md:block">
          {active.description}
        </p>
      </div>

      <div className="relative z-10 mt-3 min-h-[315px] overflow-hidden">
        <AnimatePresence
          mode="popLayout"
          initial={false}>
          <motion.div
            key={active.id}
            initial={
              reduceMotion
                ? false
                : {
                    y: '100%'
                  }
            }
            animate={{
              y: 0
            }}
            exit={
              reduceMotion
                ? undefined
                : {
                    y: '-100%'
                  }
            }
            transition={{
              duration: 0.6,
              ease: [
                0.22,
                1,
                0.36,
                1
              ]
            }}>
            {active.id ===
            'wordpress' ? (
              <WordpressMigrationScene />
            ) : active.id ===
              'website' ? (
              <WebsiteUpgradeScene />
            ) : active.id ===
              'commerce' ? (
              <CommerceEvolutionScene />
            ) : (
              <BusinessSystemUpgradeScene />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <ModernizationNavigation
        slides={SLIDES}
        activeIndex={activeIndex}
        duration={SLIDE_DURATION}
        paused={paused}
        onSelect={setActiveIndex}
        onPrevious={() =>
          setActiveIndex(
            current =>
              (current -
                1 +
                SLIDES.length) %
              SLIDES.length
          )
        }
        onNext={() =>
          setActiveIndex(
            current =>
              (current + 1) %
              SLIDES.length
          )
        }
      />
    </div>
  );
}
