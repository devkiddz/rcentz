import "server-only";

import { cache } from "react";

import { prisma } from "@/lib/prisma";
import type { SupportedLocale } from "@/i18n/config";
import { localizeContent } from "@/server/localization/localize-content";

import type { SupportedServiceCurrency } from "./get-visitor-currency";

export const getServiceBySlug = cache(
  async (
    slug: string,
    currency: SupportedServiceCurrency,
    locale: SupportedLocale,
  ) => {
    const service = await prisma.service.findFirst({
      where: {
        slug,
        status: "ACTIVE",
      },

      select: {
        id: true,
        name: true,
        slug: true,
        shortDescription: true,
        description: true,
        type: true,
        featured: true,
        deliveryMinDays: true,
        deliveryMaxDays: true,
        deliveryNote: true,
        publishedAt: true,

        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            image: true,
          },
        },

        prices: {
          where: {
            currency,
          },

          select: {
            id: true,
            currency: true,
            priceFrom: true,
            priceTo: true,
          },

          take: 1,
        },

        technologies: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true,
            category: true,
            description: true,
            purpose: true,
            rationale: true,
            featured: true,
            sortOrder: true,
          },

          orderBy: [
            {
              featured: "desc",
            },
            {
              sortOrder: "asc",
            },
          ],
        },

        features: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            expectedOutcome: true,
            featured: true,
            sortOrder: true,
          },

          orderBy: [
            {
              featured: "desc",
            },
            {
              sortOrder: "asc",
            },
          ],
        },

        outcomes: {
          select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            sortOrder: true,
          },

          orderBy: {
            sortOrder: "asc",
          },
        },

        milestoneTemplates: {
          select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            purpose: true,
            expectedOutcome: true,
            minDays: true,
            maxDays: true,
            sortOrder: true,
          },

          orderBy: {
            sortOrder: "asc",
          },
        },

        faqs: {
          select: {
            id: true,
            slug: true,
            question: true,
            answer: true,
            featured: true,
            sortOrder: true,
          },

          orderBy: [
            {
              featured: "desc",
            },
            {
              sortOrder: "asc",
            },
          ],
        },

        onboardingQuestions: {
          where: {
            active: true,
          },

          select: {
            id: true,
            key: true,
            label: true,
            helpText: true,
            placeholder: true,
            type: true,
            required: true,
            sortOrder: true,

            options: {
              where: {
                active: true,
              },

              select: {
                id: true,
                value: true,
                label: true,
                description: true,
                sortOrder: true,
              },

              orderBy: {
                sortOrder: "asc",
              },
            },
          },

          orderBy: {
            sortOrder: "asc",
          },
        },

        media: {
          select: {
            id: true,
            url: true,
            alt: true,
            caption: true,
            width: true,
            height: true,
            sortOrder: true,
          },

          orderBy: {
            sortOrder: "asc",
          },
        },

        seo: {
          select: {
            title: true,
            description: true,
            keywords: true,
            canonicalUrl: true,
            ogTitle: true,
            ogDescription: true,
            ogImage: true,
            robots: true,
          },
        },
      },
    });

    if (!service) {
      return null;
    }

    const [
      name,
      shortDescription,
      description,
      deliveryNote,
      category,
      technologies,
      features,
      outcomes,
      milestoneTemplates,
      faqs,
      onboardingQuestions,
      media,
      seo,
    ] = await Promise.all([
      localizeContent({
        entityType: "Service",
        entityId: service.id,
        fieldName: "name",
        locale,
        sourceValue: service.name,
      }),

      localizeContent({
        entityType: "Service",
        entityId: service.id,
        fieldName: "shortDescription",
        locale,
        sourceValue: service.shortDescription,
      }),

      localizeContent({
        entityType: "Service",
        entityId: service.id,
        fieldName: "description",
        locale,
        sourceValue: service.description,
      }),

      localizeContent({
        entityType: "Service",
        entityId: service.id,
        fieldName: "deliveryNote",
        locale,
        sourceValue: service.deliveryNote,
      }),

      service.category
        ? Promise.all([
            localizeContent({
              entityType: "ServiceCategory",
              entityId: service.category.id,
              fieldName: "name",
              locale,
              sourceValue: service.category.name,
            }),

            localizeContent({
              entityType: "ServiceCategory",
              entityId: service.category.id,
              fieldName: "description",
              locale,
              sourceValue: service.category.description,
            }),
          ]).then(([categoryName, categoryDescription]) => ({
            ...service.category!,
            name: categoryName ?? service.category!.name,
            description: categoryDescription,
          }))
        : Promise.resolve(null),

      Promise.all(
        service.technologies.map(async (technology) => {
          const [
            technologyName,
            technologyCategory,
            technologyDescription,
            technologyPurpose,
            technologyRationale,
          ] = await Promise.all([
            localizeContent({
              entityType: "ServiceTechnology",
              entityId: technology.id,
              fieldName: "name",
              locale,
              sourceValue: technology.name,
            }),

            localizeContent({
              entityType: "ServiceTechnology",
              entityId: technology.id,
              fieldName: "category",
              locale,
              sourceValue: technology.category,
            }),

            localizeContent({
              entityType: "ServiceTechnology",
              entityId: technology.id,
              fieldName: "description",
              locale,
              sourceValue: technology.description,
            }),

            localizeContent({
              entityType: "ServiceTechnology",
              entityId: technology.id,
              fieldName: "purpose",
              locale,
              sourceValue: technology.purpose,
            }),

            localizeContent({
              entityType: "ServiceTechnology",
              entityId: technology.id,
              fieldName: "rationale",
              locale,
              sourceValue: technology.rationale,
            }),
          ]);

          return {
            ...technology,
            name: technologyName ?? technology.name,
            category: technologyCategory,
            description: technologyDescription,
            purpose: technologyPurpose,
            rationale: technologyRationale,
          };
        }),
      ),

      Promise.all(
        service.features.map(async (feature) => {
          const [
            featureName,
            featureDescription,
            featureExpectedOutcome,
          ] = await Promise.all([
            localizeContent({
              entityType: "ServiceFeature",
              entityId: feature.id,
              fieldName: "name",
              locale,
              sourceValue: feature.name,
            }),

            localizeContent({
              entityType: "ServiceFeature",
              entityId: feature.id,
              fieldName: "description",
              locale,
              sourceValue: feature.description,
            }),

            localizeContent({
              entityType: "ServiceFeature",
              entityId: feature.id,
              fieldName: "expectedOutcome",
              locale,
              sourceValue: feature.expectedOutcome,
            }),
          ]);

          return {
            ...feature,
            name: featureName ?? feature.name,
            description: featureDescription,
            expectedOutcome: featureExpectedOutcome,
          };
        }),
      ),

      Promise.all(
        service.outcomes.map(async (outcome) => {
          const [outcomeTitle, outcomeDescription] = await Promise.all([
            localizeContent({
              entityType: "ServiceOutcome",
              entityId: outcome.id,
              fieldName: "title",
              locale,
              sourceValue: outcome.title,
            }),

            localizeContent({
              entityType: "ServiceOutcome",
              entityId: outcome.id,
              fieldName: "description",
              locale,
              sourceValue: outcome.description,
            }),
          ]);

          return {
            ...outcome,
            title: outcomeTitle ?? outcome.title,
            description: outcomeDescription,
          };
        }),
      ),

      Promise.all(
        service.milestoneTemplates.map(async (milestone) => {
          const [
            milestoneTitle,
            milestoneDescription,
            milestonePurpose,
            milestoneExpectedOutcome,
          ] = await Promise.all([
            localizeContent({
              entityType: "ServiceMilestoneTemplate",
              entityId: milestone.id,
              fieldName: "title",
              locale,
              sourceValue: milestone.title,
            }),

            localizeContent({
              entityType: "ServiceMilestoneTemplate",
              entityId: milestone.id,
              fieldName: "description",
              locale,
              sourceValue: milestone.description,
            }),

            localizeContent({
              entityType: "ServiceMilestoneTemplate",
              entityId: milestone.id,
              fieldName: "purpose",
              locale,
              sourceValue: milestone.purpose,
            }),

            localizeContent({
              entityType: "ServiceMilestoneTemplate",
              entityId: milestone.id,
              fieldName: "expectedOutcome",
              locale,
              sourceValue: milestone.expectedOutcome,
            }),
          ]);

          return {
            ...milestone,
            title: milestoneTitle ?? milestone.title,
            description: milestoneDescription,
            purpose: milestonePurpose,
            expectedOutcome: milestoneExpectedOutcome,
          };
        }),
      ),

      Promise.all(
        service.faqs.map(async (faq) => {
          const [question, answer] = await Promise.all([
            localizeContent({
              entityType: "ServiceFaq",
              entityId: faq.id,
              fieldName: "question",
              locale,
              sourceValue: faq.question,
            }),

            localizeContent({
              entityType: "ServiceFaq",
              entityId: faq.id,
              fieldName: "answer",
              locale,
              sourceValue: faq.answer,
            }),
          ]);

          return {
            ...faq,
            question: question ?? faq.question,
            answer: answer ?? faq.answer,
          };
        }),
      ),

      Promise.all(
        service.onboardingQuestions.map(async (question) => {
          const [
            questionLabel,
            questionHelpText,
            questionPlaceholder,
            options,
          ] = await Promise.all([
            localizeContent({
              entityType: "ServiceOnboardingQuestion",
              entityId: question.id,
              fieldName: "label",
              locale,
              sourceValue: question.label,
            }),

            localizeContent({
              entityType: "ServiceOnboardingQuestion",
              entityId: question.id,
              fieldName: "helpText",
              locale,
              sourceValue: question.helpText,
            }),

            localizeContent({
              entityType: "ServiceOnboardingQuestion",
              entityId: question.id,
              fieldName: "placeholder",
              locale,
              sourceValue: question.placeholder,
            }),

            Promise.all(
              question.options.map(async (option) => {
                const [optionLabel, optionDescription] = await Promise.all([
                  localizeContent({
                    entityType: "ServiceOnboardingOption",
                    entityId: option.id,
                    fieldName: "label",
                    locale,
                    sourceValue: option.label,
                  }),

                  localizeContent({
                    entityType: "ServiceOnboardingOption",
                    entityId: option.id,
                    fieldName: "description",
                    locale,
                    sourceValue: option.description,
                  }),
                ]);

                return {
                  ...option,
                  label: optionLabel ?? option.label,
                  description: optionDescription,
                };
              }),
            ),
          ]);

          return {
            ...question,
            label: questionLabel ?? question.label,
            helpText: questionHelpText,
            placeholder: questionPlaceholder,
            options,
          };
        }),
      ),

      Promise.all(
        service.media.map(async (asset) => {
          const [alt, caption] = await Promise.all([
            localizeContent({
              entityType: "MediaAsset",
              entityId: asset.id,
              fieldName: "alt",
              locale,
              sourceValue: asset.alt,
            }),

            localizeContent({
              entityType: "MediaAsset",
              entityId: asset.id,
              fieldName: "caption",
              locale,
              sourceValue: asset.caption,
            }),
          ]);

          return {
            ...asset,
            alt,
            caption,
          };
        }),
      ),

      service.seo
        ? Promise.all([
            localizeContent({
              entityType: "SeoMetadata",
              entityId: service.id,
              fieldName: "title",
              locale,
              sourceValue: service.seo.title,
            }),

            localizeContent({
              entityType: "SeoMetadata",
              entityId: service.id,
              fieldName: "description",
              locale,
              sourceValue: service.seo.description,
            }),

            localizeContent({
              entityType: "SeoMetadata",
              entityId: service.id,
              fieldName: "ogTitle",
              locale,
              sourceValue: service.seo.ogTitle,
            }),

            localizeContent({
              entityType: "SeoMetadata",
              entityId: service.id,
              fieldName: "ogDescription",
              locale,
              sourceValue: service.seo.ogDescription,
            }),
          ]).then(
            ([
              seoTitle,
              seoDescription,
              seoOgTitle,
              seoOgDescription,
            ]) => ({
              ...service.seo!,
              title: seoTitle,
              description: seoDescription,
              ogTitle: seoOgTitle,
              ogDescription: seoOgDescription,
            }),
          )
        : Promise.resolve(null),
    ]);

    return {
      ...service,

      name: name ?? service.name,
      shortDescription,
      description,
      deliveryNote,

      category,
      technologies,
      features,
      outcomes,
      milestoneTemplates,
      faqs,
      onboardingQuestions,
      media,
      seo,
    };
  },
);

export type ServiceDetail = NonNullable<
  Awaited<ReturnType<typeof getServiceBySlug>>
>;