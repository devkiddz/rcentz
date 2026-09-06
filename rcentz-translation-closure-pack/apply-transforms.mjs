import fs from 'node:fs/promises';
import path from 'node:path';

function replaceRequired(text, from, to, label) {
  if (!text.includes(from)) {
    throw new Error(`Transform mismatch in ${label}: expected source was not found:\n${from.slice(0, 180)}`);
  }
  return text.replace(from, to);
}

async function transformFile(project, rel, transform) {
  const file = path.join(project, rel);
  let text = await fs.readFile(file, 'utf8');
  const before = text;
  text = transform(text, rel);
  if (text !== before) await fs.writeFile(file, text);
}

function homePricing(text, rel) {
  text = replaceRequired(
    text,
    "import { useEffect, useMemo, useState } from 'react';",
    "import { useEffect, useMemo, useState } from 'react';\nimport { useTranslations } from 'next-intl';",
    rel
  );
  text = replaceRequired(
    text,
    "export function HomePricing({ services }: HomePricingProps) {\n  const availableServices",
    "export function HomePricing({ services }: HomePricingProps) {\n  const t = useTranslations('HomePricing');\n\n  const availableServices",
    rel
  );

  const presentationKeys = new Map([
    ['Web presence', 'presentations.website.label'],
    ['Build a business experience people can trust.', 'presentations.website.headline'],
    ['Responsive business website', 'presentations.website.points.0'],
    ['Service and enquiry journeys', 'presentations.website.points.1'],
    ['Performance-ready foundation', 'presentations.website.points.2'],
    ['Business', 'presentations.website.flow.0.label'],
    ['Purpose, services and content.', 'presentations.website.flow.0.description'],
    ['Experience', 'presentations.website.flow.1.label'],
    ['Responsive pages and navigation.', 'presentations.website.flow.1.description'],
    ['Enquiries', 'presentations.website.flow.2.label'],
    ['Visitor actions become opportunities.', 'presentations.website.flow.2.description'],
    ['Growth', 'presentations.website.flow.3.label'],
    ['A foundation ready to expand.', 'presentations.website.flow.3.description'],
    ['Commerce', 'presentations.ecommerce.label'],
    ['Turn products into a connected buying journey.', 'presentations.ecommerce.headline'],
    ['Product discovery and catalogue', 'presentations.ecommerce.points.0'],
    ['Cart and checkout foundation', 'presentations.ecommerce.points.1'],
    ['Payment and order workflows', 'presentations.ecommerce.points.2'],
    ['Products', 'presentations.ecommerce.flow.0.label'],
    ['Catalogue and discovery.', 'presentations.ecommerce.flow.0.description'],
    ['Cart', 'presentations.ecommerce.flow.1.label'],
    ['Intent becomes an order.', 'presentations.ecommerce.flow.1.description'],
    ['Payment', 'presentations.ecommerce.flow.2.label'],
    ['Secure payment integration.', 'presentations.ecommerce.flow.2.description'],
    ['Fulfilment', 'presentations.ecommerce.flow.3.label'],
    ['Orders continue into operations.', 'presentations.ecommerce.flow.3.description'],
    ['Business system', 'presentations.businessSystem.label'],
    ['Bring operations into one working environment.', 'presentations.businessSystem.headline'],
    ['Custom operational workflows', 'presentations.businessSystem.points.0'],
    ['Users, records and permissions', 'presentations.businessSystem.points.1'],
    ['Dashboards and structured data', 'presentations.businessSystem.points.2'],
    ['Users', 'presentations.businessSystem.flow.0.label'],
    ['People enter through real roles.', 'presentations.businessSystem.flow.0.description'],
    ['Workflow', 'presentations.businessSystem.flow.1.label'],
    ['Operations move through defined steps.', 'presentations.businessSystem.flow.1.description'],
    ['Data', 'presentations.businessSystem.flow.2.label'],
    ['Activity becomes structured records.', 'presentations.businessSystem.flow.2.description'],
    ['Dashboard', 'presentations.businessSystem.flow.3.label'],
    ['Information becomes usable insight.', 'presentations.businessSystem.flow.3.description']
  ]);

  // Module-level presentation text becomes translation keys; values are translated when rendered.
  for (const [source, key] of presentationKeys) {
    const single = `'${source.replaceAll("'", "\\'")}'`;
    if (text.includes(single)) text = text.split(single).join(`'${key}'`);
  }

  text = replaceRequired(text, '{itemConfig.label}', '{t(itemConfig.label)}', rel);
  text = replaceRequired(text, '{config.label}', '{t(config.label)}', rel);
  text = replaceRequired(text, '{config.headline}', '{t(config.headline)}', rel);
  text = replaceRequired(text, '>{point}</p>', '>{t(point)}</p>', rel);
  text = replaceRequired(text, '>{step.label}</p>', '>{t(step.label)}</p>', rel);
  text = replaceRequired(text, '{step.description}', '{t(step.description)}', rel);

  const staticReplacements = [
    ['          Starting points', "          {t('eyebrow')}"],
    ['          Start with the system you need today.\n          <span className="text-muted"> Leave room for what comes next.</span>', "          {t('titlePrimary')}\n          <span className=\"text-muted\"> {t('titleSecondary')}</span>"],
    ['          Real entry pricing from the Rcentz service catalogue. Scope expands according to integrations,\n          workflows, content and operational complexity.', "          {t('description')}"],
    ['                Starting from', "                {t('startingFrom')}"],
    ["                  International projects from{' '}\n                  <span className=\"font-medium text-foreground\">{formatUsd(usd.priceFrom)}</span>", "                  {t('internationalFrom', { amount: formatUsd(usd.priceFrom) })}"],
    ['                Explore this service', "                {t('exploreService')}"],
    ['                    Starting architecture', "                    {t('architectureEyebrow')}"],
    ['                    How the system begins to move.', "                    {t('architectureTitle')}"],
    ['                    Live preview', "                    {t('livePreview')}"],
    ['                  <p className="mt-2 text-[11px] font-medium">Modular</p>', "                  <p className=\"mt-2 text-[11px] font-medium\">{t('modular')}</p>"],
    ['                  <p className="mt-2 text-[11px] font-medium">Measurable</p>', "                  <p className=\"mt-2 text-[11px] font-medium\">{t('measurable')}</p>"],
    ['                  <p className="mt-2 text-[11px] font-medium">Connected</p>', "                  <p className=\"mt-2 text-[11px] font-medium\">{t('connected')}</p>"],
    ['        Starting prices are guidance, not fixed quotes. Final project cost reflects actual scope,\n        integrations, workflows, data requirements and delivery complexity.', "        {t('disclaimer')}"],
  ];
  for (const [from, to] of staticReplacements) text = replaceRequired(text, from, to, rel);
  return text;
}

