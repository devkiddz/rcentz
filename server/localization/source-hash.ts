// server/localization/source-hash.ts

import { createHash } from "crypto";

/**
 * Creates a stable hash from canonical source content.
 *
 * The localization engine uses this hash to determine whether
 * a stored translation is still valid or has become stale
 * because the original source text changed.
 */
export function createSourceHash(value: string): string {
  return createHash("sha256")
    .update(value.trim(), "utf8")
    .digest("hex");
}