// Options for the "Work With Us" interest form (/work-with-us/). Shared by the page and the server
// (api/work-with-us.js) so the two always agree. Keys go into GoHighLevel tags (wwu-<key>).
export { US_STATES } from './partner-options.js';

// Opportunity types. Wholesale, institutional and Military Edition inquiries are NOT saved by this
// form: the page sends those visitors to the existing landing-page forms (see `route`).
export const WWU_TYPES = {
  affiliate: { label: 'Affiliate partnership' },
  wholesale: { label: 'Wholesale / bookstore / distributor', route: '/partners/#inquiry' },
  institutional: { label: 'Institutional partnership', route: '/partners/#inquiry' },
  military: { label: 'Military Edition partnership', route: '/team-up-with-us/#inquiry' },
  contractor: { label: '1099 independent contractor' },
  other: { label: 'Other' },
};
// Types this form saves itself.
export const WWU_SAVED = ['affiliate', 'contractor', 'other'];

// Affiliate: where they would share our products (optional).
export const WWU_CHANNELS = {
  website: 'Website or blog',
  social: 'Social media',
  newsletter: 'Email newsletter',
  community: 'Community group or club',
  video: 'Video or podcast',
  other: 'Other',
};
// 1099 contractor: area of interest (optional).
export const WWU_SERVICES = {
  'business-development': 'Business development',
  partnerships: 'Partnerships',
  sales: 'Sales',
  outreach: 'Outreach',
  other: 'Other services',
};
