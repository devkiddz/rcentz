'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

import type { HomepageData } from '@/features/home/server/get-homepage-data';

import { HomeProjectVisual } from './HomeProjectVisual';

type Project = HomepageData['projects'][number];

type HomeProjectCardProps = {
  project: Project;
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

export function HomeProjectCard({ project, index, featured = false }: HomeProjectCardProps) {
  const reduceMotion = useReducedMotion();

  if (featured) {
    return (
      <motion.article
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="group overflow-hidden rounded-[30px] border border-border bg-background/65 backdrop-blur-sm">
        <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
          <div className="flex flex-col p-6 sm:p-8 lg:p-9">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                Featured project
              </span>

              <span className="size-1 rounded-full bg-border-strong" />

              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                {humanize(project.type)}
              </span>
            </div>

            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">{project.name}</h3>

            {project.tagline ? (
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted">{project.tagline}</p>
            ) : project.description ? (
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted">{project.description}</p>
            ) : null}

            {project.summary ? (
              <p className="mt-5 max-w-xl text-[13px] leading-6 text-muted">{project.summary}</p>
            ) : null}

            <div className="mt-7 flex flex-wrap gap-2">
              {project.technologies.slice(0, 6).map(technology => (
                <span
                  key={technology.slug}
                  className="rounded-full border border-border bg-surface-muted px-2.5 py-1 font-mono text-[8px] text-muted">
                  {technology.name}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface-muted/35 p-4">
                <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted">Current state</p>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <p className="text-sm font-medium">{humanize(project.status)}</p>
                  <p className="font-mono text-[10px] text-muted">{project.progress}%</p>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-muted">
                  <motion.div
                    className="h-full rounded-full bg-[var(--theme-accent)]"
                    initial={reduceMotion ? { width: `${project.progress}%` } : { width: 0 }}
                    whileInView={{ width: `${project.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface-muted/35 p-4">
                <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted">Outcome</p>
                <p className="mt-2 line-clamp-2 text-[10px] leading-4 text-muted">
                  {project.outcome ?? 'A production system designed around real business use.'}
                </p>
              </div>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
              <Link
                href={`/portfolio/${project.slug}`}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-[11px] font-medium text-background transition-opacity hover:opacity-85">
                View case study
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface-muted px-4 text-[11px] font-medium transition-[background-color,border-color] hover:border-border-strong hover:bg-secondary">
                  Live project
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="min-h-[420px] border-t border-border lg:min-h-[560px] lg:border-l lg:border-t-0">
            <HomeProjectVisual project={project} index={index} featured />
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className="group flex min-h-[500px] flex-col overflow-hidden rounded-[26px] border border-border bg-background/62 backdrop-blur-sm transition-[background-color,border-color] hover:border-border-strong hover:bg-surface-raised/70">
      <div className="min-h-[250px] border-b border-border">
        <HomeProjectVisual project={project} index={index} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted">
            {humanize(project.type)}
          </span>

          <span className="font-mono text-[8px] text-muted">{String(index + 1).padStart(2, '0')}</span>
        </div>

        <h3 className="mt-4 text-xl font-semibold tracking-[-0.035em]">{project.name}</h3>

        <p className="mt-3 line-clamp-3 text-[11px] leading-5 text-muted">
          {project.tagline ?? project.summary ?? project.description ?? 'Rcentz project.'}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map(technology => (
            <span
              key={technology.slug}
              className="rounded-full border border-border bg-surface-muted px-2 py-1 font-mono text-[7px] text-muted">
              {technology.name}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
            <div>
              <p className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted">
                {humanize(project.status)}
              </p>
              <p className="mt-1 text-[10px] font-medium">{project.progress}% complete</p>
            </div>

            <Link
              href={`/portfolio/${project.slug}`}
              aria-label={`View ${project.name} case study`}
              className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface-muted text-muted transition-[background-color,border-color,color] hover:border-border-strong hover:bg-secondary hover:text-foreground">
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
