import { portfolioUISystemSeed } from './projects/portfolio-ui-system';

import {
  projectTechnology,
  type SeedProjectTechnology
} from './technologies';

export type {
  SeedProjectTechnology
} from './technologies';

export type SeedProjectType =
  | 'WEB_APP'
  | 'SAAS'
  | 'ECOMMERCE';

export type SeedProjectStatus =
  | 'DEVELOPMENT'
  | 'TESTING'
  | 'MAINTENANCE'
  | 'COMPLETED'
  | 'ON_HOLD';

export type SeedProjectVisibility =
  | 'PUBLIC'
  | 'UNLISTED';

export type SeedMilestoneStatus =
  | 'PLANNED'
  | 'IN_PROGRESS'
  | 'REVIEW'
  | 'COMPLETED';

export type SeedMilestonePriority =
  | 'LOW'
  | 'NORMAL'
  | 'HIGH'
  | 'CRITICAL';

export type SeedUpdateVisibility =
  | 'INTERNAL'
  | 'CLIENT'
  | 'PUBLIC';

export type SeedProjectPortfolio = {
  tagline: string;
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
  liveUrl?: string;
  repositoryUrl: string;
  featured: boolean;
  publishedAt?: string;
};

export type SeedProjectMilestone = {
  title: string;
  slug: string;
  description: string;
  purpose: string;
  expectedOutcome: string;
  status: SeedMilestoneStatus;
  priority: SeedMilestonePriority;
  visibility: SeedUpdateVisibility;
  sortOrder: number;
  startedAt?: string;
  completedAt?: string;
  gitCommitSha?: string;
  gitTag?: string;
  completionNotes?: string;
};

export type SeedProjectManifest = {
  name: string;
  slug: string;
  description: string;
  purpose: string;
  vision: string;
  expectedOutcome: string;
  type: SeedProjectType;
  status: SeedProjectStatus;
  visibility: SeedProjectVisibility;
  startedAt?: string;
  completedAt?: string;
  portfolio: SeedProjectPortfolio;
  technologies: SeedProjectTechnology[];
  milestones: SeedProjectMilestone[];
};

