import { prisma } from "../lib/prisma";

import { getServiceIntelligenceProfile } from "./seed-data/service-intelligence";

async function seedServiceIntelligence() {
  const services = await prisma.service.findMany({
    where: {
      status: "ACTIVE",
    },
    select: {
      id: true,
      name: true,
      slug: true,
      category: {
        select: {
          slug: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  console.log(`Enriching ${services.length} active Rcentz services...`);

  for (const service of services) {
    const profile = getServiceIntelligenceProfile(service.category?.slug);

    await prisma.service.update({
      where: {
        id: service.id,
      },
      data: {
        deliveryMinDays: profile.deliveryMinDays,
        deliveryMaxDays: profile.deliveryMaxDays,
        deliveryNote: profile.deliveryNote,
      },
    });

    for (const [index, technology] of profile.technologies.entries()) {
      await prisma.serviceTechnology.upsert({
        where: {
          serviceId_slug: {
            serviceId: service.id,
            slug: technology.slug,
          },
        },
        update: {
          name: technology.name,
          category: technology.category,
          description: technology.description,
          purpose: technology.purpose,
          rationale: technology.rationale,
          sortOrder: index,
          featured: technology.featured ?? false,
        },
        create: {
          serviceId: service.id,
          name: technology.name,
          slug: technology.slug,
          category: technology.category,
          description: technology.description,
          purpose: technology.purpose,
          rationale: technology.rationale,
          sortOrder: index,
          featured: technology.featured ?? false,
        },
      });
    }

    for (const [index, feature] of profile.features.entries()) {
      await prisma.serviceFeature.upsert({
        where: {
          serviceId_slug: {
            serviceId: service.id,
            slug: feature.slug,
          },
        },
        update: {
          name: feature.name,
          description: feature.description,
          expectedOutcome: feature.expectedOutcome,
          sortOrder: index,
          featured: feature.featured ?? false,
        },
        create: {
          serviceId: service.id,
          name: feature.name,
          slug: feature.slug,
          description: feature.description,
          expectedOutcome: feature.expectedOutcome,
          sortOrder: index,
          featured: feature.featured ?? false,
        },
      });
    }

    for (const [index, outcome] of profile.outcomes.entries()) {
      await prisma.serviceOutcome.upsert({
        where: {
          serviceId_slug: {
            serviceId: service.id,
            slug: outcome.slug,
          },
        },
        update: {
          title: outcome.title,
          description: outcome.description,
          sortOrder: index,
        },
        create: {
          serviceId: service.id,
          title: outcome.title,
          slug: outcome.slug,
          description: outcome.description,
          sortOrder: index,
        },
      });
    }

    for (const [index, milestone] of profile.milestones.entries()) {
      await prisma.serviceMilestoneTemplate.upsert({
        where: {
          serviceId_slug: {
            serviceId: service.id,
            slug: milestone.slug,
          },
        },
        update: {
          title: milestone.title,
          description: milestone.description,
          purpose: milestone.purpose,
          expectedOutcome: milestone.expectedOutcome,
          minDays: milestone.minDays,
          maxDays: milestone.maxDays,
          sortOrder: index,
        },
        create: {
          serviceId: service.id,
          title: milestone.title,
          slug: milestone.slug,
          description: milestone.description,
          purpose: milestone.purpose,
          expectedOutcome: milestone.expectedOutcome,
          minDays: milestone.minDays,
          maxDays: milestone.maxDays,
          sortOrder: index,
        },
      });
    }

    for (const [index, faq] of profile.faqs.entries()) {
      await prisma.serviceFaq.upsert({
        where: {
          serviceId_slug: {
            serviceId: service.id,
            slug: faq.slug,
          },
        },
        update: {
          question: faq.question,
          answer: faq.answer,
          sortOrder: index,
          featured: faq.featured ?? false,
        },
        create: {
          serviceId: service.id,
          slug: faq.slug,
          question: faq.question,
          answer: faq.answer,
          sortOrder: index,
          featured: faq.featured ?? false,
        },
      });
    }

    for (const [questionIndex, questionData] of profile.onboarding.entries()) {
      const question = await prisma.serviceOnboardingQuestion.upsert({
        where: {
          serviceId_key: {
            serviceId: service.id,
            key: questionData.key,
          },
        },
        update: {
          label: questionData.label,
          helpText: questionData.helpText ?? null,
          placeholder: questionData.placeholder ?? null,
          type: questionData.type,
          required: questionData.required ?? false,
          active: true,
          sortOrder: questionIndex,
        },
        create: {
          serviceId: service.id,
          key: questionData.key,
          label: questionData.label,
          helpText: questionData.helpText ?? null,
          placeholder: questionData.placeholder ?? null,
          type: questionData.type,
          required: questionData.required ?? false,
          active: true,
          sortOrder: questionIndex,
        },
      });

      for (const [optionIndex, option] of (questionData.options ?? []).entries()) {
        await prisma.serviceOnboardingOption.upsert({
          where: {
            questionId_value: {
              questionId: question.id,
              value: option.value,
            },
          },
          update: {
            label: option.label,
            description: option.description ?? null,
            active: true,
            sortOrder: optionIndex,
          },
          create: {
            questionId: question.id,
            value: option.value,
            label: option.label,
            description: option.description ?? null,
            active: true,
            sortOrder: optionIndex,
          },
        });
      }
    }

    console.log(`Service intelligence ready: ${service.name}`);
  }

  console.log("Rcentz service intelligence seed completed.");
}

seedServiceIntelligence()
  .catch((error) => {
    console.error("Service intelligence seed failed.");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
