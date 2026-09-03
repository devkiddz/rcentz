export type ScreenshotViewport = 'desktop' | 'mobile';

export type ScreenshotShot = {
  name: string;
  route: string;
  viewport: ScreenshotViewport;
  scrollY?: number;
  waitMs?: number;
};

export type ScreenshotProjectConfig = {
  name: string;
  slug: string;
  baseUrl: string;
  fallbackUrls?: string[];
  shots: ScreenshotShot[];
};

export const screenshotProjects: ScreenshotProjectConfig[] = [
  {
    name: 'NovaShad v01',
    slug: 'novashad-v01',
    baseUrl: 'https://novashad-v01.vercel.app',
    shots: [
      { name: 'dashboard-top', route: '/', viewport: 'desktop' },
      { name: 'dashboard-detail', route: '/', viewport: 'desktop', scrollY: 240 },
      { name: 'dashboard-mobile', route: '/', viewport: 'mobile', scrollY: 120 }
    ]
  },
  {
    name: 'JobRcentz',
    slug: 'job-rcentz',
    baseUrl: 'https://jobrcentz.vercel.app',
    shots: [
      { name: 'home', route: '/', viewport: 'desktop' },
      { name: 'home-detail', route: '/', viewport: 'desktop', scrollY: 240 },
      { name: 'jobs', route: '/jobs', viewport: 'desktop', scrollY: 180 },
      { name: 'jobs-detail', route: '/jobs', viewport: 'desktop', scrollY: 300 },
      { name: 'home-mobile', route: '/', viewport: 'mobile', scrollY: 120 },
      { name: 'jobs-mobile', route: '/jobs', viewport: 'mobile', scrollY: 140 }
    ]
  },
  {
    name: 'Shelsea Commerce',
    slug: 'shelsea-commerce',
    baseUrl: 'https://shelsea.vercel.app',
    shots: [
      { name: 'home', route: '/', viewport: 'desktop' },
      { name: 'home-detail', route: '/', viewport: 'desktop', scrollY: 220 },
      { name: 'store', route: '/store', viewport: 'desktop', scrollY: 220 },
      { name: 'store-detail', route: '/store', viewport: 'desktop', scrollY: 340 },
      { name: 'home-mobile', route: '/', viewport: 'mobile', scrollY: 110 },
      { name: 'store-mobile', route: '/store', viewport: 'mobile', scrollY: 150 }
    ]
  },
  {
    name: 'Portfolio UI System v0.1',
    slug: 'portfolio-ui-system-v0-1',
    baseUrl: 'https://portfolio-ui-system-v0-1.vercel.app',
    shots: [
      { name: 'home', route: '/', viewport: 'desktop' },
      { name: 'home-detail', route: '/', viewport: 'desktop', scrollY: 240 },
      { name: 'home-mobile', route: '/', viewport: 'mobile', scrollY: 120 }
    ]
  },
  {
    name: 'AJ Logik',
    slug: 'aj-logik',
    baseUrl: 'https://ajlojik.vercel.app',
    shots: [
      { name: 'home', route: '/', viewport: 'desktop', waitMs: 2600 },
      { name: 'home-detail', route: '/', viewport: 'desktop', scrollY: 220, waitMs: 2200 },
      { name: 'store', route: '/store', viewport: 'desktop', scrollY: 220, waitMs: 2200 },
      { name: 'store-detail', route: '/store', viewport: 'desktop', scrollY: 340, waitMs: 2200 },
      { name: 'home-mobile', route: '/', viewport: 'mobile', scrollY: 110, waitMs: 2200 },
      { name: 'store-mobile', route: '/store', viewport: 'mobile', scrollY: 150, waitMs: 2200 }
    ]
  },
  {
    name: 'Rcentz Core',
    slug: 'rcentz-systems',
    baseUrl: 'https://rcentz.cc',
    fallbackUrls: ['https://rcentz.vercel.app'],
    shots: [
      { name: 'home', route: '/', viewport: 'desktop', waitMs: 2200 },
      { name: 'home-detail', route: '/', viewport: 'desktop', scrollY: 240, waitMs: 2200 },
      { name: 'home-mobile', route: '/', viewport: 'mobile', scrollY: 120, waitMs: 2000 }
    ]
  }
];
