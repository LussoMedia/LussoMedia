// Rule-based (not generative-AI) personalized interpretation of a score
// result, per Part 12/13: built entirely from the category scoring the
// visitor actually produced, never from invented facts about the business.

import { ScoreResult } from './scoring';
import { recommendations } from './config/scoreRecommendations';

export function buildInterpretation(result: ScoreResult): string {
  const gap = result.categoryResults.find((c) => c.category === result.strongest)!.score
    - result.categoryResults.find((c) => c.category === result.weakest)!.score;

  const weakestPriority = recommendations[result.weakest].priority;
  const strongestNote =
    gap >= 40
      ? `Your business appears to have meaningful strength in ${result.strongest.toLowerCase()}, well ahead of the rest of your system.`
      : `Your business is fairly even across most categories, without one clear standout strength.`;

  return `${strongestNote} The largest opportunity right now is ${result.weakest.toLowerCase()} — ${weakestPriority.toLowerCase()} Addressing this first tends to have the most leverage on your next stage of growth.`;
}
