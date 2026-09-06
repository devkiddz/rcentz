// app/api/localization-test/route.ts

import { NextResponse } from "next/server";

import { localizeContent } from "@/server/localization/localize-content";

export async function GET() {
  const sourceValue =
    "Build scalable websites for growing businesses.";

  const translated = await localizeContent({
    entityType: "LocalizationTest",
    entityId: "test-001",
    fieldName: "message",
    locale: "fr",
    sourceValue,
  });

  return NextResponse.json({
    source: sourceValue,
    translated,
  });
}