// "Play token": proof that a player signed up through the website before they won, and when.
// Format "<unix seconds>.<signature>", tied to the email address. Kept only in page memory.
import { createHmac, timingSafeEqual } from 'node:crypto';
import { readSecret } from './reading-pass.js';

const secret = () => process.env.REWARD_SECRET || readSecret();
const sign = (email, ts) => createHmac('sha256', secret()).update(`play:${email}:${ts}`).digest('base64url');

export const playToken = (email) => { const ts = Math.floor(Date.now() / 1000); return `${ts}.${sign(email, ts)}`; };

/** Returns { ok, reason } — ok when the token is genuine, for this email, and old enough to have played. */
export function checkPlayToken(email, token) {
  if (!secret() || typeof token !== 'string') return { ok: false, reason: 'no-token' };
  const [tsStr, sig] = token.split('.');
  const ts = Number(tsStr);
  if (!Number.isInteger(ts) || !sig) return { ok: false, reason: 'bad-token' };
  const want = Buffer.from(sign(email, ts)), got = Buffer.from(sig);
  if (want.length !== got.length || !timingSafeEqual(want, got)) return { ok: false, reason: 'bad-token' };
  const age = Date.now() / 1000 - ts;
  const min = Math.max(0, Number(process.env.REWARD_MIN_PLAY_SECONDS ?? 30));
  if (age < min) return { ok: false, reason: 'too-fast' };
  if (age > 24 * 3600) return { ok: false, reason: 'expired' };
  return { ok: true };
}
