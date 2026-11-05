// Online book reader — Vercel Function.
// GET /api/read?book=<slug>  with header  X-Reading-Pass: <pass from /api/register>
// Returns the book's pages only to visitors who signed up (valid, unexpired pass for that book).
// Book files live in api/_books/*.json (built from books/*.md); they are never public downloads.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkPass } from './_lib/reading-pass.js';

// Book files sit next to this function (bundled via vercel.json "includeFiles"); fall back to the project root.
const HERE = join(fileURLToPath(new URL('.', import.meta.url)), '_books');
const DIR = existsSync(HERE) ? HERE : join(process.cwd(), 'api', '_books');

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('X-Robots-Tag', 'noindex');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const book = String(req.query?.book || '');
  if (!/^[a-z0-9-]{1,60}$/.test(book)) return res.status(400).json({ error: 'book' });
  const file = join(DIR, `${book}.json`);
  if (!existsSync(file)) return res.status(404).json({ error: 'not_found' });

  const pass = String(req.headers['x-reading-pass'] || '');
  if (!checkPass(book, pass)) return res.status(401).json({ error: 'signup_required' });

  try {
    return res.status(200).json(JSON.parse(readFileSync(file, 'utf8')));
  } catch (e) {
    console.error('reader failed:', e.message);
    return res.status(500).json({ error: 'unavailable' });
  }
}
