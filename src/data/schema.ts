// Helpers that build JSON-LD nodes. They are merged into the site-wide @graph in Base.astro.
import { SITE } from './site';

const ORG = { '@id': `${SITE.url}/#organization` };
const PERSON = { '@id': `${SITE.url}/#courtney-jones` };

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function serviceSchema(opts: { name: string; description: string; path: string; serviceType: string }) {
  return {
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: new URL(opts.path, SITE.url).href,
    provider: ORG,
    areaServed: { '@type': 'Country', name: 'United States' },
    audience: { '@type': 'Audience', audienceType: 'Seniors, older adults and family caregivers' },
  };
}

export function bookSchema(opts: { name: string; description: string; path: string; amazonUrl: string; image?: string }) {
  return {
    '@type': 'Book',
    name: opts.name,
    description: opts.description,
    url: new URL(opts.path, SITE.url).href,
    author: PERSON,
    publisher: ORG,
    inLanguage: 'en-US',
    ...(opts.image ? { image: new URL(opts.image, SITE.url).href } : {}),
    sameAs: opts.amazonUrl,
  };
}

export function articleSchema(opts: {
  title: string; description: string; path: string; published: Date; updated?: Date; image?: string;
}) {
  return {
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    url: new URL(opts.path, SITE.url).href,
    mainEntityOfPage: new URL(opts.path, SITE.url).href,
    datePublished: opts.published.toISOString(),
    dateModified: (opts.updated ?? opts.published).toISOString(),
    author: PERSON,
    publisher: ORG,
    inLanguage: 'en-US',
    image: new URL(opts.image ?? '/og-default.png', SITE.url).href,
  };
}
