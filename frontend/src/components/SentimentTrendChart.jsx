import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function SentimentTrendChart({ trendsData }) {
  const [activeRange, setActiveRange] = useState('7D');

  if (!trendsData || !trendsData.trends) return null;

  const data = trendsData.trends;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#F7F8F2] border border-[#D8E2D9] p-3 rounded-lg shadow-md text-xs font-sans">
          <div className="font-bold text-[#26332F] pb-1.5 mb-1.5 border-b border-[#E4ECE5] flex items-center justify-between space-x-4">
            <span>Date: {label}</span>
            <span className="text-[10px] text-[#68756F] font-medium">Daily Aggregate</span>
          </div>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center justify-between space-x-6">
                <span className="flex items-center space-x-1.5 text-[#3D4C46] font-medium">
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span>{entry.name}:</span>
                </span>
                <span className="font-bold text-[#26332F] font-mono">
                  {entry.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#F7F8F2] border border-[#D8E2D9] rounded-xl p-5 shadow-xs flex flex-col h-full">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-[#E4ECE5] gap-2 mb-3">
        <div>
          <div className="text-[10px] font-bold text-[#68756F] uppercase tracking-wider">
            Time-Series Activity
          </div>
          <h2 className="text-base font-bold text-[#26332F] tracking-tight">
            Sentiment Frequency Over Time
          </h2>
        </div>

        {/* 24H | 7D | 30D control */}
        <div className="flex items-center space-x-1 bg-[#EEF3EE] p-0.5 rounded-lg border border-[#D8E2D9] self-start sm:self-auto text-xs">
          <button
            onClick={() => setActiveRange('24H')}
            title="24-Hour view (Aggregated from daily stream)"
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
              activeRange === '24H'
                ? 'bg-[#176B5B] text-white shadow-xs'
                : 'text-[#68756F] hover:text-[#26332F]'
            }`}
          >
            24H
          </button>
          <button
            onClick={() => setActiveRange('7D')}
            title="7-Day view (Active dataset)"
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
              activeRange === '7D'
                ? 'bg-[#176B5B] text-white shadow-xs'
                : 'text-[#68756F] hover:text-[#26332F]'
            }`}
          >
            7D
          </button>
          <button
            onClick={() => setActiveRange('30D')}
            title="30-Day view (Extended telemetry)"
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
              activeRange === '30D'
                ? 'bg-[#176B5B] text-white shadow-xs'
                : 'text-[#68756F] hover:text-[#26332F]'
            }`}
          >
            30D
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="flex-1 w-full min-h-[280px]">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 10, right: 15, left: -20, bottom: 5 }}>
            <CartesianGrid stroke="#E2E9E3" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#68756F"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#D8E2D9' }}
              tickFormatter={(val) => {
                const parts = val.split('-');
                return parts.length >= 3 ? `${parts[1]}/${parts[2]}` : val;
              }}
            />
            <YAxis
              stroke="#68756F"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#D8E2D9' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={32}
              iconType="plainline"
              formatter={(value) => (
                <span className="text-xs text-[#3D4C46] font-semibold capitalize mr-4">
                  {value}
                </span>
              )}
            />
            <Line
              type="monotone"
              dataKey="positive"
              name="Positive"
              stroke="#1F9D72"
              strokeWidth={2.4}
              dot={{ r: 3, fill: '#1F9D72', strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="negative"
              name="Negative"
              stroke="#D95757"
              strokeWidth={2.4}
              dot={{ r: 3, fill: '#D95757', strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="neutral"
              name="Neutral"
              stroke="#7A8793"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 2.5, fill: '#7A8793', strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
