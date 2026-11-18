// Wholesale & institutional inquiries from the redesigned /partners/ page (Vercel Function).
//
// Same structure as /api/military-wholesale (the Military Edition form), adapted for the First and
// Second Editions. Uses the site's existing GoHighLevel client and key (api/_lib/ghl.js,
// GHL_PRIVATE_TOKEN). For each inquiry it:
//   1. creates or updates the contact by email (name, email, phone, company, source "Website (partners)");
//   2. adds tags: partner-lead, partner-wholesale-lead, partner-type-<org>, partner-qty-<range>,
//      partner-books-<edition>, and complimentary-copy-request + partner-edition-<edition> if a
//      sample copy is requested (no shared "website" tag, so subscriber automations can't pick it up);
//   3. saves the full inquiry as a note on the contact.
// It does NOT send emails, start workflows or quote prices. The team replies personally.
// Never logs personal details. Without the key it answers 503 and the page shows email/phone.
// The older /api/partner endpoint (previous 3-step form) is left in place, unchanged.
import { ghl, locationId, addTags, addNote, SALT_LOCATION_ID } from './_lib/ghl.js';
import { WHOLESALE_ORG_TYPES, WHOLESALE_QUANTITIES, WHOLESALE_EDITIONS, US_STATES } from './_lib/partner-options.js';

