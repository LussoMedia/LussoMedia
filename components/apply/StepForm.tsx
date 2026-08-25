'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { ApplicationStep, ApplicationField } from '@/lib/config/application';
import FieldRenderer from './FieldRenderer';

interface Props {
  step: ApplicationStep;
  values: Record<string, string>;
  onChange: (fieldId: string, value: string) => void;
  onNext: () => void;
  onBack?: () => void;
  isLast: boolean;
}

export default function StepForm({ step, values, onChange, onNext, onBack, isLast }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    step.fields.forEach((field: ApplicationField) => {
      if (field.required && !values[field.id]?.trim()) {
        nextErrors[field.id] = 'This field is required';
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) onNext();
  };

  return (
    <m.div
      key={step.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="max-w-xl mx-auto px-6"
    >
      <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold text-white mb-2 text-center">
        {step.title}
      </h2>
      {step.description && (
        <p className="text-[#C5C6C7] text-center mb-8 leading-relaxed">{step.description}</p>
      )}
      {!step.description && <div className="mb-8" />}

      <div className="flex flex-col gap-5">
        {step.fields.map((field) => (
          <FieldRenderer
            key={field.id}
            field={field}
            value={values[field.id] ?? ''}
            error={errors[field.id]}
            onChange={(v) => onChange(field.id, v)}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-10">
        {onBack ? (
          <button onClick={onBack} className="text-[#888] text-sm hover:text-white transition-colors">
            &larr; Back
          </button>
        ) : <span />}
        <button onClick={handleContinue} className="booking-btn booking-btn--primary px-8 py-3">
          {isLast ? 'Submit Application' : 'Continue'}
        </button>
      </div>
    </m.div>
  );
}
