import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

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

type TechnologyCategoryKey =
  | 'framework'
  | 'interface'
  | 'engineering'
  | 'orm'
  | 'database'
  | 'deployment'
  | 'ai'
  | 'payments'
  | 'development'
  | 'infrastructure';

type IconBrand = {
  type: 'icon';
  name: string;
  categoryKey: TechnologyCategoryKey;
  path: string;
};

type AssetBrand = {
  type: 'asset';
  name: string;
  categoryKey: TechnologyCategoryKey;
  asset: string;
  width: number;
};

type TechnologyBrand = IconBrand | AssetBrand;

const foundationBrands: TechnologyBrand[] = [
  {
    type: 'icon',
    name: 'Next.js',
    categoryKey: 'framework',
    path: siNextdotjs.path
  },
  {
    type: 'icon',
    name: 'React',
    categoryKey: 'interface',
    path: siReact.path
  },
  {
    type: 'icon',
    name: 'TypeScript',
    categoryKey: 'engineering',
    path: siTypescript.path
  },
  {
    type: 'icon',
    name: 'Prisma',
    categoryKey: 'orm',
    path: siPrisma.path
  },
  {
    type: 'icon',
    name: 'PostgreSQL',
    categoryKey: 'database',
    path: siPostgresql.path
  },
  {
    type: 'icon',
    name: 'Vercel',
    categoryKey: 'deployment',
    path: siVercel.path
  }
];

const connectedBrands: TechnologyBrand[] = [
  {
    type: 'asset',
    name: 'OpenAI',
    categoryKey: 'ai',
    asset: '/brands/companies/openai.svg',
    width: 58
  },
  {
    type: 'icon',
    name: 'Gemini',
    categoryKey: 'ai',
    path: siGooglegemini.path
  },
  {
    type: 'asset',
    name: 'Paystack',
    categoryKey: 'payments',
    asset: '/brands/companies/paystack.svg',
    width: 70
  },
  {
    type: 'icon',
    name: 'Stripe',
    categoryKey: 'payments',
    path: siStripe.path
  },
  {
    type: 'icon',
    name: 'GitHub',
    categoryKey: 'development',
    path: siGithub.path
  },
  {
    type: 'icon',
    name: 'Cloudflare',
    categoryKey: 'infrastructure',
    path: siCloudflare.path
  }
];

function BrandMark({ brand }: { brand: TechnologyBrand }) {
  if (brand.type === 'asset') {
    return (
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-white px-2 shadow-sm">
        <Image
          src={brand.asset}
          alt=""
          aria-hidden="true"
          width={brand.width}
          height={22}
          className="max-h-[20px] w-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background/75 text-foreground/70 transition-[border-color,color,transform] duration-300 group-hover:scale-[1.04] group-hover:border-theme-accent/30 group-hover:text-theme-accent">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px] fill-current">
        <path d={brand.path} />
      </svg>
    </div>
  );
}

function BrandChip({ brand, category }: { brand: TechnologyBrand; category: string }) {
  return (
    <div
      className="
        group
        relative
        flex
        h-[66px]
        min-w-[174px]
        shrink-0
        items-center
        gap-3
        overflow-hidden
        rounded-[18px]
        border
        border-border/65
        bg-background/65
        px-3.5
        shadow-[0_8px_24px_rgb(0_0_0/0.025)]
        backdrop-blur-xl
        transition-[background-color,border-color,box-shadow,transform]
        duration-300
        hover:-translate-y-px
        hover:border-theme-accent/25
        hover:bg-surface-raised
        hover:shadow-[0_12px_30px_rgb(0_0_0/0.055)]
      ">
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-[18%]
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-theme-accent/30
          to-transparent
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      <BrandMark brand={brand} />

      <div className="min-w-0">
        <p className="whitespace-nowrap text-[12px] font-semibold tracking-[-0.02em] text-foreground">
          {brand.name}
        </p>

        <p className="mt-0.5 whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.14em] text-muted">
          {category}
        </p>
      </div>
    </div>
  );
}

