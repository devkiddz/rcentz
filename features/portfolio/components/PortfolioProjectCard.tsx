'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ArrowUpRight, GitBranch, Images } from 'lucide-react';

import { motion, useReducedMotion } from 'motion/react';

import { useTranslations } from 'next-intl';

import type { PortfolioProject } from '@/features/portfolio/server/get-portfolio-projects';

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

export function PortfolioProjectCard({ project, index, featured = false }: PortfolioProjectCardProps) {
  const t = useTranslations('PortfolioCard');

  const enumT = useTranslations('CommonEnums');

  const reduceMotion = Boolean(useReducedMotion());

  const image = project.media[0];

  const typeLabel = enumT.has(`projectTypes.${project.type.toLowerCase()}`)
    ? enumT(`projectTypes.${project.type.toLowerCase()}`)
    : humanize(project.type);

  const statusLabel = enumT.has(`projectStatuses.${project.status.toLowerCase()}`)
    ? enumT(`projectStatuses.${project.status.toLowerCase()}`)
    : humanize(project.status);

  const introDelay = Math.min(index * 0.055, 0.25);

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
        duration: 0.55,
        delay: reduceMotion ? 0 : introDelay,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -3
            }
      }
      className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-border bg-surface shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-border-strong hover:shadow-xl">
      <Link
        href={`/portfolio/${project.slug}`}
        aria-label={t('openPreview', {
          project: project.name
        })}
        className="absolute inset-0 z-10 rounded-[26px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      />

      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt ?? `${project.name} project screenshot`}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-muted">
            <div aria-hidden="true" className="absolute inset-0 opacity-60 rcentz-grid-fade" />

            <div className="relative z-[1] text-center">
              <div className="mx-auto flex size-11 items-center justify-center rounded-xl border border-border bg-background">
                <Images className="size-4 text-muted" />
              </div>

              <p className="mt-3 text-[10px] text-muted">{project.name}</p>
            </div>
          </div>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10"
        />

        <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
          {featured || project.featured ? (
            <span className="rounded-full border border-white/10 bg-black/45 px-2.5 py-1.5 font-mono text-[7px] uppercase tracking-[0.12em] text-white/80 backdrop-blur-md">
              {t('featuredProject')}
            </span>
          ) : null}

          <span className="rounded-full border border-white/10 bg-black/45 px-2.5 py-1.5 font-mono text-[7px] uppercase tracking-[0.12em] text-white/70 backdrop-blur-md">
            {statusLabel}
          </span>
        </div>

        {project.liveUrl || project.repositoryUrl ? (
          <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={t('openLive', {
                  project: project.name
                })}
                title={t('viewLive')}
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white/85 shadow-sm backdrop-blur-md transition-[background-color,color,transform] hover:scale-105 hover:bg-black/65 hover:text-white">
                <ArrowUpRight className="size-4" />
              </a>
            ) : null}

            {project.repositoryUrl ? (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                title={t('source')}
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white/85 shadow-sm backdrop-blur-md transition-[background-color,color,transform] hover:scale-105 hover:bg-black/65 hover:text-white">
                <GitBranch className="size-4" />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="relative flex flex-1 flex-col bg-surface-raised px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
            <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-theme-accent">{typeLabel}</p>

            <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-[22px]">
              {project.name}
            </h3>
          </div>

          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted transition-[background-color,color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-surface-muted group-hover:text-foreground">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <p className="mt-4 line-clamp-3 max-w-2xl text-[11px] leading-5 text-muted">
          {project.tagline ?? project.summary ?? project.description ?? t('projectFallback')}
        </p>

        {project.technologies.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map(technology => (
              <span
                key={technology.slug}
                className="rounded-full border border-border bg-surface-muted px-3 py-1.5 font-mono text-[8px] text-muted">
                {technology.name}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted">
            {String(index + 1).padStart(2, '0')}
          </span>

          <span className="text-[9px] font-medium text-muted transition-colors group-hover:text-foreground">
            {t('goPreview')}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
