import { SITE } from '../data/site';
// AI/answer-engine crawlers are explicitly welcome so S.A.L.T. can be cited in AI search results.
export function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /thank-you/

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${SITE.url}/sitemap-index.xml
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
