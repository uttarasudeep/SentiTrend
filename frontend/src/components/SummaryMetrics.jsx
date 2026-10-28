import React from 'react';

export default function SummaryMetrics({ summary }) {
  if (!summary) return null;

  const total = summary.total_posts || 0;
  const posCount = summary.positive || 0;
  const negCount = summary.negative || 0;
  const neuCount = summary.neutral || 0;
  const avgScore = summary.average_compound_score ?? 0;

  const posPct = total > 0 ? ((posCount / total) * 100).toFixed(1) : '0.0';
  const negPct = total > 0 ? ((negCount / total) * 100).toFixed(1) : '0.0';
  const neuPct = total > 0 ? ((neuCount / total) * 100).toFixed(1) : '0.0';

  const metrics = [
    {
      label: 'TOTAL POSTS',
      value: total.toLocaleString(),
      detail: 'Stream Ingestion',
      subtext: 'Bluesky / Kafka',
      borderClass: 'border-l-4 border-l-slate-900',
    },
    {
      label: 'POSITIVE SENTIMENT',
      value: posCount.toLocaleString(),
      detail: `${posPct}%`,
      subtext: 'compound ≥ +0.05',
      borderClass: 'border-l-4 border-l-emerald-600',
      valueColor: 'text-emerald-900',
    },
    {
      label: 'NEGATIVE SENTIMENT',
      value: negCount.toLocaleString(),
      detail: `${negPct}%`,
      subtext: 'compound ≤ -0.05',
      borderClass: 'border-l-4 border-l-red-600',
      valueColor: 'text-red-900',
    },
    {
      label: 'NEUTRAL SENTIMENT',
      value: neuCount.toLocaleString(),
      detail: `${neuPct}%`,
      subtext: '-0.05 < score < +0.05',
      borderClass: 'border-l-4 border-l-slate-400',
      valueColor: 'text-slate-800',
    },
    {
      label: 'AVG POLARITY SCORE',
      value: avgScore > 0 ? `+${avgScore.toFixed(4)}` : avgScore.toFixed(4),
      detail: avgScore >= 0.05 ? 'Net Positive' : avgScore <= -0.05 ? 'Net Negative' : 'Balanced',
      subtext: 'VADER [-1.0, +1.0]',
      borderClass: 'border-l-4 border-l-teal-600',
      valueColor: 'text-teal-900',
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-100">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className={`p-4 sm:p-5 ${m.borderClass} bg-white hover:bg-slate-50/60 transition-colors`}
          >
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              {m.label}
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${m.valueColor || 'text-slate-900'}`}>
                {m.value}
              </span>
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                {m.detail}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1.5 truncate">
              {m.subtext}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
