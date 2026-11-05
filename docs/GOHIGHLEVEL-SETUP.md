# Connecting the website to GoHighLevel

The website saves game sign-ups and winners straight into the **"Senior and living today"** GoHighLevel sub-account (location ID `sbVe09zoUWLiPTabYb5A`). Until the key below is added, nothing is saved, and winners are asked to call instead of being promised the $100 credit.

## 1. Create the key (about 3 minutes)

1. Log in to GoHighLevel and switch to the **Senior and living today** sub-account.
2. Go to **Settings → Private Integrations → Create new Integration**.
3. **Name:** `seniorandlivingtoday.com website`.
4. **Scopes:** tick **View Contacts** (`contacts.readonly`) and **Edit Contacts** (`contacts.write`). Nothing else is needed.
5. Click **Create**, then **copy the token** (it starts with `pit-`). Keep it private: don't email it or paste it into chat.

## 2. Add the key to Vercel

1. Open **Vercel → the website project → Settings → Environment Variables**.
2. Add **Key:** `GHL_PRIVATE_TOKEN`, **Value:** the token you copied. Tick **Production** and **Preview**.
3. Go to **Deployments**, open the latest deployment, click **⋯ → Redeploy**.

## 3. What arrives in GoHighLevel

| When | Contact | Tags added | Note |
|---|---|---|---|
| Someone signs up on the Games page | Created or updated by email, with first name | `website`, `games`, plus `marketing-opt-in` if they ticked the news box | — |
| Someone wins a game | Same contact | `game-winner`, `reward-100-store-credit` | "Website game win: $100 SALT Store Credit", with game, level, turns, time and a to-do for the team |

Existing tags are never removed.

## 4. Build the reward workflow

1. Go to **Automation → Workflows → Create Workflow → Start from scratch**.
2. **Trigger:** *Contact Tag*, **Tag Added** = `reward-100-store-credit`.
3. **If/Else:** contact **has tag** `reward-sent`?
   - **Yes:** do nothing (one reward per email address).
   - **No:** continue with the steps below.
4. **Internal notification** to the team: "Issue $100 store credit in Shopify for {{contact.email}}".
5. **Send Email** to the contact with your step-by-step "how to use your SALT Store Credit" email. The website guide is at `https://www.seniorandlivingtoday.com/store-credit/`.
6. **Add Tag** `reward-sent`. Do this after the credit is issued, or at the end of the workflow if the team issues credit from the notification.
7. **Publish** the workflow.

## 5. Test it

1. Open `https://www.seniorandlivingtoday.com/games/`.
2. Sign up with your own email and win an Easy game.
3. Check:
   - The screen shows the $100 voucher, not "please call us".
   - In GoHighLevel, the contact appears with the tags and the note.
   - The workflow runs.

## Notes

- **Issuing the credit is a manual step.** The $100 store credit itself is issued in **Shopify → Customers → (customer) → Store credit**. The website does not connect to Shopify.
- **The 10% rule isn't automatic.** Shopify store credit does not limit itself to 10% per order. See the open decision in the Stage 4 report.
- **The website keeps no copy of names or emails.** If the key ever leaks, delete it in Private Integrations and create a new one.
