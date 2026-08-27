'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { trackEvent, getStoredUtms } from '@/lib/analytics';
import Honeypot from '@/components/Honeypot';

type SubmitState = 'idle' | 'submitting' | 'error';

// Lead-capture form for the playbook funnel (Part 4, Section 08). Only two
// fields — first name + email — validated client-side for UX and re-checked
// server-side (the real boundary; see lib/validation.ts). Redirects to the
// thank-you page only on a verified delivery, matching the application
// funnel's "never show success for an undelivered submission" rule.
export default function PlaybookForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<{ firstName?: string; email?: string }>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const started = useRef(false);

  const markStarted = () => {
    if (!started.current) {
      started.current = true;
      trackEvent('playbook_form_started');
    }
  };

  const validate = (): boolean => {
    const next: { firstName?: string; email?: string } = {};
    if (!firstName.trim()) next.firstName = 'Enter your first name';
    if (!email.trim()) {
      next.email = 'Enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Enter a valid email';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitState === 'submitting') return; // guards against duplicate submits
    if (!validate()) return;

    setSubmitState('submitting');
    try {
      const res = await fetch('/api/leads/playbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email, utm: getStoredUtms(), companyFax: honeypot }),
      });

      if (!res.ok) {
        setSubmitState('error');
        return;
      }
      const data = await res.json().catch(() => null);
      if (!data?.ok) {
        setSubmitState('error');
        return;
      }

      trackEvent('playbook_form_submitted');
      router.push('/playbook-thank-you');
    } catch (err) {
      console.error('Playbook form submission failed', err);
      setSubmitState('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md mx-auto">
      <Honeypot value={honeypot} onChange={setHoneypot} />

      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="playbook-firstName" className="block text-sm text-[#C5C6C7] mb-2">
            First Name
          </label>
          <input
            id="playbook-firstName"
            type="text"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => {
              markStarted();
              setFirstName(e.target.value);
            }}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'playbook-firstName-error' : undefined}
            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:outline-none focus:border-[#008080] transition-colors"
          />
          {errors.firstName && (
            <p id="playbook-firstName-error" className="text-red-400 text-xs mt-1.5">
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="playbook-email" className="block text-sm text-[#C5C6C7] mb-2">
            Email Address
          </label>
          <input
            id="playbook-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              markStarted();
              setEmail(e.target.value);
            }}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'playbook-email-error' : undefined}
            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:outline-none focus:border-[#008080] transition-colors"
          />
          {errors.email && (
            <p id="playbook-email-error" className="text-red-400 text-xs mt-1.5">
              {errors.email}
            </p>
          )}
        </div>

        {submitState === 'error' && (
          <p className="text-red-400 text-sm" role="alert">
            Something went wrong on our end — nothing was lost. Please try again.
          </p>
        )}

        <button
          type="submit"
          disabled={submitState === 'submitting'}
          className="booking-btn booking-btn--primary text-base px-8 py-3.5 w-full disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitState === 'submitting' ? 'Sending…' : 'Send Me the Playbook →'}
        </button>

        <p className="text-[#666] text-xs text-center">
          61-page PDF • Instant access • Practical implementation material
        </p>
      </div>
    </form>
  );
}
