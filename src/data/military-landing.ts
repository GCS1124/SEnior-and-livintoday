// Military Edition landing page (/military-family-planner/): all content in one place.
//
// Every statement about the book is taken from the actual Military Edition planner (contents page,
// section pages, foreword and back cover). The author's story uses only what Courtney R. Jones wrote
// in the book's foreword. No prices, minimums, discounts or margins are stated anywhere: commercial
// terms are discussed directly with each organization.
import { SITE, storeLink } from './site';

export const MIL_PALETTE_NOTE = 'Colours and background design from the Military Edition cover: ink #46351c, espresso band #382818, sky #e6d7bf / #c4b394, ground #9d7f59, back-cover night #383830, back-cover gold #d3c59e.';

export const MIL_BOOK = {
  title: 'The Living Legacy Planner: Military Deployment & Family Readiness Edition',
  short: 'The Living Legacy Planner – Military Edition',
  author: 'Courtney R. Jones',
  cover: '/images/planners/llp-military-front.webp',
  coverW: 900, coverH: 1261,
  coverAlt: 'Cover of The Living Legacy Planner, Military Deployment and Family Readiness Edition: a service member walking hand in hand with his family at sunrise, under a faded American flag',
  back: '/images/planners/llp-military-back.webp',
  backW: 880, backH: 1280,
  backAlt: 'Back cover of the Military Edition: Prepare today. Protect tomorrow. The book description over a starry mountain landscape',
  formats: ['Paperback', 'Hardcover'],
  buy: [
    { label: 'Buy from the SALT Online Store', url: storeLink('/products/living-legacy-planner-military-deployment-family-readiness-edition', 'military-landing'), primary: true },
    { label: 'Paperback on Amazon', url: SITE.links.militaryPlannerAmazon },
    { label: 'Hardcover on Amazon', url: SITE.links.militaryPlannerHardcoverAmazon },
  ],
};

// The 28 sections, exactly as listed on the book's contents page.
export const MIL_SECTIONS = [
  'Foreword', 'Personal Family Information', 'Service Information', 'Routine Contact List', 'Key Contacts',
  'Family Emergency Plan', 'Medical Information', 'If I Am Temporarily Disabled… Then Who?', 'Deployment Readiness',
  'Military Pay Information', 'Military Benefits', 'Important Military Documents', 'PCS Moving Checklist',
  'Financial Information', 'Monthly Bills List', 'Insurance Policy Inventory', 'Beneficiary Designations',
  'Legal Documents', 'Where Important Items Are Kept', 'Household Management', 'Vehicle Information',
  'Personal Property Assets', 'Digital / Online Assets', 'Business Information', 'Special Memories or Family Traditions',
  'Letters to Loved Ones', 'If I Do Not Return Home', 'Biography',
];
// Sections written specifically for military families (the rest are shared with the original planner).
export const MIL_MILITARY_SECTIONS = ['Service Information', 'Deployment Readiness', 'Military Pay Information', 'Military Benefits', 'Important Military Documents', 'PCS Moving Checklist'];

// Genuine pages from the planner, rendered from the print file and watermarked with the approved
// Senior and Living Today ® seal (35% opacity, centered). Only these samples are published.
const PG = '/images/military-family';
export const MIL_PAGES = [
  { src: `${PG}/page-05.webp`, title: 'Contents', note: 'All 28 sections at a glance.', alt: 'Contents page listing the 28 sections of the Military Edition, from Foreword and Service Information to Letters to Loved Ones and Biography' },
  { src: `${PG}/page-07.webp`, title: 'Foreword', note: 'Courtney’s letter to military families.', alt: 'Foreword page: Prepare Families. Stronger Futures. Courtney R. Jones writes about 23 years as part of a military family' },
  { src: `${PG}/page-15.webp`, title: 'Service Information', note: 'Branch, rank, unit and duty station, with room to update.', alt: 'Service Information page with spaces for branch of service, rank, unit and duty station' },
  { src: `${PG}/page-21.webp`, title: 'Family Emergency Plan', note: 'Emergency contacts and children’s schools.', alt: 'Family Emergency Plan page with six emergency contacts and three children’s schools' },
  { src: `${PG}/page-27.webp`, title: 'If I Am Temporarily Disabled… Then Who?', note: 'Who steps in for bills, children, pets and more.', alt: 'Page titled If I Am Temporarily Disabled, Then Who, asking who should pay bills, care for children and pets, and contact the employer and command' },
  { src: `${PG}/page-29.webp`, title: 'Deployment Readiness', note: 'Deployment date, duty station, FRG and rear detachment contacts.', alt: 'Deployment Readiness page with deployment date, duty station, Family Readiness Group contact and rear detachment contact' },
  { src: `${PG}/page-35.webp`, title: 'Military Benefits', note: 'DEERS, Tricare, VA benefits, FSGLI and Survivor Benefit Plan.', alt: 'Military Benefits page with DEERS enrollment, Tricare plan, VA member number, VA benefits, FSGLI and Survivor Benefit Plan' },
  { src: `${PG}/page-37.webp`, title: 'Important Military Documents', note: 'Where the DD 214, DD 93, SGLI forms and orders are kept.', alt: 'Important Military Documents page listing where to find the DD Form 214, DD Form 93, SGLI election forms, PCS orders and more' },
  { src: `${PG}/page-39.webp`, title: 'PCS Moving Checklist', note: 'A checklist for Permanent Change of Station moves.', alt: 'PCS Moving Checklist page with checkboxes for address change, utilities, school transfers, medical records, vehicle registration and housing inspection' },
  { src: `${PG}/page-69.webp`, title: 'Letters to Loved Ones', note: 'Space to write to the people you love.', alt: 'Letters to Loved Ones page with lined space for a personal letter' },
];

