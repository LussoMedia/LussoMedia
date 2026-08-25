'use client';

import { ApplicationField } from '@/lib/config/application';

interface Props {
  field: ApplicationField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export default function FieldRenderer({ field, value, error, onChange }: Props) {
  if (field.type === 'radio') {
    return (
      <div className="flex flex-col gap-3">
        {field.options?.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`w-full text-left px-6 py-5 rounded-xl border transition-all duration-200 text-base ${
              value === option
                ? 'border-[#008080] bg-[#008080]/10 text-white'
                : 'border-white/10 bg-[#141414] text-[#C5C6C7] hover:border-[#008080]/40'
            }`}
          >
            {option}
          </button>
        ))}
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    );
  }

  if (field.type === 'select') {
    return (
      <div>
        {field.label && <label htmlFor={field.id} className="block text-sm text-[#C5C6C7] mb-1.5">{field.label}</label>}
        <select
          id={field.id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#008080] transition-colors"
          aria-invalid={!!error}
        >
          <option value="">Select…</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div>
      {field.label && <label htmlFor={field.id} className="block text-sm text-[#C5C6C7] mb-1.5">{field.label}</label>}
      <input
        id={field.id}
        type={field.type}
        value={value}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#008080] transition-colors"
        aria-invalid={!!error}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
