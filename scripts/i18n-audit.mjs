import fs from 'node:fs/promises';
import path from 'node:path';

const roots = ['features/home', 'features/services', 'features/portfolio', 'ui-shell/navigation'];

const exclude = new Set([path.normalize('features/home/components/inspirations/inspiration-data.ts')]);

const extensions = new Set(['.ts', '.tsx']);

/**
 * Brand and product identities are not translatable interface copy.
 *
 * Keep this list explicit so normal sentences beginning with a brand
 * name are still audited.
 *
 * Add future Rcentz product identities here when they become official.
 */
const brandPhrases = new Set(['Rcentz', 'Rcentz Systems', 'Rcentz Core', 'Rcentz Framework']);

const english = JSON.parse(await fs.readFile(path.join('messages', 'en.json'), 'utf8'));

function collect(value, out = []) {
  if (value && typeof value === 'object') {
    for (const child of Object.values(value)) {
      collect(child, out);
    }
  } else if (
    typeof value === 'string' &&
    value.length >= 12 &&
    /[A-Za-z]{4}/.test(value) &&
    !value.includes('{count, plural,')
  ) {
    out.push(value);
  }

  return out;
}

const phrases = [...new Set(collect(english))]
  .filter(value => {
    if (/^(https?:|[A-Za-z0-9.+#/-]+)$/.test(value)) {
      return false;
    }

    if (brandPhrases.has(value.trim())) {
      return false;
    }

    return true;
  })
  .sort((a, b) => b.length - a.length);

function stripComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
}

const hits = [];

async function walk(dir) {
  let entries = [];

  try {
    entries = await fs.readdir(dir, {
      withFileTypes: true
    });
  } catch {
    return;
  }

  for (const entry of entries) {
    const file = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await walk(file);
      continue;
    }

    if (!extensions.has(path.extname(file)) || exclude.has(path.normalize(file))) {
      continue;
    }

    const text = stripComments(await fs.readFile(file, 'utf8'));

    for (const phrase of phrases) {
      if (text.includes(phrase)) {
        hits.push(`${file}: raw static copy -> ${phrase}`);
      }
    }
  }
}

for (const root of roots) {
  await walk(root);
}

if (hits.length) {
  console.error(`i18n audit found ${hits.length} raw static message occurrence(s):`);

  console.error(hits.slice(0, 120).join('\n'));

  process.exit(1);
}

console.log('i18n audit passed: no known static EN message text remains in audited public source surfaces.');
