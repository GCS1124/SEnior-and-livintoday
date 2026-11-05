# Stage 1 — Website Audit Report

**Website:** https://www.seniorandlivingtoday.com/
**Repository:** GCS1124/SEnior-and-livintoday (branch `main`, commit `aa01bc8`)
**Audit date:** November 5, 2026
**Scope:** Inspection only. No fixes have been made to the live site in this stage.

---

## 1. Summary

| Area | Result |
|---|---|
| Pages built | 47 |
| Links checked | 3,200 (2,633 internal, 324 external, 134 phone, 51 email, 58 on-page anchors) |
| Broken internal links | **0** |
| Empty, placeholder (`#`) or `javascript:` links | **0** |
| Missing images / images without alt text | **0** of 396 |
| Unique external destinations | 88: **85 pass**, 1 broken, 1 redirects, 1 needs a manual click |
| Shopify product links | 17: **16 pass, 1 broken (404)** |
| Shopify collection links | 2: both pass, and both list products |
| JavaScript errors (desktop + phone, every page) | **0** |
| Pages wider than a phone screen | **0** |
| Pages without exactly one main heading (H1) | **0** |
| SEO check (titles, descriptions, canonicals, H1s) | 0 errors, 0 warnings |
| Off-brand colours in use | **Yes**: green, plum, pink and purple across the site (see section 6) |

**One link must be fixed:** the *Titanium Reading Glasses for Men* card on the Gifts page now opens a Shopify "404 Not Found" page.

---

## 2. Website framework and architecture

| Item | Details |
|---|---|
| Framework | Astro 7.4.5, static site (every page is pre-built HTML) |
| Hosting | Vercel, auto-deploys every push to `main` |
| Styling | One global stylesheet (`src/styles/global.css`) plus per-component styles |
| Fonts | Atkinson Hyperlegible (body, designed for low vision), Poppins (headings), Caveat (handwriting accents), all self-hosted |
| Content | Blog posts in `src/content/blog/*.md`; site data (navigation, products, books, videos) in `src/data/site.ts` |
| Server code | One Vercel function, `api/ask.js`, for the Ask S.A.L.T. AI helper (key kept in Vercel environment variables, not in code) |
| Build scripts | `npm run build` runs `scripts/sync-store.mjs` first, which reads each product's public `.js` data from the Shopify store to show prices. **This conflicts with the new "no Shopify API" rule** and is removed in the Stage 2 branch. |
| SEO | Sitemap (`/sitemap-index.xml`), `/robots.txt`, `/llms.txt`, RSS feed, structured data on every page, Google Search Console verification tag |
| Database / email storage | **None.** The site does not collect or store any names or email addresses today. |

## 3. Pages and routes (47)

- **Main:** `/`, `/about/`, `/contact/`, `/thank-you/`, `/faq/`, `/sitemap/`, `/404`
- **Help:** `/help/`, `/find-help/`, `/guides/types-of-senior-living/`, `/resources/final-arrangements-discussion-guide/`, `/caregiver-connection/`, `/community/`
- **Services:** `/services/`, `/services/senior-care-consulting/`, `/services/senior-care-virtual-assistant/`, `/services/caregiver-support/`
- **Shopping and books:** `/gifts/`, `/planners/`, `/books/living-legacy-planner/`, `/books/relics-of-the-century/`
- **Fun:** `/games/` (coloring book and memory match), `/greeting-cards/` (card maker), `/memory-lane/`
- **Media:** `/videos/`, `/blog/` plus 18 articles
- **Legal:** `/privacy-policy/`, `/terms-conditions/`, `/disclaimer/`

## 4. Navigation

- **Header (desktop, 9 items):** Get Help · Find Help Near Me · Planners · Gifts · Blog · Videos · Memory Lane · Fun & Cards · About, plus the "Ask S.A.L.T." and "Book a free call" buttons. All 9 links work.
- **Mobile menu:** a single "☰ Menu" button that opens the same 9 items plus Work With Us and Contact. It works on phones and has no overflow.
- **Footer:** 4 columns (Get help, Work with us, Planners & shop, contact details), plus social links (YouTube, Threads, Community), Site map, Privacy, Terms and Disclaimer. All links work except Threads, which needs a manual click (see 5.3).

## 5. Broken-link audit

