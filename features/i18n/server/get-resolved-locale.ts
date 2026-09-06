import { getLocale } from "next-intl/server";

import {
  defaultLocale,
  isSupportedLocale,
  type SupportedLocale,
} from "@/i18n/config";

export async function getResolvedLocale(): Promise<SupportedLocale> {
  const locale = await getLocale();
  return isSupportedLocale(locale) ? locale : defaultLocale;
}
