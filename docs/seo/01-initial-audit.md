# Senior and Living Today: initial audit (Phase 1)

Captured 2026-11-03 on branch `salt-seo-growth-improvements`. Nothing on the website has been changed yet.

Evidence sources: the local repository and build, the live site (`curl`, `openssl` and a BeyondSEO deep crawl of 50 page attempts), a link check of all 41 built pages, OpenSEO's Search Console listing, and one `site:` web search.

## 1. Repository state

| Item | Finding |
|---|---|
| Branch | `main` was clean and in step with commit `c6d8a67`. Work branch `salt-seo-growth-improvements` was created from it. Nothing has been pushed. |
| Stack | Astro 7.4.5, static output, `@astrojs/sitemap`, Vercel. `api/ask.js` is a Vercel Function (AI helper) that reads `NVIDIA_API_KEY` from the environment. No secrets are in the repo, and `.env*` is git-ignored. |
| Build | `npm ci` reported 0 vulnerabilities. `npm run build` built 41 pages successfully. |
| `npm run check:seo` | 38 errors, all false positives on Windows: `scripts/seo-check.mjs:24` builds the page path without converting `\` to `/` (line 11 already does this). It will pass on Vercel/Linux. The fix is one line. |
| Analytics / GSC | `src/data/site.ts`: `googleSiteVerification: ''` and `ga4Id: ''`. No Search Console meta verification or GA4 tag is deployed. |
| Live deployment | `https://www.seniorandlivingtoday.com/` serves this repo's build (Vercel, HTTP 200). |

## 2. Critical finding: the main domain fails over HTTPS

