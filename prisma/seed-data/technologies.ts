export type SeedProjectTechnology = {
  name: string;
  slug: string;
  icon?: string;

  category: string;
  description: string;

  purpose: string;
  rationale: string;

  sortOrder: number;
  featured?: boolean;
};

type TechnologyCatalogueEntry = {
  name: string;
  category: string;
  description: string;
};

export const technologyCatalogue = {
  nextjs: {
    name: 'Next.js',
    category: 'Application Framework',
    description:
      'Full-stack React framework used for application routing, rendering, server logic and product composition.'
  },

  react: {
    name: 'React',
    category: 'Interface Architecture',
    description:
      'Component-based interface library used to compose interactive and reusable application experiences.'
  },

  typescript: {
    name: 'TypeScript',
    category: 'Engineering Language',
    description:
      'Typed JavaScript language used to strengthen contracts between application data, components and server logic.'
  },

  prisma: {
    name: 'Prisma',
    category: 'Data Layer',
    description:
      'Typed data-access layer used to connect application logic to relational database models.'
  },

  postgresql: {
    name: 'PostgreSQL',
    category: 'Database',
    description:
      'Relational database used for durable, structured and relationship-heavy application data.'
  },

  'better-auth': {
    name: 'Better Auth',
    category: 'Authentication',
    description:
      'Authentication infrastructure used for accounts, credential flows, sessions and application identity.'
  },

  paystack: {
    name: 'Paystack',
    category: 'Payments',
    description:
      'Payment infrastructure used to connect customer transaction flows to the commerce application.'
  },

  cloudinary: {
    name: 'Cloudinary',
    category: 'Media Infrastructure',
    description:
      'Cloud media infrastructure used for storing, delivering and presenting application imagery and visual assets.'
  },

  'tailwind-css': {
    name: 'Tailwind CSS',
    category: 'Styling System',
    description:
      'Utility-driven styling system used for responsive layouts, reusable visual rules and interface composition.'
  },

  serwist: {
    name: 'Serwist',
    category: 'Progressive Web App',
    description:
      'Service-worker and progressive-web-app tooling used to extend the browser experience beyond a conventional website.'
  },

  openai: {
    name: 'OpenAI',
    category: 'Intelligence',
    description:
      'AI model infrastructure used to introduce governed intelligence and assistance into application workflows.'
  },

  resend: {
    name: 'Resend',
    category: 'Email Delivery',
    description:
      'Transactional email infrastructure used for application-generated communication and notifications.'
  },

  'shadcn-ui': {
    name: 'shadcn/ui',
    category: 'Component System',
    description:
      'Composable interface primitives used to build consistent application controls and management surfaces.'
  },

  recharts: {
    name: 'Recharts',
    category: 'Data Visualization',
    description:
      'React charting library used to present application and administrative data visually.'
  },

  'tanstack-table': {
    name: 'TanStack Table',
    category: 'Data Management',
    description:
      'Headless table engine used to structure rich, interactive and reusable tabular data experiences.'
  },

  'next-themes': {
    name: 'next-themes',
    category: 'Theming',
    description:
      'Theme-state infrastructure used to manage persistent light, dark and system appearance preferences.'
  },

  stripe: {
    name: 'Stripe',
    category: 'Payments',
    description:
      'Payment infrastructure for online transaction and billing workflows.'
  },

  vercel: {
    name: 'Vercel',
    category: 'Deployment',
    description:
      'Application hosting and deployment platform used for production Next.js delivery.'
  },

  github: {
    name: 'GitHub',
    category: 'Development',
    description:
      'Source-control and project-history platform used to manage application development and releases.'
  },

  neon: {
    name: 'Neon',
    category: 'Database Infrastructure',
    description:
      'Hosted PostgreSQL infrastructure designed for cloud application workloads.'
  },

  nodejs: {
    name: 'Node.js',
    category: 'Runtime',
    description:
      'JavaScript server runtime used to execute application and backend workloads.'
  }
} as const satisfies Record<string, TechnologyCatalogueEntry>;

export type TechnologySlug =
  keyof typeof technologyCatalogue;

type ProjectTechnologyContext = {
  purpose: string;
  rationale: string;
  sortOrder: number;

  featured?: boolean;
  icon?: string;

  /**
   * Optional project-specific overrides.
   * Usually the canonical catalogue values should be enough.
   */
  category?: string;
  description?: string;
};

export function projectTechnology(
  slug: TechnologySlug,
  context: ProjectTechnologyContext
): SeedProjectTechnology {
  const technology = technologyCatalogue[slug];

  return {
  name: technology.name,
  slug,

  ...(context.icon
    ? { icon: context.icon }
    : {}),

  category:
    context.category ??
    technology.category,

  description:
    context.description ??
    technology.description,

  purpose: context.purpose,
  rationale: context.rationale,
  sortOrder: context.sortOrder,
  featured:
    context.featured ?? false
    };
}