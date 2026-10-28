import React from 'react';
import { Search, RotateCcw, Filter } from 'lucide-react';

export default function FilterBar({
  selectedSentiment,
  onSelectSentiment,
  selectedTopic,
  onSelectTopic,
  searchQuery,
  onSearchChange,
  topicsList,
  onResetFilters,
  totalFiltered,
}) {
  const sentiments = ['All', 'Positive', 'Negative', 'Neutral'];

  const hasActiveFilters =
    selectedSentiment !== 'All' || selectedTopic !== 'All' || searchQuery.trim() !== '';

  return (
    <div className="bg-white border border-[#E3DCFC] rounded-2xl p-4 shadow-card mb-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[#6F6A85] absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search keywords or topics..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#F9F7FF] border border-[#E3DCFC] rounded-xl pl-9 pr-3.5 py-2 text-xs font-semibold text-[#24213A] placeholder-[#6F6A85] focus:outline-none focus:ring-2 focus:ring-[#5B3CC4]/40 focus:border-[#5B3CC4]"
          />
        </div>

        {/* Compact Filters & Reset */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[10px] font-extrabold text-[#6F6A85] uppercase tracking-wider mr-1 hidden sm:inline">
            Filter by:
          </span>

          {/* Sentiment Filter Dropdown */}
          <div className="flex items-center space-x-1.5 bg-[#F9F7FF] border border-[#E3DCFC] rounded-xl px-3 py-1.5 text-xs">
            <select
              value={selectedSentiment}
              onChange={(e) => onSelectSentiment(e.target.value)}
              className="bg-transparent text-[#24213A] font-extrabold focus:outline-none cursor-pointer text-xs"
            >
              {sentiments.map((s) => (
                <option key={s} value={s} className="bg-white text-[#24213A]">
                  {s === 'All' ? 'All Sentiments' : s}
                </option>
              ))}
            </select>
          </div>

          {/* Topic Filter Dropdown */}
          <div className="flex items-center space-x-1.5 bg-[#F9F7FF] border border-[#E3DCFC] rounded-xl px-3 py-1.5 text-xs">
            <select
              value={selectedTopic}
              onChange={(e) => onSelectTopic(e.target.value)}
              className="bg-transparent text-[#24213A] font-extrabold focus:outline-none cursor-pointer text-xs"
            >
              <option value="All" className="bg-white text-[#24213A]">All Topics</option>
              {topicsList.map((t) => (
                <option key={t} value={t} className="bg-white text-[#24213A]">
                  #{t}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center space-x-1 text-xs text-[#FF5C69] hover:text-[#D73543] font-bold px-2.5 py-1.5 rounded-xl hover:bg-[#FFE9EB] transition-colors"
              title="Reset all active filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}

          {/* Filtered count badge */}
          <div className="text-xs text-[#6F6A85] ml-auto font-mono font-bold">
            Matches: <span className="text-[#5B3CC4] font-black">{totalFiltered}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
