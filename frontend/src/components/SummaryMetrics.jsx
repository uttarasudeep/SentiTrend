import React from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Minus, TrendingUp, Zap } from 'lucide-react';

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

  const cards = [
    {
      label: 'TOTAL POSTS',
      value: total.toLocaleString(),
      change: 'Active Stream',
      subtext: 'Ingested & Parsed',
      icon: MessageSquare,
      accentBorder: 'border-t-4 border-t-[#5B3CC4]',
      badgeBg: 'bg-[#5B3CC4]/10 text-[#5B3CC4]',
      iconBg: 'bg-[#5B3CC4]/10 text-[#5B3CC4]',
    },
    {
      label: 'POSITIVE SENTIMENT',
      value: posCount.toLocaleString(),
      change: `${posPct}%`,
      subtext: 'compound ≥ +0.05',
      icon: ThumbsUp,
      accentBorder: 'border-t-4 border-t-[#12B8B0]',
      badgeBg: 'bg-[#12B8B0]/15 text-[#0E8A84]',
      iconBg: 'bg-[#12B8B0]/15 text-[#12B8B0]',
    },
    {
      label: 'NEGATIVE SENTIMENT',
      value: negCount.toLocaleString(),
      change: `${negPct}%`,
      subtext: 'compound ≤ -0.05',
      icon: ThumbsDown,
      accentBorder: 'border-t-4 border-t-[#FF5C69]',
      badgeBg: 'bg-[#FF5C69]/15 text-[#D73543]',
      iconBg: 'bg-[#FF5C69]/15 text-[#FF5C69]',
    },
    {
      label: 'NEUTRAL SENTIMENT',
      value: neuCount.toLocaleString(),
      change: `${neuPct}%`,
      subtext: '-0.05 < score < +0.05',
      icon: Minus,
      accentBorder: 'border-t-4 border-t-[#FFC857]',
      badgeBg: 'bg-[#FFC857]/20 text-[#9C710A]',
      iconBg: 'bg-[#FFC857]/20 text-[#D49814]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((c, idx) => {
        const Icon = c.icon;
        return (
          <div
            key={idx}
            className={`bg-white border border-[#E3DCFC] ${c.accentBorder} rounded-2xl p-4 sm:p-5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold text-[#6F6A85] uppercase tracking-wider">
                  {c.label}
                </span>
                <div className={`p-1.5 rounded-lg ${c.iconBg}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl sm:text-3xl font-black text-[#24213A] tracking-tight">
                  {c.value}
                </span>
                <span className={`text-xs font-black px-2 py-0.5 rounded-full ${c.badgeBg}`}>
                  {c.change}
                </span>
              </div>
            </div>
            <div className="text-[11px] font-semibold text-[#6F6A85] mt-2 truncate">
              {c.subtext}
            </div>
          </div>
        );
      })}

      {/* Average Polarity Card with Gauge feel */}
      <div className="bg-white border border-[#E3DCFC] border-t-4 border-t-[#5B3CC4] rounded-2xl p-4 sm:p-5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-extrabold text-[#6F6A85] uppercase tracking-wider">
              AVG POLARITY SCORE
            </span>
            <div className="p-1.5 rounded-lg bg-[#5B3CC4]/10 text-[#5B3CC4]">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl sm:text-3xl font-black text-[#24213A] tracking-tight">
              {avgScore > 0 ? `+${avgScore.toFixed(4)}` : avgScore.toFixed(4)}
            </span>
            <span
              className={`text-xs font-black px-2 py-0.5 rounded-full ${
                avgScore >= 0.05
                  ? 'bg-[#12B8B0]/15 text-[#0E8A84]'
                  : avgScore <= -0.05
                  ? 'bg-[#FF5C69]/15 text-[#D73543]'
                  : 'bg-[#FFC857]/20 text-[#9C710A]'
              }`}
            >
              {avgScore >= 0.05 ? 'Positive' : avgScore <= -0.05 ? 'Negative' : 'Neutral'}
            </span>
          </div>
        </div>
        <div className="text-[11px] font-semibold text-[#6F6A85] mt-2 truncate">
          VADER Metric [-1.0, +1.0]
        </div>
      </div>
    </div>
  );
}
