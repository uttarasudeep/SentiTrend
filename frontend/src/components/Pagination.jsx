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
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 bg-[#F7F8F2] border border-[#D8E2D9] rounded-xl mt-3 text-xs shadow-2xs">
      {/* Range text */}
      <div className="text-[#68756F] font-mono text-[11px]">
        Showing <span className="font-bold text-[#26332F]">{startItem}–{endItem}</span> of{' '}
        <span className="font-bold text-[#26332F]">{totalItems}</span> posts
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-1.5 self-end sm:self-auto">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-[#D8E2D9] text-[#26332F] bg-[#EEF3EE] hover:bg-[#E4ECE5] disabled:opacity-40 disabled:cursor-not-allowed font-semibold transition-colors"
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
                    <span className="text-[#68756F] px-1 font-mono">...</span>
                  )}
                  <button
                    onClick={() => onPageChange(p)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                      currentPage === p
                        ? 'bg-[#176B5B] text-white shadow-2xs'
                        : 'border border-[#D8E2D9] bg-[#EEF3EE] text-[#26332F] hover:bg-[#E4ECE5]'
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
          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-[#D8E2D9] text-[#26332F] bg-[#EEF3EE] hover:bg-[#E4ECE5] disabled:opacity-40 disabled:cursor-not-allowed font-semibold transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
