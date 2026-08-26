'use client';

import Image from 'next/image';
import Link from 'next/link';
import { footerNavLinks, legalLinks, primaryCTA } from '@/lib/config/navigation';
import { trackEvent } from '@/lib/analytics';

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/illussomedia/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@illussomedia',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.83a8.19 8.19 0 004.8 1.53V6.9a4.85 4.85 0 01-1.03-.21z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/lussomedia',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-white/5">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              aria-label="Lusso Media — Local Dominance homepage"
              onClick={() => trackEvent('logo_home_click', { placement: 'footer' })}
              className="inline-block mb-5 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#008080] focus-visible:outline-offset-2"
            >
              <Image
                src="/images/logo.png"
                alt=""
                width={56}
                height={56}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-[#888] text-sm leading-relaxed max-w-sm mb-6">
              The Local Dominance System — done-for-you customer acquisition infrastructure for
              established home-service contractors ready to become the first choice in their market.
            </p>
            <div className="flex items-center gap-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008080]" />
              <span className="text-[#888] text-sm">Southern Utah — Serving Contractors Nationwide</span>
            </div>
            <Link
              href={primaryCTA.href}
              onClick={() => trackEvent('primary_cta_click', { location: 'footer' })}
              className="booking-btn booking-btn--primary inline-block"
            >
              {primaryCTA.label}
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white text-sm font-semibold font-[family-name:var(--font-space-grotesk)] mb-5 uppercase tracking-[0.1em]">
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {footerNavLinks.map((link) => {
                const isScore = link.href === '/local-dominance-score';
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() =>
                        trackEvent(isScore ? 'dominance_score_cta_click' : 'nav_click', {
                          nav_item: link.label,
                          placement: 'footer',
                          destination: link.href,
                        })
                      }
                      className="text-[#888] text-sm hover:text-[#008080] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <p className="text-white text-sm font-semibold font-[family-name:var(--font-space-grotesk)] mb-5 uppercase tracking-[0.1em]">
              Connect
            </p>
            <div className="flex flex-col gap-3 mb-8">
              <a
                href="mailto:Admin@illussomedia.com"
                className="text-[#888] text-sm hover:text-[#008080] transition-colors"
              >
                Admin@illussomedia.com
              </a>
              <a
                href="https://illussomedia.com"
                className="text-[#888] text-sm hover:text-[#008080] transition-colors"
              >
                illussomedia.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-lg bg-[#141414] border border-white/10 flex items-center justify-center text-[#888] hover:text-[#008080] hover:border-[#008080]/50 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#555] text-xs">
            &copy; {new Date().getFullYear()} Lusso Media. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#555] text-xs hover:text-[#888] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
