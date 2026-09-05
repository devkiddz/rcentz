'use client';

import Image from 'next/image';

import { BarChart3, CheckCircle2, Compass, ShieldCheck, Sparkles, Workflow } from 'lucide-react';

import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';

const HIGHLIGHTS = [
  {
    id: 'strategicPlanning',
    icon: Compass
  },
  {
    id: 'collaborativeDelivery',
    icon: Workflow
  },
  {
    id: 'performanceScale',
    icon: BarChart3
  },
  {
    id: 'secureReliable',
    icon: ShieldCheck
  }
] as const;

const STEPS = [
  {
    number: '01',
    id: 'discover'
  },
  {
    number: '02',
    id: 'design'
  },
  {
    number: '03',
    id: 'build'
  }
] as const;

export function ServicesInspirationSection() {
  const t = useTranslations('ServicesInspiration');

  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="rcentz-section">
        {/* =========================================
            SERVICE VALUE CARDS
            ========================================= */}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.id}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 14
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true,
                  amount: 0.35
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06
                }}
                className="group relative overflow-hidden rounded-[22px] border border-border bg-surface-muted/30 p-5">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-theme-accent-soft opacity-60 blur-2xl"
                />

                <div className="relative">
                  <div className="flex size-10 items-center justify-center rounded-[12px] border border-theme-accent/15 bg-theme-accent-soft">
                    <Icon className="size-4 text-theme-accent" />
                  </div>

                  <h3 className="mt-4 text-[14px] font-semibold tracking-[-0.02em] text-foreground">
                    {t(`highlights.${item.id}.title`)}
                  </h3>

                  <p className="mt-2 max-w-[220px] text-[10px] leading-5 text-muted sm:text-[11px]">
                    {t(`highlights.${item.id}.description`)}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* =========================================
            HOW IT WORKS
            ========================================= */}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          {/* =========================================
              CARTOON ARTWORK
              ========================================= */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -18,
                    scale: 0.985
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1
            }}
            viewport={{
              once: true,
              amount: 0.25
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[16%] top-[28%] size-72 rounded-full bg-theme-accent/[0.07] blur-3xl"
            />

            <div className="relative min-h-[390px] overflow-hidden rounded-[28px] border border-border bg-surface-muted/25 shadow-[0_24px_70px_rgba(0,0,0,0.08)] sm:min-h-[445px]">
              <div className="absolute inset-0 size-full">
                <Image
                  src="/images/services/how-it-works/services-process-staff-artwork.webp"
                  alt={t('artworkAlt')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center"
                />
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/15 to-transparent"
              />

              {/* LIVE STATUS CHIP */}

              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -5, 0]
                      }
                }
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute right-[4%] top-[5%] z-20 rounded-full border border-border bg-background/90 px-3 py-2 shadow-lg backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-theme-accent opacity-30" />
                    <span className="relative inline-flex size-2 rounded-full bg-theme-accent" />
                  </span>

                  <span className="text-[7px] font-medium text-foreground">{t('projectActive')}</span>
                </div>
              </motion.div>

              {/* DELIVERY CHIP */}

              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, 5, 0]
                      }
                }
                transition={{
                  duration: 5.4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute bottom-[5%] left-[4%] z-20 rounded-[13px] border border-border bg-background/92 p-2.5 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-[8px] bg-theme-accent-soft">
                    <CheckCircle2 className="size-3.5 text-theme-accent" />
                  </div>

                  <div>
                    <p className="text-[6.5px] font-semibold text-foreground">{t('structuredDelivery')}</p>

                    <p className="mt-0.5 text-[5px] text-muted">{t('deliveryFlow')}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* =========================================
              PROCESS COPY
              ========================================= */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 18
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true,
              amount: 0.3
            }}
            transition={{
              duration: 0.55
            }}
            className="flex flex-col justify-center lg:pl-5">
            <div>
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-theme-accent">
                {t('eyebrow')}
              </span>

              <h2 className="mt-4 max-w-[480px] text-[2rem] font-semibold leading-[1] tracking-[-0.05em] text-foreground sm:text-[2.8rem]">
                {t('title')}
              </h2>

              <p className="mt-4 max-w-[460px] text-[12px] leading-6 text-muted sm:text-[13px]">
                {t('description')}
              </p>
            </div>

            {/* PROCESS STEPS */}

            <div className="mt-7 space-y-1">
              {STEPS.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: 10
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    x: 0
                  }}
                  viewport={{
                    once: true
                  }}
                  transition={{
                    duration: 0.4,
                    delay: 0.15 + index * 0.08
                  }}
                  className="group grid grid-cols-[42px_1fr] gap-3 rounded-[16px] p-3 transition-colors hover:bg-surface-muted/30">
                  <div className="relative flex justify-center">
                    <span className="relative z-10 flex size-8 items-center justify-center rounded-full border border-theme-accent/20 bg-theme-accent-soft font-mono text-[8px] font-semibold text-theme-accent">
                      {step.number}
                    </span>

                    {index < STEPS.length - 1 ? (
                      <span className="absolute left-1/2 top-8 h-[calc(100%+16px)] w-px -translate-x-1/2 bg-border" />
                    ) : null}
                  </div>

                  <div className="pb-2">
                    <h3 className="text-[13px] font-semibold text-foreground">
                      {t(`steps.${step.id}.title`)}
                    </h3>

                    <p className="mt-1 max-w-[360px] text-[10px] leading-5 text-muted sm:text-[11px]">
                      {t(`steps.${step.id}.description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 text-[9px] text-muted">
              <Sparkles className="size-3 text-theme-accent" />

              <span>{t('closingLine')}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