export const projectSeedManifest: SeedProjectManifest[] = [
  /* =======================================================
     AJ LOGIK
     ======================================================= */

  {
    name: 'AJ Logik',
    slug: 'aj-logik',

    description:
      'A production commerce platform focused on confectioneries, Kitchen Logik, wines, party experiences, customer shopping, vendor operations and commerce administration.',

    purpose:
      'Build a complete commerce experience rather than a conventional storefront, connecting discovery, shopping, accounts, vendors, payments, delivery, support and operational administration.',

    vision:
      'Create a reusable commerce engine capable of supporting specialized retail experiences while maintaining one coherent customer and operational system.',

    expectedOutcome:
      'Maintain AJ Logik as an operational commerce platform and as a proven architectural foundation for future Rcentz commerce systems.',

    type: 'ECOMMERCE',
    status: 'MAINTENANCE',
    visibility: 'PUBLIC',

    startedAt: '2026-06-05',

    portfolio: {
      tagline:
        'Commerce infrastructure shaped around food, kitchen, wine and party retail.',

      summary:
        'AJ Logik became the original large-scale Rcentz commerce system: a customer-facing marketplace backed by account, vendor, administration, payments, delivery, support and intelligence workflows.',

      challenge:
        'The product needed to grow beyond product cards and checkout into a connected operational system where discovery, customers, vendors, orders, delivery, support and administration could coexist without fragmenting the shopping experience.',

      solution:
        'The application evolved around Next.js, TypeScript, Prisma and PostgreSQL with Better Auth, Paystack, Cloudinary, progressive-web-app capabilities and dedicated commerce, support and intelligence layers.',

      outcome:
        'AJ Logik reached an operational and maintainable state with mature storefront, multi-vendor operations, product discovery, support and intelligent journey foundations. Current development is primarily stabilization, maintenance and continued refinement rather than foundational construction.',

      liveUrl:
        'https://ajlojik.vercel.app',

      repositoryUrl:
        'https://github.com/devkiddz/AJlojik',

      featured: true,
      publishedAt: '2026-07-22'
    },

    technologies: [
      projectTechnology('nextjs', {
        purpose:
          'Provides the primary application architecture for storefront routing, rendering, server-side application logic and the connected commerce experience.',

        rationale:
          'AJ Logik grew into a large customer and operational system. Next.js allowed the storefront and server-facing application flows to remain inside one cohesive product architecture.',

        sortOrder: 1,
        featured: true
      }),

      projectTechnology('react', {
        purpose:
          'Builds the interactive discovery, product, shopping, account and operational interface surfaces used throughout the commerce system.',

        rationale:
          'The project contains many reusable and stateful customer experiences, making a component-driven interface architecture important as the system expanded.',

        sortOrder: 2
      }),

      projectTechnology('typescript', {
        purpose:
          'Defines safer contracts across products, users, commerce flows, server logic, providers and intelligence features.',

        rationale:
          'As AJ Logik became more interconnected, explicit types reduced ambiguity between application layers and made large refactors safer.',

        sortOrder: 3
      }),

      projectTechnology('prisma', {
        purpose:
          'Provides typed access to the relational models behind catalogue, customers, commerce and operational workflows.',

        rationale:
          'AJ Logik required a structured data layer that could evolve with a large relational domain while remaining strongly connected to TypeScript.',

        sortOrder: 4,
        featured: true
      }),

      projectTechnology('postgresql', {
        purpose:
          'Stores the durable relational data behind customers, products, commerce operations and connected application records.',

        rationale:
          'Commerce is relationship-heavy and transactional. PostgreSQL provides a reliable relational foundation instead of treating application data as disconnected documents.',

        sortOrder: 5,
        featured: true
      }),

      projectTechnology('better-auth', {
        purpose:
          'Provides account, credential and session infrastructure for authenticated customer and application experiences.',

        rationale:
          'The system required authentication that could remain compatible with custom Rcentz interfaces and server-enforced application behavior rather than forcing a hosted authentication interface.',

        sortOrder: 6,
        featured: true
      }),

      projectTechnology('paystack', {
        purpose:
          'Connects customer checkout and payment activity to the commerce application.',

        rationale:
          'AJ Logik required payment infrastructure suitable for its commerce environment while keeping transaction handling integrated with the wider order experience.',

        sortOrder: 7
      }),

      projectTechnology('cloudinary', {
        purpose:
          'Supports product imagery and other media used throughout the visual commerce experience.',

        rationale:
          'A product-heavy application benefits from separating media delivery from the core application runtime instead of treating uploaded imagery as local application files.',

        sortOrder: 8
      }),

      projectTechnology('tailwind-css', {
        purpose:
          'Builds the responsive storefront, discovery surfaces and supporting application interfaces.',

        rationale:
          'The system needed fast visual iteration while preserving reusable spacing, responsive behavior and interface consistency across many surfaces.',

        sortOrder: 9
      }),

      projectTechnology('serwist', {
        purpose:
          'Adds progressive-web-app and service-worker capabilities to the browser experience.',

        rationale:
          'AJ Logik is strongly mobile-oriented, so progressive-web-app behavior provides a more application-like experience without requiring a separate native client.',

        sortOrder: 10
      }),

      projectTechnology('openai', {
        purpose:
          'Powers governed commerce intelligence and assistance capabilities inside structured shopping journeys.',

        rationale:
          'Intelligence was designed as part of the commerce architecture rather than an isolated chatbot, requiring a model layer capable of participating in contextual product and assistance workflows.',

        sortOrder: 11
      })
    ],

    milestones: [
      {
        title:
          'Storefront Experience',

        slug:
          'storefront-experience',

        description:
          'Completed the principal AJ Logik storefront experience and established the visual shopping surface used by the wider commerce system.',

        purpose:
          'Turn the initial commerce foundation into a coherent customer-facing marketplace experience.',

        expectedOutcome:
          'A deployable storefront capable of presenting AJ Logik as a complete shopping product rather than an application scaffold.',

        status: 'COMPLETED',
        priority: 'HIGH',
        visibility: 'PUBLIC',
        sortOrder: 1,

        completedAt:
          '2026-07-22',

        gitCommitSha:
          '19f6d9f7d63340b74acf7c791304b364f6428564',

        completionNotes:
          'Git milestone: feat: complete cinematic AJ Logik storefront homepage.'
      },

      {
        title:
          'Multi-Vendor Commerce Operations',

        slug:
          'multi-vendor-commerce-operations',

        description:
          'Stabilized operational commerce flows and expanded the system around multi-vendor responsibilities.',

        purpose:
          'Move AJ Logik beyond single-store commerce toward reusable marketplace operations.',

        expectedOutcome:
          'Stable operational foundations capable of supporting vendors alongside central commerce administration.',

        status: 'COMPLETED',
        priority: 'CRITICAL',
        visibility: 'PUBLIC',
        sortOrder: 2,

        completedAt:
          '2026-07-31',

        gitCommitSha:
          '179159dd47c795b177eb3f5abb8c501c04eb1bbf',

        completionNotes:
          'Git milestone: feat: stabilize operations and multi-vendor commerce.'
      },

      {
        title:
          'Commerce Intelligence Foundation',

        slug:
          'commerce-intelligence-foundation',

        description:
          'Established the Rcentz intelligence foundation inside AJ Logik for governed commerce assistance and richer product interactions.',

        purpose:
          'Introduce intelligence as part of the commerce architecture instead of treating AI as an isolated chat feature.',

        expectedOutcome:
          'A reusable intelligence foundation capable of participating in structured shopping and assistance flows.',

        status: 'COMPLETED',
        priority: 'HIGH',
        visibility: 'PUBLIC',
        sortOrder: 3,

        completedAt:
          '2026-08-02',

        gitCommitSha:
          'f403d3f09dd991942e1df80bba8dbc05ef105734',

        completionNotes:
          'Git milestone: feat(intelligence): complete MS10 RCENTZ Intelligence foundation.'
      },

      {
        title:
          'Communication and Support',

        slug:
          'communication-and-support',

        description:
          'Completed the communication and support milestone that connected assistance workflows to the wider commerce system.',

        purpose:
          'Provide structured help and communication beyond a simple contact form.',

        expectedOutcome:
          'A support architecture able to guide customers while remaining connected to application context.',

        status: 'COMPLETED',
        priority: 'HIGH',
        visibility: 'PUBLIC',
        sortOrder: 4,

        completedAt:
          '2026-08-02',

        gitCommitSha:
          '133ad46889b0d12cd480bb0865d9d92ea4fc2a90',

        completionNotes:
          'Git milestone: merge: complete MS11 communication and support.'
      },

      {
        title:
          'Living Intelligence Journeys',

        slug:
          'living-intelligence-journeys',

        description:
          'Introduced persisted journey state, governed plan history, clarification authority, marketplace resolution and contextual shopping guidance.',

        purpose:
          'Allow commerce intelligence to maintain useful context across a structured customer journey.',

        expectedOutcome:
          'A shopping assistant capable of participating in governed, persistent and product-aware journeys.',

        status: 'COMPLETED',
        priority: 'HIGH',
        visibility: 'PUBLIC',
        sortOrder: 5,

        completedAt:
          '2026-08-05',

        gitCommitSha:
          '0f7f00f258fe3fc72837845a8bf33cd1ae57d73f',

        completionNotes:
          'Git milestone: feat(ai): complete MS12 living intelligence journey system.'
      },

      {
        title:
          'Product and Discovery Experience',

        slug:
          'product-and-discovery-experience',

        description:
          'Finalized the product page and Discovery Hub navigation after the wider discovery and featured-product enrichment work.',

        purpose:
          'Make product exploration a structured experience rather than a flat catalogue.',

        expectedOutcome:
          'Customers can move between discovery, product context and shopping actions through a coherent navigation model.',

        status: 'COMPLETED',
        priority: 'HIGH',
        visibility: 'PUBLIC',
        sortOrder: 6,

        completedAt:
          '2026-08-05',

        gitCommitSha:
          'a5cf2901f8dd76987076649dba2c3dff72b5f4c2',

        completionNotes:
          'Git milestone: feat: finalize product page and discovery hub navigation.'
      },

      {
        title:
          'Production Runtime Stabilization',

        slug:
          'production-runtime-stabilization',

        description:
          'Aligned Neon database authority and reduced runtime query pressure after the major commerce capabilities were established.',

        purpose:
          'Improve operational reliability and prepare the mature system for continued maintenance.',

        expectedOutcome:
          'A more stable production runtime with clearer database authority and reduced unnecessary query load.',

        status: 'COMPLETED',
        priority: 'CRITICAL',
        visibility: 'PUBLIC',
        sortOrder: 7,

        completedAt:
          '2026-08-07',

        gitCommitSha:
          'be05b89153c47ab6da8ba91d9e4b7f3378184897',

        completionNotes:
          'Current AJ Logik direction moved from foundational construction into stabilization, maintenance and incremental improvement.'
      }
    ]
  },

  /* =======================================================
     SHELSEA COMMERCE
     ======================================================= */

  {
    name:
      'Shelsea Commerce',

    slug:
      'shelsea-commerce',

    description:
      'A completed single-vendor fashion and lifestyle commerce platform focused on apparel, perfumes, beauty and related retail products.',

    purpose:
      'Demonstrate that the commerce architecture developed through AJ Logik could be adapted to a different retail identity and product vertical.',

    vision:
      'Provide a focused branded storefront while preserving the reusable commerce capabilities underneath the customer experience.',

    expectedOutcome:
      'Deliver a complete fashion, beauty and lifestyle storefront built from a reusable commerce foundation rather than restarting the application architecture.',

    type: 'ECOMMERCE',
    status: 'COMPLETED',
    visibility: 'PUBLIC',

    startedAt:
      '2026-08-05',

    completedAt:
      '2026-08-07T23:16:54+01:00',

    portfolio: {
      tagline:
        'A reusable commerce engine re-shaped for fashion, beauty and lifestyle retail.',

      summary:
        'Shelsea Commerce demonstrates vertical reuse: the architectural foundation developed through AJ Logik was adapted into a focused single-vendor fashion and beauty storefront.',

      challenge:
        'Reuse a large commerce foundation without making the new product feel like a renamed copy of its predecessor.',

      solution:
        'Retain the underlying Next.js, Prisma, authentication, payments and commerce architecture while adapting catalogue presentation, product discovery and storefront behavior around fashion, apparel, perfumes and beauty.',

      outcome:
        'The dedicated single-vendor storefront was completed and deployed, validating that the same commerce foundation could support a substantially different retail presentation and business identity.',

      liveUrl:
        'https://shelsea.vercel.app',

      repositoryUrl:
        'https://github.com/devkiddz/shelsea-commerce',

      featured: true,

      publishedAt:
        '2026-08-07'
    },

    technologies: [
      projectTechnology('nextjs', {
        purpose:
          'Provides the primary application and storefront architecture for the Shelsea commerce experience.',

        rationale:
          'Using the same proven application foundation made it possible to adapt the commerce architecture to a new retail identity without rebuilding the product from zero.',

        sortOrder: 1,
        featured: true
      }),

      projectTechnology('react', {
        purpose:
          'Composes the catalogue, product, shopping and customer-facing interface experiences.',

        rationale:
          'Reusable components made it possible to reshape the visual retail experience while retaining proven commerce behavior underneath.',

        sortOrder: 2
      }),

      projectTechnology('typescript', {
        purpose:
          'Maintains typed contracts while shared commerce foundations are adapted to Shelsea-specific product experiences.',

        rationale:
          'Strong typing helped preserve application integrity while substantial parts of the underlying architecture were being reused and restyled.',

        sortOrder: 3
      }),

      projectTechnology('prisma', {
        purpose:
          'Connects the application to structured customer, catalogue and commerce data.',

        rationale:
          'The existing typed commerce data layer could be reused while the storefront identity and product catalogue changed.',

        sortOrder: 4,
        featured: true
      }),

      projectTechnology('postgresql', {
        purpose:
          'Stores persistent relational commerce and customer data for the storefront.',

        rationale:
          'The reused commerce domain still depends on durable relationships between products, users and transaction-oriented records.',

        sortOrder: 5
      }),

      projectTechnology('better-auth', {
        purpose:
          'Provides customer account and authenticated-session infrastructure.',

        rationale:
          'Reusing a proven authentication architecture preserved account functionality while allowing Shelsea to maintain its own customer-facing presentation.',

        sortOrder: 6,
        featured: true
      }),

      projectTechnology('paystack', {
        purpose:
          'Provides payment infrastructure for the storefront checkout experience.',

        rationale:
          'The existing payment integration allowed the commerce engine to retain proven transaction capabilities during the Shelsea adaptation.',

        sortOrder: 7,
        featured: true
      }),

      projectTechnology('cloudinary', {
        purpose:
          'Supports fashion, beauty and product imagery throughout the storefront.',

        rationale:
          'Shelsea is visually product-driven, making dedicated media delivery especially useful for a catalogue centered on apparel, perfumes and beauty.',

        sortOrder: 8
      }),

      projectTechnology('tailwind-css', {
        purpose:
          'Shapes Shelsea-specific responsive styling while working on top of the reusable application foundation.',

        rationale:
          'The styling layer could change substantially without requiring the underlying commerce architecture to be rewritten.',

        sortOrder: 9
      }),

      projectTechnology('serwist', {
        purpose:
          'Extends the storefront with progressive-web-app capabilities.',

        rationale:
          'The retail experience is highly suitable for mobile browsing, so PWA support preserves an application-oriented direction without requiring a separate mobile codebase.',

        sortOrder: 10
      })
    ],

    milestones: [
      {
        title:
          'Commerce Foundation Adaptation',

        slug:
          'commerce-foundation-adaptation',

        description:
          'Adapted the existing commerce foundation for the Shelsea product identity and single-vendor retail direction.',

        purpose:
          'Reuse proven commerce architecture while establishing an independent retail experience.',

        expectedOutcome:
          'A Shelsea-specific application foundation without rebuilding authentication, catalogue and commerce infrastructure from zero.',

        status: 'COMPLETED',
        priority: 'HIGH',
        visibility: 'PUBLIC',
        sortOrder: 1,

        completedAt:
          '2026-08-05',

        completionNotes:
          'The repository retains architectural lineage from AJ Logik while presenting a separate retail product.'
      },

      {
        title:
          'Product and Discovery Experience',

        slug:
          'product-and-discovery-experience',

        description:
          'Completed the product presentation and discovery navigation used by the final Shelsea storefront.',

        purpose:
          'Tailor product exploration to a fashion and lifestyle catalogue.',

        expectedOutcome:
          "A coherent browsing and product-detail experience suitable for Shelsea's retail identity.",

        status: 'COMPLETED',
        priority: 'HIGH',
        visibility: 'PUBLIC',
        sortOrder: 2,

        completedAt:
          '2026-08-05',

        gitCommitSha:
          'a5cf2901f8dd76987076649dba2c3dff72b5f4c2'
      },

      {
        title:
          'Single-Vendor Storefront Finalization',

        slug:
          'single-vendor-storefront-finalization',

        description:
          'Finalized Shelsea as a dedicated single-vendor storefront.',

        purpose:
          'Close the initial Shelsea implementation as a complete deployable commerce experience.',

        expectedOutcome:
          'A production-ready branded storefront representing the completed initial project scope.',

        status: 'COMPLETED',
        priority: 'CRITICAL',
        visibility: 'PUBLIC',
        sortOrder: 3,

        completedAt:
          '2026-08-07T23:16:54+01:00',

        gitCommitSha:
          'dab15e4dc5e8222a4ee02654e7ca256cf5b42a3d',

        completionNotes:
          'Git milestone explicitly records: feat: finalize Shelsea single-vendor storefront.'
      },

      {
        title:
          'Responsive Product Polish',

        slug:
          'responsive-product-polish',

        description:
          'Refined the mobile product-card presentation after storefront finalization.',

        purpose:
          'Complete the initial release with improved small-screen product presentation.',

        expectedOutcome:
          'Consistent storefront usability across desktop and mobile layouts.',

        status: 'COMPLETED',
        priority: 'NORMAL',
        visibility: 'PUBLIC',
        sortOrder: 4,

        completedAt:
          '2026-08-07',

        gitCommitSha:
          '9b56a4e2a2841821e2d8bc3d043b932fc7934bfa'
      }
    ]
  },

  /* =======================================================
     WAFFI MARKET
     ======================================================= */

  {
    name:
      'Waffi Market',

    slug:
      'waffi-market',

    description:
      'An in-development marketplace project intended to extend an existing Rcentz commerce foundation into a broader and more robust multi-vendor marketplace.',

    purpose:
      'Evolve reusable commerce infrastructure into a marketplace where multiple vendors can operate within a shared customer-facing ecosystem.',

    vision:
      'Develop a broader marketplace architecture without discarding the proven storefront and commerce foundations inherited from earlier Rcentz commerce work.',

    expectedOutcome:
      'Separate Waffi Market from its inherited baseline through dedicated vendor, marketplace, catalogue and operational workflows.',

    type: 'ECOMMERCE',
    status: 'DEVELOPMENT',
    visibility: 'PUBLIC',

    startedAt:
      '2026-08-08',

    portfolio: {
      tagline:
        'A broader multi-vendor marketplace direction built from an existing commerce foundation.',

      summary:
        'Waffi Market represents the next marketplace experiment in the commerce lineage. Its current pushed repository still closely mirrors the Shelsea foundation, while its intended product direction is a broader multi-vendor marketplace.',

      challenge:
        'The starting codebase already contains a mature commerce foundation, but Waffi must become architecturally and operationally distinct enough to support a broader marketplace rather than remain another single-vendor storefront.',

      solution:
        'Reuse the stable commerce base, then deliberately introduce Waffi-specific vendor onboarding, marketplace ownership, catalogue separation, operational controls and multi-vendor order responsibilities.',

      outcome:
        'The reusable foundation is established, but dedicated Waffi marketplace differentiation remains active development work. The project should not yet be presented as a completed multi-vendor implementation.',

      repositoryUrl:
        'https://github.com/devkiddz/waffi-market',

      featured: false
    },

    technologies: [
      projectTechnology('nextjs', {
        purpose:
          'Provides the inherited application foundation from which Waffi-specific marketplace workflows are being developed.',

        rationale:
          'Starting from an already functioning commerce application allows development effort to focus on genuine marketplace differentiation rather than rebuilding basic storefront infrastructure.',

        sortOrder: 1,
        featured: true
      }),

      projectTechnology('react', {
        purpose:
          'Provides the reusable storefront and interactive interface foundation inherited by the marketplace project.',

        rationale:
          'Existing component patterns can be retained while Waffi-specific vendor and marketplace interfaces are introduced progressively.',

        sortOrder: 2
      }),

      projectTechnology('typescript', {
        purpose:
          'Maintains typed contracts as the inherited commerce domain is extended toward marketplace-specific responsibilities.',

        rationale:
          'Marketplace differentiation introduces additional roles and relationships, making explicit application contracts increasingly important.',

        sortOrder: 3
      }),

      projectTechnology('prisma', {
        purpose:
          'Provides the current typed commerce data layer and the foundation for future Waffi-specific relational models.',

        rationale:
          "The inherited relational architecture can evolve toward vendor and marketplace responsibilities without replacing the application's data-access approach.",

        sortOrder: 4,
        featured: true
      }),

      projectTechnology('postgresql', {
        purpose:
          'Provides the persistent relational database behind the inherited commerce system.',

        rationale:
          'A future multi-vendor marketplace remains relationship-heavy, so the existing relational foundation is appropriate for continued evolution.',

        sortOrder: 5,
        featured: true
      }),

      projectTechnology('better-auth', {
        purpose:
          'Provides the existing account and session foundation upon which marketplace-specific identities can evolve.',

        rationale:
          'Keeping the authentication layer stable avoids rebuilding user identity while Waffi-specific authorization responsibilities are still being differentiated.',

        sortOrder: 6,
        featured: true
      }),

      projectTechnology('paystack', {
        purpose:
          'Preserves the payment integration already present in the inherited commerce foundation.',

        rationale:
          'Waffi can retain proven customer transaction infrastructure while marketplace-specific financial responsibilities are developed separately.',

        sortOrder: 7
      }),

      projectTechnology('cloudinary', {
        purpose:
          'Provides the existing media infrastructure for catalogue and marketplace imagery.',

        rationale:
          'The marketplace direction remains product-heavy and benefits from maintaining dedicated media delivery rather than coupling assets to the application runtime.',

        sortOrder: 8
      }),

      projectTechnology('tailwind-css', {
        purpose:
          'Supports responsive interface development while Waffi develops a distinct marketplace identity.',

        rationale:
          'The visual presentation can diverge substantially from the inherited storefront without forcing changes to the underlying commerce architecture.',

        sortOrder: 9
      })
    ],

    milestones: [
      {
        title:
          'Inherited Commerce Foundation',

        slug:
          'inherited-commerce-foundation',

        description:
          'Established Waffi Market from the reusable commerce foundation already proven through the earlier storefront projects.',

        purpose:
          'Begin from a functioning commerce architecture rather than rebuilding foundational storefront infrastructure.',

        expectedOutcome:
          'A stable technical baseline ready for Waffi-specific marketplace development.',

        status: 'COMPLETED',
        priority: 'NORMAL',
        visibility: 'PUBLIC',
        sortOrder: 1,

        completedAt:
          '2026-08-08',

        completionNotes:
          'The current pushed repository still shares substantial code, package identity and schema lineage with Shelsea Commerce. This milestone records foundation reuse, not Waffi-specific marketplace completion.'
      },

      {
        title:
          'Waffi Marketplace Differentiation',

        slug:
          'waffi-marketplace-differentiation',

        description:
          'Develop Waffi-specific multi-vendor workflows and separate the product from its inherited single-vendor baseline.',

        purpose:
          'Turn the inherited commerce application into an independently identifiable marketplace system.',

        expectedOutcome:
          'Dedicated vendor onboarding, marketplace operations and multi-vendor commerce behavior that can be demonstrated independently of Shelsea.',

        status: 'PLANNED',
        priority: 'CRITICAL',
        visibility: 'PUBLIC',
        sortOrder: 2,

        completionNotes:
          'No pushed Git milestone currently proves this marketplace-specific divergence, so it remains deliberately recorded as future execution work.'
      }
    ]
  },

  /* =======================================================
     JOBRCENTZ
     ======================================================= */

  {
    name:
      'JobRcentz',

    slug:
      'job-rcentz',

    description:
      'A role-driven job marketplace connecting job seekers and employers through profiles, jobs, applications, interviews, messaging, notifications and portfolio workflows.',

    purpose:
      'Build a production-style employment platform where candidates and employers operate through distinct but connected application workflows.',

    vision:
      'Create a job marketplace that extends beyond listings into candidate identity, employer operations, application management, interview workflows and communication.',

    expectedOutcome:
      'Complete final workflow audits and production-readiness work around an already substantial job-board application.',

    type: 'WEB_APP',
    status: 'TESTING',
    visibility: 'PUBLIC',

    startedAt:
      '2026-08-15',

    portfolio: {
      tagline:
        'A multi-sided job marketplace built around real candidate and employer workflows.',

      summary:
        'JobRcentz grew from a job-board exercise into a substantial role-driven application with job-seeker and employer onboarding, jobs, applications, company and candidate profiles, interviews, messaging, notifications, portfolios and administration.',

      challenge:
        'A useful employment platform requires significantly more than publishing vacancies: employers and job seekers need different identities, navigation, permissions and lifecycle actions while still sharing jobs, applications, interviews and communication.',

      solution:
        'The system was structured with role-aware application surfaces, Prisma-backed domain models, Better Auth, dedicated server actions, candidate and company profiles, application lifecycle handling, interview management, messaging and notifications.',

      outcome:
        'The principal job-marketplace workflows are implemented and production builds have repeatedly passed. The project is now better described as being in testing and final audit rather than early development.',

      liveUrl:
        'https://job-rcentz.vercel.app',

      repositoryUrl:
        'https://github.com/devkiddz/JobRcentz',

      featured: true,

      publishedAt:
        '2026-08-23'
    },

    technologies: [
      projectTechnology('nextjs', {
        purpose:
          'Provides the application architecture for public jobs, authenticated dashboards and role-specific candidate and employer workflows.',

        rationale:
          'JobRcentz combines public discovery with substantial authenticated application behavior, making one full-stack application architecture useful across both surfaces.',

        sortOrder: 1,
        featured: true
      }),

      projectTechnology('react', {
        purpose:
          'Builds interactive job, profile, dashboard, application, interview and messaging experiences.',

        rationale:
          'Candidates and employers interact with many stateful workflows, making reusable interactive components central to the product.',

        sortOrder: 2
      }),

      projectTechnology('typescript', {
        purpose:
          'Defines safer contracts across roles, profiles, jobs, applications, interviews and server-side actions.',

        rationale:
          'Role-dependent behavior becomes difficult to maintain when data contracts are implicit, so TypeScript helps protect boundaries as the application grows.',

        sortOrder: 3
      }),

      projectTechnology('prisma', {
        purpose:
          'Provides typed access to jobs, users, companies, candidate profiles, applications and hiring workflow data.',

        rationale:
          'The employment domain contains many connected records and lifecycle states, making a typed relational data layer valuable.',

        sortOrder: 4,
        featured: true
      }),

      projectTechnology('postgresql', {
        purpose:
          'Stores durable relational data across candidate, employer and hiring workflows.',

        rationale:
          'Jobs, applications, companies, interviews and users naturally form a relationship-heavy domain that fits a relational database.',

        sortOrder: 5,
        featured: true
      }),

      projectTechnology('better-auth', {
        purpose:
          'Provides authenticated user identity and sessions underneath role-aware job-seeker and employer experiences.',

        rationale:
          'The application required custom role-specific interfaces while retaining server-enforced account identity and authentication boundaries.',

        sortOrder: 6,
        featured: true
      }),

      projectTechnology('cloudinary', {
        purpose:
          'Supports uploaded visual assets associated with candidate, company and portfolio-oriented presentation.',

        rationale:
          'User-managed media benefits from dedicated storage and delivery rather than being tied directly to the application runtime.',

        sortOrder: 7
      }),

      projectTechnology('resend', {
        purpose:
          'Supports transactional communication generated by employment and account workflows.',

        rationale:
          'A job marketplace needs application communication to extend beyond the active browser session, making dedicated email delivery useful for contextual notifications.',

        sortOrder: 8
      }),

      projectTechnology('tailwind-css', {
        purpose:
          'Builds responsive public pages and distinct role-specific dashboard interfaces.',

        rationale:
          'JobRcentz contains many surfaces with different information densities, making a consistent responsive styling system important.',

        sortOrder: 9
      }),

      projectTechnology('shadcn-ui', {
        purpose:
          'Provides reusable interactive primitives for forms, dialogs, navigation and dashboard controls.',

        rationale:
          'Role-driven workflows repeatedly need consistent interaction patterns, so composable UI primitives reduce unnecessary reinvention.',

        sortOrder: 10
      })
    ],

    milestones: [
      {
        title:
          'Role-Based Onboarding Foundation',

        slug:
          'role-based-onboarding-foundation',

        description:
          'Established the JobRcentz onboarding foundation for role-specific candidate and employer identities.',

        purpose:
          'Give users an application identity appropriate to how they participate in the employment marketplace.',

        expectedOutcome:
          'Job seekers and employers can enter the system through distinct profile and onboarding workflows.',

        status: 'COMPLETED',
        priority: 'CRITICAL',
        visibility: 'PUBLIC',
        sortOrder: 1,

        completedAt:
          '2026-08-16',

        gitCommitSha:
          '2030743e530ee54a6377d9847b947c064622310a',

        completionNotes:
          'Git milestone: feat: complete Job Rcentz onboarding foundation.'
      },

      {
        title:
          'Employer Dashboard and Company Profile',

        slug:
          'employer-dashboard-company-profile',

        description:
          'Completed the employer dashboard navigation and company profile editing foundation.',

        purpose:
          'Give employers a dedicated operational workspace rather than exposing generic account screens.',

        expectedOutcome:
          'Employers can navigate their role-specific workspace and manage business-facing profile information.',

        status: 'COMPLETED',
        priority: 'HIGH',
        visibility: 'PUBLIC',
        sortOrder: 2,

        completedAt:
          '2026-08-18',

        gitCommitSha:
          'a7585a717339bca5e608f84ad5ee47773904e427',

        completionNotes:
          'Git milestone: Complete dashboard navigation and company profile editor.'
      },

      {
        title:
          'Interview Management',

        slug:
          'interview-management',

        description:
          'Built and repeatedly stabilized the employer interview workflow, including scheduling, tasks, notes, state transitions and interview actions.',

        purpose:
          'Extend applications into a structured hiring workflow rather than ending the product at application submission.',

        expectedOutcome:
          'Employers can move qualified candidates into managed interview workflows with supporting actions and records.',

        status: 'COMPLETED',
        priority: 'CRITICAL',
        visibility: 'PUBLIC',
        sortOrder: 3,

        completedAt:
          '2026-08-21',

        gitCommitSha:
          '6ce7014b65f119c4baedb9fcaf73f04ea80072e9',

        completionNotes:
          'The interview workflow progressed through schema, scheduling, workspace, task, notes and UX stabilization phases with TypeScript and production-build validation.'
      },

      {
        title:
          'Messaging and Notifications',

        slug:
          'messaging-and-notifications',

        description:
          'Connected candidate/employer communication with application notifications and dashboard notification experiences.',

        purpose:
          'Allow employment activity to generate meaningful communication rather than forcing users outside the platform.',

        expectedOutcome:
          'Users can communicate and receive contextual application activity within their role-specific workspace.',

        status: 'COMPLETED',
        priority: 'HIGH',
        visibility: 'PUBLIC',
        sortOrder: 4,

        completedAt:
          '2026-08-20',

        gitCommitSha:
          '5c7d93cf484dace10279765fef3f8b651c0acf9d',

        completionNotes:
          'Git milestone: Complete notification candidate and messaging phase.'
      },

      {
        title:
          'Job Seeker Dashboard and Portfolio',

        slug:
          'job-seeker-dashboard-and-portfolio',

        description:
          'Expanded the job-seeker experience around dashboard navigation, structured profile information and portfolio-related application surfaces.',

        purpose:
          'Turn the candidate account into a professional employment identity rather than a minimal applicant record.',

        expectedOutcome:
          'Candidates have a richer dashboard/profile foundation suitable for applications, portfolio presentation and employer discovery.',

        status: 'COMPLETED',
        priority: 'HIGH',
        visibility: 'PUBLIC',
        sortOrder: 5,

        completedAt:
          '2026-08-23',

        gitCommitSha:
          '8e902e709f31950fd7a809c694440663c0aab7de',

        completionNotes:
          'This checkpoint records the tested application state after the candidate dashboard and portfolio work was integrated.'
      },

      {
        title:
          'Production Readiness and Final Audit',

        slug:
          'production-readiness-final-audit',

        description:
          'Review remaining role workflows, authorization boundaries, lifecycle edge cases, media ownership and application data integrity before treating the product as complete.',

        purpose:
          'Close remaining implementation and consistency gaps across an otherwise mature job marketplace.',

        expectedOutcome:
          'A fully audited JobRcentz release suitable for transition from testing into completed or maintenance state.',

        status: 'REVIEW',
        priority: 'CRITICAL',
        visibility: 'PUBLIC',
        sortOrder: 6,

        startedAt:
          '2026-08-21',

        completionNotes:
          'The application is deployed and substantial workflows are operational, but repository history still identifies final employer/job-seeker, authorization and data-integrity audit work.'
      }
    ]
  },

  /* =======================================================
     NOVASHAD V01
     ======================================================= */

  {
    name:
      'NovaShad v01',

    slug:
      'novashad-v01',

    description:
      'A modular administration dashboard UI system focused on reusable data-heavy layouts, visual analytics, user management surfaces and persistent theming.',

    purpose:
      'Develop a reusable dashboard frontend architecture for administration and management-oriented applications.',

    vision:
      'Create a structured dashboard foundation that can later inspire larger business-management systems without coupling the first version to a backend.',

    expectedOutcome:
      'Complete a stable frontend dashboard system demonstrating reusable components, responsive administration layouts, charts, tables and theme handling.',

    type: 'WEB_APP',
    status: 'COMPLETED',
    visibility: 'PUBLIC',

    startedAt:
      '2026-05-13',

    completedAt:
      '2026-05-15',

    portfolio: {
      tagline:
        'A modular dashboard system for data-heavy administration interfaces.',

      summary:
        'NovaShad v01 is a frontend dashboard case study built around reusable administrative components, analytics visualization, user/payment surfaces and persistent themes.',

      challenge:
        'Administrative applications need to present dense information without becoming visually chaotic or forcing every page to reinvent its layout and interaction patterns.',

      solution:
        'Build a reusable Next.js dashboard shell with shadcn/ui, Tailwind CSS, Recharts and TanStack Table around repeatable cards, navigation, charts and management surfaces.',

      outcome:
        'The original v01 dashboard scope was completed and production-stabilized. A future full business-management suite would be a new evolution of the concept rather than unfinished work inside this version.',

      liveUrl:
        'https://novashad-v01.vercel.app',

      repositoryUrl:
        'https://github.com/devkiddz/novashad-v01',

      featured: false,

      publishedAt:
        '2026-05-15'
    },

    technologies: [
      projectTechnology('nextjs', {
        purpose:
          'Provides the application shell and routing foundation for the modular administration dashboard.',

        rationale:
          'The dashboard needed a structured application framework capable of supporting multiple management surfaces within one reusable shell.',

        sortOrder: 1,
        featured: true
      }),

      projectTechnology('react', {
        purpose:
          'Composes reusable dashboard cards, management surfaces, navigation and data-focused interface components.',

        rationale:
          'The project was specifically exploring component reuse, making React central to how repeated administration patterns were structured.',

        sortOrder: 2
      }),

      projectTechnology('typescript', {
        purpose:
          'Provides typed component contracts across reusable dashboard and data-presentation primitives.',

        rationale:
          'Reusable administration components become easier to compose safely when their data and interaction contracts are explicit.',

        sortOrder: 3
      }),

      projectTechnology('tailwind-css', {
        purpose:
          'Provides responsive styling and layout composition throughout the dashboard system.',

        rationale:
          'Administrative interfaces require consistent spacing and dense responsive layouts, making a utility-based styling system useful for rapid composition.',

        sortOrder: 4
      }),

      projectTechnology('shadcn-ui', {
        purpose:
          'Provides reusable interface primitives underlying dashboard controls and administrative surfaces.',

        rationale:
          'Composable primitives made it possible to create consistent management interactions without building every control from scratch.',

        sortOrder: 5,
        featured: true
      }),

      projectTechnology('recharts', {
        purpose:
          'Presents dashboard analytics and numerical information through reusable visual charts.',

        rationale:
          'Visual analytics were part of the dashboard core purpose, requiring a charting layer that integrates naturally with React components.',

        sortOrder: 6,
        featured: true
      }),

      projectTechnology('tanstack-table', {
        purpose:
          'Structures rich administrative tables and reusable data-list experiences.',

        rationale:
          'Management applications frequently work with dense tabular data, so a headless table engine provided stronger behavior without dictating the presentation.',

        sortOrder: 7,
        featured: true
      }),

      projectTechnology('next-themes', {
        purpose:
          'Manages persistent light, dark and system theme behavior.',

        rationale:
          'Theme persistence was an explicit part of the dashboard experiment and needed to work consistently across the application shell.',

        sortOrder: 8
      })
    ],

    milestones: [
      {
        title:
          'Dashboard Component System',

        slug:
          'dashboard-component-system',

        description:
          'Established the reusable dashboard layout and its principal administrative visualization components.',

        purpose:
          'Create reusable presentation primitives for data-heavy administration interfaces.',

        expectedOutcome:
          'Dashboard pages can compose charts, cards, lists and management surfaces without rebuilding the application shell.',

        status: 'COMPLETED',
        priority: 'HIGH',
        visibility: 'PUBLIC',
        sortOrder: 1,

        completedAt:
          '2026-05-14'
      },

      {
        title:
          'Theme and Data Presentation',

        slug:
          'theme-and-data-presentation',

        description:
          'Integrated persistent theming and responsive data-visualization patterns across the dashboard.',

        purpose:
          'Improve usability and demonstrate reusable presentation behavior across different management views.',

        expectedOutcome:
          'A consistent dashboard experience across light, dark and system themes with responsive analytics presentation.',

        status: 'COMPLETED',
        priority: 'NORMAL',
        visibility: 'PUBLIC',
        sortOrder: 2,

        completedAt:
          '2026-05-15'
      },

      {
        title:
          'Production Stabilization',

        slug:
          'production-stabilization',

        description:
          'Resolved final dropdown behavior and stabilized the production build.',

        purpose:
          'Close the original dashboard UI scope with a deployable application.',

        expectedOutcome:
          'A stable production deployment representing the completed NovaShad v01 frontend system.',

        status: 'COMPLETED',
        priority: 'HIGH',
        visibility: 'PUBLIC',
        sortOrder: 3,

        completedAt:
          '2026-05-15',

        gitCommitSha:
          '2d95d50526707d52cd3100b47f2d8b95fac47964',

        completionNotes:
          'Git milestone: fix dropdown menu trigger and stabilize production build.'
      }
    ]
  },

  /* =======================================================
     NOVAPANEL V01
     ======================================================= */

  {
    name:
      'NovaPanel v01',

    slug:
      'novapanel-v01',

    description:
      'An early administration-dashboard prototype that preceded the more complete NovaShad dashboard system.',

    purpose:
      'Explore reusable dashboard composition, shared components, theming and administration-oriented navigation.',

    vision:
      'Use the prototype to establish dashboard patterns that could be refined into a stronger reusable administration system.',

    expectedOutcome:
      'Preserve NovaPanel as historical evidence of the dashboard architecture\'s early development while newer work continues through more mature descendants.',

    type: 'WEB_APP',
    status: 'ON_HOLD',
    visibility: 'UNLISTED',

    startedAt:
      '2026-05-11',

    portfolio: {
      tagline:
        'The early dashboard prototype that helped shape NovaShad.',

      summary:
        'NovaPanel v01 captures an earlier stage of the dashboard architecture: Next.js setup, shared shadcn components, theme switching, menu behavior and an emerging analytics layout.',

      challenge:
        'Establish a coherent dashboard structure while the reusable component strategy and management-interface patterns were still being explored.',

      solution:
        'Iteratively build the application shell, shared components, theme handling and dashboard presentation before carrying the stronger ideas forward into NovaShad.',

      outcome:
        'The prototype served its architectural-learning purpose. Development direction continued through NovaShad rather than turning NovaPanel v01 itself into the final dashboard product.',

      repositoryUrl:
        'https://github.com/devkiddz/NovaPanel-v01',

      featured: false
    },

    technologies: [
      projectTechnology('nextjs', {
        purpose:
          'Provided the original application shell used to explore reusable administration-dashboard patterns.',

        rationale:
          'The prototype needed enough application structure to experiment with routing, shared layout and dashboard composition before those ideas were refined further.',

        sortOrder: 1,
        featured: true
      }),

      projectTechnology('react', {
        purpose:
          'Provided the component model used to experiment with reusable dashboard interfaces.',

        rationale:
          'The primary architectural learning concerned reusable UI composition, making component-based development fundamental.',

        sortOrder: 2
      }),

      projectTechnology('typescript', {
        purpose:
          'Supported typed shared-component contracts during the dashboard prototype.',

        rationale:
          'Even at prototype stage, explicit component contracts made reusable dashboard primitives easier to evolve safely.',

        sortOrder: 3
      }),

      projectTechnology('tailwind-css', {
        purpose:
          'Provided the styling and layout system for the early dashboard shell.',

        rationale:
          'Fast layout iteration was important while dashboard structure and presentation patterns were still being explored.',

        sortOrder: 4
      }),

      projectTechnology('shadcn-ui', {
        purpose:
          'Provided shared UI primitives for the prototype navigation and dashboard controls.',

        rationale:
          'Using composable primitives helped move the prototype away from isolated one-off controls toward a reusable component system.',

        sortOrder: 5,
        featured: true
      })
    ],

    milestones: [
      {
        title:
          'Next.js and Shared UI Foundation',

        slug:
          'nextjs-shared-ui-foundation',

        description:
          'Established the Next.js application foundation and began consolidating shared shadcn-based components.',

        purpose:
          'Create a reusable structural foundation for the administration dashboard experiment.',

        expectedOutcome:
          'A maintainable dashboard codebase with shared UI rather than isolated page components.',

        status: 'COMPLETED',
        priority: 'NORMAL',
        visibility: 'INTERNAL',
        sortOrder: 1,

        completedAt:
          '2026-05-12',

        completionNotes:
          'Repository history records Next.js reinstallation, shared-component cleanup and shadcn integration during this phase.'
      },

      {
        title:
          'Theme and Navigation Prototype',

        slug:
          'theme-navigation-prototype',

        description:
          'Added theme switching and worked through menu and navigation behavior for the dashboard shell.',

        purpose:
          'Establish reusable shell interactions needed by administration interfaces.',

        expectedOutcome:
          'A functional themed dashboard prototype ready to inform a stronger successor.',

        status: 'COMPLETED',
        priority: 'NORMAL',
        visibility: 'INTERNAL',
        sortOrder: 2,

        completedAt:
          '2026-05-13',

        gitCommitSha:
          '541d875188b5036b6f1d13b39c156f33a2c22915',

        completionNotes:
          'NovaPanel was subsequently superseded in direction by the more complete NovaShad v01 dashboard system.'
      }
    ]
  },

  /* =======================================================
     RCENTZ CORE
     ======================================================= */

  {
    name:
      'Rcentz Core',

    slug:
      'rcentz-systems',

    description:
      'The current flagship Rcentz platform combining the public business presence with services, portfolio, project management, client operations, subscriptions, billing, commerce, support and future administration capabilities.',

    purpose:
      'Create one operational system where Rcentz can present its work, acquire clients, manage delivery, sell services and products, and operate the business from shared data.',

    vision:
      'Build Rcentz as a reusable modular business platform where public presentation and internal operations are two surfaces of the same system rather than disconnected applications.',

    expectedOutcome:
      'Deliver a production-oriented Rcentz platform whose database drives the public experience first and later becomes manageable through dedicated client and administration interfaces.',

    type: 'SAAS',
    status: 'DEVELOPMENT',
    visibility: 'PUBLIC',

    startedAt:
      '2026-08-31',

    portfolio: {
      tagline:
        'A living business platform where the portfolio and the operating system are the same product.',

      summary:
        'rcentz consolidates lessons from earlier commerce, dashboard and marketplace projects into one modular platform for public presentation, services, client projects, subscriptions, billing, commerce, support and business operations.',

      challenge:
        'A conventional portfolio can display previous work but cannot demonstrate how Rcentz actually structures projects, services, payments, client relationships and reusable product architecture.',

      solution:
        'Build the business itself as a modular Next.js application backed by Prisma and PostgreSQL, with project execution, service plans, billing, commerce and public portfolio data sharing one canonical domain model.',

      outcome:
        'The visual identity and shell are established, the database architecture is active, billing/subscription/crypto foundations are migrated, and real business/project data is now being introduced before the public database-driven website is built.',

      repositoryUrl:
        'https://github.com/devkiddz/rcentz',

      featured: true
    },

    technologies: [
      projectTechnology('nextjs', {
        purpose:
          'Provides the unified application architecture for Rcentz public presentation and its evolving operational application surfaces.',

        rationale:
          'Rcentz is intentionally one system rather than a public website disconnected from its backend operations, making a full-stack application framework central to the architecture.',

        sortOrder: 1,
        featured: true
      }),

      projectTechnology('react', {
        purpose:
          'Builds the reusable public, client and future administration interface systems.',

        rationale:
          'Rcentz is designed as a modular platform with reusable application engines and presentation components shared across many surfaces.',

        sortOrder: 2
      }),

      projectTechnology('typescript', {
        purpose:
          'Defines explicit contracts across the public website, project system, services, commerce, billing and future administration layers.',

        rationale:
          'A platform spanning many business domains needs strong contracts to keep modules independent without allowing their boundaries to become ambiguous.',

        sortOrder: 3
      }),

      projectTechnology('prisma', {
        purpose:
          'Provides typed access to the canonical Rcentz domain model across projects, services, subscriptions, commerce, billing and support.',

        rationale:
          'The architecture deliberately treats the database as the shared source of truth, requiring a strongly typed data layer between the application and PostgreSQL.',

        sortOrder: 4,
        featured: true
      }),

      projectTechnology('postgresql', {
        purpose:
          'Stores the canonical relational business data that drives both public presentation and operational application behavior.',

        rationale:
          'Rcentz connects users, projects, services, subscriptions, payments, commerce and communication through durable relationships, making relational storage foundational.',

        sortOrder: 5,
        featured: true
      }),

      projectTechnology('better-auth', {
        purpose:
          'Provides authentication and session infrastructure for the platform while authorization remains enforced by Rcentz application logic.',

        rationale:
          'The system needs custom public, client, staff and administration experiences without surrendering interface control to an external authentication UI.',

        sortOrder: 6,
        featured: true
      }),

      projectTechnology('tailwind-css', {
        purpose:
          'Implements the responsive Rcentz design system and theme-driven application surfaces.',

        rationale:
          'Rcentz requires one visual language that can scale from public presentation pages to dense operational interfaces without duplicating styling systems.',

        sortOrder: 7
      }),

      projectTechnology('shadcn-ui', {
        purpose:
          'Provides composable interface primitives for the evolving Rcentz component and application system.',

        rationale:
          'Reusable primitives support the wider goal of turning proven milestone components into an internal Rcentz system library rather than rebuilding controls for every feature.',

        sortOrder: 8
      })
    ],

    milestones: [
      {
        title:
          'M03 — Rcentz UI Canvas & Design System',

        slug:
          'm03-rcentz-ui-canvas-design-system',

        description:
          'Established the Rcentz visual identity, bounded application canvas and reusable visual shell.',

        purpose:
          'Create the visual and structural presentation foundation shared by future Rcentz application surfaces.',

        expectedOutcome:
          'A verified reusable UI canvas and design system capable of supporting public, client and administrative experiences.',

        status: 'COMPLETED',
        priority: 'HIGH',
        visibility: 'PUBLIC',
        sortOrder: 3,

        completedAt:
          '2026-08-31',

        gitCommitSha:
          'f880aa93f9423b7e572f6a424148332cfbc09252',

        gitTag:
          'm03-ui-canvas-v1',

        completionNotes:
          'Verified Rcentz milestone with an annotated Git tag marking the completed UI Canvas foundation.'
      },

      {
        title:
          'M04 — Database Foundation',

        slug:
          'm04-database-foundation',

        description:
          'Establish the canonical Rcentz database, migration history, authentication persistence, project hierarchy, service/subscription billing architecture and real starter data.',

        purpose:
          'Give every future public and operational application surface one durable source of truth.',

        expectedOutcome:
          'A verified production-oriented database foundation ready to drive the public Rcentz website and later administration interfaces.',

        status: 'IN_PROGRESS',
        priority: 'CRITICAL',
        visibility: 'PUBLIC',
        sortOrder: 4,

        startedAt:
          '2026-09-01',

        completionNotes:
          'Schema architecture, canonical migrations, subscriptions, invoicing, payments, crypto payment architecture and the official administrator seed are verified. Real project seeding is the current execution step.'
      }
    ]
  },

  /* =======================================================
     PORTFOLIO UI SYSTEM V0.1
     ======================================================= */

  portfolioUISystemSeed
] satisfies SeedProjectManifest[];