'use client';

import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';

type HeroBlock = {
  label: string;
  meta: string;
  value: string;
};

type HeroBlockStoryProps = {
  eyebrow: string;
  title: string;
  description: string;
  workspaceLabel: string;
  status: string;
  blocks: HeroBlock[];
};

const BLOCK_ORIGINS = [
  {
    x: -38,
    y: -26
  },
  {
    x: 0,
    y: -42
  },
  {
    x: 38,
    y: -24
  },
  {
    x: -42,
    y: 28
  },
  {
    x: 0,
    y: 42
  },
  {
    x: 40,
    y: 26
  }
];

export function HeroBlockStory({
  eyebrow,
  title,
  description,
  workspaceLabel,
  status,
  blocks
}: HeroBlockStoryProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid min-h-[560px] items-stretch gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-8">
      {/* STORY COPY */}
      <div
        className={[
          'relative z-10',
          'flex min-h-[430px]',
          'max-w-[470px] flex-col',
          'justify-center',
          'lg:min-h-[500px]'
        ].join(' ')}>
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-theme-accent" />

          <p className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-muted">{eyebrow}</p>
        </div>

        <motion.h2
          initial={
            reduceMotion
              ? false
              : {
                  y: 22,
                  opacity: 0
                }
          }
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1]
          }}
          className={[
            'mt-5',
            'text-balance',
            'text-[2.4rem]',
            'font-semibold',
            'leading-[0.99]',
            'tracking-[-0.055em]',
            'sm:text-[2.85rem]',
            'lg:text-[3.05rem]'
          ].join(' ')}>
          {title}
        </motion.h2>

        <motion.p
          initial={
            reduceMotion
              ? false
              : {
                  y: 16,
                  opacity: 0
                }
          }
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            delay: 0.08,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="mt-6 max-w-[415px] text-[14px] leading-6 text-muted sm:text-[15px] sm:leading-7">
          {description}
        </motion.p>

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  y: 12,
                  opacity: 0
                }
          }
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            delay: 0.16,
            duration: 0.55
          }}
          className="mt-8">
          <Link
            href="#services"
            className={[
              'inline-flex h-10',
              'items-center justify-center gap-2',
              'rounded-full',
              'bg-primary px-5',
              'text-[12px] font-medium',
              'text-primary-foreground',
              'transition-[opacity,transform]',
              'hover:opacity-90',
              'active:scale-[0.98]'
            ].join(' ')}>
            Explore systems
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </motion.div>

        <div className="mt-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1.5 backdrop-blur-xl">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-theme-accent opacity-35" />

              <span className="relative inline-flex size-1.5 rounded-full bg-theme-accent" />
            </span>

            <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-muted">{status}</span>
          </div>
        </div>
      </div>

      {/* MOTION WORKSPACE */}
      <div className="relative min-h-[470px] lg:min-h-[500px]">
        <div
          aria-hidden="true"
          className={[
            'absolute',
            'inset-[12%_2%_8%_8%]',
            'rounded-full',
            'bg-theme-accent-faint',
            'blur-3xl'
          ].join(' ')}
        />

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  y: 24,
                  scale: 0.975,
                  opacity: 0
                }
          }
          animate={{
            y: 0,
            scale: 1,
            opacity: 1
          }}
          transition={{
            duration: 0.72,
            ease: [0.22, 1, 0.36, 1]
          }}
          className={[
            'absolute',
            'inset-x-0 top-[5%]',
            'overflow-hidden',
            'rounded-2xl',
            'border border-border',
            'bg-background/82',
            'shadow-2xl',
            'backdrop-blur-2xl'
          ].join(' ')}>
          {/* HEADER */}
          <div className="flex h-11 items-center justify-between border-b border-border px-4">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-theme-accent opacity-25" />

                <span className="relative inline-flex size-2 rounded-full bg-theme-accent" />
              </span>

              <span className="font-mono text-[9px] text-muted">{workspaceLabel}</span>
            </div>

            <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">live</span>
          </div>

          {/* BUILDING STAGE */}
          <div className="relative">
            {/* CONNECTOR NETWORK */}
            <svg
              aria-hidden="true"
              viewBox="0 0 600 260"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 z-10 h-full w-full">
              {[
                'M100 65 H300',
                'M300 65 H500',
                'M100 65 V195',
                'M300 65 V195',
                'M500 65 V195',
                'M100 195 H300',
                'M300 195 H500'
              ].map((path, index) => (
                <motion.path
                  key={path}
                  d={path}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={
                    reduceMotion
                      ? false
                      : {
                          pathLength: 0,
                          opacity: 0
                        }
                  }
                  animate={{
                    pathLength: 1,
                    opacity: 0.28
                  }}
                  transition={{
                    delay: 0.65 + index * 0.07,
                    duration: 0.65,
                    ease: 'easeOut'
                  }}
                  className="text-theme-accent"
                />
              ))}
            </svg>

            {/* BLOCK GRID */}
            <div className="relative z-20 grid grid-cols-2 gap-px bg-border p-px sm:grid-cols-3">
              {blocks.map((block, index) => {
                const origin = BLOCK_ORIGINS[index % BLOCK_ORIGINS.length];

                return (
                  <motion.div
                    key={block.label}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            x: origin.x,
                            y: origin.y,
                            scale: 0.88,
                            opacity: 0
                          }
                    }
                    animate={
                      reduceMotion
                        ? {
                            x: 0,
                            y: 0,
                            scale: 1,
                            opacity: 1
                          }
                        : {
                            x: 0,
                            y: [0, index % 2 === 0 ? -3 : 3, 0],
                            scale: 1,
                            opacity: 1
                          }
                    }
                    transition={{
                      x: {
                        delay: 0.12 + index * 0.08,
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1]
                      },
                      y: {
                        delay: 0.12 + index * 0.08,
                        duration: 4.8 + index * 0.3,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      },
                      scale: {
                        delay: 0.12 + index * 0.08,
                        duration: 0.6
                      },
                      opacity: {
                        delay: 0.12 + index * 0.08,
                        duration: 0.5
                      }
                    }}
                    className={[
                      'group',
                      'relative',
                      'min-h-[128px]',
                      'bg-background',
                      'p-4',
                      'transition-colors',
                      'hover:bg-surface-raised'
                    ].join(' ')}>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-muted">
                        {block.meta}
                      </span>

                      <motion.span
                        animate={
                          reduceMotion
                            ? undefined
                            : {
                                opacity: [0.35, 1, 0.35]
                              }
                        }
                        transition={{
                          duration: 2.2 + index * 0.25,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        className="size-1.5 rounded-full bg-theme-accent"
                      />
                    </div>

                    <p className="mt-8 text-[12px] font-medium tracking-[-0.015em]">{block.label}</p>

                    <p className="mt-1 font-mono text-[9px] text-muted">{block.value}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CORE */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    y: 14,
                    opacity: 0
                  }
            }
            animate={{
              y: 0,
              opacity: 1
            }}
            transition={{
              delay: 0.78,
              duration: 0.55
            }}
            className="flex items-center justify-between border-t border-border px-5 py-4">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted">Foundation</p>

              <p className="mt-1 text-[11px] font-medium">Rcentz Core</p>
            </div>

            <div className="flex items-center gap-2">
              <motion.span
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.08, 1]
                      }
                }
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="flex size-5 items-center justify-center rounded-full bg-theme-accent-soft">
                <Check aria-hidden="true" className="size-3 text-theme-accent" />
              </motion.span>

              <span className="font-mono text-[8px] text-muted">Connected</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