const ALLOWED = [/^https:\/\/(www\.)?seniorandlivingtoday\.com$/, /^https:\/\/[a-z0-9-]+\.vercel\.app$/, /^http:\/\/localhost(:\d+)?$/];
const EMAIL = /^[^\s@<>()[\]\\,;:"]{1,64}@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,24}$/;
const SAMPLE_EDITIONS = { first: 'First Edition (Black & White)', second: 'Second Edition (Full Color)', either: 'Either edition' };

const hits = new Map(); // best-effort per-instance rate limit
function limited(ip) {
  const now = Date.now(), win = 10 * 60 * 1000, max = 5;
  const list = (hits.get(ip) || []).filter((t) => now - t < win);
  list.push(now); hits.set(ip, list);
  return list.length > max;
}
const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u0009\u000b-\u001f<>]/g, '').replace(/[ \t]+/g, ' ').trim().slice(0, max);
const oneLine = (v, max) => clean(v, max).replace(/\s+/g, ' ');

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED.some((r) => r.test(origin))) { res.setHeader('Access-Control-Allow-Origin', origin); res.setHeader('Vary', 'Origin'); }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (origin && !ALLOWED.some((r) => r.test(origin))) return res.status(403).json({ error: 'forbidden' });

  let b = req.body;
  try { if (typeof b === 'string') b = JSON.parse(b); } catch { b = {}; }
  b = b || {};
  if (oneLine(b.fax, 100)) return res.status(200).json({ ok: true }); // hidden field: bots fill it in, people never see it

  const fullName = oneLine(b.fullName, 120);
  const [firstName, ...rest] = fullName.split(' ');
  const lastName = rest.join(' ');
  const organization = oneLine(b.organization, 120);
  const email = oneLine(b.email, 254).toLowerCase();
  const phone = oneLine(b.phone, 30).replace(/[^\d+()\-. ext]/gi, '');
  const orgType = WHOLESALE_ORG_TYPES[b.orgType] ? b.orgType : '';
  const state = US_STATES.includes(b.state) ? b.state : '';
  const country = state === 'Outside the United States' ? oneLine(b.country, 60) : 'United States';
  const quantity = WHOLESALE_QUANTITIES[b.quantity] ? b.quantity : '';
  const books = WHOLESALE_EDITIONS[b.books] ? b.books : '';
  const sample = b.sample === true;
  const sampleEdition = SAMPLE_EDITIONS[b.sampleEdition] ? b.sampleEdition : '';
  const message = clean(b.message, 2000);
  const consent = b.consent === true;
  const utm = oneLine(b.utm, 200).replace(/[^\w=&.\-%+]/g, '');

  const bad = (field, msg) => res.status(400).json({ error: field, message: msg });
  if (!firstName) return bad('fullName', 'Please enter your full name.');
  if (!organization) return bad('organization', 'Please enter your organization or business name.');
  if (!EMAIL.test(email)) return bad('email', 'Please enter a valid business email address.');
  if (!orgType) return bad('orgType', 'Please choose your organization type.');
  if (!state) return bad('state', 'Please choose your state, or “Outside the United States”.');
  if (state === 'Outside the United States' && !country) return bad('country', 'Please enter your country.');
  if (!quantity) return bad('quantity', 'Please choose an estimated quantity.');
  if (sample && !sampleEdition) return bad('sampleEdition', 'Please choose which edition you would like as a sample.');
  if (!consent) return bad('consent', 'Please agree to be contacted about your inquiry.');

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return res.status(429).json({ error: 'busy', message: 'Too many tries in a short time. Please wait a few minutes.' });
  if (!process.env.GHL_PRIVATE_TOKEN) return res.status(503).json({ error: 'not_configured' });

  const tags = [
    'partner-lead', 'partner-wholesale-lead', `partner-type-${orgType}`, `partner-qty-${quantity}`,
    ...(books ? [`partner-books-${books}`] : []),
    ...(sample ? ['complimentary-copy-request', `partner-edition-${sampleEdition}`] : []),
  ];
  const note = [
    `WHOLESALE / INSTITUTIONAL PARTNERSHIP INQUIRY – LIVING LEGACY PLANNER (seniorandlivingtoday.com/partners)`,
    `Submitted: ${new Date().toISOString()}`,
    ``,
    `Name: ${fullName}`,
    `Organization: ${organization}`,
    `Organization type: ${WHOLESALE_ORG_TYPES[orgType]}`,
    `Location: ${state === 'Outside the United States' ? country : `${state}, United States`}`,
    `Email: ${email}`,
    `Phone: ${phone || '—'}`,
    `Estimated quantity: ${WHOLESALE_QUANTITIES[quantity]}`,
    `Editions of interest: ${books ? WHOLESALE_EDITIONS[books] : '—'}`,
    `Complimentary sample requested: ${sample ? `Yes – ${SAMPLE_EDITIONS[sampleEdition]}` : 'No'}`,
    ``,
    ...(utm ? [`Campaign: ${utm}`, ``] : []),
    `Message / partnership interest:`,
    message || '—',
    ``,
    `Next step for the team: reply personally. No pricing or terms were shown or promised on the website.${sample ? ' Confirm sample availability before asking for a shipping address (none was collected).' : ''}`,
  ].join('\n');

  // Diagnostics: one structured line per failed step, never personal details (same approach as the other forms).
  const ref = crypto.randomUUID().slice(0, 8);
  let step = 'contact_upsert', contactSaved = false, tagsSaved = false;
  try {
    const up = await ghl('POST', '/contacts/upsert', {
      locationId: locationId(),
      firstName, ...(lastName ? { lastName } : {}), email,
      ...(phone ? { phone } : {}),
      companyName: organization,
      source: 'Website (partners)',
    });
    const id = up?.contact?.id;
    if (!id) throw Object.assign(new Error('GoHighLevel upsert returned no contact id'), { ghlReason: 'no contact id in response' });
    contactSaved = true;
    step = 'tags';
    await addTags(id, tags);
    tagsSaved = true;
    step = 'note';
    await addNote(id, note);
    return res.status(200).json({ ok: true });
  } catch (e) {
    // A partly saved inquiry is still reported as not sent (502), so the visitor uses email/phone instead.
    const diagnostics = {
      step,
      ghlStatus: e.ghlStatus ?? null,
      reason: e.ghlReason || failureKind(e),
      contactSaved, tagsSaved,
      location: process.env.GHL_LOCATION_ID ? (process.env.GHL_LOCATION_ID === SALT_LOCATION_ID ? 'env (SALT)' : 'env (NOT SALT)') : 'default (SALT)',
    };
    console.error('partner wholesale inquiry save failed:', JSON.stringify({ ref, ...diagnostics }));
    // Preview deployments only (behind Vercel login) also return the sanitized diagnostics.
    return res.status(502).json({ error: 'unavailable', ref, ...(process.env.VERCEL_ENV === 'preview' ? { diagnostics } : {}) });
  }
}

function failureKind(e) {
  if (e?.name === 'TimeoutError' || e?.name === 'AbortError') return 'timeout (no answer within 8s)';
  const code = e?.cause?.code;
  if (code) return `network error (${String(code).replace(/[^\w-]/g, '').slice(0, 30)})`;
  return `${e?.name || 'Error'} without a GoHighLevel response`;
}
