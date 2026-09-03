import {
  siCloudflare,
  siGithub,
  siGooglegemini,
  siNextdotjs,
  siPostgresql,
  siPrisma,
  siReact,
  siStripe,
  siTypescript,
  siVercel
} from 'simple-icons';

type Brand = {
  name: string;
  category: string;
  path?: string;
  mark?: string;
};

const platforms: Brand[] = [
  {
    name: 'Next.js',
    category: 'Framework',
    path: siNextdotjs.path
  },
  {
    name: 'React',
    category: 'Interface',
    path: siReact.path
  },
  {
    name: 'TypeScript',
    category: 'Engineering',
    path: siTypescript.path
  },
  {
    name: 'Prisma',
    category: 'ORM',
    path: siPrisma.path
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    path: siPostgresql.path
  },
  {
    name: 'ChatGPT / OpenAI',
    category: 'AI',
    mark: 'AI'
  },
  {
    name: 'Gemini',
    category: 'AI',
    path: siGooglegemini.path
  },
  {
    name: 'Paystack',
    category: 'Payments',
    mark: 'P'
  },
  {
    name: 'Stripe',
    category: 'Payments',
    path: siStripe.path
  },
  {
    name: 'Vercel',
    category: 'Deployment',
    path: siVercel.path
  },
  {
    name: 'GitHub',
    category: 'Development',
    path: siGithub.path
  },
  {
    name: 'Cloudflare',
    category: 'Infrastructure',
    path: siCloudflare.path
  }
];

function BrandIcon({ brand }: { brand: Brand }) {
  if (brand.path) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={['size-5', 'shrink-0', 'fill-current', 'text-foreground/78'].join(' ')}>
        <path d={brand.path} />
      </svg>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={[
        'flex',
        'size-6',
        'shrink-0',
        'items-center',
        'justify-center',
        'rounded-lg',
        'border',
        'border-border/70',
        'bg-background/50',
        'font-mono',
        'text-[8px]',
        'font-semibold',
        'tracking-[-0.02em]',
        'text-foreground/75'
      ].join(' ')}>
      {brand.mark}
    </span>
  );
}

function BrandMark({ brand }: { brand: Brand }) {
  return (
    <div
      className={[
        'flex',
        'shrink-0',
        'items-center',
        'gap-3',

        'rounded-2xl',

        'border',
        'border-border/65',

        'bg-background/38',

        'px-4',
        'py-3',

        'backdrop-blur-md',

        'transition-[background-color,border-color]',
        'duration-300',

        'hover:border-border-strong/70',
        'hover:bg-background/60'
      ].join(' ')}>
      <BrandIcon brand={brand} />

      <div>
        <p className={['whitespace-nowrap', 'text-[13px]', 'font-medium', 'tracking-[-0.015em]'].join(' ')}>
          {brand.name}
        </p>

        <p
          className={[
            'mt-0.5',
            'font-mono',
            'text-[8px]',
            'uppercase',
            'tracking-[0.15em]',
            'text-muted'
          ].join(' ')}>
          {brand.category}
        </p>
      </div>
    </div>
  );
}

export function HomeTechnologyRail() {
  const repeatedPlatforms = [...platforms, ...platforms];

  return (
    <section className={['rcentz-section', 'border-t', 'border-border', 'py-16', 'sm:py-20'].join(' ')}>
      <div
        className={['flex', 'flex-col', 'gap-5', 'sm:flex-row', 'sm:items-end', 'sm:justify-between'].join(
          ' '
        )}>
        <div>
          <p
            className={['font-mono', 'text-[10px]', 'uppercase', 'tracking-[0.2em]', 'text-muted'].join(' ')}>
            Technology ecosystem
          </p>

          <h2
            className={['mt-3', 'text-2xl', 'font-semibold', 'tracking-[-0.04em]', 'sm:text-3xl'].join(' ')}>
            Technologies and platforms we build with.
          </h2>
        </div>

        <p className={['max-w-md', 'text-sm', 'leading-6', 'text-muted'].join(' ')}>
          Frameworks, infrastructure, intelligence and payment platforms selected according to what each
          product needs.
        </p>
      </div>

      <div className={['rcentz-platform-marquee', 'relative', 'mt-9', 'overflow-hidden'].join(' ')}>
        <div
          aria-hidden="true"
          className={[
            'pointer-events-none',
            'absolute',
            'inset-y-0',
            'left-0',
            'z-10',
            'w-16',
            'bg-gradient-to-r',
            'from-background',
            'to-transparent',
            'sm:w-24'
          ].join(' ')}
        />

        <div
          aria-hidden="true"
          className={[
            'pointer-events-none',
            'absolute',
            'inset-y-0',
            'right-0',
            'z-10',
            'w-16',
            'bg-gradient-to-l',
            'from-background',
            'to-transparent',
            'sm:w-24'
          ].join(' ')}
        />

        <div className={['rcentz-platform-track', 'flex', 'w-max', 'gap-3'].join(' ')}>
          {repeatedPlatforms.map((brand, index) => (
            <BrandMark key={`${brand.name}-${index}`} brand={brand} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes rcentz-platform-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .rcentz-platform-track {
          animation:
            rcentz-platform-marquee
            48s
            linear
            infinite;
        }

        .rcentz-platform-marquee:hover
        .rcentz-platform-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .rcentz-platform-marquee {
            overflow-x: auto;
          }

          .rcentz-platform-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
