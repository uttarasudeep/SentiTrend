import React from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Minus, TrendingUp, Sparkles } from 'lucide-react';

export default function SummaryCards({ summary }) {
  if (!summary) return null;

  const total = summary.total_posts || 0;
  const posCount = summary.positive || 0;
  const negCount = summary.negative || 0;
  const neuCount = summary.neutral || 0;
  const avgScore = summary.average_compound_score ?? 0;

  const posPct = total > 0 ? ((posCount / total) * 100).toFixed(1) : 0;
  const negPct = total > 0 ? ((negCount / total) * 100).toFixed(1) : 0;
  const neuPct = total > 0 ? ((neuCount / total) * 100).toFixed(1) : 0;

  const cards = [
    {
      title: 'Total Posts',
      value: total.toLocaleString(),
      subtitle: 'Processed stream comments',
      icon: MessageSquare,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10 border-indigo-500/20',
      badge: `${total} total`,
      badgeColor: 'bg-indigo-500/20 text-indigo-300',
    },
    {
      title: 'Positive Posts',
      value: posCount.toLocaleString(),
      subtitle: `${posPct}% of total conversations`,
      icon: ThumbsUp,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20',
      badge: `${posPct}%`,
      badgeColor: 'bg-emerald-500/20 text-emerald-300',
    },
    {
      title: 'Negative Posts',
      value: negCount.toLocaleString(),
      subtitle: `${negPct}% of total conversations`,
      icon: ThumbsDown,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10 border-rose-500/20',
      badge: `${negPct}%`,
      badgeColor: 'bg-rose-500/20 text-rose-300',
    },
    {
      title: 'Neutral Posts',
      value: neuCount.toLocaleString(),
      subtitle: `${neuPct}% of total conversations`,
      icon: Minus,
      color: 'text-slate-400',
      bgColor: 'bg-slate-700/30 border-slate-700/50',
      badge: `${neuPct}%`,
      badgeColor: 'bg-slate-600/30 text-slate-300',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-5 rounded-2xl border ${card.bgColor} bg-slate-900/60 backdrop-blur-sm transition-all hover:scale-[1.01] hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`p-2 rounded-xl ${card.bgColor}`}>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-white tracking-tight">
                {card.value}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${card.badgeColor}`}>
                {card.badge}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400 truncate">{card.subtitle}</p>
          </div>
        );
      })}

      {/* Average Compound Polarity Card */}
      <div className="p-5 rounded-2xl border border-violet-500/20 bg-violet-500/10 bg-slate-900/60 backdrop-blur-sm transition-all hover:scale-[1.01] hover:shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Avg Sentiment Score
          </span>
          <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
            <TrendingUp className="w-4 h-4 text-violet-400" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold text-white tracking-tight">
            {avgScore > 0 ? `+${avgScore.toFixed(4)}` : avgScore.toFixed(4)}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
              avgScore >= 0.05
                ? 'bg-emerald-500/20 text-emerald-300'
                : avgScore <= -0.05
                ? 'bg-rose-500/20 text-rose-300'
                : 'bg-slate-600/30 text-slate-300'
            }`}
          >
            {avgScore >= 0.05 ? 'Positive' : avgScore <= -0.05 ? 'Negative' : 'Neutral'}
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-400 truncate">VADER Polarity [-1.0 to +1.0]</p>
      </div>
    </div>
  );
}
