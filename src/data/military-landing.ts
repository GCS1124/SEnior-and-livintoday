// Military Edition landing page (/military-family-planner/): all content in one place.
//
// Every statement about the book is taken from the actual Military Edition planner (contents page,
// section pages, foreword and back cover). The author's story uses only what Courtney R. Jones wrote
// in the book's foreword. No prices, minimums, discounts or margins are stated anywhere: commercial
// terms are discussed directly with each organization.
import { SITE } from './site';
import { edition, type Edition } from './planners';

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
  // Verified Amazon listing for this edition (paperback; the listing also offers the hardcover, B0HG7YS5JP).
  amazon: { label: 'Get Your Copy on Amazon', url: SITE.links.militaryPlannerAmazon },
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

// Book reader: genuine pages from the planner, in book order, rendered from the print file and
// watermarked with the approved Senior and Living Today ® seal (35% opacity, centered).
// Only these sample pages are published, never the full PDF.
const PG = '/images/military-family';
const FW_TEXT = Object.fromEntries((edition('military').pages ?? []).filter((p) => p.text).map((p) => [p.src.slice(-7, -5), p.text!])); // large-print text the site already has for the foreword
const pg = (n: string, label: string, alt: string) => ({ src: `${PG}/page-${n}.webp`, w: 1000, h: 1305, label, alt, ...(FW_TEXT[n] ? { text: FW_TEXT[n] } : {}) });
const OPEN = ['Foreword', 'Personal Family Information', 'Service Information', 'Family Emergency Plan', 'If I Am Temporarily Disabled… Then Who?', 'Deployment Readiness', 'Military Pay Information', 'Military Benefits', 'Important Military Documents', 'PCS Moving Checklist', 'Special Memories or Family Traditions', 'Letters to Loved Ones'];
export const MIL_READER: Edition = {
  key: 'milpreview',
  name: 'Military Edition',
  title: 'The Living Legacy Planner: Military Deployment & Family Readiness Edition',
  chip: 'Military Edition · Sample pages',
  who: 'For service members, veterans and their families.',
  cover: '/images/planners/llp-military-front.webp',
  coverAlt: 'The Living Legacy Planner, Military Deployment and Family Readiness Edition',
  page: '/military-family-planner/',
  pages: [
    { src: '/images/planners/llp-military-front.webp', w: 900, h: 1261, label: 'Front cover', alt: 'Front cover: The Living Legacy Planner, Military Deployment and Family Readiness Edition. Protect your family, preserve what matters, prepare with confidence, leave a legacy of love.' },
    pg('05', 'Contents', 'Contents page listing the 28 sections of the Military Edition, from Foreword and Service Information to Letters to Loved Ones and Biography'),
    pg('07', 'Foreword', 'Foreword: Prepare Families. Stronger Futures. Courtney R. Jones writes about 23 years as part of a military family'),
    pg('08', 'Foreword (continued)', 'Foreword continued: why the planner was created for military members and their families'),
    pg('09', 'Foreword (continued)', 'Foreword continued, signed Courtney R. Jones, Military Spouse 1984 to 2007'),
    pg('13', 'Personal Family Information', 'Personal Family Information page with spaces for names, birth details, phones, address, spouse and children'),
    pg('15', 'Service Information', 'Service Information page with spaces for branch of service, rank, unit and duty station'),
    pg('16', 'Service Information (continued)', 'Service Information continued: military ID number, dates of enlistment and retirement eligibility, chain of command and command contacts'),
    pg('21', 'Family Emergency Plan', 'Family Emergency Plan page with six emergency contacts and three children’s schools'),
    pg('22', 'Family Emergency Plan (continued)', 'Family Emergency Plan continued: daycare, authorized pickup people, babysitters, pet care and boarding'),
    pg('27', 'If I Am Temporarily Disabled… Then Who?', 'Page asking who should pay the bills, care for children and pets, and contact the employer and command if you are temporarily unable to'),
    pg('29', 'Deployment Readiness', 'Deployment Readiness page with deployment date, duty station, Family Readiness Group contact and rear detachment contact'),
    pg('33', 'Military Pay Information', 'Military Pay Information page with BAS, BAH, deployment pay, special duty pay, LES details and direct deposit'),
    pg('35', 'Military Benefits', 'Military Benefits page with DEERS enrollment, Tricare plan, VA member number, VA benefits, FSGLI and Survivor Benefit Plan'),
    pg('36', 'Military Benefits (continued)', 'Military Benefits continued: G.I. Bill information and education benefits'),
    pg('37', 'Important Military Documents', 'Important Military Documents page listing where to find the DD Form 214, DD Form 93, SGLI election forms, PCS orders and more'),
    pg('39', 'PCS Moving Checklist', 'PCS Moving Checklist page with checkboxes for address change, utilities, school transfers, medical records, vehicle registration and housing inspection'),
    pg('67', 'Special Memories or Family Traditions', 'Special Memories or Family Traditions page with lined space to record the moments and traditions that matter'),
    pg('69', 'Letters to Loved Ones', 'Letters to Loved Ones page with lined space for a personal letter'),
    { src: '/images/planners/llp-military-back.webp', w: 880, h: 1280, label: 'Back cover', alt: 'Back cover: Prepare today. Protect tomorrow. The book description over a starry mountain landscape' },
  ],
  locked: {
    thumbs: Array.from({ length: 12 }, (_, i) => `/images/planners/military/locked-${String(i + 1).padStart(2, '0')}.webp`),
    sections: [] as { name: string; open?: boolean }[], // filled below from MIL_SECTIONS
  },
  buy: [
    { url: '#inquiry', label: 'Discuss a Wholesale Partnership', primary: true },
    { url: SITE.links.militaryPlannerAmazon, label: 'Get Your Copy on Amazon' },
  ],
};

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
  { title: 'Military spouses', text: 'Often the one keeping home steady through orders, moves and deployments.' },
  { title: 'Parents and children', text: 'Schools, caregivers and pickup people, written down for whoever steps in.' },
  { title: 'Active-duty families', text: 'Service details, deployment contacts and pay records in one place.' },
  { title: 'Veterans and retirees', text: 'Benefits, the DD 214 and the paperwork that matters after service.' },
  { title: 'Every generation', text: 'Memories, traditions and letters that grandparents, parents and children can keep.' },
];

