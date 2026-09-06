import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { applyTransforms } from './apply-transforms.mjs';
import { compileStaticTranslations } from './compile-static-translations.mjs';

const execFileAsync = promisify(execFile);
const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flags = new Set(args.filter(arg => arg.startsWith('--')));
const projectArg = args.find(arg => !arg.startsWith('--'));
const project = path.resolve(projectArg ?? process.cwd());
const payload = path.join(here, 'payload');
const dryRun = flags.has('--dry-run');
const force = flags.has('--force');
const skipStaticTranslate = flags.has('--skip-static-translate');
const transformTargets = [
  'features/home/components/pricing/HomePricing.tsx',
  'features/home/components/HomeTechnologyRail.tsx',
  'features/home/components/inspirations/InspirationCapsule.tsx',
  'features/home/components/inspirations/InspirationNetwork.tsx',
  'features/portfolio/components/PortfolioTechnologyRail.tsx',
  'features/portfolio/components/PortfolioProjectCard.tsx',
  'package.json',
  'app/api/localization-test/route.ts'
];

async function exists(file) { try { await fs.access(file); return true; } catch { return false; } }
async function walkFiles(dir, base = dir, out = []) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walkFiles(full, base, out);
    else out.push(path.relative(base, full));
  }
  return out;
}
async function gitCleanGuard() {
  try {
    const { stdout } = await execFileAsync('git', ['status', '--porcelain'], { cwd: project });
    if (stdout.trim() && !force) throw new Error('Git working tree is not clean. Finish/push your current work first, or rerun with --force if you intentionally accept that risk.');
  } catch (error) {
    if (error?.message?.startsWith('Git working tree')) throw error;
    console.warn('Warning: git status could not be checked. Installer safety is reduced.');
  }
}
async function restoreBackup(backup) {
  const manifestFile = path.join(backup, 'backup-manifest.json');
  const manifest = JSON.parse(await fs.readFile(manifestFile, 'utf8'));
  for (const item of manifest.items) {
    const dst = path.join(project, item.path);
    if (item.existed) {
      const src = path.join(backup, 'files', item.path);
      await fs.mkdir(path.dirname(dst), { recursive: true });
      await fs.copyFile(src, dst);
    } else {
      await fs.rm(dst, { force: true, recursive: true });
    }
  }
}

const packageFile = path.join(project, 'package.json');
if (!(await exists(packageFile))) {
  console.error('Rcentz installer: package.json not found.');
  console.error('Usage: node install.mjs "C:\\Users\\DeWealth\\Desktop\\rcentz-systems"');
  process.exit(1);
}

await gitCleanGuard();
const payloadFiles = await walkFiles(payload);
const affected = [...new Set([...payloadFiles, ...transformTargets])];

if (dryRun) {
  console.log(`Dry run OK. Project: ${project}`);
  console.log(`Prepared files: ${payloadFiles.length}; total guarded targets: ${affected.length}.`);
  console.log(`Static Azure compile: ${skipStaticTranslate ? 'SKIPPED' : 'ENABLED'}`);
  process.exit(0);
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const backup = path.join(project, '.translation-backups', stamp);
await fs.mkdir(path.join(backup, 'files'), { recursive: true });
const manifest = { createdAt: new Date().toISOString(), project, items: [] };

for (const rel of affected) {
  const src = path.join(project, rel);
  const present = await exists(src);
  manifest.items.push({ path: rel, existed: present });
  if (present) {
    const dst = path.join(backup, 'files', rel);
    await fs.mkdir(path.dirname(dst), { recursive: true });
    const stat = await fs.stat(src);
    if (stat.isFile()) await fs.copyFile(src, dst);
  }
}
await fs.writeFile(path.join(backup, 'backup-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

try {
  for (const rel of payloadFiles) {
    const src = path.join(payload, rel);
    const dst = path.join(project, rel);
    await fs.mkdir(path.dirname(dst), { recursive: true });
    await fs.copyFile(src, dst);
  }

  await applyTransforms(project);

  const testRoute = path.join(project, 'app', 'api', 'localization-test', 'route.ts');
  await fs.rm(testRoute, { force: true });

  const pkg = JSON.parse(await fs.readFile(packageFile, 'utf8'));
  pkg.scripts = {
    ...(pkg.scripts ?? {}),
    'i18n:audit': 'node scripts/i18n-audit.mjs'
  };
  pkg.dependencies = {
    ...(pkg.dependencies ?? {}),
    'next-intl': pkg.dependencies?.['next-intl'] ?? '^4.14.2'
  };
  await fs.writeFile(packageFile, `${JSON.stringify(pkg, null, 2)}\n`);

  if (!skipStaticTranslate) await compileStaticTranslations(project);

  console.log('\nRcentz translation closure payload installed successfully.');
  console.log(`Backup: ${backup}`);
  console.log('Next closure gates:');
  console.log('  pnpm install');
  console.log('  pnpm typecheck');
  console.log('  pnpm i18n:audit');
  console.log('  pnpm build');
  console.log(`  node "${path.join(here, 'verify.mjs')}" "${project}"`);
  console.log('\nThen smoke-test /, /services, /portfolio and one service + portfolio slug in EN/FR/ES/DE/PT.');
  console.log('Only after those gates pass should M08 be marked: Dynamic translation complete.');
} catch (error) {
  console.error(`\nInstall failed: ${error instanceof Error ? error.message : String(error)}`);
  console.error('Restoring the repository from the installer backup...');
  await restoreBackup(backup);
  console.error('Restore complete. No translation-pack changes were kept.');
  process.exit(1);
}
