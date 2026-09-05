// server/localization/get-localized-content.ts

import { prisma } from "@/lib/prisma";
import { createSourceHash } from "./source-hash";

type GetLocalizedContentInput = {
  entityType: string;
  entityId: string;
  fieldName: string;
  locale: string;
  sourceValue: string;
};

type LocalizedContentResult = {
  value: string;
  found: boolean;
  stale: boolean;
  sourceHash: string;
};

/**
 * Looks up a persisted translation and validates it against
 * the current canonical source content.
 *
 * If no translation exists, or the stored translation is stale,
 * the canonical source value is returned as a safe fallback.
 */
export async function getLocalizedContent({
  entityType,
  entityId,
  fieldName,
  locale,
  sourceValue,
}: GetLocalizedContentInput): Promise<LocalizedContentResult> {
  const sourceHash = createSourceHash(sourceValue);

  if (locale === "en") {
    return {
      value: sourceValue,
      found: true,
      stale: false,
      sourceHash,
    };
  }

  const localizedContent = await prisma.localizedContent.findUnique({
    where: {
      entityType_entityId_fieldName_locale: {
        entityType,
        entityId,
        fieldName,
        locale,
      },
    },
    select: {
      value: true,
      sourceHash: true,
    },
  });

  if (!localizedContent) {
    return {
      value: sourceValue,
      found: false,
      stale: false,
      sourceHash,
    };
  }

  const stale = localizedContent.sourceHash !== sourceHash;

  if (stale) {
    return {
      value: sourceValue,
      found: true,
      stale: true,
      sourceHash,
    };
  }

  return {
    value: localizedContent.value,
    found: true,
    stale: false,
    sourceHash,
  };
}