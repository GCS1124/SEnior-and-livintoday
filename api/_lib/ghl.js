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
  if (!r.ok) {
    // Same message as before (other endpoints log it). The extra properties are for callers that
    // want to report why GoHighLevel refused; ghlReason is sanitized (see sanitizeReason).
    const err = new Error(`GoHighLevel ${method} ${path.split('/').slice(0, 3).join('/')} ${r.status}`);
    err.ghlStatus = r.status;
    err.ghlReason = sanitizeReason(await r.text().catch(() => ''));
    throw err;
  }
  return r.json().catch(() => ({}));
}

/**
 * GoHighLevel's error text, safe to log: only its message/error fields, with anything that could
 * be personal data removed (emails, phone-like numbers, quoted values, URLs, long ids), max 200 chars.
 */
export function sanitizeReason(text) {
  let msg = '';
  try {
    const j = JSON.parse(text);
    const m = j?.message ?? j?.error ?? j?.msg ?? '';
    msg = Array.isArray(m) ? m.join('; ') : typeof m === 'string' ? m : JSON.stringify(m);
  } catch { msg = String(text || ''); }
  return msg
    .replace(/<[^>]*>/g, ' ')
    .replace(/[^\s@]+@[^\s@]+/g, '[email]')
    .replace(/https?:\/\/\S+|www\.\S+/gi, '[url]')
    // bare domains (e.g. a website someone typed), but keep GoHighLevel scope names such as contacts.write
    .replace(/\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,24}\b/gi, (d) => (/^(contacts|locations|conversations|opportunities|calendars|users|workflows|campaigns|businesses|objects|associations)\.[a-z/.-]+$/i.test(d) ? d : '[domain]'))
    .replace(/(["'“‘])[^"'”’]*["'”’]/g, '[value]')
    .replace(/\+?\d[\d\s().-]{5,}\d/g, '[number]')
    .replace(/\b(?=[A-Za-z0-9]*\d)(?=[A-Za-z0-9]*[A-Za-z])[A-Za-z0-9]{12,}\b/g, '[id]')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 200) || 'no reason given';
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
/** Save free text on the contact's Notes tab (visible only inside GoHighLevel). */
export const addNote = (id, body) => ghl('POST', `/contacts/${encodeURIComponent(id)}/notes`, { body });

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