**Observed (openssl, 2026-11-03):** `https://seniorandlivingtoday.com/` (A record `76.76.21.21`, Vercel) presents a certificate whose only name is `www.seniorandlivingtoday.com` (Let's Encrypt, issued 2026-11-02). Browsers and crawlers reject this as a hostname mismatch (curl exit 60).

The bare domain is the address the site depends on:

- every page's canonical tag, Open Graph URL and JSON-LD `@id` uses `https://seniorandlivingtoday.com/...`
- `sitemap-index.xml` lists only bare-domain URLs, and `robots.txt` points to the bare-domain sitemap
- Google's index still holds the **old WordPress URLs on the bare domain** (`/senior-living-in-usa/`, `/elderly-caregiver-services/`, `/consultancy-elderly-in-home-care/` and others, per the `site:` search). The 301 redirects in `vercel.json` cannot run for HTTPS visitors or Googlebot while the TLS handshake fails, so the migration's ranking carry-over is at risk.
- `http://seniorandlivingtoday.com/` returns 308 to the broken HTTPS address.

**Fix (Vercel dashboard, no DNS change expected):** Project → Settings → Domains. Make sure `seniorandlivingtoday.com` is listed and its certificate is valid, and set it as the primary domain with `www` redirecting (308) to it. This matches the canonicals already in the code. If Vercel reports a configuration problem, share its exact message before anyone touches DNS. MX records must not be changed.

**Acceptance check:** `curl -I https://seniorandlivingtoday.com/about/` returns 200, `https://seniorandlivingtoday.com/senior-living-in-usa` returns 308 to `/about/`, and `https://www.seniorandlivingtoday.com/` redirects to the bare domain.

This finding outranks every other one in this report.

## 3. Other verified findings

| # | Finding | Evidence | Priority |
|---|---|---|---|
| 1 | Six SALT Online Store product links return 404 (bibs ×2, folding cane, arthritis gloves, hand warmer, pill organizer), with several links per product. | Linked from `/` and `/gifts/`. Checked with a browser user agent. The handles are absent from the store's `products.json`. | High: purchase links are broken |
| 2 | Two blog hero / OG images are missing: `/images/seniors-outdoors.webp` and `/images/legacy-planner-reading.webp`. | Both return 404 live and are missing from `public/images/`. Referenced in the front matter of `over-55-communities-pros-and-cons.md` and `living-legacy-planner-guide.md`. Broken on `/blog/`, both posts and their social shares. | High |
| 3 | `/sitemap.xml` returns 404. Only `/sitemap-index.xml` exists. | Crawler sitemap probe. | Low (add a redirect) |
| 4 | `/thank-you/` is both disallowed in robots.txt and sent `X-Robots-Tag: noindex`. Google can't read a noindex on a page it's blocked from crawling. | `robots.txt.ts`, `vercel.json` | Low |
| 5 | The `404.html` page links to `https://seniorandlivingtoday.com/404/`, which doesn't exist. | Link check | Low |
| 6 | Third-party links return 403 to automated checks: medicare.gov (3 links) and chroniclingamerica.loc.gov. | Bot blocking. They are expected to work in a browser and are **not** counted as broken. | Info |
| 7 | All 41 pages have exactly one H1, no skipped heading levels, and alt text on every image. Schema found: Organization, ProfessionalService, Person, WebSite, Service, BlogPosting, FAQPage, BreadcrumbList, ContactPage, AboutPage. | Link check and crawler | OK |
| 8 | AI crawler access: robots.txt explicitly allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot and Google-Extended, and `/llms.txt` is live. The AI-specific groups don't repeat `Disallow: /thank-you/`. | `robots.txt` | Low |

## 4. Phase 2 and 3 items located (not yet changed)

**Community and Got Talent blocks:**

- Home `src/pages/index.astro:203-214`: "Join our free community" card and "🎤 Saltine’s Got Talent" card ("Sign up to perform ↗").
- `src/pages/community.astro`: a whole page (Join free, quiz, Saltine’s Got Talent section and banner).
- Footer `src/components/Footer.astro:17` ("Community" social link) and `:37` ("Free community").
- About `src/pages/about.astro:73` ("Join our community" button).
- Service pages: `caregiver-support.astro:45` and `senior-care-consulting.astro:72-74`.
- CTAs: `games.astro:71` and `memory-lane.astro:81`.
- Other references: `sitemap.astro:10`, `llms.txt.ts:17`, `AskSalt.astro:84` (a chatbot answer pointing to /community/) and two links in `fun-activities-for-seniors-at-home.md`.
- `privacy-policy.astro:35` mentions "our online community" in a legal page, so it's left as is.
- Note: the site's wording is "Saltine’s Got Talent". "Senior's Got Talent" does not appear anywhere.

**Copyright notice:** the only visible notice is in the footer (`src/components/Footer.astro:55`), shown on every page:
`© 2026 Senior and Living Today · Site map · Privacy · Terms`. The year is generated automatically.
It's the site's own notice, not a third-party license or attribution. No "All rights reserved" text or third-party credits appear anywhere in `src/`.

**Doctor search:** `/find-help/`. "A doctor" is the default category. It builds a Google Maps search link (`google.com/maps/search/?api=1&query=…`). It is not an embedded results widget. A general "We don’t endorse any particular provider" tip already exists. The new disclaimer will go directly under the finder results, before the map button.

## 5. What can be done now vs what needs access

| Task | Status with current tools |
|---|---|
| Phases 2, 3 and 9 (cleanup, disclaimer, fixes, build, tests, link checks, desktop/mobile screenshots) | **Can do now** (repo, Node and Playwright are available) |
| Phase 5 technical audit (crawl, links, schema, meta, headings, robots, sitemap) | **Mostly done.** Core Web Vitals via the public PageSpeed Insights API can be run next. Field (CrUX) data may not exist for a low-traffic site. |
| Phase 6 keyword research | **Partial.** Intent mapping and page mapping can be done from the site and search observations. Search volumes need a data source: OpenSEO has **3 credits** (too few), Ahrefs is not authorized, and the GSC connector failed to connect. |
| Phase 4 Search Console | **Blocked.** The Google account connected to OpenSEO (shadma@gcsrvllc.com) sees only `advancedbenefitdesigns.com` and `saltonlinestore.com`, not seniorandlivingtoday.com. The separate `mcp-gsc` connector failed with ECONNREFUSED. No GSC data has been read, and none will be invented. |
| Phase 7 backlinks | **Partial.** Prospect research and verification of submission pages can be done with web search and the crawler. Referring-domain, lost/new link and authority data need Ahrefs authorization or OpenSEO credits (about 50 per domain). |
| Phase 8 AEO | **Can do now** (on-site entity, schema, FAQ and llms.txt work). Measured AI-answer visibility needs paid OpenSEO checks and is optional. |
| Fix the HTTPS domain | **Needs you** (Vercel dashboard) |

### How to authorize Search Console (no tokens in the repo)

1. Whoever owns the domain opens Google Search Console → Add property → **Domain** `seniorandlivingtoday.com`, then verifies with the DNS TXT record (Bluehost DNS). This adds one TXT record and changes nothing else. If a property already exists under another Google account, its owner can go to Settings → Users and permissions → Add user and grant `shadma@gcsrvllc.com` **Full** access.
2. In OpenSEO, create a project for `seniorandlivingtoday.com` and connect Google under Integrations. I can then bind the property and read performance data with `list_search_console_sites` and `set_search_console_site`. Alternatively, restart the `mcp-gsc` connector.
3. Submit `https://seniorandlivingtoday.com/sitemap-index.xml` **after** the HTTPS fix in section 2.

## 6. Decisions needed before Phase 2

1. `/community/` page: delete it with a 301 redirect (URL change) or keep it unlinked.
2. Copyright: remove the whole "© 2026 Senior and Living Today" text but keep the Site map / Privacy / Terms links.
3. Broken store products: supply the new product URLs or remove those cards.
4. The two missing blog images: supply them or replace them with existing photos.
