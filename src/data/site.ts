// Single source of truth for business details (NAP), links, books, videos and reviews.
// Keep name / phone / email identical everywhere online (Google Business Profile,
// YouTube, Threads, directories). Consistency is a local-SEO signal.

export const SITE = {
  url: 'https://seniorandlivingtoday.com',
  name: 'Senior and Living Today',
  shortName: 'S.A.L.T.',
  tagline: 'Help and support for seniors and the people who care for them',
  description:
    'Senior and Living Today (S.A.L.T.) is Courtney Jones, the caregiver’s caregiver. Practical guidance, planners, free videos and one-on-one help for seniors and family caregivers across the U.S.',
  phone: '+1-888-416-4264',
  phoneDisplay: '(888) 416-4264',
  email: 'info@seniorandlivingtoday.com',
  address: { street: 'P.O. Box 15', city: 'Dayton', region: 'OH', postalCode: '45404', country: 'US' },
  founder: {
    name: 'Courtney Jones',
    jobTitle: 'Founder, the caregiver’s caregiver',
    yearsExperience: 30,
    url: 'https://seniorandlivingtoday.com/about/',
  },
  links: {
    youtube: 'https://www.youtube.com/@seniorandlivingtoday',
    youtubeSubscribe: 'https://www.youtube.com/@seniorandlivingtoday?sub_confirmation=1',
    threads: 'https://www.threads.com/@seniorandlivingtoday',
    community: 'https://community.seniorandlivingtoday.com/',
    store: 'https://www.saltonlinestore.com/',
    storeDigital: 'https://www.saltonlinestore.com/collections/digital-products',
    bookCall: 'https://calendly.com/seniorandlivingtoday/break-the-ice',
    bookCall30: 'https://calendly.com/seniorandlivingtoday/30min',
    freePlanner: 'https://storage.googleapis.com/msgsndr/sbVe09zoUWLiPTabYb5A/media/68e8d5088367a0d2b72ca815.pdf',
    talentForm: 'https://api.leadconnectorhq.com/widget/form/eBUUWJFkBossrt6SUaLo',
    quiz: 'https://app.globalcreativeservices.us/widget/quiz/ruBJ8Z1K3m6P3McOkRkS',
    amazonAuthor: 'https://www.amazon.com/s?i=stripbooks&rh=p_27%3ACourtney%2BR%2BJones',
    livingLegacyPlannerAmazon: 'https://www.amazon.com/dp/B0D4JDBFYQ',
    militaryPlannerAmazon: 'https://www.amazon.com/dp/B0HFDZMWZX',
    relicsAmazon: 'https://www.amazon.com/dp/B0DH537CC3',
  },
  // Add Facebook / Instagram / LinkedIn / Google Business Profile URLs here when ready.
  sameAs: [
    'https://www.youtube.com/@seniorandlivingtoday',
    'https://www.threads.com/@seniorandlivingtoday',
    'https://www.saltonlinestore.com/',
  ] as string[],
  googleSiteVerification: '',
  ga4Id: '',
};

export const NAV = [
  { href: '/help/', label: 'Get Help' },
  { href: '/planners/', label: 'Planners' },
  { href: '/videos/', label: 'Videos' },
  { href: '/services/', label: 'Work With Us' },
  { href: '/about/', label: 'About Courtney' },
  { href: '/blog/', label: 'Blog' },
];

export const SERVICES = [
  {
    href: '/services/senior-care-consulting/',
    title: 'Talk it through with Courtney',
    short: 'Senior Care Consulting',
    summary: 'A one-on-one conversation about what’s going on: care at home, a move, a hospital stay, money worries, or a family that can’t agree. You leave with a plan.',
  },
  {
    href: '/services/senior-care-virtual-assistant/',
    title: 'An extra pair of hands, from a distance',
    short: 'Senior Care Virtual Assistant',
    summary: 'Appointments, reminders, paperwork, online orders and a friendly check-in call, with updates for family if you want them.',
  },
  {
    href: '/services/caregiver-support/',
    title: 'Someone in your corner, caregiver',
    short: 'Caregiver Support',
    summary: 'You’re looking after everyone else. Private sessions and round-table talks for the person doing the caring.',
  },
];

export interface Book {
  slug: string; title: string; subtitle: string; image: string; alt: string;
  blurb: string; buy: string; page?: string; tag: string;
}

