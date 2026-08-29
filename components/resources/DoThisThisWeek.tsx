'use client';

// The recognizable Field Guide action block (Part 17). Purely visual
// checkboxes — no persisted state (Part 17: "Do not require persistent
// user state"), so a refresh always shows a clean slate. Clicking still
// fires an analytics event so engagement is measurable (Part 53).

import { useState } from 'react';
import type { FieldGuideAction } from '@/lib/config/fieldGuides';
import { trackEvent } from '@/lib/analytics';

export default function DoThisThisWeek({ actions, guideSlug }: { actions: FieldGuideAction[]; guideSlug: string }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggle = (i: number, title: string) => {
    setChecked((prev) => {
      const next = !prev[i];
      trackEvent('field_guide_action_click', { slug: guideSlug, action_index: i, action_title: title, checked: next });
      return { ...prev, [i]: next };
    });
  };

  return (
    <div className="border-t-2 border-[#008080] pt-8">
      <p className="text-eyebrow text-[#008080] mb-6">Do This This Week</p>
      <ol className="flex flex-col">
        {actions.map((action, i) => (
          <li key={action.title} className="flex items-start gap-4 py-4 border-b border-white/[0.08] last:border-b-0">
            <button
              type="button"
              onClick={() => toggle(i, action.title)}
              aria-pressed={Boolean(checked[i])}
              aria-label={`Mark "${action.title}" as done (not saved — visual only)`}
              className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-[var(--radius-sm)] border flex items-center justify-center transition-colors ${
                checked[i] ? 'bg-[#008080] border-[#008080] text-white' : 'border-white/25 text-transparent'
              }`}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8.5l3.2 3L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className={checked[i] ? 'opacity-60' : ''}>
              <p className={`${numeralClass} text-white font-semibold text-[0.95rem]`}>
                {String(i + 1).padStart(2, '0')} &mdash; {action.title}
              </p>
              <p className="text-[#888] text-sm mt-1 leading-relaxed">{action.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

const numeralClass = 'font-[family-name:var(--font-display)]';
