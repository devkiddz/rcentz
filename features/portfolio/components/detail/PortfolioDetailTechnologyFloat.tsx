import { siNextdotjs, siPostgresql, siPrisma, siReact, siTypescript } from 'simple-icons';

import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

type PortfolioDetailTechnologyFloatProps = {
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

function TechnologyIcon({ name, slug }: { name: string; slug: string }) {
  const visual = technologyVisuals[slug];

  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-background text-foreground">
      {visual?.path ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5 fill-current">
          <path d={visual.path} />
        </svg>
      ) : (
        <span className="font-mono text-[6px] font-semibold tracking-[-0.03em] text-theme-accent-strong">
          {visual?.mark ?? getFallbackMark(name)}
        </span>
      )}
    </span>
  );
}

export function PortfolioDetailTechnologyFloat({ technologies }: PortfolioDetailTechnologyFloatProps) {
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

  return (
    <div className="relative z-20 -my-5 sm:-my-6">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[20px] border border-border/80 bg-background/90 p-2.5 shadow-[0_14px_42px_rgb(0_0_0/0.07)] backdrop-blur-xl sm:p-3">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-16 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-theme-accent/[0.09] blur-2xl"
          />

          <div className="relative flex items-center gap-3">
            <div className="hidden shrink-0 items-center gap-2 border-r border-border px-2 pr-4 sm:flex">
              <span className="size-1.5 rounded-full bg-theme-accent shadow-[0_0_10px_var(--theme-accent)]" />

              <p className="font-mono text-[7px] font-medium uppercase tracking-[0.17em] text-muted">
                Built with
              </p>
            </div>

            <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex w-max items-center gap-2">
                {ordered.map(technology => (
                  <div
                    key={technology.id}
                    className="flex shrink-0 items-center gap-2 rounded-xl border border-border/65 bg-background/55 px-2.5 py-2 transition-[border-color,background-color] duration-300 hover:border-border-strong/70 hover:bg-background">
                    <TechnologyIcon name={technology.name} slug={technology.slug} />

                    <div className="pr-0.5">
                      <p className="whitespace-nowrap text-[11px] font-medium tracking-[-0.02em] text-foreground">
                        {technology.name}
                      </p>

                      {technology.featured ? (
                        <p className="mt-0.5 font-mono text-[6px] uppercase tracking-[0.13em] text-theme-accent-strong">
                          Core
                        </p>
                      ) : (
                        <p className="mt-0.5 font-mono text-[6px] uppercase tracking-[0.13em] text-muted">
                          {technology.category ?? 'Technology'}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background via-background/85 to-transparent sm:w-14"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
