export type SeedServiceTechnology = {
  name: string;
  slug: string;
  category: string;
  description: string;
  purpose: string;
  rationale: string;
  featured?: boolean;
};

export type SeedServiceFeature = {
  name: string;
  slug: string;
  description: string;
  expectedOutcome: string;
  featured?: boolean;
};

export type SeedServiceOutcome = {
  title: string;
  slug: string;
  description: string;
};

export type SeedServiceMilestone = {
  title: string;
  slug: string;
  description: string;
  purpose: string;
  expectedOutcome: string;
  minDays: number;
  maxDays: number;
};

export type SeedServiceFaq = {
  slug: string;
  question: string;
  answer: string;
  featured?: boolean;
};

export type SeedOnboardingOption = {
  value: string;
  label: string;
  description?: string;
};

export type SeedOnboardingQuestion = {
  key: string;
  label: string;
  helpText?: string;
  placeholder?: string;
  type:
    | "SHORT_TEXT"
    | "LONG_TEXT"
    | "NUMBER"
    | "URL"
    | "EMAIL"
    | "PHONE"
    | "BOOLEAN"
    | "SINGLE_SELECT"
    | "MULTI_SELECT"
    | "DATE";
  required?: boolean;
  options?: SeedOnboardingOption[];
};

export type ServiceIntelligenceProfile = {
  deliveryMinDays: number;
  deliveryMaxDays: number;
  deliveryNote: string;
  technologies: SeedServiceTechnology[];
  features: SeedServiceFeature[];
  outcomes: SeedServiceOutcome[];
  milestones: SeedServiceMilestone[];
  faqs: SeedServiceFaq[];
  onboarding: SeedOnboardingQuestion[];
};

function tech(
  name: string,
  slug: string,
  category: string,
  purpose: string,
  rationale: string,
  featured = false,
): SeedServiceTechnology {
  return {
    name,
    slug,
    category,
    description: `${name} is part of the typical technology stack considered for this service when it fits the approved project scope.`,
    purpose,
    rationale,
    featured,
  };
}

const COMMON_MILESTONES: SeedServiceMilestone[] = [
  {
    title: "Discovery & scope",
    slug: "discovery-scope",
    description:
      "Clarify the business objective, users, workflows, constraints, integrations and the first delivery boundary.",
    purpose: "Remove ambiguity before implementation begins.",
    expectedOutcome:
      "A shared understanding of what will be built, what is excluded and what needs further validation.",
    minDays: 1,
    maxDays: 4,
  },
  {
    title: "Architecture & experience direction",
    slug: "architecture-experience-direction",
    description:
      "Define the application structure, core data relationships, user journeys and implementation direction.",
    purpose: "Give the build a stable technical and product foundation.",
    expectedOutcome:
      "An agreed delivery approach with the major system boundaries and user flows understood.",
    minDays: 2,
    maxDays: 6,
  },
  {
    title: "Core implementation",
    slug: "core-implementation",
    description:
      "Build the approved interfaces, backend workflows, data layer and priority integrations in focused iterations.",
    purpose: "Turn the approved scope into working product capability.",
    expectedOutcome:
      "A functional implementation covering the agreed primary workflows.",
    minDays: 5,
    maxDays: 24,
  },
  {
    title: "Testing & refinement",
    slug: "testing-refinement",
    description:
      "Review responsive behaviour, permissions, workflows, edge cases, integrations and implementation defects.",
    purpose: "Reduce avoidable failures before delivery.",
    expectedOutcome:
      "A more stable release candidate ready for client review and final corrections.",
    minDays: 2,
    maxDays: 7,
  },
  {
    title: "Delivery & handover",
    slug: "delivery-handover",
    description:
      "Complete final checks, deployment or handover steps, documentation and agreed operational guidance.",
    purpose: "Move the approved solution into real use responsibly.",
    expectedOutcome:
      "A delivered solution with its next operational or maintenance steps clearly understood.",
    minDays: 1,
    maxDays: 4,
  },
];

const COMMON_FAQS: SeedServiceFaq[] = [
  {
    slug: "existing-system-integration",
    question: "Can this integrate with an existing website or system?",
    answer:
      "Usually, yes. Integration depends on the APIs, data access, authentication model and technical limitations of the existing system. We review those dependencies during discovery before treating an integration as committed scope.",
    featured: true,
  },
  {
    slug: "expand-later",
    question: "Can the solution be expanded after the first release?",
    answer:
      "Yes. Rcentz generally prefers a structured first release with room for later modules, integrations and workflow improvements instead of forcing every future idea into version one.",
  },
  {
    slug: "hosting-domain",
    question: "Are hosting and domain costs automatically included?",
    answer:
      "Not automatically. Infrastructure, domains, third-party subscriptions, paid APIs and provider fees are confirmed separately because they vary by project and client preference.",
  },
  {
    slug: "fixed-price",
    question: "Is the displayed price a fixed final price?",
    answer:
      "No. Public pricing is a guide. The final quote is based on the approved scope, integrations, complexity, delivery requirements and support expectations. Custom offers are available when the project does not fit the standard range.",
  },
];

