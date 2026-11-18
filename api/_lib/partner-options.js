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

// Wholesale inquiry form on the redesigned /partners/ page (api/partner-wholesale.js).
// Same structure as the Military Edition form; keys go into GoHighLevel tags (partner-type-<key>).
export const WHOLESALE_ORG_TYPES = {
  bookstore: 'Bookstore',
  'independent-retailer': 'Independent retailer',
  distributor: 'Wholesale distributor',
  'senior-living': 'Senior living organization',
  'senior-care': 'Senior care provider',
  'community-org': 'Community organization',
  institutional: 'Institutional buyer',
  'business-partner': 'Business partner',
  other: 'Other',
};
// Rough order size, so the team can prepare. No pricing is implied by these ranges.
export const WHOLESALE_QUANTITIES = {
  'under-25': 'Fewer than 25 copies',
  '25-99': '25 – 99 copies',
  '100-249': '100 – 249 copies',
  '250-499': '250 – 499 copies',
  '500-plus': '500 copies or more',
  unsure: 'Not sure yet',
};
// Which edition the organization is interested in.
export const WHOLESALE_EDITIONS = {
  first: 'First Edition (Black & White)',
  second: 'Second Edition (Full Color)',
  both: 'Both editions',
  unsure: 'Not sure yet',
};
