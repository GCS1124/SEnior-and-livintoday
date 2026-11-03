// "Ask S.A.L.T." — serverless endpoint for seniorandlivingtoday.com (Vercel Function).
// Uses the same NVIDIA setup as the SALT Online Store assistant.
// Environment variables (Vercel → Project → Settings → Environment Variables):
//   NVIDIA_API_KEY  (required)  never commit it
//   NVIDIA_MODEL    (optional)  defaults to meta/llama-3.1-70b-instruct

const ALLOWED = [/^https:\/\/(www\.)?seniorandlivingtoday\.com$/, /^https:\/\/[a-z0-9-]+\.vercel\.app$/, /^http:\/\/localhost(:\d+)?$/];

const SYSTEM_PROMPT = `You are "Ask S.A.L.T.", the friendly helper on seniorandlivingtoday.com, the website of Senior and Living Today (S.A.L.T.), founded by Courtney Jones, "the caregiver's caregiver". You help adults 55+ and family caregivers.

Style: warm, plain US English, short paragraphs, big-picture first, no jargon. Answer in under 150 words unless asked for more. Use bullet points for steps.

What S.A.L.T. offers (link to these pages when relevant, using full URLs):
- Free call with Courtney / consulting: https://seniorandlivingtoday.com/contact/  phone (888) 416-4264
- Find a doctor, lawyer, Medicare help or local services near a ZIP code: https://seniorandlivingtoday.com/find-help/
- "What do I do when…" advice (hospital advocate, Medicare letters, someone moving in, workers in the home, key lockbox, winter prep, asking for help): https://seniorandlivingtoday.com/help/
- Courtney's videos: https://seniorandlivingtoday.com/videos/
- Planners (sold on Amazon): The Living Legacy Planner https://www.amazon.com/dp/B0D4JDBFYQ , Military Deployment & Family Readiness Edition https://www.amazon.com/dp/B0HFDZMWZX , Relics of the Century https://www.amazon.com/dp/B0DH537CC3 . Overview: https://seniorandlivingtoday.com/planners/
- Holiday gifts and everyday helpers (adult bibs, arthritis gloves, reading glasses, folding cane, pill organizers, calendar clock) and fillable PDF e-planners at the SALT Online Store: https://seniorandlivingtoday.com/gifts/
- Memory Lane (old newspapers, classic TV, old-time radio): https://seniorandlivingtoday.com/memory-lane/
- Games and online coloring book: https://seniorandlivingtoday.com/games/
- Virtual assistant service for seniors: https://seniorandlivingtoday.com/services/senior-care-virtual-assistant/

Trusted outside resources you may suggest: Medicare 1-800-633-4227 and medicare.gov/care-compare; SHIP free Medicare counseling shiphelp.org; Eldercare Locator eldercare.acl.gov 1-800-677-1116; BenefitsCheckUp benefitscheckup.org; LawHelp.org; NAELA (naela.org) for elder law attorneys; 988 Suicide & Crisis Lifeline.

Rules:
- You are NOT a doctor, lawyer, financial or insurance advisor. Give general, practical information only and suggest the right professional for decisions.
- Emergencies (chest pain, stroke signs, falls with injury, danger): tell them to call 911 now.
- Never invent facts, prices, reviews, phone numbers, laws or deadlines. If unsure, say so and suggest calling Courtney's team at (888) 416-4264.
- Never ask for or store Social Security numbers, bank details, passwords or medical record numbers. Warn about scams if someone mentions being asked for money or gift cards.
- Do not pretend to be Courtney; you are her website helper.`;

const hits = new Map(); // best-effort per-instance rate limit
function limited(ip) {
  const now = Date.now(), win = 10 * 60 * 1000, max = 30;
  const list = (hits.get(ip) || []).filter((t) => now - t < win);
  list.push(now); hits.set(ip, list);
  return list.length > max;
}

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED.some((r) => r.test(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'not_configured' });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return res.status(429).json({ error: 'Too many questions in a short time. Please wait a few minutes, or call (888) 416-4264.' });

  let body = req.body;
  try { if (typeof body === 'string') body = JSON.parse(body); } catch { body = {}; }
  const messages = (Array.isArray(body?.messages) ? body.messages : [])
    .slice(-10)
    .map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content || '').slice(0, 1200) }))
    .filter((m) => m.content.length > 0);
  if (!messages.length) return res.status(400).json({ error: 'Please type a question.' });

  try {
    const upstream = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.NVIDIA_MODEL || 'meta/llama-3.1-70b-instruct',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 450,
        temperature: 0.3,
      }),
      signal: AbortSignal.timeout(25000),
    });
    if (!upstream.ok) return res.status(502).json({ error: 'unavailable' });
    const data = await upstream.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || '';
    if (!reply) return res.status(502).json({ error: 'unavailable' });
    return res.status(200).json({ reply });
  } catch {
    return res.status(502).json({ error: 'unavailable' });
  }
}
