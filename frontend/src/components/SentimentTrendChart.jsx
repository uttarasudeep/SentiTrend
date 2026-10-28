import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Activity } from 'lucide-react';

export default function SentimentTrendChart({ trendsData }) {
  const [activeRange, setActiveRange] = useState('7D');

  if (!trendsData || !trendsData.trends) return null;

  const data = trendsData.trends;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-[#E3DCFC] p-3 rounded-xl shadow-lg text-xs font-sans">
          <div className="font-extrabold text-[#24213A] pb-1.5 mb-1.5 border-b border-[#F1EEFF] flex items-center justify-between space-x-4">
            <span>Date: {label}</span>
            <span className="text-[10px] text-[#6F6A85] font-semibold">Stream Aggregation</span>
          </div>
          <div className="space-y-1.5">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center justify-between space-x-6">
                <span className="flex items-center space-x-1.5 text-[#24213A] font-semibold">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span>{entry.name}:</span>
                </span>
                <span className="font-black text-[#24213A] font-mono">
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
    <div className="bg-white border border-[#E3DCFC] rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-[#F1EEFF] gap-2 mb-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-[#5B3CC4]/10 text-[#5B3CC4]">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-extrabold text-[#5B3CC4] uppercase tracking-widest">
              Live Temporal Trajectory
            </div>
            <h2 className="text-lg font-black text-[#24213A] tracking-tight">
              SENTIMENT PULSE
            </h2>
          </div>
        </div>

        {/* 24H | 7D | 30D control */}
        <div className="flex items-center space-x-1 bg-[#F1EEFF] p-1 rounded-xl border border-[#E3DCFC] self-start sm:self-auto text-xs">
          <button
            onClick={() => setActiveRange('24H')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeRange === '24H'
                ? 'bg-[#5B3CC4] text-white shadow-xs'
                : 'text-[#6F6A85] hover:text-[#24213A]'
            }`}
          >
            24H
          </button>
          <button
            onClick={() => setActiveRange('7D')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeRange === '7D'
                ? 'bg-[#5B3CC4] text-white shadow-xs'
                : 'text-[#6F6A85] hover:text-[#24213A]'
            }`}
          >
            7D
          </button>
          <button
            onClick={() => setActiveRange('30D')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeRange === '30D'
                ? 'bg-[#5B3CC4] text-white shadow-xs'
                : 'text-[#6F6A85] hover:text-[#24213A]'
            }`}
          >
            30D
          </button>
        </div>
      </div>

      {/* Area / Line Chart with subtle fills */}
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 15, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorTurquoise" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#12B8B0" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#12B8B0" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorCoral" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF5C69" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#FF5C69" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorYellow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFC857" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#FFC857" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#F1EEFF" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#6F6A85"
              fontSize={11}
              fontWeight={600}
              tickLine={false}
              axisLine={{ stroke: '#E3DCFC' }}
              tickFormatter={(val) => {
                const parts = val.split('-');
                return parts.length >= 3 ? `${parts[1]}/${parts[2]}` : val;
              }}
            />
            <YAxis
              stroke="#6F6A85"
              fontSize={11}
              fontWeight={600}
              tickLine={false}
              axisLine={{ stroke: '#E3DCFC' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={32}
              iconType="circle"
              formatter={(value) => (
                <span className="text-xs text-[#24213A] font-bold capitalize mr-4">
                  {value}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="positive"
              name="Positive"
              stroke="#12B8B0"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTurquoise)"
              dot={{ r: 3.5, fill: '#12B8B0', strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
            <Area
              type="monotone"
              dataKey="negative"
              name="Negative"
              stroke="#FF5C69"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorCoral)"
              dot={{ r: 3.5, fill: '#FF5C69', strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
            <Area
              type="monotone"
              dataKey="neutral"
              name="Neutral"
              stroke="#FFC857"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorYellow)"
              dot={{ r: 3, fill: '#FFC857', strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
