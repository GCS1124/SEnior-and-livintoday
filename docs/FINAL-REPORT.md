# Senior and Living Today: Final Project Report

**Website:** https://www.seniorandlivingtoday.com · **Repository:** GCS1124/SEnior-and-livintoday · **Date:** November 5, 2026

Each stage was built on its own review branch, checked by the owner through a Vercel preview, and then merged into `main`, which deploys to the live site. All stages, including Stage 8 (this report and its fixes) and the coupon code change, are live.

---

## 1. What was delivered

| Stage | Delivered | Status |
|---|---|---|
| 1. Audit | Full audit of 47 pages and 3,200 links (`docs/audit/STAGE-1-AUDIT.md`, `stage1-external-links.csv`) | Done |
| 2. Links and brand | Navy blue `#223A66` and golden yellow everywhere; no pink, green or purple. **Buy Now** / **Shop Now** buttons. Discontinued product removed. No Shopify API. | Live |
| 3. Navigation, motion, games | Gentle fade-ins, floating decorations, Back to top, a friendlier phone menu. Coloring book with named colors. Memory match with 3 levels and kind feedback. Everything respects reduced motion. | Live |
| 4. Celebrations | Name + email sign-up required to play. "OH YEAH! YOU WON!" celebration with navy/gold confetti. SALT Membership Reward Voucher for a **$100 coupon code** (PDF download and print), shown only when the win is recorded. "Why we started the SALT Online Store" story, `/coupon-code/` guide, Living Legacy Planner **Color Edition** added. | Live |
| 4b. Product links | Every product URL re-checked by browsing www.saltonlinestore.com as a shopper. A product no longer listed publicly was replaced. **Shop more at www.saltonlinestore.com** buttons added. | Live |
| GoHighLevel | Sign-ups and winners saved straight into the "Senior and living today" sub-account as contacts with tags (`website`, source, `marketing-opt-in`, `game-winner`, `reward-100-coupon`, `reader`, `reading-<book>`, `newsletter`, `resources`) | Live; **needs the key** (see section 4) |
| 5. Online reading | `/books/` library (Read Free Online + Buy This Book). `/read/<book>/` reader with page turning, contents, text size, roomier lines, light/cream/dark, progress bar, resume, keys and swipe. Book text only served after sign-up through a signed 30-day pass; never a public file. | Live; real books wait for their text |
| 6. Email capture | Newsletter sign-up on every page. Privacy policy section. `docs/STAGE-6-EMAIL-AND-REWARDS.md` | Live |
| 7. Coupon guide and printables | 5-page large-print PDF guide (`/downloads/salt-coupon-code-guide.pdf`). `/coupon-code/` page following the store's real checkout (sign in by email code, "Discount code or gift card" box). Video script (`docs/COUPON-VIDEO-SCRIPT.md`). `/resources/` Free Printables page (daily planner unlocks after sign-up). | Live |
| 8. QA | Full test pass and the fixes listed below | Live |

## 2. Stage 8 quality check: results

| Check | Result |
|---|---|
| Build | Passes. 51 pages. |
| SEO check (titles, descriptions, one H1, canonicals) | 0 errors, 0 warnings on all 51 pages |
| Internal links | 0 broken (3,782 links checked). The only flag is a known false alarm on the 404 page's skip link. |
| Shopify links | All 19 product URLs are publicly listed on www.saltonlinestore.com and open (200). Home page and 2 collections open (200). |
| New external links | Amazon Color Edition, Library of Congress, store books and knee wrap: all verified |
| Accessibility (axe-core, WCAG 2.2 AA) | **0 violations** on all 51 pages, desktop and phone, plus after sign-up and with the celebration open |
| Lighthouse (home, gifts, games, books, store credit/coupon page) | Performance 94–100 (mobile), 99–100 (desktop). **Accessibility 100. Best practices 100. SEO 100** after fixes. |
| JavaScript errors, phone overflow | None, on any page, desktop or phone |
| Keyboard | "Skip to main content" is the first Tab stop. Games play by keyboard. The celebration closes with Escape. The reader turns pages with the arrow keys. |
| Games, celebration, voucher | Sign-up gate; win only on real completion, sent once per visit; PDF voucher; print shows the voucher only; behaves correctly when GoHighLevel isn't connected |
| Reading | Gate, all reader controls, resume, phone swipe, end-of-book buy button. Live API confirmed protected (401 without a pass). |
| Newsletter, printables, guide PDF | All tested. No email ever stored in the browser. |
| Sign-up / reader APIs | Validation, bot trap, origin check, rate limit, pass checks (valid, missing, fake, other book, expired, path tricks) all pass |
| Sitemap / robots | Sitemap includes new public pages and leaves out noindex reader pages. robots.txt allows crawling. |

