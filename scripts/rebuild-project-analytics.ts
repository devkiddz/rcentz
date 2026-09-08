import { config } from 'dotenv';

config({
  path: '.env.local'
});

config({
  path: '.env'
});

const projectId =
  process.argv[2];

if (!projectId) {
  throw new Error(
    'Project ID is required. Usage: pnpm tsx scripts/rebuild-project-analytics.ts <PROJECT_ID>'
  );
}

const {
  rebuildProjectAnalytics
} =
  await import(
    '@/features/analytics/server/aggregation/rebuild-project-analytics'
  );

async function main() {
  console.log(
    `\nRebuilding analytics for project ${projectId}...\n`
  );

  const result =
    await rebuildProjectAnalytics(
      projectId
    );

  console.log(
    'Rcentz analytics rebuild completed:\n'
  );

  console.dir(
    result,
    {
      depth: null
    }
  );
}

main().catch(
  error => {
    console.error(
      '\nAnalytics rebuild failed:\n'
    );

    console.error(error);

    process.exitCode = 1;
  }
);