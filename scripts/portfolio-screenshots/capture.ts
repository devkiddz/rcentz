import { chromium, type Browser, type Page } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import type {
  ScreenshotProjectConfig,
  ScreenshotShot
} from './config';

type CaptureRecord = {
  project: string;
  projectSlug: string;
  pageTitle: string;
  route: string;
  sourceUrl: string;
  viewport: 'desktop' | 'mobile';
  fileName: string;
  publicUrl: string;
  scrollY: number;
};

const VIEWPORTS = {
  desktop: { width: 1440, height: 1000 },
  mobile: { width: 390, height: 844 }
} as const;

const blockedRedirectParts = [
  '/login',
  '/sign-in',
  '/signin',
  '/sign-up',
  '/signup',
  '/register',
  '/admin',
  '/account',
  '/checkout'
] as const;

function normalizeBaseUrl(value: string) {
  return value.replace(/\/+$/, '');
}

function sanitizeFilePart(value: string) {
  return value
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 80);
}

function redirectedToBlockedPage(page: Page) {
  const pathname = new URL(page.url()).pathname.toLowerCase();
  return blockedRedirectParts.some(part => pathname.includes(part));
}

async function settlePage(page: Page, waitMs = 1800) {
  await page.waitForLoadState('domcontentloaded');

  try {
    await page.waitForLoadState('networkidle', { timeout: 8000 });
  } catch {
    // Some production apps keep long-running requests open.
  }

  await page.emulateMedia({ reducedMotion: 'reduce' });

  await page.addStyleTag({
    content: `
      *,
      *::before,
      *::after {
        caret-color: transparent !important;
      }

      html {
        scroll-behavior: auto !important;
      }

      [data-nextjs-toast],
      nextjs-portal {
        display: none !important;
      }
    `
  });

  await page.evaluate(async () => {
    if ('fonts' in document) {
      await document.fonts.ready;
    }
  });

  await page.waitForTimeout(waitMs);
}

async function resolveWorkingBaseUrl(
  page: Page,
  project: ScreenshotProjectConfig
) {
  const candidates = [project.baseUrl, ...(project.fallbackUrls ?? [])];

  for (const candidate of candidates) {
    const baseUrl = normalizeBaseUrl(candidate);

    try {
      const response = await page.goto(baseUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 25000
      });

      if (response && response.status() < 500) {
        await settlePage(page, 1200);
        return baseUrl;
      }
    } catch {
      // Try fallback deployment.
    }
  }

  throw new Error(`No reachable deployment found for ${project.name}.`);
}

async function applyShotPosition(page: Page, shot: ScreenshotShot) {
  const scrollY = Math.max(0, shot.scrollY ?? 0);

  await page.evaluate(y => {
    window.scrollTo({
      top: y,
      left: 0,
      behavior: 'instant'
    });
  }, scrollY);

  await page.waitForTimeout(900);
}

async function captureShot({
  page,
  project,
  baseUrl,
  shot,
  sequence
}: {
  page: Page;
  project: ScreenshotProjectConfig;
  baseUrl: string;
  shot: ScreenshotShot;
  sequence: number;
}): Promise<CaptureRecord | null> {
  await page.setViewportSize(VIEWPORTS[shot.viewport]);

  const route =
    shot.route === '/'
      ? '/'
      : `/${shot.route.replace(/^\/+/, '')}`;

  const sourceUrl = `${baseUrl}${route === '/' ? '' : route}`;

  try {
    const response = await page.goto(sourceUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 25000
    });

    if (!response || response.status() >= 400) {
      console.warn(
        `Skipped ${project.name} ${shot.name}: HTTP ${response?.status() ?? 'unknown'}`
      );
      return null;
    }

    await settlePage(page, shot.waitMs ?? 1800);

    if (redirectedToBlockedPage(page)) {
      console.warn(
        `Skipped ${project.name} ${shot.name}: redirected to protected page ${page.url()}`
      );
      return null;
    }

    await applyShotPosition(page, shot);

    const title = (await page.title()).trim() || project.name;
    const fileName =
      `${String(sequence).padStart(2, '0')}-${sanitizeFilePart(shot.name)}-${shot.viewport}.webp`;

    const projectDirectory = path.join(
      process.cwd(),
      'public',
      'portfolio',
      'screenshots',
      project.slug
    );

    await mkdir(projectDirectory, { recursive: true });

    const absolutePath = path.join(projectDirectory, fileName);

    await page.screenshot({
      path: absolutePath,
      type: 'webp',
      quality: 90,
      fullPage: false,
      animations: 'disabled'
    });

    console.log(
      `Captured ${project.name} → ${shot.name} (${shot.viewport}, scroll ${shot.scrollY ?? 0}px)`
    );

    return {
      project: project.name,
      projectSlug: project.slug,
      pageTitle: title,
      route,
      sourceUrl,
      viewport: shot.viewport,
      fileName,
      publicUrl: `/portfolio/screenshots/${project.slug}/${fileName}`,
      scrollY: shot.scrollY ?? 0
    };
  } catch (error) {
    console.warn(
      `Skipped ${project.name} ${shot.name}:`,
      error instanceof Error ? error.message : error
    );
    return null;
  }
}

async function captureProject(
  browser: Browser,
  project: ScreenshotProjectConfig
) {
  const context = await browser.newContext({
    colorScheme: 'dark',
    locale: 'en-NG',
    timezoneId: 'Africa/Lagos',
    deviceScaleFactor: 1
  });

  const page = await context.newPage();

  console.log(`\nCapturing ${project.name}...`);

  const baseUrl = await resolveWorkingBaseUrl(page, project);
  console.log(`Using ${baseUrl}`);

  const records: CaptureRecord[] = [];
  let sequence = 1;

  for (const shot of project.shots) {
    const capture = await captureShot({
      page,
      project,
      baseUrl,
      shot,
      sequence
    });

    if (capture) {
      records.push(capture);
      sequence += 1;
    }
  }

  await context.close();

  return records;
}

export async function capturePortfolioScreenshots(
  projects: ScreenshotProjectConfig[]
) {
  const browser = await chromium.launch({ headless: true });
  const allRecords: CaptureRecord[] = [];

  try {
    for (const project of projects) {
      const records = await captureProject(browser, project);
      allRecords.push(...records);
    }
  } finally {
    await browser.close();
  }

  const manifestPath = path.join(
    process.cwd(),
    'public',
    'portfolio',
    'screenshots',
    'manifest.json'
  );

  await mkdir(path.dirname(manifestPath), { recursive: true });

  await writeFile(
    manifestPath,
    JSON.stringify(allRecords, null, 2),
    'utf8'
  );

  console.log(`\nCaptured ${allRecords.length} curated screenshots.`);
  console.log(`Manifest: ${manifestPath}`);

  return allRecords;
}
