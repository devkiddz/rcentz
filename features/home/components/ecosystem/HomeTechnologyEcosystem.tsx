import Image from 'next/image';

import type { CSSProperties } from 'react';

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

type IconBrand = {
  type: 'icon';
  name: string;
  category: string;
  path: string;
  hex: string;
};

type AssetBrand = {
  type: 'asset';
  name: string;
  category: string;
  asset: string;
  width: number;
};

type TechnologyBrand = IconBrand | AssetBrand;

const foundationBrands: TechnologyBrand[] = [
  {
    type: 'icon',
    name: 'Next.js',
    category: 'Framework',
    path: siNextdotjs.path,
    hex: siNextdotjs.hex
  },
  {
    type: 'icon',
    name: 'React',
    category: 'Interface',
    path: siReact.path,
    hex: siReact.hex
  },
  {
    type: 'icon',
    name: 'TypeScript',
    category: 'Engineering',
    path: siTypescript.path,
    hex: siTypescript.hex
  },
  {
    type: 'icon',
    name: 'Prisma',
    category: 'ORM',
    path: siPrisma.path,
    hex: siPrisma.hex
  },
  {
    type: 'icon',
    name: 'PostgreSQL',
    category: 'Database',
    path: siPostgresql.path,
    hex: siPostgresql.hex
  },
  {
    type: 'icon',
    name: 'Vercel',
    category: 'Deployment',
    path: siVercel.path,
    hex: siVercel.hex
  }
];

const connectedBrands: TechnologyBrand[] = [
  {
    type: 'asset',
    name: 'OpenAI',
    category: 'AI',
    asset: '/brands/companies/openai.svg',
    width: 58
  },
  {
    type: 'icon',
    name: 'Gemini',
    category: 'AI',
    path: siGooglegemini.path,
    hex: siGooglegemini.hex
  },
  {
    type: 'asset',
    name: 'Paystack',
    category: 'Payments',
    asset: '/brands/companies/paystack.svg',
    width: 70
  },
  {
    type: 'icon',
    name: 'Stripe',
    category: 'Payments',
    path: siStripe.path,
    hex: siStripe.hex
  },
  {
    type: 'icon',
    name: 'GitHub',
    category: 'Development',
    path: siGithub.path,
    hex: siGithub.hex
  },
  {
    type: 'icon',
    name: 'Cloudflare',
    category: 'Infrastructure',
    path: siCloudflare.path,
    hex: siCloudflare.hex
  }
];

