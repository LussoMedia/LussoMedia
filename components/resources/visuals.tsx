// Field Guide visual primitives (Part 13/14/15/44).
// Semantic HTML + CSS + minimal inline SVG only — no charting library.
// Every component:
//   - carries a visible text label for what it shows (never color-only)
//   - stacks cleanly at 320–430px (no forced horizontal scroll)
//   - uses the Phase 2 token system (teal accent, platinum/neutral palette,
//     restrained borders, Inter Tight numerals)

import type { FieldGuideVisual } from '@/lib/config/fieldGuides';

const numeralClass = 'font-[family-name:var(--font-display)]';

export function Funnel({ stages, highlightIndex }: { stages: string[]; highlightIndex?: number }) {
  return (
    <div
      role="img"
      aria-label={`Funnel: ${stages.join(' leads to ')}${
        highlightIndex !== undefined ? `. Constraint highlighted at "${stages[highlightIndex]}".` : ''
      }`}
      className="flex flex-col sm:flex-row sm:items-stretch gap-0 border border-white/10 rounded-[var(--radius-media)] overflow-hidden"
    >
      {stages.map((stage, i) => {
        const isHighlight = i === highlightIndex;
        return (
          <div key={stage} className="flex sm:flex-1 items-center">
            <div
              className={`flex-1 px-5 py-5 text-center ${
                isHighlight ? 'bg-[#008080]/10' : 'bg-[#141414]'
              } ${i > 0 ? 'border-t sm:border-t-0 sm:border-l border-white/10' : ''}`}
            >
              <p className={`text-sm font-semibold ${isHighlight ? 'text-[#00a8a8]' : 'text-white'}`}>{stage}</p>
              {isHighlight && (
                <p className="text-[#008080] text-[0.65rem] uppercase tracking-[0.08em] mt-1">Constraint</p>
              )}
            </div>
            {i < stages.length - 1 && (
              <span className="hidden sm:block text-[#555] px-1" aria-hidden="true">
                &rarr;
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function BeforeAfter({
  beforeLabel,
  beforeItems,
  afterLabel,
  afterItems,
}: {
  beforeLabel: string;
  beforeItems: string[];
  afterLabel: string;
  afterItems: string[];
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="border border-white/10 rounded-[var(--radius-card)] p-6">
        <p className="text-eyebrow text-[#888] mb-4">{beforeLabel}</p>
        <ul className="space-y-2.5">
          {beforeItems.map((item) => (
            <li key={item} className="text-[#C5C6C7] text-sm flex gap-2">
              <span className="text-[#666] flex-shrink-0" aria-hidden="true">&times;</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-[#008080]/30 rounded-[var(--radius-card)] p-6">
        <p className="text-eyebrow text-[#008080] mb-4">{afterLabel}</p>
        <ul className="space-y-2.5">
          {afterItems.map((item) => (
            <li key={item} className="text-white text-sm flex gap-2">
              <span className="text-[#008080] flex-shrink-0" aria-hidden="true">&#10003;</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Framework({ terms, connector = '→' }: { terms: string[]; connector?: string }) {
  return (
    <div
      role="img"
      aria-label={`Framework: ${terms.join(` ${connector === '→' ? 'leads to' : connector} `)}`}
      className="flex flex-wrap items-center gap-x-3 gap-y-3 border border-white/10 rounded-[var(--radius-media)] p-6"
    >
      {terms.map((term, i) => (
        <span key={term} className="flex items-center gap-3">
          <span className={`${numeralClass} text-white font-semibold text-base sm:text-lg`}>{term}</span>
          {i < terms.length - 1 && (
            <span className="text-[#008080] font-semibold" aria-hidden="true">{connector}</span>
          )}
        </span>
      ))}
    </div>
  );
}

export function Scorecard({
  items,
  statusLabels,
}: {
  items: { question: string; status: 'pass' | 'warn' | 'fail' }[];
  statusLabels?: { pass?: string; warn?: string; fail?: string };
}) {
  const statusText: Record<string, string> = {
    pass: statusLabels?.pass ?? 'On track',
    warn: statusLabels?.warn ?? 'Worth checking',
    fail: statusLabels?.fail ?? 'Likely a leak',
  };
  const statusColor: Record<string, string> = { pass: '#00a8a8', warn: '#C5C6C7', fail: '#888' };
  return (
    <div className="border border-white/10 rounded-[var(--radius-media)] divide-y divide-white/[0.08]">
      {items.map((item) => (
        <div key={item.question} className="flex items-center justify-between gap-4 px-5 py-4">
          <p className="text-[#C5C6C7] text-sm">{item.question}</p>
          <span
            className="text-xs font-semibold uppercase tracking-[0.06em] flex-shrink-0"
            style={{ color: statusColor[item.status] }}
          >
            {statusText[item.status]}
          </span>
        </div>
      ))}
    </div>
  );
}

export function DecisionTree({
  question,
  branches,
}: {
  question: string;
  branches: { label: string; result: string }[];
}) {
  return (
    <div className="border border-white/10 rounded-[var(--radius-media)] p-6">
      <p className="text-white font-semibold text-sm mb-5">{question}</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {branches.map((b) => (
          <div key={b.label} className="border-t border-white/10 pt-4">
            <p className="text-[#008080] text-xs uppercase tracking-[0.08em] mb-1.5">{b.label}</p>
            <p className="text-[#C5C6C7] text-sm leading-relaxed">{b.result}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LeakMap({ stages, leakIndexes }: { stages: string[]; leakIndexes: number[] }) {
  return (
    <div
      role="img"
      aria-label={`Leak map: ${stages.join(' to ')}. Leak points at ${leakIndexes
        .map((i) => stages[i])
        .join(', ')}.`}
      className="flex flex-col sm:flex-row gap-0 border border-white/10 rounded-[var(--radius-media)] overflow-hidden"
    >
      {stages.map((stage, i) => {
        const isLeak = leakIndexes.includes(i);
        return (
          <div
            key={stage}
            className={`flex-1 px-5 py-5 text-center relative ${
              isLeak ? 'bg-[#008080]/10' : 'bg-[#141414]'
            } ${i > 0 ? 'border-t sm:border-t-0 sm:border-l border-white/10' : ''}`}
          >
            <p className={`text-sm font-semibold ${isLeak ? 'text-[#00a8a8]' : 'text-white'}`}>{stage}</p>
            {isLeak && <p className="text-[#008080] text-[0.65rem] uppercase tracking-[0.08em] mt-1">Common Leak</p>}
          </div>
        );
      })}
    </div>
  );
}

export function Timeline({ steps }: { steps: { label: string; detail: string }[] }) {
  return (
    <div>
      {steps.map((step, i) => (
        <div key={step.label} className="grid grid-cols-[2rem_1fr] gap-x-4 py-5 border-b border-white/[0.08] last:border-b-0 first:pt-0">
          <p className={`${numeralClass} text-[#008080] text-lg font-semibold tabular-nums`}>{String(i + 1).padStart(2, '0')}</p>
          <div>
            <p className="text-white font-semibold text-sm">{step.label}</p>
            <p className="text-[#888] text-sm mt-1 leading-relaxed">{step.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function MetricCallout({ metrics }: { metrics: { before: string; after: string; label: string }[] }) {
  return (
    <div className="flex flex-wrap gap-x-10 gap-y-5">
      {metrics.map((m) => (
        <div key={m.label}>
          <p className={`${numeralClass} text-white text-2xl md:text-3xl font-semibold whitespace-nowrap`}>
            {m.before} <span className="text-[#008080]">&rarr;</span> {m.after}
          </p>
          <p className="text-[#888] text-xs uppercase tracking-[0.08em] mt-1">{m.label}</p>
        </div>
      ))}
    </div>
  );
}

export function ScreenshotAnnotation({
  src,
  alt,
  width,
  height,
  caption,
  annotations,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  annotations?: { label: string }[];
}) {
  return (
    <figure className="border border-white/10 rounded-[var(--radius-media)] overflow-hidden">
      {/* Plain <img> — Field Guide screenshots are static reference assets,
          not next/image-optimized content images; keeps this component
          decoupled from remotePatterns/loader config. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={width} height={height} className="w-full h-auto block" loading="lazy" />
      {annotations && annotations.length > 0 && (
        <ul className="flex flex-wrap gap-x-4 gap-y-1 px-5 pt-4 text-xs text-[#008080] uppercase tracking-[0.06em]">
          {annotations.map((a) => (
            <li key={a.label}>&bull; {a.label}</li>
          ))}
        </ul>
      )}
      <figcaption className="text-[#888] text-sm px-5 py-4 leading-relaxed">{caption}</figcaption>
    </figure>
  );
}

export function Comparison({ columns, rows }: { columns: string[]; rows: { label: string; values: string[] }[] }) {
  return (
    <div
      role="table"
      aria-label={`Comparison across ${columns.join(', ')}`}
      className="border border-white/10 rounded-[var(--radius-media)] divide-y divide-white/[0.08]"
    >
      {rows.map((row) => (
        <div key={row.label} className="p-5">
          <p className="text-white font-semibold text-sm mb-3">{row.label}</p>
          {/* Stacks to one column below sm: — never a horizontally
              scrolling table (Phase 4I mobile requirement). */}
          <div className="grid gap-3 sm:grid-cols-3">
            {columns.map((col, i) => (
              <div key={col}>
                <p className="text-[#666] text-[0.65rem] uppercase tracking-[0.08em] mb-1">{col}</p>
                <p className="text-[#C5C6C7] text-sm leading-relaxed">{row.values[i]}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Dispatches a typed FieldGuideVisual to its matching component. */
export function FieldGuideVisualRenderer({ visual }: { visual: FieldGuideVisual }) {
  switch (visual.type) {
    case 'funnel':
      return <Funnel stages={visual.stages} highlightIndex={visual.highlightIndex} />;
    case 'beforeAfter':
      return (
        <BeforeAfter
          beforeLabel={visual.beforeLabel}
          beforeItems={visual.beforeItems}
          afterLabel={visual.afterLabel}
          afterItems={visual.afterItems}
        />
      );
    case 'framework':
      return <Framework terms={visual.terms} connector={visual.connector} />;
    case 'scorecard':
      return <Scorecard items={visual.items} statusLabels={visual.statusLabels} />;
    case 'decisionTree':
      return <DecisionTree question={visual.question} branches={visual.branches} />;
    case 'leakMap':
      return <LeakMap stages={visual.stages} leakIndexes={visual.leakIndexes} />;
    case 'timeline':
      return <Timeline steps={visual.steps} />;
    case 'metric':
      return <MetricCallout metrics={visual.metrics} />;
    case 'screenshot':
      return (
        <ScreenshotAnnotation
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          caption={visual.caption}
          annotations={visual.annotations}
        />
      );
    case 'comparison':
      return <Comparison columns={visual.columns} rows={visual.rows} />;
    default:
      return null;
  }
}
