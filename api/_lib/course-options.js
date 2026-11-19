// Options for the course-interest form on /courses/ (S.A.L.T. Academy, coming soon). Shared by the
// page and the server (api/course-interest.js) so they always agree. Keys go into GoHighLevel tags
// (course-<key>, course-format-<key>).

// The three S.A.L.T. Academy courses already named on /community/, plus other ideas visitors can pick.
export const COURSE_TOPICS = {
  medicare: 'Medicare Simplified',
  health: 'Health & Nutritional Planning',
  finance: 'Smart Financial & Estate Planning',
  legacy: 'Legacy planning with The Living Legacy Planner',
  caregiving: 'Caregiving: getting started and staying well',
  'senior-living': 'Senior living options and making a move',
  safety: 'Staying safe at home and avoiding scams',
  tech: 'Using phones, tablets and video calls',
};
export const COURSE_ACADEMY = ['medicare', 'health', 'finance'];

// How they'd like to learn (optional).
export const COURSE_FORMATS = {
  video: 'Short videos to watch any time',
  webinar: 'Live online sessions',
  workbook: 'Printable workbooks and checklists',
  'in-person': 'In-person workshops',
};

// Who they are learning for (optional).
export const COURSE_ROLES = {
  myself: 'Myself',
  parent: 'A parent or relative',
  clients: 'People I care for at work',
  other: 'Someone else',
};