### 5.1 Items that need action

| # | Page | Button / link | Current destination | HTTP status | Correct destination | Fix to implement (Stage 2) | Test result |
|---|---|---|---|---|---|---|---|
| 1 | `/gifts/` | Product card "Titanium Reading Glasses for Men" | `saltonlinestore.com/products/high-quality-pure-titanium-reading-glasses-for-men-…` | **404** | **None verified.** The product is no longer on the store, and no titanium glasses appear in the store's public collections. | Remove the card unless the owner supplies the product's new public URL. **We will not guess a replacement.** | FAIL |
| 2 | `/memory-lane/` | "Old newspapers (1770–1963) — Library of Congress Chronicling America" | `https://chroniclingamerica.loc.gov/` | 200 via redirect | `https://www.loc.gov/collections/chronicling-america/` | Update to the new address so it doesn't rely on the redirect | PASS (works today) |
| 3 | Every page (footer) | "Threads" | `https://www.threads.com/@seniorandlivingtoday` | Not testable (Threads blocks automated tools) | Same | Owner or team: please click once to confirm it is the right profile | MANUAL CHECK |
| 4 | `/` (phone) | 3 small "Try:" suggestion buttons | n/a | n/a | n/a | Raise tap height to at least 44 px for older fingers | Minor accessibility |

There are **no** redirect loops, empty links, placeholder links, `javascript:` links, broken downloads or broken images.

### 5.2 Shopify product and collection links

Every URL below was opened as a normal public web page (not through any API) and returned the correct product page.

| Page(s) | Product | Shopify URL (`www.saltonlinestore.com` + path) | Status | Result |
|---|---|---|---|---|
| Home, Gifts (bib spotlight + grid), blog "Adult bibs guide" | Mealtime Bibs with Crumb Catcher (3-Pack) | `/products/3pcs-lattice-pattern-adult-mealtime-bib-adjustable-waterproof-eldly-dining-bib-with-crumb-catcher-protector-disability-aid-apron` | 200 | PASS |
| Home, Gifts | Heated Neck & Shoulder Wrap | `/products/electric-neck-massager-vibration-shawl-9-levels-hot-compress-neck-winter-warm-back-tool-relax-brace-multi-functional-heating-pad` | 200 | PASS |
| Home, Gifts | Heated Hand Massager | `/products/hand-massager-for-arthritis-carpal-tunnel-heated-air-compression-5-air-compression-modes-kneading-massage-built-in-finger-stretching-gentle-heat-relaxing-hand-care-usb-rechargeable` | 200 | PASS |
| Home, Gifts | Self-Heating Knee Supports | `/products/1-pair-self-heating-support-knee-pads-knee-brace-warm-for-arthritis-joint-pain-relief-and-injury-recovery-belt-knee-massager-pad` | 200 | PASS |
| Home, Gifts | Bifocal Reading Glasses | `/products/photochromic-bifocal-reading-glasses-clear-vision-both-far-and-near-wide-field-of-vision-tr-toughness-frame-unisex-model` | 200 | PASS |
| Home, Gifts | Cat-Eye Reading Glasses | `/products/ladies-cat-eye-reading-eyeglasses-unisex-women-men-anti-blue-light-computer-far-sight-glasses-finished-presbyopia-eyewear-to-4-0` | 200 | PASS |
| Home, Gifts | Large Day & Date Calendar Clock | `/products/12-alarms-digital-led-calendar-clock-with-multi-languages-to-display-medicine-time-reminder-for-elder-home-desk-wall-decoration` | 200 | PASS |
| Home, Gifts | Hands-Free Playing Card Holder | `/products/2-pack-card-holders-for-playing-cards-playing-card-holder-for-adults-seniors-hands-free-card-game-holder-for-arthritis-litt` | 200 | PASS |
| Gifts | Memory Foam Neck Pillow | `/products/u-shape-memory-foam-neck-pillow-snail-travel-neck-pillows-portable-cervical-vertebra-airplanes-noon-break-pillow-relax` | 200 | PASS |
| Gifts | Retro Cat-Eye Readers | `/products/chic-retro-cat-eye-reading-glasses-for-women-men-full-frame-fashion-glasses-decorative-daily-wear-1-0-to-3-5` | 200 | PASS |
| Gifts | **Titanium Reading Glasses for Men** | `/products/high-quality-pure-titanium-reading-glasses-for-men-anti-blue-light-presbyopia-eyewear-with-diopter-0-00-4-00` | **404** | **FAIL** |
| Gifts, Planners | Medication Record & Health Tracker (PDF) | `/products/medication-record-health-information-tracker-fillable-pdf-bundle` | 200 | PASS |
| Gifts, Planners | Medical Appointment Planner (PDF) | `/products/medical-appointment-planner-fillable-pdf-bundle` | 200 | PASS |
| Gifts, Planners | Caregiver Hand-Off Organizer (PDF) | `/products/caregiver-handoff-family-care-organizer-fillable-pdf-bundle` | 200 | PASS |
| Gifts, Planners | Daily Care Log (PDF) | `/products/daily-care-log-fillable-pdf-bundle` | 200 | PASS |
| Gifts, Planners | Grief & Gentle Healing Journal (PDF) | `/products/grief-gentle-healing-fillable-journal` | 200 | PASS |
| Gifts, Planners | Everyday Care & Clarity Companion (PDF) | `/products/everyday-care-clarity-companion-fillable-senior-caregiver-planner` | 200 | PASS |
| Home, Gifts | "Shop the SALT store" / "See more gifts" | `/collections/gifts-for-seniors` | 200 (15 products) | PASS |
| Gifts, Planners, Greeting cards, Caregiver pages, 2 blog posts | "All digital products" / store links | `/collections/digital-products` | 200 | PASS |
| Footer, Caregiver Connection | "SALT Online Store" | `/` (store home page) | 200 | PASS |

