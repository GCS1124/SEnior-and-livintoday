// The Living Legacy Planner: its three editions and their free "Look Inside" previews.
//
// Only the pages listed in `pages` are published. Locked pages are shown as tiny, heavily
// blurred thumbnails that can't be read, so the rest of each book stays a surprise for buyers.
//
// TO ADD INSIDE PAGES FOR AN EDITION:
//   1. Export the chosen pages as images (about 1000 px wide) into public/images/planners/<edition>/.
//   2. Add them to that edition's `pages` below (with a short alt text, and `text` for pages that
//      are mostly reading, so they can be read in large print).
//   3. Optional: add blurred thumbnails and the section list under `locked`.
import { SITE, storeLink } from './site';

export interface PreviewPage { src: string; alt: string; label: string; text?: string[]; w?: number; h?: number }
export interface Section { name: string; open?: boolean }
export interface Edition {
  key: string;            // letters only: used in links like #look-<key>
  name: string;          // short name for buttons
  title: string;         // full title
  chip: string;          // e.g. "1st Edition"
  who: string;
  cover: string;
  coverAlt: string;
  pages: PreviewPage[];
  locked?: { thumbs: string[]; sections: Section[] };
  comingSoon?: string;
  buy: { url: string; label: string; primary?: boolean }[];
  page?: string;         // its own page on this site, if any
}

const P = '/images/planners';
const MIL = `${P}/military`;

