'use client';

// Central event taxonomy (Part 19). Every conversion-path interaction should
// fire through trackEvent() rather than pushing to dataLayer directly, so the
// event names stay consistent and future CRM events (call_attended,
// proposal_sent, client_won) can be added in one place.

export type AnalyticsEvent =
  | 'page_view'
  | 'primary_cta_click'
  | 'secondary_cta_click'
  | 'case_study_view'
  | 'case_study_media_interaction'
  | 'case_study_score_cta_click'
  | 'case_study_plan_cta_click'
  | 'objection_expand'
  | 'dominance_score_start'
  | 'dominance_score_question'
  | 'dominance_score_complete'
  | 'dominance_score_lead_capture'
  | 'dominance_score_cta_click'
  | 'dominance_score_plan_click'
  | 'dominance_score_result_save'
  | 'application_start'
  | 'application_step_complete'
  | 'application_qualified'
  | 'application_complete'
  | 'calendar_view'
  | 'call_booked'
  | 'confirmation_page_view'
  | 'case_study_view_from_confirmation'
  | 'ab_test_assigned'
  | 'nav_click'
  | 'logo_home_click';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function trackEvent(event: AnalyticsEvent, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

// --- UTM persistence (Part 19 / Part 27) ---
// Captures UTM params on first landing and persists them through the funnel
// (landing -> diagnostic -> application -> booking) via sessionStorage, so
// attribution survives client-side route/anchor navigation.

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
const UTM_STORAGE_KEY = 'lusso_utm_attribution';

export function captureUtms() {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) found[key] = value;
  });
  if (Object.keys(found).length > 0) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(found));
  }
}

export function getStoredUtms(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
