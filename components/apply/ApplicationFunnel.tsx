'use client';

import { useState, useEffect } from 'react';
import { applicationSteps, totalSteps } from '@/lib/config/application';
import { routeApplication } from '@/lib/applicationRouting';
import { trackEvent, captureUtms, getStoredUtms } from '@/lib/analytics';
import { getStoredScoreLead } from '@/lib/leadStorage';
import ProgressIndicator from '@/components/ProgressIndicator';
import Honeypot from '@/components/Honeypot';
import StepForm from './StepForm';
import ApplicationResult from './ApplicationResult';

export default function ApplicationFunnel() {
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);

  const step = applicationSteps[stepIndex];
  const isLast = stepIndex === applicationSteps.length - 1;

  useEffect(() => {
    captureUtms();
    // Pre-fill from a completed Local Dominance Score, if one exists in this
    // session (Part 10), so the applicant doesn't repeat themselves. This
    // intentionally syncs from sessionStorage (an external system) after
    // mount rather than in the initializer, to avoid an SSR/client
    // hydration mismatch on the pre-filled input value.
    const scoreLead = getStoredScoreLead();
    if (scoreLead) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValues((v) => ({
        ...v,
        companyName: v.companyName || scoreLead.company,
        contactName: v.contactName || scoreLead.firstName,
        email: v.email || scoreLead.email,
      }));
    }
  }, []);

  const handleChange = (fieldId: string, value: string) => {
    setValues((v) => ({ ...v, [fieldId]: value }));
  };

  const handleNext = () => {
    if (!started) {
      trackEvent('application_start');
      setStarted(true);
    }
    trackEvent('application_step_complete', { step: step.id });

    if (isLast) {
      trackEvent('application_complete', values);
      setSubmitted(true);

      // Best-effort delivery — never blocks the funnel.
      fetch('/api/leads/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ values, utm: getStoredUtms(), companyFax: honeypot }),
      }).catch((err) => console.error('Application submission failed', err));
    } else {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  if (submitted) {
    const { tier } = routeApplication(values);
    return (
      <div className="min-h-screen flex items-center justify-center py-32">
        <ApplicationResult tier={tier} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-32">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <ProgressIndicator step={stepIndex + 1} total={totalSteps} label="Application" />
      <StepForm
        key={step.id}
        step={step}
        values={values}
        onChange={handleChange}
        onNext={handleNext}
        onBack={stepIndex > 0 ? handleBack : undefined}
        isLast={isLast}
      />
    </div>
  );
}
