'use client';

import type { CSSProperties } from 'react';

import { motion, useReducedMotion } from 'motion/react';

import { RcentzAce } from '@/ui-shell/layers/RcentzAce';

const NODES = [
  {
    top: '18%',
    left: '12%',
    delay: 0
  },
  {
    top: '28%',
    left: '76%',
    delay: 0.8
  },
  {
    top: '68%',
    left: '18%',
    delay: 1.4
  },
  {
    top: '78%',
    left: '72%',
    delay: 2
  },
  {
    top: '48%',
    left: '91%',
    delay: 2.6
  }
];

const aceAccentStyle = {
  '--ace-ink': 'rgb(32 178 166 / 0.96)',

  '--ace-ink-strong': 'rgb(32 178 166 / 0.68)',

  '--ace-ink-medium': 'rgb(32 178 166 / 0.3)',

  '--ace-ink-soft': 'rgb(32 178 166 / 0.09)',

  '--ace-ink-faint': 'rgb(32 178 166 / 0.025)'
} as CSSProperties;

export function HomeHeroEnvironment() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible">
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-background" />

      {/* RCENTZ MATRIX */}

      <div className="rcentz-grid-fade absolute inset-0 opacity-80" />

      {/* VERY QUIET ACCENT LIGHT */}

      <div
        className={[
          'absolute',
          'left-1/2 top-[42%]',
          'h-[440px]',
          'w-[820px]',
          '-translate-x-1/2',
          '-translate-y-1/2',
          'rounded-full',
          'bg-theme-accent-faint',
          'blur-[150px]'
        ].join(' ')}
      />

      {/* ACTIVE SIGNAL NODES */}

      {NODES.map((node, index) => (
        <motion.span
          key={index}
          style={{
            top: node.top,
            left: node.left
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.1, 0.55, 0.1],
                  scale: [0.75, 1.25, 0.75]
                }
          }
          transition={{
            duration: 5,
            delay: node.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute size-1 rounded-full bg-theme-accent"
        />
      ))}

      {/* LOWER RCENTZ ACE */}

      <div
        style={aceAccentStyle}
        className={[
          'absolute',
          'left-1/2',
          'top-[84%]',
          'h-[520px]',
          'w-full',
          'max-w-[1440px]',
          '-translate-x-1/2',
          '-translate-y-1/2',
          'overflow-hidden',
          'opacity-55'
        ].join(' ')}>
        <RcentzAce />
      </div>

      {/* EDGE FADE */}

      <div
        className={[
          'absolute inset-0',
          'bg-[radial-gradient(circle_at_center,transparent_42%,var(--background)_97%)]'
        ].join(' ')}
      />
    </div>
  );
}
