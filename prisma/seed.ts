import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

import {
  projectSeedManifest,
  type SeedProjectMilestone,
} from "./seed-data/projects";

import { serviceSeedManifest } from "./seed-data/services";

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function toDate(value?: string) {
  return value ? new Date(value) : null;
}

function getMilestoneProgress(status: SeedProjectMilestone["status"]) {
  switch (status) {
    case "COMPLETED":
      return 100;

    case "REVIEW":
      return 75;

    case "IN_PROGRESS":
      return 40;

    case "PLANNED":
    default:
      return 0;
  }
}

function getProjectProgress(milestones: SeedProjectMilestone[]) {
  if (milestones.length === 0) {
    return 0;
  }

  const total = milestones.reduce(
    (sum, milestone) => sum + getMilestoneProgress(milestone.status),
    0,
  );

  return Math.round(total / milestones.length);
}

async function seedOfficialAdmin() {
  const name = getRequiredEnv("SEED_ADMIN_NAME");
  const email = getRequiredEnv("SEED_ADMIN_EMAIL").toLowerCase();
  const password = getRequiredEnv("SEED_ADMIN_PASSWORD");

  if (password.length < 12) {
    throw new Error(
      "SEED_ADMIN_PASSWORD must contain at least 12 characters.",
    );
  }

  if (password.length > 128) {
    throw new Error(
      "SEED_ADMIN_PASSWORD must not exceed 128 characters.",
    );
  }

  let createdNow = false;

  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log("Creating official Rcentz administrator...");

    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    createdNow = true;

    user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error(
        "Better Auth created no recoverable administrator user.",
      );
    }
  } else {
    console.log("Official Rcentz administrator already exists.");
  }

  const credentialAccount = await prisma.account.findFirst({
    where: {
      userId: user.id,
      providerId: "credential",
    },
    select: {
      id: true,
    },
  });

  if (!credentialAccount) {
    throw new Error(
      "Administrator exists but has no Better Auth credential account. Password credentials were not modified.",
    );
  }

  const admin = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
      emailVerified: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      emailVerified: true,
    },
  });

  if (createdNow) {
    await prisma.session.deleteMany({
      where: {
        userId: admin.id,
      },
    });
  }

  console.log("Official Rcentz administrator ready:");
  console.log({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    status: admin.status,
    emailVerified: admin.emailVerified,
  });

  return admin;
}

