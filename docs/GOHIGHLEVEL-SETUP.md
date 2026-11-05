# Sign-ups, GoHighLevel and the $100 coupon code

The website collects **first name and email** when people play the games, read online, download printables or join the newsletter. The details go to the **"Senior and living today"** GoHighLevel sub-account (location ID `sbVe09zoUWLiPTabYb5A`).

**Winner emails are automatic** once Shopify is connected: each winner gets a unique **coupon code worth $100**, created in Shopify and emailed by a GoHighLevel workflow. See **`docs/WINNER-EMAIL-SETUP.md`**. Until that's set up, the team sends codes by hand using the steps at the end of this page.

## How sign-ups reach GoHighLevel

The owner will provide a **GoHighLevel form link**, and the website's sign-up will then be connected to that form. Until then, either of these turns saving on:

- **Option A: your GoHighLevel form** (preferred by the owner). Send the form's link, and the website's sign-up will submit to it.
- **Option B: a GoHighLevel key** (already built in, about 3 minutes):
  1. In GoHighLevel, open the Senior and living today sub-account.
  2. Go to **Settings → Private Integrations → Create new Integration**, tick **View Contacts** and **Edit Contacts**, then create it and copy the token (`pit-…`).
  3. In **Vercel → Settings → Environment Variables**, add `GHL_PRIVATE_TOKEN` = the token.
  4. **Redeploy.**

Until one of these is in place, nothing is saved. Winners see a friendly "please call us" message instead of the voucher, and books can't open.

## What arrives (Option B)

| When | Tags added to the contact |
|---|---|
| Sign up on the Games page | `website`, `games` (+ `marketing-opt-in` if ticked) |
| **Win a game** | `game-winner`, **`reward-100-coupon`** |
| Code created and saved (starts the email workflow) | **`reward-code-sent`** |
| Held by a safety check (team approves by adding `reward-approved`) | **`reward-needs-approval`** |
| Sign up to read a book | `website`, `books`, `reader`, `reading-<book>` |
| Printables page | `website`, `resources` |
| Newsletter | `website`, `newsletter`, `marketing-opt-in` |

## Manual steps (only while Shopify isn't connected)

1. In GoHighLevel, filter contacts by **`reward-100-coupon`**. Skip anyone already marked (for example with a `reward-sent` tag), because it's one reward per email address.
2. In **Shopify**, create a discount code worth **$100**. Set the limits you want, for example one use per customer.
3. Email the winner their code within **24–48 hours**, with your simple steps. The customer guide is at `https://www.seniorandlivingtoday.com/coupon-code/`, and a printable PDF is at `/downloads/salt-coupon-code-guide.pdf`.
4. Tag the contact `reward-sent`.
