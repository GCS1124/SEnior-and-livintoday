// Business partnership inquiries from /partners/ (Vercel Function).
//
// Saves each inquiry to the "Senior and living today" GoHighLevel sub-account:
//   1. creates or updates the contact by email (name, email, phone, company, website, source);
//   2. adds tags: partner-lead, plus one tag per request type and interest
//      (complimentary-copy-request, partnership-meeting, book-overview-request,
//      partner-interest-*, partner-edition-*, partner-type-*);
//   3. saves the full inquiry as a note on the contact.
// It does NOT send emails, start workflows, approve requests or arrange shipping. Shipping
// addresses are collected by the team only after a request is approved.
//
// Needs GHL_PRIVATE_TOKEN in Vercel (the same key the rest of the site uses). Without it the
// endpoint answers 503 "not_configured" and the page asks the visitor to email or call.
// Never logs personal details.
import { ghl, locationId, addTags, addNote, SALT_LOCATION_ID } from './_lib/ghl.js';
import { ORG_TYPES, INTERESTS, EDITIONS, AUDIENCE_SIZES, US_STATES } from './_lib/partner-options.js';

const ALLOWED = [/^https:\/\/(www\.)?seniorandlivingtoday\.com$/, /^https:\/\/[a-z0-9-]+\.vercel\.app$/, /^http:\/\/localhost(:\d+)?$/];
const EMAIL = /^[^\s@<>()[\]\\,;:"]{1,64}@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,24}$/;

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

  const firstName = oneLine(b.firstName, 60);
  const lastName = oneLine(b.lastName, 60);
  const email = oneLine(b.email, 254).toLowerCase();
  const phone = oneLine(b.phone, 30).replace(/[^\d+()\-. ext]/gi, '');
  const organization = oneLine(b.organization, 120);
  const role = oneLine(b.role, 80);
  const website = oneLine(b.website, 200);
  const location = oneLine(b.location, 80);
  const state = US_STATES.includes(b.state) ? b.state : '';
  const orgType = ORG_TYPES[b.orgType] ? b.orgType : '';
  const interests = [...new Set((Array.isArray(b.interests) ? b.interests : []).filter((i) => INTERESTS[i]))];
  const edition = EDITIONS[b.edition] ? b.edition : '';
  const quantity = oneLine(b.quantity, 40);
  const message = clean(b.message, 2000);
  const consent = b.consent === true;
  const utm = oneLine(b.utm, 200).replace(/[^\w=&.\-%+]/g, '');
  // Questions that depend on the chosen partnership model (all optional).
  const q = (k, n = 160) => oneLine(b[k], n);
  const answers = [
    ['Affiliate: audience size', AUDIENCE_SIZES[b.audienceSize] || ''],
    ['Affiliate: how they would share', q('channels')],
    ['Wholesale: type of store', q('storeType', 80)],
    ['Wholesale: expected order size', q('orderSize', 60)],
    ['Institutional: people served', q('peopleServed', 60)],
    ['Institutional: copies needed', q('copies', 60)],
    ['Corporate: recipients', q('recipients', 120)],
    ['Corporate: occasion or program', q('occasion', 120)],
  ].filter(([, v]) => v);

  const bad = (field, message) => res.status(400).json({ error: field, message });
  if (!firstName) return bad('firstName', 'Please enter your first name.');
  if (!lastName) return bad('lastName', 'Please enter your last name.');
  if (!EMAIL.test(email)) return bad('email', 'Please enter a valid business email address.');
  if (!organization) return bad('organization', 'Please enter your organization’s name.');
  if (!orgType) return bad('orgType', 'Please choose the type of organization.');
  if (b.requireState === true && !state) return bad('state', 'Please choose your state.');
  if (!interests.length) return bad('interests', 'Please choose at least one way you’d like to work with us.');
  if (interests.includes('complimentary-copy') && !edition) return bad('edition', 'Please choose your preferred edition.');
  if (!consent) return bad('consent', 'Please agree to be contacted about your inquiry.');

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return res.status(429).json({ error: 'busy', message: 'Too many tries in a short time. Please wait a few minutes.' });
  if (!process.env.GHL_PRIVATE_TOKEN) return res.status(503).json({ error: 'not_configured' });

  const requestType = interests.includes('complimentary-copy') ? 'Complimentary copy request' : interests.includes('meeting') ? 'Partnership meeting request' : 'Partnership inquiry';
  const tags = [
    'partner-lead',
    ...(interests.includes('complimentary-copy') ? ['complimentary-copy-request', `partner-edition-${edition}`] : []),
    ...(interests.includes('meeting') ? ['partnership-meeting'] : []),
    ...(interests.includes('overview-pdf') ? ['book-overview-request'] : []),
    ...interests.filter((i) => !['complimentary-copy', 'meeting', 'overview-pdf'].includes(i)).map((i) => `partner-interest-${i}`),
    `partner-type-${orgType}`,
  ];
  const note = [
    `PARTNERSHIP INQUIRY (seniorandlivingtoday.com/partners)`,
    `Request type: ${requestType}`,
    `Submitted: ${new Date().toISOString()}`,
    ``,
    `Name: ${firstName} ${lastName}`,
    `Role / title: ${role || '—'}`,
    `Organization: ${organization}`,
    `Organization type: ${ORG_TYPES[orgType]}`,
    `Website: ${website || '—'}`,
    `State: ${state || '—'}`,
    ...(location ? [`City / area: ${location}`] : []),
    `Email: ${email}`,
    `Phone: ${phone || '—'}`,
    ``,
    `Interested in:`,
    ...interests.map((i) => `  • ${INTERESTS[i]}`),
    ...(edition ? [`Preferred edition: ${EDITIONS[edition]}`] : []),
    ...(quantity ? [`Estimated quantity: ${quantity}`] : []),
    ...(answers.length ? [``, `Details:`, ...answers.map(([k, v]) => `  • ${k}: ${v}`)] : []),
    ``,
    ...(utm ? [`Campaign: ${utm}`, ``] : []),
    `Message:`,
    message || '—',
    ``,
    `Next step for the team: review and approve before contacting about shipping. No shipping address was collected.`,
  ].join('\n');

  // Diagnostics: if a step fails, log ONE structured line saying which step, GoHighLevel's status
  // and a sanitized reason, plus what was already saved. Never names, emails, phones, answers or
  // the token. The visitor only gets a short reference to quote, never the error details.
  const ref = crypto.randomUUID().slice(0, 8);
  let step = 'contact_upsert', contactSaved = false, tagsSaved = false;
  try {
    const up = await ghl('POST', '/contacts/upsert', {
      locationId: locationId(),
      firstName, lastName, email,
      ...(phone ? { phone } : {}),
      companyName: organization,
      ...(website ? { website } : {}),
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
    // A partly saved application is still reported to the visitor as not sent (502), so they use the
    // email/phone fallback; the log says what was saved so the team can finish it by hand.
    const diagnostics = {
      step,                                   // contact_upsert | tags | note
      ghlStatus: e.ghlStatus ?? null,         // GoHighLevel HTTP status, null if no response
      reason: e.ghlReason || failureKind(e),  // sanitized GoHighLevel message, or timeout/network
      contactSaved, tagsSaved,
      location: process.env.GHL_LOCATION_ID ? (process.env.GHL_LOCATION_ID === SALT_LOCATION_ID ? 'env (SALT)' : 'env (NOT SALT)') : 'default (SALT)',
    };
    console.error('partner inquiry save failed:', JSON.stringify({
      ref, ...diagnostics,
      sent: { lastName: !!lastName, phone: !!phone, website: !!website, company: !!organization }, // which optional fields were sent (yes/no only)
    }));
    // Preview deployments only (behind Vercel login): also return the same sanitized diagnostics,
    // so a failed test can be read in the browser's Network tab. Production and local responses
    // stay exactly { error, ref }.
    return res.status(502).json({ error: 'unavailable', ref, ...(isPreview() ? { diagnostics } : {}) });
  }
}

// True only on Vercel Preview deployments (VERCEL_ENV is set by Vercel: production | preview | development).
const isPreview = () => process.env.VERCEL_ENV === 'preview';

// Kind of failure when GoHighLevel never answered. Error class/codes only, no request data.
function failureKind(e) {
  if (e?.name === 'TimeoutError' || e?.name === 'AbortError') return 'timeout (no answer within 8s)';
  const code = e?.cause?.code;
  if (code) return `network error (${String(code).replace(/[^\w-]/g, '').slice(0, 30)})`;
  return `${e?.name || 'Error'} without a GoHighLevel response`;
}