### Fixes made in Stage 8

1. **Coloring tools (gated):** inert until sign-up, so keyboards and screen readers skip them too, not only faded.
2. **Picture chooser:** now a proper button group with "pressed" states, instead of a broken "tab list".
3. **Library title cover:** text made readable (it was navy on navy).
4. **"OH YEAH!":** now on a gold pill, for readable contrast.
5. **Link text:** "Learn more" now reads "How search and AI answers work".
6. **Sitemap:** reader pages removed (they're noindex).
7. **Reader API:** finds book files reliably, wherever it runs.

## 3. Files of note

- **Docs:** `docs/GOHIGHLEVEL-SETUP.md`, `docs/ADDING-BOOKS.md`, `docs/STAGE-6-EMAIL-AND-REWARDS.md`, `docs/COUPON-VIDEO-SCRIPT.md`, `docs/audit/`
- **Server:** `api/register.js` (sign-ups to GoHighLevel), `api/read.js` + `api/_lib/reading-pass.js` (reader)
- **Books:** `books/*.md` → `api/_books/*.json` (built by `scripts/build-books.mjs`)
- **Coupon guide source:** `guides-src/coupon-code-guide.html` → PDF via `scripts/build-guide-pdf.mjs`

## 4. Owner actions still needed

| # | Action | Why |
|---|---|---|
| 1 | **Send the GoHighLevel form link** (or add `GHL_PRIVATE_TOKEN` in Vercel; see `GOHIGHLEVEL-SETUP.md`) | Until then, nothing is saved: winners don't see the voucher, and books can't open |
| 2 | **Create a $100 discount code** in Shopify for each winner, and email it within 24–48 hours | The reward is sent by hand |
| 3 | **Choose the coupon code's limits** in Shopify, for example one use per customer | Set in Shopify when creating each code |
| 4 | **Send the book text** (attach here, or a public Drive link), whole or a few chapters each | Books show "coming soon" until then |
| 5 | **Send 4–6 inside pages of the Color Edition** | For a "look inside" viewer |
| 6 | **Review the privacy policy wording** for sign-ups | Legal text |
| 7 | **Click the Threads link once** in the footer | Threads blocks automated checks |
| 8 | **Record the coupon video** (script ready) | Optional |
| 9 | **Add the GA4 measurement ID** if you want Google Analytics | Optional; the site is ready for it |

## 5. Known limitations

- **Wins are counted on the visitor's device,** so a technical person could fake one. Keep "one reward per email" in GoHighLevel and glance at winners before issuing credit.
- **The reading gate is "soft".** A signed-up reader can copy on-screen text. Consider putting a few chapters online rather than whole books you sell.
- **The free daily planner** lives on a public GoHighLevel link, so the sign-up gate is light.
- **The PageSpeed Insights website** hit its shared daily limit during testing, so the same Lighthouse engine was run locally against the built site. Re-check at pagespeed.web.dev after launch for real-world numbers.
- **Facebook posts couldn't be read** by tools. The brand blue was taken from the previous website and the logo.

## 6. Change after Stage 8

- **The reward is now a coupon code worth $100,** emailed by the team by hand. It used to be "store credit".
  - The voucher, the celebration, the story, the guide page (now `/coupon-code/`, with `/store-credit/` forwarding there), the PDF and the video script were all updated.
  - The 10%-per-order wording was removed.
  - GoHighLevel winners are tagged `reward-100-coupon`.

## 7. Stage 9: automatic winner emails

- Each winner gets a **unique, single-use $100 code**, created in Shopify by the website and emailed by a GoHighLevel workflow. It usually arrives within minutes.
- **Safety checks:**
  - one code per email;
  - signed up before winning;
  - at least 30 seconds of play;
  - at most 10 codes a day.
- Wins that fail a check are tagged `reward-needs-approval`. Adding `reward-approved` sends the code.
- The Shopify app can only create and read discount codes.
- **Setup:** `docs/WINNER-EMAIL-SETUP.md` (Shopify app, Vercel keys, GoHighLevel fields and two workflows, the email template).
