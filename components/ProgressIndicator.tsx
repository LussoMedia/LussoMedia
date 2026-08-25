interface ProgressIndicatorProps {
  step: number; // 1-indexed current step
  total: number;
  label?: string;
}

export default function ProgressIndicator({ step, total, label }: ProgressIndicatorProps) {
  const pct = Math.min(100, Math.round((step / total) * 100));
  return (
    <div className="w-full max-w-lg mx-auto mb-10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-[#888] uppercase tracking-[0.1em]">
          {label ?? `Step ${step} of ${total}`}
        </span>
        <span className="text-xs text-[#888]">{pct}%</span>
      </div>
      <div className="h-1.5 w-full bg-[#1A1A1A] rounded-full overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="h-full bg-[#008080] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
