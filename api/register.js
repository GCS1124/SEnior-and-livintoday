// Visitor sign-up (name + email) for games, reading and downloads — Vercel Function.
//
// This endpoint does NOT store anything itself. It checks the details and forwards
// them to the business's own email/CRM system through a private webhook, so no
// email address ever lives in this code, on GitHub, or in the visitor's browser.
//
// Environment variables (Vercel → Project → Settings → Environment Variables):
//   SIGNUP_WEBHOOK_URL   (required to save sign-ups) e.g. a GoHighLevel inbound
//                        webhook or another email platform's form endpoint. Secret: never commit it.
//   SIGNUP_WEBHOOK_TOKEN (optional) sent as "Authorization: Bearer <token>" if the platform needs one.
//
// Without SIGNUP_WEBHOOK_URL the endpoint answers 503 "not_configured" and the
// website lets the visitor carry on without saving anything.

const ALLOWED = [/^https:\/\/(www\.)?seniorandlivingtoday\.com$/, /^https:\/\/[a-z0-9-]+\.vercel\.app$/, /^http:\/\/localhost(:\d+)?$/];
const SOURCES = new Set(['memory-match', 'coloring-book', 'games', 'books', 'resources', 'newsletter']);
const EMAIL = /^[^\s@<>()[\]\\,;:"]{1,64}@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,24}$/;

const hits = new Map(); // best-effort per-instance rate limit
function limited(ip) {
  const now = Date.now(), win = 10 * 60 * 1000, max = 8;
  const list = (hits.get(ip) || []).filter((t) => now - t < win);
  list.push(now); hits.set(ip, list);
  return list.length > max;
}
const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u001f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, max);

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED.some((r) => r.test(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (origin && !ALLOWED.some((r) => r.test(origin))) return res.status(403).json({ error: 'forbidden' });

  let body = req.body;
  try { if (typeof body === 'string') body = JSON.parse(body); } catch { body = {}; }
  body = body || {};

  // Hidden "company" field: people never see it, simple bots fill it in.
  if (clean(body.company, 100)) return res.status(200).json({ ok: true });

  const name = clean(body.name, 80);
  const email = clean(body.email, 254).toLowerCase();
  const source = SOURCES.has(body.source) ? body.source : 'games';
  const marketing = body.marketing === true;
  if (!name) return res.status(400).json({ error: 'name', message: 'Please type your first name.' });
  if (!EMAIL.test(email)) return res.status(400).json({ error: 'email', message: 'That email address doesn’t look quite right. Please check it.' });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return res.status(429).json({ error: 'busy', message: 'Too many tries in a short time. Please wait a few minutes.' });

  const hook = process.env.SIGNUP_WEBHOOK_URL;
  if (!hook) return res.status(503).json({ error: 'not_configured' });

  try {
    const r = await fetch(hook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(process.env.SIGNUP_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.SIGNUP_WEBHOOK_TOKEN}` } : {}) },
      body: JSON.stringify({
        first_name: name,
        email,
        source: `website-${source}`,
        marketing_consent: marketing,
        consent_text: marketing ? 'Yes, send me occasional news and offers from Senior and Living Today. I can unsubscribe at any time.' : '',
        signed_up_at: new Date().toISOString(),
        tags: ['website', source, ...(marketing ? ['marketing-opt-in'] : [])],
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) throw new Error(`webhook ${r.status}`);
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('signup forward failed:', e.message); // never log the email address
    return res.status(502).json({ error: 'unavailable' });
  }
}
