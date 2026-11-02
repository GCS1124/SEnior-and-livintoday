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
  { href: '/help/', label: 'Get Help', icon: '💬' },
  { href: '/find-help/', label: 'Find Help Near Me', icon: '📍' },
  { href: '/planners/', label: 'Planners', icon: '📘' },
  { href: '/gifts/', label: 'Holiday Gifts', icon: '🎁' },
  { href: '/memory-lane/', label: 'Memory Lane', icon: '📻' },
  { href: '/games/', label: 'Games', icon: '🖍️' },
  { href: '/videos/', label: 'Videos', icon: '▶️' },
  { href: '/about/', label: 'About Courtney', icon: '👋' },
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

// ---------- SALT Online Store (our own shop) ----------
// Hand-picked, senior-relevant products. Links carry UTM tags so store analytics
// can see visitors who came from seniorandlivingtoday.com.
const STORE = 'https://www.saltonlinestore.com';
export const storeLink = (path: string, campaign = 'senior-site') =>
  `${STORE}${path}${path.includes('?') ? '&' : '?'}utm_source=seniorandlivingtoday&utm_medium=referral&utm_campaign=${campaign}`;

export interface Product { key: string; name: string; why: string; handle: string; tag: string }

export const GIFTS: Product[] = [
  { key: 'robe-hotel', name: 'Thick Fleece Hotel-Style Robe', why: 'Cozy, warm and easy to slip on. For him or for her.', handle: 'long-robe-hotel-collection-thick-fleece-for-men-women', tag: 'Warm & cozy' },
  { key: 'robe-men', name: 'Men’s Soft Coral Fleece Robe', why: 'Ultra-soft with pockets. A Dad and Grandpa favorite.', handle: 'mens-solid-color-coral-fleece-long-robe-ultra-soft-bathrobe-gown-with-pockets', tag: 'For him' },
  { key: 'cane', name: 'Adjustable Folding Walking Cane', why: 'Folds small for the car or a handbag, adjusts to the right height.', handle: 'adjustable-folding-walking-cane-for-seniors', tag: 'Steady steps' },
  { key: 'gloves-arthritis', name: 'Compression Arthritis Gloves', why: 'Gentle compression and warmth for stiff, achy hands.', handle: 'compression-arthritis-gloves-wrist-support-carpal-tunnel-pain-relief', tag: 'Comfort' },
  { key: 'glasses-bifocal', name: 'Bifocal Reading Glasses', why: 'Near and far in one pair, with lenses that darken outside.', handle: 'photochromic-bifocal-reading-glasses-clear-vision-both-far-and-near-wide-field-of-vision-tr-toughness-frame-unisex-model', tag: 'See clearly' },
  { key: 'glasses-catEye', name: 'Cat-Eye Reading Glasses', why: 'A little style for reading the paper and the recipe card.', handle: 'ladies-cat-eye-reading-eyeglasses-unisex-women-men-anti-blue-light-computer-far-sight-glasses-finished-presbyopia-eyewear-to-4-0', tag: 'For her' },
  { key: 'hand-warmer', name: 'Rechargeable Hand Warmer', why: 'No more cold fingers on winter walks or in a chilly house.', handle: 'rechargeable-electric-hot-water-bag-hand-warmer-heat-pack', tag: 'Winter must-have' },
  { key: 'calendar-clock', name: 'Large Day & Date Calendar Clock', why: 'Big, clear day, date and time, with up to 12 reminder alarms.', handle: '12-alarms-digital-led-calendar-clock-with-multi-languages-to-display-medicine-time-reminder-for-elder-home-desk-wall-decoration', tag: 'Stay on track' },
  { key: 'card-holder', name: 'Hands-Free Playing Card Holder', why: 'Keeps card night going when fingers get tired.', handle: '2-pack-card-holders-for-playing-cards-playing-card-holder-for-adults-seniors-hands-free-card-game-holder-for-arthritis-litt', tag: 'Game night' },
  { key: 'pill-organizer', name: 'Large 7-Day Pill Organizer', why: 'Morning, noon and night, with big compartments that are easy to open.', handle: '7-day-pill-organizer-with-21-grids-large-compartments', tag: 'Everyday helper' },
  { key: 'hand-massager', name: 'Heated Hand Massager', why: 'Warm, gentle compression for tired hands at the end of the day.', handle: 'hand-massager-for-arthritis-carpal-tunnel-heated-air-compression-5-air-compression-modes-kneading-massage-built-in-finger-stretching-gentle-heat-relaxing-hand-care-usb-rechargeable', tag: 'Treat yourself' },
  { key: 'glasses-titanium', name: 'Titanium Reading Glasses for Men', why: 'Lightweight and sturdy everyday readers.', handle: 'high-quality-pure-titanium-reading-glasses-for-men-anti-blue-light-presbyopia-eyewear-with-diopter-0-00-4-00', tag: 'For him' },
];

