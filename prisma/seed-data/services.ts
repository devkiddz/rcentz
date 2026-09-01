export type SeedServiceProjectType =
  | "WEBSITE"
  | "WEB_APP"
  | "MOBILE_APP"
  | "SAAS"
  | "ECOMMERCE"
  | "MAINTENANCE"
  | "CONSULTING";

export type SeedServiceStatus = "ACTIVE";

export type SeedServiceCurrency = "NGN" | "USD";

export type SeedServicePrice = {
  currency: SeedServiceCurrency;
  priceFrom: number;
  priceTo: number;
};

export type SeedService = {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  type: SeedServiceProjectType;
  status: SeedServiceStatus;
  prices: SeedServicePrice[];
  featured: boolean;
};

export type SeedServiceCategory = {
  name: string;
  slug: string;
  description: string;
  services: SeedService[];
};

function prices(
  ngnFrom: number,
  ngnTo: number,
  usdFrom: number,
  usdTo: number,
): SeedServicePrice[] {
  return [
    {
      currency: "NGN",
      priceFrom: ngnFrom,
      priceTo: ngnTo,
    },
    {
      currency: "USD",
      priceFrom: usdFrom,
      priceTo: usdTo,
    },
  ];
}

export const serviceSeedManifest: SeedServiceCategory[] = [
  {
    name: "Web Development",
    slug: "web-development",
    description:
      "Professional websites and digital experiences ranging from focused campaign pages to full business websites and custom web applications.",
    services: [
      {
        name: "Business Website Development",
        slug: "business-website-development",
        shortDescription:
          "Professional websites built to present your business clearly and convert visitors into real enquiries.",
        description:
          "Design and develop a modern responsive business website around your company, services, brand and customer journey, with clean structure, performance and room for future expansion.",
        type: "WEBSITE",
        status: "ACTIVE",
        prices: prices(250000, 800000, 350, 1200),
        featured: false,
      },
      {
        name: "Custom Web Application Development",
        slug: "custom-web-application-development",
        shortDescription:
          "Purpose-built web applications designed around real business workflows.",
        description:
          "Architect and develop custom web applications with authentication, data, workflows, user roles, dashboards and business-specific functionality.",
        type: "WEB_APP",
        status: "ACTIVE",
        prices: prices(600000, 5000000, 900, 7500),
        featured: true,
      },
      {
        name: "Landing Page Development",
        slug: "landing-page-development",
        shortDescription:
          "Focused landing pages for advertisements, campaigns, launches and lead generation.",
        description:
          "Build a polished conversion-focused landing page for advertising campaigns, promotions, product launches, events, lead generation or targeted service marketing.",
        type: "WEBSITE",
        status: "ACTIVE",
        prices: prices(100000, 300000, 150, 450),
        featured: false,
      },
      {
        name: "Single Page Website",
        slug: "single-page-website",
        shortDescription:
          "A complete professional online presence delivered through one carefully structured page.",
        description:
          "Develop a responsive single-page website for businesses, professionals, campaigns or products that need a concise, modern and credible web presence.",
        type: "WEBSITE",
        status: "ACTIVE",
        prices: prices(120000, 280000, 175, 400),
        featured: false,
      },
      {
        name: "Static Website Development",
        slug: "static-website-development",
        shortDescription:
          "Fast and lightweight websites for organisations that do not require complex backend functionality.",
        description:
          "Build responsive static websites for companies, organisations, informational projects and professional brands with strong performance and clean presentation.",
        type: "WEBSITE",
        status: "ACTIVE",
        prices: prices(150000, 500000, 225, 750),
        featured: false,
      },
      {
        name: "Portfolio Website Development",
        slug: "portfolio-website-development",
        shortDescription:
          "Professional portfolio websites that make your work, experience and capabilities easy to trust.",
        description:
          "Design and develop portfolio experiences for professionals, creatives, developers and businesses, presenting projects, achievements, services and professional identity across desktop and mobile.",
        type: "WEBSITE",
        status: "ACTIVE",
        prices: prices(150000, 450000, 225, 650),
        featured: false,
      },
    ],
  },

  {
    name: "WordPress",
    slug: "wordpress",
    description:
      "Professional WordPress development, redesign, repair and modernization for businesses that need flexible content management.",
    services: [
      {
        name: "WordPress Website Development",
        slug: "wordpress-website-development",
        shortDescription:
          "Modern WordPress websites built for businesses that want easy content management.",
        description:
          "Develop a responsive WordPress website with appropriate themes, plugins, page structure, business presentation and maintainable content-management capabilities.",
        type: "WEBSITE",
        status: "ACTIVE",
        prices: prices(180000, 650000, 250, 950),
        featured: false,
      },
      {
        name: "WordPress Business Website",
        slug: "wordpress-business-website",
        shortDescription:
          "A professional WordPress presence for companies and service businesses.",
        description:
          "Build a complete business-focused WordPress website covering company presentation, services, enquiries, contact flows and maintainable content management.",
        type: "WEBSITE",
        status: "ACTIVE",
        prices: prices(220000, 750000, 300, 1100),
        featured: false,
      },
      {
        name: "WordPress Landing Page",
        slug: "wordpress-landing-page",
        shortDescription:
          "Conversion-focused WordPress pages for advertisements and marketing campaigns.",
        description:
          "Create dedicated WordPress landing pages for advertisements, promotions, lead capture, events, launches and targeted products or services.",
        type: "WEBSITE",
        status: "ACTIVE",
        prices: prices(90000, 250000, 125, 375),
        featured: false,
      },
      {
        name: "WordPress Redesign",
        slug: "wordpress-redesign",
        shortDescription:
          "Give an ageing WordPress website a cleaner, faster and more professional experience.",
        description:
          "Redesign and restructure an existing WordPress website to improve visual quality, responsive behaviour, usability, information hierarchy and overall professionalism.",
        type: "WEBSITE",
        status: "ACTIVE",
        prices: prices(150000, 500000, 225, 750),
        featured: false,
      },
      {
        name: "WordPress Repair & Maintenance",
        slug: "wordpress-repair-maintenance",
        shortDescription:
          "Repair broken WordPress sites, plugins, themes, layouts and common website problems.",
        description:
          "Diagnose and resolve WordPress theme, plugin, layout, configuration, responsive and general website issues while improving stability where appropriate.",
        type: "MAINTENANCE",
        status: "ACTIVE",
        prices: prices(40000, 250000, 60, 350),
        featured: false,
      },
      {
        name: "WordPress to Next.js Migration",
        slug: "wordpress-to-nextjs-migration",
        shortDescription:
          "Move suitable WordPress websites into a faster and more modern application architecture.",
        description:
          "Assess and migrate an appropriate WordPress website into a modern Next.js experience while preserving important content, business requirements and public functionality.",
        type: "WEBSITE",
        status: "ACTIVE",
        prices: prices(350000, 1500000, 500, 2500),
        featured: true,
      },
    ],
  },

  {
    name: "Mobile & Adaptive Experiences",
    slug: "mobile-adaptive-experiences",
    description:
      "Professional mobile experiences designed intentionally for smaller screens instead of merely shrinking a desktop website.",
    services: [
      {
        name: "Mobile Website Redesign",
        slug: "mobile-website-redesign",
        shortDescription:
          "Transform an existing website into a cleaner and more professional mobile experience.",
        description:
          "Redesign mobile navigation, layouts, spacing, content density and touch interactions while preserving the existing website's core business purpose.",
        type: "WEBSITE",
        status: "ACTIVE",
        prices: prices(120000, 500000, 175, 750),
        featured: false,
      },
      {
        name: "Mobile-Specific Website Experience",
        slug: "mobile-specific-website-experience",
        shortDescription:
          "A purpose-built mobile interface sharing the same data and business logic as your main website.",
        description:
          "Develop an intentionally designed mobile composition with app-like interactions, focused content and mobile-specific navigation while retaining the same canonical website and application foundation.",
        type: "WEBSITE",
        status: "ACTIVE",
        prices: prices(200000, 900000, 300, 1350),
        featured: true,
      },
      {
        name: "Responsive Website Optimization",
        slug: "responsive-website-optimization",
        shortDescription:
          "Improve how an existing website behaves across phones, tablets, laptops and large displays.",
        description:
          "Audit and improve responsive layouts, typography, spacing, navigation, media behaviour, breakpoints and device-specific usability.",
        type: "MAINTENANCE",
        status: "ACTIVE",
        prices: prices(80000, 350000, 120, 500),
        featured: false,
      },
      {
        name: "Mobile Web App Interface",
        slug: "mobile-web-app-interface",
        shortDescription:
          "Turn complex web applications into focused and app-like mobile experiences.",
        description:
          "Design and implement touch-oriented mobile application surfaces using compact navigation, sheets, activity views, cards and workflow-focused interactions.",
        type: "WEB_APP",
        status: "ACTIVE",
        prices: prices(250000, 1200000, 375, 1800),
        featured: false,
      },
      {
        name: "Progressive Web App Development",
        slug: "progressive-web-app-development",
        shortDescription:
          "Bring app-like installation and device capabilities to suitable web products.",
        description:
          "Develop progressive web application capabilities around suitable projects, including installation, offline-conscious behaviour and app-oriented device experiences where appropriate.",
        type: "WEB_APP",
        status: "ACTIVE",
        prices: prices(450000, 2500000, 650, 3500),
        featured: false,
      },
      {
        name: "Mobile Application Development",
        slug: "mobile-application-development",
        shortDescription:
          "Custom mobile applications built around real users, workflows and business needs.",
        description:
          "Plan and develop mobile applications with appropriate authentication, data, workflows, APIs, user experiences and product requirements.",
        type: "MOBILE_APP",
        status: "ACTIVE",
        prices: prices(900000, 7000000, 1500, 10000),
        featured: false,
      },
    ],
  },

  {
    name: "Business Systems",
    slug: "business-systems",
    description:
      "Operational software for businesses that have outgrown spreadsheets, disconnected tools and basic websites.",
    services: [
      {
        name: "Business Management System",
        slug: "business-management-system",
        shortDescription:
          "Bring business operations, records, users and workflows into one structured system.",
        description:
          "Architect and build business-management applications around operational workflows, roles, dashboards, reporting, records and internal processes.",
        type: "WEB_APP",
        status: "ACTIVE",
        prices: prices(900000, 7000000, 1500, 10000),
        featured: true,
      },
      {
        name: "Admin Dashboard Development",
        slug: "admin-dashboard-development",
        shortDescription:
          "Professional dashboards for managing users, data, products, projects and application operations.",
        description:
          "Build structured administration dashboards with management tools, analytics, forms, tables, workflows and role-aware operational controls.",
        type: "WEB_APP",
        status: "ACTIVE",
        prices: prices(350000, 2500000, 500, 3500),
        featured: false,
      },
      {
        name: "Client Portal Development",
        slug: "client-portal-development",
        shortDescription:
          "Give customers a secure workspace for projects, communication, billing and account activity.",
        description:
          "Develop authenticated client portals that expose appropriate project updates, services, communication, documents, billing and account information.",
        type: "WEB_APP",
        status: "ACTIVE",
        prices: prices(600000, 3500000, 900, 5000),
        featured: false,
      },
      {
        name: "Internal Operations System",
        slug: "internal-operations-system",
        shortDescription:
          "Replace difficult manual processes with software built around how your organisation actually works.",
        description:
          "Model and digitize internal company processes through custom interfaces, records, roles, permissions, automation and operational workflows.",
        type: "WEB_APP",
        status: "ACTIVE",
        prices: prices(900000, 7000000, 1500, 10000),
        featured: false,
      },
      {
        name: "SaaS Platform Development",
        slug: "saas-platform-development",
        shortDescription:
          "Build subscription and account-driven software products designed to grow with their users.",
        description:
          "Architect and develop SaaS platforms with authentication, user roles, persistent data, subscriptions, billing and reusable application capabilities.",
        type: "SAAS",
        status: "ACTIVE",
        prices: prices(1200000, 10000000, 2000, 15000),
        featured: true,
      },
    ],
  },

  {
    name: "E-commerce",
    slug: "ecommerce",
    description:
      "Commerce platforms ranging from focused online stores to larger marketplace and operational retail systems.",
    services: [
      {
        name: "E-commerce Store Development",
        slug: "ecommerce-store-development",
        shortDescription:
          "Modern online stores built around products, customers, payments and reliable shopping experiences.",
        description:
          "Develop e-commerce storefronts with product discovery, customer accounts, carts, checkout, payments and appropriate operational capabilities.",
        type: "ECOMMERCE",
        status: "ACTIVE",
        prices: prices(450000, 3000000, 650, 4500),
        featured: true,
      },
      {
        name: "Multi-Vendor Marketplace Development",
        slug: "multi-vendor-marketplace-development",
        shortDescription:
          "Build marketplace platforms where multiple vendors can operate within one customer ecosystem.",
        description:
          "Architect marketplace systems around vendor identity, catalogue ownership, products, orders, administration and shared customer experiences.",
        type: "ECOMMERCE",
        status: "ACTIVE",
        prices: prices(1200000, 10000000, 2000, 15000),
        featured: false,
      },
      {
        name: "Online Catalogue & Product Website",
        slug: "online-catalogue-product-website",
        shortDescription:
          "Present products professionally online without the cost and complexity of a full marketplace.",
        description:
          "Build structured online catalogue experiences for products, collections, specifications and enquiries where complete e-commerce checkout is not required.",
        type: "ECOMMERCE",
        status: "ACTIVE",
        prices: prices(180000, 700000, 275, 1000),
        featured: false,
      },
      {
        name: "Commerce System Modernization",
        slug: "commerce-system-modernization",
        shortDescription:
          "Modernize an ageing online store without unnecessarily throwing away the entire business system.",
        description:
          "Improve existing commerce platforms around responsiveness, performance, catalogue structure, customer workflows and maintainable application architecture.",
        type: "ECOMMERCE",
        status: "ACTIVE",
        prices: prices(350000, 2000000, 500, 3000),
        featured: false,
      },
    ],
  },

  {
    name: "Maintenance & Modernization",
    slug: "maintenance-modernization",
    description:
      "Repair, rebuild, improve and modernize websites and applications that already exist.",
    services: [
      {
        name: "Website Redesign & Rebuild",
        slug: "website-redesign-rebuild",
        shortDescription:
          "Turn an outdated website into a cleaner and more convincing modern experience.",
        description:
          "Review an existing website and redesign or rebuild its structure, presentation and implementation while preserving useful business content and functionality.",
        type: "WEBSITE",
        status: "ACTIVE",
        prices: prices(180000, 900000, 275, 1300),
        featured: false,
      },
      {
        name: "Legacy Website Modernization",
        slug: "legacy-website-modernization",
        shortDescription:
          "Move ageing websites toward modern technology, responsive design and current usability standards.",
        description:
          "Assess older websites and modernize their technology, responsiveness, performance, presentation and maintainability according to practical business needs.",
        type: "WEBSITE",
        status: "ACTIVE",
        prices: prices(300000, 2000000, 450, 3000),
        featured: false,
      },
      {
        name: "Website Repair & Fixes",
        slug: "website-repair-fixes",
        shortDescription:
          "Fix broken pages, responsive issues, interactions and website functionality.",
        description:
          "Investigate and repair existing website problems including layout failures, broken interactions, mobile issues, content presentation and implementation defects.",
        type: "MAINTENANCE",
        status: "ACTIVE",
        prices: prices(40000, 250000, 60, 350),
        featured: false,
      },
      {
        name: "Web Application Maintenance",
        slug: "web-application-maintenance",
        shortDescription:
          "Keep existing applications stable, updated and moving forward.",
        description:
          "Maintain existing applications through bug fixes, dependency updates, performance work, operational stabilization and incremental technical improvement.",
        type: "MAINTENANCE",
        status: "ACTIVE",
        prices: prices(100000, 600000, 150, 900),
        featured: false,
      },
      {
        name: "Existing System Upgrade",
        slug: "existing-system-upgrade",
        shortDescription:
          "Add new capabilities to an existing system without rebuilding everything from scratch.",
        description:
          "Assess an existing software system and implement targeted architectural, workflow, interface or feature upgrades while preserving useful existing functionality.",
        type: "MAINTENANCE",
        status: "ACTIVE",
        prices: prices(180000, 1800000, 275, 2700),
        featured: false,
      },
    ],
  },

  {
    name: "Technical Consulting",
    slug: "technical-consulting",
    description:
      "Technical planning and architecture guidance for organisations that need clarity before committing to development.",
    services: [
      {
        name: "Technical Architecture & Consultation",
        slug: "technical-architecture-consultation",
        shortDescription:
          "Turn a business idea into a practical technical direction before expensive development begins.",
        description:
          "Review goals, workflows, users, technical constraints and growth expectations to define an appropriate software architecture and implementation direction.",
        type: "CONSULTING",
        status: "ACTIVE",
        prices: prices(80000, 350000, 120, 500),
        featured: false,
      },
      {
        name: "Website & Application Audit",
        slug: "website-application-audit",
        shortDescription:
          "Understand what is wrong, what can be preserved and what should be improved before rebuilding.",
        description:
          "Assess an existing website or application across structure, usability, responsive behaviour, implementation quality and practical modernization opportunities.",
        type: "CONSULTING",
        status: "ACTIVE",
        prices: prices(60000, 250000, 90, 350),
        featured: false,
      },
      {
        name: "Modernization Planning",
        slug: "modernization-planning",
        shortDescription:
          "Create a realistic migration and improvement plan for ageing websites or software systems.",
        description:
          "Define a staged modernization strategy covering what should be preserved, improved, redesigned, migrated or replaced.",
        type: "CONSULTING",
        status: "ACTIVE",
        prices: prices(80000, 350000, 120, 500),
        featured: false,
      },
    ],
  },
];