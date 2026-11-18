// "Work With Us" interest form (/work-with-us/), Vercel Function.
//
// Saves affiliate, 1099 independent contractor and "other" inquiries. Wholesale, institutional and
// Military Edition inquiries go to the existing landing-page forms (/partners/ and /team-up-with-us/)
// and are rejected here, so each kind of inquiry has one home.
// Uses the site's existing GoHighLevel client and key (api/_lib/ghl.js, GHL_PRIVATE_TOKEN). For each
// inquiry it creates or updates the contact by email, adds tags (work-with-us-lead, wwu-<type>, and
// wwu-channel-<x> / wwu-service-<x> when given; no shared "website" tag), and saves a note.
// It does NOT send emails, start workflows, or promise terms, work or earnings. Never logs personal details.
import { ghl, locationId, addTags, addNote, SALT_LOCATION_ID } from './_lib/ghl.js';
import { WWU_TYPES, WWU_SAVED, WWU_CHANNELS, WWU_SERVICES, US_STATES } from './_lib/work-with-us-options.js';

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

  const type = WWU_TYPES[b.type] ? b.type : '';
  const fullName = oneLine(b.fullName, 120);
  const [firstName, ...rest] = fullName.split(' ');
  const lastName = rest.join(' ');
  const email = oneLine(b.email, 254).toLowerCase();
  const phone = oneLine(b.phone, 30).replace(/[^\d+()\-. ext]/gi, '');
  const organization = oneLine(b.organization, 120);
  const link = oneLine(b.link, 200);
  const state = US_STATES.includes(b.state) ? b.state : '';
  const country = state === 'Outside the United States' ? oneLine(b.country, 60) : 'United States';
  const channel = type === 'affiliate' && WWU_CHANNELS[b.channel] ? b.channel : '';
  const service = type === 'contractor' && WWU_SERVICES[b.service] ? b.service : '';
  const message = clean(b.message, 2000);
  const consent = b.consent === true;
  const utm = oneLine(b.utm, 200).replace(/[^\w=&.\-%+]/g, '');

  const bad = (field, msg, extra = {}) => res.status(400).json({ error: field, message: msg, ...extra });
  if (!type) return bad('type', 'Please choose how you would like to work with us.');
  if (!WWU_SAVED.includes(type)) return bad('type', 'Please use the partnership form on the page for this opportunity.', { route: WWU_TYPES[type].route });
  if (!firstName) return bad('fullName', 'Please enter your full name.');
  if (!EMAIL.test(email)) return bad('email', 'Please enter a valid email address.');
  if (!state) return bad('state', 'Please choose your state, or “Outside the United States”.');
  if (state === 'Outside the United States' && !country) return bad('country', 'Please enter your country.');
  if (!consent) return bad('consent', 'Please agree to be contacted about your inquiry.');

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return res.status(429).json({ error: 'busy', message: 'Too many tries in a short time. Please wait a few minutes.' });
  if (!process.env.GHL_PRIVATE_TOKEN) return res.status(503).json({ error: 'not_configured' });

  const tags = ['work-with-us-lead', `wwu-${type}`, ...(channel ? [`wwu-channel-${channel}`] : []), ...(service ? [`wwu-service-${service}`] : [])];
  const note = [
    `WORK WITH US INQUIRY: ${WWU_TYPES[type].label.toUpperCase()} (seniorandlivingtoday.com/work-with-us)`,
    `Submitted: ${new Date().toISOString()}`,
    ``,
    `Name: ${fullName}`,
    `Organization / business: ${organization || '—'}`,
    `Website or social profile: ${link || '—'}`,
    `Location: ${state === 'Outside the United States' ? country : `${state}, United States`}`,
    `Email: ${email}`,
    `Phone: ${phone || '—'}`,
    ...(type === 'affiliate' ? [`Would share our products through: ${channel ? WWU_CHANNELS[channel] : '—'}`] : []),
    ...(type === 'contractor' ? [`Area of interest: ${service ? WWU_SERVICES[service] : '—'}`] : []),
    ``,
    ...(utm ? [`Campaign: ${utm}`, ``] : []),
    `Message:`,
    message || '—',
    ``,
    type === 'contractor'
      ? `Next step for the team: reply personally. 1099 independent contractor interest only: no employment, work, earnings or benefits were promised on the website.`
      : `Next step for the team: reply personally. No affiliate terms, rates or earnings were shown or promised on the website.`,
  ].join('\n');

  // Diagnostics: one structured line per failed step, never personal details (same approach as the other forms).
  const ref = crypto.randomUUID().slice(0, 8);
  let step = 'contact_upsert', contactSaved = false, tagsSaved = false;
  try {
    const up = await ghl('POST', '/contacts/upsert', {
      locationId: locationId(),
      firstName, ...(lastName ? { lastName } : {}), email,
      ...(phone ? { phone } : {}),
      ...(organization ? { companyName: organization } : {}),
      source: 'Website (work with us)',
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
    const diagnostics = {
      step, ghlStatus: e.ghlStatus ?? null, reason: e.ghlReason || failureKind(e), contactSaved, tagsSaved,
      location: process.env.GHL_LOCATION_ID ? (process.env.GHL_LOCATION_ID === SALT_LOCATION_ID ? 'env (SALT)' : 'env (NOT SALT)') : 'default (SALT)',
    };
    console.error('work-with-us inquiry save failed:', JSON.stringify({ ref, ...diagnostics }));
    return res.status(502).json({ error: 'unavailable', ref, ...(process.env.VERCEL_ENV === 'preview' ? { diagnostics } : {}) });
  }
}

function failureKind(e) {
  if (e?.name === 'TimeoutError' || e?.name === 'AbortError') return 'timeout (no answer within 8s)';
  const code = e?.cause?.code;
  if (code) return `network error (${String(code).replace(/[^\w-]/g, '').slice(0, 30)})`;
  return `${e?.name || 'Error'} without a GoHighLevel response`;
}