// Why it matters: each theme is tied to sections that really exist in the book.
export const MIL_VALUE = [
  { icon: '🗂️', title: 'Keep family information together', text: 'Personal and family details, routine contacts and key contacts in one book, instead of scattered across phones, cabinets and notebooks.', sections: 'Personal Family Information · Routine Contact List · Key Contacts' },
  { icon: '🤝', title: 'Help the person who steps in', text: 'If someone has to step in, they shouldn’t have to guess the next move. Name who handles the bills, the children, the pets and the paperwork.', sections: 'Family Emergency Plan · If I Am Temporarily Disabled… Then Who?' },
  { icon: '🧭', title: 'Ready for deployments and duty', text: 'Record service details and each upcoming deployment: date, duty station, Family Readiness Group and rear detachment contacts.', sections: 'Service Information · Deployment Readiness' },
  { icon: '📦', title: 'Through every PCS move', text: 'Work through a Permanent Change of Station checklist and note where important military documents are kept, so nothing gets lost in the boxes.', sections: 'PCS Moving Checklist · Important Military Documents' },
  { icon: '🎖️', title: 'Pay, benefits and paperwork', text: 'Military pay records, DEERS, Tricare, VA benefits, SGLI and FSGLI, beneficiaries and legal documents, including for life after service.', sections: 'Military Pay Information · Military Benefits · Beneficiary Designations' },
  { icon: '💌', title: 'Memories that last', text: 'Family traditions, special memories, letters to loved ones and a biography: the parts of your story that deserve to be passed forward.', sections: 'Special Memories or Family Traditions · Letters to Loved Ones · Biography' },
];

export const MIL_AUDIENCES = [
  { icon: '🏠', title: 'Active-duty military families', text: 'For the whole household, not only the service member.' },
  { icon: '💛', title: 'Military spouses', text: 'Often the one holding everything together at home.' },
  { icon: '🇺🇸', title: 'Veterans and retired service members', text: 'Benefits, documents and family details for life after service.' },
  { icon: '👪', title: 'Military parents and caregivers', text: 'For the people who support and stand in for service members.' },
  { icon: '🤲', title: 'Military-connected families', text: 'Anyone whose family life is shaped by military service.' },
  { icon: '🏛️', title: 'Military family support organizations', text: 'Programs and groups that serve military families.' },
  { icon: '🎗️', title: 'Military community groups', text: 'Veteran posts, spouse clubs and community networks.' },
];

export const MIL_PARTNERS = ['Military bookstores', 'Independent bookstores serving military communities', 'Military specialty retailers', 'Wholesale book distributors', 'Military family organizations', 'Veteran-focused organizations', 'Military community support groups', 'Institutional purchasing departments', 'Retail and distribution businesses'];
export const MIL_INTERESTS = ['Bulk book purchases', 'Wholesale purchasing', 'Retail and bookstore partnerships', 'Institutional purchasing', 'Community distribution', 'Military family-focused programs'];

// FAQ: answers use only verified facts; commercial terms are left open for discussion.
export const MIL_FAQS = [
  { q: 'What is the Military Edition of The Living Legacy Planner?', a: 'It is The Living Legacy Planner: Military Deployment & Family Readiness Edition, written by Courtney R. Jones, a military spouse of 23 years, and published by Senior and Living Today. Its 28 sections help families organize personal, service, deployment, medical, financial and household information, and keep special memories, family traditions and letters to loved ones in one place.' },
  { q: 'Who is this edition designed for?', a: 'Enlisted service members, veterans and their families, including military spouses, retired service members, military parents and caregivers. It is written for the whole family, not only the service member.' },
  { q: 'What makes this edition different from the regular edition?', a: 'It adds sections written for military life: Service Information, Deployment Readiness, Military Pay Information, Military Benefits, Important Military Documents and a PCS Moving Checklist, alongside the family, medical, financial and legacy pages.' },
  { q: 'Is it a will or a legal document?', a: 'No. It organizes information and wishes so someone you trust can step in. Wills, powers of attorney and directives should be made with an attorney or your base legal office; the planner has space to note where they are kept.' },
  { q: 'Can military bookstores purchase in bulk?', a: 'Yes. We welcome inquiries from military bookstores and independent bookstores serving military communities. Quantities, pricing and ordering are discussed directly with each store.' },
  { q: 'Are wholesale and institutional partnerships available?', a: 'Yes. We welcome inquiries from wholesale distributors, retailers, military family and veteran organizations, community groups and institutional buyers. Each arrangement is discussed individually.' },
  { q: 'Can organizations discuss larger orders?', a: 'Yes. Tell us roughly how many copies you have in mind and how they will be used, and we’ll talk through the options with you.' },
  { q: 'How can someone preview the inside pages?', a: 'Use the “Preview the inside” section on this page to look through genuine pages from the planner, enlarged and readable on any device.' },
  { q: 'Where can families buy a copy?', a: 'The Military Edition is available in paperback and hardcover from the SALT Online Store and on Amazon.' },
  { q: 'How can an organization contact Senior and Living Today?', a: `Use the wholesale inquiry form on this page, email ${SITE.email}, or call ${SITE.phoneDisplay}. Our team replies personally.` },
];
