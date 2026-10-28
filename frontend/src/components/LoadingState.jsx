import React from 'react';

export function SummaryCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 animate-pulse space-y-3"
        >
          <div className="flex justify-between items-center">
            <div className="h-3 w-20 bg-slate-800 rounded"></div>
            <div className="h-7 w-7 bg-slate-800 rounded-xl"></div>
          </div>
          <div className="h-7 w-24 bg-slate-800 rounded mt-2"></div>
          <div className="h-3 w-32 bg-slate-800/60 rounded"></div>
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton({ title = 'Loading Chart...' }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl shadow-md h-full flex flex-col animate-pulse">
      <div className="flex items-center space-x-2 pb-3 border-b border-slate-800/80 mb-4">
        <div className="w-5 h-5 bg-slate-800 rounded-lg"></div>
        <div className="h-4 w-36 bg-slate-800 rounded"></div>
      </div>
      <div className="flex-1 min-h-[240px] flex items-center justify-center bg-slate-800/20 rounded-xl">
        <div className="text-xs text-slate-500 font-medium">{title}</div>
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl shadow-md p-4 animate-pulse">
      <div className="h-4 w-48 bg-slate-800 rounded mb-4"></div>
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4 py-2 border-b border-slate-800/40">
            <div className="h-4 w-1/3 bg-slate-800 rounded"></div>
            <div className="h-4 w-16 bg-slate-800 rounded"></div>
            <div className="h-4 w-16 bg-slate-800 rounded"></div>
            <div className="h-4 w-12 bg-slate-800 rounded"></div>
            <div className="h-4 w-20 bg-slate-800 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
