'use client';

// Persists Local Dominance Score results across the funnel (score -> apply
// -> booking) via sessionStorage, per Part 10. No backend exists yet — this
// is the client-side half of that persistence; a real backend integration
// should read/write the same shape server-side once built.

import { ScoreResult } from './scoring';

const SCORE_STORAGE_KEY = 'lusso_score_result';

export interface StoredScoreLead {
  firstName: string;
  company: string;
  email: string;
  phone?: string;
  result: ScoreResult;
}

export function storeScoreLead(lead: StoredScoreLead) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(lead));
  } catch {
    // sessionStorage unavailable (private browsing, etc.) — non-fatal
  }
}

export function getStoredScoreLead(): StoredScoreLead | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(SCORE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
