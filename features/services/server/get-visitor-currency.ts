import "server-only";

import { headers } from "next/headers";

export type SupportedServiceCurrency = "NGN" | "USD";

export async function getVisitorCurrency(): Promise<SupportedServiceCurrency> {
  const requestHeaders = await headers();

  const country =
    requestHeaders.get("x-vercel-ip-country")?.trim().toUpperCase() ?? null;

  return country === "NG" ? "NGN" : "USD";
}