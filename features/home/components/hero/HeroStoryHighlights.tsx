'use client';

import type { LucideIcon } from 'lucide-react';

import { motion, useReducedMotion } from 'motion/react';

export type HeroHighlightVisual = 'icon' | 'pulse' | 'bars' | 'nodes';

export type HeroStoryHighlight = {
  label: string;
  icon: LucideIcon;
  visual?: HeroHighlightVisual;
};

type HeroStoryHighlightsProps = {
  items: readonly HeroStoryHighlight[];
};

function HighlightVisual({
  icon: Icon,
  visual = 'icon'
}: {
  icon: LucideIcon;
  visual?: HeroHighlightVisual;
}) {
  const reduceMotion = Boolean(useReducedMotion());

  if (visual === 'bars') {
    return (
      <div
        className={[
          'relative flex size-10 shrink-0',
          'items-end justify-center',
          'gap-[2px]',
          'rounded-full',
          'border border-border',
          'bg-background/58',
          'pb-[9px]',
          'backdrop-blur-xl'
        ].join(' ')}>
        {[8, 14, 10].map((height, index) => (
          <motion.span
            key={index}
            animate={
              reduceMotion
                ? undefined
                : {
                    height: [height, height + 5, height]
                  }
            }
            transition={{
              duration: 2.2 + index * 0.3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="w-[3px] rounded-full bg-theme-accent"
            style={{
              height
            }}
          />
        ))}
      </div>
    );
  }

  if (visual === 'nodes') {
    return (
      <div className="relative size-10 shrink-0 rounded-full border border-border bg-background/58 backdrop-blur-xl">
        <span className="absolute left-[10px] top-[11px] size-1.5 rounded-full bg-theme-accent" />

        <span className="absolute right-[9px] top-[9px] size-1 rounded-full bg-theme-accent/55" />

        <span className="absolute bottom-[9px] left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-theme-accent/75" />

        <span className="absolute left-[12px] top-[14px] h-px w-[14px] rotate-[-8deg] bg-theme-accent/30" />

        <span className="absolute bottom-[13px] left-[13px] h-px w-[13px] rotate-[48deg] bg-theme-accent/30" />

        {!reduceMotion ? (
          <motion.span
            animate={{
              scale: [0.7, 1.45, 0.7],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute left-[8px] top-[9px] size-5 rounded-full border border-theme-accent/25"
          />
        ) : null}
      </div>
    );
  }

  return (
    <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background/58 backdrop-blur-xl">
      {visual === 'pulse' && !reduceMotion ? (
        <motion.span
          aria-hidden="true"
          animate={{
            scale: [0.75, 1.5, 0.75],
            opacity: [0.08, 0.32, 0.08]
          }}
          transition={{
            duration: 3.4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute inset-0 rounded-full bg-theme-accent-soft"
        />
      ) : null}

      <Icon aria-hidden="true" className="relative z-10 size-4 text-theme-accent" />
    </div>
  );
}

export function HeroStoryHighlights({ items }: HeroStoryHighlightsProps) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div
      className={[
        'grid',
        'max-w-[440px]',
        'grid-cols-2',
        'gap-x-3',
        'gap-y-3',

        'lg:gap-x-4',
        'lg:gap-y-4'
      ].join(' ')}>
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 7
                }
          }
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.12 + index * 0.06,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="flex min-w-0 items-center gap-2.5">
          <HighlightVisual icon={item.icon} visual={item.visual} />

          <span
            className={[
              'text-[10px]',
              'leading-[1.35]',
              'text-muted',

              'sm:text-[11px]',

              'lg:text-[12px]',
              'lg:leading-[1.4]'
            ].join(' ')}>
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
