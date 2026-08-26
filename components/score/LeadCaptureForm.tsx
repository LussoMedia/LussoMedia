'use client';

import { useState, FormEvent } from 'react';
import { m } from 'framer-motion';
import Honeypot from '@/components/Honeypot';

export interface LeadCaptureData {
  firstName: string;
  company: string;
  email: string;
  phone: string;
  companyFax: string;
}

interface Props {
  onSubmit: (data: LeadCaptureData) => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LeadCaptureForm({ onSubmit }: Props) {
  const [data, setData] = useState<Omit<LeadCaptureData, 'companyFax'>>({ firstName: '', company: '', email: '', phone: '' });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof LeadCaptureData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (!data.firstName.trim()) nextErrors.firstName = 'First name is required';
    if (!data.company.trim()) nextErrors.company = 'Company name is required';
    if (!data.email.trim() || !EMAIL_RE.test(data.email)) nextErrors.email = 'Enter a valid email';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    onSubmit({ ...data, companyFax: honeypot });
  };

  return (
    <m.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="max-w-md mx-auto px-6"
      noValidate
    >
      {/* Only heading visible at this stage (ScoreReveal's h1 has
          unmounted) — Part 27/31. */}
      <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white mb-2 text-center">
        Unlock Your Full Breakdown
      </h1>
      <p className="text-[#888] text-sm text-center mb-8">
        Score by category, your top growth leaks, and immediate next steps.
      </p>

      <Honeypot value={honeypot} onChange={setHoneypot} />

      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm text-[#C5C6C7] mb-1.5">First Name</label>
          <input
            id="firstName"
            type="text"
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
            className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#008080] transition-colors"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
          />
          {errors.firstName && <p id="firstName-error" className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm text-[#C5C6C7] mb-1.5">Company</label>
          <input
            id="company"
            type="text"
            value={data.company}
            onChange={(e) => setData({ ...data, company: e.target.value })}
            className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#008080] transition-colors"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'company-error' : undefined}
          />
          {errors.company && <p id="company-error" className="text-red-400 text-xs mt-1">{errors.company}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-[#C5C6C7] mb-1.5">Email</label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#008080] transition-colors"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <p id="email-error" className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm text-[#C5C6C7] mb-1.5">Phone <span className="text-[#666]">(optional)</span></label>
          <input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#008080] transition-colors"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="booking-btn booking-btn--primary w-full mt-8 text-base py-4 disabled:opacity-60"
      >
        {submitting ? 'Unlocking…' : 'Unlock Your Full Breakdown'}
      </button>
    </m.form>
  );
}
