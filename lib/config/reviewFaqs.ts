import { FaqItem } from './faqs';

// FAQ content for the post-application review page (app/apply's Tier B
// result). Kept separate from the main site's lib/config/faqs.ts because
// these questions are specific to "what happens after I've already
// applied" — a different moment than a prospect still deciding whether to
// reach out. The pricing answer is the one exception: it's pulled from
// faqs.ts directly (see components/apply/ReviewFAQ.tsx) so pricing never
// reads differently in two places.
export const reviewFaqs: FaqItem[] = [
  {
    question: 'How long does the review take?',
    answer:
      "We review applications personally rather than automatically approving every submission. If we see a clear fit or need more information, we'll follow up using the contact information you provided.",
  },
  {
    question: "What happens if we're a strong fit?",
    answer:
      "We'll invite you to the next step, where we'll review your current growth system, service economics, market opportunity, and what a Local Dominance Plan could look like for your business.",
  },
  {
    question: 'What if you need more information?',
    answer: "We'll reach out with a few focused questions rather than asking you to complete the entire application again.",
  },
  {
    question: 'Does submitting an application commit us to anything?',
    answer: 'No. The application is simply the first step in determining whether the Local Dominance System makes sense for the business.',
  },
  {
    question: 'How much advertising spend should we expect?',
    answer:
      "There isn't one universal budget. We look at average ticket, margin, close rate, capacity, market size, and expected acquisition costs before recommending media spend.",
  },
  {
    question: 'Do you work with competitors in the same market?',
    answer:
      'Lusso uses Market Protection (Territory Lock). During an active partnership, we will not actively operate the same primary offer for a direct competitor targeting the same agreed local territory.',
  },
  {
    question: 'What if we already have a website or run ads?',
    answer:
      "We don't replace working assets simply to rebuild them. Existing websites, campaigns, creative, and tracking are evaluated first, and we improve the parts that are actually limiting performance.",
  },
];
