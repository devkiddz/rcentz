import { mkdir } from 'node:fs/promises';
import path from 'node:path';

import { chromium } from 'playwright';

const BASE_URL = 'https://rcentz.cc';

const OUTPUT_DIRECTORY = path.join(
  process.cwd(),
  'public',
  'services',
  'web-development'
);

const captures = [
  {
    theme: 'light',
    viewport: {
      width: 1440,
      height: 900
    },
    fileName: 'web-development-light-desktop.webp'
  },
  {
    theme: 'dark',
    viewport: {
      width: 1440,
      height: 900
    },
    fileName: 'web-development-dark-desktop.webp'
  },
  {
    theme: 'light',
    viewport: {
      width: 390,
      height: 844
    },
    fileName: 'web-development-light-mobile.webp'
  },
  {
    theme: 'dark',
    viewport: {
      width: 390,
      height: 844
    },
    fileName: 'web-development-dark-mobile.webp'
  }
] as const;

async function capture() {
  await mkdir(OUTPUT_DIRECTORY, {
    recursive: true
  });

  const browser = await chromium.launch();

  try {
    for (const item of captures) {
      const context = await browser.newContext({
        viewport: item.viewport,
        colorScheme: item.theme
      });

      /*
       * Run before the application loads.
       * This prevents capturing the wrong theme
       * for a moment before React hydrates.
       */
      await context.addInitScript(theme => {
        localStorage.setItem('theme', theme);

        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);

        document.documentElement.style.colorScheme = theme;
      }, item.theme);

      const page = await context.newPage();

      console.log(
        `Capturing ${item.theme} — ${item.viewport.width}x${item.viewport.height}`
      );

      await page.goto(BASE_URL, {
        waitUntil: 'networkidle'
      });

      /*
       * Reinforce the theme once the application
       * has finished loading.
       */
      await page.evaluate(theme => {
        localStorage.setItem('theme', theme);

        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);

        document.documentElement.style.colorScheme = theme;
      }, item.theme);

      /*
       * Give animations/fonts/images a brief
       * moment to settle before capture.
       */
      await page.waitForTimeout(1200);

      await page.screenshot({
        path: path.join(
          OUTPUT_DIRECTORY,
          item.fileName
        ),
        type: 'webp',
        fullPage: false
      });

      await context.close();

      console.log(`Saved ${item.fileName}`);
    }
  } finally {
    await browser.close();
  }
}

capture().catch(error => {
  console.error(error);
  process.exit(1);
});