const COMMON_ONBOARDING: SeedOnboardingQuestion[] = [
  {
    key: "business-goal",
    label: "What is the main business goal for this project?",
    type: "LONG_TEXT",
    required: true,
    placeholder:
      "Describe the problem you want the service to solve and what a successful first release should achieve.",
  },
  {
    key: "existing-system",
    label: "Do you already have an existing website or system?",
    type: "BOOLEAN",
    required: true,
  },
  {
    key: "existing-system-url",
    label: "If an existing public system is involved, what is its URL?",
    type: "URL",
    required: false,
  },
  {
    key: "required-integrations",
    label: "Which external tools or integrations do you expect to use?",
    helpText:
      "Examples include payment providers, maps, analytics, CRMs, messaging, identity providers or an existing company API.",
    type: "LONG_TEXT",
    required: false,
  },
  {
    key: "preferred-deadline",
    label: "Is there a preferred delivery date?",
    type: "DATE",
    required: false,
  },
];

const PROFILES: Record<string, ServiceIntelligenceProfile> = {
  "web-development": {
    deliveryMinDays: 7,
    deliveryMaxDays: 35,
    deliveryNote:
      "Focused landing pages may be completed faster, while larger websites and custom web applications require additional discovery, backend work and review cycles.",
    technologies: [
      tech("Next.js", "nextjs", "Framework", "Application routing, rendering and server-side product workflows.", "It supports a fast, modern React application architecture with strong routing and server capabilities.", true),
      tech("React", "react", "Interface", "Reusable interactive user interfaces.", "It provides a strong component model for building maintainable experiences across pages and application states.", true),
      tech("TypeScript", "typescript", "Engineering", "Type-safe application development.", "It improves contracts between data, server logic and interface components as a project grows.", true),
      tech("Cloudflare", "cloudflare", "Infrastructure", "DNS, edge delivery and selected security/performance layers.", "It can improve delivery and infrastructure control where the deployment architecture benefits from it."),
    ],
    features: [
      { name: "Responsive experience", slug: "responsive-experience", description: "Layouts and interactions structured for phones, tablets and desktop screens.", expectedOutcome: "A consistent usable experience across the primary devices your audience uses.", featured: true },
      { name: "Conversion-focused journeys", slug: "conversion-focused-journeys", description: "Clear navigation, calls to action and enquiry or conversion flows built around the business objective.", expectedOutcome: "Visitors can understand the offer and move toward the intended action with less friction.", featured: true },
      { name: "Content & service structure", slug: "content-service-structure", description: "A deliberate information hierarchy for company, service, product or campaign content.", expectedOutcome: "Important information is easier to scan, trust and navigate." },
      { name: "Performance-conscious implementation", slug: "performance-conscious-implementation", description: "Modern rendering, asset and implementation choices suited to the project.", expectedOutcome: "A cleaner technical foundation with attention to loading and interaction quality." },
    ],
    outcomes: [
      { title: "Clearer digital presence", slug: "clearer-digital-presence", description: "A more deliberate public experience aligned with the business, audience and service journey." },
      { title: "Reusable foundation", slug: "reusable-foundation", description: "A structure that can support future pages, integrations and product expansion where planned." },
      { title: "Better cross-device usability", slug: "better-cross-device-usability", description: "Core journeys remain understandable and usable across supported screen sizes." },
    ],
    milestones: COMMON_MILESTONES,
    faqs: COMMON_FAQS,
    onboarding: COMMON_ONBOARDING,
  },

  wordpress: {
    deliveryMinDays: 5,
    deliveryMaxDays: 28,
    deliveryNote:
      "Delivery depends heavily on content readiness, the existing WordPress condition, plugin dependencies and whether the work is a build, redesign, repair or migration.",
    technologies: [
      tech("WordPress", "wordpress", "CMS", "Content management and editorial workflows.", "It is appropriate when the client needs familiar CMS editing and the project does not require a fully custom application architecture.", true),
      tech("PHP", "php", "Backend", "WordPress theme, plugin and server-side behaviour where required.", "WordPress itself is PHP-based, so responsible customization often requires understanding its native runtime."),
      tech("Cloudflare", "cloudflare", "Infrastructure", "Caching, DNS and selected edge/security controls.", "It can help improve delivery and operational resilience for suitable WordPress deployments."),
      tech("Next.js", "nextjs", "Modernization", "Decoupled or migration paths where WordPress should no longer own the full frontend.", "It gives suitable projects a route toward a more application-oriented frontend architecture."),
    ],
    features: [
      { name: "Editable content management", slug: "editable-content-management", description: "Pages and selected content remain manageable through WordPress administration.", expectedOutcome: "The client can handle ordinary content updates without editing source code.", featured: true },
      { name: "Responsive redesign", slug: "responsive-redesign", description: "Layouts, navigation and content density are improved for modern screens.", expectedOutcome: "The site feels more intentional across phones and desktop devices." },
      { name: "Plugin & theme review", slug: "plugin-theme-review", description: "Existing dependencies are reviewed for necessity, compatibility and obvious risk.", expectedOutcome: "A cleaner understanding of what the installation depends on." },
      { name: "Migration-ready structure", slug: "migration-ready-structure", description: "Where relevant, content and architecture decisions consider future modernization.", expectedOutcome: "The business is less trapped by avoidable implementation choices." },
    ],
    outcomes: [
      { title: "Manageable publishing", slug: "manageable-publishing", description: "A practical content workflow for teams that need to update their website regularly." },
      { title: "Improved presentation", slug: "improved-presentation", description: "A cleaner, more responsive and more credible public-facing experience." },
      { title: "Reduced technical clutter", slug: "reduced-technical-clutter", description: "Unnecessary implementation complexity can be identified and reduced where the scope allows." },
    ],
    milestones: COMMON_MILESTONES,
    faqs: COMMON_FAQS,
    onboarding: COMMON_ONBOARDING,
  },

  "mobile-adaptive-experiences": {
    deliveryMinDays: 10,
    deliveryMaxDays: 45,
    deliveryNote:
      "Responsive optimization can be shorter; dedicated mobile experiences, PWAs and mobile applications require deeper workflow, device and API work.",
    technologies: [
      tech("React", "react", "Interface", "Reusable interactive mobile-conscious interface systems.", "Its component model is useful for shared application behaviour across responsive and app-like surfaces.", true),
      tech("Next.js", "nextjs", "Web application", "Responsive web, server rendering and progressive application delivery.", "It works well for app-like web experiences that still need web routing, server capabilities and shareable URLs.", true),
      tech("TypeScript", "typescript", "Engineering", "Reliable contracts across UI, API and state.", "Mobile workflows often have many interaction states, making explicit types valuable."),
      tech("PWA", "pwa", "Capability", "Installable and offline-conscious web behaviour where appropriate.", "It can provide selected app-like capabilities without forcing a native application for every use case."),
    ],
    features: [
      { name: "Mobile-first navigation", slug: "mobile-first-navigation", description: "Navigation patterns designed around touch, reduced width and focused actions.", expectedOutcome: "Primary actions remain easy to reach on smaller screens.", featured: true },
      { name: "Adaptive layouts", slug: "adaptive-layouts", description: "Content density and layout change intentionally across device classes.", expectedOutcome: "The interface does more than simply shrink a desktop layout." },
      { name: "Touch-oriented interactions", slug: "touch-oriented-interactions", description: "Controls, sheets and activity flows consider touch behaviour and mobile ergonomics.", expectedOutcome: "Frequent tasks feel more natural on phones and tablets." },
      { name: "Shared application logic", slug: "shared-application-logic", description: "Where suitable, mobile and desktop experiences share the same canonical data and business rules.", expectedOutcome: "Less duplicated business logic and a more maintainable system." },
    ],
    outcomes: [
      { title: "Stronger mobile usability", slug: "stronger-mobile-usability", description: "Important workflows are designed around how mobile users actually interact." },
      { title: "Consistent business logic", slug: "consistent-business-logic", description: "Responsive or adaptive surfaces can share the same source of truth instead of becoming separate products unnecessarily." },
      { title: "App-like experience where useful", slug: "app-like-experience", description: "Suitable products can feel more focused and application-oriented on smaller screens." },
    ],
    milestones: COMMON_MILESTONES,
    faqs: COMMON_FAQS,
    onboarding: COMMON_ONBOARDING,
  },

  "business-systems": {
    deliveryMinDays: 21,
    deliveryMaxDays: 90,
    deliveryNote:
      "Business systems are scoped around workflows, permissions, data, reporting and integrations. Larger internal platforms are usually delivered in phases rather than as one oversized release.",
    technologies: [
      tech("Next.js", "nextjs", "Application", "Full-stack application interfaces, routing and server workflows.", "It provides a cohesive foundation for authenticated operational software.", true),
      tech("Prisma", "prisma", "Data access", "Structured application access to relational business data.", "It keeps important data relationships explicit and easier to evolve with the domain.", true),
      tech("PostgreSQL", "postgresql", "Database", "Relational source of truth for users, workflows and business records.", "Operational systems benefit from strong relational constraints and structured querying.", true),
      tech("Better Auth", "better-auth", "Authentication", "Identity, sessions and account access where it fits the project.", "Business systems commonly require authenticated role-aware access."),
    ],
    features: [
      { name: "Role-aware access", slug: "role-aware-access", description: "Users see and perform actions appropriate to their responsibility.", expectedOutcome: "Operational access is separated instead of exposing one unrestricted interface.", featured: true },
      { name: "Workflow management", slug: "workflow-management", description: "Business processes are represented as explicit records, states and actions.", expectedOutcome: "Teams can follow work through a consistent process rather than disconnected manual steps.", featured: true },
      { name: "Operational dashboards", slug: "operational-dashboards", description: "Important records, activity and status are surfaced in focused management views.", expectedOutcome: "Teams gain a clearer picture of what needs attention." },
      { name: "Reporting & history", slug: "reporting-history", description: "Relevant activity and business records can be reviewed over time.", expectedOutcome: "Decisions rely less on scattered spreadsheets and memory." },
      { name: "Integration-ready architecture", slug: "integration-ready-architecture", description: "External services and APIs can be connected around clear boundaries when approved.", expectedOutcome: "The platform can participate in the wider business toolchain." },
    ],
    outcomes: [
      { title: "Centralized operations", slug: "centralized-operations", description: "Important workflows and records move into a shared structured system." },
      { title: "Clearer accountability", slug: "clearer-accountability", description: "Roles, statuses and activity history make operational responsibility easier to follow." },
      { title: "Expandable internal platform", slug: "expandable-internal-platform", description: "The first release can become a foundation for additional modules as the business grows." },
    ],
    milestones: COMMON_MILESTONES,
    faqs: COMMON_FAQS,
    onboarding: [
      ...COMMON_ONBOARDING,
      { key: "current-workflow", label: "Describe the current manual or software workflow this system should improve.", type: "LONG_TEXT", required: true },
      { key: "user-roles", label: "Which user roles or departments need access?", type: "LONG_TEXT", required: true },
    ],
  },

  ecommerce: {
    deliveryMinDays: 14,
    deliveryMaxDays: 60,
    deliveryNote:
      "Catalogue size, vendor logic, checkout rules, inventory, fulfilment and payment integrations are the main drivers of commerce delivery time.",
    technologies: [
      tech("Next.js", "nextjs", "Storefront", "Storefront, account and operational application surfaces.", "It supports modern product discovery and application workflows in one framework.", true),
      tech("PostgreSQL", "postgresql", "Database", "Products, customers, orders and operational commerce data.", "Commerce has strongly related records that benefit from relational consistency.", true),
      tech("Paystack", "paystack", "Payments", "Payment collection for supported markets and project requirements.", "It is a practical payment provider for many Nigerian commerce use cases where the client account and scope support it."),
      tech("Stripe", "stripe", "Payments", "International payment workflows where available and appropriate.", "It can support broader card and payment use cases when the client and operating region are eligible."),
    ],
    features: [
      { name: "Product discovery", slug: "product-discovery", description: "Structured categories, collections, search or browsing suited to the catalogue.", expectedOutcome: "Customers can find relevant products with less friction.", featured: true },
      { name: "Cart & checkout", slug: "cart-checkout", description: "Persistent shopping flows with totals and approved checkout rules.", expectedOutcome: "A clear path from product interest to order submission or payment.", featured: true },
      { name: "Order operations", slug: "order-operations", description: "Administrative tools for order status, customer records and fulfilment-related activity.", expectedOutcome: "The business can manage post-purchase activity from a structured workflow." },
      { name: "Payment integration", slug: "payment-integration", description: "Approved payment provider integration with server-side verification where required.", expectedOutcome: "Payment state is connected to the order workflow more reliably." },
    ],
    outcomes: [
      { title: "Stronger shopping journey", slug: "stronger-shopping-journey", description: "Customers move through discovery, cart and checkout through one coherent experience." },
      { title: "Operational visibility", slug: "operational-visibility", description: "Orders and commerce activity are easier to manage after checkout." },
      { title: "Room for commerce expansion", slug: "commerce-expansion", description: "The system can be structured for later loyalty, vendor, fulfilment or customer-account capabilities where planned." },
    ],
    milestones: COMMON_MILESTONES,
    faqs: COMMON_FAQS,
    onboarding: [
      ...COMMON_ONBOARDING,
      { key: "catalogue-size", label: "Roughly how many products or listings will the first release contain?", type: "NUMBER", required: false },
      { key: "payment-provider", label: "Which payment providers do you want to use?", type: "MULTI_SELECT", options: [
        { value: "paystack", label: "Paystack" },
        { value: "stripe", label: "Stripe" },
        { value: "bank-transfer", label: "Bank transfer" },
        { value: "other", label: "Other / undecided" },
      ] },
    ],
  },

  "maintenance-modernization": {
    deliveryMinDays: 2,
    deliveryMaxDays: 35,
    deliveryNote:
      "Small fixes can be short engagements. Rebuilds, framework migrations and modernization work require an audit before the final delivery range is confirmed.",
    technologies: [
      tech("TypeScript", "typescript", "Engineering", "Safer modernization of JavaScript application code where applicable.", "Explicit types can expose fragile contracts while older code is being improved."),
      tech("Next.js", "nextjs", "Modernization", "Modern application architecture for suitable rebuilds and migrations.", "It can replace ageing frontend structures when the migration case is justified.", true),
      tech("Cloudflare", "cloudflare", "Infrastructure", "Selected DNS, caching and edge improvements.", "Infrastructure problems are sometimes part of a modernization scope, not only the frontend."),
      tech("PostgreSQL", "postgresql", "Data", "Structured relational data where backend modernization is required.", "A stable data model is important when a legacy system is being rebuilt rather than merely reskinned."),
    ],
    features: [
      { name: "Technical audit", slug: "technical-audit", description: "Review the current implementation, dependencies and obvious failure points before committing to a rebuild path.", expectedOutcome: "A clearer decision about what to preserve, repair, migrate or replace.", featured: true },
      { name: "Targeted repair", slug: "targeted-repair", description: "Fix approved defects without unnecessarily replacing healthy parts of the system.", expectedOutcome: "Priority issues are resolved with less waste." },
      { name: "Architecture modernization", slug: "architecture-modernization", description: "Restructure suitable areas around more maintainable current patterns.", expectedOutcome: "A stronger technical base for future changes." },
      { name: "Responsive & UX improvement", slug: "responsive-ux-improvement", description: "Modernize presentation and device behaviour alongside technical work where included.", expectedOutcome: "The system feels more current and usable, not merely internally rewritten." },
    ],
    outcomes: [
      { title: "Reduced technical friction", slug: "reduced-technical-friction", description: "Priority implementation problems are addressed instead of accumulating indefinitely." },
      { title: "Preserved useful investment", slug: "preserved-useful-investment", description: "Working parts can be retained when replacement would add no meaningful value." },
      { title: "Clear modernization path", slug: "clear-modernization-path", description: "The business gains a staged direction for improving the system beyond the immediate engagement." },
    ],
    milestones: COMMON_MILESTONES,
    faqs: COMMON_FAQS,
    onboarding: [
      ...COMMON_ONBOARDING,
      { key: "main-problems", label: "What are the most important problems with the current system?", type: "LONG_TEXT", required: true },
      { key: "source-access", label: "Do you have access to the source code, hosting and required accounts?", type: "BOOLEAN", required: true },
    ],
  },

  "technical-consulting": {
    deliveryMinDays: 2,
    deliveryMaxDays: 14,
    deliveryNote:
      "Consulting duration depends on the amount of existing material, stakeholder availability and whether the engagement includes an audit, architecture plan or staged modernization roadmap.",
    technologies: [
      tech("Architecture Review", "architecture-review", "Planning", "Evaluate system boundaries, data, workflows and technical constraints.", "The goal of consulting is to make implementation decisions explicit before expensive build work begins.", true),
      tech("Next.js", "nextjs", "Reference architecture", "A reference option for modern web application planning where it fits.", "It is one of the primary frameworks Rcentz can evaluate for suitable web products."),
      tech("PostgreSQL", "postgresql", "Data planning", "Relational data modelling for suitable operational systems.", "Data relationships should be understood before application screens become the architecture."),
      tech("Prisma", "prisma", "Data access", "Application-level relational modelling where a Prisma stack is appropriate.", "It can help keep the data contract explicit in TypeScript application architectures."),
    ],
    features: [
      { name: "Requirements clarification", slug: "requirements-clarification", description: "Turn broad goals into clearer users, workflows, constraints and priorities.", expectedOutcome: "Less ambiguity before implementation decisions are made.", featured: true },
      { name: "Architecture direction", slug: "architecture-direction", description: "Recommend an implementation structure suited to the product rather than following a tool by habit.", expectedOutcome: "A more defensible technical plan." },
      { name: "Risk & dependency review", slug: "risk-dependency-review", description: "Identify obvious technical dependencies, integration constraints and migration concerns.", expectedOutcome: "Important unknowns are surfaced earlier." },
      { name: "Staged roadmap", slug: "staged-roadmap", description: "Break a larger product or modernization effort into practical delivery stages.", expectedOutcome: "A clearer path from idea to implementation." },
    ],
    outcomes: [
      { title: "Clearer scope", slug: "clearer-scope", description: "The project has a more concrete definition before development cost increases." },
      { title: "Reduced avoidable rework", slug: "reduced-avoidable-rework", description: "Important architectural and workflow decisions are considered before implementation hardens them." },
      { title: "Actionable next steps", slug: "actionable-next-steps", description: "The engagement ends with a practical direction rather than only abstract discussion." },
    ],
    milestones: COMMON_MILESTONES.slice(0, 2).concat(COMMON_MILESTONES.slice(3, 5)),
    faqs: COMMON_FAQS,
    onboarding: COMMON_ONBOARDING,
  },

  "financial-regulated-platforms": {
    deliveryMinDays: 28,
    deliveryMaxDays: 120,
    deliveryNote:
      "Financial software usually requires deeper identity, permissions, ledger, provider-integration and compliance review. Rcentz provides software engineering; licensing, regulatory approval and regulated operations remain the client's responsibility.",
    technologies: [
      tech("Next.js", "nextjs", "Application", "Authenticated financial interfaces and server-side workflows.", "It provides a strong application foundation for dashboard-heavy products.", true),
      tech("PostgreSQL", "postgresql", "Database", "Relational records for accounts, activity, workflows and reporting.", "Financial application data benefits from explicit relationships and transactional database capabilities.", true),
      tech("Prisma", "prisma", "Data access", "Typed relational access from the application layer.", "It helps keep important data relationships visible in the codebase."),
      tech("Better Auth", "better-auth", "Identity", "Account and session infrastructure where the approved security design allows it.", "Financial products require deliberate authentication and authorization rather than public application assumptions."),
      tech("Provider APIs", "provider-apis", "Integration", "Connect licensed payment, banking, identity or market-data providers.", "Rcentz should integrate approved providers instead of pretending to replace regulated infrastructure."),
    ],
    features: [
      { name: "Role & permission controls", slug: "role-permission-controls", description: "Separate customer, operator and administrative capabilities according to approved roles.", expectedOutcome: "Sensitive workflows are not exposed through one unrestricted account model.", featured: true },
      { name: "Account activity views", slug: "account-activity-views", description: "Structured presentation of balances, transactions, portfolio or account events relevant to the service.", expectedOutcome: "Users can understand important account activity more clearly.", featured: true },
      { name: "Provider integration layer", slug: "provider-integration-layer", description: "Approved third-party financial or identity providers are integrated through controlled server workflows.", expectedOutcome: "The product can rely on licensed external infrastructure where required." },
      { name: "Operational administration", slug: "operational-administration", description: "Role-aware dashboards for reviewing users, activity, records and exceptional states.", expectedOutcome: "Operators have a structured place to manage supported workflows." },
      { name: "Audit-conscious history", slug: "audit-conscious-history", description: "Important state changes and operational events can be recorded where the product scope requires it.", expectedOutcome: "The application has better operational traceability." },
    ],
    outcomes: [
      { title: "Structured financial experience", slug: "structured-financial-experience", description: "Account, transaction and operational information is presented through a deliberate product workflow." },
      { title: "Provider-ready architecture", slug: "provider-ready-architecture", description: "The application is structured to connect to approved financial infrastructure rather than hard-coding assumptions." },
      { title: "Operational separation", slug: "operational-separation", description: "Customer and administrative responsibilities are represented through distinct permissions and interfaces." },
    ],
    milestones: COMMON_MILESTONES,
    faqs: [
      ...COMMON_FAQS,
      { slug: "licensing-compliance", question: "Does Rcentz provide financial licensing or regulatory approval?", answer: "No. Rcentz provides software engineering and integration work. The client is responsible for the licences, regulated relationships, legal advice, compliance programme and approvals required to operate the financial service." },
    ],
    onboarding: [
      ...COMMON_ONBOARDING,
      { key: "regulated-role", label: "What regulated role does your organisation perform, if any?", type: "LONG_TEXT", required: true },
      { key: "financial-providers", label: "Which licensed providers or APIs are already selected?", type: "LONG_TEXT", required: false },
      { key: "required-roles", label: "Which customer, staff and administrator roles are required?", type: "LONG_TEXT", required: true },
    ],
  },

  "logistics-tracking-systems": {
    deliveryMinDays: 21,
    deliveryMaxDays: 90,
    deliveryNote:
      "Delivery time depends on shipment lifecycle complexity, rider or fleet workflows, maps, notifications, customer tracking and any external courier or dispatch integrations.",
    technologies: [
      tech("Next.js", "nextjs", "Application", "Customer tracking pages and authenticated operational dashboards.", "It can support public tracking and internal application workflows in one product foundation.", true),
      tech("PostgreSQL", "postgresql", "Database", "Shipments, status history, customers, assignments and fleet records.", "Tracking systems contain strongly related operational records that need a reliable source of truth.", true),
      tech("Maps APIs", "maps-apis", "Integration", "Routes, geocoding or map presentation where required.", "Location-aware products often need approved mapping providers rather than custom geographic infrastructure."),
      tech("Messaging APIs", "messaging-apis", "Notifications", "Delivery updates through approved email, SMS or messaging providers.", "Status changes are more useful when customers and operators can be notified at the right moments."),
    ],
    features: [
      { name: "Tracking reference workflow", slug: "tracking-reference-workflow", description: "Customers can identify and follow a shipment through approved lifecycle states.", expectedOutcome: "Shipment progress is easier to understand without repeated manual enquiries.", featured: true },
      { name: "Shipment status history", slug: "shipment-status-history", description: "Important parcel or delivery state changes are recorded over time.", expectedOutcome: "Operators and customers can see a clearer history of movement." },
      { name: "Dispatch & assignment", slug: "dispatch-assignment", description: "Jobs can be assigned to riders, drivers, hubs or operational queues where included.", expectedOutcome: "Delivery responsibility becomes easier to manage." },
      { name: "Operational dashboard", slug: "operational-dashboard", description: "Teams can review shipments, exceptions, assignments and priority activity from one workspace.", expectedOutcome: "Less operational dependence on disconnected records." },
      { name: "Customer notifications", slug: "customer-notifications", description: "Approved status changes can trigger communication through configured providers.", expectedOutcome: "Customers receive more timely delivery information." },
    ],
    outcomes: [
      { title: "Clearer parcel visibility", slug: "clearer-parcel-visibility", description: "Customers and operators can follow delivery state through one system." },
      { title: "More structured dispatch", slug: "structured-dispatch", description: "Assignments and operational status become explicit records rather than informal coordination." },
      { title: "Expandable logistics foundation", slug: "expandable-logistics-foundation", description: "The first release can grow toward fleet, routing, proof-of-delivery and reporting capabilities where required." },
    ],
    milestones: COMMON_MILESTONES,
    faqs: COMMON_FAQS,
    onboarding: [
      ...COMMON_ONBOARDING,
      { key: "shipment-lifecycle", label: "What shipment or delivery statuses do you currently use?", type: "LONG_TEXT", required: true },
      { key: "fleet-model", label: "Who performs deliveries?", type: "SINGLE_SELECT", required: true, options: [
        { value: "own-riders", label: "Our own riders/drivers" },
        { value: "partners", label: "External delivery partners" },
        { value: "mixed", label: "A mixture of both" },
        { value: "undecided", label: "Still deciding" },
      ] },
      { key: "mapping-needed", label: "Do you need live maps, route or location features?", type: "BOOLEAN", required: false },
    ],
  },

  "gaming-interactive-platforms": {
    deliveryMinDays: 28,
    deliveryMaxDays: 120,
    deliveryNote:
      "Interactive and gaming products vary widely. Account systems, wallet/history views, provider integrations and regulated gaming features require deeper review. Any gambling operation must be legally permitted and appropriately licensed by the client.",
    technologies: [
      tech("Next.js", "nextjs", "Application", "Player-facing and operational application surfaces.", "It supports account-driven interactive products with strong routing and server application capabilities.", true),
      tech("PostgreSQL", "postgresql", "Database", "Accounts, activity, rewards, transactions and administration records.", "Interactive systems benefit from a structured relational source of truth for user and operational history.", true),
      tech("Provider APIs", "provider-apis", "Integration", "Approved game, content, wallet or identity providers.", "External licensed or specialized capabilities should be integrated through clear boundaries rather than recreated casually."),
      tech("TypeScript", "typescript", "Engineering", "Explicit contracts across interactive states and provider data.", "Complex account and activity flows become easier to reason about when contracts are typed."),
    ],
    features: [
      { name: "Player or member accounts", slug: "player-member-accounts", description: "Authenticated accounts with profile and activity surfaces appropriate to the product.", expectedOutcome: "Users have a consistent identity across supported platform experiences.", featured: true },
      { name: "Activity & history", slug: "activity-history", description: "Relevant user actions, rewards, wallet or content activity can be surfaced through structured history.", expectedOutcome: "Users and operators can understand previous platform activity more clearly." },
      { name: "Provider integrations", slug: "provider-integrations", description: "Approved external content or gaming providers can be connected through controlled application boundaries.", expectedOutcome: "Specialized capabilities remain separated from the core application logic." },
      { name: "Administration dashboard", slug: "administration-dashboard", description: "Operational tools for accounts, content, activity and support workflows.", expectedOutcome: "Platform management is separated from the public user experience." },
      { name: "Rewards & engagement", slug: "rewards-engagement", description: "Points, achievements, campaigns or loyalty mechanics can be modelled where appropriate.", expectedOutcome: "The product can support structured engagement beyond a static interface." },
    ],
    outcomes: [
      { title: "Account-driven experience", slug: "account-driven-experience", description: "Users interact through a persistent profile and activity model rather than disconnected sessions." },
      { title: "Operational control", slug: "operational-control", description: "Administrators have a distinct workspace for managing supported platform activity." },
      { title: "Integration-ready product", slug: "integration-ready-product", description: "External content or gaming systems can connect through deliberate provider boundaries." },
    ],
    milestones: COMMON_MILESTONES,
    faqs: [
      ...COMMON_FAQS,
      { slug: "gaming-licence", question: "Does Rcentz provide gambling or casino licences?", answer: "No. Rcentz can provide software engineering for legally permitted projects. Licensing, gambling compliance, jurisdictional restrictions, responsible-gaming obligations and regulated operations remain the client's responsibility." },
    ],
    onboarding: [
      ...COMMON_ONBOARDING,
      { key: "platform-model", label: "What kind of interactive or gaming platform are you planning?", type: "LONG_TEXT", required: true },
      { key: "licensed-operation", label: "If gambling functionality is involved, is the operating entity appropriately licensed for the intended jurisdiction?", type: "BOOLEAN", required: false },
      { key: "providers", label: "Which content, game, wallet or identity providers are already selected?", type: "LONG_TEXT", required: false },
    ],
  },
};

