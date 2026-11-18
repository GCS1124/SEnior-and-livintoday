// Partners landing page (/partners/): content for the standalone wholesale page for the First and
// Second Editions of The Living Legacy Planner. Same structure as the Military Edition page
// (/team-up-with-us/), in the original blue-and-yellow branding.
//
// Facts used here are verified: titles, editions, formats, covers and section lists come from the
// books and their Amazon listings (see src/data/planners.ts and src/data/partner-program.ts).
// No prices, minimums, discounts, margins or commissions are stated: commercial terms are
// discussed directly with each organization. Book dimensions are not shown (owner's request).
import { SITE } from './site';
import { edition, type Edition } from './planners';
import { SHOWCASE } from './partner-program';

// Colours sampled from the covers: 1st Edition royal blue #0604a9 + gold #faca0a; 2nd Edition
// indigo #1c1a81 + yellow #fde005; with the site's navy #223a66 / #14213d, yellow #ffb400, cream #fff5d6.

const first = SHOWCASE.find((b) => b.key === 'first')!;
const second = SHOWCASE.find((b) => b.key === 'second')!;

// The two editions, for the book presentation section.
export const P_BOOKS = [
  {
    key: 'first', name: 'First Edition', tag: 'First Edition · Black & White', title: first.title,
    cover: first.cover, coverW: first.coverW, coverH: first.coverH, alt: first.alt, text: first.text,
    formats: first.formats, amazon: first.buy, preview: '#read-first',
  },
  {
    key: 'second', name: 'Second Edition', tag: 'Second Edition · Full Color', title: second.title,
    cover: second.cover, coverW: second.coverW, coverH: second.coverH, alt: second.alt, text: second.text,
    formats: second.formats, amazon: second.buy, preview: '#read-second',
  },
];

// Book readers: the site's existing edition data (genuine pages from each book, front cover first),
// with the end-page buttons pointing to the wholesale form first and Amazon second.
const forPartners = (key: 'first' | 'second'): Edition => {
  const e = edition(key);
  const amazon = e.buy[0];
  return { ...e, buy: [{ url: '#inquiry', label: 'Discuss a Wholesale Partnership', primary: true }, { url: amazon.url, label: key === 'first' ? 'First Edition on Amazon' : 'Second Edition on Amazon' }] };
};
export const P_READER_FIRST = forPartners('first');
export const P_READER_SECOND = forPartners('second');

// Why organizations offer the planner (each point is supported by the book or the business facts).
export const P_VALUE = [
  { icon: '📒', title: 'Everything in one place', text: 'Final wishes, medical details, key contacts, finances, insurance and important documents, gathered in one book so families never have to guess.', sections: 'Temporary Instructions · Medical Information · Key Contacts · Financial Information' },
  { icon: '🤝', title: 'A natural fit for the people you serve', text: 'Older adults, families and caregivers all benefit from a calm, organized place for the details that matter.', sections: 'Personal Information · Insurance Information · Important Documents' },
  { icon: '💬', title: 'It starts important conversations', text: 'A guided discussion on final arrangements helps families talk about wishes before they are needed.', sections: 'Your Final Arrangement: 10 Point Discussion Guide' },
  { icon: '💛', title: 'Memories and messages that last', text: 'Space for personal reflections and messages to loved ones turns the planner into a keepsake as well as a practical tool.', sections: 'In the Event that I Have Passed · Final Arrangements Note' },
  { icon: '📚', title: 'Two editions, one purpose', text: 'The original First Edition in black and white, and the Second Edition refreshed in full color with warm illustrations.', sections: 'First Edition: hardcover · Second Edition: paperback and hardcover' },
  { icon: '🏷️', title: 'Straight from the publisher', text: 'Original publications by Courtney R. Jones, published by Senior and Living Today. You work directly with the source.', sections: 'Published by Senior and Living Today' },
];

// People the planner is for.
export const P_AUDIENCES = [
  { title: 'Seniors planning ahead', text: 'Wishes, health details and records, written down while they can be shared calmly.' },
  { title: 'Adult children and families', text: 'One place to find what they need, instead of guessing at a difficult time.' },
  { title: 'Caregivers', text: 'Temporary instructions, medical information and contacts at hand.' },
  { title: 'Residents and members', text: 'A meaningful resource for senior living communities and member organizations.' },
  { title: 'Every generation', text: 'Memories and messages that families can keep and pass forward.' },
];

// Wholesale section.
export const P_PARTNERS = ['Bookstores', 'Independent retailers', 'Wholesale distributors', 'Senior living organizations', 'Senior care providers', 'Community organizations', 'Institutional buyers', 'Relevant business partners'];
export const P_INTERESTS = ['Bulk book purchases', 'Wholesale purchasing', 'Retail and bookstore partnerships', 'Retail distribution', 'Institutional purchasing', 'Programs for seniors, families and caregivers'];

// FAQ: answers use only verified facts; commercial terms are left open for discussion.
export const P_FAQS = [
  { q: 'What is The Living Legacy Planner?', a: 'An original planner by Courtney R. Jones, published by Senior and Living Today, that helps seniors and their families organize final wishes, medical details, key contacts, finances, insurance, important documents and personal messages in one book.' },
  { q: 'What is the difference between the First and Second Editions?', a: 'The First Edition is the original planner in black and white, in hardcover. The Second Edition is the same caring planner refreshed in full color with warm illustrations, in paperback and hardcover.' },
  { q: 'Who are these planners for?', a: 'Older adults planning ahead, their families and caregivers, and the organizations that serve them: senior living communities, senior care providers, community organizations and more.' },
  { q: 'Can bookstores and retailers purchase in bulk?', a: 'Yes. We welcome inquiries from bookstores, independent retailers and distributors. Quantities, pricing and ordering are discussed directly with each organization.' },
  { q: 'Are wholesale and institutional partnerships available?', a: 'Yes. We welcome inquiries from wholesale distributors, senior living organizations, senior care providers, community organizations, institutional buyers and relevant business partners. Each arrangement is discussed individually.' },
  { q: 'Can organizations discuss larger orders?', a: 'Yes. Tell us roughly how many copies you have in mind and how they will be used, and we’ll talk through the options with you.' },
  { q: 'Can we see the book before ordering?', a: 'Yes. Read genuine pages from both editions on this page, and you can request a complimentary sample copy in the inquiry form. Our team reviews each request and confirms availability before arranging anything.' },
  { q: 'Is it a will or a legal document?', a: 'No. It organizes information and wishes so the people you trust know what to do. Wills, powers of attorney and directives should be made with an attorney; the planner has space to note where they are kept.' },
  { q: 'Can individuals buy a copy?', a: 'Yes. Both editions are available on Amazon.' },
  { q: 'How can an organization contact Senior and Living Today?', a: `Use the wholesale inquiry form on this page, email ${SITE.email}, or call ${SITE.phoneDisplay}. Our team replies personally.` },
];
