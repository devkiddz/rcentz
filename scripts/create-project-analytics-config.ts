import { config } from 'dotenv';

config({
  path: '.env.local'
});

config({
  path: '.env'
});

const { prisma } =
  await import('@/lib/prisma');

const projectId =
  process.argv[2];

if (!projectId) {
  throw new Error(
    'Project ID is required. Usage: pnpm tsx scripts/create-project-analytics-config.ts <PROJECT_ID>'
  );
}

async function main() {
  const project =
    await prisma.project.findUnique({
      where: {
        id: projectId
      },

      select: {
        id: true,
        name: true,

        analyticsConfig: {
          select: {
            id: true,
            trackingKey: true,
            status: true,
            timezone: true,
            allowedOrigins: true,
            clientVisible: true,
            rawEventRetentionDays: true
          }
        }
      }
    });

  if (!project) {
    throw new Error(
      `Project not found: ${projectId}`
    );
  }

  const existingConfig =
    project.analyticsConfig;

  const malformedConfig =
    existingConfig &&
    (
      !existingConfig.id.trim() ||
      !existingConfig.trackingKey.trim()
    );

  if (
    existingConfig &&
    !malformedConfig
  ) {
    console.log(
      '\nAnalytics config already exists and is valid:\n'
    );

    console.log({
      project: project.name,
      projectId: project.id,
      ...existingConfig
    });

    console.log(
      '\nTRACKING KEY:\n'
    );

    console.log(
      existingConfig.trackingKey
    );

    return;
  }

  if (malformedConfig) {
    console.log(
      '\nMalformed analytics config detected.'
    );

    console.log(
      'Removing empty id/trackingKey record and recreating it...\n'
    );

    await prisma.projectAnalyticsConfig.delete({
      where: {
        projectId:
          project.id
      }
    });
  }

  const analyticsConfig =
    await prisma.projectAnalyticsConfig.create({
      data: {
        projectId:
          project.id,

        status:
          'ACTIVE',

        timezone:
          'Africa/Lagos',

        allowedOrigins: [
          'http://localhost:3000',
          'https://rcentz.cc'
        ],

        clientVisible:
          true,

        rawEventRetentionDays:
          90
      },

      select: {
        id: true,
        projectId: true,
        trackingKey: true,
        status: true,
        timezone: true,
        allowedOrigins: true,
        clientVisible: true,
        rawEventRetentionDays: true,
        createdAt: true
      }
    });

  console.log(
    '\nRcentz analytics configuration created successfully:\n'
  );

  console.log(
    analyticsConfig
  );

  console.log(
    '\nTRACKING KEY:\n'
  );

  console.log(
    analyticsConfig.trackingKey
  );
}

main()
  .catch(error => {
    console.error(
      '\nFailed to create analytics configuration:\n'
    );

    console.error(error);

    process.exitCode = 1;
  })
  .finally(
    async () => {
      await prisma.$disconnect();
    }
  );