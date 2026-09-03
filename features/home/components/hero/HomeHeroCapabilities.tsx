'use client';

import { Boxes, Check, Gauge, GitBranch, LockKeyhole, ServerCog, ShieldCheck, Wrench } from 'lucide-react';

import { motion, useReducedMotion } from 'motion/react';

const capabilities = [
  {
    id: 'performance',
    label: 'Performance',
    headline: 'Fast by design.',
    description:
      'Interfaces, data loading and application behaviour are structured to keep the experience responsive as the product grows.',
    status: 'Optimized',
    icon: Gauge,
    points: ['Efficient rendering', 'Responsive interfaces', 'Lean application flows'],
    visual: 'performance' as const
  },

  {
    id: 'security',
    label: 'Security',
    headline: 'Protection starts in the architecture.',
    description:
      'Authentication, server validation and controlled data access are treated as system responsibilities — not afterthoughts.',
    status: 'Protected',
    icon: ShieldCheck,
    points: ['Controlled access', 'Server-side validation', 'Protected workflows'],
    visual: 'security' as const
  },

  {
    id: 'scalable',
    label: 'Scalable',
    headline: 'Ready for what comes next.',
    description:
      'Modular foundations allow services, features and product areas to grow without forcing the entire system to be rebuilt.',
    status: 'Expandable',
    icon: Boxes,
    points: ['Modular architecture', 'Reusable engines', 'Connected product layers'],
    visual: 'scale' as const
  },

  {
    id: 'maintainable',
    label: 'Maintainable',
    headline: 'Built to keep evolving.',
    description:
      'Clear responsibilities, typed contracts and reusable components keep future changes understandable and controlled.',
    status: 'Structured',
    icon: Wrench,
    points: ['Feature separation', 'Reusable components', 'Predictable structure'],
    visual: 'maintainable' as const
  }
] as const;

function PerformanceSignal({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="flex h-10 items-end gap-1">
      {[11, 18, 27, 21, 34].map((height, index) => (
        <motion.span
          key={index}
          animate={
            reduceMotion
              ? undefined
              : {
                  height: [height * 0.65, height, height * 0.72]
                }
          }
          transition={{
            duration: 2.2 + index * 0.18,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            height
          }}
          className="w-[4px] rounded-full bg-theme-accent"
        />
      ))}
    </div>
  );
}

function SecuritySignal({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="relative flex size-11 items-center justify-center">
      {!reduceMotion ? (
        <>
          <motion.span
            animate={{
              scale: [0.7, 1.45, 0.7],
              opacity: [0.08, 0.32, 0.08]
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 rounded-full border border-theme-accent/35"
          />

          <motion.span
            animate={{
              scale: [0.9, 1.2, 0.9],
              opacity: [0.15, 0.5, 0.15]
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-[18%] rounded-full bg-theme-accent-soft"
          />
        </>
      ) : null}

      <LockKeyhole className="relative z-10 size-4 text-theme-accent" />
    </div>
  );
}

function ScaleSignal({ reduceMotion }: { reduceMotion: boolean }) {
  const nodes = ['left-0 top-1/2', 'left-1/2 top-0', 'right-0 top-1/2', 'left-1/2 bottom-0'];

  return (
    <div className="relative size-11">
      <span className="absolute left-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-theme-accent" />

      <span className="absolute left-1/2 top-[5px] h-[32px] w-px -translate-x-1/2 bg-theme-accent/22" />

      <span className="absolute left-[5px] top-1/2 h-px w-[32px] -translate-y-1/2 bg-theme-accent/22" />

      {nodes.map((position, index) => (
        <motion.span
          key={position}
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [0.75, 1.25, 0.75],
                  opacity: [0.35, 1, 0.35]
                }
          }
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.25
          }}
          className={[
            'absolute size-2',
            '-translate-x-1/2',
            '-translate-y-1/2',
            'rounded-full',
            'border',
            'border-theme-accent/40',
            'bg-background',
            position
          ].join(' ')}
        />
      ))}
    </div>
  );
}

function MaintainabilitySignal({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <GitBranch className="size-4 text-theme-accent" />

      <div className="space-y-1">
        {[24, 18, 28].map((width, index) => (
          <motion.span
            key={index}
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [0.3, 1, 0.3]
                  }
            }
            transition={{
              duration: 2.2 + index * 0.3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              width
            }}
            className="block h-[3px] rounded-full bg-theme-accent"
          />
        ))}
      </div>
    </div>
  );
}

