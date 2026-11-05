#!/usr/bin/env node
/**
 * Contrôle de disponibilité du portfolio en production.
 * Usage : npm run monitor            (affiche le résultat)
 *         npm run monitor -- --log   (ajoute aussi une ligne au journal)
 * Code de sortie 1 si un contrôle échoue, pour alerter via GitHub Actions.
 */
import { appendFileSync } from 'node:fs';

const BASE = process.env.SITE_URL ?? 'https://williams-dev.vercel.app';
const LOG = new URL('../docs/monitoring/journal-disponibilite.csv', import.meta.url);

async function probe(name, url, check = (r) => r.ok) {
  const start = performance.now();
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
    return { name, ok: check(res), detail: `HTTP ${res.status}`, ms: Math.round(performance.now() - start) };
  } catch (err) {
    return { name, ok: false, detail: err.cause?.code ?? err.name, ms: Math.round(performance.now() - start) };
  }
}

const home = await fetch(BASE).then((r) => r.text()).catch(() => '');
const asset = (re) => home.match(re)?.[0];
const bundlePath = asset(/\/assets\/index-[^"]+\.js/);
const bundle = bundlePath ? await fetch(BASE + bundlePath).then((r) => r.text()).catch(() => '') : '';
const supabase = bundle.match(/https:\/\/[a-z0-9-]+\.supabase\.co/)?.[0];

const results = await Promise.all([
  probe('accueil', BASE),
  probe('route /admin', `${BASE}/admin`),
  probe('robots.txt', `${BASE}/robots.txt`),
  probe('sitemap.xml', `${BASE}/sitemap.xml`),
  probe('og-image', `${BASE}/og-image.png`),
  bundlePath
    ? probe('bundle JS', BASE + bundlePath)
    : Promise.resolve({ name: 'bundle JS', ok: false, detail: 'introuvable', ms: 0 }),
  /* Toute réponse HTTP, même 401, prouve que le service Supabase existe */
  supabase
    ? probe('Supabase', `${supabase}/auth/v1/health`, (r) => r.status < 500)
    : Promise.resolve({ name: 'Supabase', ok: false, detail: 'URL absente du bundle', ms: 0 }),
]);

const contactReady = /service_[a-z0-9]+/.test(bundle) && /template_[a-z0-9]+/.test(bundle);
results.push({ name: 'config EmailJS', ok: contactReady, detail: contactReady ? 'présente' : 'absente du bundle', ms: 0 });

for (const r of results) {
  console.log(`${r.ok ? 'OK ' : 'KO '} ${r.name.padEnd(16)} ${r.detail.padEnd(22)} ${r.ms} ms`);
}
const failed = results.filter((r) => !r.ok);
console.log(failed.length ? `\n${failed.length} contrôle(s) en échec.` : '\nTous les contrôles sont OK.');

if (process.argv.includes('--log')) {
  const date = new Date().toISOString();
  const lines = results.map((r) => `${date},${r.name},${r.ok ? 'OK' : 'KO'},${r.detail},${r.ms}`).join('\n');
  appendFileSync(LOG, `${lines}\n`);
}
process.exit(failed.length ? 1 : 0);
