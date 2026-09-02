'use client';

import {
  AppWindow,
  BriefcaseBusiness,
  Building2,
  Check,
  Code2,
  Database,
  Globe2,
  LayoutDashboard,
  Link2,
  MessageSquareText,
  Rocket,
  ServerCog,
  ShoppingCart,
  Sparkles,
  UsersRound
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState, useSyncExternalStore } from 'react';

const PHASES = [
  {
    label: 'Client request',
    message: 'Can you build a system where clients request services and track projects?',
    status: 'Request received'
  },
  {
    label: 'Rcentz solution',
    message: 'We will connect services, projects, authentication and client operations.',
    status: 'Architecture ready'
  },
  {
    label: 'Development',
    message: 'Building application surfaces, data flows and business logic.',
    status: 'System building'
  },
  {
    label: 'Testing',
    message: 'Validating workflows, responsiveness and production behaviour.',
    status: 'Quality checks'
  },
  {
    label: 'Delivery',
    message: 'Your production-ready Rcentz system is live.',
    status: 'Delivered'
  }
] as const;

const WEBSITE_TYPES = [
  {
    label: 'Business',
    icon: BriefcaseBusiness
  },
  {
    label: 'E-commerce',
    icon: ShoppingCart
  },
  {
    label: 'SaaS',
    icon: AppWindow
  },
  {
    label: 'Marketplace',
    icon: UsersRound
  },
  {
    label: 'Real Estate',
    icon: Building2
  },
  {
    label: 'Custom Systems',
    icon: ServerCog
  }
] as const;

const FEATURES = [
  {
    label: 'Services',
    icon: Sparkles
  },
  {
    label: 'Projects',
    icon: LayoutDashboard
  },
  {
    label: 'Database',
    icon: Database
  },
  {
    label: 'Backend',
    icon: ServerCog
  }
] as const;

const PHASE_DURATION = 2450;

type Phase = (typeof PHASES)[number];

type StoryLayoutProps = {
  current: Phase;
  visiblePhase: number;
  reduceMotion: boolean;
};

function subscribeDesktop(callback: () => void) {
  const query = window.matchMedia('(min-width: 1024px)');

  query.addEventListener('change', callback);

  return () => {
    query.removeEventListener('change', callback);
  };
}

function getDesktopSnapshot() {
  return window.matchMedia('(min-width: 1024px)').matches;
}

function getDesktopServerSnapshot() {
  return false;
}

function DigitalSurface() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <div
        className={[
          'absolute inset-0',
          'bg-[linear-gradient(to_right,var(--theme-accent-faint)_1px,transparent_1px),linear-gradient(to_bottom,var(--theme-accent-faint)_1px,transparent_1px)]',
          'bg-[size:18px_18px]',
          'opacity-60'
        ].join(' ')}
      />

      <span className="absolute left-[18%] top-[21%] size-1 rounded-full bg-theme-accent shadow-[0_0_9px_var(--theme-accent)]" />

      <span className="absolute bottom-[18%] right-[22%] size-1 rounded-full bg-theme-accent/70" />

      <div className="absolute left-[18%] top-[22%] h-px w-[25%] bg-theme-accent/15" />

      <div className="absolute bottom-[19%] right-[22%] h-[18%] w-px bg-theme-accent/15" />
    </div>
  );
}

function ElectricBorder() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit]">
      <motion.span
        animate={{
          left: ['-24%', '105%']
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="absolute top-0 h-px w-[24%] bg-gradient-to-r from-transparent via-theme-accent to-transparent shadow-[0_0_12px_var(--theme-accent)]"
      />

      <motion.span
        animate={{
          top: ['-25%', '105%']
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: 'linear',
          delay: 0.4
        }}
        className="absolute right-0 h-[25%] w-px bg-gradient-to-b from-transparent via-theme-accent to-transparent shadow-[0_0_12px_var(--theme-accent)]"
      />

      <motion.span
        animate={{
          right: ['-24%', '105%']
        }}
        transition={{
          duration: 3.4,
          repeat: Infinity,
          ease: 'linear',
          delay: 0.8
        }}
        className="absolute bottom-0 h-px w-[24%] bg-gradient-to-r from-transparent via-theme-accent to-transparent shadow-[0_0_12px_var(--theme-accent)]"
      />

      <motion.span
        animate={{
          bottom: ['-25%', '105%']
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
          delay: 1.1
        }}
        className="absolute left-0 h-[25%] w-px bg-gradient-to-b from-transparent via-theme-accent to-transparent shadow-[0_0_12px_var(--theme-accent)]"
      />
    </div>
  );
}

