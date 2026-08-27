'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { scoreCTA } from '@/lib/config/navigation';
import { playbook } from '@/lib/config/playbook';
import { trackEvent } from '@/lib/analytics';

interface Props {
  active: boolean;
}

// Desktop "Growth Tools" nav item — replaces the standalone Score nav entry
// with a small mega-menu offering two resource paths (Score + Playbook),
// modeled on IndustriesDropdown.tsx's outside-click/Escape handling.
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
          <Link
            href={scoreCTA.href}
            onClick={() => {
              trackEvent('dominance_score_cta_click', { placement: 'growth_tools_dropdown' });
              setOpen(false);
            }}
            className="block px-4 py-3.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <p className="text-xs uppercase tracking-[0.1em] text-[#008080] mb-1.5">How Do You Stack Up Locally?</p>
            <p className="text-sm font-semibold text-white mb-1">{scoreCTA.microcopy}</p>
            <p className="text-xs text-[#888] leading-relaxed">Find the biggest constraint in your current growth system.</p>
          </Link>

          <div className="border-t border-white/10 my-1" />

          <Link
            href={playbook.href}
            onClick={() => {
              trackEvent('playbook_nav_clicked', { placement: 'growth_tools_dropdown' });
              setOpen(false);
            }}
            className="block px-4 py-3.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <p className="text-xs uppercase tracking-[0.1em] text-[#008080] mb-1.5">{playbook.navEyebrow}</p>
            <p className="text-sm font-semibold text-white mb-1">{playbook.navLabel}</p>
            <p className="text-xs text-[#888] leading-relaxed">{playbook.navDescription}</p>
          </Link>
        </div>
      )}
    </div>
  );
}
