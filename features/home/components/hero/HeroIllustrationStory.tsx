'use client';

import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

import { motion, useReducedMotion } from 'motion/react';

import {
  HeroStoryHighlights,
  type HeroStoryHighlight
} from '@/features/home/components/hero/HeroStoryHighlights';

import {
  HeroStoryIllustration,
  type HeroIllustrationVariant
} from '@/features/home/components/hero/HeroStoryIllustration';

type HeroIllustrationStoryProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: readonly HeroStoryHighlight[];
  variant: HeroIllustrationVariant;
};

export function HeroIllustrationStory({
  eyebrow,
  title,
  description,
  highlights,
  variant
}: HeroIllustrationStoryProps) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div
      className={[
        'grid',
        'items-start',
        'lg:min-h-[520px]',
        'lg:grid-cols-[0.76fr_1.24fr]',
        'lg:items-center',
        'lg:gap-10'
      ].join(' ')}>
      {/* ===============================
          LEFT STORY
          =============================== */}

      <div
        className={[
          'relative z-20',
          'flex flex-col',
          'justify-center',
          'pt-1',
          'lg:max-w-[470px]',
          'lg:pt-0'
        ].join(' ')}>
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-theme-accent" />

          <p
            className={[
              'font-mono',
              'text-[7px]',
              'font-medium',
              'uppercase',
              'tracking-[0.17em]',
              'text-muted',
              'sm:text-[8px]',
              'lg:text-[9px]'
            ].join(' ')}>
            {eyebrow}
          </p>
        </div>

        <motion.h2
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
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }}
          className={[
            'mt-3',
            'max-w-[385px]',
            'text-balance',
            'text-[2rem]',
            'font-semibold',
            'leading-[0.98]',
            'tracking-[-0.055em]',
            'sm:text-[2.35rem]',
            'lg:mt-4',
            'lg:max-w-[470px]',
            'lg:text-[3.35rem]',
            'lg:leading-[0.97]'
          ].join(' ')}>
          {title}
        </motion.h2>

        <motion.p
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 5
                }
          }
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.05,
            duration: 0.52
          }}
          className={[
            'mt-3',
            'max-w-[370px]',
            'text-[11px]',
            'leading-[1.65]',
            'text-muted',
            'sm:text-[12px]',
            'lg:mt-4',
            'lg:max-w-[420px]',
            'lg:text-[14px]',
            'lg:leading-6'
          ].join(' ')}>
          {description}
        </motion.p>

        {/* VISUAL EXPLANATIONS */}

        <div className="mt-5 lg:mt-6">
          <HeroStoryHighlights items={highlights} />
        </div>

        {/* CTAs */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 5
                }
          }
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.2,
            duration: 0.5
          }}
          className="mt-6 flex items-center gap-2.5 lg:mt-7">
          <Link
            href="/portfolio"
            className={[
              'inline-flex h-9',
              'items-center justify-center',
              'gap-2 rounded-full',
              'bg-primary px-4',
              'text-[11px] font-medium',
              'text-primary-foreground',
              'transition-[opacity,transform]',
              'hover:opacity-90',
              'active:scale-[0.98]',
              'lg:h-10',
              'lg:px-5',
              'lg:text-[12px]'
            ].join(' ')}>
            View our work
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>

          {/* MOBILE:
              icon only + breathing background

              DESKTOP:
              full CTA
          */}

          <Link
            href="/services"
            aria-label="Explore services"
            className={[
              'relative isolate',
              'inline-flex size-9',
              'items-center justify-center',
              'overflow-visible',
              'rounded-full',
              'border',
              'border-theme-accent/25',
              'bg-theme-accent-faint',
              'text-foreground',
              'transition-[transform,background-color,border-color]',
              'hover:border-theme-accent/45',
              'active:scale-[0.97]',

              'sm:size-10',

              'lg:h-10',
              'lg:w-auto',
              'lg:gap-2',
              'lg:border-border',
              'lg:bg-background/40',
              'lg:px-5',
              'lg:text-[12px]',
              'lg:backdrop-blur-xl',
              'lg:hover:border-border-strong',
              'lg:hover:bg-surface-muted'
            ].join(' ')}>
            {!reduceMotion ? (
              <motion.span
                aria-hidden="true"
                animate={{
                  scale: [0.88, 1.24, 0.88],
                  opacity: [0.12, 0.4, 0.12]
                }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute inset-0 rounded-full bg-theme-accent-soft lg:hidden"
              />
            ) : null}

            <Compass aria-hidden="true" className="relative z-10 size-3.5 text-theme-accent lg:hidden" />

            <span className="relative z-10 hidden lg:inline">Explore services</span>

            <ArrowRight aria-hidden="true" className="relative z-10 hidden size-3.5 lg:block" />
          </Link>
        </motion.div>
      </div>

      {/* ===============================
          RIGHT ILLUSTRATION
          =============================== */}

      <div className="mt-7 min-w-0 sm:mt-8 lg:mt-0">
        <HeroStoryIllustration variant={variant} />
      </div>
    </div>
  );
}