/* =========================================================
   MOBILE STORY
   ========================================================= */

function MobileRcentzStory({ current, visiblePhase, reduceMotion }: StoryLayoutProps) {
  return (
    <div className="relative min-h-[720px] overflow-visible sm:min-h-[760px]">
      <div className="rcentz-grid-fade absolute inset-0 opacity-55" />

      <div className="absolute left-1/2 top-1/2 size-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-theme-accent-faint blur-[130px]" />

      {/* CLIENT / CURRENT PHASE */}

      <motion.div
        animate={{
          borderColor: visiblePhase === 0 ? 'var(--theme-accent)' : 'var(--border)'
        }}
        className={[
          'absolute',
          'left-0 right-0 top-[1%]',
          'z-40',
          'min-h-[100px]',
          'overflow-hidden',
          'rounded-2xl',
          'border',
          'bg-background/92',
          'p-3.5',
          'shadow-xl',
          'backdrop-blur-xl'
        ].join(' ')}>
        <DigitalSurface />

        <div className="relative z-30">
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-theme-accent-soft">
              <MessageSquareText className="size-4 text-theme-accent" />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={current.label}
                    initial={{
                      opacity: 0,
                      y: 4
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0,
                      y: -4
                    }}
                    className="text-[12px] font-semibold">
                    {current.label}
                  </motion.p>
                </AnimatePresence>

                <span className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.11em] text-theme-accent">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-theme-accent opacity-30" />

                    <span className="relative inline-flex size-1.5 rounded-full bg-theme-accent" />
                  </span>

                  {current.status}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={current.message}
                  initial={{
                    opacity: 0,
                    y: 6
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  exit={{
                    opacity: 0,
                    y: -5
                  }}
                  className="mt-2 text-[10px] leading-4 text-muted sm:text-[11px]">
                  {current.message}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* WEBSITE SYSTEMS */}

      <motion.div
        animate={{
          opacity: visiblePhase >= 1 ? 1 : 0.55,
          scale: visiblePhase >= 1 ? 1 : 0.985
        }}
        transition={{
          duration: 0.6
        }}
        className={[
          'absolute',
          'left-0 right-0 top-[18%]',
          'z-40',
          'h-[124px]',
          'overflow-hidden',
          'rounded-2xl',
          'border border-border',
          'bg-background/90',
          'p-3',
          'shadow-xl',
          'backdrop-blur-xl'
        ].join(' ')}>
        <DigitalSurface />

        {!reduceMotion ? <ElectricBorder /> : null}

        <div className="relative z-30 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold">Website systems</p>

            <p className="mt-0.5 font-mono text-[6px] uppercase tracking-[0.12em] text-muted">
              Rcentz solutions
            </p>
          </div>

          <Globe2 className="size-3.5 text-theme-accent" />
        </div>

        <div className="relative z-30 mt-2.5 grid grid-cols-3 gap-1.5">
          {WEBSITE_TYPES.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: visiblePhase >= 1 ? [0.55, 1, 0.55] : 0.35
                      }
                }
                transition={{
                  duration: 2.1 + index * 0.22,
                  delay: index * 0.16,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className={[
                  'relative',
                  'flex min-h-[34px]',
                  'items-center gap-1.5',
                  'overflow-hidden',
                  'rounded-lg',
                  'border border-border',
                  'bg-background/68',
                  'px-2'
                ].join(' ')}>
                <Icon className="size-3 shrink-0 text-theme-accent" />

                <span className="truncate text-[7px] font-medium">{item.label}</span>

                <motion.span
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: [0.15, 1, 0.15],
                          scale: [0.8, 1.3, 0.8]
                        }
                  }
                  transition={{
                    duration: 1.8 + index * 0.16,
                    repeat: Infinity,
                    delay: index * 0.25
                  }}
                  className="absolute right-1 top-1 size-1 rounded-full bg-theme-accent shadow-[0_0_6px_var(--theme-accent)]"
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* CONNECTION */}

      <div
        aria-hidden="true"
        className={[
          'absolute',
          'left-1/2 top-[36%]',
          'z-50',
          'h-[42px] w-px',
          '-translate-x-1/2',
          'bg-theme-accent/20'
        ].join(' ')}>
        {!reduceMotion ? (
          <motion.span
            animate={{
              top: ['-5%', '100%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.25,
              repeat: Infinity,
              repeatDelay: 0.4,
              ease: 'easeInOut'
            }}
            className="absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-theme-accent shadow-[0_0_14px_var(--theme-accent)]"
          />
        ) : null}

        <motion.span
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [0.8, 1.15, 0.8],
                  opacity: [0.45, 1, 0.45]
                }
          }
          transition={{
            duration: 2,
            repeat: Infinity
          }}
          className={[
            'absolute',
            '-bottom-2 left-1/2',
            'flex size-5',
            '-translate-x-1/2',
            'items-center justify-center',
            'rounded-full',
            'border',
            'border-theme-accent/30',
            'bg-background'
          ].join(' ')}>
          <Link2 className="size-2.5 text-theme-accent" />
        </motion.span>
      </div>

      {/* MAIN WEBSITE — CENTERED + TALLER */}

      <motion.div
        animate={{
          opacity: visiblePhase >= 1 ? 1 : 0.68,
          scale: visiblePhase >= 2 ? 1 : 0.985
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={[
          'absolute',
          'left-[3%] right-[3%]',
          'top-[41%]',
          'bottom-[1%]',
          'z-30',
          'overflow-hidden',
          'rounded-2xl',
          'border border-border',
          'bg-background/94',
          'shadow-2xl',
          'backdrop-blur-2xl'
        ].join(' ')}>
        <DigitalSurface />

        {!reduceMotion ? <ElectricBorder /> : null}

        <div className="relative z-10 flex h-full flex-col">
          {/* BROWSER */}

          <div className="flex h-10 shrink-0 items-center border-b border-border px-3">
            <div className="flex gap-1">
              <span className="size-1.5 rounded-full bg-border-strong" />
              <span className="size-1.5 rounded-full bg-border-strong" />
              <span className="size-1.5 rounded-full bg-theme-accent" />
            </div>

            <div className="mx-auto rounded-full border border-border bg-background/75 px-5 py-1 font-mono text-[6px] text-muted">
              rcentz.cc
            </div>

            <Globe2 className="size-3 text-theme-accent" />
          </div>

          {/* WEBSITE HERO */}

          <div className="grid min-h-[138px] shrink-0 grid-cols-[1.08fr_0.92fr] border-b border-border">
            <div className="flex flex-col justify-center p-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.label}
                  initial={{
                    opacity: 0,
                    y: 4
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  className="font-mono text-[6px] uppercase tracking-[0.13em] text-theme-accent">
                  {current.label}
                </motion.p>
              </AnimatePresence>

              <p
                className={[
                  'mt-2.5',
                  'bg-gradient-to-r',
                  'from-foreground',
                  'via-theme-accent',
                  'to-theme-accent-strong',
                  'bg-clip-text',
                  'text-[18px]',
                  'font-semibold',
                  'leading-[1.02]',
                  'tracking-[-0.045em]',
                  'text-transparent',
                  'sm:text-[20px]'
                ].join(' ')}>
                From idea to production system.
              </p>

              <div className="mt-4 flex items-center gap-1.5">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-theme-accent opacity-25" />

                  <span className="relative inline-flex size-1.5 rounded-full bg-theme-accent" />
                </span>

                <span className="font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
                  {current.status}
                </span>
              </div>
            </div>

            {/* BUILD TERMINAL */}

            <div className="relative m-2.5 overflow-hidden rounded-xl border border-border bg-background/66 p-3">
              <DigitalSurface />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5">
                    <Code2 className="size-3 text-theme-accent" />

                    <span className="font-mono text-[6px] text-muted">build.ts</span>
                  </div>

                  <span className="size-1.5 rounded-full bg-theme-accent" />
                </div>

                <div className="mt-4 space-y-2 font-mono text-[6px] sm:text-[7px]">
                  <motion.p
                    animate={{
                      opacity: visiblePhase >= 1 ? 1 : 0.2
                    }}>
                    solution.ready()
                  </motion.p>

                  <motion.p
                    animate={{
                      opacity: visiblePhase >= 2 ? 1 : 0.18
                    }}>
                    features.connect()
                  </motion.p>

                  <motion.p
                    animate={{
                      opacity: visiblePhase >= 3 ? 1 : 0.18
                    }}>
                    system.validate()
                  </motion.p>

                  <motion.p
                    animate={{
                      opacity: visiblePhase >= 4 ? 1 : 0.18
                    }}
                    className="text-theme-accent">
                    deploy.live()
                  </motion.p>
                </div>
              </div>
            </div>
          </div>

          {/* FEATURES */}

          <div className="grid shrink-0 grid-cols-4 border-b border-border">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;

              const active = visiblePhase >= Math.min(index + 1, 3);

              return (
                <motion.div
                  key={feature.label}
                  animate={{
                    opacity: active ? 1 : 0.22
                  }}
                  className={[
                    'relative',
                    'flex min-h-[64px]',
                    'flex-col',
                    'justify-center',
                    'border-r',
                    'border-border',
                    'px-2.5',
                    'last:border-r-0'
                  ].join(' ')}>
                  <DigitalSurface />

                  <Icon
                    className={['relative z-10 size-3.5', active ? 'text-theme-accent' : 'text-muted'].join(
                      ' '
                    )}
                  />

                  <p className="relative z-10 mt-2 truncate text-[7px] font-medium sm:text-[8px]">
                    {feature.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* GENERATED WEBSITE */}

          <div className="relative min-h-[150px] flex-1 overflow-hidden p-4">
            <div className="rcentz-grid absolute inset-0 opacity-30" />

            <motion.div
              animate={{
                opacity: visiblePhase >= 2 ? 1 : 0.18,
                y: visiblePhase >= 2 ? 0 : 12
              }}
              transition={{
                duration: 0.6
              }}
              className="relative z-10 grid grid-cols-[0.85fr_1.15fr] gap-4">
              <div>
                <div className="h-2 w-14 rounded-full bg-theme-accent-soft" />

                <div className="mt-3 h-4 w-[90%] rounded bg-foreground/12" />

                <div className="mt-2 h-2 w-[72%] rounded bg-foreground/8" />

                <div className="mt-4 h-6 w-20 rounded-full bg-primary" />

                <div className="mt-4 flex gap-1.5">
                  <span className="h-1.5 w-10 rounded-full bg-foreground/8" />
                  <span className="h-1.5 w-6 rounded-full bg-theme-accent-soft" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {['Services', 'Projects', 'Clients', 'Analytics'].map((item, index) => (
                  <motion.div
                    key={item}
                    animate={{
                      opacity: visiblePhase >= 2 ? 1 : 0.18,
                      scale: visiblePhase >= 2 ? 1 : 0.92
                    }}
                    transition={{
                      delay: index * 0.1
                    }}
                    className="min-h-[48px] rounded-lg border border-border bg-background/72 p-2">
                    <span className="block size-1.5 rounded-full bg-theme-accent" />

                    <p className="mt-2 font-mono text-[6px] text-muted">{item}</p>

                    <div className="mt-2 h-1 w-[65%] rounded-full bg-foreground/8" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {visiblePhase >= 3 ? (
              <motion.div
                initial={{
                  opacity: 0,
                  x: -12
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                className="absolute bottom-3 left-4 z-30 flex items-center gap-1.5 rounded-full border border-theme-accent/20 bg-background/92 px-2.5 py-1.5">
                <Check className="size-2.5 text-theme-accent" />

                <span className="font-mono text-[5px] text-muted sm:text-[6px]">
                  Responsive · Auth · Data
                </span>
              </motion.div>
            ) : null}

            <AnimatePresence>
              {visiblePhase >= 4 ? (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.88,
                    y: 6
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0
                  }}
                  className={[
                    'absolute',
                    'bottom-3 right-4',
                    'z-40',
                    'flex items-center gap-2',
                    'rounded-full',
                    'border border-theme-accent/30',
                    'bg-background/96',
                    'px-3 py-2',
                    'shadow-xl'
                  ].join(' ')}>
                  <span className="flex size-6 items-center justify-center rounded-full bg-theme-accent">
                    <Rocket className="size-3 text-background" />
                  </span>

                  <div>
                    <p className="text-[7px] font-semibold">Rcentz delivery</p>

                    <p className="font-mono text-[5px] text-theme-accent">rcentz.cc · live</p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================
   DESKTOP STORY
   ========================================================= */

function DesktopRcentzStory({ current, visiblePhase, reduceMotion }: StoryLayoutProps) {
  return (
    <div className="relative min-h-[500px] overflow-visible">
      <div className="rcentz-grid-fade absolute inset-0 opacity-60" />

      <div className="absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-theme-accent-faint blur-[140px]" />

      {/* CLIENT */}

      <div
        className={[
          'absolute',
          'left-[1%] top-[5%]',
          'z-40',
          'w-[205px]',
          'overflow-hidden',
          'rounded-2xl',
          'border border-border',
          'bg-background/90',
          'p-4',
          'shadow-xl',
          'backdrop-blur-xl'
        ].join(' ')}>
        <DigitalSurface />

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-theme-accent-soft">
              <MessageSquareText className="size-4 text-theme-accent" />
            </span>

            <div>
              <p className="text-[12px] font-semibold">Client</p>

              <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted">Project request</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={current.message}
              initial={{
                opacity: 0,
                y: 7
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -5
              }}
              className="mt-4 text-[10px] leading-5 text-muted">
              {current.message}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* WEBSITE SYSTEMS */}

      <div
        className={[
          'absolute',
          'left-[1%]',
          'top-[42%]',
          'bottom-[3%]',
          'z-40',
          'w-[215px]',
          'overflow-hidden',
          'rounded-2xl',
          'border border-border',
          'bg-background/90',
          'p-4',
          'shadow-xl',
          'backdrop-blur-xl'
        ].join(' ')}>
        <DigitalSurface />

        {!reduceMotion ? <ElectricBorder /> : null}

        <div className="relative z-30 flex h-full flex-col">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-semibold">Website systems</p>

              <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.13em] text-muted">
                Rcentz solutions
              </p>
            </div>

            <Globe2 className="size-4 text-theme-accent" />
          </div>

          <div className="mt-4 grid flex-1 grid-cols-2 grid-rows-3 gap-2">
            {WEBSITE_TYPES.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: [0.55, 1, 0.55]
                        }
                  }
                  transition={{
                    duration: 2.4 + index * 0.25,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: 'easeInOut'
                  }}
                  className={[
                    'relative',
                    'flex flex-col',
                    'justify-center',
                    'overflow-hidden',
                    'rounded-xl',
                    'border border-border',
                    'bg-background/65',
                    'px-3 py-2.5'
                  ].join(' ')}>
                  <Icon className="size-3.5 text-theme-accent" />

                  <p className="mt-2 text-[8px] font-medium leading-tight">{item.label}</p>

                  <motion.span
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: [0.2, 1, 0.2],
                            scale: [0.8, 1.3, 0.8]
                          }
                    }
                    transition={{
                      duration: 1.8 + index * 0.2,
                      repeat: Infinity,
                      delay: index * 0.35
                    }}
                    className="absolute right-2 top-2 size-1 rounded-full bg-theme-accent shadow-[0_0_7px_var(--theme-accent)]"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONNECTION BUS */}

      <div className="absolute left-[20%] top-[58%] z-50 flex items-center">
        <div className="relative h-px w-[74px] bg-theme-accent/20">
          {!reduceMotion ? (
            <motion.span
              animate={{
                left: [0, '100%']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.6,
                ease: 'easeInOut'
              }}
              className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-theme-accent shadow-[0_0_14px_var(--theme-accent)]"
            />
          ) : null}
        </div>

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  boxShadow: [
                    '0 0 0px var(--theme-accent)',
                    '0 0 18px var(--theme-accent)',
                    '0 0 0px var(--theme-accent)'
                  ]
                }
          }
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="flex size-9 items-center justify-center rounded-xl border border-theme-accent/30 bg-background/95 backdrop-blur-xl">
          <Link2 className="size-4 text-theme-accent" />
        </motion.div>
      </div>

      {/* MAIN WEBSITE */}

      <motion.div
        animate={{
          left: visiblePhase >= 1 ? '27%' : '34%',
          right: '2%',
          top: '3%',
          bottom: '5%'
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={[
          'absolute',
          'z-30',
          'overflow-hidden',
          'rounded-2xl',
          'border border-border',
          'bg-background/92',
          'shadow-2xl',
          'backdrop-blur-2xl'
        ].join(' ')}>
        <DigitalSurface />

        {!reduceMotion ? <ElectricBorder /> : null}

        <div className="relative z-10">
          <div className="flex h-10 items-center border-b border-border px-3">
            <div className="flex gap-1.5">
              <span className="size-2 rounded-full bg-border-strong" />
              <span className="size-2 rounded-full bg-border-strong" />
              <span className="size-2 rounded-full bg-theme-accent" />
            </div>

            <div className="mx-auto rounded-full border border-border bg-background/70 px-5 py-1 font-mono text-[7px] text-muted">
              rcentz.cc
            </div>

            <Globe2 className="size-3 text-theme-accent" />
          </div>

          <div className="grid min-h-[190px] grid-cols-[1fr_0.95fr] border-b border-border">
            <div className="relative flex flex-col justify-center p-5">
              <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-theme-accent">
                {current.label}
              </p>

              <p className="mt-3 max-w-[260px] bg-gradient-to-r from-foreground via-theme-accent to-theme-accent-strong bg-clip-text text-[21px] font-semibold leading-[1.04] tracking-[-0.045em] text-transparent">
                From client idea to production system.
              </p>

              <div className="mt-5 flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-theme-accent opacity-30" />

                  <span className="relative inline-flex size-2 rounded-full bg-theme-accent" />
                </span>

                <AnimatePresence mode="wait">
                  <motion.span
                    key={current.status}
                    initial={{
                      opacity: 0,
                      y: 4
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0,
                      y: -4
                    }}
                    className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                    {current.status}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <div className="relative m-4 overflow-hidden rounded-xl border border-border bg-background/60 p-4">
              <DigitalSurface />

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 className="size-4 text-theme-accent" />

                    <span className="font-mono text-[8px] text-muted">rcentz-system.ts</span>
                  </div>

                  <span className="size-2 rounded-full bg-theme-accent" />
                </div>

                <div className="mt-4 space-y-2 font-mono text-[8px]">
                  <motion.p
                    animate={{
                      opacity: visiblePhase >= 1 ? 1 : 0.25
                    }}>
                    <span className="text-theme-accent">const</span> solution = architecture;
                  </motion.p>

                  <motion.p
                    animate={{
                      opacity: visiblePhase >= 2 ? 1 : 0.2
                    }}>
                    features.connect();
                  </motion.p>

                  <motion.p
                    animate={{
                      opacity: visiblePhase >= 3 ? 1 : 0.2
                    }}>
                    system.validate();
                  </motion.p>

                  <motion.p
                    animate={{
                      opacity: visiblePhase >= 4 ? 1 : 0.2
                    }}
                    className="text-theme-accent">
                    deploy.production();
                  </motion.p>
                </div>
              </div>
            </div>
          </div>

          {/* FEATURES */}

          <div className="grid grid-cols-4 border-b border-border">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;

              const active = visiblePhase >= Math.min(index + 1, 3);

              return (
                <motion.div
                  key={feature.label}
                  animate={{
                    opacity: active ? 1 : 0.22
                  }}
                  className="relative min-h-[78px] border-r border-border p-3 last:border-r-0">
                  <DigitalSurface />

                  <div className="relative z-10">
                    <Icon className={['size-4', active ? 'text-theme-accent' : 'text-muted'].join(' ')} />

                    <p className="mt-3 text-[9px] font-medium">{feature.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* GENERATED WEBSITE */}

          <div className="relative min-h-[125px] overflow-hidden p-4">
            <div className="rcentz-grid absolute inset-0 opacity-35" />

            <motion.div
              initial={{
                opacity: 0,
                y: 18
              }}
              animate={{
                opacity: visiblePhase >= 2 ? 1 : 0,
                y: visiblePhase >= 2 ? 0 : 18
              }}
              className="relative z-10 grid grid-cols-[0.9fr_1.1fr] gap-4">
              <div>
                <div className="h-2 w-16 rounded-full bg-theme-accent-soft" />
                <div className="mt-3 h-4 w-[80%] rounded bg-foreground/12" />
                <div className="mt-2 h-2 w-[65%] rounded bg-foreground/8" />
                <div className="mt-4 h-6 w-20 rounded-full bg-primary" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {['Services', 'Projects', 'Clients', 'Analytics'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{
                      opacity: 0,
                      scale: 0.9
                    }}
                    animate={{
                      opacity: visiblePhase >= 2 ? 1 : 0,
                      scale: visiblePhase >= 2 ? 1 : 0.9
                    }}
                    transition={{
                      delay: index * 0.12
                    }}
                    className="rounded-lg border border-border bg-background/72 p-2">
                    <span className="block size-1.5 rounded-full bg-theme-accent" />

                    <p className="mt-2 font-mono text-[6px] text-muted">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {visiblePhase >= 3 ? (
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                className="absolute bottom-3 left-4 z-20 flex items-center gap-2 rounded-full border border-theme-accent/20 bg-background/88 px-3 py-1.5">
                <Check className="size-3 text-theme-accent" />

                <span className="font-mono text-[7px] text-muted">Responsive · Auth · Data · Build</span>
              </motion.div>
            ) : null}

            <AnimatePresence>
              {visiblePhase >= 4 ? (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 8
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0
                  }}
                  className="absolute bottom-3 right-4 z-30 flex items-center gap-3 rounded-full border border-theme-accent/30 bg-background/95 px-4 py-2.5 shadow-xl">
                  <span className="flex size-7 items-center justify-center rounded-full bg-theme-accent">
                    <Rocket className="size-3.5 text-background" />
                  </span>

                  <div>
                    <p className="text-[9px] font-semibold">Rcentz delivery</p>

                    <p className="font-mono text-[7px] text-theme-accent">rcentz.cc · live</p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function RcentzWebsiteStory() {
  const [phase, setPhase] = useState(0);

  const reduceMotion = Boolean(useReducedMotion());

  const desktop = useSyncExternalStore(subscribeDesktop, getDesktopSnapshot, getDesktopServerSnapshot);

  useEffect(() => {
    if (reduceMotion || phase >= PHASES.length - 1) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setPhase(current => current + 1);
    }, PHASE_DURATION);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [phase, reduceMotion]);

  const visiblePhase = reduceMotion ? PHASES.length - 1 : phase;

  const current = PHASES[visiblePhase];

  if (desktop) {
    return <DesktopRcentzStory current={current} visiblePhase={visiblePhase} reduceMotion={reduceMotion} />;
  }

  return <MobileRcentzStory current={current} visiblePhase={visiblePhase} reduceMotion={reduceMotion} />;
}
