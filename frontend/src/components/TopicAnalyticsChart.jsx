import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Hash } from 'lucide-react';

export default function TopicAnalyticsChart({ topicsData }) {
  if (!topicsData || !topicsData.topics) return null;

  const data = topicsData.topics;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl">
          <p className="text-xs font-semibold text-slate-300 pb-1 border-b border-slate-800 uppercase tracking-wider">
            Topic: #{label}
          </p>
          <div className="space-y-1 mt-2">
            {payload.map((entry, index) => (
              <p
                key={index}
                className="text-xs font-medium flex items-center justify-between space-x-3"
              >
                <span className="flex items-center space-x-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-slate-300 capitalize">{entry.name}:</span>
                </span>
                <span className="font-bold text-white">{entry.value}</span>
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl shadow-md flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-2">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400">
            <Hash className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">Topic Sentiment Breakdown</h2>
            <p className="text-xs text-slate-400">Distribution across conversation channels</p>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[260px]">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="topic"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              tickFormatter={(val) => `#${val}`}
            />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span className="text-xs text-slate-300 font-medium capitalize">{value}</span>
              )}
            />
            <Bar dataKey="positive" name="Positive" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="negative" name="Negative" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="neutral" name="Neutral" fill="#64748b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
