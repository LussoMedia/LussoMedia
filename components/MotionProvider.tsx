'use client';

import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {/* reducedMotion="user" makes every m.* animation site-wide respect the
          OS-level prefers-reduced-motion setting automatically (Part 18/27) —
          transforms are skipped, only opacity fades are kept. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