export const EPRODUCTS: Product[] = [
  { key: 'e-medication', name: 'Medication & Health Tracker', why: 'Fillable PDF: every medicine, dose and doctor in one place.', handle: 'medication-record-health-information-tracker-fillable-pdf-bundle', tag: 'Instant download' },
  { key: 'e-appointments', name: 'Medical Appointment Planner', why: 'Fillable PDF: questions to ask, answers you got, what’s next.', handle: 'medical-appointment-planner-fillable-pdf-bundle', tag: 'Instant download' },
  { key: 'e-handoff', name: 'Caregiver Hand-Off Organizer', why: 'Fillable PDF for when another family member takes a shift.', handle: 'caregiver-handoff-family-care-organizer-fillable-pdf-bundle', tag: 'For caregivers' },
  { key: 'e-carelog', name: 'Daily Care Log', why: 'Fillable PDF: meals, moods, meds and notes, day by day.', handle: 'daily-care-log-fillable-pdf-bundle', tag: 'For caregivers' },
  { key: 'e-grief', name: 'Grief & Gentle Healing Journal', why: 'A kind, guided place to write through a loss.', handle: 'grief-gentle-healing-fillable-journal', tag: 'Journal' },
  { key: 'e-clarity', name: 'Everyday Care & Clarity Planner', why: 'A simple fillable planner for seniors and caregivers.', handle: 'everyday-care-clarity-companion-fillable-senior-caregiver-planner', tag: 'Best value' },
];

// ---------- Find help near you ----------
// Trusted, free directories. {zip} is replaced with the visitor's ZIP code where supported.
export interface Finder { id: string; label: string; icon: string; maps?: string; trusted: { name: string; url: string; note: string }[] }

