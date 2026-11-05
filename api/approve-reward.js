// Team approval for a held reward — called by a GoHighLevel workflow, never by visitors.
//
// When the team adds the tag "reward-approved" to a winner tagged "reward-needs-approval",
// the workflow "Approve held reward" sends a webhook here. This endpoint then creates the
// $100 Shopify code and saves it on the contact, exactly like an instant reward (but without
// the daily cap), and the normal "send the coupon email" workflow takes over.
//
// Security: the webhook URL must include ?key=<REWARD_APPROVE_SECRET> (or send it in the
// X-Reward-Secret header). Set REWARD_APPROVE_SECRET in Vercel: a long random value. SECRET.
import { timingSafeEqual } from 'node:crypto';
import { getContact } from './_lib/ghl.js';
import { issueReward } from './_lib/reward.js';

const same = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && timingSafeEqual(x, y); };

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const secret = process.env.REWARD_APPROVE_SECRET || '';
  const given = req.headers['x-reward-secret'] || req.query?.key || '';
  if (secret.length < 16 || !given || !same(given, secret)) return res.status(401).json({ error: 'unauthorized' });
  if (!process.env.GHL_PRIVATE_TOKEN) return res.status(503).json({ error: 'not_configured' });

  let body = req.body;
  try { if (typeof body === 'string') body = JSON.parse(body); } catch { body = {}; }
  const contactId = String(body?.contact_id || body?.contactId || body?.contact?.id || '').trim();
  if (!/^[A-Za-z0-9]{6,40}$/.test(contactId)) return res.status(400).json({ error: 'contact_id' });

  try {
    const contact = await getContact(contactId);
    const tags = (contact?.tags || []).map((t) => String(t).toLowerCase());
    if (!tags.includes('game-winner')) return res.status(409).json({ error: 'not_a_winner' });
    const r = await issueReward({ contactId, approved: true });
    return res.status(200).json({ ok: true, status: r.status, ...(r.reason ? { reason: r.reason } : {}) });
  } catch (e) {
    console.error('approve-reward failed:', e.message);
    return res.status(502).json({ error: 'unavailable' });
  }
}
