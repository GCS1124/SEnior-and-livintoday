// Stage 1 audit: crawls the built site (dist/) and records every link, button, image and form.
// Usage: node audit.mjs <distDir> <outDir>
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = process.argv[2];
const OUT = process.argv[3];
const SITE = 'https://www.seniorandlivingtoday.com';

const pages = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) pages.push(p);
  }
})(DIST);

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const strip = (s) => decode(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const route = (file) => '/' + relative(DIST, file).replace(/index\.html$/, '').replace(/\.html$/, '');

const links = [];   // {page, text, href, kind}
const images = [];  // {page, src, alt}
const buttons = []; // {page, text, attrs}
const forms = [];   // {page, action, method, attrs}
const issues = [];

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const page = route(file);
  for (const m of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const attrs = m[1];
    const hrefM = attrs.match(/\bhref\s*=\s*"([^"]*)"/i) || attrs.match(/\bhref\s*=\s*'([^']*)'/i);
    let text = strip(m[2]);
    const aria = attrs.match(/aria-label="([^"]*)"/i);
    if (!text && aria) text = decode(aria[1]);
    if (!text) { const alt = m[2].match(/alt="([^"]+)"/); if (alt) text = `[image] ${decode(alt[1])}`; }
    const href = hrefM ? decode(hrefM[1]) : null;
    links.push({ page, text: text.slice(0, 80), href });
  }
  for (const m of html.matchAll(/<img\b([^>]*)>/gi)) {
    const src = (m[1].match(/\bsrc="([^"]*)"/) || [])[1];
    const alt = m[1].match(/\balt="([^"]*)"/);
    images.push({ page, src: src ? decode(src) : null, alt: alt ? decode(alt[1]) : null });
  }
  for (const m of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
    buttons.push({ page, text: strip(m[2]).slice(0, 60) || (m[1].match(/aria-label="([^"]*)"/) || [])[1] || '', attrs: m[1].replace(/\s*data-astro-cid-\w+/g, '').trim().slice(0, 140) });
  }
  for (const m of html.matchAll(/<form\b([^>]*)>/gi)) {
    forms.push({ page, attrs: m[1].replace(/\s*data-astro-cid-\w+/g, '').trim() });
  }
}

// Resolve an internal path to a built file.
function internalExists(path) {
  const clean = path.split('#')[0].split('?')[0];
  if (clean === '' ) return true;
  const p = decodeURI(clean);
  const cands = [join(DIST, p), join(DIST, p, 'index.html'), join(DIST, p + '.html')];
  return cands.some((c) => existsSync(c) && statSync(c).isFile());
}
function anchorExists(path, hash, fromPage) {
  const target = path === '' ? fromPage : path.split('?')[0];
  const f = [join(DIST, target, 'index.html'), join(DIST, target)].find((c) => existsSync(c) && statSync(c).isFile());
  if (!f) return false;
  const html = readFileSync(f, 'utf8');
  return new RegExp(`id=["']${hash.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`).test(html);
}

const external = new Map();
for (const l of links) {
  const h = l.href;
  if (h === null) { l.kind = 'no-href'; issues.push({ ...l, problem: 'Link has no href' }); continue; }
  if (h.trim() === '' ) { l.kind = 'empty'; issues.push({ ...l, problem: 'Empty href' }); continue; }
  if (h === '#') { l.kind = 'placeholder'; issues.push({ ...l, problem: 'Placeholder href="#"' }); continue; }
  if (/^javascript:/i.test(h)) { l.kind = 'js'; issues.push({ ...l, problem: 'javascript: link' }); continue; }
  if (/^(tel|mailto|sms):/i.test(h)) { l.kind = h.split(':')[0]; continue; }
  if (h.startsWith('#')) {
    l.kind = 'anchor';
    if (h.length > 1 && !anchorExists('', h.slice(1), l.page)) issues.push({ ...l, problem: `Anchor ${h} not found on page` });
    continue;
  }
  let url = h;
  if (h.startsWith(SITE)) url = h.slice(SITE.length) || '/';
  if (url.startsWith('/')) {
    l.kind = 'internal';
    const [p, hash] = url.split('#');
    if (!internalExists(p)) issues.push({ ...l, problem: 'Internal page not found (404)' });
    else if (hash && !anchorExists(p, hash, l.page)) issues.push({ ...l, problem: `Anchor #${hash} not found on ${p}` });
    continue;
  }
  if (/^https?:\/\//i.test(h)) { l.kind = 'external'; if (!external.has(h)) external.set(h, []); external.get(h).push(l); continue; }
  l.kind = 'other'; issues.push({ ...l, problem: 'Unrecognised link format' });
}
for (const i of images) {
  if (!i.src) { issues.push({ page: i.page, text: '[img]', href: '', problem: 'Image without src' }); continue; }
  if (i.src.startsWith('/') && !i.src.startsWith('//') && !internalExists(i.src)) issues.push({ page: i.page, text: '[img] ' + (i.alt || ''), href: i.src, problem: 'Image file missing' });
  if (i.alt === null) issues.push({ page: i.page, text: '[img]', href: i.src, problem: 'Image missing alt attribute' });
}

writeFileSync(join(OUT, 'links.json'), JSON.stringify(links, null, 1));
writeFileSync(join(OUT, 'images.json'), JSON.stringify(images, null, 1));
writeFileSync(join(OUT, 'buttons.json'), JSON.stringify(buttons, null, 1));
writeFileSync(join(OUT, 'forms.json'), JSON.stringify(forms, null, 1));
writeFileSync(join(OUT, 'issues.json'), JSON.stringify(issues, null, 1));
writeFileSync(join(OUT, 'external.txt'), [...external.keys()].join('\n') + '\n');
const kinds = links.reduce((a, l) => ((a[l.kind] = (a[l.kind] || 0) + 1), a), {});
console.log(JSON.stringify({ pages: pages.length, links: links.length, kinds, uniqueExternal: external.size, images: images.length, buttons: buttons.length, forms: forms.length, issues: issues.length }, null, 1));
