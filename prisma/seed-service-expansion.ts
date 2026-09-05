import { prisma } from "../lib/prisma";

import { expandedServiceSeedManifest } from "./seed-data/service-expansion";

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

async function main() {
  const adminEmail = getRequiredEnv("SEED_ADMIN_EMAIL").toLowerCase();

  const admin = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
    select: {
      id: true,
    },
  });

  if (!admin) {
    throw new Error(
      `No user exists for SEED_ADMIN_EMAIL=${adminEmail}. Run the main seed first.`,
    );
  }

  let categoryCount = 0;
  let serviceCount = 0;
  let priceCount = 0;

  console.log("Seeding expanded Rcentz service categories...");

  for (const categoryData of expandedServiceSeedManifest) {
    const category = await prisma.serviceCategory.upsert({
      where: {
        slug: categoryData.slug,
      },
      update: {
        name: categoryData.name,
        description: categoryData.description,
      },
      create: {
        name: categoryData.name,
        slug: categoryData.slug,
        description: categoryData.description,
      },
    });

    categoryCount += 1;

    for (const serviceData of categoryData.services) {
      const service = await prisma.service.upsert({
        where: {
          slug: serviceData.slug,
        },
        update: {
          categoryId: category.id,
          name: serviceData.name,
          shortDescription: serviceData.shortDescription,
          description: serviceData.description,
          type: serviceData.type,
          status: serviceData.status,
          featured: serviceData.featured,
        },
        create: {
          categoryId: category.id,
          createdById: admin.id,
          name: serviceData.name,
          slug: serviceData.slug,
          shortDescription: serviceData.shortDescription,
          description: serviceData.description,
          type: serviceData.type,
          status: serviceData.status,
          featured: serviceData.featured,
        },
      });

      serviceCount += 1;

      for (const priceData of serviceData.prices) {
        await prisma.servicePrice.upsert({
          where: {
            serviceId_currency: {
              serviceId: service.id,
              currency: priceData.currency,
            },
          },
          update: {
            priceFrom: priceData.priceFrom,
            priceTo: priceData.priceTo,
          },
          create: {
            serviceId: service.id,
            currency: priceData.currency,
            priceFrom: priceData.priceFrom,
            priceTo: priceData.priceTo,
          },
        });

        priceCount += 1;
      }
    }

    console.log(
      `Category ready: ${categoryData.name} — ${categoryData.services.length} services`,
    );
  }

  console.log(
    `Expanded catalogue ready: ${categoryCount} categories, ${serviceCount} services, ${priceCount} price entries.`,
  );
}

main()
  .catch((error) => {
    console.error("Expanded service seed failed.");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
