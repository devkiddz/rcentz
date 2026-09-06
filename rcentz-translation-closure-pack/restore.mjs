import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const project = path.resolve(process.argv[2] ?? process.cwd());
let backup = process.argv[3] ? path.resolve(process.argv[3]) : null;
if (!backup) {
  const root = path.join(project, '.translation-backups');
  const dirs = (await fs.readdir(root, { withFileTypes: true })).filter(e => e.isDirectory()).map(e => e.name).sort();
  if (!dirs.length) throw new Error('No translation backups found.');
  backup = path.join(root, dirs.at(-1));
}
const manifest = JSON.parse(await fs.readFile(path.join(backup, 'backup-manifest.json'), 'utf8'));
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
console.log(`Restored translation backup: ${backup}`);
