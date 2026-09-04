'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { useCallback, useEffect, useState } from 'react';

import { HomeHeroEnvironment } from '@/features/home/components/hero/HomeHeroEnvironment';

import { WebDevelopmentStory } from '../WebDevelopmentStory';
import { WordPressStory } from '../WordPressStory';

const AUTO_ADVANCE_MS = 12000;

const TOTAL_SERVICE_CATEGORIES = 7;

const SERVICE_SLIDES = [
  {
    id: 'web-development',
    number: '01',
    label: 'Web Development',
    component: WebDevelopmentStory
  },
  {
    id: 'wordpress',
    number: '02',
    label: 'WordPress',
    component: WordPressStory
  }
] as const;

export function ServicesHero() {
  const reduceMotion = Boolean(useReducedMotion());

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const activeSlide = SERVICE_SLIDES[activeIndex];
  const ActiveStory = activeSlide.component;

  const restartTimer = useCallback(() => {
    setTimerKey(current => current + 1);
  }, []);

  const goToSlide = useCallback(
    (nextIndex: number) => {
      if (nextIndex === activeIndex) {
        return;
      }

      setDirection(nextIndex > activeIndex ? 1 : -1);
      setActiveIndex(nextIndex);
      restartTimer();
    },
    [activeIndex, restartTimer]
  );

  const goNext = useCallback(() => {
    setDirection(1);

    setActiveIndex(current => (current === SERVICE_SLIDES.length - 1 ? 0 : current + 1));

    restartTimer();
  }, [restartTimer]);

  const goPrevious = useCallback(() => {
    setDirection(-1);

    setActiveIndex(current => (current === 0 ? SERVICE_SLIDES.length - 1 : current - 1));

    restartTimer();
  }, [restartTimer]);

  /*
   * Automatic slide progression.
   */
  useEffect(() => {
    if (isPaused || reduceMotion || SERVICE_SLIDES.length <= 1) {
      return;
    }

    const timer = window.setTimeout(() => {
      goNext();
    }, AUTO_ADVANCE_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activeIndex, goNext, isPaused, reduceMotion, timerKey]);

  /*
   * Keyboard navigation.
   */
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') {
        goNext();
      }

      if (event.key === 'ArrowLeft') {
        goPrevious();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goNext, goPrevious]);

  return (
    <section
      className="relative isolate overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}>
      <HomeHeroEnvironment />

      <div className="rcentz-section relative z-10 py-10 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-[1140px]">
          {/* =========================================
              ACTIVE STORY
              ========================================= */}

          <div className="relative">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.div
                key={activeSlide.id}
                custom={direction}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: direction > 0 ? 28 : -28,
                        scale: 0.992
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1
                }}
                exit={
                  reduceMotion
                    ? {
                        opacity: 0
                      }
                    : {
                        opacity: 0,
                        x: direction > 0 ? -22 : 22,
                        scale: 0.992
                      }
                }
                transition={{
                  duration: 0.52,
                  ease: [0.22, 1, 0.36, 1]
                }}>
                <ActiveStory />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* =========================================
              SLIDER CONTROLS
              ========================================= */}

          <div className="mt-9 sm:mt-10">
            <div className="flex items-center justify-between gap-4">
              {/* Previous */}
              <button
                type="button"
                aria-label="Previous service"
                onClick={goPrevious}
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background/75 text-muted shadow-sm backdrop-blur-xl transition-[border-color,color,transform] hover:border-theme-accent/30 hover:text-theme-accent active:scale-95">
                <ChevronLeft className="size-3.5" />
              </button>

              {/* =====================================
                  CENTER STATUS
                  ===================================== */}

              <div className="min-w-0 flex-1">
                <div className="mx-auto max-w-[430px]">
                  {/* Auto progress */}
                  <div className="h-px overflow-hidden bg-border">
                    <motion.div
                      key={`${activeSlide.id}-${timerKey}`}
                      initial={{
                        width: reduceMotion ? '100%' : '0%'
                      }}
                      animate={{
                        width: '100%'
                      }}
                      transition={{
                        duration: reduceMotion || isPaused ? 0 : AUTO_ADVANCE_MS / 1000,
                        ease: 'linear'
                      }}
                      className="h-full bg-theme-accent"
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-4">
                    {/* Active category */}
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="size-1.5 shrink-0 rounded-full bg-theme-accent" />

                      <span className="font-mono text-[7px] tracking-[0.12em] text-foreground">
                        {activeSlide.number}
                      </span>

                      <span className="font-mono text-[7px] tracking-[0.12em] text-muted">
                        / {String(TOTAL_SERVICE_CATEGORIES).padStart(2, '0')}
                      </span>

                      <span className="mx-0.5 h-3 w-px shrink-0 bg-border" />

                      <span className="truncate text-[8px] font-medium text-muted">{activeSlide.label}</span>
                    </div>

                    {/* Slide dots */}
                    <div className="flex shrink-0 items-center gap-1.5" aria-label="Service slides">
                      {SERVICE_SLIDES.map((slide, index) => {
                        const isActive = index === activeIndex;

                        return (
                          <button
                            key={slide.id}
                            type="button"
                            aria-label={`Show ${slide.label}`}
                            aria-current={isActive ? 'true' : undefined}
                            onClick={() => goToSlide(index)}
                            className={[
                              'h-1.5',
                              'rounded-full',
                              'transition-[width,background-color]',
                              'duration-300',
                              isActive
                                ? 'w-5 bg-theme-accent'
                                : 'w-1.5 bg-foreground/15 hover:bg-foreground/30'
                            ].join(' ')}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Next */}
              <button
                type="button"
                aria-label="Next service"
                onClick={goNext}
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background/75 text-muted shadow-sm backdrop-blur-xl transition-[border-color,color,transform] hover:border-theme-accent/30 hover:text-theme-accent active:scale-95">
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