async function seedOfficialProjects(adminId: string) {
  console.log("Seeding official Rcentz project history...");

  for (const projectData of projectSeedManifest) {
    const project = await prisma.project.upsert({
      where: {
        slug: projectData.slug,
      },

      update: {
        name: projectData.name,
        description: projectData.description,
        purpose: projectData.purpose,
        vision: projectData.vision,
        expectedOutcome: projectData.expectedOutcome,
        type: projectData.type,
        status: projectData.status,
        visibility: projectData.visibility,
        progress: getProjectProgress(projectData.milestones),
        startedAt: toDate(projectData.startedAt),
        completedAt: toDate(projectData.completedAt),
      },

      create: {
        name: projectData.name,
        slug: projectData.slug,
        description: projectData.description,
        purpose: projectData.purpose,
        vision: projectData.vision,
        expectedOutcome: projectData.expectedOutcome,
        type: projectData.type,
        status: projectData.status,
        visibility: projectData.visibility,
        progress: getProjectProgress(projectData.milestones),
        startedAt: toDate(projectData.startedAt),
        completedAt: toDate(projectData.completedAt),
      },
    });

    await prisma.portfolioProfile.upsert({
      where: {
        projectId: project.id,
      },

      update: {
        tagline: projectData.portfolio.tagline,
        summary: projectData.portfolio.summary,
        challenge: projectData.portfolio.challenge,
        solution: projectData.portfolio.solution,
        outcome: projectData.portfolio.outcome,
        liveUrl: projectData.portfolio.liveUrl ?? null,
        repositoryUrl: projectData.portfolio.repositoryUrl,
        featured: projectData.portfolio.featured,
        publishedAt: toDate(projectData.portfolio.publishedAt),
      },

      create: {
        projectId: project.id,
        tagline: projectData.portfolio.tagline,
        summary: projectData.portfolio.summary,
        challenge: projectData.portfolio.challenge,
        solution: projectData.portfolio.solution,
        outcome: projectData.portfolio.outcome,
        liveUrl: projectData.portfolio.liveUrl ?? null,
        repositoryUrl: projectData.portfolio.repositoryUrl,
        featured: projectData.portfolio.featured,
        publishedAt: toDate(projectData.portfolio.publishedAt),
      },
    });

    for (const technology of projectData.technologies) {
      await prisma.projectTechnology.upsert({
        where: {
          projectId_slug: {
            projectId: project.id,
            slug: technology.slug,
          },
        },

        update: {
          name: technology.name,
        },

        create: {
          projectId: project.id,
          name: technology.name,
          slug: technology.slug,
        },
      });
    }

    for (const milestoneData of projectData.milestones) {
      await prisma.projectMilestone.upsert({
        where: {
          projectId_slug: {
            projectId: project.id,
            slug: milestoneData.slug,
          },
        },

        update: {
          createdById: adminId,
          title: milestoneData.title,
          description: milestoneData.description,
          purpose: milestoneData.purpose,
          expectedOutcome: milestoneData.expectedOutcome,
          status: milestoneData.status,
          priority: milestoneData.priority,
          visibility: milestoneData.visibility,
          sortOrder: milestoneData.sortOrder,
          progress: getMilestoneProgress(milestoneData.status),
          startedAt: toDate(milestoneData.startedAt),
          completedAt: toDate(milestoneData.completedAt),
          gitCommitSha: milestoneData.gitCommitSha ?? null,
          gitTag: milestoneData.gitTag ?? null,
          completionNotes: milestoneData.completionNotes ?? null,
        },

        create: {
          projectId: project.id,
          createdById: adminId,
          title: milestoneData.title,
          slug: milestoneData.slug,
          description: milestoneData.description,
          purpose: milestoneData.purpose,
          expectedOutcome: milestoneData.expectedOutcome,
          status: milestoneData.status,
          priority: milestoneData.priority,
          visibility: milestoneData.visibility,
          sortOrder: milestoneData.sortOrder,
          progress: getMilestoneProgress(milestoneData.status),
          startedAt: toDate(milestoneData.startedAt),
          completedAt: toDate(milestoneData.completedAt),
          gitCommitSha: milestoneData.gitCommitSha ?? null,
          gitTag: milestoneData.gitTag ?? null,
          completionNotes: milestoneData.completionNotes ?? null,
        },
      });
    }

    console.log(
      `Project ready: ${projectData.name} — ${projectData.milestones.length} milestones, ${projectData.technologies.length} technologies`,
    );
  }

  console.log(
    `${projectSeedManifest.length} official Rcentz projects ready.`,
  );
}

async function seedOfficialServices(adminId: string) {
  console.log("Seeding official Rcentz service catalogue...");

  let categoryCount = 0;
  let serviceCount = 0;
  let priceCount = 0;

  for (const categoryData of serviceSeedManifest) {
    let category = await prisma.serviceCategory.findUnique({
      where: {
        slug: categoryData.slug,
      },
    });

    if (!category) {
      category = await prisma.serviceCategory.create({
        data: {
          name: categoryData.name,
          slug: categoryData.slug,
          description: categoryData.description,
        },
      });
    }

    categoryCount += 1;

    for (const serviceData of categoryData.services) {
      let service = await prisma.service.findUnique({
        where: {
          slug: serviceData.slug,
        },
      });

      if (!service) {
        service = await prisma.service.create({
          data: {
            categoryId: category.id,
            createdById: adminId,
            name: serviceData.name,
            slug: serviceData.slug,
            shortDescription: serviceData.shortDescription,
            description: serviceData.description,
            type: serviceData.type,
            status: serviceData.status,
            featured: serviceData.featured,
          },
        });
      }

      serviceCount += 1;

      for (const priceData of serviceData.prices) {
        const existingPrice = await prisma.servicePrice.findUnique({
          where: {
            serviceId_currency: {
              serviceId: service.id,
              currency: priceData.currency,
            },
          },
        });

        if (!existingPrice) {
          await prisma.servicePrice.create({
            data: {
              serviceId: service.id,
              currency: priceData.currency,
              priceFrom: priceData.priceFrom,
              priceTo: priceData.priceTo,
            },
          });
        }

        priceCount += 1;
      }
    }

    console.log(
      `Service category ready: ${categoryData.name} — ${categoryData.services.length} services`,
    );
  }

  console.log(
    `Service catalogue ready: ${categoryCount} categories, ${serviceCount} services, ${priceCount} price entries.`,
  );
}

async function main() {
  console.log("Starting Rcentz database seed...");

  const admin = await seedOfficialAdmin();

  await seedOfficialProjects(admin.id);
  await seedOfficialServices(admin.id);

  console.log("Rcentz database seed completed.");
}

main()
  .catch((error) => {
    console.error("Rcentz seed failed.");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });