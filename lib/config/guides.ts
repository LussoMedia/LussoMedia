// Config-driven SEO/AI-search content hub (/guides/[slug]). Mirrors the
// pattern in lib/config/industryPages.ts — each entry is original,
// specific copy, not a templated swap of one variable. Guides support the
// money pages (industry pages, the Score, the Home Service Lead Engine,
// /apply) rather than competing with them for search intent.

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface Guide {
  slug: string;
  eyebrow: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: GuideSection[];
  faq?: GuideFaq[];
  relatedIndustrySlug?: string;
  relatedGuideSlugs?: string[];
  publishedDate: string; // ISO
  updatedDate: string; // ISO
}

export const guides: Guide[] = [
  {
    slug: 'how-to-qualify-home-service-leads',
    eyebrow: 'Lead Conversion',
    h1: 'How to Qualify Home-Service Leads',
    metaTitle: 'How to Qualify Home-Service Leads | Lusso Media',
    metaDescription:
      'A practical framework for qualifying home-service leads by fit, urgency, and budget — so your team spends time on the opportunities worth chasing.',
    intro:
      'More leads is not the goal — more qualified leads is. A contractor drowning in unqualified estimate requests isn\'t actually ahead of one with a smaller, tighter pipeline of real opportunities. Qualification is the filter that decides which one you are.',
    sections: [
      {
        heading: 'Why Lead Volume Alone Is a Bad Scoreboard',
        paragraphs: [
          'It\'s tempting to judge a marketing system by how many leads it produces. But a system that generates 100 unqualified leads a month can be worse for the business than one that generates 30 qualified ones — every unqualified lead still costs a callback, an estimate, or a wasted truck roll.',
          'The real question isn\'t "how many leads," it\'s "how many of these were ever going to become a booked job." Qualification is what answers that question before your team spends time finding out the hard way.',
        ],
      },
      {
        heading: 'The Three Filters That Matter Most',
        paragraphs: [
          'Most home-service qualification comes down to three questions, asked in roughly this order:',
        ],
        list: [
          'Fit — Is this the kind of project or property you actually want? (Service area, project type, ticket size.)',
          'Urgency — Is there a real timeline, or is this exploratory research with no near-term decision?',
          'Budget reality — Does the homeowner\'s expectation roughly match what the work actually costs?',
        ],
      },
      {
        heading: 'Building Qualification Into the Funnel, Not Just the Call',
        paragraphs: [
          'The most efficient qualification doesn\'t happen on the phone — it happens in the form itself. A well-built lead form asks two or three targeted questions that surface fit, urgency, and budget reality before a human ever gets involved, so your team\'s first conversation is with a lead worth having.',
          'This is also where a lot of DIY marketing setups quietly leak value: a generic "Contact Us" form with a name, email, and open text box tells you almost nothing about whether the lead is worth calling first.',
        ],
      },
      {
        heading: 'What Happens After Qualification',
        paragraphs: [
          'Qualification isn\'t a one-time gate — it\'s a status that should travel with the lead through follow-up, scheduling, and estimating. A lead that was qualified at intake but goes seven days without contact is functionally unqualified again. See the related guide on follow-up speed below.',
        ],
      },
    ],
    faq: [
      {
        question: 'Does adding qualification questions reduce lead volume?',
        answer:
          'Usually slightly, yes — and that\'s the point. A well-built qualification step filters out the leads that were never going to book, so the leads that remain convert at a meaningfully higher rate.',
      },
      {
        question: 'Should qualification be different for emergency vs. planned work?',
        answer:
          'Yes. Emergency service calls (a burst pipe, a failed AC unit) need speed and minimal friction; planned, high-ticket projects (a remodel, a full roof replacement) can support a more thorough qualification step without losing the lead.',
      },
    ],
    relatedIndustrySlug: undefined,
    relatedGuideSlugs: ['speed-to-lead-for-contractors', 'referral-dependence-limits-contractor-growth'],
    publishedDate: '2026-08-27',
    updatedDate: '2026-08-27',
  },
  {
    slug: 'speed-to-lead-for-contractors',
    eyebrow: 'Lead Conversion',
    h1: 'How Fast Should Home-Service Businesses Follow Up With Leads?',
    metaTitle: 'Speed to Lead for Contractors | Lusso Media',
    metaDescription:
      'How response speed affects home-service lead conversion, what a realistic follow-up standard looks like, and why most contractors respond too slowly.',
    intro:
      'A qualified lead that sits in an inbox for six hours is worth less than a mediocre lead that gets called back in five minutes. Speed to lead is one of the highest-leverage, lowest-cost fixes available to most home-service businesses — and one of the most commonly ignored.',
    sections: [
      {
        heading: 'Why Speed Matters More Than Most Contractors Think',
        paragraphs: [
          'Homeowners requesting an estimate rarely contact just one contractor. By the time your team calls back, the lead has often already spoken with — or booked — a competitor who responded first. Response speed isn\'t a nice-to-have; it\'s frequently the deciding factor in whether a lead becomes a job at all.',
          'This is especially true for emergency and service-call work, where the homeowner\'s problem is active and their patience for a slow callback is close to zero.',
        ],
      },
      {
        heading: 'What a Realistic Standard Looks Like',
        paragraphs: [
          'Five minutes is the commonly cited benchmark, and it is a good target — but the more useful standard for most home-service businesses is: faster than whoever else the homeowner is talking to, every time, without depending on one person being at their desk.',
          'That means the standard has to survive nights, weekends, and the busy season — which is where most DIY follow-up systems fall apart.',
        ],
      },
      {
        heading: 'Where Speed Actually Breaks Down',
        paragraphs: [
          'It\'s rarely a motivation problem — it\'s a systems problem. Leads land in a shared inbox nobody owns, a missed call doesn\'t trigger a text back, or the person who normally handles leads is out on a job. Fixing speed to lead is less about hustle and more about installing a standard that doesn\'t rely on any one person remembering to check their phone.',
        ],
        list: [
          'Missed-call text-back so a ringing phone that goes unanswered still gets a response',
          'A clear, single owner for incoming leads — not "whoever sees it first"',
          'A documented response-time standard the team is actually held to',
        ],
      },
      {
        heading: 'Speed Gets You the Conversation — Qualification Decides the Rest',
        paragraphs: [
          'Responding fast earns you the conversation. It doesn\'t replace qualifying the lead once you have it — see the related guide on lead qualification for how the two work together.',
        ],
      },
    ],
    faq: [
      {
        question: 'What\'s a good speed-to-lead benchmark for home services?',
        answer:
          'Aim to make first contact within five minutes for hot/emergency leads and same-business-day for planned project inquiries — and build a system (not just a habit) that hits that standard consistently.',
      },
      {
        question: 'Does a text response count as "responding" to a lead?',
        answer:
          'It counts as acknowledgment, which matters — a fast text confirming you got the request buys time until a real callback. It shouldn\'t replace an actual phone conversation for anything beyond the simplest requests.',
      },
    ],
    relatedGuideSlugs: ['how-to-qualify-home-service-leads', 'plumbing-lead-follow-up-systems'],
    publishedDate: '2026-08-27',
    updatedDate: '2026-08-27',
  },
  {
    slug: 'hvac-lead-generation-guide',
    eyebrow: 'HVAC',
    h1: 'HVAC Lead Generation: What Actually Drives Replacement Revenue',
    metaTitle: 'HVAC Lead Generation Guide | Lusso Media',
    metaDescription:
      'How HVAC lead generation works when replacement and install jobs — not one-off service calls — are what actually move the business forward.',
    intro:
      'Most HVAC lead generation is built around service calls because service calls are what get searched for. But replacement and install jobs are what carry the margin — and they need a different kind of demand generation entirely.',
    sections: [
      {
        heading: 'Two Different Businesses Under One Roof',
        paragraphs: [
          'Emergency and maintenance calls behave like a reactive, high-urgency, price-sensitive business. Full system replacements and installs behave like a considered, higher-ticket, trust-driven business. Most HVAC marketing only builds for the first one, because it\'s easier to run ads against "AC not working" than it is to generate demand for a comfort-system upgrade nobody was actively searching for yet.',
        ],
      },
      {
        heading: 'Where Replacement Demand Actually Comes From',
        paragraphs: [
          'A meaningful share of replacement revenue doesn\'t start as a replacement search — it starts as a maintenance visit, an aging-system conversation, or a failed repair that turns into a bigger decision. That means the technician on-site is part of the lead generation system, not separate from it, and the offer needs a clear next step (like a system assessment) that gives that conversation somewhere to go.',
        ],
      },
      {
        heading: 'Seasonality Has to Be Built In Advance',
        paragraphs: [
          'HVAC demand spikes hard around extreme temperature swings, and the businesses that win those windows aren\'t the ones scrambling to turn on ads once the calls start — they\'re the ones with campaigns, creative, and capacity planning already staged before the heat or cold hits.',
        ],
      },
      {
        heading: 'What This Means for Your Lead Generation System',
        paragraphs: [
          'A serious HVAC lead generation system needs to do three things at once: capture the reactive service-call demand efficiently, create a real path from maintenance and repair visits into replacement conversations, and be ready to scale ahead of seasonal peaks rather than during them.',
        ],
      },
    ],
    faq: [
      {
        question: 'Should HVAC companies run ads for repair or replacement?',
        answer:
          'Both have a place, but they need separate offers and separate funnels — a single generic "HVAC services" campaign usually underperforms both compared to campaigns built specifically around each.',
      },
      {
        question: 'How much of HVAC lead gen should be seasonal vs. year-round?',
        answer:
          'Year-round activity protects brand visibility and captures steady maintenance/repair demand; seasonal budget increases are what let you capture the replacement spike ahead of extreme weather rather than reacting to it.',
      },
    ],
    relatedIndustrySlug: 'hvac',
    relatedGuideSlugs: ['how-to-qualify-home-service-leads', 'speed-to-lead-for-contractors'],
    publishedDate: '2026-08-27',
    updatedDate: '2026-08-27',
  },
  {
    slug: 'plumbing-lead-follow-up-systems',
    eyebrow: 'Plumbing',
    h1: 'Plumbing Lead Follow-Up Systems That Actually Get Used',
    metaTitle: 'Plumbing Lead Follow-Up Systems | Lusso Media',
    metaDescription:
      'Why plumbing leads go cold between the emergency call and the install estimate — and what a follow-up system needs to look like to stop it.',
    intro:
      'Plumbing has an unusual split: emergency calls get answered fast because they have to be, but higher-value work — repipes, tankless installs, water treatment — often gets a single follow-up attempt before it quietly goes cold.',
    sections: [
      {
        heading: 'The Follow-Up Gap Between Service and Install',
        paragraphs: [
          'An emergency leak gets a same-day response almost by default — the homeowner is calling multiple companies right now and someone has to show up. A quote for a water heater replacement or a whole-home repipe doesn\'t have that built-in urgency, which means it depends entirely on whether your follow-up system actually follows up.',
          'This is where a lot of plumbing revenue quietly disappears: not from a bad estimate, but from an estimate nobody followed up on after the first call.',
        ],
      },
      {
        heading: 'What a Real Follow-Up Sequence Looks Like',
        paragraphs: [
          'A single follow-up call isn\'t a system — it\'s a coin flip. A real sequence spans multiple touches over one to three weeks, mixing calls, texts, and email, and it has a defined owner so it doesn\'t depend on one person remembering.',
        ],
        list: [
          'Same-day acknowledgment for every estimate delivered',
          'A scheduled second touch within 48–72 hours if no response',
          'A documented multi-week sequence for estimates that haven\'t converted',
          'A clear "closed — no" status so leads don\'t sit in limbo forever',
        ],
      },
      {
        heading: 'Why This Matters More for Higher-Ticket Plumbing Work',
        paragraphs: [
          'Water treatment, repipe, and tankless installs are exactly the kind of purchase homeowners take time to think over — which means the business that stays in front of them during that decision window, without being pushy, wins more of that work than the business that quotes once and waits.',
        ],
      },
    ],
    faq: [
      {
        question: 'How long should a plumbing follow-up sequence run?',
        answer:
          'For higher-ticket installs, two to three weeks of structured follow-up captures meaningfully more conversions than a single call — most homeowners aren\'t ready to decide on day one.',
      },
      {
        question: 'Does follow-up need a CRM?',
        answer:
          'Not necessarily at first — a simple, consistently used lead-status tracker beats an expensive CRM nobody updates. The system matters more than the software.',
      },
    ],
    relatedIndustrySlug: 'plumbing',
    relatedGuideSlugs: ['speed-to-lead-for-contractors', 'how-to-qualify-home-service-leads'],
    publishedDate: '2026-08-27',
    updatedDate: '2026-08-27',
  },
  {
    slug: 'how-contractors-gain-local-market-share',
    eyebrow: 'Growth Strategy',
    h1: 'How Contractors Gain Local Market Share',
    metaTitle: 'How Contractors Gain Local Market Share | Lusso Media',
    metaDescription:
      'Local market share is not the same as local visibility. What actually moves a home-service contractor from one option among many to the default choice.',
    intro:
      'Being known in your market and dominating your market are different things. Plenty of established contractors have strong reputations and still lose bids to whoever showed up first online — because visibility and market share aren\'t the same asset.',
    sections: [
      {
        heading: 'Market Share Is a System Outcome, Not a Tactic',
        paragraphs: [
          'No single tactic — more ads, more posts, a better website — reliably moves market share on its own. Market share is what happens when demand generation, conversion, and reputation compound together over time: more people see you, more of the people who see you become leads, more of those leads become customers, and more of those customers become reviews and referrals that feed the next cycle.',
        ],
      },
      {
        heading: 'Why Referral-Dependent Contractors Plateau',
        paragraphs: [
          'Referrals are a great sign of quality work — and a fragile growth engine. Referral volume is capped by how many happy customers you already have, which means it can\'t scale faster than your current customer base grows. Contractors who rely on referrals alone tend to plateau at whatever size their reputation currently supports, not the size their capacity could actually handle.',
        ],
      },
      {
        heading: 'The Compounding Loop That Builds Share',
        paragraphs: [
          'Contractors who genuinely take market share build a loop where each piece reinforces the next:',
        ],
        list: [
          'Consistent visibility (content, ads, search presence) generates attention beyond the existing customer base',
          'A strong offer and fast, qualified follow-up convert more of that attention into booked jobs',
          'Completed jobs generate reviews and proof, which strengthens the next round of visibility',
          'Tracking which channels and offers actually produce booked jobs lets budget shift toward what\'s working',
        ],
      },
      {
        heading: 'Why This Takes Longer Than a Single Campaign',
        paragraphs: [
          'Market share shifts are measured in months, not weeks — because trust, review volume, and search authority build gradually. Contractors expecting a single ad campaign to move market position are usually disappointed; contractors who install and operate the full loop over a 90-day-plus horizon are the ones who actually see the needle move.',
        ],
      },
    ],
    relatedGuideSlugs: ['referral-dependence-limits-contractor-growth', 'how-to-qualify-home-service-leads'],
    publishedDate: '2026-08-27',
    updatedDate: '2026-08-27',
  },
  {
    slug: 'roofing-lead-qualification',
    eyebrow: 'Roofing',
    h1: 'Roofing Lead Qualification: Separating Real Buyers From Researchers',
    metaTitle: 'Roofing Lead Qualification Guide | Lusso Media',
    metaDescription:
      'How to qualify roofing leads by urgency, ownership, and insurance status — so estimating capacity goes to homeowners actually ready to move forward.',
    intro:
      'Roofing generates a wide range of lead intent — from a homeowner three years from needing a new roof who\'s just curious about pricing, to someone standing in their attic looking at active water damage. Treating them the same wastes estimating capacity on the wrong end of that range.',
    sections: [
      {
        heading: 'Why Roofing Leads Vary So Widely in Intent',
        paragraphs: [
          'A roof replacement is a five-figure, infrequent purchase, which means most homeowners researching one are doing exactly that — researching, not necessarily ready to sign. Storm and insurance-driven leads sit at the opposite end: real, current damage, and a homeowner who often needs a fast, clear next step.',
        ],
      },
      {
        heading: 'The Qualification Questions That Matter Most',
        paragraphs: [
          'Roofing qualification usually comes down to a handful of specific signals:',
        ],
        list: [
          'Homeowner vs. renter/property manager (affects who can actually authorize the work)',
          'Known damage vs. general research ("my roof is 20 years old" vs. "I have an active leak")',
          'Insurance claim status, if storm-related — filed, in progress, or not yet started',
          'Timeline — actively getting quotes now vs. planning for next year',
        ],
      },
      {
        heading: 'Storm Events Change the Qualification Math',
        paragraphs: [
          'After a storm, lead volume can spike faster than estimating capacity can absorb it. That\'s exactly when qualification matters most — a fast, simple triage step (documented damage, insurance status, timeline) helps route the homeowners who need to move quickly to the front of the line, instead of first-come-first-served regardless of urgency.',
        ],
      },
      {
        heading: 'Trust Still Closes What Qualification Opens',
        paragraphs: [
          'Qualification gets the right homeowners in front of your team faster — but roofing is a trust-heavy purchase, and before/after proof, reviews, and clear communication about the insurance or financing process do most of the actual closing.',
        ],
      },
    ],
    relatedIndustrySlug: 'roofing',
    relatedGuideSlugs: ['how-to-qualify-home-service-leads', 'speed-to-lead-for-contractors'],
    publishedDate: '2026-08-27',
    updatedDate: '2026-08-27',
  },
  {
    slug: 'st-george-contractor-marketing',
    eyebrow: 'Southern Utah',
    h1: 'Contractor Marketing in St. George & Southern Utah',
    metaTitle: 'Contractor Marketing in St. George, Utah | Lusso Media',
    metaDescription:
      'What makes marketing for St. George and Southern Utah home-service contractors different — rapid growth, seasonal population swings, and a tight, competitive market.',
    intro:
      'St. George and the surrounding Southern Utah market — Washington County, Cedar City, and the smaller communities between them — has grown fast enough that the marketing playbook that worked five years ago is already out of date. Lusso Media is based here, and works with home-service contractors both in this market and nationwide.',
    sections: [
      {
        heading: 'A Fast-Growing, Increasingly Competitive Market',
        paragraphs: [
          'Southern Utah has been one of the fastest-growing metro areas in the country for several years running, which cuts both ways for home-service contractors: more homes and new construction means more total demand, but it also means more contractors — local and out-of-market — competing for the same searches and the same homeowners.',
          'A contractor who was the obvious local choice five years ago on reputation alone is now competing against newer entrants who are often more aggressive online, even if the quality of work doesn\'t compare.',
        ],
      },
      {
        heading: 'Seasonal & Population Swings Change the Math',
        paragraphs: [
          'St. George\'s population includes a meaningful seasonal and part-time-resident swing — snowbirds, second-home owners, and seasonal workers — which affects demand timing differently than a stable year-round metro. Landscaping, exterior, and outdoor-living demand in particular tracks closely with the outdoor season and the influx of seasonal residents, which means campaign timing matters more here than in a market with flatter demand.',
        ],
      },
      {
        heading: 'Cedar City & the Broader Southern Utah Service Area',
        paragraphs: [
          'Cedar City and the smaller communities across Southern Utah don\'t have the same search volume as St. George, but they\'re underserved by comparison — which often means less competition for a contractor willing to build real local presence there rather than treating it as an afterthought to a St. George-focused strategy.',
        ],
      },
      {
        heading: 'What This Means for a Local Contractor\'s Marketing System',
        paragraphs: [
          'A Southern Utah contractor competing seriously needs a system built for growth-market dynamics: strong enough local SEO and reputation signals to hold ground against new entrants, service-area-specific targeting that doesn\'t waste budget outside your actual coverage area, and enough flexibility to move budget toward Cedar City or outlying areas when St. George gets more competitive.',
        ],
      },
    ],
    faq: [
      {
        question: 'Does Lusso Media only work with Southern Utah contractors?',
        answer:
          'No — Lusso is based in St. George, Utah, and works with established home-service contractors here and in markets across the country. Southern Utah businesses get the advantage of a local team that understands this specific market.',
      },
      {
        question: 'Is St. George too competitive for a smaller contractor to grow in?',
        answer:
          'Competitive, yes — impossible, no. The contractors who struggle are the ones relying on reputation alone; the ones who install real demand-generation and conversion infrastructure are still finding room to grow even as the market fills in.',
      },
    ],
    relatedGuideSlugs: ['how-contractors-gain-local-market-share'],
    publishedDate: '2026-08-27',
    updatedDate: '2026-08-27',
  },
  {
    slug: 'landscaping-design-deposit-strategies',
    eyebrow: 'Landscaping',
    h1: 'Landscaping Design Deposit Strategies That Qualify Real Projects',
    metaTitle: 'Landscaping Design Deposit Strategies | Lusso Media',
    metaDescription:
      'How a design deposit filters serious design/build landscaping clients from price-shoppers — and why it protects both the pipeline and the estimating team.',
    intro:
      'Full-scope design/build landscaping projects take real design time before a homeowner ever sees a number. A design deposit is one of the most effective tools for making sure that time goes to homeowners who are actually going to build.',
    sections: [
      {
        heading: 'The Problem a Free Design Consultation Creates',
        paragraphs: [
          'Offering free design consultations feels generous, and it generates inquiries — but it also attracts homeowners who are years away from a real project, or who are collecting free design ideas from three contractors to piece together themselves. Every hour spent on a design that never converts is an hour not spent on a homeowner who was ready to build.',
        ],
      },
      {
        heading: 'How a Design Deposit Changes the Filter',
        paragraphs: [
          'A modest, refundable-toward-project deposit does two things at once: it signals to the homeowner that this is a real process, not a casual estimate, and it self-selects for the people who are actually planning to move forward. Homeowners who aren\'t serious tend to opt out at this stage — which is the point.',
        ],
      },
      {
        heading: 'Structuring It So It Doesn\'t Cost You Leads',
        paragraphs: [
          'The goal isn\'t to make the deposit a barrier — it\'s to make it a signal. That usually means keeping it modest relative to the total project size, applying it fully toward the project if the homeowner moves forward, and being clear up front about what the design process includes so the value is obvious before you ask for it.',
        ],
      },
      {
        heading: 'What This Looks Like Alongside Seasonal Booking',
        paragraphs: [
          'Design/build demand often needs to be captured months before the actual build season — a design deposit paired with seasonal production-window messaging ("reserve your spring installation slot") gives homeowners a reason to commit to the design process well ahead of when they\'d otherwise start thinking about it.',
        ],
      },
    ],
    faq: [
      {
        question: 'Will a design deposit reduce the number of landscaping leads?',
        answer:
          'It typically reduces raw inquiry volume slightly while increasing the share of inquiries that turn into real, booked design/build projects — which is a better trade for most design/build businesses than more low-intent leads.',
      },
      {
        question: 'Should every landscaping service require a deposit?',
        answer:
          'No — this makes sense mainly for full design/build and larger transformation projects. Smaller maintenance or install work usually doesn\'t need the same qualification step.',
      },
    ],
    relatedIndustrySlug: 'landscaping',
    relatedGuideSlugs: ['how-to-qualify-home-service-leads'],
    publishedDate: '2026-08-27',
    updatedDate: '2026-08-27',
  },
  {
    slug: 'referral-dependence-limits-contractor-growth',
    eyebrow: 'Growth Strategy',
    h1: 'Why Referral Dependence Limits Contractor Growth',
    metaTitle: 'Why Referral Dependence Limits Contractor Growth | Lusso Media',
    metaDescription:
      'Referrals are a sign of great work — and a growth ceiling. Why contractors who rely on them alone plateau, and what replaces them at scale.',
    intro:
      'Referral-driven growth feels safe: no ad spend, warm introductions, high trust from the first call. It\'s also one of the most common reasons a genuinely great contractor plateaus well below what their capacity could actually support.',
    sections: [
      {
        heading: 'Referrals Are a Lagging Indicator, Not a Growth Engine',
        paragraphs: [
          'A referral only exists because a past job was completed and a customer was happy enough to mention your name. That means referral volume is inherently capped by how many past customers you have and how recently you did work for them — it can\'t grow faster than your customer base already has, which makes it a poor tool for scaling beyond your current size.',
        ],
      },
      {
        heading: 'The Predictability Problem',
        paragraphs: [
          'Referrals also arrive unevenly — a strong month can be followed by a quiet one with no warning, because there\'s no system generating them on a schedule. That unpredictability makes it hard to plan crew size, hire ahead of demand, or invest confidently in growth, because next month\'s lead flow is largely out of your control.',
        ],
      },
      {
        heading: 'What Contractors Miss When They Rely on Referrals Alone',
        paragraphs: [
          'The businesses that grow past the referral ceiling don\'t abandon referrals — they add a second, controllable demand source alongside them. That usually means:',
        ],
        list: [
          'Paid and organic visibility that reaches homeowners with no prior connection to the business',
          'A conversion system that turns that new visibility into qualified leads, not just impressions',
          'A reputation engine (reviews, content, proof) that builds trust with strangers the way a referral builds trust with a friend',
        ],
      },
      {
        heading: 'Referrals Get Stronger, Not Weaker, Alongside This',
        paragraphs: [
          'Adding demand generation doesn\'t cannibalize referrals — a business with strong online visibility and reviews actually makes it easier for existing customers to refer you, because there\'s more social proof backing up their recommendation. The two reinforce each other; referral-only growth just can\'t scale on its own.',
        ],
      },
    ],
    relatedGuideSlugs: ['how-contractors-gain-local-market-share', 'how-to-qualify-home-service-leads'],
    publishedDate: '2026-08-27',
    updatedDate: '2026-08-27',
  },
  {
    slug: 'ev-charger-marketing-for-electricians',
    eyebrow: 'Electrical',
    h1: 'EV Charger Marketing for Electricians',
    metaTitle: 'EV Charger Marketing for Electricians | Lusso Media',
    metaDescription:
      'EV charger installs are one of the fastest-growing categories in residential electrical work. How electricians can build demand for it specifically.',
    intro:
      'EV charger installation is one of the few residential electrical categories with real tailwind growth — and most electrical marketing still treats it as a footnote inside a general "electrical services" page instead of its own opportunity.',
    sections: [
      {
        heading: 'Why EV Charger Demand Is Different From Typical Electrical Work',
        paragraphs: [
          'Most electrical leads are reactive — something broke, something needs inspecting. EV charger installs are usually planned and researched: a homeowner buys or leases an EV, then goes looking for someone to install home charging before the vehicle arrives. That research window is exactly where a contractor with a specific EV charger offer has an advantage over one relying on generic "electrician near me" visibility.',
        ],
      },
      {
        heading: 'What Homeowners Are Actually Trying to Figure Out',
        paragraphs: [
          'Most homeowners shopping for an EV charger install aren\'t sure what they need — panel capacity, permitting, charger brand compatibility, and cost are all open questions. Content and offers that answer those questions clearly (rather than just "we install EV chargers") do more to earn the call than a generic service listing.',
        ],
        list: [
          'Whether their existing panel has capacity, or needs an upgrade',
          'What permitting and inspection actually involves',
          'Rough cost range before committing to a full quote',
        ],
      },
      {
        heading: 'Panel Upgrades: The Hidden Upsell Inside EV Demand',
        paragraphs: [
          'A meaningful share of EV charger installs reveal a panel that needs upgrading first — which means EV charger demand can be a real feeder into higher-ticket panel upgrade work, not just a standalone service line. An offer built around a readiness evaluation (rather than jumping straight to "install my charger") surfaces that opportunity naturally.',
        ],
      },
      {
        heading: 'Positioning Against Big-Box and General Installers',
        paragraphs: [
          'EV charger installs increasingly compete against big-box retailers offering bundled installation and less-specialized handymen. An established, licensed electrician\'s advantage here is trust and code compliance — marketing that leads with credibility and safety, not just price, tends to hold up better in that comparison.',
        ],
      },
    ],
    faq: [
      {
        question: 'Is EV charger demand big enough to market separately?',
        answer:
          'In most growing residential markets, yes — EV adoption has grown fast enough that a dedicated offer and landing experience typically outperforms burying it inside a general electrical services page.',
      },
      {
        question: 'Does EV charger work require different licensing or marketing claims?',
        answer:
          'Licensing requirements vary by state and municipality — always represent your actual credentials accurately. From a marketing standpoint, leading with your electrical license and code-compliance experience is a real differentiator against non-specialized installers.',
      },
    ],
    relatedIndustrySlug: 'electrical',
    relatedGuideSlugs: ['how-to-qualify-home-service-leads'],
    publishedDate: '2026-08-27',
    updatedDate: '2026-08-27',
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getRelatedGuides(guide: Guide, limit = 3): Guide[] {
  if (guide.relatedGuideSlugs?.length) {
    const explicit = guide.relatedGuideSlugs
      .map((slug) => getGuide(slug))
      .filter((g): g is Guide => Boolean(g));
    if (explicit.length) return explicit.slice(0, limit);
  }
  return guides.filter((g) => g.slug !== guide.slug).slice(0, limit);
}
