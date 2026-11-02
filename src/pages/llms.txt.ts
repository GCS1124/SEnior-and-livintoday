import { getCollection } from 'astro:content';
import { SITE, SERVICES } from '../data/site';
// llms.txt: a plain-language summary for AI assistants (see llmstxt.org).
export async function GET() {
  const posts = (await getCollection('blog', ({ data }) => !data.draft));
  const body = `# ${SITE.name} (S.A.L.T.)

> ${SITE.description}

Founded by ${SITE.founder.name}, a senior care advocate with ${SITE.founder.yearsExperience}+ years of experience and author of The Living Legacy Planner. Based in ${SITE.address.city}, Ohio; serves seniors and family caregivers nationwide by phone, video and online. S.A.L.T. is a consulting and support resource, not a senior living facility or medical provider.

Contact: ${SITE.phoneDisplay} · ${SITE.email}

## Services
${SERVICES.map((s) => `- [${s.short}](${SITE.url}${s.href}): ${s.summary}`).join('\n')}
- [Caregiver Connection](${SITE.url}/caregiver-connection/): curated daily-living products for seniors.
- [Free community & S.A.L.T. Academy](${SITE.url}/community/): discussions, webinars and courses.

## Books and resources
- [The Living Legacy Planner](${SITE.url}/books/living-legacy-planner/): end-of-life and personal records planner.
- [Relics of the Century](${SITE.url}/books/relics-of-the-century/): nostalgic book about everyday items from past decades.
- [Final arrangements 10-point discussion guide](${SITE.url}/resources/final-arrangements-discussion-guide/)
- [Types of senior living explained](${SITE.url}/guides/types-of-senior-living/)
- [What do I do when…? Practical help](${SITE.url}/help/)
- [Courtney’s videos](${SITE.url}/videos/) and YouTube channel ${SITE.links.youtube}
- [All planners](${SITE.url}/planners/) (printed planners sold on Amazon; fillable e-planners at the SALT Online Store)
- [Find help near me](${SITE.url}/find-help/): doctors, elder law attorneys, Medicare counseling and local senior services by ZIP code
- [Holiday gifts for seniors](${SITE.url}/gifts/) from the SALT Online Store (https://www.saltonlinestore.com)
- [Memory Lane](${SITE.url}/memory-lane/): old newspapers, classic TV and radio
- [Games & online coloring book](${SITE.url}/games/)

## Articles
${posts.map((p) => `- [${p.data.title}](${SITE.url}/blog/${p.id}/): ${p.data.description}`).join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
