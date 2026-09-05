"use server";

import { cookies } from "next/headers";

import {
  defaultLocale,
  isSupportedLocale,
  type SupportedLocale,
} from "@/i18n/config";

export async function setLocale(
  locale: SupportedLocale,
) {
  const cookieStore = await cookies();

  const resolvedLocale = isSupportedLocale(locale)
    ? locale
    : defaultLocale;

  cookieStore.set(
    "rcentz-locale",
    resolvedLocale,
    {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      secure:
        process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365,
    },
  );
}