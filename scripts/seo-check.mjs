// Post-build SEO audit: run `npm run build && npm run check:seo`.
// Checks every built page for the on-page basics and fails CI if something regresses.
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const SITE = 'https://seniorandlivingtoday.com';
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(DIST);

const routes = new Set(files.map((f) => '/' + path.relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/')));
const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const redirects = new Set(vercel.redirects.map((r) => r.source + '/'));
const publicFiles = new Set(['/robots.txt', '/llms.txt', '/rss.xml', '/sitemap-index.xml', '/favicon.svg', '/og-default.png']);

const titles = new Map(); const descs = new Map();
let errors = 0, warnings = 0;
const err = (f, m) => { errors++; console.log(`  ✗ ${f}: ${m}`); };
const warn = (f, m) => { warnings++; console.log(`  ! ${f}: ${m}`); };
const decode = (x) => x && x.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
const get = (h, re) => decode((h.match(re) || [])[1]);

for (const file of files) {
  const rel = '/' + path.relative(DIST, file).replace(/index\.html$/, '');
  const h = fs.readFileSync(file, 'utf8');
  const noindex = /name="robots" content="noindex/.test(h);
  const title = get(h, /<title>([^<]*)<\/title>/);
  const desc = get(h, /<meta name="description" content="([^"]*)"/);
  const canonical = get(h, /<link rel="canonical" href="([^"]*)"/);
  const h1s = (h.match(/<h1[\s>]/g) || []).length;

  if (!title) err(rel, 'missing <title>'); else {
    if (title.length > 65) warn(rel, `title ${title.length} chars (may truncate): ${title}`);
    if (!noindex) { if (titles.has(title)) err(rel, `duplicate title with ${titles.get(title)}`); titles.set(title, rel); }
  }
  if (!desc) err(rel, 'missing meta description'); else {
    if (!noindex && desc.length < 110 || desc.length > 165) warn(rel, `description ${desc.length} chars`);
    if (!noindex) { if (descs.has(desc)) err(rel, `duplicate description with ${descs.get(desc)}`); descs.set(desc, rel); }
  }
  if (h1s !== 1) err(rel, `${h1s} <h1> tags (want exactly 1)`);
  if (!noindex && canonical !== SITE + rel) err(rel, `canonical ${canonical} != ${SITE + rel}`);
  if (!/property="og:image"/.test(h)) err(rel, 'missing og:image');

  for (const m of h.matchAll(/<img\b[^>]*>/g)) if (!/\balt="/.test(m[0])) err(rel, `img without alt: ${m[0].slice(0, 80)}`);
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { err(rel, 'invalid JSON-LD'); }
  }
  for (const m of h.matchAll(/href="(\/[^"#?]*)"/g)) {
    const u = m[1];
    if (u.startsWith('/_astro/') || publicFiles.has(u) || u.startsWith('/images/')) continue;
    if (!routes.has(u) && !redirects.has(u)) err(rel, `broken internal link ${u}`);
    else if (!u.endsWith('/')) warn(rel, `link without trailing slash ${u}`);
  }
}
console.log(`\nChecked ${files.length} pages: ${errors} errors, ${warnings} warnings.`);
process.exit(errors ? 1 : 0);
