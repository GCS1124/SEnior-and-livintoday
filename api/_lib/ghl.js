// Small GoHighLevel (LeadConnector API v2) client shared by the sign-up and reward endpoints.
// Needs GHL_PRIVATE_TOKEN (Private Integration token) in Vercel. Never log email addresses.
const GHL_API = process.env.GHL_API_BASE || 'https://services.leadconnectorhq.com'; // override only for local tests
const GHL_VERSION = '2021-07-28';
export const SALT_LOCATION_ID = 'sbVe09zoUWLiPTabYb5A'; // "Senior and living today" sub-account (not a secret)
export const locationId = () => process.env.GHL_LOCATION_ID || SALT_LOCATION_ID;

export async function ghl(method, path, body) {
  const r = await fetch(`${GHL_API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.GHL_PRIVATE_TOKEN}`,
      Version: GHL_VERSION,
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(8000),
  });
  if (!r.ok) throw new Error(`GoHighLevel ${method} ${path.split('/').slice(0, 3).join('/')} ${r.status}`);
  return r.json().catch(() => ({}));
}

/** Create or update the contact by email, then add tags (keeps existing tags). Returns the contact id. */
export async function saveContact({ name, email, source, tags }) {
  // No tags in the upsert: upsert would replace the contact's existing tags.
  const up = await ghl('POST', '/contacts/upsert', { locationId: locationId(), firstName: name, email, source: `Website (${source})` });
  const id = up?.contact?.id;
  if (!id) throw new Error('GoHighLevel upsert returned no contact id');
  if (tags?.length) await addTags(id, tags);
  return id;
}

export const getContact = async (id) => (await ghl('GET', `/contacts/${encodeURIComponent(id)}`))?.contact || null;
export const addTags = (id, tags) => ghl('POST', `/contacts/${encodeURIComponent(id)}/tags`, { tags });
export const removeTags = (id, tags) => ghl('DELETE', `/contacts/${encodeURIComponent(id)}/tags`, { tags });
export const setCustomFields = (id, customFields) => ghl('PUT', `/contacts/${encodeURIComponent(id)}`, { customFields });

// Contact custom fields the reward email uses. Created once by the team in GoHighLevel:
//   "SALT Coupon Code"     (key contact.salt_coupon_code)      required
//   "SALT Coupon Expires"  (key contact.salt_coupon_expires)   optional
let fieldCache = null;
export async function couponFieldIds() {
  if (fieldCache) return fieldCache;
  let code = process.env.GHL_COUPON_FIELD_ID || '', expires = process.env.GHL_COUPON_EXPIRES_FIELD_ID || '';
  if (!code) {
    const j = await ghl('GET', `/locations/${encodeURIComponent(locationId())}/customFields?model=contact`);
    for (const f of j?.customFields || []) {
      const key = String(f.fieldKey || '').toLowerCase();
      if (key === 'contact.salt_coupon_code') code = f.id;
      if (key === 'contact.salt_coupon_expires' && !expires) expires = f.id;
    }
  }
  if (!code) return null;
  fieldCache = { code, expires };
  return fieldCache;
}
