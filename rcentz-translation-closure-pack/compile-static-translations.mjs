import fs from 'node:fs/promises';
import path from 'node:path';

const TARGETS = ['fr', 'es', 'de', 'pt'];
const MAX_BATCH_ITEMS = 80;
const MAX_BATCH_CHARS = 35000;

const manualPluralOverrides = {
  fr: {
    'ServicesCategoryBlocks.serviceCount': '{count, plural, one {# service} other {# services}}',
    'PortfolioHero.projectCount': '{count, plural, one {# projet public} other {# projets publics}}',
    'PortfolioHero.screenCount': '{count, plural, one {# écran réel} other {# écrans réels}}',
    'PortfolioDetailGallery.itemCount': '{count, plural, one {# élément} other {# éléments}}'
  },
  es: {
    'ServicesCategoryBlocks.serviceCount': '{count, plural, one {# servicio} other {# servicios}}',
    'PortfolioHero.projectCount': '{count, plural, one {# proyecto público} other {# proyectos públicos}}',
    'PortfolioHero.screenCount': '{count, plural, one {# pantalla real} other {# pantallas reales}}',
    'PortfolioDetailGallery.itemCount': '{count, plural, one {# elemento} other {# elementos}}'
  },
  de: {
    'ServicesCategoryBlocks.serviceCount': '{count, plural, one {# Dienstleistung} other {# Dienstleistungen}}',
    'PortfolioHero.projectCount': '{count, plural, one {# öffentliches Projekt} other {# öffentliche Projekte}}',
    'PortfolioHero.screenCount': '{count, plural, one {# echter Screen} other {# echte Screens}}',
    'PortfolioDetailGallery.itemCount': '{count, plural, one {# Element} other {# Elemente}}'
  },
  pt: {
    'ServicesCategoryBlocks.serviceCount': '{count, plural, one {# serviço} other {# serviços}}',
    'PortfolioHero.projectCount': '{count, plural, one {# projeto público} other {# projetos públicos}}',
    'PortfolioHero.screenCount': '{count, plural, one {# ecrã real} other {# ecrãs reais}}',
    'PortfolioDetailGallery.itemCount': '{count, plural, one {# item} other {# itens}}'
  }
};

async function readEnvFile(file) {
  try {
    const text = await fs.readFile(file, 'utf8');
    const values = {};
    for (const raw of text.split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const i = line.indexOf('=');
      if (i < 1) continue;
      const key = line.slice(0, i).trim();
      let value = line.slice(i + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
      values[key] = value;
    }
    return values;
  } catch {
    return {};
  }
}

async function getAzureConfig(project) {
  const local = await readEnvFile(path.join(project, '.env.local'));
  const regular = await readEnvFile(path.join(project, '.env'));
  const env = { ...regular, ...local, ...process.env };
  const key = env.AZURE_TRANSLATOR_KEY;
  const region = env.AZURE_TRANSLATOR_REGION || 'eastus';
  const endpoint = (env.AZURE_TRANSLATOR_ENDPOINT || 'https://api.cognitive.microsofttranslator.com/').replace(/\/$/, '');
  if (!key) throw new Error('AZURE_TRANSLATOR_KEY was not found in process env, .env.local or .env.');
  return { key, region, endpoint };
}

function flatten(value, prefix = '', out = {}) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) flatten(child, prefix ? `${prefix}.${key}` : key, out);
  } else {
    out[prefix] = value;
  }
  return out;
}

function setPath(root, keyPath, value) {
  const parts = keyPath.split('.');
  let current = root;
  for (let i = 0; i < parts.length - 1; i += 1) {
    current[parts[i]] ??= {};
    current = current[parts[i]];
  }
  current[parts.at(-1)] = value;
}

function shouldCompile(key, english, current) {
  return typeof english === 'string' && (!current || current === english);
}

function protect(text) {
  const tokens = [];
  const protectedText = text.replace(/<\/?[a-zA-Z][^>]*>|\{[a-zA-Z][a-zA-Z0-9_]*\}/g, match => {
    const token = `__RCENTZ_${tokens.length}__`;
    tokens.push(match);
    return token;
  });
  return { protectedText, tokens };
}

function restore(text, tokens) {
  let result = text;
  tokens.forEach((tokenValue, index) => {
    result = result.replaceAll(`__RCENTZ_${index}__`, tokenValue);
  });
  return result;
}

function batches(items) {
  const result = [];
  let current = [];
  let chars = 0;
  for (const item of items) {
    const len = item.text.length;
    if (current.length && (current.length >= MAX_BATCH_ITEMS || chars + len > MAX_BATCH_CHARS)) {
      result.push(current); current = []; chars = 0;
    }
    current.push(item); chars += len;
  }
  if (current.length) result.push(current);
  return result;
}

async function translateBatch(config, locale, items) {
  const url = `${config.endpoint}/translate?api-version=3.0&from=en&to=${encodeURIComponent(locale)}`;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': config.key,
        'Ocp-Apim-Subscription-Region': config.region,
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(items.map(item => ({ Text: item.text })))
    });
    if (response.ok) {
      const data = await response.json();
      if (!Array.isArray(data) || data.length !== items.length) throw new Error(`Azure returned ${data?.length ?? 0} translations for ${items.length} inputs.`);
      return data.map(entry => entry?.translations?.[0]?.text ?? '');
    }
    if (response.status !== 429 || attempt === 3) {
      const body = await response.text();
      throw new Error(`Azure Translator ${response.status}: ${body.slice(0, 500)}`);
    }
    const retryAfter = Number(response.headers.get('retry-after'));
    await new Promise(resolve => setTimeout(resolve, Number.isFinite(retryAfter) ? retryAfter * 1000 : 600 * 2 ** attempt));
  }
  throw new Error('Azure translation retry loop exhausted.');
}

export async function compileStaticTranslations(project) {
  const config = await getAzureConfig(project);
  const messagesDir = path.join(project, 'messages');
  const english = JSON.parse(await fs.readFile(path.join(messagesDir, 'en.json'), 'utf8'));
  const flatEnglish = flatten(english);

  for (const locale of TARGETS) {
    const file = path.join(messagesDir, `${locale}.json`);
    const target = JSON.parse(await fs.readFile(file, 'utf8'));
    const flatTarget = flatten(target);
    const queue = [];

    for (const [key, value] of Object.entries(flatEnglish)) {
      const manual = manualPluralOverrides[locale]?.[key];
      if (manual) {
        setPath(target, key, manual);
        continue;
      }
      if (!shouldCompile(key, value, flatTarget[key])) continue;
      if (value.includes(', plural,')) {
        throw new Error(`Manual ICU translation required for ${locale}:${key}`);
      }
      const { protectedText, tokens } = protect(value);
      queue.push({ key, text: protectedText, tokens });
    }

    let translatedCount = 0;
    for (const batch of batches(queue)) {
      const translated = await translateBatch(config, locale, batch);
      translated.forEach((value, index) => {
        const item = batch[index];
        const restored = restore(value, item.tokens);
        if (!restored.trim()) throw new Error(`Empty translation for ${locale}:${item.key}`);
        setPath(target, item.key, restored);
        translatedCount += 1;
      });
    }

    await fs.writeFile(file, `${JSON.stringify(target, null, 2)}\n`);
    console.log(`Static ${locale}: ${translatedCount} static strings compiled.`);
  }
}
