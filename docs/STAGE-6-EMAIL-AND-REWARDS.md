# Stage 6: Email sign-ups and customer rewards

## Where visitors give their name and email

| Place | What they get | GoHighLevel tags | Marketing consent |
|---|---|---|---|
| **Games page** (`/games/`), required to play | Play the games; a $100 coupon code reward when they win | `website`, `games` (+ `game-winner`, `reward-100-coupon` on a win) | Separate, optional, unticked box |
| **Read online** (`/read/<book>/`), required to read | Free online reading | `website`, `books`, `reader`, `reading-<book>` | Separate, optional, unticked box |
| **Newsletter band** (above the footer on every page) | Tips by email | `website`, `newsletter`, `marketing-opt-in` | The sign-up itself is the consent, stated next to the button |
| **Downloads** (Stage 7) | Printable resources | `website`, `resources` | Separate, optional box |

Only **first name and email** are ever asked for.

## How the details are stored (secure)

- **One place:** the forms send details only to the website's own server function (`/api/register`). That function saves them in the **Senior and living today GoHighLevel sub-account** (create or update the contact by email, then add tags).
- **Nothing kept anywhere else:** the website keeps **no copy**. No email addresses in GitHub, in the code, or in the visitor's browser. The browser remembers only a first name for the visit, plus reading settings.
- **Protection on every form:**
  - checks that the email looks real;
  - a hidden "bot trap" field;
  - only this website can send sign-ups;
  - a limit on repeat tries;
  - double-clicks can't send the form twice.
- **The key is secret:** the GoHighLevel key lives only in Vercel's secret settings (`GHL_PRIVATE_TOKEN`). See `GOHIGHLEVEL-SETUP.md`.
- **No new paid services** were added.

## Unsubscribing

- **Every email:** GoHighLevel adds an unsubscribe link to every marketing email it sends. Keep that link in your templates.
- **By request:** the privacy policy (section "Games, reading, download and newsletter sign-ups") explains that people can unsubscribe with one click or email to be removed.
- **To remove someone by hand:** open the contact in GoHighLevel and turn on **DND for Email**, or delete the contact.

## Customer reward: what's live and approved

- **When:** after a visitor wins a game, as long as the win was recorded in GoHighLevel.
- **On screen:** "OH YEAH! YOU WON!" and a **SALT Membership Reward Voucher** with:
  - their name;
  - "You won a $100 coupon code!";
  - "emailed to you within 24–48 hours";
  - their email, partly hidden;
  - "one reward per email address".
- **Team process (manual):** filter GoHighLevel by `reward-100-coupon`. Create a $100 discount code in Shopify, email it to the winner, and tag the contact `reward-sent`.
- **Customer guide:** `/coupon-code/`, plus the printable PDF.

### Open decision

- **Wins are checked on the player's own device,** so a technical person could fake one. Keep "one reward per email" and glance at new winners before sending codes.
