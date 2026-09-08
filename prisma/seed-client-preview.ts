import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../generated/prisma/client';

const directUrl = process.env.DIRECT_URL?.trim();

if (!directUrl) {
  throw new Error('DIRECT_URL is not set');
}

const adapter = new PrismaPg({
  connectionString: directUrl,
});

const prisma = new PrismaClient({
  adapter,
});

function daysFromNow(days: number) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date;
}

function requireClientEmail() {
  const value = process.argv[2]?.trim().toLowerCase();

  if (!value) {
    throw new Error(
      'Usage: pnpm tsx prisma/seed-client-preview.ts <client-email>',
    );
  }

  return value;
}

async function main() {
  const email = requireClientEmail();

  console.log('Starting client dashboard preview seed...');
  console.log(`Target account: ${email}`);

  const client = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });

  if (!client) {
    throw new Error(`No Rcentz user exists with email: ${email}`);
  }

  if (client.status !== 'ACTIVE') {
    throw new Error(
      `The target account is ${client.status}. Preview data was not assigned.`,
    );
  }

  const admin = await prisma.user.findFirst({
    where: {
      role: {
        in: ['SUPER_ADMIN', 'ADMIN'],
      },
      status: 'ACTIVE',
    },
    orderBy: {
      createdAt: 'asc',
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!admin) {
    throw new Error(
      'No active Rcentz administrator exists. The preview project needs an administrator as its canonical creator.',
    );
  }

  await prisma.user.update({
    where: {
      id: client.id,
    },
    data: {
      role: 'CLIENT',
    },
  });

  await prisma.clientProfile.upsert({
    where: {
      userId: client.id,
    },
    update: {},
    create: {
      userId: client.id,
    },
  });

  const suffix = client.id.slice(-8).toLowerCase();

  const planSlug = `preview-managed-support-${suffix}`;
  const subscriptionNumber = `RCZ-SUB-${suffix.toUpperCase()}`;
  const projectSlug = `preview-client-workspace-${suffix}`;

  const servicePlan = await prisma.servicePlan.upsert({
    where: {
      slug: planSlug,
    },
    update: {
      clientId: client.id,
      createdById: admin.id,
      name: 'Rcentz Managed Support',
      shortDescription:
        'Managed support, maintenance and project continuity for the preview client workspace.',
      description:
        'Preview service plan used to exercise subscription, renewal and entitlement presentation in the client dashboard.',
      status: 'ACTIVE',
      visibility: 'PRIVATE',
      isCustom: true,
      featured: false,
    },
    create: {
      createdById: admin.id,
      clientId: client.id,
      name: 'Rcentz Managed Support',
      slug: planSlug,
      shortDescription:
        'Managed support, maintenance and project continuity for the preview client workspace.',
      description:
        'Preview service plan used to exercise subscription, renewal and entitlement presentation in the client dashboard.',
      status: 'ACTIVE',
      visibility: 'PRIVATE',
      isCustom: true,
      featured: false,
    },
  });

  let planPrice = await prisma.servicePlanPrice.findFirst({
    where: {
      planId: servicePlan.id,
      currency: 'NGN',
      intervalUnit: 'MONTH',
      intervalCount: 1,
    },
  });

  if (!planPrice) {
    planPrice = await prisma.servicePlanPrice.create({
      data: {
        planId: servicePlan.id,
        label: 'Monthly managed support',
        amount: 150000,
        currency: 'NGN',
        intervalUnit: 'MONTH',
        intervalCount: 1,
        setupFee: 0,
        trialDays: 0,
        active: true,
      },
    });
  } else {
    planPrice = await prisma.servicePlanPrice.update({
      where: {
        id: planPrice.id,
      },
      data: {
        label: 'Monthly managed support',
        amount: 150000,
        active: true,
      },
    });
  }

  const subscription = await prisma.clientSubscription.upsert({
    where: {
      subscriptionNumber,
    },
    update: {
      clientId: client.id,
      planId: servicePlan.id,
      priceId: planPrice.id,
      createdById: admin.id,
      status: 'ACTIVE',
      priceAmount: 150000,
      currency: 'NGN',
      intervalUnit: 'MONTH',
      intervalCount: 1,
      setupFee: 0,
      autoRenew: true,
      cancelAtPeriodEnd: false,
      currentPeriodStart: daysFromNow(-1),
      currentPeriodEnd: daysFromNow(29),
      nextBillingAt: daysFromNow(29),
      startedAt: daysFromNow(-31),
      notes:
        'Preview subscription used while designing the client project workspace.',
    },
    create: {
      clientId: client.id,
      planId: servicePlan.id,
      priceId: planPrice.id,
      createdById: admin.id,
      subscriptionNumber,
      status: 'ACTIVE',
      priceAmount: 150000,
      currency: 'NGN',
      intervalUnit: 'MONTH',
      intervalCount: 1,
      setupFee: 0,
      autoRenew: true,
      cancelAtPeriodEnd: false,
      currentPeriodStart: daysFromNow(-1),
      currentPeriodEnd: daysFromNow(29),
      nextBillingAt: daysFromNow(29),
      startedAt: daysFromNow(-31),
      notes:
        'Preview subscription used while designing the client project workspace.',
    },
  });

  const entitlements = [
    {
      key: 'support-requests',
      name: 'Support requests',
      description:
        'Included support requests during the current billing period.',
      limitValue: 5,
      usedValue: 2,
      unit: 'requests',
      unlimited: false,
    },
    {
      key: 'maintenance-monitoring',
      name: 'Maintenance monitoring',
      description:
        'Ongoing project health and maintenance monitoring.',
      limitValue: null,
      usedValue: 0,
      unit: null,
      unlimited: true,
    },
  ] as const;

  for (const entitlement of entitlements) {
    await prisma.subscriptionEntitlement.upsert({
      where: {
        subscriptionId_key: {
          subscriptionId: subscription.id,
          key: entitlement.key,
        },
      },
      update: {
        name: entitlement.name,
        description: entitlement.description,
        limitValue: entitlement.limitValue,
        usedValue: entitlement.usedValue,
        unit: entitlement.unit,
        unlimited: entitlement.unlimited,
        usageResetAt: daysFromNow(29),
      },
      create: {
        subscriptionId: subscription.id,
        key: entitlement.key,
        name: entitlement.name,
        description: entitlement.description,
        limitValue: entitlement.limitValue,
        usedValue: entitlement.usedValue,
        unit: entitlement.unit,
        unlimited: entitlement.unlimited,
        usageResetAt: daysFromNow(29),
      },
    });
  }

  const project = await prisma.project.upsert({
    where: {
      slug: projectSlug,
    },
    update: {
      clientId: client.id,
      subscriptionId: subscription.id,
      name: 'Rcentz Client Portal',
      description:
        'A protected client project workspace for transparent delivery tracking, communication, finance, renewals and project accountability.',
      purpose:
        'Give the client one authoritative workspace to understand what Rcentz is building, why each delivery stage exists, what has been completed and what currently requires attention.',
      vision:
        'Create a project experience where clients never need to guess the status, financial state, blockers or next action of an active Rcentz engagement.',
      expectedOutcome:
        'A clear project control surface covering deliverables, milestones, payments, subscriptions, blockers, reports and recent project activity.',
      type: 'WEB_APP',
      status: 'DEVELOPMENT',
      visibility: 'PRIVATE',
      progress: 68,
      budget: 1200000,
      currency: 'NGN',
      startedAt: daysFromNow(-14),
      expectedEndAt: daysFromNow(20),
      completedAt: null,
    },
    create: {
      clientId: client.id,
      subscriptionId: subscription.id,
      name: 'Rcentz Client Portal',
      slug: projectSlug,
      description:
        'A protected client project workspace for transparent delivery tracking, communication, finance, renewals and project accountability.',
      purpose:
        'Give the client one authoritative workspace to understand what Rcentz is building, why each delivery stage exists, what has been completed and what currently requires attention.',
      vision:
        'Create a project experience where clients never need to guess the status, financial state, blockers or next action of an active Rcentz engagement.',
      expectedOutcome:
        'A clear project control surface covering deliverables, milestones, payments, subscriptions, blockers, reports and recent project activity.',
      type: 'WEB_APP',
      status: 'DEVELOPMENT',
      visibility: 'PRIVATE',
      progress: 68,
      budget: 1200000,
      currency: 'NGN',
      startedAt: daysFromNow(-14),
      expectedEndAt: daysFromNow(20),
    },
  });

  await prisma.portfolioProfile.upsert({
    where: {
      projectId: project.id,
    },
    update: {
      tagline: 'Transparent project delivery, in one workspace.',
      summary:
        'Rcentz client project control surface for delivery, finance, renewals and support.',
      liveUrl: 'https://rcentz.cc',
      repositoryUrl: 'https://github.com/devkiddz/rcentz',
      featured: false,
    },
    create: {
      projectId: project.id,
      tagline: 'Transparent project delivery, in one workspace.',
      summary:
        'Rcentz client project control surface for delivery, finance, renewals and support.',
      liveUrl: 'https://rcentz.cc',
      repositoryUrl: 'https://github.com/devkiddz/rcentz',
      featured: false,
    },
  });

  const technologyDefinitions = [
    {
      name: 'Next.js',
      slug: 'nextjs',
      icon: 'siNextdotjs',
      category: 'Framework',
      description:
        'Application framework powering the Rcentz web platform.',
      purpose:
        'Server rendering, application routing, React composition and production delivery.',
      rationale:
        'Rcentz uses Next.js as the primary foundation for its reusable application architecture.',
      sortOrder: 1,
      featured: true,
    },
    {
      name: 'React',
      slug: 'react',
      icon: 'siReact',
      category: 'Frontend',
      description:
        'Component model used throughout the application UI.',
      purpose:
        'Reusable interactive interfaces and application composition.',
      rationale:
        'React provides the component architecture used by the Rcentz interface system.',
      sortOrder: 2,
      featured: true,
    },
    {
      name: 'TypeScript',
      slug: 'typescript',
      icon: 'siTypescript',
      category: 'Language',
      description:
        'Typed application language used across client and server code.',
      purpose:
        'Protect data contracts and improve application maintainability.',
      rationale:
        'Strong typing is important for the project-management and finance domain contracts.',
      sortOrder: 3,
      featured: true,
    },
    {
      name: 'Tailwind CSS',
      slug: 'tailwind-css',
      icon: 'siTailwindcss',
      category: 'Styling',
      description:
        'Utility-first styling system used by the Rcentz UI.',
      purpose:
        'Responsive layout, design tokens and precise interface composition.',
      rationale:
        'Tailwind keeps the visual system fast to iterate while remaining component driven.',
      sortOrder: 4,
      featured: true,
    },
    {
      name: 'Base UI',
      slug: 'base-ui',
      icon: null,
      category: 'UI',
      description:
        'Accessible primitive foundation used by the Rcentz component system.',
      purpose:
        'Accessible interaction primitives for reusable product components.',
      rationale:
        'Rcentz uses Base UI through its shadcn-compatible component foundation.',
      sortOrder: 5,
      featured: false,
    },
    {
      name: 'Prisma',
      slug: 'prisma',
      icon: 'siPrisma',
      category: 'Data',
      description:
        'ORM and schema foundation for the Rcentz canonical database.',
      purpose:
        'Typed project, finance, authentication and service data access.',
      rationale:
        'Prisma provides a strongly typed source of truth across application domains.',
      sortOrder: 6,
      featured: true,
    },
    {
      name: 'PostgreSQL',
      slug: 'postgresql',
      icon: 'siPostgresql',
      category: 'Database',
      description:
        'Relational database backing the Rcentz platform.',
      purpose:
        'Persistent application, project, finance and user data storage.',
      rationale:
        'The relational project model benefits from PostgreSQL consistency and query capability.',
      sortOrder: 7,
      featured: true,
    },
    {
      name: 'Better Auth',
      slug: 'better-auth',
      icon: null,
      category: 'Authentication',
      description:
        'Authentication foundation for Rcentz account access.',
      purpose:
        'User registration, login, sessions and protected workspace access.',
      rationale:
        'Better Auth supports the custom authentication experience required by Rcentz.',
      sortOrder: 8,
      featured: false,
    },
    {
      name: 'Motion',
      slug: 'motion',
      icon: 'siFramer',
      category: 'Interaction',
      description:
        'Motion library used for restrained application transitions.',
      purpose:
        'Controlled interactive transitions where motion improves clarity.',
      rationale:
        'Rcentz uses motion selectively rather than as decorative animation.',
      sortOrder: 9,
      featured: false,
    },
    {
      name: 'Vercel',
      slug: 'vercel',
      icon: 'siVercel',
      category: 'Hosting',
      description:
        'Production hosting and deployment platform for Rcentz.',
      purpose:
        'Application deployment, production delivery and preview environments.',
      rationale:
        'Vercel provides the production platform used for the current Rcentz web application.',
      sortOrder: 10,
      featured: true,
    },
  ] as const;

  for (const technology of technologyDefinitions) {
    await prisma.projectTechnology.upsert({
      where: {
        projectId_slug: {
          projectId: project.id,
          slug: technology.slug,
        },
      },
      update: {
        name: technology.name,
        icon: technology.icon,
        category: technology.category,
        description: technology.description,
        purpose: technology.purpose,
        rationale: technology.rationale,
        sortOrder: technology.sortOrder,
        featured: technology.featured,
      },
      create: {
        projectId: project.id,
        name: technology.name,
        slug: technology.slug,
        icon: technology.icon,
        category: technology.category,
        description: technology.description,
        purpose: technology.purpose,
        rationale: technology.rationale,
        sortOrder: technology.sortOrder,
        featured: technology.featured,
      },
    });
  }

  await prisma.mediaAsset.deleteMany({
    where: {
      projectId: project.id,
      projectUpdateId: null,
    },
  });

  await prisma.mediaAsset.createMany({
    data: [
      {
        projectId: project.id,
        url: '/portfolio/screenshots/rcentz-systems/01-home-desktop.webp',
        fileName: '01-home-desktop.webp',
        mimeType: 'image/webp',
        alt: 'Rcentz Systems homepage desktop view',
        caption: 'Current Rcentz Systems homepage',
        sortOrder: 1,
      },
      {
        projectId: project.id,
        url: '/portfolio/screenshots/rcentz-systems/02-home-detail-desktop.webp',
        fileName: '02-home-detail-desktop.webp',
        mimeType: 'image/webp',
        alt: 'Rcentz Systems homepage detail desktop view',
        caption: 'Rcentz Systems homepage detail',
        sortOrder: 2,
      },
    ],
  });

  const milestoneDefinitions = [
    {
      slug: 'authentication-foundation',
      title: 'Authentication Foundation',
      description:
        'Identity, session and protected workspace foundation.',
      purpose:
        'Establish secure access before exposing client project records.',
      expectedOutcome:
        'Authenticated clients can safely enter a protected Rcentz workspace.',
      status: 'COMPLETED' as const,
      priority: 'HIGH' as const,
      progress: 100,
      sortOrder: 1,
      startedAt: daysFromNow(-14),
      dueDate: daysFromNow(-8),
      completedAt: daysFromNow(-8),
      completionNotes:
        'Registration, login, protected dashboard boundaries and client session presentation are operational.',
    },
    {
      slug: 'client-project-management',
      title: 'Client Project Management',
      description:
        'The client-facing project control and visibility layer.',
      purpose:
        'Expose canonical project delivery information in a structured client workspace.',
      expectedOutcome:
        'Clients can understand project state, deliverables, milestones, finance and required actions.',
      status: 'IN_PROGRESS' as const,
      priority: 'HIGH' as const,
      progress: 68,
      sortOrder: 2,
      startedAt: daysFromNow(-7),
      dueDate: daysFromNow(7),
      completedAt: null,
      completionNotes: null,
    },
    {
      slug: 'production-handover',
      title: 'Production & Handover',
      description:
        'Final release validation, deployment and client handover.',
      purpose:
        'Move the approved client workspace into its production-ready delivery state.',
      expectedOutcome:
        'A validated production release with clear handover and continuity information.',
      status: 'PLANNED' as const,
      priority: 'NORMAL' as const,
      progress: 15,
      sortOrder: 3,
      startedAt: null,
      dueDate: daysFromNow(20),
      completedAt: null,
      completionNotes: null,
    },
  ];

  const milestones = new Map<string, { id: string }>();

  for (const item of milestoneDefinitions) {
    const milestone = await prisma.projectMilestone.upsert({
      where: {
        projectId_slug: {
          projectId: project.id,
          slug: item.slug,
        },
      },
      update: {
        createdById: admin.id,
        title: item.title,
        description: item.description,
        purpose: item.purpose,
        expectedOutcome: item.expectedOutcome,
        status: item.status,
        priority: item.priority,
        visibility: 'CLIENT',
        sortOrder: item.sortOrder,
        progress: item.progress,
        startedAt: item.startedAt,
        dueDate: item.dueDate,
        completedAt: item.completedAt,
        completionNotes: item.completionNotes,
      },
      create: {
        projectId: project.id,
        createdById: admin.id,
        title: item.title,
        slug: item.slug,
        description: item.description,
        purpose: item.purpose,
        expectedOutcome: item.expectedOutcome,
        status: item.status,
        priority: item.priority,
        visibility: 'CLIENT',
        sortOrder: item.sortOrder,
        progress: item.progress,
        startedAt: item.startedAt,
        dueDate: item.dueDate,
        completedAt: item.completedAt,
        completionNotes: item.completionNotes,
      },
      select: {
        id: true,
      },
    });

    milestones.set(item.slug, milestone);
  }

  const authenticationMilestone = milestones.get(
    'authentication-foundation',
  );

  const clientWorkspaceMilestone = milestones.get(
    'client-project-management',
  );

  const handoverMilestone = milestones.get('production-handover');

  if (
    !authenticationMilestone ||
    !clientWorkspaceMilestone ||
    !handoverMilestone
  ) {
    throw new Error('Preview milestone creation was incomplete.');
  }

  const deliverableDefinitions = [
    {
      slug: 'authentication-system',
      milestoneId: authenticationMilestone.id,
      title: 'Authentication System',
      type: 'FEATURE' as const,
      summary:
        'Protected registration, login and authenticated workspace access.',
      agreementSummary:
        'Provide secure account access before client project information is exposed.',
      rationale:
        'Project records and client financial information require authenticated access.',
      expectedOutcome:
        'Only authenticated active users can access their assigned client workspace.',
      status: 'DELIVERED' as const,
      progress: 100,
      sortOrder: 1,
      originalDueDate: daysFromNow(-8),
      dueDate: daysFromNow(-8),
      deliveredAt: daysFromNow(-8),
      extensionReason: null,
      completionNotes:
        'Core authentication and protected dashboard boundaries are operational.',
    },
    {
      slug: 'client-dashboard',
      milestoneId: clientWorkspaceMilestone.id,
      title: 'Client Dashboard',
      type: 'PAGE' as const,
      summary:
        'Primary client-facing project control surface.',
      agreementSummary:
        'Provide a central client dashboard summarizing active project delivery and client responsibilities.',
      rationale:
        'Clients need one reliable project overview instead of fragmented project updates.',
      expectedOutcome:
        'The client can understand current state, progress, delivery, finance and blockers at a glance.',
      status: 'IN_PROGRESS' as const,
      progress: 68,
      sortOrder: 2,
      originalDueDate: daysFromNow(4),
      dueDate: daysFromNow(7),
      deliveredAt: null,
      extensionReason:
        'The project-control data contract was expanded to include deliverables, finance, subscriptions, blockers and issues before presentation was finalized.',
      completionNotes: null,
    },
    {
      slug: 'financial-tracker',
      milestoneId: clientWorkspaceMilestone.id,
      title: 'Project Financial Tracker',
      type: 'FEATURE' as const,
      summary:
        'Project-linked invoices, payments, outstanding balances and payment consequences.',
      agreementSummary:
        'Make project financial obligations visible within the same delivery workspace.',
      rationale:
        'Payment state can directly affect delivery and should never be disconnected from project progress.',
      expectedOutcome:
        'The client understands what has been billed, paid, added and what remains outstanding.',
      status: 'IN_PROGRESS' as const,
      progress: 45,
      sortOrder: 3,
      originalDueDate: daysFromNow(10),
      dueDate: daysFromNow(10),
      deliveredAt: null,
      extensionReason: null,
      completionNotes: null,
    },
    {
      slug: 'production-handover',
      milestoneId: handoverMilestone.id,
      title: 'Production Release & Handover',
      type: 'HANDOVER' as const,
      summary:
        'Production validation, release and project continuity handover.',
      agreementSummary:
        'Deliver the approved project into production with final handover information.',
      rationale:
        'A project is not complete until the production state and continuity responsibilities are clear.',
      expectedOutcome:
        'The approved workspace is production-ready and formally handed over.',
      status: 'PLANNED' as const,
      progress: 15,
      sortOrder: 4,
      originalDueDate: daysFromNow(20),
      dueDate: daysFromNow(20),
      deliveredAt: null,
      extensionReason: null,
      completionNotes: null,
    },
  ];

  const deliverables = new Map<string, { id: string }>();

  for (const item of deliverableDefinitions) {
    const deliverable = await prisma.projectDeliverable.upsert({
      where: {
        projectId_slug: {
          projectId: project.id,
          slug: item.slug,
        },
      },
      update: {
        milestoneId: item.milestoneId,
        createdById: admin.id,
        title: item.title,
        type: item.type,
        summary: item.summary,
        agreementSummary: item.agreementSummary,
        rationale: item.rationale,
        expectedOutcome: item.expectedOutcome,
        status: item.status,
        visibility: 'CLIENT',
        progress: item.progress,
        sortOrder: item.sortOrder,
        originalDueDate: item.originalDueDate,
        dueDate: item.dueDate,
        deliveredAt: item.deliveredAt,
        extensionReason: item.extensionReason,
        completionNotes: item.completionNotes,
      },
      create: {
        projectId: project.id,
        milestoneId: item.milestoneId,
        createdById: admin.id,
        title: item.title,
        slug: item.slug,
        type: item.type,
        summary: item.summary,
        agreementSummary: item.agreementSummary,
        rationale: item.rationale,
        expectedOutcome: item.expectedOutcome,
        status: item.status,
        visibility: 'CLIENT',
        progress: item.progress,
        sortOrder: item.sortOrder,
        originalDueDate: item.originalDueDate,
        dueDate: item.dueDate,
        deliveredAt: item.deliveredAt,
        extensionReason: item.extensionReason,
        completionNotes: item.completionNotes,
      },
      select: {
        id: true,
      },
    });

    deliverables.set(item.slug, deliverable);
  }

  const clientDashboard = deliverables.get('client-dashboard');
  const productionHandover = deliverables.get('production-handover');

  if (!clientDashboard || !productionHandover) {
    throw new Error('Preview deliverable creation was incomplete.');
  }

  const paidInvoiceNumber = `RCZ-${suffix.toUpperCase()}-001`;
  const dueInvoiceNumber = `RCZ-${suffix.toUpperCase()}-002`;

  const paidInvoice = await prisma.invoice.upsert({
    where: {
      invoiceNumber: paidInvoiceNumber,
    },
    update: {
      clientId: client.id,
      createdById: admin.id,
      projectId: project.id,
      sourceType: 'PROJECT',
      status: 'PAID',
      currency: 'NGN',
      subtotal: 650000,
      discount: 0,
      tax: 0,
      total: 650000,
      amountPaid: 650000,
      balanceDue: 0,
      customerName: client.name,
      customerEmail: client.email,
      notes:
        'Initial project implementation and authenticated workspace foundation.',
      issuedAt: daysFromNow(-14),
      dueAt: daysFromNow(-12),
      paidAt: daysFromNow(-12),
    },
    create: {
      clientId: client.id,
      createdById: admin.id,
      projectId: project.id,
      invoiceNumber: paidInvoiceNumber,
      sourceType: 'PROJECT',
      status: 'PAID',
      currency: 'NGN',
      subtotal: 650000,
      discount: 0,
      tax: 0,
      total: 650000,
      amountPaid: 650000,
      balanceDue: 0,
      customerName: client.name,
      customerEmail: client.email,
      notes:
        'Initial project implementation and authenticated workspace foundation.',
      issuedAt: daysFromNow(-14),
      dueAt: daysFromNow(-12),
      paidAt: daysFromNow(-12),
    },
  });

  const dueInvoice = await prisma.invoice.upsert({
    where: {
      invoiceNumber: dueInvoiceNumber,
    },
    update: {
      clientId: client.id,
      createdById: admin.id,
      projectId: project.id,
      sourceType: 'PROJECT',
      status: 'ISSUED',
      currency: 'NGN',
      subtotal: 250000,
      discount: 0,
      tax: 0,
      total: 250000,
      amountPaid: 0,
      balanceDue: 250000,
      customerName: client.name,
      customerEmail: client.email,
      notes:
        'Production deployment and final release validation.',
      issuedAt: daysFromNow(-1),
      dueAt: daysFromNow(3),
      paidAt: null,
    },
    create: {
      clientId: client.id,
      createdById: admin.id,
      projectId: project.id,
      invoiceNumber: dueInvoiceNumber,
      sourceType: 'PROJECT',
      status: 'ISSUED',
      currency: 'NGN',
      subtotal: 250000,
      discount: 0,
      tax: 0,
      total: 250000,
      amountPaid: 0,
      balanceDue: 250000,
      customerName: client.name,
      customerEmail: client.email,
      notes:
        'Production deployment and final release validation.',
      issuedAt: daysFromNow(-1),
      dueAt: daysFromNow(3),
    },
  });

  await prisma.invoiceItem.deleteMany({
    where: {
      invoiceId: {
        in: [paidInvoice.id, dueInvoice.id],
      },
    },
  });

  await prisma.invoiceItem.createMany({
    data: [
      {
        invoiceId: paidInvoice.id,
        type: 'PROJECT',
        name: 'Project foundation & authentication',
        description:
          'Core project foundation, authentication and protected workspace implementation.',
        quantity: 1,
        unitPrice: 650000,
        total: 650000,
      },
      {
        invoiceId: dueInvoice.id,
        type: 'PROJECT',
        name: 'Production deployment & release validation',
        description:
          'Final production deployment, release validation and handover preparation.',
        quantity: 1,
        unitPrice: 250000,
        total: 250000,
      },
    ],
  });

  await prisma.payment.upsert({
    where: {
      reference: `RCZ-PAY-${suffix.toUpperCase()}-001`,
    },
    update: {
      invoiceId: paidInvoice.id,
      payerId: client.id,
      amount: 650000,
      currency: 'NGN',
      method: 'BANK_TRANSFER',
      provider: 'BANK_TRANSFER',
      status: 'SUCCESS',
      providerName: 'Preview bank transfer',
      paidAt: daysFromNow(-12),
    },
    create: {
      invoiceId: paidInvoice.id,
      payerId: client.id,
      amount: 650000,
      currency: 'NGN',
      method: 'BANK_TRANSFER',
      provider: 'BANK_TRANSFER',
      status: 'SUCCESS',
      providerName: 'Preview bank transfer',
      reference: `RCZ-PAY-${suffix.toUpperCase()}-001`,
      paidAt: daysFromNow(-12),
    },
  });

  await prisma.projectProcess.deleteMany({
    where: {
      projectId: project.id,
    },
  });

  await prisma.projectProcess.createMany({
    data: [
      {
        projectId: project.id,
        milestoneId: handoverMilestone.id,
        deliverableId: productionHandover.id,
        invoiceId: dueInvoice.id,
        createdById: admin.id,
        type: 'PAYMENT',
        status: 'PENDING',
        title: 'Production deployment payment',
        description:
          'The next project payment is required before final production release.',
        reason:
          'This payment funds production deployment, release validation and handover preparation.',
        impact:
          'Production release remains paused until the payment requirement is resolved.',
        blocking: true,
        requiresClientAction: true,
        visibility: 'CLIENT',
        sortOrder: 1,
        dueAt: daysFromNow(3),
      },
      {
        projectId: project.id,
        milestoneId: clientWorkspaceMilestone.id,
        deliverableId: clientDashboard.id,
        createdById: admin.id,
        type: 'CLIENT_APPROVAL',
        status: 'PENDING',
        title: 'Dashboard information architecture approval',
        description:
          'Review the client Overview structure before the concrete project pages are finalized.',
        reason:
          'The Overview defines how project truth is summarized across the rest of the workspace.',
        impact:
          'Engineering can continue, but final presentation decisions depend on this review.',
        blocking: false,
        requiresClientAction: true,
        visibility: 'CLIENT',
        sortOrder: 2,
        dueAt: daysFromNow(2),
      },
    ],
  });

  await prisma.supportTicket.deleteMany({
    where: {
      projectId: project.id,
    },
  });

  await prisma.supportTicket.createMany({
    data: [
      {
        projectId: project.id,
        creatorId: client.id,
        assigneeId: admin.id,
        ticketNumber: `RCZ-TKT-${suffix.toUpperCase()}-014`,
        type: 'BUG',
        subject: 'Payment confirmation callback',
        description:
          'Preview issue showing how an active project bug appears inside the client workspace.',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        visibility: 'CLIENT',
      },
      {
        projectId: project.id,
        creatorId: client.id,
        assigneeId: admin.id,
        ticketNumber: `RCZ-TKT-${suffix.toUpperCase()}-015`,
        type: 'CHANGE_REQUEST',
        subject: 'Project Overview financial visibility',
        description:
          'Preview change request for surfacing project money and payment consequences more clearly.',
        status: 'WAITING_FOR_STAFF',
        priority: 'NORMAL',
        visibility: 'CLIENT',
      },
    ],
  });

  await prisma.projectUpdate.deleteMany({
    where: {
      projectId: project.id,
    },
  });

  await prisma.projectUpdate.createMany({
    data: [
      {
        projectId: project.id,
        milestoneId: clientWorkspaceMilestone.id,
        authorId: admin.id,
        title: 'Project control foundation expanded',
        description:
          'Deliverables, project requirements, finance, subscriptions and project-aware tickets are now part of the canonical client workspace contract.',
        type: 'IMPROVEMENT',
        visibility: 'CLIENT',
        progress: 68,
        createdAt: daysFromNow(0),
      },
      {
        projectId: project.id,
        milestoneId: authenticationMilestone.id,
        authorId: admin.id,
        title: 'Client authentication operational',
        description:
          'Registration, login and protected dashboard access are operational for the client workspace.',
        type: 'COMPLETION',
        visibility: 'CLIENT',
        progress: 100,
        createdAt: daysFromNow(-1),
      },
      {
        projectId: project.id,
        milestoneId: clientWorkspaceMilestone.id,
        authorId: admin.id,
        title: 'Financial visibility added to project scope',
        description:
          'Invoices, successful payments, outstanding balances and subscription renewal state are now available to the client Overview.',
        type: 'NEW_FEATURE',
        visibility: 'CLIENT',
        progress: 60,
        createdAt: daysFromNow(-2),
      },
    ],
  });

  await prisma.projectActivity.deleteMany({
    where: {
      projectId: project.id,
    },
  });

  await prisma.projectActivity.createMany({
    data: [
      {
        projectId: project.id,
        userId: admin.id,
        type: 'PROGRESS_UPDATED',
        title: 'Client workspace progress updated to 68%',
        description:
          'Project data contracts are complete enough to continue visual dashboard implementation.',
        visibility: 'CLIENT',
        createdAt: daysFromNow(0),
      },
      {
        projectId: project.id,
        userId: client.id,
        type: 'PAYMENT_RECEIVED',
        title: 'Initial project payment received',
        description:
          '₦650,000 has been recorded against the project.',
        visibility: 'CLIENT',
        createdAt: daysFromNow(-12),
      },
    ],
  });

  console.log('');
  console.log('Client dashboard preview project ready.');
  console.log({
    client: client.email,
    project: project.name,
    projectSlug: project.slug,
    progress: project.progress,
    subscription: subscription.subscriptionNumber,
    paidInvoice: paidInvoice.invoiceNumber,
    outstandingInvoice: dueInvoice.invoiceNumber,
  });
}

main()
  .catch((error) => {
    console.error('');
    console.error('Client preview seed failed.');
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
