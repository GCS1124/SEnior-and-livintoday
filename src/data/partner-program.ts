// The Senior and Living Today Partner Network (/partners/): all page content in one place.
//
// COMMERCIAL TERMS ARE PENDING. Nothing below states a commission rate, wholesale discount,
// volume price, minimum order or earnings figure. When the owner approves terms, fill in
// `TERMS` (and set `approved: true`) — the page then shows the figures and the illustrative
// earnings calculator. Until then those places read "Shared with approved partners".
//
// Facts used here are verified: book titles, editions, formats and covers (Amazon listings
// checked 2026-11-11), reader reviews (Amazon), Brittney Sherman's Ohio RN license (Ohio Board
// of Nursing lookup, 2026-11-15). The legal entity name is NOT shown until confirmed.
import { SITE, storeLink } from './site';

export interface Terms {
  approved: boolean;
  affiliateCommissionPct: number | null;   // % of each referred sale
  wholesaleDiscountPct: number | null;     // % off retail for resellers
  wholesaleMinimum: number | null;         // copies per order
  institutionalNote: string | null;        // e.g. volume tiers, once approved
  retailPrices: { label: string; price: number }[]; // confirmed list prices for the calculator
  sampleShippingNote: string | null;       // e.g. "We cover shipping within the US", once confirmed
}
export const TERMS: Terms = {
  approved: false,
  affiliateCommissionPct: null,
  wholesaleDiscountPct: null,
  wholesaleMinimum: null,
  institutionalNote: null,
  retailPrices: [],
  sampleShippingNote: null,
};
export const PENDING = 'Shared with approved partners';

// Featured editions (real covers, interior previews and listings).
export const SHOWCASE = [
  {
    key: 'second',
    tab: 'Color Edition',
    title: 'The Living Legacy Planner: Color Edition',
    edition: 'Second Edition · Full Color',
    author: 'Courtney R. Jones',
    cover: '/images/planners/llp-2nd-front.webp',
    coverW: 900, coverH: 1218,
    alt: 'The Living Legacy Planner, Color Edition (2nd Edition), illustrated cover of seniors and a young woman sharing the planner',
    text: 'The Living Legacy Planner, refreshed in full color with warm illustrations throughout. Thoughtful prompts and detailed sections for medical care, funeral arrangements, finances, legacy planning and personal messages to loved ones.',
    formats: ['Paperback', 'Hardcover'],
    buy: SITE.links.livingLegacyPlannerColorAmazon,
    buyLabel: 'View on Amazon',
    page: '/books/living-legacy-planner/#color-edition',
    sample: true,
  },
  {
    key: 'first',
    tab: 'First Edition',
    title: 'The Living Legacy Planner',
    edition: 'First Edition · Black & White',
    author: 'Courtney R. Jones',
    cover: '/images/planners/llp-1st-front.webp',
    coverW: 900, coverH: 1285,
    alt: 'The Living Legacy Planner, First Edition, by Courtney R. Jones: royal blue cover with golden title and a photo of smiling seniors',
    text: 'The original planner: final wishes, bank and insurance details, medications, doctors, key contacts and the memories you want passed down, all in one book, so the people you love never have to guess.',
    formats: ['Hardcover'],
    buy: SITE.links.livingLegacyPlannerAmazon,
    buyLabel: 'View on Amazon',
    page: '/books/living-legacy-planner/',
    sample: true,
  },
  {
    key: 'military',
    tab: 'Military Edition',
    title: 'The Living Legacy Planner: Military Deployment & Family Readiness Edition',
    edition: 'Military Edition',
    author: 'Courtney R. Jones',
    cover: '/images/planners/llp-military-front.webp',
    coverW: 900, coverH: 1261,
    alt: 'The Living Legacy Planner, Military Deployment and Family Readiness Edition: sepia cover with a soldier walking with his family',
    text: 'Written for service members, veterans and their families: everything the people at home need if you’re deployed, moving or suddenly unavailable, organized in 28 sections.',
    formats: ['Paperback', 'Hardcover'],
    buy: storeLink('/products/living-legacy-planner-military-deployment-family-readiness-edition', 'partners'),
    buyLabel: 'View at the SALT Online Store',
    page: '/books/military-edition/',
    sample: false,
  },
];
export const MORE_TITLES = [
  { title: 'Relics of the Century', note: 'A picture book of everyday things from past decades that gets conversations going. A natural fit for reminiscence and activity programs.', cover: '/images/relics-of-the-century.webp', href: '/books/relics-of-the-century/' },
  { title: 'The Daily Bloom', note: 'A daily life-balance guide with reflection prompts and space to track sleep and healthy habits.', cover: '/images/planners/daily-bloom-front.webp', href: '/books/#look-bloom' },
];

export const WHY = [
  { title: 'Original publications', text: 'Every book is written by Courtney R. Jones and published under the Senior and Living Today brand. You’re partnering directly with the source, not a marketplace.' },
  { title: 'Made for the people you serve', text: 'Practical planners and books for older adults, families and caregivers: organizing wishes, records and memories, and starting important conversations.' },
  { title: 'Several ways to participate', text: 'Refer, resell, purchase for your community or give as a meaningful gift. Choose the arrangement that fits your business.' },
  { title: 'Real people behind the brand', text: `More than ${SITE.founder.yearsExperience} years of experience around senior care, and a Registered Nurse Consultant on our team.` },
];

