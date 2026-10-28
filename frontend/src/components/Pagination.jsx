import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-3.5 bg-white border border-[#E3DCFC] rounded-2xl mt-4 text-xs shadow-card">
      {/* Range text */}
      <div className="text-[#6F6A85] font-mono text-[11px] font-semibold">
        Showing <span className="font-bold text-[#24213A]">{startItem}–{endItem}</span> of{' '}
        <span className="font-bold text-[#24213A]">{totalItems}</span> posts
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-1.5 self-end sm:self-auto">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-[#E3DCFC] text-[#24213A] bg-[#F9F7FF] hover:bg-[#EDE8FF] disabled:opacity-40 disabled:cursor-not-allowed font-bold transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => {
              return (
                p === 1 ||
                p === totalPages ||
                Math.abs(p - currentPage) <= 1
              );
            })
            .map((p, idx, arr) => {
              const prev = arr[idx - 1];
              const showEllipsis = prev && p - prev > 1;

              return (
                <React.Fragment key={p}>
                  {showEllipsis && (
                    <span className="text-[#B6A3FC] px-1 font-mono font-bold">...</span>
                  )}
                  <button
                    onClick={() => onPageChange(p)}
                    className={`w-7 h-7 rounded-xl text-xs font-black transition-all ${
                      currentPage === p
                        ? 'bg-[#5B3CC4] text-white shadow-md shadow-[#5B3CC4]/30'
                        : 'border border-[#E3DCFC] bg-[#F9F7FF] text-[#24213A] hover:bg-[#EDE8FF]'
                    }`}
                  >
                    {p}
                  </button>
                </React.Fragment>
              );
            })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-[#E3DCFC] text-[#24213A] bg-[#F9F7FF] hover:bg-[#EDE8FF] disabled:opacity-40 disabled:cursor-not-allowed font-bold transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