export const MIL_PARTNERS = ['Military bookstores', 'Military book distributors', 'Wholesale book buyers', 'Book retailers serving military communities', 'Military family organizations', 'Veteran organizations', 'Organizations providing products or services to military families', 'Institutional purchasing departments', 'Military industry partners'];
export const MIL_INTERESTS = ['Bulk book purchases', 'Wholesale purchasing', 'Retail and bookstore partnerships', 'Institutional purchasing', 'Community distribution', 'Military family-focused programs'];

// FAQ: answers use only verified facts; commercial terms are left open for discussion.
export const MIL_FAQS = [
  { q: 'What is the Military Edition of The Living Legacy Planner?', a: 'It is The Living Legacy Planner: Military Deployment & Family Readiness Edition, written by Courtney R. Jones, a military wife of 23 years, and published by Senior and Living Today. Its 28 sections help military families organize personal, service, deployment, medical, financial and household information, and keep special memories, family traditions and letters to loved ones in one place.' },
  { q: 'Who is this edition designed for?', a: 'Enlisted service members, veterans and their families, including military spouses, retired service members, military parents and caregivers. It is written for the whole family, not only the service member.' },
  { q: 'What makes this edition different from the regular edition?', a: 'It adds sections written for military life: Service Information, Deployment Readiness, Military Pay Information, Military Benefits, Important Military Documents and a PCS Moving Checklist, alongside the family, medical, financial and legacy pages.' },
  { q: 'Can military bookstores purchase in bulk?', a: 'Yes. We welcome inquiries from military bookstores and book retailers serving military communities. Quantities, pricing and ordering are discussed directly with each store.' },
  { q: 'Are wholesale and institutional partnerships available?', a: 'Yes. We welcome inquiries from distributors, wholesale buyers, military family and veteran organizations, organizations serving military families, institutional purchasing departments and military industry partners. Each arrangement is discussed individually.' },
  { q: 'Can organizations discuss larger orders?', a: 'Yes. Tell us roughly how many copies you have in mind and how they will be used, and we’ll talk through the options with you.' },
  { q: 'Is it a will or a legal document?', a: 'No. It organizes information and wishes so someone trusted can step in. Wills, powers of attorney and directives should be made with an attorney or a base legal office; the planner has space to note where they are kept.' },
  { q: 'How can buyers preview the inside pages?', a: 'Use the “Read inside” section on this page: genuine pages from the planner in a two-page book view, with a zoom button on every page.' },
  { q: 'Can individual families buy a copy?', a: 'Yes. The Military Edition is available on Amazon in paperback and hardcover.' },
  { q: 'How can an organization contact Senior and Living Today?', a: `Use the wholesale inquiry form on this page, email ${SITE.email}, or call ${SITE.phoneDisplay}. Our team replies personally.` },
];

