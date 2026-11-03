# Backlink profile and opportunities (notes for `03-backlink-opportunities.csv`)

Captured 2026-11-03. For manual review only: nothing was submitted, posted, bought or published.

## Data limits

- **No backlink index data** was available. Ahrefs isn't connected, and OpenSEO has 3 credits against about 50 for a domain overview. So this file contains **no referring-domain counts, authority scores, traffic, or lost/new link history**, and none was estimated.
- The current profile below comes from web searches for the domain and brand name. It is a **sample of public mentions**, not a full backlink list.
- "Verified" in the CSV means the opportunity page loaded (HTTP 200) on 2026-11-03 and matched the description. It does **not** mean a link was acquired or that the site will accept a submission.

## Current profile (observed mentions)

| Source | What it is | Link |
|---|---|---|
| theorg.com | Company/founder profile | Links to seniorandlivingtoday.com (verified in HTML) |
| alignable.com | Dayton business listing with client recommendations | Seen in search; the page blocks automated fetches |
| linkedin.com | Company page | Lists the www URL |
| slideserve.com | "Best Senior Care Services in Dayton" deck | Links to an **old URL that now 404s** (`/pages/senior-care-services-dayton`) |
| genglobal.org, AbeBooks | Founder profile; Color Edition planner listing | Mentions only |
| YouTube, Instagram, TikTok, Pinterest, Threads | Owned social | Bio links. Several Instagram posts link to old WordPress URLs. |
| Facebook posts by other senior-living pages | Shared posts | Link `/community/`, which still works because the URL was kept |

Most mentions are owned or self-created profiles. Independent editorial links (articles, resource pages, public agencies) weren't found in this sample. That's the main gap to close.

## Competitor gap (qualitative)

The closest like-for-like competitor seen in search is **Pamela D. Wilson / The Caring Generation**: an individual elder care consultant offering 1:1 virtual consultations, with a long-running podcast and articles. Her visibility comes from owned media plus podcast and guest appearances. That's the same route S.A.L.T. can take with Courtney's videos and story. Placement franchises (Senior Care Authority, CarePatrol) are a different business model and aren't a direct comparison. Competitor backlink counts weren't measured.

## Fix these first (they cost nothing)

1. Deploy the redirect fix on this branch (`vercel.json`). Old URLs used on social posts currently return 404.
2. Edit the SlideServe deck link, or approve a redirect for `/pages/senior-care-services-dayton`.
3. Update YouTube descriptions so each video links to its matching article.
4. Claim Google Business Profile and Amazon Author Central, using the same name, phone and website everywhere.

## Rules followed

No purchased links, link farms, automated submissions or reused site copy. Each pitch should be original and useful to that audience, and must not give medical, legal or insurance advice.
