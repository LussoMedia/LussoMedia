// Resolves a Field Guide's typed `nextStepCTA` (Part 10/24) into an actual
// href/label/analytics-event triple. Centralized so every guide's single
// CTA always points at a real, current destination — never a hard-coded
// string that can drift from lib/config/navigation.ts.

import type { FieldGuideCTA } from './config/fieldGuides';
import { primaryCTA, scoreCTA, secondaryCTA } from './config/navigation';
import { playbook } from './config/playbook';
import type { AnalyticsEvent } from './analytics';

export function resolveFieldGuideCTA(cta: FieldGuideCTA): { href: string; label: string; event: AnalyticsEvent } {
  switch (cta.type) {
    case 'score':
      return { href: scoreCTA.href, label: 'Take the Local Dominance Score', event: 'field_guide_score_click' };
    case 'playbook':
      return { href: playbook.href, label: `Get ${playbook.shortTitle}`, event: 'field_guide_playbook_click' };
    case 'system':
      return { href: '/system', label: 'Explore the Local Dominance System', event: 'field_guide_related_click' };
    case 'results':
      return { href: secondaryCTA.href, label: secondaryCTA.label, event: 'field_guide_related_click' };
    case 'apply':
      return { href: primaryCTA.href, label: primaryCTA.label, event: 'field_guide_related_click' };
  }
}
