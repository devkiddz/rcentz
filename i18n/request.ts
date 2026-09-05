import { cookies } from "next/headers";

import { getRequestConfig } from "next-intl/server";

import {
  defaultLocale,
  isSupportedLocale,
} from "./config";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();

  const requestedLocale =
    cookieStore.get("rcentz-locale")?.value ??
    defaultLocale;

  const locale = isSupportedLocale(
    requestedLocale,
  )
    ? requestedLocale
    : defaultLocale;

  const messages = (
    await import(`../messages/${locale}.json`)
  ).default;

  return {
    locale,
    messages,
  };
});