'use client';

import Link from 'next/link';

import {
  ArrowRight,
  ArrowUpRight,
  Eye,
  Flame,
  Heart,
  Lightbulb,
  MessageCircle,
  Share2,
  ThumbsUp,
  User
} from 'lucide-react';

import { motion, useReducedMotion } from 'motion/react';

import type { PortfolioProject } from '@/features/portfolio/server/get-portfolio-projects';

import { PortfolioProjectVisual } from './PortfolioProjectVisual';

type PortfolioProjectCardProps = {
  project: PortfolioProject;
  index: number;
  featured?: boolean;
};

function humanize(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function initials(value: string | null) {
  if (!value) {
    return 'R';
  }

  return value
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('');
}

/* =========================================================
   CARD PREVIEW NAVIGATION
   ========================================================= */

function PortfolioPreviewOverlay({
  project,
  featured = false
}: {
  project: PortfolioProject;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      aria-label={`Open ${project.name} project preview`}
      className={[
        'absolute inset-0 z-10',
        featured ? 'rounded-[30px]' : 'rounded-[26px]',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-theme-accent',
        'focus-visible:ring-offset-2',
        'focus-visible:ring-offset-background'
      ].join(' ')}
    />
  );
}

function PortfolioPreviewButton({
  project,
  compact = false
}: {
  project: PortfolioProject;
  compact?: boolean;
}) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={[
        'group/preview inline-flex items-center justify-center gap-2',
        'rounded-full bg-primary font-medium text-primary-foreground',
        'transition-[opacity,transform] duration-200',
        'hover:opacity-85 active:scale-[0.98]',
        compact ? 'h-9 px-3.5 text-[10px]' : 'h-10 px-4 text-[11px]'
      ].join(' ')}>
      Go to preview
      <ArrowRight
        aria-hidden="true"
        className={[
          'transition-transform duration-300',
          'group-hover/preview:translate-x-0.5',
          compact ? 'size-3' : 'size-3.5'
        ].join(' ')}
      />
    </Link>
  );
}

/* =========================================================
   PROGRESS
   ========================================================= */

