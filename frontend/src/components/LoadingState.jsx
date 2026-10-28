import React from 'react';

export function MetricsSkeleton() {
  return (
    <div className="bg-[#F7F8F2] border border-[#D8E2D9] rounded-xl p-4 shadow-xs animate-pulse">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2 border-l-2 border-[#D8E2D9] pl-3">
            <div className="h-3 w-16 bg-[#DCE7DF] rounded" />
            <div className="h-7 w-20 bg-[#DCE7DF] rounded" />
            <div className="h-3 w-24 bg-[#E4ECE5] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PanelSkeleton({ title = 'Loading Analytics...' }) {
  return (
    <div className="bg-[#F7F8F2] border border-[#D8E2D9] rounded-xl p-5 shadow-xs h-full flex flex-col animate-pulse">
      <div className="pb-3 border-b border-[#E4ECE5] mb-4 flex justify-between items-center">
        <div className="h-4 w-32 bg-[#DCE7DF] rounded" />
        <div className="h-3 w-16 bg-[#E4ECE5] rounded" />
      </div>
      <div className="flex-1 min-h-[220px] flex items-center justify-center bg-[#EEF3EE] rounded-lg border border-dashed border-[#D8E2D9]">
        <span className="text-xs text-[#68756F] font-semibold">{title}</span>
      </div>
    </div>
  );
}

export function FeedSkeleton() {
  return (
    <div className="bg-[#F7F8F2] border border-[#D8E2D9] rounded-xl shadow-xs p-4 animate-pulse">
      <div className="h-4 w-36 bg-[#DCE7DF] rounded mb-4" />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2 py-3 border-b border-[#E4ECE5] last:border-none">
            <div className="flex space-x-3">
              <div className="h-3 w-16 bg-[#DCE7DF] rounded" />
              <div className="h-3 w-20 bg-[#E4ECE5] rounded" />
              <div className="h-3 w-24 bg-[#E4ECE5] rounded" />
            </div>
            <div className="h-4 w-5/6 bg-[#DCE7DF] rounded" />
            <div className="h-3 w-1/3 bg-[#E4ECE5] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