const INTRO: string[] = [
  'INTRODUCTION. Welcome to your Seasoned Adult Planning Guide.',
  'Dear Reader, as we navigate this full and incredible life, each segment brings different sets of joys, challenges and decisions. These golden years are no exception. This period of time is marked with profound transitions. These could involve your health, living arrangements and your financial security. Preparing for these changes is like setting the sails on a ship, ensuring that no matter where the winds blow, you will remain in control of your journey.',
  'This guide is created with you in mind: a comprehensive tool to help you navigate the complexities of planning for your future. It’s more than a manual; it’s a roadmap to peace of mind, designed to empower you with knowledge, tools and confidence. By engaging with this guide, you are taking a proactive step towards securing a future that aligns with your wishes, needs and dreams.',
  'Health: Our health is our most precious asset. Understanding the healthcare system, knowing your options for medical care and making long term care decisions are critical. This guide will walk you through these aspects, offering you ideas to consider on how to plan for your healthcare needs in a way that ensures dignity, comfort and quality of life.',
];
const INTRO_2: string[] = [
  'Living Arrangements: Where you choose to live during your senior years is a decision that impacts your well-being and happiness. Whether it’s aging in place, moving to a senior community or checking out alternative living arrangements, this guide provides insight into making the best choice for your lifestyle preferences.',
  'Financial Arrangements: Financial security is so important to ensure that you can enjoy your golden years without stress or worry. From managing savings and investments to understanding pensions and healthcare benefits, this manual will allow you to consider the financial planning process. You will give thought to providing for your future needs and fulfilling your wishes.',
  'As you begin this journey, remember it’s never too early to start. The decisions you make today will pave the way for a future where you can live life on your own terms. This guide is to support you every step of the way, empowering you to make informed choices about your health, living arrangements and finances.',
  'Welcome to a future where your golden years shine brightly, illuminated by the wisdom of planning and the strength of informed decisions. Let’s begin this journey together.',
];
const GUIDE: string[] = [
  'Your Final Arrangement: 10 Point Discussion Guide. Have this conversation with the people who matter to you. Have this conversation with people who will listen to you. Speak to everyone important to you so not just one person has this important insight to your wishes. Everyone should know what you want so there is no confusion.',
  '1. Do you want to be an organ donor? Would you like to have your body donated to science or a teaching school or hospital? If you would like to be an organ donor, is that also notated on your driver’s license? It is very beneficial to have this discussion because you may no longer have a valid driver’s license when this information is being sought out.',
  '2. Do you want to have your body cremated or buried? If you want to be cremated, what should be done with your remains? Should they stay with a person, if so, who? Do you want your ashes spread somewhere? If so, where would you like them placed?',
  '3. If you would like a memorial or service or funeral, do you want an open or closed casket?',
  '4. If you want to be buried, what kind of casket do you want? Do you want a basic or average casket? Would you prefer to have the most stylish one that is offered? Be sure to discuss this because the range of options and costs are limitless.',
  '5. Have you already purchased a burial plot? If you have a plot, where is it and where is any paperwork for it? Are you a part of a Neptune society or some other group that pays or assists for your burial? Are you a Veteran? Will they contribute to your funeral expenses?',
];
const FIRST_SECTIONS: Section[] = [
  { name: 'Introduction', open: true }, { name: 'Temporary Instructions', open: true }, { name: 'Medical Information', open: true },
  { name: 'Personal Information', open: true }, { name: 'Key Contacts', open: true }, { name: 'Financial Information' },
  { name: 'Insurance Information' }, { name: 'Business Information' }, { name: 'More Personal Information' }, { name: 'Property' },
  { name: 'In the Event that I Have Passed', open: true }, { name: 'Important Documents' }, { name: 'Your Final Arrangement: 10 Point Discussion Guide', open: true },
];
const COLOR_SECTIONS: Section[] = [
  { name: 'Introduction', open: true }, { name: 'Temporary Instructions', open: true }, { name: 'Medical Information', open: true },
  { name: 'Practical Contact List' }, { name: 'Personal Information' }, { name: 'Medical Power of Attorney' }, { name: 'Key Contacts', open: true },
  { name: 'Financial Information' }, { name: 'Insurance Information' }, { name: 'Business Information' }, { name: 'Pet Information' },
  { name: 'Social Media Information' }, { name: 'Rental Property' }, { name: 'Tangible Properties' }, { name: 'In the Event that I Have Passed' },
  { name: 'Final Arrangements Note' }, { name: 'Important Documents' }, { name: 'Final Discussion Guide' },
];
const BLOOM_SECTIONS: Section[] = [
  { name: 'Benefits of using this planner', open: true }, { name: 'How to use your planner', open: true }, { name: 'Life Architecture and Vision Board', open: true },
  { name: 'The Big Picture', open: true }, { name: 'Self Affirmations' }, { name: 'Mind Map', open: true }, { name: 'Gratitude and self-love pages' },
  { name: 'Positive Thinking', open: true }, { name: 'Your inner circle and support' }, { name: 'Gratitude Prompts' }, { name: 'Monthly Overviews' },
  { name: 'Sleep Trackers', open: true }, { name: 'Habit and Hobby Trackers' }, { name: 'Daily planning pages (about 180)', open: true },
];
const pg = (dir: string, n: string, label: string, alt: string, h: number, text?: string[]): PreviewPage => ({ src: `${P}/${dir}/page-${n}.webp`, w: 1000, h, label, alt, ...(text ? { text } : {}) });
const locks = (dir: string) => Array.from({ length: 12 }, (_, i) => `${P}/${dir}/locked-${String(i + 1).padStart(2, '0')}.webp`);

const MILITARY_SECTIONS: Section[] = [
  { name: 'Foreword', open: true }, { name: 'Personal Family Information', open: true }, { name: 'Service Information' },
  { name: 'Routine Contact List' }, { name: 'Key Contacts' }, { name: 'Family Emergency Plan', open: true },
  { name: 'Medical Information' }, { name: 'If I Am Temporarily Disabled… Then Who?', open: true }, { name: 'Deployment Readiness' },
  { name: 'Military Pay Information' }, { name: 'Military Benefits' }, { name: 'Important Military Documents' },
  { name: 'PCS Moving Checklist', open: true }, { name: 'Financial Information' }, { name: 'Monthly Bills List' },
  { name: 'Insurance Policy Inventory' }, { name: 'Beneficiary Designations' }, { name: 'Legal Documents' },
  { name: 'Where Important Items Are Kept' }, { name: 'Household Management' }, { name: 'Vehicle Information' },
  { name: 'Personal Property Assets' }, { name: 'Digital Online Assets' }, { name: 'Business Information' },
  { name: 'Special Memories or Family Traditions' }, { name: 'Letters to Loved Ones' }, { name: 'If I Do Not Return Home' },
  { name: 'Biography' },
];