export const FINDERS: Finder[] = [
  { id: 'doctor', label: 'A doctor', icon: '🩺', maps: 'primary care doctor accepting medicare',
    trusted: [{ name: 'Medicare Care Compare', url: 'https://www.medicare.gov/care-compare/', note: 'Official Medicare tool to find and compare doctors and clinicians.' }] },
  { id: 'geriatric', label: 'A geriatric specialist', icon: '👵', maps: 'geriatrician',
    trusted: [{ name: 'Medicare Care Compare', url: 'https://www.medicare.gov/care-compare/', note: 'Search by specialty and location.' }] },
  { id: 'hospital', label: 'A hospital or ER', icon: '🏥', maps: 'hospital emergency room',
    trusted: [{ name: 'Medicare Care Compare: hospitals', url: 'https://www.medicare.gov/care-compare/', note: 'Compare hospital quality ratings. In an emergency, call 911.' }] },
  { id: 'pharmacy', label: 'A pharmacy', icon: '💊', maps: 'pharmacy open now', trusted: [] },
  { id: 'lawyer', label: 'An elder law attorney', icon: '⚖️', maps: 'elder law attorney',
    trusted: [
      { name: 'NAELA attorney directory', url: 'https://www.naela.org/', note: 'National Academy of Elder Law Attorneys: find a member near you.' },
      { name: 'LawHelp.org', url: 'https://www.lawhelp.org/', note: 'Free and low-cost legal aid by state.' },
    ] },
  { id: 'insurance', label: 'Medicare & insurance help', icon: '📋', maps: 'medicare insurance agent',
    trusted: [
      { name: 'SHIP: free Medicare counseling', url: 'https://www.shiphelp.org/', note: 'Free, unbiased help from your State Health Insurance Assistance Program.' },
      { name: 'Medicare Plan Finder', url: 'https://www.medicare.gov/plan-compare/', note: 'Compare plans yourself. Or call 1-800-MEDICARE (1-800-633-4227).' },
    ] },
  { id: 'homecare', label: 'Home care or home health', icon: '🏠', maps: 'home care agency seniors',
    trusted: [{ name: 'Medicare Care Compare: home health', url: 'https://www.medicare.gov/care-compare/', note: 'Medicare-certified home health agencies and their ratings.' }] },
  { id: 'living', label: 'Assisted living or nursing homes', icon: '🏡', maps: 'assisted living',
    trusted: [{ name: 'Medicare Care Compare: nursing homes', url: 'https://www.medicare.gov/care-compare/', note: 'Nursing home ratings, inspections and staffing.' }] },
  { id: 'local', label: 'Local senior services', icon: '🤝', maps: 'area agency on aging',
    trusted: [{ name: 'Eldercare Locator', url: 'https://eldercare.acl.gov/', note: 'U.S. Administration on Aging: meals, rides, caregiver help and more. Call 1-800-677-1116.' }] },
  { id: 'benefits', label: 'Benefits I might qualify for', icon: '💵',
    trusted: [{ name: 'BenefitsCheckUp', url: 'https://www.benefitscheckup.org/', note: 'Free screener from the National Council on Aging for help paying for food, medicine, utilities and more.' }] },
];

// ---------- Memory Lane ----------
export const RELICS = [
  { emoji: '☎️', name: 'The rotary phone', memory: 'Dialing a long number and waiting for the dial to spin back. Who was the first number you knew by heart?' },
  { emoji: '📻', name: 'The family radio', memory: 'Gathered around for the ball game, the news, or a Saturday-night show. What did your family listen to?' },
  { emoji: '💿', name: 'Records & the turntable', memory: 'Lifting the needle just right. What was the first record you bought with your own money?' },
  { emoji: '📺', name: 'Rabbit-ear TV', memory: 'Three channels, foil on the antenna, and somebody had to get up to change it. What show did the whole family watch?' },
  { emoji: '⌨️', name: 'The typewriter', memory: 'The ding at the end of the line and a bottle of correction fluid nearby. Who taught you to type?' },
  { emoji: '🥛', name: 'The milkman', memory: 'Glass bottles on the porch before sunrise. Did your family have milk delivered?' },
  { emoji: '🎞️', name: 'The drive-in movie', memory: 'Speakers hooked on the car window and a carload of friends. What did you see?' },
  { emoji: '✉️', name: 'Letters & stamps', memory: 'Pen pals, love letters, and checking the mailbox every afternoon. Who did you write to?' },
];

export const MEMORY_LINKS = [
  { name: 'Old newspapers (1770–1963)', url: 'https://chroniclingamerica.loc.gov/', note: 'Library of Congress “Chronicling America”: read front pages from the past, free.', icon: '📰' },
  { name: 'Classic TV & old shows', url: 'https://archive.org/details/classic_tv', note: 'Internet Archive’s free collection of classic television.', icon: '📺' },
  { name: 'Old-time radio shows', url: 'https://archive.org/details/oldtimeradio', note: 'Mysteries, comedies and westerns from radio’s golden age.', icon: '📻' },
  { name: '78 rpm records', url: 'https://great78.archive.org/', note: 'The Great 78 Project: tens of thousands of early records, free to play.', icon: '🎶' },
  { name: 'Old movies, free', url: 'https://archive.org/details/feature_films', note: 'Public-domain feature films from Hollywood’s early years.', icon: '🎬' },
];
