# Rcentz Translation Closure Pack

Prepared for `devkiddz/rcentz` against main commit:

`502be55589db623b539144acb1ba547dbca51805` — `feat(i18n): expand services translation system`

This is a **local zero-dependency Node installer**, not an npm package publication. It is designed to finish the current translation milestone in one controlled install after your current Git push is complete and the working tree is clean.

## What the pack completes

- Preserves the existing `next-intl` static translation foundation.
- Preserves English as the canonical database/source language.
- Reuses `LocalizedContent` + source hashes + Azure Translator for dynamic content.
- Extends dynamic localization to Home service/project/pricing data.
- Extends dynamic localization to Portfolio index and Portfolio detail data.
- Wires the prepared Home + Portfolio UI components to `next-intl`.
- Applies source-aware transforms to the larger UI files rather than asking you to edit them manually.
- Compiles missing/English-copy static translations for EN → FR / ES / DE / PT through your existing Azure Translator resource.
- Protects interpolation tokens while translating static messages.
- Uses manual ICU plural overrides where raw machine translation could break `next-intl` syntax.
- Converts array-style message groups to numeric-key objects for reliable `next-intl` path lookup.
- Removes the temporary `/api/localization-test` route.
- Adds `pnpm i18n:audit` as a regression/closure gate.
- Creates a complete backup before touching the repository.
- Automatically restores the backup if installation or Azure static compilation fails.
- Includes a standalone restore command.

## Before installing

Finish the Git push you are currently doing, then make sure:

```bash
git status
```

shows a clean working tree.

Your existing local/Vercel environment should contain:

```env
AZURE_TRANSLATOR_KEY=your-secret-key
AZURE_TRANSLATOR_REGION=eastus
AZURE_TRANSLATOR_ENDPOINT=https://api.cognitive.microsofttranslator.com/
```

The installer reads `.env.local`, `.env`, and the current process environment. It never places your Azure key inside this ZIP.

## Install

Extract this ZIP **outside** the Rcentz repository, open a terminal in the extracted folder, and run:

```bash
node install.mjs "C:\Users\DeWealth\Desktop\rcentz-systems"
```

The default install also compiles any still-English static strings to FR, ES, DE and PT using Azure.

### Dry run

```bash
node install.mjs "C:\Users\DeWealth\Desktop\rcentz-systems" --dry-run
```

### Emergency options

`--force` bypasses the clean-git guard. Avoid it unless you deliberately accept the risk.

`--skip-static-translate` skips the Azure static compiler. That is **not** the normal closure path because untranslated static strings can remain.

## Closure gates

After the installer succeeds:

```bash
cd "C:\Users\DeWealth\Desktop\rcentz-systems"
pnpm install
pnpm typecheck
pnpm i18n:audit
pnpm build
```

Then from the extracted pack folder:

```bash
node verify.mjs "C:\Users\DeWealth\Desktop\rcentz-systems"
```

Finally smoke-test:

- `/`
- `/services`
- one `/services/[slug]`
- `/portfolio`
- one `/portfolio/[slug]`

in **EN, FR, ES, DE and PT**.

## Restore

The installer backs up every overwritten/transformed target under:

`.translation-backups/<timestamp>/`

Restore the latest installer backup with:

```bash
node restore.mjs "C:\Users\DeWealth\Desktop\rcentz-systems"
```

Or restore a specific backup:

```bash
node restore.mjs "C:\Users\DeWealth\Desktop\rcentz-systems" "C:\Users\DeWealth\Desktop\rcentz-systems\.translation-backups\<timestamp>"
```

## Architecture rule after closure

**Static UI copy** → `next-intl` message namespaces.

**Dynamic human-readable DB content** → `localizeContent` / `localizeFields` → `LocalizedContent` → Azure on missing/stale source hash → shared persisted translation.

**Never translate** IDs, slugs, URLs, currency codes, numeric prices/metrics, machine enum values, technology/product brand names, or external identifiers.

## Milestone rule

The installer deliberately does **not** mark the milestone complete itself. Once the typecheck, i18n audit, build, verification script and browser smoke test pass, record:

`Dynamic translation complete → Resume at Account/Auth activation`

before starting the auth/dashboard work.
