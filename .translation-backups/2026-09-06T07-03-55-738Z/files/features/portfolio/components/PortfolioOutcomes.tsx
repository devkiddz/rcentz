'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

type PortfolioOutcome = {
  id: string;
  projectName: string;
  projectType: string;
  projectStatus: string;
  outcome: string;
  image: string | null;
};

type PortfolioOutcomesProps = {
  outcomes: PortfolioOutcome[];
};

function humanize(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function PortfolioOutcomes({ outcomes }: PortfolioOutcomesProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!outcomes.length) {
    return null;
  }

  const active = outcomes[activeIndex];

  function move(direction: -1 | 1) {
    setActiveIndex(current => {
      const next = current + direction;

      if (next < 0) {
        return outcomes.length - 1;
      }

      if (next >= outcomes.length) {
        return 0;
      }

      return next;
    });
  }

  return (
    <section className="border-t border-border py-20 sm:py-24">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-14">
        <div className="max-w-md">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Recorded outcomes</p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            What the projects actually delivered.
          </h2>

          <p className="mt-5 text-sm leading-7 text-muted">
            These are project outcomes stored in the public portfolio records, not invented testimonials or
            performance claims.
          </p>
        </div>

        <article className="overflow-hidden rounded-[28px] border border-border bg-background/60 backdrop-blur-sm">
          <div className="grid sm:grid-cols-[150px_1fr]">
            <div className="relative min-h-[160px] border-b border-border bg-surface-muted/25 sm:min-h-[220px] sm:border-b-0 sm:border-r">
              {active.image ? (
                <Image
                  src={active.image}
                  alt={`${active.projectName} project`}
                  fill
                  sizes="150px"
                  className="object-cover object-top"
                />
              ) : (
                <div className="flex h-full min-h-[160px] items-center justify-center sm:min-h-[220px]">
                  <span className="text-4xl font-semibold text-muted">{active.projectName.charAt(0)}</span>
                </div>
              )}
            </div>

            <div className="flex min-h-[220px] flex-col p-6 sm:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-theme-accent">
                  {active.projectName}
                </span>
                <span className="size-1 rounded-full bg-border-strong" />
                <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted">
                  {humanize(active.projectType)}
                </span>
                <span className="size-1 rounded-full bg-border-strong" />
                <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted">
                  {humanize(active.projectStatus)}
                </span>
              </div>

              <p className="mt-5 text-base leading-7 tracking-[-0.015em] sm:text-lg">{active.outcome}</p>

              <div className="mt-auto flex items-center justify-between gap-4 pt-7">
                <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-muted">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(outcomes.length).padStart(2, '0')}
                </p>

                {outcomes.length > 1 ? (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => move(-1)}
                      aria-label="Previous project outcome"
                      className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface-muted text-muted transition-colors hover:border-border-strong hover:bg-secondary hover:text-foreground">
                      <ChevronLeft aria-hidden="true" className="size-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => move(1)}
                      aria-label="Next project outcome"
                      className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface-muted text-muted transition-colors hover:border-border-strong hover:bg-secondary hover:text-foreground">
                      <ChevronRight aria-hidden="true" className="size-3.5" />
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
