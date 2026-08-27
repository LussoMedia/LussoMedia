'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNavLinks, primaryCTA, scoreCTA } from '@/lib/config/navigation';
import { industries } from '@/lib/config/industries';
import { playbook } from '@/lib/config/playbook';
import { trackEvent } from '@/lib/analytics';
import IndustriesDropdown from './nav/IndustriesDropdown';
import GrowthToolsDropdown from './nav/GrowthToolsDropdown';

const industryPaths = industries.map((i) => `/${i.slug}`);
const growthToolsPaths = [scoreCTA.href, playbook.href, playbook.thankYouHref];

function isActive(href: string, pathname: string): boolean {
  if (href === '/') return pathname === '/';
  if (href.startsWith('/#')) return false; // anchor links on the homepage — no distinct route to match
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [growthToolsOpen, setGrowthToolsOpen] = useState(false);

  const industriesActive = industryPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const growthToolsActive = growthToolsPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMobile = () => {
    setMenuOpen(false);
    setIndustriesOpen(false);
    setGrowthToolsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0D0D0D]/90 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo — always a real link to the homepage */}
          <Link
            href="/"
            aria-label="Lusso Media — Local Dominance homepage"
            onClick={() => trackEvent('logo_home_click', { placement: 'header' })}
            className="flex items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#008080] focus-visible:outline-offset-2"
          >
            <Image
              src="/images/logo.png"
              alt=""
              width={48}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav — activates at `xl` (1280px), not `md`. The full
              nav (logo + 6 links incl. two dropdowns + CTA) needs ~960px
              minimum with zero gap; `md` (768px) left a ~300–500px dead
              zone across tablet/laptop widths where items visibly
              collided. `xl` clears that with comfortable margin. */}
          <nav className="hidden xl:flex items-center gap-8">
            {mainNavLinks.map((link) => {
              if ('industries' in link && link.industries) {
                return <IndustriesDropdown key={link.label} active={industriesActive} />;
              }
              if ('growthTools' in link && link.growthTools) {
                return <GrowthToolsDropdown key={link.label} active={growthToolsActive} />;
              }
              const active = isActive(link.href, pathname);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() =>
                    trackEvent('nav_click', {
                      nav_item: link.label,
                      placement: 'desktop_nav',
                      pathname,
                      destination: link.href,
                    })
                  }
                  className={`text-sm font-medium transition-colors duration-150 ${
                    active ? 'text-white' : 'text-[#C5C6C7] hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden xl:block">
            <Link
              href={primaryCTA.href}
              onClick={() => trackEvent('primary_cta_click', { location: 'nav' })}
              className="booking-btn booking-btn--primary"
            >
              {primaryCTA.label}
            </Link>
          </div>

          {/* Hamburger — mirrors the nav/CTA breakpoint above */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="xl:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] group"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
                menuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile/compact drawer */}
      <div
        className={`fixed inset-0 z-40 xl:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeMobile}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-[#111111] border-l border-white/5 flex flex-col overflow-y-auto transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-white/5 flex-shrink-0">
            <Link
              href="/"
              aria-label="Lusso Media — Local Dominance homepage"
              onClick={() => {
                trackEvent('logo_home_click', { placement: 'mobile_menu' });
                closeMobile();
              }}
            >
              <Image
                src="/images/logo.png"
                alt=""
                width={48}
                height={48}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <button
              onClick={closeMobile}
              className="text-[#C5C6C7] hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-1 p-6 flex-1">
            {mainNavLinks.map((link) => {
              if ('industries' in link && link.industries) {
                return (
                  <div key={link.label} className="border-b border-white/5">
                    <button
                      onClick={() => setIndustriesOpen((v) => !v)}
                      aria-expanded={industriesOpen}
                      className={`w-full py-4 text-lg font-medium flex items-center justify-between transition-colors ${
                        industriesActive ? 'text-white' : 'text-[#C5C6C7] hover:text-white'
                      }`}
                    >
                      Industries
                      <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-200 ${industriesOpen ? 'rotate-180' : ''}`}>
                        <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {industriesOpen && (
                      <div className="pb-4 flex flex-col gap-1">
                        {industries.map((industry) => (
                          <Link
                            key={industry.slug}
                            href={`/${industry.slug}`}
                            onClick={() => {
                              trackEvent('nav_click', { nav_item: industry.name, placement: 'mobile_menu', destination: `/${industry.slug}` });
                              closeMobile();
                            }}
                            className="py-2.5 pl-4 text-base text-[#888] hover:text-white transition-colors"
                          >
                            {industry.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if ('growthTools' in link && link.growthTools) {
                return (
                  <div key={link.label} className="border-b border-white/5">
                    <button
                      onClick={() => {
                        setGrowthToolsOpen((v) => {
                          const next = !v;
                          if (next) trackEvent('growth_tools_opened', { placement: 'mobile_nav' });
                          return next;
                        });
                      }}
                      aria-expanded={growthToolsOpen}
                      className={`w-full py-4 text-lg font-medium flex items-center justify-between transition-colors ${
                        growthToolsActive ? 'text-white' : 'text-[#C5C6C7] hover:text-white'
                      }`}
                    >
                      Growth Tools
                      <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-200 ${growthToolsOpen ? 'rotate-180' : ''}`}>
                        <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {growthToolsOpen && (
                      <div className="pb-4 flex flex-col gap-2">
                        <Link
                          href={scoreCTA.href}
                          onClick={() => {
                            trackEvent('dominance_score_cta_click', { placement: 'mobile_growth_tools' });
                            closeMobile();
                          }}
                          className="pl-4 pr-2 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <p className="text-xs uppercase tracking-[0.1em] text-[#008080] mb-1">How Do You Stack Up Locally?</p>
                          <p className="text-base text-white">{scoreCTA.microcopy}</p>
                        </Link>
                        <Link
                          href={playbook.href}
                          onClick={() => {
                            trackEvent('playbook_nav_clicked', { placement: 'mobile_growth_tools' });
                            closeMobile();
                          }}
                          className="pl-4 pr-2 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <p className="text-xs uppercase tracking-[0.1em] text-[#008080] mb-1">{playbook.navEyebrow}</p>
                          <p className="text-base text-white">{playbook.navLabel}</p>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              const active = isActive(link.href, pathname);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    trackEvent('nav_click', {
                      nav_item: link.label,
                      placement: 'mobile_nav',
                      pathname,
                      destination: link.href,
                    });
                    closeMobile();
                  }}
                  className={`py-4 text-lg font-medium border-b border-white/5 transition-colors ${
                    active ? 'text-white' : 'text-[#C5C6C7] hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-6 flex-shrink-0">
            <Link
              href={primaryCTA.href}
              onClick={() => {
                trackEvent('primary_cta_click', { location: 'nav-mobile' });
                closeMobile();
              }}
              className="booking-btn booking-btn--primary w-full text-center block"
            >
              {primaryCTA.label}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
