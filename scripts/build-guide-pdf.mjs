// Builds the printable SALT Store Credit guide PDF from guides-src/store-credit-guide.html.
// Run when the guide text changes:  node scripts/build-guide-pdf.mjs
// (Uses Playwright's Chromium, which is available on developer machines; not part of the site build.)
import { createRequire } from 'node:module';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = pathToFileURL(join(root, 'guides-src', 'store-credit-guide.html')).href;
const out = join(root, 'public', 'downloads', 'salt-store-credit-guide.pdf');
const b = await chromium.launch();
const p = await b.newPage();
await p.goto(src, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.pdf({
  path: out, format: 'Letter', printBackground: true, displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate: '<div style="width:100%;font-size:9pt;color:#46546a;text-align:center;font-family:sans-serif">How to Use Your SALT Store Credit · Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
  margin: { top: '0.55in', bottom: '0.7in', left: '0.6in', right: '0.6in' },
});
await b.close();
console.log('wrote', out);
