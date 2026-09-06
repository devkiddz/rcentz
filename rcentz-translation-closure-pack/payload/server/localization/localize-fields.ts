import { localizeContent } from "./localize-content";

type LocalizeFieldsInput<T extends Record<string, string | null | undefined>> = {
  entityType: string;
  entityId: string;
  locale: string;
  values: T;
};

export async function localizeFields<T extends Record<string, string | null | undefined>>({
  entityType,
  entityId,
  locale,
  values,
}: LocalizeFieldsInput<T>): Promise<T> {
  if (locale === "en") {
    return values;
  }

  const entries = await Promise.all(
    Object.entries(values).map(async ([fieldName, sourceValue]) => {
      const value = await localizeContent({
        entityType,
        entityId,
        fieldName,
        locale,
        sourceValue,
      });

      return [fieldName, value] as const;
    }),
  );

  return Object.fromEntries(entries) as T;
}