**Books found on the Shopify store** (public pages verified, 200), which can power "Buy This Book" in Stage 5:

| Book | Shopify URL |
|---|---|
| Relics of the Century | `/products/relics-of-the-century-book` |
| The Living Legacy Planner: Military Deployment & Family Readiness Edition | `/products/living-legacy-planner-military-deployment-family-readiness-edition` |
| The Daily Bloom: A Life Balance Guide (Courtney R. Jones) | `/products/the-daily-bloom-life-balance-guide` |
| 3-6-9 Focus Journal (fillable & printable) | `/products/3-6-9-focus-journal-21-day-guided-writing-practice` |

> **The original *Living Legacy Planner* is not on the Shopify store.** It is only on Amazon (`amazon.com/dp/B0D4JDBFYQ`, verified).

### 5.3 All external links

The full table of all 88 external destinations (pages, link text, URL, status, how tested, result) is in **`docs/audit/stage1-external-links.csv`**.

- 43 passed a direct HTTP check.
- 43 more are sites the development sandbox can't reach (YouTube, Amazon, Calendly, Medicare.gov and others). These were opened in a real browser through Firecrawl, and every one loaded the correct page: all 12 of Courtney's YouTube videos, the YouTube channel, both Calendly booking pages, the 3 Amazon books, the Amazon author page, Medicare (3 pages), NAELA, LawHelp, SHIP, Eldercare Locator, BenefitsCheckUp, Internet Archive (4), the Great 78 Project, the senior-living quiz and Google Maps search.
- The 10 Google Maps "near me" links all use the same search format; one was opened and works, so the format is confirmed.

## 6. Brand colours (input for Stage 2)

**Brand references found:**
- **Logo:** bright yellow `#FFF000` with a golden-orange shadow (about `#F8B000`) on a transparent background.
- **Previous WordPress website** (archived copy): navy blue `#223A66` and golden yellow `#FFA701`.
- **Facebook:** the page can't be read by automated tools. **Please send 2–3 recent Facebook post images** so the exact blue can be confirmed.

**Off-brand colours currently on the site:**
- Forest green (`#47704C` and shades): header top bar, footer, headings and several buttons.
- Plum (`#5A1F3C`): the holiday section, prices and dark sections.
- Pink/berry (`#CC3366`): the main buttons, labels, handwriting accents and the Ask S.A.L.T. button.
- Lavender and pink tints: home page tiles and the greeting card UI.
- Purple: the AI badge.
- Amazon orange (`#FF9900`): the "Buy on Amazon" buttons.

**Not brand colours (recommend keeping):**
- The 14 crayon colours in the coloring book.
- The colour themes inside the greeting card designs, which are user choices.
- Google's own "G" icon colours.