function CapabilitySignal({
  visual,
  reduceMotion
}: {
  visual: 'performance' | 'security' | 'scale' | 'maintainable';

  reduceMotion: boolean;
}) {
  if (visual === 'performance') {
    return <PerformanceSignal reduceMotion={reduceMotion} />;
  }

  if (visual === 'security') {
    return <SecuritySignal reduceMotion={reduceMotion} />;
  }

  if (visual === 'scale') {
    return <ScaleSignal reduceMotion={reduceMotion} />;
  }

  return <MaintainabilitySignal reduceMotion={reduceMotion} />;
}

export function HomeHeroCapabilities() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div
      className={[
        'relative overflow-hidden',
        'rounded-[24px]',
        'border border-border',
        'bg-background/88',
        'shadow-2xl',
        'backdrop-blur-xl'
      ].join(' ')}>
      {/* AMBIENT GRID */}

      <div aria-hidden="true" className="rcentz-grid-fade pointer-events-none absolute inset-0 opacity-20" />

      {/* TOP SYSTEM LABEL */}

      <div
        className={[
          'relative z-10',
          'flex items-center',
          'justify-between',
          'border-b border-border',
          'px-4 py-3',
          'sm:px-5'
        ].join(' ')}>
        <div className="flex items-center gap-2">
          <ServerCog className="size-3.5 text-theme-accent" />

          <span
            className={[
              'font-mono',
              'text-[7px]',
              'uppercase',
              'tracking-[0.15em]',
              'text-muted',
              'sm:text-[8px]'
            ].join(' ')}>
            Rcentz engineering principles
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-theme-accent opacity-25" />

            <span className="relative inline-flex size-1.5 rounded-full bg-theme-accent" />
          </span>

          <span className="font-mono text-[6px] uppercase tracking-[0.1em] text-theme-accent sm:text-[7px]">
            Active
          </span>
        </div>
      </div>

      {/* FOUR PRINCIPLES */}

      <div className="relative z-10 grid md:grid-cols-2 xl:grid-cols-4">
        {capabilities.map((capability, index) => {
          const Icon = capability.icon;

          return (
            <motion.article
              key={capability.id}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 10
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true,
                amount: 0.25
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={[
                'group relative',
                'min-h-[265px]',
                'p-4',
                'transition-colors',
                'hover:bg-surface-raised/55',

                index % 2 !== 0 ? 'md:border-l md:border-border' : '',

                index >= 2 ? 'border-t border-border xl:border-t-0' : '',

                index !== 0 ? 'xl:border-l xl:border-border' : ''
              ].join(' ')}>
              {/* TOP */}

              <div className="flex items-start justify-between gap-4">
                <span
                  className={[
                    'flex size-10',
                    'items-center justify-center',
                    'rounded-xl',
                    'border border-border',
                    'bg-surface-muted',
                    'transition-[background-color,border-color]',
                    'group-hover:border-theme-accent/30',
                    'group-hover:bg-theme-accent-soft'
                  ].join(' ')}>
                  <Icon
                    aria-hidden="true"
                    className={[
                      'size-4',
                      'text-muted',
                      'transition-colors',
                      'group-hover:text-theme-accent'
                    ].join(' ')}
                  />
                </span>

                <CapabilitySignal visual={capability.visual} reduceMotion={reduceMotion} />
              </div>

              {/* COPY */}

              <div className="mt-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-theme-accent">
                    {capability.label}
                  </p>

                  <span className="flex items-center gap-1.5 font-mono text-[6px] uppercase tracking-[0.08em] text-muted">
                    <span className="size-1 rounded-full bg-theme-accent" />

                    {capability.status}
                  </span>
                </div>

                <h3
                  className={[
                    'mt-2',
                    'text-[15px]',
                    'font-semibold',
                    'leading-[1.15]',
                    'tracking-[-0.025em]'
                  ].join(' ')}>
                  {capability.headline}
                </h3>

                <p className="mt-2.5 text-[9px] leading-[1.7] text-muted sm:text-[10px]">
                  {capability.description}
                </p>
              </div>

              {/* SYSTEM DETAILS */}

              <div className="mt-4 space-y-2 border-t border-border pt-3">
                {capability.points.map(point => (
                  <div key={point} className="flex items-center gap-2">
                    <span
                      className={[
                        'flex size-4',
                        'shrink-0',
                        'items-center justify-center',
                        'rounded-full',
                        'bg-theme-accent-soft'
                      ].join(' ')}>
                      <Check className="size-2.5 text-theme-accent" />
                    </span>

                    <span className="text-[8px] text-muted sm:text-[9px]">{point}</span>
                  </div>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
