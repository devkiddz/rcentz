import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const project = path.resolve(process.argv[2] ?? process.cwd());
const locales = ['en', 'fr', 'es', 'de', 'pt'];
const requiredNamespaces = [
  'Header','ServicesHero','ServicesInspiration','ServicesCategoryBlocks','ServiceCategorySlider','ServiceRichCard',
  'WebDevelopmentStory','WordPressStory','MobileAdaptiveStory','BusinessSystemsStory','EcommerceStory','MaintenanceModernizationStory','TechnicalConsultingStory',
  'HomeHeroStories','HomeHeroCapabilities','HomeTechnologyEcosystem','HomeTechnologyRail','HomeServices','HomeServiceCard','HomeProjects','HomeProjectCard','HomeCTA','HomeInspirations','HomePricing',
  'PortfolioHero','PortfolioAbout','PortfolioTechnologyRail','PortfolioProjects','PortfolioJourney','PortfolioOutcomes','PortfolioCard','PortfolioDetailHero','PortfolioDetailGallery','PortfolioDetailTechnology','PortfolioMoreProjects','PortfolioMetadata','CommonEnums'
];

function flatten(value, prefix = '', out = {}) {
  if (Array.isArray(value)) throw new Error(`Array message found at ${prefix || '<root>'}; use numeric-key objects for next-intl paths.`);
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) flatten(child, prefix ? `${prefix}.${key}` : key, out);
  } else out[prefix] = value;
  return out;
}

const loaded = {};
for (const locale of locales) loaded[locale] = JSON.parse(await fs.readFile(path.join(project, 'messages', `${locale}.json`), 'utf8'));
for (const ns of requiredNamespaces) {
  for (const locale of locales) if (!(ns in loaded[locale])) throw new Error(`Missing namespace ${ns} in messages/${locale}.json`);
}
const english = flatten(loaded.en);
const englishKeys = Object.keys(english).sort();
for (const locale of locales.slice(1)) {
  const flat = flatten(loaded[locale]);
  const keys = Object.keys(flat).sort();
  const missing = englishKeys.filter(k => !(k in flat));
  const extra = keys.filter(k => !(k in english));
  if (missing.length || extra.length) throw new Error(`${locale} message parity failed. Missing: ${missing.slice(0,10).join(', ') || 'none'}; extra: ${extra.slice(0,10).join(', ') || 'none'}`);
}

const requiredFiles = [
  'features/i18n/server/get-resolved-locale.ts',
  'server/localization/localize-fields.ts',
  'server/localization/localize-content.ts',
  'server/localization/translate-content.ts',
  'features/home/server/get-homepage-data.ts',
  'features/portfolio/server/get-portfolio-projects.ts',
  'features/portfolio/server/get-portfolio-project.ts',
  'scripts/i18n-audit.mjs'
];
for (const rel of requiredFiles) await fs.access(path.join(project, rel));

const homeData = await fs.readFile(path.join(project, 'features/home/server/get-homepage-data.ts'), 'utf8');
const portfolioList = await fs.readFile(path.join(project, 'features/portfolio/server/get-portfolio-projects.ts'), 'utf8');
const portfolioDetail = await fs.readFile(path.join(project, 'features/portfolio/server/get-portfolio-project.ts'), 'utf8');
if (!homeData.includes('localizeFields')) throw new Error('Home DB boundary is not wired to localizeFields.');
if (!portfolioList.includes('localizeFields')) throw new Error('Portfolio list DB boundary is not wired to localizeFields.');
if (!portfolioDetail.includes('localizeFields')) throw new Error('Portfolio detail DB boundary is not wired to localizeFields.');

try {
  await fs.access(path.join(project, 'app/api/localization-test/route.ts'));
  throw new Error('Temporary localization-test route still exists.');
} catch (error) {
  if (error?.message === 'Temporary localization-test route still exists.') throw error;
}

console.log(`Translation verification passed: ${englishKeys.length} leaf keys across ${locales.length} locales.`);
console.log('Dynamic localization boundaries present for Home + Portfolio; temporary test route absent.');
console.log('Run pnpm typecheck, pnpm i18n:audit and pnpm build as the final code gates.');
console.log(`Pack location: ${here}`);
