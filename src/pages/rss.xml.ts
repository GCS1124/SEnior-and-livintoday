import { getCollection } from 'astro:content';
import { SITE } from '../data/site';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function GET() {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
  const items = posts.map((p) => {
    const url = `${SITE.url}/blog/${p.id}/`;
    return `<item><title>${esc(p.data.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${p.data.published.toUTCString()}</pubDate><description>${esc(p.data.description)}</description></item>`;
  }).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(SITE.name)} Blog</title><link>${SITE.url}/blog/</link><description>${esc(SITE.description)}</description><language>en-us</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
