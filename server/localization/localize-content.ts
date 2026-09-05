// server/localization/localize-content.ts

import { getLocalizedContent } from "./get-localized-content";
import { saveLocalizedContent } from "./save-localized-content";
import { translateContents } from "./translate-content";

type LocalizeContentInput = {
  entityType: string;
  entityId: string;
  fieldName: string;
  locale: string;
  sourceValue: string | null | undefined;
};

type PendingTranslation = {
  value: string;
  resolve: (translatedValue: string) => void;
  reject: (error: unknown) => void;
};

type TranslationQueue = {
  items: PendingTranslation[];
  timer: ReturnType<typeof setTimeout> | null;
};

const TRANSLATION_QUEUE_DELAY_MS = 25;

const translationQueues = new Map<string, TranslationQueue>();

function getQueueKey({
  sourceLocale,
  targetLocale,
}: {
  sourceLocale: string;
  targetLocale: string;
}) {
  return `${sourceLocale}:${targetLocale}`;
}

async function flushTranslationQueue({
  queueKey,
  sourceLocale,
  targetLocale,
}: {
  queueKey: string;
  sourceLocale: string;
  targetLocale: string;
}) {
  const queue = translationQueues.get(queueKey);

  if (!queue || queue.items.length === 0) {
    translationQueues.delete(queueKey);
    return;
  }

  const items = queue.items.splice(0, queue.items.length);

  translationQueues.delete(queueKey);

  try {
    const translatedValues = await translateContents({
      values: items.map((item) => item.value),
      sourceLocale,
      targetLocale,
    });

    items.forEach((item, index) => {
      item.resolve(translatedValues[index] ?? item.value);
    });
  } catch (error) {
    items.forEach((item) => {
      item.reject(error);
    });
  }
}

function queueTranslation({
  value,
  sourceLocale,
  targetLocale,
}: {
  value: string;
  sourceLocale: string;
  targetLocale: string;
}): Promise<string> {
  return new Promise((resolve, reject) => {
    const queueKey = getQueueKey({
      sourceLocale,
      targetLocale,
    });

    let queue = translationQueues.get(queueKey);

    if (!queue) {
      queue = {
        items: [],
        timer: null,
      };

      translationQueues.set(queueKey, queue);
    }

    queue.items.push({
      value,
      resolve,
      reject,
    });

    if (queue.timer) {
      return;
    }

    queue.timer = setTimeout(() => {
      void flushTranslationQueue({
        queueKey,
        sourceLocale,
        targetLocale,
      });
    }, TRANSLATION_QUEUE_DELAY_MS);
  });
}

/**
 * Resolves localized database content lazily.
 *
 * Flow:
 * 1. Return canonical English when appropriate.
 * 2. Check for an existing persisted translation.
 * 3. Reuse it when it is still fresh.
 * 4. Queue missing/stale content briefly.
 * 5. Translate queued values together in batches.
 * 6. Persist the translated value.
 * 7. Fall back safely to canonical content if translation fails.
 */
export async function localizeContent({
  entityType,
  entityId,
  fieldName,
  locale,
  sourceValue,
}: LocalizeContentInput): Promise<string | null | undefined> {
  if (sourceValue == null) {
    return sourceValue;
  }

  if (!sourceValue.trim()) {
    return sourceValue;
  }

  if (locale === "en") {
    return sourceValue;
  }

  const existing = await getLocalizedContent({
    entityType,
    entityId,
    fieldName,
    locale,
    sourceValue,
  });

  if (existing.found && !existing.stale) {
    return existing.value;
  }

  try {
    const translatedValue = await queueTranslation({
      value: sourceValue,
      sourceLocale: "en",
      targetLocale: locale,
    });

    await saveLocalizedContent({
      entityType,
      entityId,
      fieldName,
      locale,
      sourceLocale: "en",
      value: translatedValue,
      sourceHash: existing.sourceHash,
    });

    return translatedValue;
  } catch (error) {
    console.error(
      `[localization] Failed to translate ${entityType}.${fieldName} (${entityId}) to ${locale}.`,
      error,
    );

    return sourceValue;
  }
}