const FALLBACK_PROFILE: ServiceIntelligenceProfile = {
  deliveryMinDays: 14,
  deliveryMaxDays: 60,
  deliveryNote:
    "The final delivery range is confirmed after discovery because project size, integrations and review cycles vary.",
  technologies: [
    tech("Next.js", "nextjs", "Application", "Modern web application delivery.", "It is a flexible foundation for many Rcentz web products.", true),
    tech("TypeScript", "typescript", "Engineering", "Type-safe implementation.", "It improves contracts between application layers as scope grows."),
    tech("PostgreSQL", "postgresql", "Database", "Structured relational data when the service needs persistent application records.", "Relational modelling is appropriate for many business workflows."),
  ],
  features: [
    { name: "Responsive experience", slug: "responsive-experience", description: "A deliberate interface across supported screen sizes.", expectedOutcome: "The core experience remains usable across common devices.", featured: true },
    { name: "Structured workflows", slug: "structured-workflows", description: "Important application actions are represented through explicit flows and states.", expectedOutcome: "The product is easier to understand and operate." },
    { name: "Maintainable foundation", slug: "maintainable-foundation", description: "The implementation is structured for future improvement where the scope allows.", expectedOutcome: "New work can build on a clearer technical base." },
  ],
  outcomes: [
    { title: "Clearer product experience", slug: "clearer-product-experience", description: "The finished service is shaped around an explicit user and business objective." },
    { title: "Structured implementation", slug: "structured-implementation", description: "The solution is delivered around defined workflows rather than disconnected pages." },
  ],
  milestones: COMMON_MILESTONES,
  faqs: COMMON_FAQS,
  onboarding: COMMON_ONBOARDING,
};

export function getServiceIntelligenceProfile(categorySlug?: string | null) {
  if (!categorySlug) {
    return FALLBACK_PROFILE;
  }

  return PROFILES[categorySlug] ?? FALLBACK_PROFILE;
}
