'use client';

import { m } from 'framer-motion';

// Shown only when the applicant arrived with a completed Local Dominance
// Score in this session (Change 5 — score→application context). Never
// shown to applicants entering through unrelated paths. Purely contextual —
// does not imply the score itself changes qualification; routeApplication()
// still decides tier from the application's own answers.
export default function ScoreContextBanner() {
  return (
    <m.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto mb-8 bg-[#141414] border border-[#008080]/25 rounded-xl px-5 py-4 text-center"
    >
      <p className="text-white text-sm font-semibold mb-1">
        Your Local Dominance Score has been completed.
      </p>
      <p className="text-[#888] text-xs leading-relaxed">
        We&rsquo;ll use your assessment alongside the information below to determine whether the
        Local Dominance System is a fit for your market and current stage of growth.
      </p>
    </m.div>
  );
}