function TechnologySet({
  brands,
  categories,
  clone = false
}: {
  brands: TechnologyBrand[];
  categories: Record<TechnologyCategoryKey, string>;
  clone?: boolean;
}) {
  return (
    <div
      aria-hidden={clone ? true : undefined}
      className={['flex gap-3 pr-3', clone ? 'rcentz-technology-clone' : ''].join(' ')}>
      {brands.map(brand => (
        <BrandChip
          key={clone ? `${brand.name}-clone` : brand.name}
          brand={brand}
          category={categories[brand.categoryKey]}
        />
      ))}
    </div>
  );
}

function TechnologyRow({
  brands,
  direction,
  categories
}: {
  brands: TechnologyBrand[];
  direction: 'left' | 'right';
  categories: Record<TechnologyCategoryKey, string>;
}) {
  return (
    <div
      className="
        rcentz-technology-window
        relative
        overflow-hidden
      ">
      <div
        className={[
          'rcentz-technology-track',
          'flex w-max will-change-transform',

          direction === 'left' ? 'rcentz-technology-left' : 'rcentz-technology-right'
        ].join(' ')}>
        <TechnologySet brands={brands} categories={categories} />

        <TechnologySet brands={brands} categories={categories} clone />
      </div>
    </div>
  );
}

export async function HomeTechnologyEcosystem() {
  const t = await getTranslations('HomeTechnologyEcosystem');

  const categories: Record<TechnologyCategoryKey, string> = {
    framework: t('categories.framework'),
    interface: t('categories.interface'),
    engineering: t('categories.engineering'),
    orm: t('categories.orm'),
    database: t('categories.database'),
    deployment: t('categories.deployment'),
    ai: t('categories.ai'),
    payments: t('categories.payments'),
    development: t('categories.development'),
    infrastructure: t('categories.infrastructure')
  };

  return (
    <section className="relative border-t border-border py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[220px]
          w-[70%]
          -translate-x-1/2
          rounded-full
          bg-theme-accent-faint
          opacity-55
          blur-[100px]
        "
      />

      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-theme-accent" />

              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">{t('eyebrow')}</p>
            </div>

            <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-[-0.045em] text-foreground sm:text-3xl lg:text-[34px]">
              {t('title')}
            </h2>
          </div>

          <p className="max-w-md text-[13px] leading-6 text-muted">{t('description')}</p>
        </div>

        <div className="relative mx-auto mt-10 w-full max-w-[1040px] overflow-hidden rounded-[28px] border border-border bg-surface/45 py-5 shadow-[0_18px_50px_rgb(0_0_0/0.025)] backdrop-blur-sm sm:py-6">
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-theme-accent/25
              to-transparent
            "
          />

          <div className="space-y-3">
            <TechnologyRow brands={foundationBrands} direction="left" categories={categories} />

            <TechnologyRow brands={connectedBrands} direction="right" categories={categories} />
          </div>
        </div>
      </div>

      <style>{`
        .rcentz-technology-window {
          -webkit-mask-image:
            linear-gradient(
              to right,
              transparent 0%,
              black 6%,
              black 94%,
              transparent 100%
            );

          mask-image:
            linear-gradient(
              to right,
              transparent 0%,
              black 6%,
              black 94%,
              transparent 100%
            );
        }

        @keyframes rcentz-technology-left {
          from {
            transform:
              translate3d(
                0,
                0,
                0
              );
          }

          to {
            transform:
              translate3d(
                -50%,
                0,
                0
              );
          }
        }

        @keyframes rcentz-technology-right {
          from {
            transform:
              translate3d(
                -50%,
                0,
                0
              );
          }

          to {
            transform:
              translate3d(
                0,
                0,
                0
              );
          }
        }

        .rcentz-technology-left {
          animation:
            rcentz-technology-left
            48s
            linear
            infinite;
        }

        .rcentz-technology-right {
          animation:
            rcentz-technology-right
            56s
            linear
            infinite;
        }

        @media (hover: hover) {
          .rcentz-technology-window:hover
          .rcentz-technology-track {
            animation-play-state:
              paused;
          }
        }

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .rcentz-technology-window {
            overflow-x: auto;

            -webkit-mask-image:
              none;

            mask-image: none;

            scrollbar-width:
              none;
          }

          .rcentz-technology-window::-webkit-scrollbar {
            display: none;
          }

          .rcentz-technology-track {
            animation: none;
            transform: none;
          }

          .rcentz-technology-clone {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
