// server/localization/save-localized-content.ts

import { prisma } from "@/lib/prisma";

type SaveLocalizedContentInput = {
  entityType: string;
  entityId: string;
  fieldName: string;
  locale: string;
  sourceLocale?: string;
  value: string;
  sourceHash: string;
};

/**
 * Persists a translated field.
 *
 * Existing translations are updated in place so each
 * entity/field/locale combination remains unique.
 */
export async function saveLocalizedContent({
  entityType,
  entityId,
  fieldName,
  locale,
  sourceLocale = "en",
  value,
  sourceHash,
}: SaveLocalizedContentInput) {
  return prisma.localizedContent.upsert({
    where: {
      entityType_entityId_fieldName_locale: {
        entityType,
        entityId,
        fieldName,
        locale,
      },
    },

    create: {
      entityType,
      entityId,
      fieldName,
      locale,
      sourceLocale,
      value,
      sourceHash,
    },

    update: {
      sourceLocale,
      value,
      sourceHash,
    },
  });
}