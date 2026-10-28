import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';

const COLORS = {
  Positive: '#10b981', // emerald-500
  Negative: '#ef4444', // rose-500
  Neutral: '#64748b',  // slate-500
};

export default function SentimentDistributionChart({ summary }) {
  if (!summary) return null;

  const data = [
    { name: 'Positive', value: summary.positive || 0, color: COLORS.Positive },
    { name: 'Negative', value: summary.negative || 0, color: COLORS.Negative },
    { name: 'Neutral', value: summary.neutral || 0, color: COLORS.Neutral },
  ].filter((item) => item.value > 0);

  const total = summary.total_posts || 1;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const pct = ((item.value / total) * 100).toFixed(1);
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl">
          <p className="text-xs font-semibold text-white flex items-center space-x-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: item.payload.color }}
            />
            <span>{item.name}</span>
          </p>
          <p className="text-sm font-bold text-slate-100 mt-1">
            {item.value} posts <span className="text-xs text-slate-400 font-normal">({pct}%)</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl shadow-md flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-2">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <PieIcon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">Sentiment Distribution</h2>
            <p className="text-xs text-slate-400">Overall polarity breakdown</p>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[260px] flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => <span className="text-xs text-slate-300 font-medium">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-8 text-center pointer-events-none">
          <span className="text-xs text-slate-400 uppercase font-semibold">Total</span>
          <p className="text-xl font-extrabold text-white">{total}</p>
        </div>
      </div>
    </div>
  );
}
