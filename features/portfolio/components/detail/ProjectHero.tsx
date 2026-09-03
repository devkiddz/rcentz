'use client';

import Link from 'next/link';

import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink, Radio } from 'lucide-react';

import { motion, useReducedMotion } from 'motion/react';
import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

import { CompanyMark } from '@/ui-shell/brand/CompanyMark';

import { ProjectSignalNetwork } from './ProjectSignalNetwork';

import { getSafePortfolioUrl, humanizePortfolioValue } from './portfolio-detail-utils';

type ProjectHeroProps = {
  project: PublicPortfolioProject;
};

export function ProjectHero({ project }: ProjectHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const liveUrl = getSafePortfolioUrl(project.liveUrl);

  const repositoryUrl = getSafePortfolioUrl(project.repositoryUrl);

  return (
    <>
      <Link
        href="/portfolio"
        className={[
          'group',

          'inline-flex',

          'items-center',
          'gap-2',

          'text-[12px]',
          'font-medium',

          'text-muted',

          'transition-colors',

          'hover:text-foreground'
        ].join(' ')}>
        <ArrowLeft
          aria-hidden="true"
          className={['size-3.5', 'transition-transform', 'group-hover:-translate-x-0.5'].join(' ')}
        />
        Back to portfolio
      </Link>

      <motion.header
        initial={
          shouldReduceMotion
            ? undefined
            : {
                opacity: 0,
                y: 18,
                scale: 0.995
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={[
          'relative',

          'mt-8',

          'overflow-hidden',

          'rounded-[32px]',

          'border',
          'border-white/8',

          'bg-[#071513]',

          'text-white',

          'shadow-[0_30px_100px_rgb(0_0_0/0.14)]'
        ].join(' ')}>
        {/* GRID */}

        <div
          aria-hidden="true"
          className={[
            'pointer-events-none',

            'absolute',
            'inset-0',

            'opacity-70',

            'bg-[linear-gradient(to_right,rgb(106_243_219/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(106_243_219/0.08)_1px,transparent_1px)]',

            '[background-size:108px_108px]'
          ].join(' ')}
        />

        {/* MOVING AMBIENCE */}

        <motion.div
          aria-hidden="true"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: ['-8%', '8%', '-8%'],

                  y: ['0%', '6%', '0%']
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className={[
            'pointer-events-none',

            'absolute',

            'right-[-120px]',
            'top-[-160px]',

            'size-[540px]',

            'rounded-full',

            'bg-[#20b2a6]/15',

            'blur-[150px]'
          ].join(' ')}
        />

        <div
          className={[
            'relative',
            'z-10',

            'grid',

            'min-h-[580px]',

            'gap-12',

            'p-6',

            'sm:p-8',

            'lg:grid-cols-[minmax(0,1fr)_400px]',
            'lg:p-10'
          ].join(' ')}>
          <div className="flex min-w-0 flex-col">
            <motion.div
              initial={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 10
                    }
              }
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.3,
                duration: 0.6
              }}
              className="flex flex-wrap items-center gap-2">
              <span
                className={[
                  'inline-flex',

                  'items-center',
                  'gap-2',

                  'rounded-full',

                  'border',
                  'border-[#6af3db]/25',

                  'bg-[#6af3db]/10',

                  'px-3',
                  'py-1.5',

                  'font-mono',
                  'text-[8px]',
                  'uppercase',

                  'tracking-[0.16em]',

                  'text-[#aefaf0]'
                ].join(' ')}>
                <motion.span
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: [0.45, 1, 0.45]
                        }
                  }
                  transition={{
                    duration: 2.8,
                    repeat: Infinity
                  }}
                  className={[
                    'size-1.5',

                    'rounded-full',

                    'bg-[#6af3db]',

                    'shadow-[0_0_10px_rgba(106,243,219,0.8)]'
                  ].join(' ')}
                />

                {humanizePortfolioValue(project.type)}
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-white/55">
                {humanizePortfolioValue(project.status)}
              </span>

              {project.featured ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-white/55">
                  <CheckCircle2 aria-hidden="true" className="size-3 text-[#6af3db]" />
                  Featured
                </span>
              ) : null}
            </motion.div>

            <div className="mt-auto pt-20">
              <motion.p
                initial={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: 10
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.45
                }}
                className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6af3db]">
                Rcentz project
              </motion.p>

              <motion.h1
                initial={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: 24
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.52,
                  duration: 0.8
                }}
                className={[
                  'mt-4',

                  'max-w-4xl',

                  'text-[3rem]',
                  'font-semibold',

                  'leading-[0.92]',

                  'tracking-[-0.065em]',

                  'sm:text-[4.2rem]',
                  'lg:text-[5.5rem]'
                ].join(' ')}>
                {project.name}
              </motion.h1>

              {project.tagline ? (
                <motion.p
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 0,
                          y: 15
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: 0.68,
                    duration: 0.7
                  }}
                  className="mt-6 max-w-3xl text-lg leading-8 tracking-[-0.025em] text-white/72 sm:text-xl">
                  {project.tagline}
                </motion.p>
              ) : null}

              {(project.summary ?? project.description) ? (
                <motion.p
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 0
                        }
                  }
                  animate={{
                    opacity: 1
                  }}
                  transition={{
                    delay: 0.82
                  }}
                  className="mt-5 max-w-3xl text-sm leading-7 text-white/48 sm:text-[15px]">
                  {project.summary ?? project.description}
                </motion.p>
              ) : null}

              {liveUrl || repositoryUrl ? (
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 0,
                          y: 10
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: 0.95
                  }}
                  className="mt-8 flex flex-wrap gap-3">
                  {liveUrl ? (
                    <motion.a
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : {
                              y: -2,
                              scale: 1.015
                            }
                      }
                      whileTap={{
                        scale: 0.98
                      }}
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#6af3db] px-5 text-[12px] font-semibold text-[#071513]">
                      Live project
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </motion.a>
                  ) : null}

                  {repositoryUrl ? (
                    <motion.a
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : {
                              y: -2
                            }
                      }
                      href={repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-3 rounded-full border border-white/12 bg-white/[0.05] px-4">
                      <CompanyMark company="github" presentation="logo" size={14} />

                      <ExternalLink aria-hidden="true" className="size-3 text-white/45" />
                    </motion.a>
                  ) : null}
                </motion.div>
              ) : null}
            </div>
          </div>

          <motion.aside
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    x: 24
                  }
            }
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: 0.65,
              duration: 0.85
            }}
            className={[
              'self-end',

              'overflow-hidden',

              'rounded-[26px]',

              'border',
              'border-white/10',

              'bg-black/20',

              'backdrop-blur-xl'
            ].join(' ')}>
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.17em] text-white/35">
                  Live architecture
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <Radio aria-hidden="true" className="size-3.5 text-[#6af3db]" />

                  <p className="text-[11px] font-medium text-white/75">Signal active</p>
                </div>
              </div>

              <motion.span
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.6, 1],

                        opacity: [1, 0.4, 1]
                      }
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity
                }}
                className="size-2 rounded-full bg-[#6af3db] shadow-[0_0_12px_rgba(106,243,219,0.9)]"
              />
            </div>

            <ProjectSignalNetwork technologies={project.technologies} />

            <div className="grid grid-cols-2 border-t border-white/10">
              <div className="p-4">
                <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-white/30">Technologies</p>

                <p className="mt-2 text-xl font-semibold">{project.technologies.length}</p>
              </div>

              <div className="border-l border-white/10 p-4">
                <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-white/30">
                  Public updates
                </p>

                <p className="mt-2 text-xl font-semibold">{project.updates.length}</p>
              </div>
            </div>
          </motion.aside>
        </div>
      </motion.header>
    </>
  );
}
