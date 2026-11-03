// Site-wide FAQ hub (/faq/). Also published in /llms.txt for AI assistants.
// Keep answers short, factual and in plain English. The first sentence should answer the question.
// No medical, legal or insurance advice: point to the right professional or official source.

export interface FaqItem { q: string; a: string; link?: { href: string; text: string } }
export interface FaqGroup { id: string; title: string; items: FaqItem[] }

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: 'about',
    title: 'About Senior and Living Today',
    items: [
      { q: 'Who is Courtney Jones?', a: 'Courtney Jones is the founder of Senior and Living Today (S.A.L.T.), often called “the caregiver’s caregiver.” She has spent more than 30 years around senior care, including time working in a hospital and years in medical billing, and she wrote The Living Legacy Planner.', link: { href: '/about/', text: 'About Courtney' } },
      { q: 'Is Senior and Living Today a senior living facility?', a: 'No. Senior and Living Today is a consulting and support resource for seniors and family caregivers. We don’t run housing, employ caregivers or provide medical care. We help you understand your options and make a plan.', link: { href: '/services/', text: 'Our services' } },
      { q: 'Do you help families outside of Ohio?', a: 'Yes. Courtney is based in Dayton, Ohio, and works with seniors and caregivers across the United States by phone and video.', link: { href: '/services/senior-care-consulting/', text: 'Senior care consulting' } },
      { q: 'How do I get started?', a: 'Book a free first call or phone (888) 416-4264. Tell us what’s going on, and we’ll work out the next step together.', link: { href: '/contact/', text: 'Book a free call' } },
    ],
  },
  {
    id: 'decisions',
    title: 'Caring for an aging parent',
    items: [
      { q: 'How do I know when an aging parent needs more help?', a: 'Common signs include missed medications or appointments, unpaid bills piling up, falls or new bruises, weight loss, an unusually messy home, spoiled food in the fridge, and getting lost or confused. If you notice changes, talk with your parent and their doctor, and start planning before a crisis.', link: { href: '/services/senior-care-consulting/', text: 'Talk it through with Courtney' } },
      { q: 'What is the difference between a senior care consultant and a placement agency?', a: 'A placement agency mainly helps you choose a senior living community, and many are paid by the communities they refer families to. A senior care consultant looks at the whole situation, including staying at home, family roles, paperwork and hospital stays, and helps you build a plan.', link: { href: '/services/senior-care-consulting/', text: 'How consulting works' } },
      { q: 'How can I help a parent who lives far away?', a: 'Set up a team: a local neighbor or friend who can check in, a written list of doctors and contacts, a spare-key lockbox for emergencies, and regular calls. A senior care virtual assistant can handle appointments, reminders and paperwork from a distance and keep the family updated.', link: { href: '/services/senior-care-virtual-assistant/', text: 'Senior care virtual assistant' } },
      { q: 'Is staying at home (aging in place) a realistic option?', a: 'Often, yes, with the right support. Aging in place usually means making the home safer, arranging help with errands, meals or personal care as needed, and having a plan for emergencies. It works best when the family reviews the plan as needs change.', link: { href: '/guides/types-of-senior-living/', text: 'Senior living options explained' } },
    ],
  },
  {
    id: 'caregivers',
    title: 'Support for caregivers',
    items: [
      { q: 'How can I avoid caregiver burnout?', a: 'Watch for warning signs like constant exhaustion, poor sleep, irritability, getting sick more often and giving up things you enjoy. Share the load with family, take regular breaks, use respite care, join a support group and talk to your own doctor if you’re struggling.', link: { href: '/services/caregiver-support/', text: 'Caregiver support' } },
      { q: 'What is respite care?', a: 'Respite care is short-term help that gives a family caregiver a break. It can be a few hours of in-home help, an adult day program or a short stay in a care community. Your local Area Agency on Aging can tell you what’s available and whether you qualify for help paying for it.', link: { href: '/find-help/?need=local', text: 'Find local senior services' } },
      { q: 'Why does my parent need someone with them in the hospital?', a: 'Hospital staff are often stretched thin. A family advocate can speak up when something is missed, remember what the doctor said and notice changes early. Taking turns on a simple schedule makes it manageable.', link: { href: '/blog/hospital-advocate/', text: 'How to be a hospital advocate' } },
    ],
  },
  {
    id: 'medicare',
    title: 'Medicare and paperwork',
    items: [
      { q: 'When is Medicare Open Enrollment?', a: 'Medicare Open Enrollment runs from October 15 to December 7 each year. Changes you make take effect on January 1. Always confirm dates and options at medicare.gov or by calling 1-800-MEDICARE (1-800-633-4227).', link: { href: '/blog/medicare-advantage-letter-deadline/', text: 'Got a Medicare letter? Read this' } },
      { q: 'What should I do if my Medicare Advantage plan is ending?', a: 'Read the letter, keep it, and note the date your coverage ends. When a plan leaves Medicare or your area, you usually get extra time (a Special Enrollment Period) to choose new coverage. Confirm your options with 1-800-MEDICARE or free counseling from your State Health Insurance Assistance Program (SHIP).', link: { href: '/find-help/?need=insurance', text: 'Free Medicare help' } },
      { q: 'Who can help me understand a confusing medical bill?', a: 'Start by calling the billing office and asking for an itemized bill, then compare it with the Explanation of Benefits from your insurance. Write down who you spoke to and when. Our virtual assistants can help organize the paperwork and make the calls with you.', link: { href: '/services/senior-care-virtual-assistant/', text: 'Get help with paperwork' } },
    ],
  },
  {
    id: 'planning',
    title: 'End-of-life planning',
    items: [
      { q: 'What is end-of-life planning?', a: 'End-of-life planning means making and writing down decisions ahead of time: your healthcare wishes, who can act for you, your will, where your accounts and papers are, and your funeral or memorial wishes. It saves your family from guessing during a hard time.', link: { href: '/resources/final-arrangements-discussion-guide/', text: 'Free 10-point discussion guide' } },
      { q: 'How do I start a conversation about final wishes with my parents?', a: 'Pick a calm moment, explain that you want to be ready to honor their wishes, and start with one topic rather than everything at once. Our free 10-point guide lists what to cover, from healthcare wishes to people to notify.', link: { href: '/resources/final-arrangements-discussion-guide/', text: 'The 10-point guide' } },
      { q: 'What is the difference between a will and a living will?', a: 'A will says what happens to your property and who handles your estate after you die. A living will (a type of advance directive) records the medical care you want if you can’t speak for yourself. Talk with a licensed attorney in your state to create either one.', link: { href: '/blog/organize-important-documents-aging-parents/', text: 'Organizing important papers' } },
      { q: 'Where should I write down my wishes and important information?', a: 'Keep everything in one place your family can find, and tell them where it is. The Living Legacy Planner gives you a guided space for personal details, accounts, contacts and final wishes. It isn’t a legal document, so keep your will and powers of attorney with it.', link: { href: '/books/living-legacy-planner/', text: 'The Living Legacy Planner' } },
    ],
  },
  {
    id: 'site',
    title: 'Using this website',
    items: [
      { q: 'How does the Find Help Near Me tool work?', a: 'Type your ZIP code or city, choose what you need, such as a doctor, an elder law attorney or Medicare help, and we open a Google Maps search for places nearby plus trusted free directories. We don’t endorse any provider, so always check credentials and call ahead.', link: { href: '/find-help/', text: 'Find help near me' } },
      { q: 'Are your planners available as printable downloads?', a: 'Yes. The printed planners are sold on Amazon, and fillable PDF e-planners, such as a medication tracker and a daily care log, are instant downloads from the SALT Online Store.', link: { href: '/planners/', text: 'All planners' } },
    ],
  },
];

export const ALL_FAQS = FAQ_GROUPS.flatMap((g) => g.items);