export const AUDIENCES = [
  { icon: '🏡', title: 'Senior living & retirement communities', why: 'A planning resource for residents and families, and Relics of the Century for reminiscence and activity programs.' },
  { icon: '🛋️', title: 'Assisted & independent living', why: 'Residents can fill in their own planner, and families and care teams gain one clear place for important details.' },
  { icon: '🤲', title: 'Home care & caregiver organizations', why: 'Caregivers and families need medical, contact and household information organized and easy to find.' },
  { icon: '⚖️', title: 'Estate planning & financial professionals', why: 'The planner complements the will and the financial plan, a thoughtful resource or gift for clients.' },
  { icon: '🤝', title: 'Senior-focused businesses & service providers', why: 'Add a meaningful product for the older adults and families you already serve.' },
  { icon: '📚', title: 'Bookstores & retailers', why: 'Original, senior-focused titles for your shelves or online store, subject to wholesale terms.' },
  { icon: '🏛️', title: 'Community organizations & nonprofits', why: 'Planning workshops, member resources and community programs for older adults and caregivers.' },
  { icon: '🎁', title: 'Corporate & institutional buyers', why: 'Gifts or resources for employees, customers or members who care for aging loved ones.' },
];

export const MODELS = [
  {
    key: 'affiliate',
    tab: 'Affiliate / Referral',
    title: 'Affiliate & referral partner',
    who: 'Businesses, professionals, creators and organizations that recommend our books to their audience.',
    how: ['You share our books with your clients, members or followers.', 'Each referral is tracked to you (tracking method shared with approved partners).', 'When a referred customer buys, you earn a commission on that sale.'],
    earn: 'Commission on each referred sale',
    rate: () => (TERMS.affiliateCommissionPct != null ? `${TERMS.affiliateCommissionPct}% commission per referred sale` : PENDING),
    you: 'Recommend and share. We handle the product, the order and the delivery.',
  },
  {
    key: 'reseller',
    tab: 'Wholesale / Reseller',
    title: 'Wholesale & reseller partner',
    who: 'Bookstores, gift shops, retailers and businesses that want to stock and sell our books.',
    how: ['You purchase books at an approved wholesale price.', 'You resell them in your store, community or online at the retail price.', 'The difference is your resale margin.'],
    earn: 'Resale margin on every copy you sell',
    rate: () => (TERMS.wholesaleDiscountPct != null ? `${TERMS.wholesaleDiscountPct}% off retail${TERMS.wholesaleMinimum ? `, minimum ${TERMS.wholesaleMinimum} copies` : ''}` : PENDING),
    you: 'Order, stock and sell to your customers.',
  },
  {
    key: 'bulk',
    tab: 'Institutional',
    title: 'Senior living & institutional partner',
    who: 'Senior living communities, facilities, caregiver organizations and other institutions.',
    how: ['Request a complimentary sample to evaluate the book.', 'Purchase multiple copies for residents, clients, families or programs.', 'We’ll discuss quantities, timing and any custom arrangements.'],
    earn: 'Meaningful resources for your community',
    rate: () => TERMS.institutionalNote ?? PENDING,
    you: 'Tell us your community and quantity. We put together options.',
  },
  {
    key: 'corporate',
    tab: 'Corporate / Gifting',
    title: 'Corporate & organizational partner',
    who: 'Companies and organizations giving books to employees, clients, customers or members.',
    how: ['Choose the titles that suit your recipients.', 'Order the quantity you need for an occasion, program or benefit.', 'We’ll discuss delivery and any custom arrangements.'],
    earn: 'A thoughtful gift with lasting value',
    rate: () => TERMS.institutionalNote ?? PENDING,
    you: 'Tell us who the books are for and how many you need.',
  },
];

// FAQ. Answers state only confirmed facts; unconfirmed terms are "shared with approved partners".
export const FAQS = [
  { q: 'Who can become a partner?', a: 'Businesses and organizations that serve or reach older adults, families and caregivers, plus relevant retailers, professionals and institutions. Every application is reviewed, and not every organization will be the right fit.' },
  { q: 'Do I need to operate a senior living business?', a: 'No. Senior living communities are a natural fit, but we also welcome estate planning and financial professionals, home care agencies, retailers, community organizations and companies looking for meaningful gifts.' },
  { q: 'How does the affiliate or referral arrangement work?', a: 'You recommend our books, each referral is tracked to you, and you earn a commission when a referred customer buys. The commission rate and tracking details are shared with approved partners.' },
  { q: 'How does wholesale purchasing work?', a: 'Approved resellers purchase books at a wholesale price and sell them at retail. Wholesale pricing, minimum order and ordering details are shared with approved partners.' },
  { q: 'Can an organization purchase books in bulk?', a: 'Yes. Tell us roughly how many copies you need and who they’re for, and we’ll discuss options for your organization.' },
  { q: 'Can I request a complimentary sample?', a: 'Yes. Qualified prospective partners can request a complimentary printed copy of The Living Legacy Planner. Our team reviews each request and confirms availability and the edition before arranging anything. We’ll ask for a shipping address only after approval.' },
  { q: 'Are different editions available?', a: 'Yes. The Living Legacy Planner comes as the First Edition (black and white), the Color Edition (second edition, full color) and the Military Deployment & Family Readiness Edition.' },
  { q: 'How are orders fulfilled?', a: 'Our books are available on Amazon and through the SALT Online Store today. Fulfillment for partner and bulk orders is arranged with each approved partner.' },
  { q: 'How do partners receive their earnings?', a: 'Payment method and schedule for affiliate commissions are shared with approved partners along with the program terms.' },
  { q: 'What happens after I submit an application?', a: 'Our team reviews your application personally and contacts you by email to talk about next steps. Nothing is automatic, and there’s no obligation.' },
];
