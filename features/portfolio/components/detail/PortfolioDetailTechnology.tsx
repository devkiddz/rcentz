import { siNextdotjs, siPostgresql, siPrisma, siReact, siTypescript } from 'simple-icons';

import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

type PortfolioDetailTechnologyProps = {
  technologies: PublicPortfolioProject['technologies'];
};

type TechnologyVisual = {
  path?: string;
  mark?: string;
};

const technologyVisuals: Record<string, TechnologyVisual> = {
  nextjs: { path: siNextdotjs.path },
  react: { path: siReact.path },
  typescript: { path: siTypescript.path },
  prisma: { path: siPrisma.path },
  postgresql: { path: siPostgresql.path },

  'better-auth': { mark: 'BA' },
  paystack: { mark: 'P' },
  cloudinary: { mark: 'C' },
  'tailwind-css': { mark: 'TW' },
  serwist: { mark: 'SW' },
  openai: { mark: 'AI' },
  resend: { mark: 'R' },
  'shadcn-ui': { mark: 'UI' },
  recharts: { mark: 'RC' },
  'tanstack-table': { mark: 'TT' },
  'next-themes': { mark: 'NT' },
  stripe: { mark: 'S' },
  vercel: { mark: 'V' },
  github: { mark: 'GH' },
  neon: { mark: 'N' },
  nodejs: { mark: 'JS' }
};

function getFallbackMark(name: string) {
  const parts = name.split(/[\s./-]+/).filter(Boolean);

  if (parts.length > 1) {
    return parts
      .slice(0, 2)
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  }

  return name.slice(0, 2).toUpperCase();
}

function TechnologyMark({ name, slug, compact = false }: { name: string; slug: string; compact?: boolean }) {
  const visual = technologyVisuals[slug];
  const sizeClass = compact ? 'size-9 rounded-xl' : 'size-11 rounded-[14px]';

  if (visual?.path) {
    return (
      <div
        aria-hidden="true"
        className={`flex ${sizeClass} shrink-0 items-center justify-center border border-border/70 bg-background/75 text-foreground shadow-sm`}>
        <svg viewBox="0 0 24 24" className={compact ? 'size-4 fill-current' : 'size-[19px] fill-current'}>
          <path d={visual.path} />
        </svg>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`flex ${sizeClass} shrink-0 items-center justify-center border border-border/70 bg-background/75 font-mono font-semibold tracking-[-0.04em] text-theme-accent-strong shadow-sm ${
        compact ? 'text-[7px]' : 'text-[8px]'
      }`}>
      {visual?.mark ?? getFallbackMark(name)}
    </div>
  );
}

function CoreTechnologyCard({
  technology,
  index
}: {
  technology: PublicPortfolioProject['technologies'][number];
  index: number;
}) {
  return (
    <article className="group relative overflow-hidden rounded-[22px] border border-border/70 bg-background/55 p-6 shadow-sm transition-[border-color,background-color,transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:border-border-strong/70 hover:bg-background/80 hover:shadow-lg sm:p-7">
      {/* TOP SIGNAL */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-theme-accent/70 to-transparent opacity-70"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 size-44 rounded-full bg-theme-accent/[0.06] blur-3xl transition-opacity duration-500 group-hover:opacity-150"
      />

      {/* IDENTITY */}
      <div className="relative flex items-start justify-between gap-5">
        <div className="flex items-start gap-4">
          <TechnologyMark name={technology.name} slug={technology.slug} />

          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.17em] text-muted">
              {technology.category ?? 'Core architecture'}
            </p>

            <h3 className="mt-1.5 text-lg font-semibold tracking-[-0.035em] text-foreground sm:text-xl">
              {technology.name}
            </h3>
          </div>
        </div>

        <span className="font-mono text-[8px] tracking-[0.16em] text-muted/60">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* GENERIC TECHNOLOGY CONTEXT */}
      {technology.description ? (
        <p className="relative mt-5 max-w-[34rem] text-[12px] leading-[1.75] text-muted">
          {technology.description}
        </p>
      ) : null}

      {/* PROJECT-SPECIFIC RESPONSIBILITY */}
      <div className="relative mt-6 grid gap-5 border-t border-border/60 pt-5 sm:grid-cols-2 sm:gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-1 rounded-full bg-theme-accent shadow-[0_0_10px_var(--theme-accent)]" />

            <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-theme-accent-strong">
              Responsibility
            </p>
          </div>

          <p className="mt-2.5 text-[12px] leading-[1.7] text-foreground/78">
            {technology.purpose ?? 'Project responsibility has not been published.'}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="size-1 rounded-full bg-foreground/45" />

            <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted">Why this choice</p>
          </div>

          <p className="mt-2.5 text-[12px] leading-[1.7] text-foreground/64">
            {technology.rationale ?? 'Selection rationale has not been published.'}
          </p>
        </div>
      </div>
    </article>
  );
}

