'use client';

import { m } from 'framer-motion';

const gotYouHere = ['Reputation', 'Referrals', 'Repeat customers', 'Word of mouth'];
const getsYouNext = [
  'Stronger offers',
  'Conversion infrastructure',
  'Authority',
  'Predictable demand',
  'Reputation compounding',
  'Measurement',
];

export default function ReferralCeiling() {
  return (
    <section className="section-pad bg-[#0D0D0D]">
      <div className="max-w-5xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-5xl font-bold text-white leading-tight">
            Referrals Built Your Business.
            <br />
            They Shouldn&rsquo;t Be Your Only Growth Plan.
          </h2>
        </m.div>

        <m.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-[#C5C6C7] max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          Referrals are powerful because they arrive with trust already built in. But they only
          grow as fast as your existing customer base talks about you. Meanwhile, homeowners
          you&rsquo;ve never reached are finding and choosing competitors every day.
        </m.p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <m.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="bg-[#141414] border border-white/5 rounded-xl p-8"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-[#888] mb-5">What Got You Here</p>
            <ul className="space-y-3">
              {gotYouHere.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[#C5C6C7]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#888] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="bg-[#141414] border border-[#008080]/30 rounded-xl p-8"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-[#008080] mb-5">What Gets You to the Next Level</p>
            <ul className="space-y-3">
              {getsYouNext.map((item) => (
                <li key={item} className="flex items-center gap-3 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008080] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </m.div>
        </div>

        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-[#C5C6C7] font-medium max-w-2xl mx-auto"
        >
          Lusso doesn&rsquo;t replace referrals. We install the system that expands your
          reputation beyond the people who already know you.
        </m.p>
      </div>
    </section>
  );
}
