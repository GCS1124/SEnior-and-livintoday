# Senior and Living Today: website

The new **seniorandlivingtoday.com**: a fast, static [Astro](https://astro.build) site deployed on **Vercel**, replacing the WordPress + Elementor site on Bluehost.

## Why rebuild

| Old WordPress site | New site |
|---|---|
| Elementor + WooCommerce load ~20 JS files on every page | Plain HTML/CSS with almost no JavaScript, so it loads fast and scores well on Core Web Vitals |
| Keyword-stuffed "senior living near me" copy (wrong intent: S.A.L.T. is not a facility) | Copy targets what S.A.L.T. actually offers: senior care consulting, caregiver support, end-of-life planning |
| Unclear URLs (`/senior-living-in-usa/` = About, `/brookdale-senior-living/` = thank-you page that uses a competitor's trademark) | Clean, descriptive URLs with 301 redirects from every old URL |
| Testimonials saved as images, so Google can't read them | All text is real HTML |
| Leftover `/cart/ /checkout/ /shop/` pages in the sitemap | Removed and redirected to the SALT Online Store |
| Missing or partial structured data | Organization, Person (Courtney), Service, Book, BlogPosting, FAQ, HowTo and Breadcrumb schema |

## What's built in for SEO

- Unique `<title>`, meta description, canonical URL, Open Graph and Twitter tags on every page
- JSON-LD entity graph linking **S.A.L.T., Courtney Jones (author) and her books** (E-E-A-T)
- Author bylines and bio on every article
- `sitemap-index.xml`, `robots.txt`, `rss.xml`, and `llms.txt` (a plain-language summary for AI search tools such as ChatGPT, Perplexity and Google AI Overviews)
- 301 redirects for every old WordPress URL (`vercel.json`), so existing rankings carry over
- Accessibility for older readers: 19px base font, the Atkinson Hyperlegible typeface (built for low vision), high contrast, 48px+ tap targets
- `npm run check:seo` audits every built page: one H1, title and description length, no duplicates, valid canonical, image alt text, valid JSON-LD, no broken internal links

## Brand & voice

- Colours come from the S.A.L.T. logo: forest green `#47704C`, sunshine yellow `#FFF200`, gold `#FFAE00`, with berry `#CC3366` for small handwritten touches.
- Fonts: Poppins (headings), Atkinson Hyperlegible (body, built for low vision), Caveat (handwritten notes).
- Copy is written in Courtney's first-person voice. The "What do I do when…?" articles are based on her own YouTube videos, which are embedded on each article.
- Videos, planners and reviews live in `src/data/site.ts`. Add a video there and it appears on /videos/.

## Ask S.A.L.T. (AI helper)

A chat helper on every page (bottom-right button, the header button and the home page question box).

- Server code: `api/ask.js` (a Vercel Function). It uses the same NVIDIA setup as the SALT Online Store assistant.
- **To switch the AI on:** Vercel → this project → Settings → Environment Variables → add `NVIDIA_API_KEY` (and optionally `NVIDIA_MODEL`), then redeploy. Never put the key in the code.
- Until the key is added, or if the AI is down, the helper still answers common questions instantly (doctor, Medicare, hospital, gifts, planners, games…) with links to the right page.
- Set a monthly spend limit on the NVIDIA account. The endpoint caps message length and questions per visitor.

## Customer reviews

- Planner reviews (Amazon, word for word): `REVIEWS` in `src/data/site.ts`. Shown three lines at a time with “Read more”.
- Bib reviews (SALT store Facebook page): `BIB_REVIEWS`. Paste Anthony Baffa’s full review into the `more` field to show all of it.

## How the two websites connect

- **Planners and books → Amazon** (trusted checkout and shipping): `BOOKS` in `src/data/site.ts`.
- **Gifts and everyday helpers → SALT Online Store**: `GIFTS` in `src/data/site.ts` (adult bibs first, arthritis gloves, reading glasses, folding cane, hand warmer, calendar clock, card holder, pill organizer…). Product photos are in `public/images/shop/`.
- **E-planners, e-greeting cards, e-wishes → SALT Online Store**: `EPRODUCTS`. Add new digital products there as they launch.
- Every store link carries `utm_source=seniorandlivingtoday`, so the store's analytics show sales and visits that came from this site.

## Site map

```
/                                         Home
/about/                                   Courtney Jones and S.A.L.T.
/help/                                    What do I do when…? (situations)
/find-help/                               Find a doctor, lawyer, Medicare help near a ZIP code
/gifts/                                   Holiday gift guide (SALT store + Amazon)
/memory-lane/                             Remember-when cards, old newspapers, classic TV & radio
/games/                                   Online coloring book (16 pictures) + memory match game
/greeting-cards/                          Greeting card maker: photo, wishes, print / PDF / share
/sitemap/                                 Human-readable site map (XML: /sitemap-index.xml)
/videos/                                  Courtney's YouTube videos
/planners/                                All planners & books
/services/                                Work with us
  /services/senior-care-consulting/
  /services/senior-care-virtual-assistant/
  /services/caregiver-support/
/caregiver-connection/                    Recommended products
/community/                               Free community & S.A.L.T. Academy
/books/living-legacy-planner/             Book landing page (Book schema)
/books/relics-of-the-century/
/resources/final-arrangements-discussion-guide/
/guides/types-of-senior-living/           Pillar guide
/blog/  +  /blog/<post>/                  Markdown posts in src/content/blog
/contact/   /privacy-policy/   /terms-conditions/   /thank-you/ (noindex)
```

## Run locally

```bash
npm install
npm run dev            # http://localhost:4321
npm run build && npm run check:seo
```

## Add a blog post

Create `src/content/blog/my-post-slug.md`:

```md
---
title: "On-page headline"
seoTitle: "Shorter title for Google (under 60 chars)"
description: "140-160 character summary for search results."
published: 2026-11-15
image: /images/my-photo.webp
imageAlt: "What the photo shows"
---
Article text in Markdown...
```

Commit and push; Vercel redeploys automatically.

## Launch checklist

1. **Photos are already in the repo** (`public/images/`): the real S.A.L.T. logo, Courtney's photos, planner covers and community photos, compressed to WebP.
2. **Deploy to Vercel:** vercel.com → Add New → Project → import this GitHub repo. The framework (Astro) is detected automatically; no settings needed.
3. **Review the Vercel preview URL**, especially the new copy flagged below.
4. **Connect the domain:** in Vercel → Project → Settings → Domains, add `seniorandlivingtoday.com` and `www.seniorandlivingtoday.com` (redirect www → apex). In **Bluehost → Domains → DNS**, set the records Vercel shows (typically `A @ → 76.76.21.21` and `CNAME www → cname.vercel-dns.com`). **Do not change MX records** or email will stop working. Leave the `community.` subdomain record as it is.
5. **Google Search Console:** verify the domain (DNS TXT), submit `https://www.seniorandlivingtoday.com/sitemap-index.xml`, and use URL Inspection → Request indexing on the home, services and Living Legacy Planner pages.
6. **Google Business Profile:** use exactly the same name, phone and website as `src/data/site.ts`. Add the profile URL and social links to `sameAs` in that file.
7. Keep the Bluehost WordPress install for about 30 days as a backup, then cancel.

## Before launch: review these

- The seven articles based on Courtney's videos (hospital advocate, houseguests, Medicare letter, workers in your home, asking for help, winter prep, key lockbox) were written from her video transcripts. Have Courtney read them to confirm they sound like her and are accurate.
- The **10-point discussion guide** and **Types of Senior Living** guide are new copy for Courtney to review.
- The Daily Bloom links to Courtney's Amazon author page. Swap in its direct Amazon link in `src/data/site.ts` if you have it.
- **Terms & Conditions section 10:** the old page still had unfinished template text ("Specify applicable jurisdiction…"). It now says Ohio law and Montgomery County courts. Confirm with your attorney.
- Add a real logo file (replace `public/favicon.svg`) and fill `sameAs`, `googleSiteVerification` and `ga4Id` in `src/data/site.ts`.
