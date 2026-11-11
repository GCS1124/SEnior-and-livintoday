// Books & Reading library.
//
// TO ADD A BOOK TO READ ONLINE (no redesign needed):
//   1. Put the cover in public/images/ (e.g. public/images/my-book.webp).
//   2. Write the book text in books/<slug>.md (see the format note at the top of
//      books/final-arrangements-guide.md). Only use text you have the rights to publish.
//   3. Add an entry below with the same slug and `readable: true`.
//   4. Push. The build turns the text into pages for the reader automatically.
// Books with `readable: false` show "Read free online: coming soon" until their text is added.
//
// "Buy This Book" links are verified public pages: the SALT Online Store when the book is
// listed there for shoppers, otherwise Amazon.
import { BOOKS, SITE, storeLink } from './site';

export interface LibraryBook {
  slug: string;
  title: string;
  author: string;
  cover?: string;      // leave out for a simple title cover
  coverAlt?: string;
  overview: string;
  readable: boolean;   // true when books/<slug>.md exists and may be read online
  free?: boolean;      // a free guide (no purchase needed)
  buy?: { url: string; where: 'SALT Online Store' | 'Amazon' };
  preview?: string;    // a free "Look Inside" page preview (for books that aren't read online)
}

const fromBooks = (slug: string) => BOOKS.find((b) => b.slug === slug)!;
const shop = (handle: string) => storeLink(`/products/${handle}`, 'books-library');

export const LIBRARY: LibraryBook[] = [
  {
    slug: 'final-arrangements-guide',
    title: 'Your Final Arrangements: A 10-Point Discussion Guide',
    author: 'Courtney R. Jones',
    overview: 'Ten gentle topics to talk through with the people you love, from who speaks for you to the legacy you want to leave. A short, free read.',
    readable: true,
    free: true,
  },
  {
    slug: 'living-legacy-planner',
    title: fromBooks('living-legacy-planner').title,
    author: 'Courtney R. Jones',
    cover: fromBooks('living-legacy-planner').image,
    coverAlt: fromBooks('living-legacy-planner').alt,
    overview: fromBooks('living-legacy-planner').blurb,
    readable: false,
    preview: '/books/living-legacy-planner/#look-first',
    buy: { url: SITE.links.livingLegacyPlannerAmazon, where: 'Amazon' },
  },
  {
    slug: 'living-legacy-planner-color',
    title: fromBooks('living-legacy-planner-color').title,
    author: 'Courtney R. Jones',
    cover: fromBooks('living-legacy-planner-color').image,
    coverAlt: fromBooks('living-legacy-planner-color').alt,
    overview: fromBooks('living-legacy-planner-color').blurb,
    readable: false,
    preview: '/books/living-legacy-planner/#look-second',
    buy: { url: SITE.links.livingLegacyPlannerColorAmazon, where: 'Amazon' },
  },
  {
    slug: 'military-edition',
    title: fromBooks('military-edition').title,
    author: 'Courtney R. Jones',
    cover: fromBooks('military-edition').image,
    coverAlt: fromBooks('military-edition').alt,
    overview: fromBooks('military-edition').blurb,
    readable: false,
    preview: '/books/military-edition/#look-inside',
    buy: { url: shop('living-legacy-planner-military-deployment-family-readiness-edition'), where: 'SALT Online Store' },
  },
  {
    slug: 'daily-bloom',
    title: fromBooks('daily-bloom').title,
    author: 'Courtney R. Jones',
    cover: fromBooks('daily-bloom').image,
    coverAlt: fromBooks('daily-bloom').alt,
    overview: fromBooks('daily-bloom').blurb,
    readable: false,
    preview: '/books/#look-bloom',
    buy: { url: shop('the-daily-bloom-life-balance-guide'), where: 'SALT Online Store' },
  },
  {
    slug: 'relics-of-the-century',
    title: fromBooks('relics-of-the-century').title,
    author: 'Courtney Ray Jones',
    cover: fromBooks('relics-of-the-century').image,
    coverAlt: fromBooks('relics-of-the-century').alt,
    overview: fromBooks('relics-of-the-century').blurb,
    readable: false,
    buy: { url: shop('relics-of-the-century-book'), where: 'SALT Online Store' },
  },
];
