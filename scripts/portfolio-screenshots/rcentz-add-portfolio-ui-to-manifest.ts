import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const filePath = path.join(
  process.cwd(),
  'prisma',
  'seed-data',
  'projects.ts'
);

const importLine =
  "import { portfolioUISystemSeed } from './projects/portfolio-ui-system';";

async function main() {
  let source = await readFile(filePath, 'utf8');

  if (!source.includes(importLine)) {
    source = `${importLine}\n\n${source}`;
  }

  if (!source.includes('portfolioUISystemSeed,')) {
    const marker = '] satisfies SeedProjectManifest[];';

    if (!source.includes(marker)) {
      throw new Error(
        'Could not find the projectSeedManifest closing marker.'
      );
    }

    source = source.replace(
      marker,
      `  portfolioUISystemSeed,\n${marker}`
    );
  }

  await writeFile(filePath, source, 'utf8');

  console.log(
    'Added Portfolio UI System v0.1 to projectSeedManifest.'
  );
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
