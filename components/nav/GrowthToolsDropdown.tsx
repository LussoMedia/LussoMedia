'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { scoreCTA, fieldGuides } from '@/lib/config/navigation';
import { playbook } from '@/lib/config/playbook';
import { trackEvent } from '@/lib/analytics';

interface Props {
  active: boolean;
}

// Desktop "Growth Tools" nav item — a small mega-menu grouped into
// DIAGNOSE / LEARN / IMPLEMENT (Phase 4A, Part "Navigation"). LEARN links
// only to /resources (not a separate Deep Guides link) — the hub itself
// surfaces both Field Guides and Deep Guides, per the "prefer simplicity"
// instruction. Modeled on IndustriesDropdown.tsx's outside-click/Escape
// handling.
export default function GrowthToolsDropdown({ active }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  const toggle = () => {
    setOpen((v) => {
      const next = !v;
      if (next) trackEvent('growth_tools_opened', { placement: 'desktop_nav' });
      return next;
    });
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={toggle}
        aria-expanded={open}
        aria-haspopup="true"
        className={`text-sm font-medium transition-colors duration-150 flex items-center gap-1 ${
          active ? 'text-white' : 'text-[#C5C6C7] hover:text-white'
        }`}
      >
        Growth Tools
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[380px] bg-[#141414] border border-white/10 rounded-xl shadow-xl p-3 z-50">
          <p className="text-[0.65rem] uppercase tracking-[0.12em] text-[#555] px-4 pt-2.5 pb-1.5">Diagnose</p>
          <Link
            href={scoreCTA.href}
            onClick={() => {
              trackEvent('dominance_score_cta_click', { placement: 'growth_tools_dropdown' });
              setOpen(false);
            }}
            className="block px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <p className="text-sm font-semibold text-white mb-1">{scoreCTA.label}</p>
            <p className="text-xs text-[#888] leading-relaxed">{scoreCTA.microcopy}</p>
          </Link>

          <div className="border-t border-white/10 my-1.5" />

          <p className="text-[0.65rem] uppercase tracking-[0.12em] text-[#555] px-4 pt-1.5 pb-1.5">Learn</p>
          <Link
            href={fieldGuides.href}
            onClick={() => {
              trackEvent('field_guide_related_click', { from: 'growth_tools_dropdown', destination: fieldGuides.href });
              setOpen(false);
            }}
            className="block px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <p className="text-sm font-semibold text-white mb-1">{fieldGuides.navLabel}</p>
            <p className="text-xs text-[#888] leading-relaxed">{fieldGuides.navDescription}</p>
          </Link>

          <div className="border-t border-white/10 my-1.5" />

          <p className="text-[0.65rem] uppercase tracking-[0.12em] text-[#555] px-4 pt-1.5 pb-1.5">Implement</p>
          <Link
            href={playbook.href}
            onClick={() => {
              trackEvent('playbook_nav_clicked', { placement: 'growth_tools_dropdown' });
              setOpen(false);
            }}
            className="block px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <p className="text-sm font-semibold text-white mb-1">{playbook.navLabel}</p>
            <p className="text-xs text-[#888] leading-relaxed">{playbook.navDescription}</p>
          </Link>
        </div>
      )}
    </div>
  );
}
