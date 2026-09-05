// server/localization/translate-content.ts

type TranslateContentInput = {
  value: string;
  targetLocale: string;
  sourceLocale?: string;
};

type TranslateContentsInput = {
  values: string[];
  targetLocale: string;
  sourceLocale?: string;
};

type AzureTranslationResponse = Array<{
  translations: Array<{
    text: string;
    to: string;
  }>;
}>;

const MAX_BATCH_ITEMS = 100;
const MAX_BATCH_CHARACTERS = 40_000;
const MAX_RETRIES = 3;

function getAzureConfig() {
  const apiKey = process.env.AZURE_TRANSLATOR_KEY;
  const region = process.env.AZURE_TRANSLATOR_REGION;
  const endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT;

  if (!apiKey) {
    throw new Error("AZURE_TRANSLATOR_KEY is not configured.");
  }

  if (!region) {
    throw new Error("AZURE_TRANSLATOR_REGION is not configured.");
  }

  if (!endpoint) {
    throw new Error("AZURE_TRANSLATOR_ENDPOINT is not configured.");
  }

  return {
    apiKey,
    region,
    endpoint,
  };
}

function sleep(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function requestAzureTranslation({
  values,
  targetLocale,
  sourceLocale,
}: {
  values: string[];
  targetLocale: string;
  sourceLocale: string;
}): Promise<string[]> {
  const { apiKey, region, endpoint } = getAzureConfig();

  const url = new URL("/translate", endpoint);

  url.searchParams.set("api-version", "3.0");
  url.searchParams.set("from", sourceLocale);
  url.searchParams.set("to", targetLocale);

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": apiKey,
        "Ocp-Apim-Subscription-Region": region,
      },

      body: JSON.stringify(
        values.map((value) => ({
          Text: value,
        })),
      ),

      cache: "no-store",
    });

    if (response.ok) {
      const data = (await response.json()) as AzureTranslationResponse;

      const translations = data.map(
        (item) => item.translations?.[0]?.text,
      );

      if (
        translations.length !== values.length ||
        translations.some((value) => !value)
      ) {
        throw new Error(
          "Azure Translator returned an incomplete translation batch.",
        );
      }

      return translations as string[];
    }

    const errorText = await response.text();

    if (response.status !== 429 || attempt === MAX_RETRIES) {
      throw new Error(
        `Azure Translator request failed with status ${response.status}: ${errorText}`,
      );
    }

    const retryAfterHeader = response.headers.get("retry-after");
    const retryAfterSeconds = retryAfterHeader
      ? Number(retryAfterHeader)
      : NaN;

    const delay =
      Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0
        ? retryAfterSeconds * 1000
        : 500 * 2 ** attempt;

    await sleep(delay);
  }

  throw new Error("Azure Translator request failed after retries.");
}

function createBatches(values: string[]): string[][] {
  const batches: string[][] = [];

  let currentBatch: string[] = [];
  let currentCharacters = 0;

  for (const value of values) {
    const valueCharacters = value.length;

    const exceedsItemLimit =
      currentBatch.length >= MAX_BATCH_ITEMS;

    const exceedsCharacterLimit =
      currentBatch.length > 0 &&
      currentCharacters + valueCharacters > MAX_BATCH_CHARACTERS;

    if (exceedsItemLimit || exceedsCharacterLimit) {
      batches.push(currentBatch);

      currentBatch = [];
      currentCharacters = 0;
    }

    currentBatch.push(value);
    currentCharacters += valueCharacters;
  }

  if (currentBatch.length > 0) {
    batches.push(currentBatch);
  }

  return batches;
}

/**
 * Translates multiple canonical content values using Azure Translator.
 *
 * Missing service content can therefore be translated in a small number
 * of provider requests instead of one HTTP request per database field.
 */
export async function translateContents({
  values,
  targetLocale,
  sourceLocale = "en",
}: TranslateContentsInput): Promise<string[]> {
  if (values.length === 0) {
    return [];
  }

  if (targetLocale === sourceLocale) {
    return values;
  }

  const results = [...values];

  const translatableEntries = values
    .map((value, index) => ({
      index,
      originalValue: value,
      trimmedValue: value.trim(),
    }))
    .filter((entry) => entry.trimmedValue.length > 0);

  if (translatableEntries.length === 0) {
    return results;
  }

  const batches = createBatches(
    translatableEntries.map((entry) => entry.trimmedValue),
  );

  let translatedOffset = 0;

  for (const batch of batches) {
    const translatedBatch = await requestAzureTranslation({
      values: batch,
      targetLocale,
      sourceLocale,
    });

    for (let index = 0; index < translatedBatch.length; index += 1) {
      const originalEntry =
        translatableEntries[translatedOffset + index];

      if (!originalEntry) {
        continue;
      }

      results[originalEntry.index] = translatedBatch[index];
    }

    translatedOffset += translatedBatch.length;
  }

  return results;
}

/**
 * Single-value convenience wrapper.
 *
 * Existing callers can continue using translateContent while the
 * provider itself remains batch-capable.
 */
export async function translateContent({
  value,
  targetLocale,
  sourceLocale = "en",
}: TranslateContentInput): Promise<string> {
  const [translatedValue] = await translateContents({
    values: [value],
    targetLocale,
    sourceLocale,
  });

  return translatedValue ?? value;
}