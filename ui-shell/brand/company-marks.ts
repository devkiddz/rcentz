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

type InlineCompanyMarkSource = {
  type: 'inline';

  path: string;
  hex: string;
};

type CompanyAssetSource = {
  type: 'asset';

  src: string;

  width: number;
  height: number;

  /*
   * Useful for monochrome assets such as
   * the current OpenAI mark, which is black.
   */
  invertOnDark?: boolean;
};

type CompanyThemeAssetSource = {
  type: 'theme-asset';

  lightSrc: string;
  darkSrc: string;

  width: number;
  height: number;
};

export type CompanyMarkSource =
  | InlineCompanyMarkSource
  | CompanyAssetSource
  | CompanyThemeAssetSource;

export type CompanyMarkDefinition = {
  label: string;

  /**
   * Used when matching database technology
   * names/slugs to the canonical company mark.
   */
  aliases: readonly string[];

  /**
   * Compact symbol intended for technology
   * chips, architecture maps, cards, etc.
   */
  mark: CompanyMarkSource;

  /**
   * Optional wider company wordmark/logo.
   *
   * Useful for actions such as:
   *
   * GitHub Repository
   * Vercel Deployment
   */
  logo?: CompanyMarkSource;

  /**
   * Canonical brand accent exposed as
   * --company-brand by CompanyMark.
   */
  brandColor: string;
};

/**
 * =========================================================
 * RCENTZ COMPANY / TECHNOLOGY MARK REGISTRY
 * =========================================================
 *
 * Company names are canonical here.
 *
 * Product surfaces consume this registry instead of
 * importing logo packages or hardcoding asset paths.
 */

export const companyMarks = {
  nextjs: {
    label: 'Next.js',

    aliases: [
      'nextjs',
      'next.js',
      'next-js'
    ],

    mark: {
      type: 'inline',

      path:
        siNextdotjs.path,

      hex:
        siNextdotjs.hex
    },

    brandColor:
      `#${siNextdotjs.hex}`
  },

  react: {
    label: 'React',

    aliases: [
      'react',
      'reactjs',
      'react.js',
      'react-js'
    ],

    mark: {
      type: 'inline',

      path:
        siReact.path,

      hex:
        siReact.hex
    },

    brandColor:
      `#${siReact.hex}`
  },

  typescript: {
    label: 'TypeScript',

    aliases: [
      'typescript',
      'type-script',
      'ts'
    ],

    mark: {
      type: 'inline',

      path:
        siTypescript.path,

      hex:
        siTypescript.hex
    },

    brandColor:
      `#${siTypescript.hex}`
  },

  prisma: {
    label: 'Prisma',

    aliases: [
      'prisma',
      'prisma-orm'
    ],

    mark: {
      type: 'inline',

      path:
        siPrisma.path,

      hex:
        siPrisma.hex
    },

    brandColor:
      `#${siPrisma.hex}`
  },

  postgresql: {
    label: 'PostgreSQL',

    aliases: [
      'postgresql',
      'postgres',
      'postgres-sql',
      'postgre-sql'
    ],

    mark: {
      type: 'inline',

      path:
        siPostgresql.path,

      hex:
        siPostgresql.hex
    },

    brandColor:
      `#${siPostgresql.hex}`
  },

  vercel: {
    label: 'Vercel',

    aliases: [
      'vercel'
    ],

    mark: {
      type: 'inline',

      path:
        siVercel.path,

      hex:
        siVercel.hex
    },

    logo: {
      type:
        'theme-asset',

      lightSrc:
        '/brands/companies/vercel-light.svg',

      darkSrc:
        '/brands/companies/vercel-dark.svg',

      width: 262,
      height: 58
    },

    brandColor:
      `#${siVercel.hex}`
  },

  github: {
    label: 'GitHub',

    aliases: [
      'github',
      'git-hub'
    ],

    mark: {
      type: 'inline',

      path:
        siGithub.path,

      hex:
        siGithub.hex
    },

    logo: {
      type:
        'theme-asset',

      lightSrc:
        '/brands/companies/github-light.svg',

      darkSrc:
        '/brands/companies/github-dark.svg',

      width: 416,
      height: 95
    },

    brandColor:
      `#${siGithub.hex}`
  },

  openai: {
    label: 'OpenAI',

    aliases: [
      'openai',
      'open-ai',
      'chatgpt',
      'chat-gpt'
    ],

    mark: {
      type: 'asset',

      src:
        '/brands/companies/openai.svg',

      width: 256,
      height: 260,

      invertOnDark: true
    },

    brandColor:
      '#000000'
  },

  gemini: {
    label: 'Gemini',

    aliases: [
      'gemini',
      'google-gemini',
      'googlegemini'
    ],

    mark: {
      type: 'inline',

      path:
        siGooglegemini.path,

      hex:
        siGooglegemini.hex
    },

    brandColor:
      `#${siGooglegemini.hex}`
  },

  paystack: {
    label: 'Paystack',

    aliases: [
      'paystack',
      'pay-stack'
    ],

    mark: {
      type: 'asset',

      src:
        '/brands/companies/paystack.svg',

      width: 612,
      height: 602
    },

    brandColor:
      '#0BA4DB'
  },

  stripe: {
    label: 'Stripe',

    aliases: [
      'stripe'
    ],

    mark: {
      type: 'inline',

      path:
        siStripe.path,

      hex:
        siStripe.hex
    },

    brandColor:
      `#${siStripe.hex}`
  },

  cloudflare: {
    label: 'Cloudflare',

    aliases: [
      'cloudflare',
      'cloud-flare'
    ],

    mark: {
      type: 'inline',

      path:
        siCloudflare.path,

      hex:
        siCloudflare.hex
    },

    brandColor:
      `#${siCloudflare.hex}`
  },

  apple: {
    label: 'Apple',

    aliases: [
      'apple'
    ],

    mark: {
      type:
        'theme-asset',

      lightSrc:
        '/brands/companies/apple-light.svg',

      darkSrc:
        '/brands/companies/apple-dark.svg',

      width: 324,
      height: 384
    },

    brandColor:
      '#000000'
  },

  playstore: {
    label:
      'Google Play',

    aliases: [
      'google-play',
      'google-play-store',
      'play-store',
      'playstore'
    ],

    mark: {
      type: 'asset',

      src:
        '/brands/companies/playstore.svg',

      width: 512,
      height: 512
    },

    brandColor:
      '#34A853'
  }
} as const satisfies Record<
  string,
  CompanyMarkDefinition