function SupportingTechnology({
  technology
}: {
  technology: PublicPortfolioProject['technologies'][number];
}) {
  return (
    <article className="group rounded-[18px] border border-border/65 bg-background/45 p-4 transition-[border-color,background-color,box-shadow] duration-300 hover:border-border-strong/70 hover:bg-background/75 hover:shadow-sm">
      <div className="flex items-start gap-3">
        <TechnologyMark name={technology.name} slug={technology.slug} compact />

        <div className="min-w-0">
          <h4 className="truncate text-[13px] font-medium tracking-[-0.02em] text-foreground">
            {technology.name}
          </h4>

          <p className="mt-0.5 truncate font-mono text-[7px] uppercase tracking-[0.13em] text-muted">
            {technology.category ?? 'Supporting technology'}
          </p>
        </div>
      </div>

      {technology.purpose ? (
        <p className="mt-3 line-clamp-3 text-[11px] leading-[1.65] text-muted">{technology.purpose}</p>
      ) : null}
    </article>
  );
}

export function PortfolioDetailTechnology({ technologies }: PortfolioDetailTechnologyProps) {
  const ordered = [...technologies].sort((a, b) => {
    const orderDifference = (a.sortOrder ?? 0) - (b.sortOrder ?? 0);

    if (orderDifference !== 0) {
      return orderDifference;
    }

    return a.name.localeCompare(b.name);
  });

  if (!ordered.length) {
    return null;
  }

  const coreTechnologies = ordered.filter(technology => technology.featured);
  const supportingTechnologies = ordered.filter(technology => !technology.featured);

  return (
    <section className="py-20 sm:py-24">
      <div className="rcentz-section">
        {/* CINEMATIC SYSTEM PANEL */}
        <div className="relative overflow-hidden bg-background px-5 py-10 text-foreground sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          {/* BACKGROUND SYSTEM */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 -translate-y-[46%] rounded-full bg-theme-accent/[0.07] blur-[120px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[5%] top-[10%] size-[340px] rounded-full bg-foreground/[0.025] blur-[110px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:54px_54px]"
          />

          <div className="relative">
            {/* SECTION INTRODUCTION */}
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-background/65 px-3.5 py-1.5 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-theme-accent shadow-[0_0_12px_var(--theme-accent)]" />

                <span className="font-mono text-[8px] font-medium uppercase tracking-[0.18em] text-muted">
                  System architecture
                </span>
              </div>

              <h2 className="mt-6 text-balance text-3xl font-semibold leading-[1.03] tracking-[-0.055em] text-foreground sm:text-4xl lg:text-[3.35rem]">
                Technology chosen around
                <span className="block text-theme-accent-strong">the responsibility of the system.</span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-balance text-[13px] leading-6 text-muted sm:text-sm">
                Each technology had a defined job: shaping the interface, protecting application boundaries,
                managing data, handling transactions or supporting the wider product experience.
              </p>
            </div>

            {/* SECTION METRICS */}
            <div className="mx-auto mt-9 flex max-w-xl items-center justify-center divide-x divide-border border-y border-border py-4">
              <div className="px-6 text-center">
                <p className="text-lg font-semibold tracking-[-0.04em] text-foreground">{ordered.length}</p>

                <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-muted">
                  Technologies
                </p>
              </div>

              <div className="px-6 text-center">
                <p className="text-lg font-semibold tracking-[-0.04em] text-foreground">
                  {coreTechnologies.length}
                </p>

                <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-muted">
                  Core choices
                </p>
              </div>

              <div className="px-6 text-center">
                <p className="text-lg font-semibold tracking-[-0.04em] text-foreground">
                  {supportingTechnologies.length}
                </p>

                <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-muted">Supporting</p>
              </div>
            </div>

            {/* CORE ARCHITECTURE */}
            {coreTechnologies.length > 0 ? (
              <div className="mt-12 sm:mt-14">
                <div className="mb-5 flex items-end justify-between gap-6">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-theme-accent-strong">
                      Core architecture
                    </p>

                    <p className="mt-1.5 max-w-xl text-xs leading-5 text-muted">
                      The decisions carrying the principal application responsibilities.
                    </p>
                  </div>

                  <span className="hidden font-mono text-[7px] uppercase tracking-[0.14em] text-muted sm:block">
                    {coreTechnologies.length} defining choices
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {coreTechnologies.map((technology, index) => (
                    <CoreTechnologyCard key={technology.id} technology={technology} index={index} />
                  ))}
                </div>
              </div>
            ) : null}

            {/* SUPPORTING SYSTEM */}
            {supportingTechnologies.length > 0 ? (
              <div className="mt-12 border-t border-border pt-8 sm:mt-14">
                <div className="mb-5 flex items-end justify-between gap-6">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-theme-accent-strong">
                      Supporting system
                    </p>

                    <p className="mt-1.5 max-w-xl text-xs leading-5 text-muted">
                      Libraries and services supporting the core architectural decisions.
                    </p>
                  </div>

                  <span className="hidden font-mono text-[7px] uppercase tracking-[0.14em] text-muted sm:block">
                    {supportingTechnologies.length} supporting tools
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {supportingTechnologies.map(technology => (
                    <SupportingTechnology key={technology.id} technology={technology} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
