// Options for the Military Edition wholesale inquiry form (/military-family-planner/).
// Shared by the page and the server (api/military-wholesale.js) so the two always agree.
// Keys are stored in GoHighLevel tags, so keep them short and stable.
export { US_STATES } from './partner-options.js';

export const MIL_ORG_TYPES = {
  'military-bookstore': 'Military bookstore',
  'independent-bookstore': 'Independent bookstore',
  distributor: 'Wholesale distributor',
  'military-family-org': 'Military family organization',
  'veteran-org': 'Veteran organization',
  institutional: 'Institutional buyer',
  retailer: 'Retailer',
  other: 'Other',
};

// Rough order size, so the team can prepare. No pricing is implied by these ranges.
export const MIL_QUANTITIES = {
  'under-25': 'Fewer than 25 copies',
  '25-99': '25 – 99 copies',
  '100-249': '100 – 249 copies',
  '250-499': '250 – 499 copies',
  '500-plus': '500 copies or more',
  unsure: 'Not sure yet',
};
