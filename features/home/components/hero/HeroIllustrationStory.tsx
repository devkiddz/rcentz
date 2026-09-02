'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

import {
  HeroStoryIllustration,
  type HeroIllustrationVariant
} from '@/features/home/components/hero/HeroStoryIllustration';

type HeroIllustrationStoryProps = {
  eyebrow: string;
  title: string;
  description: string;
  status: string;
  variant: HeroIllustrationVariant;
};

export function HeroIllustrationStory({
  eyebrow,
  title,
  description,
  status,
  variant
}: HeroIllustrationStoryProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={[
        'grid',
        'min-h-[540px]',
        'items-center',
        'lg:min-h-[460px]',
        'lg:grid-cols-[0.82fr_1.18fr]',
        'lg:gap-7'
      ].join(' ')}>
      {/* DESKTOP STORY COPY */}

      <div
        className={['relative z-10', 'hidden', 'max-w-[455px]', 'flex-col justify-center', 'lg:flex'].join(
          ' '
        )}>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-theme-accent" />

          <p className="font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-muted">{eyebrow}</p>
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
            'mt-5',
            'text-balance',
            'bg-gradient-to-r',
            'from-foreground',
            'via-theme-accent',
            'to-theme-accent-strong',
            'bg-clip-text',
            'text-[3.05rem]',
            'font-semibold',
            'leading-[0.98]',
            'tracking-[-0.055em]',
            'text-transparent'
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
          className="mt-5 max-w-[410px] text-[15px] leading-7 text-muted">
          {description}
        </motion.p>

        <motion.div
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
            delay: 0.16,
            duration: 0.6
          }}
          className="mt-7">
          <Link
            href="#services"
            className={[
              'inline-flex h-10',
              'items-center justify-center gap-2',
              'rounded-full',
              'bg-primary',
              'px-5',
              'text-[12px]',
              'font-medium',
              'text-primary-foreground',
              'transition-[opacity,transform]',
              'hover:opacity-90',
              'active:scale-[0.98]'
            ].join(' ')}>
            Explore systems
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </motion.div>

        <div className="mt-6">
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

      {/* MOBILE = STORY OWNS THE SCREEN */}

      <div className={['relative', 'min-w-0', 'min-h-[540px]', 'sm:min-h-[580px]', 'lg:min-h-0'].join(' ')}>
        <HeroStoryIllustration variant={variant} />
      </div>
    </div>
  );
}
