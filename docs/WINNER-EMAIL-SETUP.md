# Winner emails: unique $100 coupon codes

When someone wins a game, the website:

1. saves the winner in GoHighLevel (tags `game-winner` and `reward-100-coupon`);
2. runs the safety checks below;
3. creates a **unique, single-use $100 code** in Shopify (for example `SALT100-K7M3QX9P`);
4. saves the code on the contact in the **SALT Coupon Code** field;
5. adds the tag **`reward-code-sent`**.

That tag starts a GoHighLevel workflow, which emails the code to the winner. It usually arrives within a few minutes.

## What each code is

| Setting | Value |
|---|---|
| Amount | $100 off the whole order |
| Uses | 1 use in total (one order) |
| Expires | 90 days after the win (change with `REWARD_CODE_DAYS`) |
| Minimum order | None |
| Combines with other discounts | No |
| Shopify tag | `salt-game-reward` (find them all in Shopify → Discounts) |

## Safety checks

| Check | What happens if it fails |
|---|---|
| **One code per email.** Contacts already tagged `reward-code-sent` get nothing new. | The winner sees "already sent to your email". |
| **Signed up first.** The win must come from a player who signed up on the page (a signed token). | The win is held for approval. |
| **Real play time.** At least 30 seconds between sign-up and win (`REWARD_MIN_PLAY_SECONDS`). | The win is held for approval. |
| **Daily cap.** At most 10 codes in any 24 hours (`REWARD_DAILY_CAP`). | The win is held for approval. |

Held winners get the tag **`reward-needs-approval`** and see "emailed within 24–48 hours". To approve one, add the tag **`reward-approved`**. The code is then created and emailed automatically (workflow 2 below).

---

## One-time setup (about 20 minutes)

### Step 1. Shopify: create the "Website rewards" app

This app can **only** create and read discount codes. It cannot see or change products, prices, orders or customers.

1. Sign in at **dev.shopify.com** with the account that owns the SALT store, then open **Apps → Create app**. Name it `Website rewards`.
2. Under **Versions**, create a version and set **Access scopes** to `write_discounts` and `read_discounts` only. **Release** it.
3. **Install** the app on the SALT store (`0309d3-72.myshopify.com`).
4. Open the app's **Settings** and copy the **Client ID** and **Client secret**.

The app and the store must be in the same Shopify organization. If you get a "shop_not_permitted" error, the app was made under a different organization.

### Step 2. Vercel: add the keys

Go to **Vercel → Project → Settings → Environment Variables** and add these, for Production:

| Name | Value |
|---|---|
| `SHOPIFY_STORE_DOMAIN` | `0309d3-72.myshopify.com` |
| `SHOPIFY_CLIENT_ID` | from step 1 (**secret**) |
| `SHOPIFY_CLIENT_SECRET` | from step 1 (**secret**) |
| `REWARD_APPROVE_SECRET` | a long random password you make up, at least 16 characters (**secret**) |
| `REWARD_DAILY_CAP` | optional; default `10` |
| `REWARD_CODE_DAYS` | optional; default `90` |
| `REWARD_MIN_PLAY_SECONDS` | optional; default `30` |

Then **Redeploy**. Never paste these keys in chat, email or GitHub.

### Step 3. GoHighLevel: custom fields and permissions

1. In the **Senior and living today** sub-account, go to **Settings → Custom Fields → Add Field → Contact**.
   - **SALT Coupon Code**: single-line text. Its key must be `contact.salt_coupon_code`.
   - **SALT Coupon Expires**: single-line text, key `contact.salt_coupon_expires` (optional, for showing the expiry date in the email).
2. Under **Settings → Private Integrations**, open the website's integration and make sure it has these scopes:
   - View Contacts
   - Edit Contacts
   - View Custom Fields

   Add any that are missing. If GoHighLevel gives you a new token, update `GHL_PRIVATE_TOKEN` in Vercel and redeploy.

### Step 4. GoHighLevel workflow 1: "Send $100 coupon email"

- **Trigger:** Contact Tag → Tag added → `reward-code-sent`
- **Action:** Send Email, using the template below
- Optional: **Wait 3 days**, then send a reminder if the code hasn't been used (see "Reminder email" below)

**Subject:** `{{contact.first_name}}, here's your $100 SALT Online Store coupon code 🎉`

**Body:**

> Hi {{contact.first_name}},
>
> **OH YEAH, YOU WON!** Congratulations, and thank you for playing at Senior and Living Today.
>
> Here is your coupon code, worth **$100** at the SALT Online Store:
>
> ## {{contact.salt_coupon_code}}
>
> **How to use it:**
> 1. Go to **www.saltonlinestore.com** and add the items you love to your cart.
> 2. Tap **Check out**. Sign in with this email address; the store emails you a short sign-in code (no password needed).
> 3. Find the box that says **"Discount code or gift card"**, type your code exactly as shown above, and tap **Apply**.
> 4. Pay anything left with your usual method, then tap **Pay now**.
>
> Your code can be used once, on one order, until **{{contact.salt_coupon_expires}}**.
>
> Need a hand? Our step-by-step guide is at seniorandlivingtoday.com/coupon-code, or call us at **(888) 416-4264** and we'll walk you through it.
>
> Happy shopping!
> Courtney and the Senior and Living Today team

If you didn't create the "SALT Coupon Expires" field, delete the "until …" sentence.

**Reminder email (optional):** "Hi {{contact.first_name}}, just a friendly reminder: your $100 code **{{contact.salt_coupon_code}}** is waiting for you at www.saltonlinestore.com."

### Step 5. GoHighLevel workflow 2: "Approve held reward"

- **Trigger:** Contact Tag → Tag added → `reward-approved`
- **Action:** Webhook (or Custom Webhook)
  - Method: **POST**
  - URL: `https://www.seniorandlivingtoday.com/api/approve-reward?key=YOUR_REWARD_APPROVE_SECRET`
  - The standard webhook payload already includes `contact_id`, which is all the website needs.

The website then creates the code and adds `reward-code-sent`, so workflow 1 sends the email.

### Step 6. Test it once

1. Use **your own email** to sign up on the Games page and win a Memory Match game. Take at least 30 seconds.
2. Within a minute you should see:
   - in GoHighLevel, the contact with your code in **SALT Coupon Code** and the tag `reward-code-sent`;
   - in Shopify → Discounts, a new **SALT game reward $100** code;
   - the email in your inbox.
3. Delete the test code in Shopify, so it can't be used.

---

## Daily routine (2 minutes)

- In GoHighLevel, filter by **`reward-needs-approval`**. For each one, check that they look genuine (a real name, not dozens of similar emails), then add **`reward-approved`**.
- Now and then, look at Shopify → Discounts, filtered by the tag `salt-game-reward`, to see how many codes were made and used.

## If something goes wrong

- **Shopify keys missing or wrong:** winners are held with `reward-needs-approval` (or, with no keys at all, the old manual process applies). Nobody is told they've been emailed when they haven't.
- **Code made but not saved in GoHighLevel:** the contact is held for approval. The code is still in Shopify → Discounts, under the title "SALT game reward $100 (SALT100-…)". Send it by hand, or delete it and approve the winner again.

## Known limits

- **Wins are counted in the player's browser,** so a determined person could fake one. The checks above limit the damage to the daily cap, and each code works only once.
- **"One per email" goes by exact address.** Someone could use several addresses (for example `name+1@gmail.com`). The daily cap and your daily review cover this.
