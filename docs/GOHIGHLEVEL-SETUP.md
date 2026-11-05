# Connecting the website to GoHighLevel

The website adds game players and winners to the **"Senior and living today"** GoHighLevel sub-account (location ID `sbVe09zoUWLiPTabYb5A`). That's all it does. GoHighLevel sends the emails, and the team adds the $100 store credit in Shopify by hand.

Until the key below is added, nothing is saved, and winners are asked to call instead of being shown the $100 voucher.

## 1. Create the key (about 3 minutes)

1. Log in to GoHighLevel and switch to the **Senior and living today** sub-account.
2. Go to **Settings → Private Integrations → Create new Integration**.
3. **Name:** `seniorandlivingtoday.com website`.
4. **Scopes:** tick **View Contacts** (`contacts.readonly`) and **Edit Contacts** (`contacts.write`). Nothing else is needed.
5. Click **Create**, then **copy the token** (it starts with `pit-`). Keep it private.

## 2. Add the key to Vercel

1. Open **Vercel → the website project → Settings → Environment Variables**.
2. Add **Key:** `GHL_PRIVATE_TOKEN`, **Value:** the token. Tick **Production** and **Preview**.
3. Go to **Deployments**, open the latest deployment, click **⋯ → Redeploy**.

## 3. What the website adds to GoHighLevel

| When | Contact | Tags added |
|---|---|---|
| Someone signs up on the Games page | Created, or updated if the email already exists, with first name and email | `website`, `games`, plus `marketing-opt-in` if they ticked the news box |
| Someone wins a game | Same contact | `game-winner`, `reward-100-store-credit` |

Existing tags are never removed. To find winners, filter contacts by the tag **`reward-100-store-credit`**.

## 4. The team's manual steps for each winner

1. **In GoHighLevel:** find the contact with the tag `reward-100-store-credit`. To give only one reward per email, skip anyone you've already marked, for example with a `reward-sent` tag.
2. **In Shopify admin → Customers:** search for the winner's email.
   - If the customer doesn't exist yet: click **Add customer**, enter their first name and **the same email**, and save.
3. **On that customer's page → Store credit:** issue **$100**.
4. **In GoHighLevel:** add the tag `reward-sent`, and send (or let your automation send) the "how to use your SALT Store Credit" email.
   - The website guide for customers is at `https://www.seniorandlivingtoday.com/store-credit/`.

The website tells winners their credit arrives **within 24–48 hours**, so please aim to finish these steps in that time.

## 5. Test it

1. Open `https://www.seniorandlivingtoday.com/games/`.
2. Sign up with your own email and win an Easy game.
3. Check:
   - The screen shows the $100 voucher, not "please call us".
   - In GoHighLevel, the contact appears with the tags `website`, `games`, `game-winner`, `reward-100-store-credit`.

## Notes

- **The website keeps no names or emails.** Everything is in GoHighLevel.
- **If the key ever leaks,** delete it in Private Integrations and create a new one.
- **The 10% rule isn't automatic.** Shopify store credit does not limit itself to 10% per order. That rule is handled by how the team issues or monitors the credit.
