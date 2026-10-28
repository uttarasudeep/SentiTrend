import React from 'react';

export function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="bg-white border border-[#E3DCFC] rounded-2xl p-5 shadow-card space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-3 w-16 bg-[#EDE8FF] rounded-md" />
            <div className="h-6 w-6 bg-[#EDE8FF] rounded-lg" />
          </div>
          <div className="h-7 w-20 bg-[#EDE8FF] rounded-md" />
          <div className="h-3 w-28 bg-[#F1EEFF] rounded-md" />
        </div>
      ))}
    </div>
  );
}

export function PanelSkeleton({ title = 'Loading Pulse...' }) {
  return (
    <div className="bg-white border border-[#E3DCFC] rounded-2xl p-5 shadow-card h-full flex flex-col animate-pulse">
      <div className="pb-3 border-b border-[#F1EEFF] mb-4 flex justify-between items-center">
        <div className="h-4 w-36 bg-[#EDE8FF] rounded-md" />
        <div className="h-3 w-16 bg-[#F1EEFF] rounded-md" />
      </div>
      <div className="flex-1 min-h-[260px] flex items-center justify-center bg-[#F9F7FF] rounded-xl border border-dashed border-[#E3DCFC]">
        <span className="text-xs text-[#6F6A85] font-extrabold">{title}</span>
      </div>
    </div>
  );
}

export function FeedSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-14 bg-white border border-[#E3DCFC] rounded-2xl shadow-card" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white border border-[#E3DCFC] rounded-2xl p-5 shadow-card space-y-3">
          <div className="flex justify-between">
            <div className="h-4 w-28 bg-[#EDE8FF] rounded-md" />
            <div className="h-3 w-16 bg-[#F1EEFF] rounded-md" />
          </div>
          <div className="h-4 w-5/6 bg-[#EDE8FF] rounded-md" />
          <div className="h-3 w-1/3 bg-[#F1EEFF] rounded-md" />
        </div>
      ))}
    </div>
  );
}