export const BOOKS: Book[] = [
  {
    slug: 'living-legacy-planner',
    title: 'The Living Legacy Planner',
    subtitle: 'Your wishes, your details, your story, in one book',
    image: '/images/living-legacy-planner.webp',
    alt: 'The Living Legacy Planner by Courtney R. Jones, blue cover',
    blurb: 'Final wishes, bank and insurance details, medications, doctors, who fixes the furnace, and the memories you want passed down. So nobody has to guess.',
    buy: SITE.links.livingLegacyPlannerAmazon,
    page: '/books/living-legacy-planner/',
    tag: 'Most loved',
  },
  {
    slug: 'military-edition',
    title: 'The Living Legacy Planner: Military Deployment & Family Readiness Edition',
    subtitle: 'Plan today, protect tomorrow',
    image: '/images/military-planner.webp',
    alt: 'The Living Legacy Planner Military Deployment and Family Readiness Edition cover',
    blurb: 'Written for service members and their families: everything the people at home need while you’re away, organized before deployment day.',
    buy: SITE.links.militaryPlannerAmazon,
    tag: 'New edition',
  },
  {
    slug: 'daily-bloom',
    title: 'The Daily Bloom',
    subtitle: 'A life balance guide',
    image: '/images/daily-bloom.webp',
    alt: 'The Daily Bloom: A Life Balance Guide cover',
    blurb: 'A gentle daily companion for slowing down, reflecting and keeping your days in balance.',
    buy: SITE.links.amazonAuthor,
    tag: 'Daily planner',
  },
  {
    slug: 'relics-of-the-century',
    title: 'Relics of the Century',
    subtitle: 'The things we grew up with',
    image: '/images/relics-of-the-century.webp',
    alt: 'Relics of the Century by Courtney Ray Jones, cover with vintage radios, records and a typewriter',
    blurb: 'Rotary phones, record players, typewriters. A picture book of everyday things that gets grandparents and grandkids talking.',
    buy: SITE.links.relicsAmazon,
    page: '/books/relics-of-the-century/',
    tag: 'Memory lane',
  },
];

// Real Amazon reviews of The Living Legacy Planner (copied word for word, typos and all).
export const REVIEWS = [
  { name: 'Amanda Trow', title: 'Book for all ages', date: 'November 8, 2024', verified: false,
    text: 'My mom was in her 60s and had a mild stroke, and me living across the US I didn’t have useful information to handle affairs while she was in hospital. After she came home and got better, we sat down and went through it, just in case something else happens. I was really surprised on how much I didn’t know… Get this book for all your loved ones!' },
  { name: 'BoomerChick', title: 'Everybody Needs This Planner, Not Just Seniors!', date: 'January 10, 2025', verified: true,
    text: 'Well organized and very detailed sections guide you as you enter critical financial, medical, and a multitude of other information your family will need to have on hand. It’s not just for old people; the unexpected can happen to anyone at any age.' },
  { name: 'letha', title: 'A planner designed for the young and old…', date: 'November 11, 2024', verified: true,
    text: 'This resource book has been a useful tool to my friend who has some visual impairment, and writing difficulties. First it’s larger than many original planners… It’s a hardback book that will maintain wear and tear. I even bought one for myself.' },
  { name: 'Julia d.', title: 'This keeps all your thoughts in one place', date: 'May 30, 2024', verified: true,
    text: 'You can take your time and write things down in it so your loved ones don’t have to guess what you would want done… some things I never would have thought of are listed here, it pretty much covers everything.' },
  { name: 'Sheri Cote', title: 'Very useful book', date: 'January 9, 2025', verified: true,
    text: 'This book is full of helpful pages where I can keep track of important information for my family in case something happens to me, or if I’m out of commission for a while.' },
];

export interface Video { id: string; title: string; length: string; topic: string; note?: string }

// Hand-picked from Courtney's channel (youtube.com/@seniorandlivingtoday, 480+ videos).
export const VIDEOS: Video[] = [
  { id: 'k5v5Vwbi7QE', title: 'Importance of Hospital Advocacy', length: '13:16', topic: 'Health & hospital', note: 'Why nobody should be in the hospital alone, and how to set up shifts.' },
  { id: '2ebHnkYlUoA', title: 'Don’t miss the deadline: Medicare Advantage letters', length: '8:23', topic: 'Money & Medicare', note: 'Open that letter. What to do if your plan is cancelled or changed.' },
  { id: 'eW-KM3iIl1Q', title: 'Seniors, Not in My House', length: '9:24', topic: 'Safety at home', note: 'When someone asks to “stay a while.” Ground rules that protect you.' },
  { id: 'vnfZ3nTSZms', title: 'Prepare for their arrival with caution', length: '5:35', topic: 'Safety at home', note: 'Workers in your home? Have another set of eyes there.' },
  { id: 'idcJRGWgCb4', title: 'Counting on someone to save you?', length: '8:38', topic: 'Safety at home', note: 'If you fall and the doors are locked, how does help get in?' },
  { id: 'WhVr1HWaXgw', title: 'How Not to Hesitate', length: '7:33', topic: 'Everyday life', note: 'It’s okay to ask for help. You only need to know who to call.' },
  { id: 'Px-y1xI6I9c', title: 'Grocery Store Shakedown', length: '8:34', topic: 'Money & Medicare', note: 'Three prices for one loaf of bread? Courtney has thoughts.' },
  { id: 'ombg9-Aa7I8', title: 'You can try to avoid it, but winter is coming', length: '7:48', topic: 'Everyday life', note: 'Deicer, the snow shovel, your car kit, and getting on the handyman’s list early.' },
  { id: 'bJV9b_rl4yA', title: 'Senior care is unaffordable. Senior living with a twist?', length: '5:28', topic: 'Money & Medicare' },
  { id: 'SKTGDf-evVc', title: 'Retirement and owning a pet: the real numbers', length: '4:44', topic: 'Money & Medicare' },
  { id: 'NBbgpHlgnC0', title: 'Unemployed over 60: the job search', length: '7:04', topic: 'Everyday life' },
  { id: 'Cy7QDOxvW4o', title: 'Introduction to Senior and Living Today', length: '1:26', topic: 'Everyday life' },
];
