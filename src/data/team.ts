// People shown on the About page.
//
// Courtney's own story stays at the top of /about/. Professional contributors appear in
// "The people behind S.A.L.T." ONLY when every approval below is true. Until then the
// section stays hidden, so nothing about a person goes live without their say-so.
//
// BEFORE ADDING OR PUBLISHING A CONTRIBUTOR (the GitHub repository is public, so do not commit
// their details until step 1 is done):
//   1. permission: written OK from the person to use their name, credentials, biography and
//      the exact wording of their role on this site.
//   2. photo: written OK to use their photo (ideally the original file sent by them), or leave
//      `photo` out to show their initials.
//   3. licenseVerified: credential checked on the official state board lookup (for nurses in
//      Ohio: elicense.ohio.gov, or nursys.com QuickConfirm). Record the date in `verified`.
//   4. involvementConfirmed: the `involvement` sentence matches what they actually do here.
// Never mention a contributor's employer in a way that suggests it is connected to S.A.L.T.

export interface Contributor {
  slug: string;
  name: string;            // as the person spells it
  credential?: string;     // e.g. 'RN' (shown only when licenseVerified)
  role: string;            // their actual role on this site, in plain words
  photo?: string;          // only with photo permission
  photoAlt?: string;
  bio: string[];           // original wording; never copied from an employer's site
  focus: string[];         // short topic chips
  involvement: string;     // exactly what they do for S.A.L.T.
  independence: string;    // what they are NOT (employee, medical director, etc.)
  verified?: string;       // e.g. 'Ohio RN license verified on elicense.ohio.gov, 2026-11-20'
  approvals: { permission: boolean; photo: boolean; licenseVerified: boolean; involvementConfirmed: boolean };
}

export const CONTRIBUTORS: Contributor[] = [];

export const publishable = (c: Contributor) =>
  c.approvals.permission && c.approvals.licenseVerified && c.approvals.involvementConfirmed;

export const PUBLISHED_CONTRIBUTORS = CONTRIBUTORS.filter(publishable);