export const EDITIONS: Edition[] = [
  {
    key: 'first',
    name: '1st Edition',
    title: 'The Living Legacy Planner',
    chip: '1st Edition · The original',
    who: 'For seniors and families: final wishes, finances, health details and memories, all in one book. The original, in black and white.',
    cover: `${P}/llp-1st-front.webp`,
    coverAlt: 'The Living Legacy Planner, 1st Edition, by Courtney R. Jones: royal blue cover with golden title and a photo of smiling seniors',
    pages: [
      { src: `${P}/llp-1st-front.webp`, w: 900, h: 1285, label: 'Front cover', alt: 'Front cover of The Living Legacy Planner, 1st Edition, by Courtney R. Jones, with the SALT seal' },
      pg('first', '001', 'This Book Belongs To', 'This Book Belongs To page with a floral frame and the words: Life is but a dream, so live it!', 1294),
      pg('first', '003', 'Title page', 'Title page: The Living Legacy Planner by Courtney R. Jones, with the SALT seal', 1294),
      pg('first', '005', 'Contents', 'Contents: Introduction, Temporary Instructions, Medical Information, Personal Information, Key Contacts, Financial Information, Insurance Information, Business Information, Personal Information, Property, In the Event that I Have Passed, Important Documents', 1294),
      pg('first', '007', 'Introduction', 'Introduction, page i: Welcome to your Seasoned Adult Planning Guide', 1294, INTRO),
      pg('first', '008', 'Introduction (continued)', 'Introduction, page ii', 1294, INTRO_2),
      pg('first', '009', 'Temporary Instructions', 'Temporary Instructions page: things I want a caregiver to know if I am unable to communicate, such as what I enjoy and the books I love', 1294),
      pg('first', '015', 'Medical Information', 'Medical Information page with lines to write in', 1294),
      pg('first', '022', 'Contact List', 'Contact List page: a table of names and phone numbers', 1294),
      pg('first', '039', 'Key Contacts', 'Key Contacts page with lines to write in', 1294),
      pg('first', '147', 'In the Event that I Have Passed', 'In the Event that I Have Passed Away: contact these people', 1294),
      pg('first', '169', 'Final Arrangement Discussion Guide', 'Your Final Arrangement: 10 Point Discussion Guide, the first five questions', 1294, GUIDE),
    ],
    locked: { thumbs: locks('first'), sections: FIRST_SECTIONS },
    buy: [{ url: SITE.links.livingLegacyPlannerAmazon, label: 'Buy the 1st Edition on Amazon (hardcover)', primary: true }],
  },
  {
    key: 'second',
    name: '2nd Edition · Color',
    title: 'The Living Legacy Planner: Color Edition (2nd Edition)',
    chip: '2nd Edition · Full color',
    who: 'The same caring planner, refreshed in full color: 182 pages, large 8.5 x 11 inch size, paperback or hardcover.',
    cover: `${P}/llp-2nd-front.webp`,
    coverAlt: 'The Living Legacy Planner, 2nd Edition in color, by Courtney R. Jones: illustrated cover of seniors and a young woman sharing the planner',
    pages: [
      { src: `${P}/llp-2nd-front.webp`, w: 900, h: 1218, label: 'Front cover', alt: 'Front cover of The Living Legacy Planner, 2nd Edition, in full color' },
      pg('second', '001', 'This Book Belongs To', 'This Book Belongs To page over a sunset illustration: Life is but a dream, so live it!', 1283),
      pg('second', '002', 'Title page', 'Title page: The Living Legacy Planner by Courtney R. Jones, with an illustration of smiling seniors in a stamp frame', 1283),
      pg('second', '004', 'Contents', 'Contents page listing 17 sections, from Temporary Instructions to the Final Discussion Guide', 1283),
      pg('second', '005', 'Introduction', 'Introduction page in color: Welcome to your Seasoned Adult Planning Guide', 1283, INTRO),
      pg('second', '006', 'Introduction (continued)', 'Introduction, continued', 1283, INTRO_2),
      pg('second', '007', 'Temporary Instructions', 'Temporary Instructions page in a blue stamp frame, with an illustrated caregiver', 1283),
      pg('second', '013', 'Your health, your legacy', 'Full-page illustration: Your health, your legacy. A smiling couple at a doctor’s visit', 1283),
      pg('second', '014', 'Medical Information', 'Medical Information page in a red stamp frame, with an illustrated doctor', 1283),
      pg('second', '038', 'Contacts & connections', 'Full-page illustration: Contacts and connections. Friends sharing the planner and a video call', 1283),
      pg('second', '039', 'Key Contacts', 'Key Contacts page in a purple stamp frame', 1283),
      pg('second', '153', 'It’s been a good life', 'Full-page illustration: It’s been a good life, and I’m at peace preparing for its closing chapters. A woman in a rocking chair watching a beach sunset', 1283),
      {
        src: `${P}/llp-2nd-back.webp`, label: 'Back cover', alt: 'Back cover of The Living Legacy Planner, 2nd Edition, with the book description',
        text: [
          '“The Living Legacy Planner” is a comprehensive and compassionate guide designed specifically for seniors to document and organize their final wishes with ease and clarity. As we journey through life, it’s essential to ensure that our wishes are known and respected, especially when it comes to end-of-life decisions.',
          'In this invaluable book, seniors are provided with thoughtful prompts and detailed sections to articulate their preferences for medical care, funeral arrangements, financial matters, legacy planning, and more. From specifying healthcare directives to expressing personal preferences for memorial services, “The Living Legacy Planner” empowers seniors to take control of their future and leave a meaningful legacy.',
          'With ample space for personal reflections and special messages to loved ones, this book serves as a cherished keepsake and a practical tool for organizing important information. Whether planning ahead for peace of mind or navigating life transitions, “The Living Legacy Planner” offers seniors the opportunity to express their desires, values, and wishes with clarity and dignity.',
          'Empower yourself and your loved ones by documenting your final wishes today with “The Living Legacy Planner”: a thoughtful and essential resource for seniors navigating the journey of aging with grace and purpose.',
        ],
      },
    ],
    locked: { thumbs: locks('second'), sections: COLOR_SECTIONS },
    buy: [
      { url: SITE.links.livingLegacyPlannerColorAmazon, label: 'Paperback on Amazon', primary: true },
      { url: SITE.links.livingLegacyPlannerColorHardcoverAmazon, label: 'Hardcover on Amazon' },
    ],
  },
  {
    key: 'military',
    name: 'Military Edition',
    title: 'The Living Legacy Planner: Military Deployment & Family Readiness Edition',
    chip: 'Newest edition · Military families',
    who: 'For service members, veterans and their families: everything the people at home need if you’re deployed, moving or suddenly unavailable.',
    cover: `${P}/llp-military-front.webp`,
    coverAlt: 'The Living Legacy Planner, Military Deployment and Family Readiness Edition: sepia cover with a soldier walking with his family under the flag',
    page: '/books/military-edition/',
    pages: [
      { src: `${P}/llp-military-front.webp`, label: 'Front cover', alt: 'Front cover: The Living Legacy Planner, Military Deployment and Family Readiness Edition. Protect your family, preserve what matters, prepare with confidence, leave a legacy of love.' },
      {
        src: `${P}/llp-military-back.webp`, label: 'Back cover', alt: 'Back cover: Prepare today. Protect tomorrow. The book description over a starry mountain landscape.',
        text: [
          'PREPARE TODAY. PROTECT TOMORROW.',
          'The Military Deployment and Family Readiness Edition of The Living Legacy Planner is a comprehensive and thoughtful guide designed specifically for enlisted service members, veterans, and their families.',
          'This planner is essential to ensuring that your life stays balanced and organized if you are away from home, urgently deployed, or even temporarily disabled. This invaluable book provides thoughtful prompts and detailed sections to articulate preferences for medical care, financial matters, legacy planning, and more. The Living Legacy Planner empowers you to take control of your future.',
          'With ample space for personal reflection and special messages to loved ones, this book will serve as a directive and a keepsake. It is a practical tool for organizing important information.',
          'Plan ahead for peace of mind as you navigate hectic life transitions. The Living Legacy Planner Military Deployment and Family Readiness guide offers those who serve, their families, and veterans an opportunity to express their desires, values, and wishes with clarity.',
          'Feel empowered, and allow your family to feel confident in the steps they take, by documenting important information to keep your life running in order, even if you are away. A thoughtful resource for those navigating life’s journeys with direction and purpose.',
        ],
      },
      { src: `${MIL}/page-01.webp`, label: 'Title page', alt: 'Title page: The Living Legacy Planner, Military Deployment and Family Readiness Edition, by Courtney R. Jones, with a gold star emblem' },
      { src: `${MIL}/page-03.webp`, label: 'This Book Belongs To', alt: 'This Book Belongs To page, with lines for name, address, phone, email, spouse, children and an emergency contact' },
      {
        src: `${MIL}/page-05.webp`, label: 'Contents', alt: 'Contents page listing the planner’s 28 sections, from Foreword to Biography',
        text: [MILITARY_SECTIONS.map((s, i) => `${i + 1}. ${s.name}`).join(' · ')],
      },
      {
        src: `${MIL}/page-07.webp`, label: 'Foreword', alt: 'Foreword, page i: Prepare Families. Stronger Futures.',
        text: [
          'Prepare Families. Stronger Futures.',
          'Being a part of a military family for 23 years, from 1984 to 2007, taught me lessons that no book alone could ever teach. It taught me resilience, flexibility, patience, and the importance of being prepared for the unexpected.',
          'Military life is unlike any other. One phone call can change everything. New orders arrive. Deployments happen. Families relocate. Children change schools. Household responsibilities can change overnight. Life moves quickly. Sometimes there isn’t enough time to think through every detail before you are asked to move forward.',
          'I know because I have lived it.',
          'I have experienced receiving deployment orders with only a few days’ notice, just one week after relocating to a new state with two children under the age of three. I have been through pack-ups, cross-country moves, home inspections, and all the uncertainty that can come with military life.',
          'Like so many military spouses, I learned by doing.',
          'There were times I wished I had a place to help keep everything I had to remember organized: a place where important information could be found without a big search through cabinets, notebooks, or random bits of paper. There were times I wondered: if something happened to me, or my spouse, would someone stepping in know what to do?',
          'Those experiences inspired this planner.',
        ],
      },
      {
        src: `${MIL}/page-08.webp`, label: 'Foreword (continued)', alt: 'Foreword, page ii, continued',
        text: [
          'Living Legacy Planner® Military Deployment & Family Readiness Guide was created to help military members and their families prepare before life throws them an unexpected twist.',
          'Whether you are deploying overseas, receiving Permanent Change of Station (PCS) orders, navigating a temporary duty assignment, or preparing your family for everyday emergencies, this planner is designed to help you organize the information that matters most.',
          'If you suddenly find yourself in unfamiliar territory and don’t know who to call, this planner is here to help.',
          'If you are a single service member and become temporarily injured or hospitalized, this planner can help ensure someone you trust will have the information they need to keep your affairs in order until you are back on your feet.',
          'If someone has to step in to assist your family, they shouldn’t have to guess the next move.',
          'The challenge in today’s world is that most important information is stored in our heads or on our cellular phones. Account numbers, billing addresses, insurance information, important contacts, medical information, and household responsibilities are usually only known by us. When an emergency comes up, the people who want to help may have no access to the information needed.',
          'You cannot prepare for every circumstance life may bring, but you can prepare for many of them. Organized preparation can provide you with peace of mind.',
        ],
      },
      {
        src: `${MIL}/page-09.webp`, label: 'Foreword (continued)', alt: 'Foreword, page iii, signed Warmly, Courtney R. Jones',
        text: [
          'I hope that for you this planner becomes more than a notebook filled with information. I hope it becomes a trusted resource that gives you confidence, reduces your stress during uncertain times, and allows you to focus on what matters most: your family, your service, your future.',
          'No planner can remove all the challenges of military life. But with thoughtful preparation you can face your challenges knowing that the groundwork has been laid.',
          'Thank you, for your service, your sacrifice, and your commitment to protecting our country.',
          'It is my sincere hope that this planner serves you and your family as faithfully as you served ours.',
          'Warmly, Courtney R. Jones. Military Spouse (1984–2007). Founder, Senior and Living Today Services, LLC. Author, The Living Legacy Planner® Military Deployment & Family Readiness Guide.',
        ],
      },
      { src: `${MIL}/page-13.webp`, label: 'Personal Family Information', alt: 'Personal Family Information page, with lines for maiden and legal name, birth details, phones, addresses, spouse, children and siblings' },
      { src: `${MIL}/page-21.webp`, label: 'Family Emergency Plan', alt: 'Family Emergency Plan page, with six emergency contacts and three children’s schools' },
      { src: `${MIL}/page-27.webp`, label: 'If I Am Temporarily Disabled… Then Who?', alt: 'If I Am Temporarily Disabled, Then Who? page: who should pay my bills, care for my children and pets, contact my employer and command, manage investments and handle insurance claims' },
      { src: `${MIL}/page-39.webp`, label: 'PCS Moving Checklist', alt: 'PCS Moving Checklist page with checkboxes: address change, utilities, school transfers, medical records, vehicle registration and insurance, housing inspection' },
    ],
    locked: {
      thumbs: Array.from({ length: 12 }, (_, i) => `${MIL}/locked-${String(i + 1).padStart(2, '0')}.webp`),
      sections: MILITARY_SECTIONS,
    },
    buy: [
      { url: storeLink('/products/living-legacy-planner-military-deployment-family-readiness-edition', 'look-inside'), label: 'Buy from the SALT Online Store', primary: true },
      { url: SITE.links.militaryPlannerAmazon, label: 'Paperback on Amazon' },
      { url: SITE.links.militaryPlannerHardcoverAmazon, label: 'Hardcover on Amazon' },
    ],
  },
];

