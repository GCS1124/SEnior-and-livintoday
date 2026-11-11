# Adding a book to "Books & Reading"

The library is at `/books/` and each readable book opens at `/read/<slug>/`. Visitors enter their first name and email (saved to GoHighLevel with the tags `books`, `reader` and `reading-<slug>`), then read page by page.

## Add or update a book (no design work needed)

1. **Cover:** put the image in `public/images/` (for example `public/images/my-book.webp`, about 600 × 860 px).
2. **Text:** create `books/<slug>.md`. The slug is short, lowercase, with hyphens, like `daily-bloom`.

   ```markdown
   ---
   title: "The Daily Bloom"
   author: "Courtney R. Jones"
   ---
   # Chapter one title
   First page text…

   ---
   Second page of chapter one…

   # Chapter two title
   …
   ```

   - `# Title` starts a chapter. It appears in the reader's table of contents.
   - A line with only `---` starts a new page.
   - You can use `## headings`, `**bold**`, `*italic*`, `- lists`, `1. lists`, `> quotes` and `[links](https://…)`.
3. **List it:** in `src/data/library.ts`, add an entry, or switch an existing one to `readable: true`. Use the same `slug`. For **Buy This Book**, use a verified public URL: the SALT Online Store product page if the book is listed there for shoppers, otherwise Amazon.
4. **Push to GitHub.** The build turns the text into reader pages automatically (`scripts/build-books.mjs` → `api/_books/<slug>.json`).

## Good to know

- **Rights:** only publish text you have the right to share.
- **Book text is not a public file.** It's delivered by `/api/read` only to visitors with a valid reading pass (issued after sign-up, valid 30 days). No original PDF is ever exposed.
- **It's a soft gate.** A signed-in reader can still copy text from their screen, the same as any website. For books you sell, consider putting a few chapters online rather than the whole book.
- **Sign-up must be working.** Reading passes need sign-up to be working, which means the `GHL_PRIVATE_TOKEN` setting in Vercel (see `GOHIGHLEVEL-SETUP.md`). Until then, readers see "Online reading is being set up right now".
- **Optional separate secret:** add `READER_SECRET` in Vercel with any long random text to sign reading passes separately from the GoHighLevel key.

## "Look Inside" previews (planners and The Daily Bloom)

Book pages can be previewed without signing up: readers turn a few free pages, then see the rest of the book as locked, blurred thumbnails with a list of every section and the Buy buttons.

- **Where:**
  - `/books/living-legacy-planner/` has all three editions: 1st, 2nd (Color) and Military.
  - `/books/military-edition/` has the Military Edition on its own.
  - `/books/#look-bloom` has The Daily Bloom.
- **Data:** `src/data/planners.ts`. Each edition lists its free `pages`, its `locked` thumbnails and its `sections`.
- **Images:** `public/images/planners/<edition>/`.
  - Free pages are about 1000 px wide.
  - Locked thumbnails are made 24 px wide, then blurred, so they can't be read.
- **Only the free pages are published.** The rest of each book never leaves the PDF.
- **To change which pages are free:**
  1. Export the page from the print PDF (for example, `pdftoppm -r 118 -f 12 -l 12 -png book.pdf out`).
  2. Save it as WebP in the edition's folder.
  3. Add it to `pages` in `planners.ts`.
  4. Mark its section `open: true`.
