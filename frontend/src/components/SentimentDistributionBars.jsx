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
      barColor: 'bg-[#1F9D72]',
      badgeBg: 'bg-[#DCEDE6] text-[#176B5B] border-[#C1DFD3]',
    },
    {
      label: 'Negative',
      count: negative,
      percentage: negPct,
      barColor: 'bg-[#D95757]',
      badgeBg: 'bg-[#FCE8E8] text-[#D95757] border-[#F7C5C5]',
    },
    {
      label: 'Neutral',
      count: neutral,
      percentage: neuPct,
      barColor: 'bg-[#7A8793]',
      badgeBg: 'bg-[#E6EBE8] text-[#55635E] border-[#D2DDD7]',
    },
  ];

  return (
    <div className="bg-[#F7F8F2] border border-[#D8E2D9] rounded-xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="pb-4 border-b border-[#E4ECE5] mb-4">
          <div className="text-[10px] font-bold text-[#68756F] uppercase tracking-wider">
            Polarity Distribution
          </div>
          <h2 className="text-base font-bold text-[#26332F] tracking-tight">
            Sentiment Share
          </h2>
        </div>

        {/* Combined Segmented Bar */}
        <div className="mb-6">
          <div className="text-xs text-[#68756F] font-semibold mb-1.5 flex justify-between">
            <span>Overall Proportion</span>
            <span className="font-mono text-[#3D4C46]">{total} posts evaluated</span>
          </div>
          <div className="h-3 w-full bg-[#E4ECE5] rounded-md overflow-hidden flex">
            <div
              style={{ width: `${posPct}%` }}
              className="bg-[#1F9D72] transition-all duration-500"
              title={`Positive: ${posPct}%`}
            />
            <div
              style={{ width: `${negPct}%` }}
              className="bg-[#D95757] transition-all duration-500"
              title={`Negative: ${negPct}%`}
            />
            <div
              style={{ width: `${neuPct}%` }}
              className="bg-[#7A8793] transition-all duration-500"
              title={`Neutral: ${neuPct}%`}
            />
          </div>
        </div>

        {/* Individual Horizontal Bars (Option A) */}
        <div className="space-y-4">
          {bars.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#26332F] flex items-center space-x-1.5">
                  <span className={`w-2 h-2 rounded-full ${item.barColor}`} />
                  <span>{item.label}</span>
                </span>
                <div className="flex items-center space-x-2 font-mono">
                  <span className="text-[#68756F] font-medium">{item.count.toLocaleString()} posts</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${item.badgeBg}`}>
                    {item.percentage}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2.5 w-full bg-[#E4ECE5] rounded-md overflow-hidden">
                <div
                  className={`h-full ${item.barColor} rounded-md transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial footer summary */}
      <div className="pt-4 border-t border-[#E4ECE5] mt-6 text-[11px] text-[#68756F] flex items-center justify-between">
        <span>VADER Polarity Threshold: ±0.05</span>
        <span className="font-bold text-[#176B5B]">
          Ratio: {(positive / (negative || 1)).toFixed(2)}:1 Pos/Neg
        </span>
      </div>
    </div>
  );
}