MIL_READER.locked!.sections = MIL_SECTIONS.map((name) => ({ name, open: OPEN.includes(name) }));

// Photographs for the military family section: genuine photos of U.S. military families from
// official U.S. military sources (Wikimedia Commons file pages record the licence of each).
export const MIL_FAMILY_PHOTOS = [
  { src: '/images/military-family/families/navy-homecoming-family.webp', w: 796, h: 567, title: 'Spouses and children', alt: 'A U.S. Navy commander walks off the flight line with his wife and two young sons after a deployment homecoming', credit: 'U.S. Navy photo by MC2 Clifford L. H. Davis (public domain)', source: 'https://commons.wikimedia.org/wiki/File:US_Navy_100907-N-9565D-137_Cdr._Michael_Esper_leaves_the_flight_line_with_his_wife_and_children_during_a_homecoming_celebration_at_Joint_Base_Andre.jpg' },
  { src: '/images/military-family/families/guard-father-and-daughter.webp', w: 796, h: 529, title: 'Parents and their children', alt: 'A smiling National Guard soldier holds his young daughter at a homecoming', credit: 'U.S. Air National Guard photo by Master Sgt. Mark C. Olsen (public domain)', source: 'https://commons.wikimedia.org/wiki/File:1-114th_Soldiers_reunite_with_families_150518-Z-Al508-006.jpg' },
  { src: '/images/military-family/families/army-son-and-father.webp', w: 796, h: 524, title: 'Every generation', alt: 'A U.S. Army soldier embraces his father during a homecoming ceremony', credit: 'U.S. Army photo by Sgt. Alan Graziano (public domain)', source: 'https://commons.wikimedia.org/wiki/File:U.S._Army_Spc._Robert_Fay_Jr.,_center,_an_infantryman_with_Delta_Company,_3rd_Battalion,_187th_Infantry_Regiment,_3rd_Brigade_Combat_Team,_101st_Airborne_Division,_embraces_his_father,_Robert,_during_130327-A-AG069-839.jpg' },
  { src: '/images/military-family/families/guard-family-reunion.webp', w: 796, h: 556, title: 'Families, together again', alt: 'A soldier kisses his baby son while his wife reaches for them both at a family reunion', credit: 'Photo by Sgt. Eric Rutherford, Oregon National Guard, via DVIDS (CC BY 2.0)', source: 'https://commons.wikimedia.org/wiki/File:Flickr_-_DVIDSHUB_-_Lane_County_Area_Soldiers_Reunite_With_Families.jpg' },
];