## 7. Existing features inventory

| Feature | Where | How it works today | Gaps vs. the new brief |
|---|---|---|---|
| Online coloring book | `/games/#color` | 16 pictures, 14 colours, undo, start over, print (print hides the website menus) | No name/email step, no completion message, no download (print only) |
| Memory match | `/games/#match` | 8 pairs of nostalgic icons, turn counter, "You found them all!" line when all pairs are found | No celebration, no score card to download/print, no name/email |
| Greeting card maker | `/greeting-cards/` | 9 occasions, photo upload, fonts, stickers, print, PDF download (jsPDF), share | Works well; recolour UI to brand |
| Memory Lane | `/memory-lane/` | Flip cards ("remember when?") and links to public archives | Recolour; respects reduced-motion |
| Senior living quiz | `/community/`, guide page | External GoHighLevel widget (`app.globalcreativeservices.us`) | Outside our code; can't add celebrations inside it |
| Ask S.A.L.T. AI helper | Every page | Vercel function + NVIDIA AI, with built-in quick answers if the AI is off | Recolour |
| Find Help Near Me | `/find-help/` | ZIP code + need → Google Maps search + trusted directories, with Google/AI disclaimers | Recolour |
| Books | `/books/living-legacy-planner/`, `/books/relics-of-the-century/`, `/planners/` | Info pages with "Buy on Amazon" buttons | No online reader, no Shopify "Buy This Book" link yet |
| Downloads | `/planners/` | One free PDF ("Free daily planner") on the business's GoHighLevel media storage, opens directly with no email step | Only one free download; no resources hub |
| Forms | — | Only search/tool forms (Ask, Find Help, card maker). **No contact, newsletter or registration form; nothing is stored.** Contact uses phone, email and Calendly. | Email capture must be built (Stage 6) |
| Animations | Global | Button and card hover lifts, smooth scroll (turned off for reduced-motion), Memory Lane card flip | No entrance animations or celebrations yet |

## 8. Quality, SEO and accessibility snapshot

- Every page has a unique title and description, one H1, a canonical URL and structured data; the sitemap and robots.txt are present.
- Body text is 19 px in Atkinson Hyperlegible; main buttons are 54 px tall.
- 3 buttons on the home page are under 44 px tall on phones (see 5.1 #4).
- The only motion that reduced-motion settings switch off today is smooth scrolling and the Memory Lane flip. New animations will all respect reduced-motion.
- No JavaScript errors, on desktop or phone, on any of the 47 pages.

## 9. Decisions and materials needed from the owner

1. **Titanium Reading Glasses:** remove the card, or send the product's new public Shopify link.
2. **Brand blue:** confirm navy `#223A66` (from the previous website) or send Facebook post images to match.
3. **Books, where "Buy This Book" should go.** Earlier guidance was "planners go to Amazon only"; the new brief says Shopify.
   - **Relics of the Century, the Military Edition and The Daily Bloom** are on both Amazon and the store. Which should the button use?
   - **The original Living Legacy Planner** is only on Amazon, so its button can only go there unless it's added to the store.
4. **Free online reading:** please supply the authorised reading files (manuscripts or PDFs) for each book you want readable online, and confirm which books.
   - **Protection is limited.** On a website, an email sign-up step is a "soft gate": it can't make a book truly copy-proof.
   - **Recommended:** publish selected chapters or excerpts online, rather than whole books that are also for sale.
5. **Email storage and marketing platform.** The free planner is hosted on GoHighLevel's media storage, which suggests the business already uses GoHighLevel (via Global Creative Services).
   - **Recommendation:** send sign-ups to that existing account through a GoHighLevel form or inbound webhook. That avoids any new paid service.
   - **Please confirm:** that the account exists, and who can create a form or webhook in it.
6. **$100 / 10% reward:** no work will start until the terms are approved (as the brief requires).
7. **Store credit guide:** I will check the store's actual customer account and checkout setup (read-only) before writing it.

## 10. Stage 2 status

The brand palette work and the "Buy Now" / "Shop Now" button labels were started and are saved on a separate branch, `brand-blue-yellow`. Nothing has been pushed or deployed. It will be finished and shown to you for review, through a Vercel preview link and screenshots, before anything goes live.
