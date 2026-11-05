// Turns each books/<slug>.md into api/_books/<slug>.json for the online reader.
// The JSON is read only by the /api/read function (after sign-up); it is never a public file.
//
// Book format:
//   ---            front matter: title, author
//   # Chapter      starts a chapter (listed in the table of contents)
//   ---            on its own line, starts a new page inside the chapter
//   Markdown: ## / ### headings, paragraphs, **bold**, *italic*, - and 1. lists, > quotes, [links](https://...)
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'books');
const OUT = join(root, 'api', '_books');
mkdirSync(OUT, { recursive: true });

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function inline(s) {
  let t = esc(s);
  t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g, (_, txt, url) => `<a href="${url}"${url.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${txt}</a>`);
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
  return t;
}
function blocks(md) {
  const lines = md.split('\n');
  const out = [];
  let para = [], list = null;
  const flushPara = () => { if (para.length) { out.push(`<p>${inline(para.join(' '))}</p>`); para = []; } };
  const flushList = () => { if (list) { out.push(`<${list.type}>${list.items.map((i) => `<li>${inline(i)}</li>`).join('')}</${list.type}>`); list = null; } };
  for (const raw of lines) {
    const line = raw.trimEnd();
    let m;
    if (!line.trim()) { flushPara(); flushList(); continue; }
    if ((m = line.match(/^(#{2,3})\s+(.*)$/))) { flushPara(); flushList(); out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`); continue; }
    if ((m = line.match(/^>\s?(.*)$/))) { flushPara(); flushList(); out.push(`<blockquote><p>${inline(m[1])}</p></blockquote>`); continue; }
    if ((m = line.match(/^[-*]\s+(.*)$/))) { flushPara(); if (!list || list.type !== 'ul') { flushList(); list = { type: 'ul', items: [] }; } list.items.push(m[1]); continue; }
    if ((m = line.match(/^\d+[.)]\s+(.*)$/))) { flushPara(); if (!list || list.type !== 'ol') { flushList(); list = { type: 'ol', items: [] }; } list.items.push(m[1]); continue; }
    flushList(); para.push(line.trim());
  }
  flushPara(); flushList();
  return out.join('\n');
}

const books = existsSync(SRC) ? readdirSync(SRC).filter((f) => f.endsWith('.md')) : [];
for (const file of books) {
  const slug = file.replace(/\.md$/, '');
  let text = readFileSync(join(SRC, file), 'utf8').replace(/\r\n/g, '\n').replace(/<!--[\s\S]*?-->/g, '');
  const meta = {};
  const fm = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (fm) {
    fm[1].split('\n').forEach((l) => { const m = l.match(/^(\w+):\s*"?(.*?)"?\s*$/); if (m) meta[m[1]] = m[2]; });
    text = text.slice(fm[0].length);
  }
  const chapters = [], pages = [];
  const parts = text.split(/^# (.+)$/m); // [before, title1, body1, title2, body2, ...]
  for (let i = 1; i < parts.length; i += 2) {
    const title = parts[i].trim();
    const chunks = parts[i + 1].split(/^---\s*$/m).map((c) => c.trim()).filter(Boolean);
    chapters.push({ title, page: pages.length });
    chunks.forEach((c, j) => pages.push((j === 0 ? `<h2 class="ch">${inline(title)}</h2>\n` : '') + blocks(c)));
  }
  if (!pages.length) throw new Error(`books/${file}: no chapters found (start chapters with "# Title")`);
  writeFileSync(join(OUT, `${slug}.json`), JSON.stringify({ slug, title: meta.title || slug, author: meta.author || '', chapters, pages }) + '\n');
  console.log(`[books] ${slug}: ${chapters.length} chapters, ${pages.length} pages`);
}
