// Reading pass for the online book reader: "<expiry>.<signature>" for one book, valid 30 days.
// Signed with READER_SECRET, or (if that is not set) the GoHighLevel / webhook secret already
// configured in Vercel, so no extra setup is needed. Shared by /api/register and /api/read.
import { createHmac, timingSafeEqual } from 'node:crypto';

const DAYS = 30;
export const readSecret = () => process.env.READER_SECRET || process.env.GHL_PRIVATE_TOKEN || process.env.SIGNUP_WEBHOOK_URL || '';
const sign = (book, exp) => createHmac('sha256', readSecret()).update(`reader:${book}:${exp}`).digest('base64url');

export function readPass(book) {
  const exp = Math.floor(Date.now() / 1000) + DAYS * 24 * 3600;
  return `${exp}.${sign(book, exp)}`;
}

export function checkPass(book, pass) {
  if (!readSecret() || typeof pass !== 'string') return false;
  const [expStr, sig] = pass.split('.');
  const exp = Number(expStr);
  if (!Number.isInteger(exp) || exp < Date.now() / 1000 || !sig) return false;
  const want = Buffer.from(sign(book, exp)), got = Buffer.from(sig);
  return want.length === got.length && timingSafeEqual(want, got);
}
