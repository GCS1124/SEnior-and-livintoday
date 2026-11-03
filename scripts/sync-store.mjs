// Refreshes prices and variant IDs for every SALT Online Store product the site links to.
// Runs before each build. If the store can't be reached, the last saved copy is kept.
import { readFileSync, writeFileSync } from 'node:fs';

const STORE = 'https://www.saltonlinestore.com';
const OUT = new URL('../src/data/store-products.json', import.meta.url);
const site = readFileSync(new URL('../src/data/site.ts', import.meta.url), 'utf8');
const handles = [...new Set([...site.matchAll(/handle:\s*'([^']+)'/g)].map((m) => m[1]))];

let saved = {};
try { saved = JSON.parse(readFileSync(OUT, 'utf8')); } catch {}

const out = {};
let ok = 0;
for (const h of handles) {
  try {
    const res = await fetch(`${STORE}/products/${h}.js`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(String(res.status));
    const p = await res.json();
    out[h] = {
      title: p.title,
      option: p.options?.length && p.options[0].name !== 'Title' ? p.options.map((o) => o.name).join(' / ') : null,
      variants: p.variants
        .filter((v) => v.available)
        .map((v) => ({ id: v.id, title: v.title, price: v.price / 100 })),
    };
    ok++;
  } catch (e) {
    if (saved[h]) out[h] = saved[h];
    console.warn(`[sync-store] ${h}: ${e.message}${saved[h] ? ' (kept saved copy)' : ''}`);
  }
}
writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n');
console.log(`[sync-store] ${ok}/${handles.length} products refreshed`);