function homeTechnologyRail(text, rel) {
  text = text.replace("} from 'simple-icons';", "} from 'simple-icons';\n\nimport { getTranslations } from 'next-intl/server';");
  text = replaceRequired(text, 'export function HomeTechnologyRail() {\n  const repeatedPlatforms', "export async function HomeTechnologyRail() {\n  const t = await getTranslations('HomeTechnologyRail');\n  const repeatedPlatforms", rel);
  text = replaceRequired(text, '{brand.category}', "{t(`categories.${brand.category.toLowerCase()}`)}", rel);
  text = replaceRequired(text, '            Technology ecosystem', "            {t('eyebrow')}", rel);
  text = replaceRequired(text, '            Technologies and platforms we build with.', "            {t('title')}", rel);
  text = replaceRequired(text, '          Frameworks, infrastructure, intelligence and payment platforms selected according to what each\n          product needs.', "          {t('description')}", rel);
  return text;
}

function inspirationCapsule(text, rel) {
  text = text.replace("import type { CSSProperties } from 'react';", "import type { CSSProperties } from 'react';\nimport { useTranslations } from 'next-intl';");
  text = replaceRequired(text, '  const Icon = node.icon;', "  const t = useTranslations('HomeInspirations');\n  const Icon = node.icon;", rel);
  text = replaceRequired(text, '{node.shortLabel}', "{t(`nodes.${node.id}.shortLabel`)}", rel);
  return text;
}

