// Visitor sign-up (name + email) for games, reading and downloads — Vercel Function.
//
// This endpoint stores nothing itself. It checks the details and saves them in the
// business's own GoHighLevel account ("Senior and living today"), so no email address
// ever lives in this code, on GitHub, or in the visitor's browser.
//
// Environment variables (Vercel → Project → Settings → Environment Variables):
//   GHL_PRIVATE_TOKEN  GoHighLevel Private Integration token for the Senior and Living Today
//                      sub-account (scopes: contacts.write, contacts.readonly). SECRET: never commit it.
//   GHL_LOCATION_ID    optional; defaults to the Senior and Living Today sub-account id below.
//   SIGNUP_WEBHOOK_URL optional alternative: a GoHighLevel inbound webhook (or other platform) URL.
//   SIGNUP_WEBHOOK_TOKEN optional Bearer token for that webhook.
//
// GoHighLevel result for every visitor: the contact is created or updated by email, then tagged
//   website · <source> · [marketing-opt-in]   on sign-up
//   game-winner · reward-100-coupon      on a win
// On a win, api/_lib/reward.js then creates a unique $100 Shopify code, saves it on the contact
// and adds "reward-code-sent", which starts the GoHighLevel email workflow (see
// docs/WINNER-EMAIL-SETUP.md). Without the Shopify keys the team sends codes by hand as before.
//
// With nothing configured the endpoint answers 503 "not_configured" and the website
// lets the visitor carry on without saving anything (and without promising a reward).

import { readPass } from './_lib/reading-pass.js';
import { saveContact } from './_lib/ghl.js';
import { playToken, checkPlayToken } from './_lib/play-token.js';
import { issueReward } from './_lib/reward.js';

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
  // event: 'signup' (default) or 'game_won' (sent once when a game's real winning condition is met)
  const event = body.event === 'game_won' ? 'game_won' : 'signup';
  const game = clean(body.game, 40);
  const level = clean(body.level, 20);
  const turns = Number.isFinite(Number(body.turns)) ? Math.max(0, Math.min(999, Math.round(Number(body.turns)))) : null;
  const book = /^[a-z0-9-]{1,60}$/.test(String(body.book || '')) ? String(body.book) : '';
  if (!name) return res.status(400).json({ error: 'name', message: 'Please type your first name.' });
  if (!EMAIL.test(email)) return res.status(400).json({ error: 'email', message: 'That email address doesn’t look quite right. Please check it.' });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return res.status(429).json({ error: 'busy', message: 'Too many tries in a short time. Please wait a few minutes.' });

  const tags = ['website', source, ...(marketing ? ['marketing-opt-in'] : []), ...(event === 'game_won' ? ['game-winner', 'reward-100-coupon'] : []), ...(book ? ['reader', `reading-${book}`] : [])];
  const ok = (extra = {}) => res.status(200).json({
    ok: true,
    ...(book ? { readPass: readPass(book) } : {}),
    ...(event === 'signup' ? { playToken: playToken(email) } : {}),
    ...extra,
  });
  const rewardRules = 'Coupon code worth $100 for the SALT Online Store, emailed to the winner. One reward per email address.';

  // Preferred: save straight into GoHighLevel.
  if (process.env.GHL_PRIVATE_TOKEN) {
    try {
      const contactId = await saveContact({ name, email, source, tags });
      if (event !== 'game_won') return ok();
      const check = checkPlayToken(email, body.playToken);
      const reward = await issueReward({ contactId, eligible: check.ok, reason: check.reason });
      return ok({ reward: { status: reward.status } });
    } catch (e) {
      console.error('GoHighLevel save failed:', e.message); // never log the email address
      return res.status(502).json({ error: 'unavailable' });
    }
  }

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
        event,
        ...(book ? { book } : {}),
        signed_up_at: new Date().toISOString(),
        ...(event === 'game_won' ? {
          game, level, turns,
          // The GoHighLevel workflow uses this to send the reward email and to make sure
          // each email address receives the reward only once.
          reward: '$100 coupon code (sent by the team by email)',
          reward_rules: rewardRules,
        } : {}),
        tags,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) throw new Error(`webhook ${r.status}`);
    return ok(event === 'game_won' ? { reward: { status: 'manual' } } : {});
  } catch (e) {
    console.error('signup forward failed:', e.message); // never log the email address
    return res.status(502).json({ error: 'unavailable' });
  }
}
