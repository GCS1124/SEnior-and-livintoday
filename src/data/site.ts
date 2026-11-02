// Single source of truth for business details (NAP), links and navigation.
// Keep name / phone / email identical everywhere online (Google Business Profile,
// Facebook, directories) — consistency is a local-SEO ranking signal.

export const SITE = {
  url: 'https://seniorandlivingtoday.com',
  name: 'Senior and Living Today',
  shortName: 'S.A.L.T.',
  legalName: 'Senior and Living Today',
  tagline: 'Care, comfort and community for seniors and the people who care for them',
  description:
    'Senior and Living Today (S.A.L.T.) helps seniors and family caregivers across the U.S. with senior care consulting, virtual assistant support, planning tools like The Living Legacy Planner, and a free online community.',
  phone: '+1-888-416-4264',
  phoneDisplay: '(888) 416-4264',
  email: 'info@seniorandlivingtoday.com',
  address: {
    street: 'P.O. Box 15',
    city: 'Dayton',
    region: 'OH',
    postalCode: '45404',
    country: 'US',
  },
  founder: {
    name: 'Courtney Jones',
    jobTitle: 'Founder & Senior Care Advocate',
    yearsExperience: 30,
    url: 'https://seniorandlivingtoday.com/about/',
  },
  links: {
    community: 'https://community.seniorandlivingtoday.com/',
    store: 'https://www.saltonlinestore.com/',
    storeDigital: 'https://www.saltonlinestore.com/collections/digital-products',
    bookCall: 'https://calendly.com/seniorandlivingtoday/break-the-ice',
    bookCall30: 'https://calendly.com/seniorandlivingtoday/30min',
    freePlanner:
      'https://storage.googleapis.com/msgsndr/sbVe09zoUWLiPTabYb5A/media/68e8d5088367a0d2b72ca815.pdf',
    talentForm: 'https://api.leadconnectorhq.com/widget/form/eBUUWJFkBossrt6SUaLo',
    quiz: 'https://app.globalcreativeservices.us/widget/quiz/ruBJ8Z1K3m6P3McOkRkS',
    livingLegacyPlannerAmazon: 'https://www.amazon.com/dp/B0D4JDBFYQ',
    relicsAmazon: 'https://www.amazon.com/dp/B0DH537CC3',
  },
  // Add the real profile URLs here (Facebook, Instagram, YouTube, LinkedIn,
  // Google Business Profile, Amazon author page). They feed the `sameAs`
  // schema property, which helps Google connect the brand's entities.
  sameAs: [] as string[],
  // Optional: paste the Google Search Console HTML-tag verification code.
  googleSiteVerification: '',
  // Optional: GA4 measurement ID, e.g. "G-XXXXXXX". Leave blank to load no analytics.
  ga4Id: '',
};

export const NAV = [
  { href: '/services/', label: 'Services' },
  { href: '/books/living-legacy-planner/', label: 'Legacy Planner' },
  { href: '/community/', label: 'Community' },
  { href: '/blog/', label: 'Blog' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

export const SERVICES = [
  {
    href: '/services/senior-care-consulting/',
    title: 'Senior Care Consulting',
    summary:
      'One-on-one guidance on in-home care, senior living options, healthcare navigation and planning the costs.',
  },
  {
    href: '/services/senior-care-virtual-assistant/',
    title: 'Senior Care Virtual Assistant',
    summary:
      'Remote help with appointments, reminders, paperwork, online orders and friendly check-ins, with updates for family.',
  },
  {
    href: '/services/caregiver-support/',
    title: 'Caregiver Support',
    summary:
      'Private consultations and round-table discussions that give family caregivers clear information and a place to be heard.',
  },
];
