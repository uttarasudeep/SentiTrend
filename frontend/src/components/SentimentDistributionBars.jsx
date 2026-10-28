import React from 'react';

export default function SentimentDistributionBars({ summary }) {
  if (!summary) return null;

  const total = summary.total_posts || 1;
  const positive = summary.positive || 0;
  const negative = summary.negative || 0;
  const neutral = summary.neutral || 0;

  const posPct = ((positive / total) * 100).toFixed(1);
  const negPct = ((negative / total) * 100).toFixed(1);
  const neuPct = ((neutral / total) * 100).toFixed(1);

  const bars = [
    {
      label: 'Positive',
      count: positive,
      percentage: posPct,
      barColor: 'bg-emerald-600',
      textColor: 'text-emerald-700',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      label: 'Negative',
      count: negative,
      percentage: negPct,
      barColor: 'bg-red-600',
      textColor: 'text-red-700',
      badgeBg: 'bg-red-50 text-red-800 border-red-200',
    },
    {
      label: 'Neutral',
      count: neutral,
      percentage: neuPct,
      barColor: 'bg-slate-500',
      textColor: 'text-slate-700',
      badgeBg: 'bg-slate-100 text-slate-800 border-slate-200',
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="pb-4 border-b border-slate-100 mb-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Polarity Distribution
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Sentiment Share
          </h2>
        </div>

        {/* Combined Segmented Bar */}
        <div className="mb-6">
          <div className="text-xs text-slate-500 font-medium mb-1.5 flex justify-between">
            <span>Overall Proportion</span>
            <span className="font-mono text-slate-400">{total} posts evaluated</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-sm overflow-hidden flex">
            <div
              style={{ width: `${posPct}%` }}
              className="bg-emerald-600 transition-all duration-500"
              title={`Positive: ${posPct}%`}
            />
            <div
              style={{ width: `${negPct}%` }}
              className="bg-red-600 transition-all duration-500"
              title={`Negative: ${negPct}%`}
            />
            <div
              style={{ width: `${neuPct}%` }}
              className="bg-slate-400 transition-all duration-500"
              title={`Neutral: ${neuPct}%`}
            />
          </div>
        </div>

        {/* Individual Horizontal Bars (Option A) */}
        <div className="space-y-4">
          {bars.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 flex items-center space-x-1.5">
                  <span className={`w-2 h-2 rounded-full ${item.barColor}`} />
                  <span>{item.label}</span>
                </span>
                <div className="flex items-center space-x-2 font-mono">
                  <span className="text-slate-500">{item.count.toLocaleString()} posts</span>
                  <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold border ${item.badgeBg}`}>
                    {item.percentage}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full bg-slate-100 rounded-sm overflow-hidden">
                <div
                  className={`h-full ${item.barColor} rounded-sm transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial footer summary */}
      <div className="pt-4 border-t border-slate-100 mt-6 text-[11px] text-slate-400 flex items-center justify-between">
        <span>VADER Polarity Threshold: ±0.05</span>
        <span className="font-semibold text-slate-600">
          Ratio: {(positive / (negative || 1)).toFixed(2)}:1 Pos/Neg
        </span>
      </div>
    </div>
  );
}
