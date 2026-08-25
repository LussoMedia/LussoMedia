// Centralized application qualification/routing logic (Part 11). All tier
// decisions live here — components only render the result, never decide it.

export type ApplicationAnswers = Record<string, string>;

export type Tier = 'A' | 'B' | 'C';

export interface TierResult {
  tier: Tier;
  reasons: string[];
}

const LOW_REVENUE = ['Under $500K'];
const NO_CAPACITY = ['No additional capacity right now'];
const NO_FOLLOWUP = ['No one consistently'];

export function routeApplication(answers: ApplicationAnswers): TierResult {
  const reasons: string[] = [];

  const investment = answers.investmentReadiness;
  const revenue = answers.monthlyRevenue;
  const capacity = answers.capacity;
  const followUp = answers.leadFollowUp;

  // Hard disqualifier: not investment-ready.
  if (investment === 'No') {
    reasons.push('Not currently ready to invest at the required level.');
    return { tier: 'C', reasons };
  }

  // Missing critical info -> can't confidently route -> manual review.
  if (!investment || !revenue || !capacity) {
    reasons.push('Incomplete information — needs manual review.');
    return { tier: 'B', reasons };
  }

  const lowRevenue = LOW_REVENUE.includes(revenue);
  const noCapacity = NO_CAPACITY.includes(capacity);
  const noFollowUp = NO_FOLLOWUP.includes(followUp);

  if (investment === 'Yes' && !lowRevenue && !noCapacity && !noFollowUp) {
    reasons.push('Investment-ready, sufficient economics, has capacity, and follows up with leads.');
    return { tier: 'A', reasons };
  }

  if (investment === 'Yes' && (lowRevenue || noCapacity || noFollowUp)) {
    if (lowRevenue) reasons.push('Revenue is on the lower end for this engagement — needs a closer look.');
    if (noCapacity) reasons.push('No current capacity for additional work.');
    if (noFollowUp) reasons.push('No consistent lead follow-up in place.');
    return { tier: 'B', reasons };
  }

  // "Potentially" investment readiness -> always manual review, never
  // auto-rejected and never auto-booked.
  reasons.push('Investment readiness is conditional on the numbers making sense.');
  return { tier: 'B', reasons };
}