function PortfolioProgressChart({
  progress,
  status,
  compact = false
}: {
  progress: number;
  status: string;
  compact?: boolean;
}) {
  const reduceMotion = Boolean(useReducedMotion());

  const safeProgress = Math.max(0, Math.min(100, progress));

  const bars = [38, 58, 46, 72, 62, 86, 69, 82, 57, 76];

  const activeBars = Math.max(1, Math.ceil((safeProgress / 100) * bars.length));

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 7
            }
      }
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={[
        'relative overflow-hidden rounded-[18px] border border-border',
        'bg-background/55 backdrop-blur-sm',
        compact ? 'w-[150px] p-3' : 'w-[190px] p-3.5'
      ].join(' ')}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted">Progress</p>

          <p
            className={[
              'mt-1 font-semibold tracking-[-0.045em] text-foreground',
              compact ? 'text-xl' : 'text-2xl'
            ].join(' ')}>
            {safeProgress}%
          </p>
        </div>

        <motion.span
          aria-label={humanize(status)}
          title={humanize(status)}
          initial={
            reduceMotion
              ? false
              : {
                  scale: 0.65,
                  opacity: 0
                }
          }
          whileInView={{
            scale: 1,
            opacity: 1
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.35,
            delay: reduceMotion ? 0 : 0.18
          }}
          className="mt-2 size-2.5 rounded-full bg-theme-accent"
        />
      </div>

      <div
        className={['mt-4 flex items-end gap-1.5 border-b border-border/70', compact ? 'h-12' : 'h-16'].join(
          ' '
        )}>
        {bars.map((height, index) => {
          const active = index < activeBars;

          return (
            <motion.span
              key={`${height}-${index}`}
              initial={
                reduceMotion
                  ? {
                      height: `${height}%`
                    }
                  : {
                      height: 0
                    }
              }
              whileInView={{
                height: `${height}%`
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.45,

                delay: reduceMotion ? 0 : 0.08 + index * 0.035,

                ease: [0.22, 1, 0.36, 1]
              }}
              className={[
                'min-w-0 flex-1 rounded-t-[4px]',
                active ? 'bg-foreground/72' : 'bg-foreground/14'
              ].join(' ')}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

/* =========================================================
   ENGAGEMENT
   ========================================================= */

function PortfolioEngagementMeta({ project }: { project: PortfolioProject }) {
  const reduceMotion = Boolean(useReducedMotion());

  const metrics = [
    {
      label: 'Views',
      value: project.analytics.views,
      icon: Eye
    },
    {
      label: 'Likes',
      value: project.reactions.like,
      icon: ThumbsUp
    },
    {
      label: 'Reactions',
      value: project.analytics.reactions,
      icon: Heart
    },
    {
      label: 'Comments',
      value: project.analytics.comments,
      icon: MessageCircle
    }
  ];

  return (
    <motion.div
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
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={[
        'absolute right-0 top-4 z-50',
        'flex items-center gap-3',
        'rounded-l-full',
        'border border-r-0 border-border',
        'bg-background/94',
        'px-3 py-1.5',
        'shadow-sm backdrop-blur-xl'
      ].join(' ')}>
      {metrics.map(metric => (
        <span
          key={metric.label}
          title={metric.label}
          className="inline-flex items-center gap-1 font-mono text-[7px] tabular-nums text-muted">
          <metric.icon aria-hidden="true" className="size-2.5" />

          <span className="font-medium text-foreground">{metric.value}</span>
        </span>
      ))}
    </motion.div>
  );
}

/* =========================================================
   PROJECT SIGNALS
   ========================================================= */

function PortfolioProjectSignals({
  project,
  compact = false
}: {
  project: PortfolioProject;
  compact?: boolean;
}) {
  const reduceMotion = Boolean(useReducedMotion());

  const activeReactionTypes = [
    {
      label: 'Love',
      value: project.reactions.love,
      icon: Heart
    },
    {
      label: 'Fire',
      value: project.reactions.fire,
      icon: Flame
    },
    {
      label: 'Shares',
      value: project.analytics.shares,
      icon: Share2
    }
  ].filter(item => item.value > 0);

  const visibleCredits = project.credits
    .filter(credit => credit.name || credit.role)
    .slice(0, compact ? 2 : 4);

  const visibleSuggestions = project.suggestions.slice(0, compact ? 1 : 2);

  return (
    <div className={compact ? 'mt-5 space-y-3' : 'mt-8 space-y-3'}>
      {activeReactionTypes.length > 0 ? (
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  x: -8
                }
          }
          whileInView={{
            opacity: 1,
            x: 0
          }}
          viewport={{
            once: true,
            amount: 0.55
          }}
          transition={{
            duration: 0.4,

            delay: reduceMotion ? 0 : 0.15
          }}
          className="flex flex-wrap gap-1.5">
          {activeReactionTypes.map(item => (
            <span
              key={item.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/45 px-2.5 py-1 font-mono text-[7px] text-muted">
              <item.icon aria-hidden="true" className="size-2.5 text-theme-accent" />
              {item.label} {item.value}
            </span>
          ))}
        </motion.div>
      ) : null}

      <div className="grid grid-cols-2 gap-2">
        {/* Credits */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 8
                }
          }
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            amount: 0.45
          }}
          transition={{
            duration: 0.42,

            delay: reduceMotion ? 0 : 0.18
          }}
          className="rounded-2xl border border-border bg-surface-muted/28 p-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <User aria-hidden="true" className="size-3.5 text-theme-accent" />

              <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted">Credits</p>
            </div>

            <span className="font-mono text-[7px] text-muted">{project.credits.length}</span>
          </div>

          {visibleCredits.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {visibleCredits.map((credit, creditIndex) => (
                <motion.div
                  key={credit.id}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          scale: 0.92
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    scale: 1
                  }}
                  viewport={{
                    once: true
                  }}
                  transition={{
                    duration: 0.32,

                    delay: reduceMotion ? 0 : 0.22 + creditIndex * 0.05
                  }}
                  className="flex min-w-0 items-center gap-2">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-background font-mono text-[7px] font-medium text-foreground">
                    {initials(credit.name)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-[9px] font-medium">{credit.name ?? 'Contributor'}</p>

                    {credit.role ? <p className="truncate text-[7px] text-muted">{credit.role}</p> : null}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-[9px] leading-4 text-muted">No public credits recorded yet.</p>
          )}
        </motion.div>

        {/* Suggestions */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 8
                }
          }
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            amount: 0.45
          }}
          transition={{
            duration: 0.42,

            delay: reduceMotion ? 0 : 0.24
          }}
          className="rounded-2xl border border-border bg-theme-accent-faint p-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Lightbulb aria-hidden="true" className="size-3.5 text-theme-accent" />

              <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted">Suggestions</p>
            </div>

            <span className="font-mono text-[7px] text-muted">{project.suggestions.length}</span>
          </div>

          {visibleSuggestions.length > 0 ? (
            <div className="mt-3 space-y-2">
              {visibleSuggestions.map((suggestion, suggestionIndex) => (
                <motion.div
                  key={suggestion.id}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: 7
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
                    duration: 0.34,

                    delay: reduceMotion ? 0 : 0.28 + suggestionIndex * 0.06
                  }}
                  className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[9px] font-medium">{suggestion.name}</p>

                    <p className="mt-0.5 font-mono text-[6px] uppercase tracking-[0.12em] text-muted">
                      {humanize(suggestion.status)} · {humanize(suggestion.priority)}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full border border-theme-accent/20 bg-background/40 px-2 py-1 font-mono text-[6px] text-theme-accent">
                    {suggestion.progress}%
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-[9px] leading-4 text-muted">
              No proposed or nominated features right now.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* =========================================================
   PROJECT CARD
   ========================================================= */

export function PortfolioProjectCard({ project, index, featured = false }: PortfolioProjectCardProps) {
  const reduceMotion = Boolean(useReducedMotion());

  const introDelay = Math.min(index * 0.055, 0.28);

  /* =======================================================
     FEATURED PROJECT
     ======================================================= */

  if (featured) {
    return (
      <motion.article
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 18,
                scale: 0.995
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1
        }}
        viewport={{
          once: true,
          amount: 0.15
        }}
        transition={{
          duration: 0.62,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={[
          'group relative cursor-pointer overflow-hidden rounded-[30px]',
          'border border-border bg-background/65 backdrop-blur-sm',
          'transition-[background-color,border-color,box-shadow]',
          'hover:border-border-strong hover:bg-surface-raised/60',
          'hover:shadow-[0_18px_60px_-34px_var(--theme-accent)]'
        ].join(' ')}>
        {/* Entire card goes to the Rcentz case study */}

        <PortfolioPreviewOverlay project={project} featured />

        <div className="grid md:grid-cols-[0.88fr_1.12fr]">
          {/* Content */}

          <div className="relative flex flex-col p-6 sm:p-8 lg:p-9">
            <PortfolioEngagementMeta project={project} />

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 7
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.4,

                delay: reduceMotion ? 0 : 0.08
              }}
              className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-theme-accent">
                Featured project
              </span>

              <span className="size-1 rounded-full bg-border-strong" />

              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                {humanize(project.type)}
              </span>

              <span className="size-1 rounded-full bg-border-strong" />

              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                {humanize(project.status)}
              </span>
            </motion.div>

            <motion.h3
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 9
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.5,

                delay: reduceMotion ? 0 : 0.12
              }}
              className="mt-5 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              {project.name}
            </motion.h3>

            <motion.p
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 7
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.45,

                delay: reduceMotion ? 0 : 0.16
              }}
              className="mt-4 max-w-xl text-sm leading-6 text-muted">
              {project.tagline ?? project.description ?? 'Published Rcentz project.'}
            </motion.p>

            {project.summary ? (
              <motion.p
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0
                      }
                }
                whileInView={{
                  opacity: 1
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  duration: 0.5,

                  delay: reduceMotion ? 0 : 0.2
                }}
                className="mt-5 max-w-xl text-[12px] leading-6 text-muted">
                {project.summary}
              </motion.p>
            ) : null}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 6
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.4,

                delay: reduceMotion ? 0 : 0.22
              }}
              className="mt-7 flex flex-wrap gap-2">
              {project.technologies.slice(0, 6).map(technology => (
                <span
                  key={technology.slug}
                  className="rounded-full border border-border bg-surface-muted px-2.5 py-1 font-mono text-[8px] text-muted">
                  {technology.name}
                </span>
              ))}
            </motion.div>

            <PortfolioProjectSignals project={project} />

            <div className="mt-5">
              <PortfolioProgressChart progress={project.progress} status={project.status} />
            </div>

            {/* Real actions stay above the card-wide overlay */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 8
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.4,

                delay: reduceMotion ? 0 : 0.34
              }}
              className="relative z-30 mt-auto flex flex-wrap items-center gap-3 pt-7">
              <PortfolioPreviewButton project={project} />

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface-muted px-4 text-[11px] font-medium text-foreground transition-[background-color,border-color,transform] hover:border-border-strong hover:bg-secondary active:scale-[0.98]">
                  View live
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              ) : null}

              {project.repositoryUrl ? (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface-muted px-4 text-[11px] font-medium text-foreground transition-[background-color,border-color,transform] hover:border-border-strong hover:bg-secondary active:scale-[0.98]">
                  Source
                  <ArrowRight aria-hidden="true" className="size-3.5" />
                </a>
              ) : null}
            </motion.div>
          </div>

          {/* Visual */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 14
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true,
              amount: 0.18
            }}
            transition={{
              duration: 0.62,

              delay: reduceMotion ? 0 : 0.08,

              ease: [0.22, 1, 0.36, 1]
            }}
            className="min-h-[380px] border-t border-border md:min-h-[560px] md:border-l md:border-t-0 lg:min-h-[620px]">
            <PortfolioProjectVisual project={project} featured />
          </motion.div>
        </div>
      </motion.article>
    );
  }

  /* =======================================================
     STANDARD PROJECT
     ======================================================= */

  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 16,
              scale: 0.992
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1
      }}
      viewport={{
        once: true,
        amount: 0.12
      }}
      transition={{
        duration: 0.52,

        delay: reduceMotion ? 0 : introDelay,

        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -4
            }
      }
      className={[
        'group relative flex min-h-[610px] cursor-pointer flex-col overflow-hidden',
        'rounded-[26px] border border-border bg-background/62 backdrop-blur-sm',
        'transition-[background-color,border-color,box-shadow]',
        'hover:border-border-strong hover:bg-surface-raised/70',
        'hover:shadow-[0_18px_55px_-38px_var(--theme-accent)]'
      ].join(' ')}>
      {/* Whole card preview target */}

      <PortfolioPreviewOverlay project={project} />

      {/* Visual */}

      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                scale: 1.01
              }
        }
        whileInView={{
          opacity: 1,
          scale: 1
        }}
        viewport={{
          once: true
        }}
        transition={{
          duration: 0.55,

          delay: reduceMotion ? 0 : introDelay + 0.05
        }}
        className="min-h-[245px] border-b border-border">
        <PortfolioProjectVisual project={project} />
      </motion.div>

      {/* Content */}

      <div className="relative flex flex-1 flex-col p-5">
        <PortfolioEngagementMeta project={project} />

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 6
                }
          }
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.35,

            delay: reduceMotion ? 0 : introDelay + 0.08
          }}
          className="flex items-center justify-between gap-4">
          <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted">
            {humanize(project.type)} · {humanize(project.status)}
          </span>

          <span className="font-mono text-[8px] text-muted">{String(index + 1).padStart(2, '0')}</span>
        </motion.div>

        <motion.h3
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 7
                }
          }
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.4,

            delay: reduceMotion ? 0 : introDelay + 0.12
          }}
          className="mt-4 text-xl font-semibold tracking-[-0.035em]">
          {project.name}
        </motion.h3>

        <motion.p
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0
                }
          }
          whileInView={{
            opacity: 1
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.4,

            delay: reduceMotion ? 0 : introDelay + 0.15
          }}
          className="mt-3 line-clamp-3 text-[11px] leading-5 text-muted">
          {project.tagline ?? project.summary ?? project.description ?? 'Rcentz project.'}
        </motion.p>

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 5
                }
          }
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.38,

            delay: reduceMotion ? 0 : introDelay + 0.18
          }}
          className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map(technology => (
            <span
              key={technology.slug}
              className="rounded-full border border-border bg-surface-muted px-2 py-1 font-mono text-[7px] text-muted">
              {technology.name}
            </span>
          ))}
        </motion.div>

        <PortfolioProjectSignals project={project} compact />

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 6
                }
          }
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.38,

            delay: reduceMotion ? 0 : introDelay + 0.26
          }}
          className="mt-auto pt-5">
          <div className="border-t border-border pt-4">
            <div className="flex items-end justify-between gap-4">
              <PortfolioProgressChart progress={project.progress} status={project.status} compact />

              {/* Preview + live remain interactive above overlay */}

              <div className="relative z-30 flex flex-wrap items-center justify-end gap-2">
                <PortfolioPreviewButton project={project} compact />

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.name} live`}
                    title="View live"
                    className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface-muted text-muted transition-[background-color,border-color,color,transform] hover:border-border-strong hover:bg-secondary hover:text-foreground active:scale-[0.97]">
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}
