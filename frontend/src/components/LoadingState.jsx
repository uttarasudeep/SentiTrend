import React from 'react';

export function MetricsSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm animate-pulse">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2 border-l-2 border-slate-200 pl-3">
            <div className="h-3 w-16 bg-slate-200 rounded" />
            <div className="h-7 w-20 bg-slate-200 rounded" />
            <div className="h-3 w-24 bg-slate-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PanelSkeleton({ title = 'Loading Analytics...' }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm h-full flex flex-col animate-pulse">
      <div className="pb-3 border-b border-slate-100 mb-4 flex justify-between items-center">
        <div className="h-4 w-32 bg-slate-200 rounded" />
        <div className="h-3 w-16 bg-slate-100 rounded" />
      </div>
      <div className="flex-1 min-h-[220px] flex items-center justify-center bg-slate-50/60 rounded border border-dashed border-slate-200">
        <span className="text-xs text-slate-400 font-medium">{title}</span>
      </div>
    </div>
  );
}

export function FeedSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 animate-pulse">
      <div className="h-4 w-36 bg-slate-200 rounded mb-4" />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2 py-3 border-b border-slate-100 last:border-none">
            <div className="flex space-x-3">
              <div className="h-3 w-16 bg-slate-200 rounded" />
              <div className="h-3 w-20 bg-slate-100 rounded" />
              <div className="h-3 w-24 bg-slate-100 rounded" />
            </div>
            <div className="h-4 w-5/6 bg-slate-200 rounded" />
            <div className="h-3 w-1/3 bg-slate-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
