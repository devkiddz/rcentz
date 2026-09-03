import {
  siGithub,
  siNextdotjs,
  siPostgresql,
  siPrisma,
  siReact,
  siStripe,
  siTypescript,
  siVercel
} from 'simple-icons';

import type { PortfolioProjects } from '@/features/portfolio/server/get-portfolio-projects';

type PortfolioTechnologyRailProps = {
  projects: PortfolioProjects;
};

type TechnologyPresentation = {
  category: string;
  path?: string;
  mark?: string;
};

const technologyPresentation: Record<string, TechnologyPresentation> = {
  nextjs: {
    category: 'Framework',
    path: siNextdotjs.path
  },
  react: {
    category: 'Interface',
    path: siReact.path
  },
  typescript: {
    category: 'Engineering',
    path: siTypescript.path
  },
  prisma: {
    category: 'ORM',
    path: siPrisma.path
  },
  postgresql: {
    category: 'Database',
    path: siPostgresql.path
  },
  stripe: {
    category: 'Payments',
    path: siStripe.path
  },
  vercel: {
    category: 'Deployment',
    path: siVercel.path
  },
  github: {
    category: 'Development',
    path: siGithub.path
  },
  'better-auth': {
    category: 'Authentication',
    mark: 'BA'
  },
  paystack: {
    category: 'Payments',
    mark: 'P'
  },
  cloudinary: {
    category: 'Media',
    mark: 'C'
  },
  'tailwind-css': {
    category: 'Styling',
    mark: 'TW'
  },
  serwist: {
    category: 'PWA',
    mark: 'SW'
  },
  openai: {
    category: 'AI',
    mark: 'AI'
  },
  neon: {
    category: 'Database',
    mark: 'N'
  },
  nodejs: {
    category: 'Runtime',
    mark: 'JS'
  }
};

function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function TechnologyIcon({
  path,
  mark
}: {
  path?: string;
  mark?: string;
}) {
  if (path) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5 shrink-0 fill-current text-foreground/78">
        <path d={path} />
      </svg>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-background/50 font-mono text-[7px] font-semibold tracking-[-0.02em] text-foreground/75">
      {mark ?? '•'}
    </span>
  );
}

export function PortfolioTechnologyRail({ projects }: PortfolioTechnologyRailProps) {
  const technologyMap = new Map<
    string,
    {
      name: string;
      slug: string;
      icon: string | null;
      usage: number;
    }
  >();

  for (const project of projects) {
    for (const technology of project.technologies) {
      const current = technologyMap.get(technology.slug);

      if (current) {
        current.usage += 1;
        continue;
      }

      technologyMap.set(technology.slug, {
        ...technology,
        usage: 1
      });
    }
  }

  const technologies = Array.from(technologyMap.values()).sort((a, b) => {
    if (b.usage !== a.usage) {
      return b.usage - a.usage;
    }

    return a.name.localeCompare(b.name);
  });

  if (!technologies.length) {
    return null;
  }

  const repeatedTechnologies = [...technologies, ...technologies];

  return (
    <section className="border-t border-border py-16 sm:py-20">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Built with
          </p>

          <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
            Modern technology behind every serious system.
          </h2>
        </div>

        <p className="max-w-md text-sm leading-6 text-muted">
          Frameworks, intelligence, payments, data and infrastructure represented by the published work itself.
        </p>
      </div>

      <div className="portfolio-technology-marquee relative mt-9 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24"
        />

        <div className="portfolio-technology-track flex w-max gap-3">
          {repeatedTechnologies.map((technology, index) => {
            const presentation = technologyPresentation[technology.slug] ?? {
              category: titleFromSlug(technology.slug),
              mark: technology.name.slice(0, 2).toUpperCase()
            };

            return (
              <div
                key={`${technology.slug}-${index}`}
                className="flex shrink-0 items-center gap-3 rounded-2xl border border-border/65 bg-background/38 px-4 py-3 backdrop-blur-md transition-[background-color,border-color] duration-300 hover:border-border-strong/70 hover:bg-background/60">
                <TechnologyIcon
                  path={presentation.path}
                  mark={presentation.mark}
                />

                <div>
                  <p className="whitespace-nowrap text-[13px] font-medium tracking-[-0.015em]">
                    {technology.name}
                  </p>

                  <div className="mt-0.5 flex items-center gap-2">
                    <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted">
                      {presentation.category}
                    </p>

                    {technology.usage > 1 ? (
                      <>
                        <span className="size-0.5 rounded-full bg-border-strong" />
                        <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted">
                          {technology.usage} projects
                        </p>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes portfolio-technology-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .portfolio-technology-track {
          animation:
            portfolio-technology-marquee
            48s
            linear
            infinite;
        }

        .portfolio-technology-marquee:hover
        .portfolio-technology-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .portfolio-technology-marquee {
            overflow-x: auto;
          }

          .portfolio-technology-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
