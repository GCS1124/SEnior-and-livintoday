// Course-interest form (/courses/: S.A.L.T. Academy, coming soon), Vercel Function.
//
// Records which courses a visitor would like Senior and Living Today to introduce. Uses the site's
// existing GoHighLevel client and key (api/_lib/ghl.js, GHL_PRIVATE_TOKEN): it creates or updates the
// contact by email, adds tags (course-interest, course-<topic> for each topic, course-format-<format>),
// and saves a note with the suggestion. It does NOT send emails, start workflows, or promise launch
// dates or prices. Never logs personal details.
import { ghl, locationId, addTags, addNote, SALT_LOCATION_ID } from './_lib/ghl.js';
import { COURSE_TOPICS, COURSE_FORMATS, COURSE_ROLES } from './_lib/course-options.js';

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

  const fullName = oneLine(b.fullName, 120);
  const [firstName, ...rest] = fullName.split(' ');
  const lastName = rest.join(' ');
  const email = oneLine(b.email, 254).toLowerCase();
  const topics = [...new Set(Array.isArray(b.topics) ? b.topics : [])].filter((t) => COURSE_TOPICS[t]).slice(0, 12);
  const formats = [...new Set(Array.isArray(b.formats) ? b.formats : [])].filter((f) => COURSE_FORMATS[f]).slice(0, 6);
  const role = COURSE_ROLES[b.role] ? b.role : '';
  const idea = clean(b.idea, 1500);
  const consent = b.consent === true;

  const bad = (field, msg) => res.status(400).json({ error: field, message: msg });
  if (!firstName) return bad('fullName', 'Please enter your name.');
  if (!EMAIL.test(email)) return bad('email', 'Please enter a valid email address.');
  if (!topics.length && !idea) return bad('topics', 'Please choose at least one course, or tell us your own idea.');
  if (!consent) return bad('consent', 'Please agree to be contacted about courses.');

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return res.status(429).json({ error: 'busy', message: 'Too many tries in a short time. Please wait a few minutes.' });
  if (!process.env.GHL_PRIVATE_TOKEN) return res.status(503).json({ error: 'not_configured' });

  const tags = ['course-interest', ...topics.map((t) => `course-${t}`), ...formats.map((f) => `course-format-${f}`), ...(idea ? ['course-idea'] : [])];
  const note = [
    `COURSE INTEREST: S.A.L.T. ACADEMY, COMING SOON (seniorandlivingtoday.com/courses)`,
    `Submitted: ${new Date().toISOString()}`,
    ``,
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Learning for: ${role ? COURSE_ROLES[role] : '—'}`,
    ``,
    `Courses they would like:`,
    ...(topics.length ? topics.map((t) => `• ${COURSE_TOPICS[t]}`) : ['—']),
    ``,
    `How they would like to learn: ${formats.length ? formats.map((f) => COURSE_FORMATS[f]).join('; ') : '—'}`,
    ``,
    `Their own course idea:`,
    idea || '—',
    ``,
    `Next step for the team: review the suggestion and reply personally if needed. No launch dates, prices or enrollment were promised on the website.`,
  ].join('\n');

  // Diagnostics: one structured line per failed step, never personal details (same approach as the other forms).
  const ref = crypto.randomUUID().slice(0, 8);
  let step = 'contact_upsert', contactSaved = false, tagsSaved = false;
  try {
    const up = await ghl('POST', '/contacts/upsert', {
      locationId: locationId(),
      firstName, ...(lastName ? { lastName } : {}), email,
      source: 'Website (course interest)',
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
    console.error('course-interest save failed:', JSON.stringify({ ref, ...diagnostics }));
    return res.status(502).json({ error: 'unavailable', ref, ...(process.env.VERCEL_ENV === 'preview' ? { diagnostics } : {}) });
  }
}

function failureKind(e) {
  if (e?.name === 'TimeoutError' || e?.name === 'AbortError') return 'timeout (no answer within 8s)';
  const code = e?.cause?.code;
  if (code) return `network error (${String(code).replace(/[^\w-]/g, '').slice(0, 30)})`;
  return `${e?.name || 'Error'} without a GoHighLevel response`;
}
