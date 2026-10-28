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
      subtext: 'Bluesky / Kafka Ingest',
      borderClass: 'border-l-4 border-l-[#176B5B]',
      badgeStyle: 'bg-[#DCEDE6] text-[#176B5B]',
    },
    {
      label: 'POSITIVE SENTIMENT',
      value: posCount.toLocaleString(),
      detail: `${posPct}%`,
      subtext: 'compound ≥ +0.05',
      borderClass: 'border-l-4 border-l-[#1F9D72]',
      badgeStyle: 'bg-[#DCEDE6] text-[#1F9D72]',
    },
    {
      label: 'NEGATIVE SENTIMENT',
      value: negCount.toLocaleString(),
      detail: `${negPct}%`,
      subtext: 'compound ≤ -0.05',
      borderClass: 'border-l-4 border-l-[#D95757]',
      badgeStyle: 'bg-[#FCE8E8] text-[#D95757]',
    },
    {
      label: 'NEUTRAL SENTIMENT',
      value: neuCount.toLocaleString(),
      detail: `${neuPct}%`,
      subtext: '-0.05 < score < +0.05',
      borderClass: 'border-l-4 border-l-[#7A8793]',
      badgeStyle: 'bg-[#E6EBE8] text-[#55635E]',
    },
    {
      label: 'AVG POLARITY SCORE',
      value: avgScore > 0 ? `+${avgScore.toFixed(4)}` : avgScore.toFixed(4),
      detail: avgScore >= 0.05 ? 'Net Positive' : avgScore <= -0.05 ? 'Net Negative' : 'Balanced',
      subtext: 'VADER [-1.0, +1.0]',
      borderClass: 'border-l-4 border-l-[#176B5B]',
      badgeStyle: 'bg-[#DCEDE6] text-[#176B5B]',
    },
  ];

  return (
    <div className="bg-[#F7F8F2] border border-[#D8E2D9] rounded-xl shadow-xs overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[#E4ECE5]">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className={`p-4 sm:p-5 ${m.borderClass} hover:bg-[#EEF3EE]/50 transition-colors`}
          >
            <div className="text-[10px] font-bold text-[#68756F] uppercase tracking-wider mb-1">
              {m.label}
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#26332F] tracking-tight">
                {m.value}
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${m.badgeStyle}`}>
                {m.detail}
              </span>
            </div>
            <div className="text-[11px] text-[#68756F] font-medium mt-1.5 truncate">
              {m.subtext}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
