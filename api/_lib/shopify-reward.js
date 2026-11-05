// Creates one unique, single-use $100 discount code in the SALT Shopify store.
//
// This is the ONLY thing the website does in Shopify: it never reads or changes products,
// prices, orders or customers. The Shopify app needs just two permissions:
// write_discounts and read_discounts.
//
// Environment variables (Vercel → Settings → Environment Variables):
//   SHOPIFY_STORE_DOMAIN    e.g. 0309d3-72.myshopify.com (not a secret)
//   SHOPIFY_CLIENT_ID       } from the app in the Shopify Dev Dashboard   (SECRET: never commit)
//   SHOPIFY_CLIENT_SECRET   }
//   or SHOPIFY_ADMIN_TOKEN  an older admin-created custom app token (shpat_…), if you have one
//   REWARD_CODE_DAYS        optional, days the code stays valid (default 90)
import { randomInt } from 'node:crypto';

const API_VERSION = '2026-10';
export const REWARD_TAG = 'salt-game-reward';
const shop = () => String(process.env.SHOPIFY_STORE_DOMAIN || '').replace(/^https?:\/\//, '').replace(/\/.*$/, '');
const base = () => process.env.SHOPIFY_API_BASE || `https://${shop()}`; // override only for local tests

export const shopifyConfigured = () =>
  !!shop() && !!(process.env.SHOPIFY_ADMIN_TOKEN || (process.env.SHOPIFY_CLIENT_ID && process.env.SHOPIFY_CLIENT_SECRET));

let cached = { token: '', until: 0 };
async function accessToken() {
  if (process.env.SHOPIFY_ADMIN_TOKEN) return process.env.SHOPIFY_ADMIN_TOKEN;
  if (cached.token && Date.now() < cached.until) return cached.token;
  // Client credentials grant (apps made in the Dev Dashboard, installed on the store). Token lasts 24 h.
  const r = await fetch(`${base()}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body: new URLSearchParams({ grant_type: 'client_credentials', client_id: process.env.SHOPIFY_CLIENT_ID, client_secret: process.env.SHOPIFY_CLIENT_SECRET }),
    signal: AbortSignal.timeout(8000),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.access_token) throw new Error(`Shopify token ${r.status}`);
  cached = { token: j.access_token, until: Date.now() + Math.max(60, (Number(j.expires_in) || 86399) - 600) * 1000 };
  return cached.token;
}

async function admin(query, variables) {
  const r = await fetch(`${base()}/admin/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Shopify-Access-Token': await accessToken() },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(10000),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.errors) throw new Error(`Shopify admin ${r.status}${j.errors ? ' ' + JSON.stringify(j.errors).slice(0, 200) : ''}`);
  return j.data;
}

/** How many reward codes were created in the last 24 hours (for the daily safety cap). */
export async function rewardsInLast24h() {
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString().replace(/\.\d+Z$/, 'Z');
  const d = await admin('query Count($q: String!) { discountNodesCount(query: $q, limit: 1000) { count } }',
    { q: `tag:${REWARD_TAG} AND created_at:>'${since}'` });
  return Number(d?.discountNodesCount?.count) || 0;
}

const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no 0/O, 1/I/L: easier to read and type
export const newCode = () => 'SALT100-' + Array.from({ length: 8 }, () => ALPHABET[randomInt(ALPHABET.length)]).join('');

/** Create a single-use $100-off code for the whole order. Returns { code, endsAt }. */
export async function createRewardCode() {
  const days = Math.max(1, Math.min(365, Number(process.env.REWARD_CODE_DAYS) || 90));
  const startsAt = new Date();
  const endsAt = new Date(startsAt.getTime() + days * 24 * 3600 * 1000);
  for (let attempt = 0; attempt < 3; attempt++) {
    const code = newCode();
    const d = await admin(`mutation Create($d: DiscountCodeBasicInput!) {
      discountCodeBasicCreate(basicCodeDiscount: $d) { codeDiscountNode { id } userErrors { field code message } }
    }`, {
      d: {
        title: `SALT game reward $100 (${code})`,
        code,
        startsAt: startsAt.toISOString(),
        endsAt: endsAt.toISOString(),
        context: { all: 'ALL' },
        customerGets: { value: { discountAmount: { amount: '100.00', appliesOnEachItem: false } }, items: { all: true } },
        usageLimit: 1,
        appliesOncePerCustomer: true,
        combinesWith: { orderDiscounts: false, productDiscounts: false, shippingDiscounts: false },
        tags: [REWARD_TAG],
      },
    });
    const res = d?.discountCodeBasicCreate;
    if (res?.codeDiscountNode?.id) return { code, endsAt };
    const errs = res?.userErrors || [];
    if (!errs.some((e) => /taken|exist|unique/i.test(e.message || ''))) throw new Error(`Shopify discount: ${JSON.stringify(errs).slice(0, 200)}`);
  }
  throw new Error('Shopify discount: could not find a free code');
}
