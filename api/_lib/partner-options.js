// Options for the /partners/ application. Shared by the page (src/pages/partners.astro) and the
// server (api/partner.js) so the two always agree. Keys are stored in GoHighLevel tags.
export const ORG_TYPES = {
  'senior-living': 'Senior living or retirement community',
  'assisted-living': 'Assisted or independent living facility',
  'nursing-home': 'Nursing home / skilled nursing',
  hospice: 'Hospice organization',
  'home-care': 'Home care agency or caregiver organization',
  'estate-planning': 'Estate planning or elder law professional',
  financial: 'Financial advisor or retirement consultant',
  healthcare: 'Healthcare organization',
  'senior-business': 'Senior-focused business or service provider',
  bookstore: 'Bookstore or retailer',
  nonprofit: 'Community organization or nonprofit',
  corporate: 'Company (corporate gifting or benefits)',
  distributor: 'Distributor',
  media: 'Media or publisher',
  other: 'Other',
};
// Partnership models and extra requests. Older keys are kept so earlier links keep working.
export const INTERESTS = {
  affiliate: 'Affiliate / referral partnership',
  reseller: 'Wholesale / reseller partnership',
  bulk: 'Senior living / institutional purchasing',
  corporate: 'Corporate / organizational gifting',
  'complimentary-copy': 'Complimentary sample of The Living Legacy Planner',
  'overview-pdf': 'Book overview and partnership proposal (PDF)',
  meeting: 'Partnership call',
  media: 'Media or strategic collaboration',
};
export const EDITIONS = {
  first: 'First Edition (Black & White)',
  second: 'Second Edition (Full Color)',
  either: 'Either edition',
};
export const AUDIENCE_SIZES = { 'under-1k': 'Under 1,000', '1k-10k': '1,000 – 10,000', '10k-50k': '10,000 – 50,000', '50k-plus': '50,000+', unsure: 'Not sure yet' };
export const US_STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming','Puerto Rico','Outside the United States'];
