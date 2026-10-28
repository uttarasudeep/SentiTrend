import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

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
    <div className="bg-[#F7F8F2] border border-[#D8E2D9] rounded-xl p-3.5 shadow-2xs mb-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-[#68756F] absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search stream comments or topics..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#EEF3EE] border border-[#D8E2D9] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#26332F] placeholder-[#68756F] focus:outline-none focus:ring-1 focus:ring-[#176B5B] focus:border-[#176B5B]"
          />
        </div>

        {/* Compact Filters & Reset */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Sentiment Filter Dropdown */}
          <div className="flex items-center space-x-1.5 bg-[#EEF3EE] border border-[#D8E2D9] rounded-lg px-2.5 py-1.5 text-xs">
            <span className="text-[#68756F] text-[10px] font-bold uppercase tracking-wider">
              Sentiment:
            </span>
            <select
              value={selectedSentiment}
              onChange={(e) => onSelectSentiment(e.target.value)}
              className="bg-transparent text-[#26332F] font-bold focus:outline-none cursor-pointer text-xs"
            >
              {sentiments.map((s) => (
                <option key={s} value={s} className="bg-[#F7F8F2] text-[#26332F]">
                  {s === 'All' ? 'All Sentiments' : s}
                </option>
              ))}
            </select>
          </div>

          {/* Topic Filter Dropdown */}
          <div className="flex items-center space-x-1.5 bg-[#EEF3EE] border border-[#D8E2D9] rounded-lg px-2.5 py-1.5 text-xs">
            <span className="text-[#68756F] text-[10px] font-bold uppercase tracking-wider">
              Topic:
            </span>
            <select
              value={selectedTopic}
              onChange={(e) => onSelectTopic(e.target.value)}
              className="bg-transparent text-[#26332F] font-bold focus:outline-none cursor-pointer text-xs"
            >
              <option value="All" className="bg-[#F7F8F2] text-[#26332F]">All Topics</option>
              {topicsList.map((t) => (
                <option key={t} value={t} className="bg-[#F7F8F2] text-[#26332F]">
                  #{t}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center space-x-1 text-xs text-[#D95757] hover:text-[#B83E3E] font-bold px-2 py-1.5 rounded-lg hover:bg-[#FCE8E8] transition-colors"
              title="Reset all active filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          {/* Filtered count badge */}
          <div className="text-xs text-[#68756F] ml-auto font-mono">
            Filtered: <span className="font-bold text-[#26332F]">{totalFiltered}</span> posts
          </div>
        </div>
      </div>
    </div>
  );
}
