import React from 'react';
import { Smile, Frown, Meh, PieChart } from 'lucide-react';

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
      label: 'POSITIVE',
      count: positive,
      percentage: posPct,
      icon: Smile,
      barBg: 'bg-[#12B8B0]',
      trackBg: 'bg-[#12B8B0]/15',
      badgeBg: 'bg-[#12B8B0]/15 text-[#0E8A84] border-[#12B8B0]/30',
      iconColor: 'text-[#12B8B0]',
    },
    {
      label: 'NEGATIVE',
      count: negative,
      percentage: negPct,
      icon: Frown,
      barBg: 'bg-[#FF5C69]',
      trackBg: 'bg-[#FF5C69]/15',
      badgeBg: 'bg-[#FF5C69]/15 text-[#D73543] border-[#FF5C69]/30',
      iconColor: 'text-[#FF5C69]',
    },
    {
      label: 'NEUTRAL',
      count: neutral,
      percentage: neuPct,
      icon: Meh,
      barBg: 'bg-[#FFC857]',
      trackBg: 'bg-[#FFC857]/20',
      badgeBg: 'bg-[#FFC857]/20 text-[#9C710A] border-[#FFC857]/40',
      iconColor: 'text-[#D49814]',
    },
  ];

  return (
    <div className="bg-white border border-[#E3DCFC] rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center space-x-2.5 pb-4 border-b border-[#F1EEFF] mb-4">
          <div className="p-2 rounded-xl bg-[#12B8B0]/15 text-[#12B8B0]">
            <PieChart className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-extrabold text-[#5B3CC4] uppercase tracking-widest">
              Polarity Benchmark
            </div>
            <h2 className="text-lg font-black text-[#24213A] tracking-tight">
              SENTIMENT SHARE
            </h2>
          </div>
        </div>

        {/* Combined Segmented Stream Bar */}
        <div className="mb-6">
          <div className="text-xs text-[#6F6A85] font-bold mb-2 flex justify-between">
            <span>Overall Proportion</span>
            <span className="font-mono text-[#24213A] font-extrabold">{total} posts parsed</span>
          </div>
          <div className="h-3.5 w-full bg-[#F1EEFF] rounded-full overflow-hidden flex shadow-inner">
            <div
              style={{ width: `${posPct}%` }}
              className="bg-[#12B8B0] transition-all duration-500"
              title={`Positive: ${posPct}%`}
            />
            <div
              style={{ width: `${negPct}%` }}
              className="bg-[#FF5C69] transition-all duration-500"
              title={`Negative: ${negPct}%`}
            />
            <div
              style={{ width: `${neuPct}%` }}
              className="bg-[#FFC857] transition-all duration-500"
              title={`Neutral: ${neuPct}%`}
            />
          </div>
        </div>

        {/* Three Horizontal Bars with Large Percentages */}
        <div className="space-y-4">
          {bars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="space-y-1.5 p-3 rounded-xl bg-[#F9F7FF] border border-[#E3DCFC]/60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-4 h-4 ${item.iconColor}`} />
                    <span className="text-xs font-black text-[#24213A] tracking-wider uppercase">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-[#6F6A85]">
                      {item.count.toLocaleString()} posts
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black border ${item.badgeBg}`}>
                      {item.percentage}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className={`h-2.5 w-full ${item.trackBg} rounded-full overflow-hidden`}>
                  <div
                    className={`h-full ${item.barBg} rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-[#F1EEFF] mt-5 text-[11px] text-[#6F6A85] font-semibold flex items-center justify-between">
        <span>VADER Polarity Boundary: ±0.05</span>
        <span className="font-extrabold text-[#5B3CC4]">
          Ratio: {(positive / (negative || 1)).toFixed(2)}:1 Pos/Neg
        </span>
      </div>
    </div>
  );
}
