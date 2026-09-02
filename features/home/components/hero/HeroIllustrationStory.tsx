'use client';

import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

import {
  HeroStoryIllustration,
  type HeroIllustrationVariant
} from '@/features/home/components/hero/HeroStoryIllustration';

export type HeroServiceSlide = {
  label: string;
  description: string;
  icon: LucideIcon;
};

type HeroIllustrationStoryProps = {
  eyebrow: string;
  title: string;
  description: string;
  status: string;
  variant: HeroIllustrationVariant;
  serviceSlides?: readonly HeroServiceSlide[];
  mobileDescription?: string;
  mobileHighlights?: readonly string[];
};

const SERVICE_SLIDE_DURATION = 2250;

export function HeroIllustrationStory({
  eyebrow,
  title,
  description,
  status,
  variant,
  serviceSlides,
  mobileDescription,
  mobileHighlights
}: HeroIllustrationStoryProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const [serviceIndex, setServiceIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || !serviceSlides?.length || serviceSlides.length <= 1) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setServiceIndex(current => (current + 1) % serviceSlides.length);
    }, SERVICE_SLIDE_DURATION);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [reduceMotion, serviceIndex, serviceSlides]);

  const activeService = serviceSlides?.[serviceIndex];
  const ActiveServiceIcon = activeService?.icon;

  return (
    <div
      className={[
        'grid',
        'items-start',
        'lg:min-h-[460px]',
        'lg:grid-cols-[0.82fr_1.18fr]',
        'lg:items-center',
        'lg:gap-7'
      ].join(' ')}>
      {/* STORY COPY */}

      <div
        className={[
          'relative z-10',
          'flex flex-col',
          'px-1 pt-1',
          'lg:max-w-[455px]',
          'lg:justify-center',
          'lg:px-0 lg:pt-0'
        ].join(' ')}>
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-theme-accent lg:size-2" />

          <p className="font-mono text-[7px] font-medium uppercase tracking-[0.16em] text-muted lg:text-[9px] lg:tracking-[0.18em]">
            {eyebrow}
          </p>
        </div>

        <motion.h2
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  filter: 'blur(5px)'
                }
          }
          animate={{
            opacity: 1,
            filter: 'blur(0px)'
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1]
          }}
          className={[
            'mt-3',
            'max-w-[370px]',
            'text-balance',
            'bg-gradient-to-r',
            'from-foreground',
            'via-theme-accent',
            'to-theme-accent-strong',
            'bg-clip-text',
            'text-[1.72rem]',
            'font-semibold',
            'leading-[1.02]',
            'tracking-[-0.05em]',
            'text-transparent',
            'sm:text-[2rem]',
            'lg:mt-5',
            'lg:max-w-none',
            'lg:text-[3.05rem]',
            'lg:leading-[0.98]',
            'lg:tracking-[-0.055em]'
          ].join(' ')}>
          {title}
        </motion.h2>

        <motion.p
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0
                }
          }
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 0.1,
            duration: 0.65
          }}
          className={[
            'mt-3',
            'max-w-[390px]',
            'text-[12px]',
            'leading-[1.65]',
            'text-muted',
            'sm:text-[13px]',
            'lg:mt-5',
            'lg:max-w-[410px]',
            'lg:text-[15px]',
            'lg:leading-7'
          ].join(' ')}>
          {description}
        </motion.p>

        {/* MOBILE STORY CONTEXT */}

        {mobileDescription || mobileHighlights?.length ? (
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 8
                  }
            }
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.16,
              duration: 0.65
            }}
            className="mt-4 max-w-[390px] lg:hidden">
            {mobileDescription ? (
              <p className="text-[11px] leading-[1.7] text-muted">{mobileDescription}</p>
            ) : null}

            {mobileHighlights?.length ? (
              <div className={mobileDescription ? 'mt-3 grid gap-1.5' : 'grid gap-1.5'}>
                {mobileHighlights.map(highlight => (
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
            ) : null}
          </motion.div>
        ) : null}

        {/* RCENTZ SERVICE ROLLER */}

        {activeService && ActiveServiceIcon && serviceSlides ? (
          <div className="mt-5 max-w-[410px] lg:mt-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[6px] uppercase tracking-[0.15em] text-muted lg:text-[7px]">
                What we build
              </span>

              <span className="font-mono text-[6px] text-theme-accent lg:text-[7px]">
                {String(serviceIndex + 1).padStart(2, '0')} / {String(serviceSlides.length).padStart(2, '0')}
              </span>
            </div>

            <div className="relative min-h-[82px] overflow-hidden rounded-2xl border border-border bg-background/52 p-3.5 backdrop-blur-xl lg:min-h-[88px] lg:p-4">
              <div className="rcentz-grid-fade pointer-events-none absolute inset-0 opacity-28" />

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeService.label}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 18
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  exit={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 0,
                          y: -18
                        }
                  }
                  transition={{
                    duration: 0.68,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="relative z-10 flex items-center gap-3">
                  <motion.span
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scale: [1, 1.025, 1],
                            boxShadow: [
                              '0 0 0px var(--theme-accent)',
                              '0 0 10px var(--theme-accent)',
                              '0 0 0px var(--theme-accent)'
                            ]
                          }
                    }
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-theme-accent/16 bg-theme-accent-soft lg:size-11">
                    <ActiveServiceIcon className="size-4 text-theme-accent lg:size-[18px]" />
                  </motion.span>

                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold lg:text-[12px]">{activeService.label}</p>

                    <p className="mt-1 text-[8px] leading-4 text-muted lg:text-[9px]">
                      {activeService.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-2.5 flex items-center gap-1.5">
              {serviceSlides.map((service, index) => (
                <motion.span
                  key={service.label}
                  animate={{
                    width: index === serviceIndex ? 20 : 5,
                    opacity: index === serviceIndex ? 1 : 0.24
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className={[
                    'h-1 rounded-full',
                    index === serviceIndex ? 'bg-theme-accent' : 'bg-muted'
                  ].join(' ')}
                />
              ))}
            </div>
          </div>
        ) : null}

        {/* STORY ACTIONS */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 6
                }
          }
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.18,
            duration: 0.6
          }}
          className={[
            'flex flex-wrap items-center gap-2.5',
            serviceSlides?.length ? 'mt-5' : 'mt-6',
            'lg:mt-7'
          ].join(' ')}>
          <Link
            href="#work"
            className={[
              'inline-flex h-9 items-center justify-center gap-2 rounded-full',
              'bg-primary px-4',
              'text-[11px] font-medium text-primary-foreground',
              'transition-[opacity,transform]',
              'hover:opacity-90',
              'active:scale-[0.98]',
              'lg:h-10 lg:px-5 lg:text-[12px]'
            ].join(' ')}>
            View our work
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>

          <Link
            href="#services"
            className={[
              'inline-flex h-9 items-center justify-center gap-2 rounded-full',
              'border border-border',
              'bg-background/40 px-4 backdrop-blur-xl',
              'text-[11px] font-medium text-foreground',
              'transition-[background-color,border-color,transform]',
              'hover:border-border-strong',
              'hover:bg-surface-muted',
              'active:scale-[0.98]',
              'lg:h-10 lg:px-5 lg:text-[12px]'
            ].join(' ')}>
            Explore services
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </motion.div>

        <div className="mt-6 hidden lg:block">
          <div
            className={[
              'inline-flex',
              'items-center gap-2',
              'rounded-full',
              'border border-border',
              'bg-background/45',
              'px-3 py-1.5',
              'backdrop-blur-xl'
            ].join(' ')}>
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-theme-accent opacity-30" />

              <span className="relative inline-flex size-1.5 rounded-full bg-theme-accent" />
            </span>

            <span className="font-mono text-[8px] font-medium uppercase tracking-[0.13em] text-muted">
              {status}
            </span>
          </div>
        </div>
      </div>

      {/* VISUAL */}

      <div
        className={[
          'relative',
          'mt-4',
          'min-w-0',
          'min-h-[540px]',
          'sm:mt-5',
          'sm:min-h-[580px]',
          'lg:mt-0',
          'lg:min-h-0'
        ].join(' ')}>
        <HeroStoryIllustration variant={variant} />
      </div>
    </div>
  );
}
