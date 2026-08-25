// Pure scoring engine — reads only from lib/config/score.ts. No component
// should compute or duplicate this logic; call computeScore() instead.

import { categories, scoreQuestions, getBand, ScoreCategory, ScoreBand } from './config/score';

export type ScoreAnswers = Record<string, number>; // questionId -> option index

export interface CategoryResult {
  category: ScoreCategory;
  score: number; // 0-100
  questionCount: number;
}

export interface ScoreResult {
  overall: number; // 0-100
  band: ScoreBand;
  categoryResults: CategoryResult[];
  strongest: ScoreCategory;
  weakest: ScoreCategory;
  rankedWeakest: ScoreCategory[]; // weakest-first, for "top 3 growth leaks"
}

const MAX_POINTS_PER_QUESTION = 3;

export function computeScore(answers: ScoreAnswers): ScoreResult {
  const categoryResults: CategoryResult[] = categories.map((category) => {
    const questions = scoreQuestions.filter((q) => q.category === category);
    const maxPossible = questions.length * MAX_POINTS_PER_QUESTION;
    const earned = questions.reduce((sum, q) => {
      const answerIndex = answers[q.id];
      if (answerIndex === undefined) return sum;
      return sum + (q.options[answerIndex]?.points ?? 0);
    }, 0);
    const score = maxPossible > 0 ? Math.round((earned / maxPossible) * 100) : 0;
    return { category, score, questionCount: questions.length };
  });

  const overall = Math.round(
    categoryResults.reduce((sum, c) => sum + c.score, 0) / categoryResults.length
  );

  const ranked = [...categoryResults].sort((a, b) => a.score - b.score);

  return {
    overall,
    band: getBand(overall),
    categoryResults,
    strongest: [...categoryResults].sort((a, b) => b.score - a.score)[0].category,
    weakest: ranked[0].category,
    rankedWeakest: ranked.slice(0, 3).map((c) => c.category),
  };
}

export function isComplete(answers: ScoreAnswers): boolean {
  return scoreQuestions.every((q) => answers[q.id] !== undefined);
}
