// Issues a game winner's $100 coupon code and hands it to GoHighLevel, which emails it.
//
//   1. One code per contact: anyone already tagged "reward-code-sent" gets nothing new.
//   2. Safeguards (skipped when the team approves by hand): the win must come with a genuine
//      play token, and no more than REWARD_DAILY_CAP codes (default 10) are made in 24 hours.
//      Anything that fails a safeguard is tagged "reward-needs-approval" for the team.
//   3. Create the code in Shopify, save it on the contact ("SALT Coupon Code" field), then add
//      the tag "reward-code-sent". That tag starts the GoHighLevel workflow that sends the email.
import { getContact, addTags, removeTags, setCustomFields, couponFieldIds } from './ghl.js';
import { shopifyConfigured, rewardsInLast24h, createRewardCode } from './shopify-reward.js';

export const TAG_SENT = 'reward-code-sent';
export const TAG_REVIEW = 'reward-needs-approval';
const busy = new Set(); // stops double clicks creating two codes on the same server instance

const lower = (tags) => (tags || []).map((t) => String(t).toLowerCase());
const friendlyDate = (d) => d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' });

/**
 * @param {{ contactId: string, eligible?: boolean, approved?: boolean, reason?: string }} o
 * @returns {Promise<{ status: 'sent'|'pending'|'already'|'manual', reason?: string }>}
 */
export async function issueReward({ contactId, eligible = false, approved = false, reason = '' }) {
  if (!shopifyConfigured()) return { status: 'manual' }; // codes are still made and sent by hand
  if (busy.has(contactId)) return { status: 'pending', reason: 'in-progress' };
  busy.add(contactId);
  const review = async (why) => {
    await addTags(contactId, [TAG_REVIEW]).catch((e) => console.error('reward: tag failed', e.message));
    console.warn('reward held for approval:', why);
    return { status: 'pending', reason: why };
  };
  try {
    const contact = await getContact(contactId);
    if (!contact) return review('contact-not-found');
    if (lower(contact.tags).includes(TAG_SENT)) return { status: 'already' };

    if (!approved) {
      if (!eligible) return review(reason || 'not-eligible');
      const cap = Math.max(0, Number(process.env.REWARD_DAILY_CAP ?? 10));
      if ((await rewardsInLast24h()) >= cap) return review('daily-cap');
    }

    const fields = await couponFieldIds();
    if (!fields) return review('coupon-field-missing'); // create "SALT Coupon Code" in GoHighLevel first

    const { code, endsAt } = await createRewardCode();
    try {
      await setCustomFields(contactId, [
        { id: fields.code, field_value: code },
        ...(fields.expires ? [{ id: fields.expires, field_value: friendlyDate(endsAt) }] : []),
      ]);
      await addTags(contactId, [TAG_SENT]); // starts the "send the coupon email" workflow
    } catch (e) {
      // The code exists in Shopify but couldn't be saved on the contact: the team must send it by hand.
      console.error(`reward: code ${code} created but not saved in GoHighLevel:`, e.message);
      return review('save-failed');
    }
    await removeTags(contactId, [TAG_REVIEW]).catch(() => {});
    return { status: 'sent' };
  } catch (e) {
    console.error('reward failed:', e.message);
    return review('error');
  } finally {
    busy.delete(contactId);
  }
}
