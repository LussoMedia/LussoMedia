import BookingButton from './BookingButton';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'What We Do', href: '#offer' },
  { label: 'Our Work', href: '#case-studies' },
  { label: 'About', href: '#founder' },
  { label: 'FAQ', href: '#faq' },
];

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/illussomedia',
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
    href: 'https://tiktok.com/@illussomedia',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.83a8.19 8.19 0 004.8 1.53V6.9a4.85 4.85 0 01-1.03-.21z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/illussomedia',
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
            <a href="#hero" className="inline-block mb-5">
              <span className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">
                Lusso<span className="text-[#008080]">.</span>
              </span>
            </a>
            <p className="text-[#888] text-sm leading-relaxed max-w-sm mb-6">
              A done-for-you content and ad partnership for service businesses serious about growth.
              Strategy, production, and paid ads — all handled.
            </p>
            <div className="flex items-center gap-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008080]" />
              <span className="text-[#888] text-sm">Southern Utah — Serving Businesses Nationwide</span>
            </div>
            <BookingButton label="Book a Free Strategy Call" variant="primary" />
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white text-sm font-semibold font-[family-name:var(--font-space-grotesk)] mb-5 uppercase tracking-[0.1em]">
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#888] text-sm hover:text-[#008080] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <p className="text-white text-sm font-semibold font-[family-name:var(--font-space-grotesk)] mb-5 uppercase tracking-[0.1em]">
              Connect
            </p>
            <div className="flex flex-col gap-3 mb-8">
              <a
                href="mailto:hello@illussomedia.com"
                className="text-[#888] text-sm hover:text-[#008080] transition-colors"
              >
                hello@illussomedia.com
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
            &copy; 2025 Lusso Media. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[#555] text-xs hover:text-[#888] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[#555] text-xs hover:text-[#888] transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