function inspirationNetwork(text, rel) {
  text = text.replace("import { BrainCircuit, Rocket, Sparkles } from 'lucide-react';", "import { BrainCircuit, Rocket, Sparkles } from 'lucide-react';\nimport { useTranslations } from 'next-intl';");
  text = replaceRequired(text, 'export function InspirationNetwork({ activeNode, onChange }: InspirationNetworkProps) {\n  const active', "export function InspirationNetwork({ activeNode, onChange }: InspirationNetworkProps) {\n  const t = useTranslations('HomeInspirations');\n  const active", rel);
  text = text.split('{active.label}').join("{t(`nodes.${active.id}.label`)}");
  text = text.split('{active.description}').join("{t(`nodes.${active.id}.description`)}");
  text = replaceRequired(text, "{['Reusable', 'Scalable', 'Maintainable'].map(label => (", "{[0, 1, 2].map(index => {\n            const label = t(`outputs.${index}`);\n            return (", rel);
  // close the extra callback block after the output capsule map
  text = replaceRequired(text, "          ))}\n        </div>\n\n        {/* ACTIVE SUMMARY PANEL */}", "            );\n          })}\n        </div>\n\n        {/* ACTIVE SUMMARY PANEL */}", rel);
  return text;
}

function portfolioTechnologyRail(text, rel) {
  text = text.replace("} from 'simple-icons';", "} from 'simple-icons';\n\nimport { getTranslations } from 'next-intl/server';");
  text = replaceRequired(text, 'export function PortfolioTechnologyRail({ projects }: PortfolioTechnologyRailProps) {\n  const technologyMap', "export async function PortfolioTechnologyRail({ projects }: PortfolioTechnologyRailProps) {\n  const t = await getTranslations('PortfolioTechnologyRail');\n  const technologyMap", rel);
  text = replaceRequired(text, '            Built with', "            {t('eyebrow')}", rel);
  text = replaceRequired(text, '            Modern technology behind every serious system.', "            {t('title')}", rel);
  text = replaceRequired(text, '          Frameworks, intelligence, payments, data and infrastructure represented by the published work itself.', "          {t('description')}", rel);
  text = replaceRequired(text, '{presentation.category}', "{t.has(`categories.${presentation.category.toLowerCase()}`) ? t(`categories.${presentation.category.toLowerCase()}`) : presentation.category}", rel);
  text = replaceRequired(text, '{technology.usage} projects', "{t('projects', { count: technology.usage })}", rel);
  return text;
}