>;

export type CompanyMarkName =
  keyof typeof companyMarks;

/**
 * =========================================================
 * NORMALIZATION
 * =========================================================
 *
 * Database technology records may use:
 *
 * next-js
 * Next.js
 * NEXTJS
 * nextjs
 *
 * They must all resolve to one canonical mark.
 */

function normalizeCompanyValue(
  value: string
) {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      ''
    );
}

/**
 * Construct once when the module loads.
 */

const companyMarkLookup =
  new Map<
    string,
    CompanyMarkName
  >();

(
  Object.entries(
    companyMarks
  ) as [
    CompanyMarkName,
    CompanyMarkDefinition
  ][]
).forEach(
  ([
    company,
    definition
  ]) => {
    const candidates = [
      company,
      definition.label,
      ...definition.aliases
    ];

    candidates.forEach(
      candidate => {
        companyMarkLookup.set(
          normalizeCompanyValue(
            candidate
          ),
          company
        );
      }
    );
  }
);

/**
 * Resolve an arbitrary DB technology
 * name or slug into the canonical key.
 */
export function resolveCompanyMark(
  value:
    | string
    | null
    | undefined
): CompanyMarkName | null {
  if (!value) {
    return null;
  }

  return (
    companyMarkLookup.get(
      normalizeCompanyValue(
        value
      )
    ) ??
    null
  );
}

/**
 * Useful when the database provides
 * both slug and human-readable name.
 */
export function resolveTechnologyCompanyMark({
  slug,
  name
}: {
  slug?: string | null;
  name?: string | null;
}): CompanyMarkName | null {
  return (
    resolveCompanyMark(
      slug
    ) ??
    resolveCompanyMark(
      name
    )
  );
}