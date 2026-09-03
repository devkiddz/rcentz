'use client';

import Image from 'next/image';

import { Check, Code2, FileText, Globe2, ImageIcon, Layers3, Route, Search, Zap } from 'lucide-react';

import { motion, useReducedMotion } from 'motion/react';

import { useEffect, useState } from 'react';

const FLOW = [
  {
    label: 'Content preserved',
    icon: FileText
  },
  {
    label: 'Media mapped',
    icon: ImageIcon
  },
  {
    label: 'Routes rebuilt',
    icon: Route
  },
  {
    label: 'SEO retained',
    icon: Search
  }
] as const;

const TYPE_SPEED = 58;
const INITIAL_DELAY = 1700;
const STEP_PAUSE = 700;

export function WordpressMigrationScene() {
  const reduceMotion = Boolean(useReducedMotion());

  const [started, setStarted] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  const [typedLength, setTypedLength] = useState(0);

  /* =====================================================
     INITIAL DELAY

     Important:
     Reduced motion is handled during render.
     We do NOT synchronously set state inside the effect.
     ===================================================== */

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setStarted(true);
    }, INITIAL_DELAY);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [reduceMotion]);

  /* =====================================================
     TYPE ONE MIGRATION STEP AT A TIME
     ===================================================== */

  useEffect(() => {
    if (reduceMotion || !started || activeStep >= FLOW.length) {
      return;
    }

    const currentLabel = FLOW[activeStep].label;

    if (typedLength < currentLabel.length) {
      const timeout = window.setTimeout(() => {
        setTypedLength(current => current + 1);
      }, TYPE_SPEED);

      return () => {
        window.clearTimeout(timeout);
      };
    }

    const timeout = window.setTimeout(() => {
      setActiveStep(current => current + 1);

      setTypedLength(0);
    }, STEP_PAUSE);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeStep, reduceMotion, started, typedLength]);

  return (
    <div
      className={['grid min-h-[330px]', 'gap-3 pb-4', 'lg:grid-cols-[0.86fr_0.38fr_1.1fr]', 'lg:px-4'].join(
        ' '
      )}>
      {/* =====================================================
          WORDPRESS
          ===================================================== */}

      <div className="relative overflow-hidden rounded-[20px] border border-border bg-background/88 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted">Legacy stack</p>

            <p className="mt-1.5 text-[15px] font-semibold">WordPress</p>
          </div>

          <Globe2 className="size-[18px] text-muted" />
        </div>

        <div className="mt-3 grid min-h-[225px] grid-cols-[0.36fr_1fr] overflow-hidden rounded-2xl border border-border bg-surface-muted/25">
          {/* WORDPRESS SIDEBAR */}

          <div className="border-r border-border p-2.5">
            <div className="mb-3 flex size-8 items-center justify-center rounded-lg border border-border bg-background/80">
              <span className="font-mono text-[9px] font-semibold">W</span>
            </div>

            {['Pages', 'Posts', 'Media', 'Plugins', 'Themes'].map((item, index) => (
              <motion.div
                key={item}
                className="mb-1.5 rounded-lg border border-border bg-background/70 px-2 py-1.5 font-mono text-[7px] text-muted"
                animate={
                  reduceMotion || index !== 3
                    ? undefined
                    : {
                        borderColor: ['var(--border)', 'var(--theme-accent)', 'var(--border)']
                      }
                }
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}>
                {item}
              </motion.div>
            ))}
          </div>

          {/* WORDPRESS CONTENT */}

          <div className="p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[9px] font-medium">Company website</p>

              <span className="rounded-full border border-border px-2 py-1 font-mono text-[6px] text-muted">
                17 plugins
              </span>
            </div>

            <div className="mt-3 rounded-xl border border-border bg-background/75 p-3">
              <p className="text-[9px] font-medium">Homepage content</p>

              <p className="mt-2 text-[7px] leading-4 text-muted">
                Services, portfolio, company information and contact forms.
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {['SEO', 'Forms', 'Cache'].map(item => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-surface-muted/30 px-2 py-1 font-mono text-[5px] uppercase tracking-[0.08em] text-muted">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                ['146', 'Pages'],
                ['382', 'Media'],
                ['61', 'URLs']
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-border bg-background/70 p-2">
                  <p className="text-[13px] font-semibold">{value}</p>

                  <p className="mt-1 font-mono text-[6px] uppercase tracking-[0.1em] text-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MIGRATION ENGINE
          ===================================================== */}

      <div className="relative flex min-h-[175px] items-center justify-center overflow-hidden rounded-[20px] border border-border bg-surface-muted/22 p-3">
        {/* CONNECTION RAIL */}

        <div className="absolute inset-y-5 left-1/2 w-px -translate-x-1/2 bg-border" />

        <div className="relative z-10 w-full space-y-2">
          {FLOW.map((item, index) => {
            const Icon = item.icon;

            /*
             * Reduced motion simply renders every
             * migration step as complete.
             *
             * No state mutation required.
             */
            const completed =
              reduceMotion ||
              index < activeStep ||
              (index === activeStep && typedLength >= item.label.length);

            const current = !reduceMotion && started && index === activeStep;

            const visibleText =
              reduceMotion || index < activeStep
                ? item.label
                : current
                  ? item.label.slice(0, typedLength)
                  : '';

            return (
              <motion.div
                key={item.label}
                animate={{
                  opacity: completed || current ? 1 : 0.3,

                  scale: current ? 1.015 : 1
                }}
                transition={{
                  duration: 0.3
                }}
                className={[
                  'mx-auto flex',
                  'min-h-9',
                  'w-[136px]',
                  'items-center gap-2',
                  'rounded-full',
                  'border',
                  'bg-background',
                  'px-2.5',
                  'shadow-lg',

                  current ? 'border-theme-accent/35' : 'border-border'
                ].join(' ')}>
                <Icon className="size-3 shrink-0 text-muted" />

                <span className="min-w-0 flex-1 font-mono text-[6px] uppercase tracking-[0.07em] text-muted">
                  {visibleText}

                  {current && typedLength < item.label.length ? (
                    <motion.span
                      aria-hidden="true"
                      animate={{
                        opacity: [1, 0, 1]
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity
                      }}
                      className="ml-0.5 inline-block h-[0.85em] w-px translate-y-[1px] bg-theme-accent"
                    />
                  ) : null}
                </span>

                {completed ? (
                  <motion.span
                    initial={
                      reduceMotion
                        ? false
                        : {
                            scale: 0.5,
                            opacity: 0
                          }
                    }
                    animate={{
                      scale: 1,
                      opacity: 1
                    }}>
                    <Check className="size-3 text-theme-accent" />
                  </motion.span>
                ) : null}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          NEXT.JS
          ===================================================== */}

      <div className="relative overflow-hidden rounded-[20px] border border-border-strong bg-background/94 p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-theme-accent">Modern stack</p>

            <p className="mt-1.5 text-[15px] font-semibold">Next.js application</p>
          </div>

          <Zap className="size-[18px] text-theme-accent" />
        </div>

        <div className="mt-3 grid min-h-[225px] grid-cols-[1fr_0.42fr] gap-2">
          {/* APPLICATION WINDOW */}

          <div className="overflow-hidden rounded-2xl border border-border bg-surface-muted/25">
            <div className="flex h-8 items-center gap-1.5 border-b border-border px-3">
              <span className="size-1.5 rounded-full bg-border-strong" />

              <span className="size-1.5 rounded-full bg-border-strong" />

              <span className="size-1.5 rounded-full bg-border-strong" />

              <div className="ml-2 h-4 flex-1 rounded-full border border-border bg-background/70" />
            </div>

            <div className="grid min-h-[193px] grid-cols-[0.28fr_1fr]">
              {/* APP NAV */}

              <div className="border-r border-border p-2">
                {['Home', 'Work', 'Services', 'Blog'].map(item => (
                  <div
                    key={item}
                    className="mb-1.5 rounded-lg border border-border bg-background/70 px-2 py-1.5 text-[7px] text-muted">
                    {item}
                  </div>
                ))}
              </div>

              {/* APP CONTENT */}

              <div className="p-3">
                <motion.div
                  className="relative h-[92px] overflow-hidden rounded-xl border border-border"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          y: [0, -2, 0]
                        }
                  }
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}>
                  <Image
                    src="/portfolio/screenshots/rcentz-systems/01-home-desktop.webp"
                    alt="Modern Next.js website preview"
                    fill
                    sizes="360px"
                    className="object-cover object-top"
                  />
                </motion.div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-border bg-background/75 p-2">
                    <p className="font-mono text-[6px] uppercase tracking-[0.1em] text-theme-accent">
                      Services
                    </p>

                    <p className="mt-1 text-[7px] text-muted">Database driven</p>
                  </div>

                  <div className="rounded-xl border border-border bg-background/75 p-2">
                    <p className="font-mono text-[6px] uppercase tracking-[0.1em] text-theme-accent">
                      Portfolio
                    </p>

                    <p className="mt-1 text-[7px] text-muted">Live projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* APPLICATION FEATURES */}

          <div className="space-y-2">
            {[
              {
                label: 'App Router',
                detail: 'Server + client',
                icon: Code2
              },
              {
                label: 'Components',
                detail: 'Reusable UI',
                icon: Layers3
              },
              {
                label: 'Performance',
                detail: 'Optimized',
                icon: Zap
              }
            ].map(item => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="rounded-xl border border-border bg-surface-muted/30 p-2.5">
                  <Icon className="size-3.5 text-theme-accent" />

                  <p className="mt-2 font-mono text-[7px] uppercase tracking-[0.09em] text-muted">
                    {item.label}
                  </p>

                  <p className="mt-1 text-[6px] text-muted">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