function portfolioProjectCard(text, rel) {
  text = text.replace("import { motion, useReducedMotion } from 'motion/react';", "import { motion, useReducedMotion } from 'motion/react';\nimport { useTranslations } from 'next-intl';");

  text = replaceRequired(text, "}) {\n  return (\n    <Link\n      href={`/portfolio/${project.slug}`}\n      aria-label={`Open ${project.name} project preview`}", "}) {\n  const t = useTranslations('PortfolioCard');\n  return (\n    <Link\n      href={`/portfolio/${project.slug}`}\n      aria-label={t('openPreview', { project: project.name })}", rel);

  text = replaceRequired(text, "}) {\n  return (\n    <Link\n      href={`/portfolio/${project.slug}`}\n      className={[\n        'group/preview", "}) {\n  const t = useTranslations('PortfolioCard');\n  return (\n    <Link\n      href={`/portfolio/${project.slug}`}\n      className={[\n        'group/preview", rel);
  text = replaceRequired(text, '      Go to preview', "      {t('goPreview')}", rel);

  text = replaceRequired(text, '  const reduceMotion = Boolean(useReducedMotion());\n\n  const safeProgress', "  const t = useTranslations('PortfolioCard');\n  const enumT = useTranslations('CommonEnums');\n  const reduceMotion = Boolean(useReducedMotion());\n\n  const safeProgress", rel);
  text = replaceRequired(text, '>Progress</p>', ">{t('progress')}</p>", rel);
  text = text.split('aria-label={humanize(status)}').join("aria-label={enumT.has(`projectStatuses.${status.toLowerCase()}`) ? enumT(`projectStatuses.${status.toLowerCase()}`) : humanize(status)}");
  text = text.split('title={humanize(status)}').join("title={enumT.has(`projectStatuses.${status.toLowerCase()}`) ? enumT(`projectStatuses.${status.toLowerCase()}`) : humanize(status)}");

  text = replaceRequired(text, 'function PortfolioEngagementMeta({ project }: { project: PortfolioProject }) {\n  const reduceMotion', "function PortfolioEngagementMeta({ project }: { project: PortfolioProject }) {\n  const t = useTranslations('PortfolioCard');\n  const reduceMotion", rel);
  for (const [source,key] of [['Views','views'],['Likes','likes'],['Reactions','reactions'],['Comments','comments']]) {
    text = text.split(`label: '${source}'`).join(`label: t('${key}')`);
  }

  text = replaceRequired(text, "}) {\n  const reduceMotion = Boolean(useReducedMotion());\n\n  const activeReactionTypes", "}) {\n  const t = useTranslations('PortfolioCard');\n  const enumT = useTranslations('CommonEnums');\n  const reduceMotion = Boolean(useReducedMotion());\n\n  const activeReactionTypes", rel);
  for (const [source,key] of [['Love','love'],['Fire','fire'],['Shares','shares']]) text = text.split(`label: '${source}'`).join(`label: t('${key}')`);
  text = replaceRequired(text, '>Credits</p>', ">{t('credits')}</p>", rel);
  text = replaceRequired(text, "{credit.name ?? 'Contributor'}", "{credit.name ?? t('contributor')}", rel);
  text = replaceRequired(text, '>No public credits recorded yet.</p>', ">{t('noCredits')}</p>", rel);
  text = replaceRequired(text, '>Suggestions</p>', ">{t('suggestions')}</p>", rel);
  text = replaceRequired(text, '{humanize(suggestion.status)} · {humanize(suggestion.priority)}', "{enumT.has(`featureStatuses.${suggestion.status.toLowerCase()}`) ? enumT(`featureStatuses.${suggestion.status.toLowerCase()}`) : humanize(suggestion.status)} · {enumT.has(`priorities.${suggestion.priority.toLowerCase()}`) ? enumT(`priorities.${suggestion.priority.toLowerCase()}`) : humanize(suggestion.priority)}", rel);
  text = replaceRequired(text, '              No proposed or nominated features right now.', "              {t('noSuggestions')}", rel);

  text = replaceRequired(text, 'export function PortfolioProjectCard({ project, index, featured = false }: PortfolioProjectCardProps) {\n  const reduceMotion', "export function PortfolioProjectCard({ project, index, featured = false }: PortfolioProjectCardProps) {\n  const t = useTranslations('PortfolioCard');\n  const enumT = useTranslations('CommonEnums');\n  const reduceMotion", rel);
  text = replaceRequired(text, '                Featured project', "                {t('featuredProject')}", rel);
  text = text.split('{humanize(project.type)}').join("{enumT.has(`projectTypes.${project.type.toLowerCase()}`) ? enumT(`projectTypes.${project.type.toLowerCase()}`) : humanize(project.type)}");
  text = text.split('{humanize(project.status)}').join("{enumT.has(`projectStatuses.${project.status.toLowerCase()}`) ? enumT(`projectStatuses.${project.status.toLowerCase()}`) : humanize(project.status)}");
  text = replaceRequired(text, "project.tagline ?? project.description ?? 'Published Rcentz project.'", "project.tagline ?? project.description ?? t('publishedFallback')", rel);
  text = replaceRequired(text, "project.tagline ?? project.summary ?? project.description ?? 'Rcentz project.'", "project.tagline ?? project.summary ?? project.description ?? t('projectFallback')", rel);
  text = text.split('                  View live').join("                  {t('viewLive')}");
  text = text.split('                  Source').join("                  {t('source')}");
  text = replaceRequired(text, 'aria-label={`Open ${project.name} live`}', "aria-label={t('openLive', { project: project.name })}", rel);
  text = replaceRequired(text, 'title="View live"', "title={t('viewLive')}", rel);
  return text;
}

export async function applyTransforms(project) {
  await transformFile(project, 'features/home/components/pricing/HomePricing.tsx', homePricing);
  await transformFile(project, 'features/home/components/HomeTechnologyRail.tsx', homeTechnologyRail);
  await transformFile(project, 'features/home/components/inspirations/InspirationCapsule.tsx', inspirationCapsule);
  await transformFile(project, 'features/home/components/inspirations/InspirationNetwork.tsx', inspirationNetwork);
  await transformFile(project, 'features/portfolio/components/PortfolioTechnologyRail.tsx', portfolioTechnologyRail);
  await transformFile(project, 'features/portfolio/components/PortfolioProjectCard.tsx', portfolioProjectCard);
}
