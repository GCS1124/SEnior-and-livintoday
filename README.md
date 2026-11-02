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

## Site map

```
/                                         Home
/about/                                   Courtney Jones and S.A.L.T.
/services/                                Services hub
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

1. **Copy the photos** (before the DNS switch): on your computer run `npm run images`, then commit `public/images/`. This downloads the photos from the current WordPress media library. Until then, pages show a soft placeholder instead of a broken image.
2. **Deploy to Vercel:** vercel.com → Add New → Project → import this GitHub repo. The framework (Astro) is detected automatically; no settings needed.
3. **Review the Vercel preview URL**, especially the new copy flagged below.
4. **Connect the domain:** in Vercel → Project → Settings → Domains, add `seniorandlivingtoday.com` and `www.seniorandlivingtoday.com` (redirect www → apex). In **Bluehost → Domains → DNS**, set the records Vercel shows (typically `A @ → 76.76.21.21` and `CNAME www → cname.vercel-dns.com`). **Do not change MX records** or email will stop working. Leave the `community.` subdomain record as it is.
5. **Google Search Console:** verify the domain (DNS TXT), submit `https://seniorandlivingtoday.com/sitemap-index.xml`, and use URL Inspection → Request indexing on the home, services and Living Legacy Planner pages.
6. **Google Business Profile:** use exactly the same name, phone and website as `src/data/site.ts`. Add the profile URL and social links to `sameAs` in that file.
7. Keep the Bluehost WordPress install for about 30 days as a backup, then cancel.

## Before launch: review these

- The new articles **"How to Talk to Your Aging Parents About Their Final Wishes"** and **"Aging in Place: Home Safety Checklist"**, the **10-point discussion guide** and the **Types of Senior Living** guide are new copy. Have Courtney review them for voice and accuracy.
- **Terms & Conditions section 10:** the old page still had unfinished template text ("Specify applicable jurisdiction…"). It now says Ohio law and Montgomery County courts. Confirm with your attorney.
- Add a real logo file (replace `public/favicon.svg`) and fill `sameAs`, `googleSiteVerification` and `ga4Id` in `src/data/site.ts`.