export const edition = (key: Edition['key']) => EDITIONS.find((e) => e.key === key)!;

// The Daily Bloom (not a Living Legacy Planner edition, but previewed the same way on the Books page).
export const DAILY_BLOOM: Edition = {
  key: 'bloom',
  name: 'The Daily Bloom',
  title: 'The Daily Bloom: A Life Balance Guide',
  chip: 'Daily guide · Wellness',
  who: 'A gentle daily companion: prompts for reflection, words of encouragement, and space to track sleep and the habits that help you feel your best.',
  cover: `${P}/daily-bloom-front.webp`,
  coverAlt: 'The Daily Bloom: A Life Balance Guide, cream cover with a blue and gold blossoming tree',
  pages: [
    { src: `${P}/daily-bloom-front.webp`, w: 900, h: 1337, label: 'Front cover', alt: 'Front cover of The Daily Bloom: A Life Balance Guide, with a blue and gold blossoming tree' },
    {
      src: `${P}/daily-bloom-back.webp`, w: 900, h: 1026, label: 'Back cover', alt: 'Back cover of The Daily Bloom with the book description',
      text: [
        'The Daily Bloom: A Life Balance Guide is a gentle yet empowering companion for adults seeking balance, clarity, and encouragement in everyday life. Designed to be used daily, this guide invites you to pause, reflect, and care for yourself, one meaningful moment at a time.',
        'Within its pages, you’ll find thoughtful prompts for daily reflection, uplifting words of motivation, and simple reminders to slow down and breathe.',
        'Wellness and relaxation are at the heart of The Daily Bloom, with dedicated space for tracking sleep and noticing patterns that support better rest and overall well-being. This is not a book about perfection or productivity; it’s about presence.',
        'Whether you’re starting your morning with intention or ending your day in gratitude, The Daily Bloom offers a calm space to check in with yourself, stay encouraged, and gently track the habits that help you feel your best.',
        'Perfect for adults of any age, The Daily Bloom is a daily reminder that growth doesn’t have to be rushed. Sometimes, it simply needs the right space to bloom.',
      ],
    },
    pg('bloom', '002', 'This Book Belongs To', 'This Book Belongs To page with a note about life balance being like tending a garden', 1403, [
      'Life balance is like tending a garden: it requires patience, intention, and daily care. It isn’t just about juggling commitments, but ensuring you have the energy to thrive without sacrificing your well-being.',
      'The Daily Bloom is here to help you set boundaries, prioritize tasks, and make space for joy. Use these pages to find the calm, clarity, and organization you need to let your best self bloom.',
    ]),
    pg('bloom', '003', 'A balanced and fulfilling life', 'Drawing of a brain linking personal growth, social life, health, work and family: A Balanced and Fulfilling Life', 1403),
    pg('bloom', '004', 'Benefits of using this planner', 'Benefits of using this planner: four reasons, from managing your time to reducing stress', 1403, [
      '1. Using The Daily Bloom: A Life Balance Guide helps you to prioritize tasks and manage your time efficiently, leading to increased organization and overall productivity in your work performance.',
      '2. By assisting you in creating boundaries and setting realistic goals, it plays a crucial role in reducing stress levels and preventing burnout.',
      '3. This guide facilitates effective time allocation for both professional and personal activities, ensuring you can avoid overcommitting and better manage your schedule.',
      '4. Furthermore, it supports improved self-care by helping you plan ahead and make time for healthy activities, while also serving as a valuable tool for breaking down larger goals into smaller, actionable steps to keep you focused on achieving your priorities.',
    ]),
    pg('bloom', '005', 'How to use your planner', 'How to use our planner in your daily life: a peaceful mountain lake illustration', 1403),
    pg('bloom', '007', 'An example day', 'An example of a filled-in daily page: goals, reminders, tasks, meals and an inspiring quote', 1403),
    pg('bloom', '008', 'Life Architecture', 'Life Architecture page: yearly goals and a vision board', 1403),
    pg('bloom', '009', 'The Big Picture', 'The Big Picture: my life in 10 years, 5 years, next month, next week and today', 1403),
    pg('bloom', '011', 'Mind Map', 'Mind Map: my life goals, with personal growth, relationships, health and wellness, and financial', 1403),
    pg('bloom', '015', 'Positive Thinking', 'Positive Thinking: a tree of tips such as practice gratitude, focus on the good things and surround yourself with positive people', 1403),
    pg('bloom', '028', 'Sleep Tracker', 'Sleep Tracker page for a month, with sleep notes', 1403),
    pg('bloom', '050', 'A daily page', 'A colorful daily page: water intake, exercise, meetings, priorities, gratitude and notes', 1403),
  ],
  locked: { thumbs: locks('bloom'), sections: BLOOM_SECTIONS },
  buy: [
    { url: storeLink('/products/the-daily-bloom-life-balance-guide', 'look-inside'), label: 'Buy from the SALT Online Store', primary: true },
    { url: SITE.links.dailyBloomAmazon, label: 'Paperback on Amazon' },
    { url: SITE.links.dailyBloomHardcoverAmazon, label: 'Hardcover on Amazon' },
  ],
};
