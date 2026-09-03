import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { config } from 'dotenv';

config({
  path: path.join(process.cwd(), '.env.local')
});

config({
  path: path.join(process.cwd(), '.env'),
  override: false
});

type ScreenshotRecord = {
  project: string;
  projectSlug: string;
  pageTitle: string;
  route: string;
  sourceUrl: string;
  viewport: 'desktop' | 'mobile';
  fileName: string;
  publicUrl: string;
};

const manifestPath = path.join(
  process.cwd(),
  'public',
  'portfolio',
  'screenshots',
  'manifest.json'
);

async function main() {
  const { prisma } = await import('../../lib/prisma');

  const raw = await readFile(manifestPath, 'utf8');
  const records = JSON.parse(raw) as ScreenshotRecord[];

  const grouped = new Map<string, ScreenshotRecord[]>();

  for (const record of records) {
    const existing = grouped.get(record.projectSlug) ?? [];
    existing.push(record);
    grouped.set(record.projectSlug, existing);
  }

  let syncedProjects = 0;
  let syncedMedia = 0;

  for (const [projectSlug, screenshots] of grouped) {
    const first = screenshots[0];

    const project = await prisma.project.findFirst({
      where: {
        OR: [
          {
            slug: projectSlug
          },
          {
            name: first.project
          }
        ]
      },

      select: {
        id: true,
        name: true,
        slug: true
      }
    });

    if (!project) {
      console.warn(
        `Skipped ${first.project}: no matching Project record found for "${projectSlug}".`
      );

      continue;
    }

    const screenshotPrefix =
      `/portfolio/screenshots/${projectSlug}/`;

    await prisma.mediaAsset.deleteMany({
      where: {
        projectId: project.id,
        url: {
          startsWith: screenshotPrefix
        }
      }
    });

    await prisma.mediaAsset.createMany({
      data: screenshots.map((screenshot, index) => ({
        projectId: project.id,
        url: screenshot.publicUrl,
        fileName: screenshot.fileName,
        mimeType: 'image/webp',

        width:
          screenshot.viewport === 'desktop'
            ? 1440
            : 390,

        height:
          screenshot.viewport === 'desktop'
            ? 1000
            : 844,

        alt:
          `${project.name} — ${screenshot.pageTitle} ${screenshot.viewport} screenshot`,

        caption:
          screenshot.route === '/'
            ? `${project.name} homepage`
            : `${project.name} · ${screenshot.route}`,

        sortOrder: index
      }))
    });

    syncedProjects += 1;
    syncedMedia += screenshots.length;

    console.log(
      `Synced ${screenshots.length} screenshots → ${project.name}`
    );
  }

  console.log(
    `\nDone. ${syncedMedia} media assets synced across ${syncedProjects} projects.`
  );

  await prisma.$disconnect();
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
