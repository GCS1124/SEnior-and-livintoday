// Options for the /partners/ inquiry form. Shared by the page (src/pages/partners.astro) and the
// server (api/partner.js) so the two always agree. Keys are stored in GoHighLevel tags.
export const ORG_TYPES = {
  'senior-living': 'Senior living community',
  'assisted-living': 'Assisted living facility',
  'nursing-home': 'Nursing home / skilled nursing',
  hospice: 'Hospice organization',
  rehab: 'Senior rehabilitation center',
  healthcare: 'Healthcare organization',
  'home-care': 'Home care agency / senior care provider',
  nonprofit: 'Nonprofit or community organization',
  retirement: 'Retirement services',
  'senior-business': 'Business serving older adults',
  distributor: 'Distributor or reseller',
  media: 'Media house or publisher',
  other: 'Other',
};
export const INTERESTS = {
  'complimentary-copy': 'Complimentary copy of The Living Legacy Planner',
  bulk: 'Institutional and bulk purchasing',
  reseller: 'Authorized reseller or distribution',
  affiliate: 'Affiliate partnership',
  media: 'Media or strategic collaboration',
  meeting: 'Partnership meeting',
  'overview-pdf': 'Book overview and partnership proposal (PDF)',
};
export const EDITIONS = {
  first: 'First Edition (Black & White)',
  second: 'Second Edition (Full Color)',
  either: 'Either edition',
};
