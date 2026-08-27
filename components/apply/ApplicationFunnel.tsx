'use client';

import { useState, useEffect, useCallback } from 'react';
import { applicationSteps, totalSteps } from '@/lib/config/application';
import { routeApplication } from '@/lib/applicationRouting';
import { trackEvent, captureUtms, getStoredUtms } from '@/lib/analytics';
import { getStoredScoreLead, StoredScoreLead } from '@/lib/leadStorage';
import ProgressIndicator from '@/components/ProgressIndicator';
import Honeypot from '@/components/Honeypot';
import StepForm from './StepForm';
import ApplicationResult from './ApplicationResult';
import SubmissionError from './SubmissionError';
import ScoreContextBanner from './ScoreContextBanner';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function ApplicationFunnel() {
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [started, setStarted] = useState(false);
  // Full score record (not just the 3 fields pre-filled into `values`) —
  // kept in state purely to know whether to show the contextual banner
  // (Change 5). Never fed into qualification logic.
  const [scoreLead, setScoreLead] = useState<StoredScoreLead | null>(null);

  const step = applicationSteps[stepIndex];
  const isLast = stepIndex === applicationSteps.length - 1;

  useEffect(() => {
    captureUtms();
    // Pre-fill from a completed Local Dominance Score, if one exists in this
    // session (Part 10), so the applicant doesn't repeat themselves. This
    // intentionally syncs from sessionStorage (an external system) after
    // mount rather than in the initializer, to avoid an SSR/client
    // hydration mismatch on the pre-filled input value.
    const storedScoreLead = getStoredScoreLead();
    if (storedScoreLead) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValues((v) => ({
        ...v,
        companyName: v.companyName || storedScoreLead.company,
        contactName: v.contactName || storedScoreLead.firstName,
        email: v.email || storedScoreLead.email,
      }));
      setScoreLead(storedScoreLead);
    }
  }, []);

  const handleChange = (fieldId: string, value: string) => {
    setValues((v) => ({ ...v, [fieldId]: value }));
  };

  // Verifies delivery before ever showing a success screen (Part 2). The
  // server confirms the submission actually reached a real endpoint (the
  // admin notification email or the CRM record) before this resolves
  // successfully — a network failure, a timeout, or a backend that isn't
  // configured all land in the error state instead, with the form's
  // answers left intact for a retry.
  const submitApplication = useCallback(async () => {
    setSubmitState('submitting');
    try {
      const res = await fetch('/api/leads/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ values, utm: getStoredUtms(), companyFax: honeypot }),
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

      trackEvent('application_complete', values);
      setSubmitState('success');
    } catch (err) {
      console.error('Application submission failed', err);
      setSubmitState('error');
    }
  }, [values, honeypot]);

  const handleNext = () => {
    if (!started) {
      trackEvent('application_start');
      setStarted(true);
    }
    trackEvent('application_step_complete', { step: step.id });

    // Part 17 — as soon as we have contact info (end of step 1), seed the
    // abandonment-recovery automation. Silent — no admin email, no tier.
    // Overwritten to "completed" if they finish (see final submit below).
    if (step.id === 'business' && values.email && values.companyName) {
      fetch('/api/leads/application-start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactName: values.contactName,
          email: values.email,
          companyName: values.companyName,
          companyFax: honeypot,
        }),
      }).catch((err) => console.error('Application-start sync failed', err));
    }

    if (isLast) {
      submitApplication();
    } else {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  if (submitState === 'success') {
    const { tier } = routeApplication(values);
    return <ApplicationResult tier={tier} values={values} />;
  }

  if (submitState === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center py-32">
        <SubmissionError onRetry={submitApplication} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-32">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      {scoreLead && stepIndex === 0 && <ScoreContextBanner />}
      <ProgressIndicator step={stepIndex + 1} total={totalSteps} label="Application" />
      <StepForm
        key={step.id}
        step={step}
        values={values}
        onChange={handleChange}
        onNext={handleNext}
        onBack={stepIndex > 0 ? handleBack : undefined}
        isLast={isLast}
        submitting={submitState === 'submitting'}
      />
    </div>
  );
}
