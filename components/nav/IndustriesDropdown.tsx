'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { industries } from '@/lib/config/industries';
import { scoreCTA } from '@/lib/config/navigation';
import { trackEvent } from '@/lib/analytics';

interface Props {
  active: boolean;
}

// Desktop "Industries" nav item — opens a compact panel listing the 5
// vertical pages, plus a visually separate diagnostic block at the bottom
// (Part 9) so the Score doesn't read as just another industry link.
export default function IndustriesDropdown({ active }: Props) {
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

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`text-sm font-medium transition-colors duration-150 flex items-center gap-1 ${
          active ? 'text-white' : 'text-[#C5C6C7] hover:text-white'
        }`}
      >
        Industries
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-[#141414] border border-white/10 rounded-xl shadow-xl p-4 z-50">
          <div className="grid grid-cols-2 gap-1 mb-3">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/${industry.slug}`}
                onClick={() => {
                  trackEvent('nav_click', { nav_item: industry.name, placement: 'dropdown_nav', destination: `/${industry.slug}` });
                  setOpen(false);
                }}
                className="px-3 py-2.5 rounded-lg text-sm text-[#C5C6C7] hover:text-white hover:bg-white/5 transition-colors"
              >
                {industry.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-white/10 pt-3">
            <p className="text-xs uppercase tracking-[0.1em] text-[#888] mb-2 px-1">
              Not Sure Where Your Growth Is Leaking?
            </p>
            <Link
              href={scoreCTA.href}
              onClick={() => {
                trackEvent('dominance_score_cta_click', { placement: 'industries_dropdown' });
                setOpen(false);
              }}
              className="block px-3 py-2.5 rounded-lg bg-[#008080]/10 border border-[#008080]/25 hover:border-[#008080]/50 transition-colors"
            >
              <p className="text-sm font-semibold text-white">{scoreCTA.label}</p>
              <p className="text-xs text-[#888] mt-0.5">{scoreCTA.microcopy}</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