function BrandMark({ brand }: { brand: TechnologyBrand }) {
  if (brand.type === 'asset') {
    return (
      <Image
        src={brand.asset}
        alt=""
        aria-hidden="true"
        width={brand.width}
        height={22}
        className={['h-[20px]', 'w-auto', 'shrink-0', 'object-contain'].join(' ')}
      />
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={[
        'size-5',
        'shrink-0',
        'fill-current',
        'text-foreground/68',

        'transition-[color,transform]',
        'duration-300',

        'group-hover:scale-110',
        'group-hover:text-[var(--brand-color)]'
      ].join(' ')}>
      <path d={brand.path} />
    </svg>
  );
}

function BrandChip({ brand }: { brand: TechnologyBrand }) {
  const style =
    brand.type === 'icon'
      ? ({
          '--brand-color': `#${brand.hex}`
        } as CSSProperties)
      : undefined;

  return (
    <div
      style={style}
      className={[
        'group',
        'relative',

        'flex',
        'h-[58px]',
        'shrink-0',
        'items-center',
        'gap-3',

        'overflow-hidden',

        'rounded-2xl',

        'border',
        'border-border/55',

        'bg-background/34',

        'px-4',

        'backdrop-blur-xl',

        'transition-[background-color,border-color,transform]',
        'duration-300',

        'hover:-translate-y-px',
        'hover:border-border-strong/70',
        'hover:bg-background/64'
      ].join(' ')}>
      <span
        aria-hidden="true"
        className={[
          'pointer-events-none',
          'absolute',
          'inset-x-[15%]',
          'top-0',
          'h-px',

          'bg-gradient-to-r',
          'from-transparent',
          'via-foreground/15',
          'to-transparent',

          'opacity-0',
          'transition-opacity',
          'duration-300',

          'group-hover:opacity-100'
        ].join(' ')}
      />

      <BrandMark brand={brand} />

      <div>
        <p className={['whitespace-nowrap', 'text-[12px]', 'font-medium', 'tracking-[-0.015em]'].join(' ')}>
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

function TechnologyRow({ brands, direction }: { brands: TechnologyBrand[]; direction: 'left' | 'right' }) {
  return (
    <div className={['rcentz-technology-window', 'relative', 'overflow-hidden'].join(' ')}>
      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',
          'absolute',
          'inset-y-0',
          'left-0',
          'z-20',

          'w-14',
          'sm:w-24',

          'bg-gradient-to-r',
          'from-background',
          'to-transparent'
        ].join(' ')}
      />

      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',
          'absolute',
          'inset-y-0',
          'right-0',
          'z-20',

          'w-14',
          'sm:w-24',

          'bg-gradient-to-l',
          'from-background',
          'to-transparent'
        ].join(' ')}
      />

      <div
        className={[
          'rcentz-technology-track',
          direction === 'left' ? 'rcentz-technology-left' : 'rcentz-technology-right',

          'flex',
          'w-max'
        ].join(' ')}>
        <div className="flex gap-3 pr-3">
          {brands.map(brand => (
            <BrandChip key={brand.name} brand={brand} />
          ))}
        </div>

        <div aria-hidden="true" className="flex gap-3 pr-3">
          {brands.map(brand => (
            <BrandChip key={`${brand.name}-copy`} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HomeTechnologyEcosystem() {
  return (
    <section
      className={[
        'rcentz-section',

        'relative',

        'overflow-hidden',

        'border-t',
        'border-border',

        'py-14',
        'sm:py-16'
      ].join(' ')}>
      {/* AMBIENT SYSTEM FIELD */}

      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',
          'absolute',
          'left-1/2',
          'top-[-80px]',

          'h-[190px]',
          'w-[70%]',

          '-translate-x-1/2',

          'rounded-full',

          'bg-theme-accent-faint',

          'opacity-45',

          'blur-[80px]'
        ].join(' ')}
      />

      <div
        className={[
          'relative',
          'z-10',

          'flex',
          'flex-col',
          'gap-5',

          'lg:flex-row',
          'lg:items-end',
          'lg:justify-between'
        ].join(' ')}>
        <div>
          <p
            className={['font-mono', 'text-[10px]', 'uppercase', 'tracking-[0.2em]', 'text-muted'].join(' ')}>
            Built with
          </p>

          <h2
            className={[
              'mt-3',

              'max-w-2xl',

              'text-2xl',
              'font-semibold',

              'tracking-[-0.04em]',

              'sm:text-3xl'
            ].join(' ')}>
            Modern technology behind every serious system.
          </h2>
        </div>

        <p className={['max-w-md', 'text-sm', 'leading-6', 'text-muted'].join(' ')}>
          Frameworks, intelligence, payments, data and infrastructure selected around what each product
          actually needs.
        </p>
      </div>

      <div className={['relative', 'z-10', 'mt-9', 'space-y-3'].join(' ')}>
        <TechnologyRow brands={foundationBrands} direction="left" />

        <TechnologyRow brands={connectedBrands} direction="right" />
      </div>

      <style>{`
        @keyframes rcentz-technology-left {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes rcentz-technology-right {
          from {
            transform: translate3d(-50%, 0, 0);
          }

          to {
            transform: translate3d(0, 0, 0);
          }
        }

        .rcentz-technology-left {
          animation:
            rcentz-technology-left
            52s
            linear
            infinite;
        }

        .rcentz-technology-right {
          animation:
            rcentz-technology-right
            61s
            linear
            infinite;
        }

        .rcentz-technology-window:hover
        .rcentz-technology-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .rcentz-technology-window {
            overflow-x: auto;
          }

          .rcentz-technology-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
