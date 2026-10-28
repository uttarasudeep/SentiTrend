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
    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs mb-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search keywords or topics..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700"
          />
        </div>

        {/* Compact Filters & Reset */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Sentiment Filter Dropdown */}
          <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs">
            <span className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">
              Sentiment:
            </span>
            <select
              value={selectedSentiment}
              onChange={(e) => onSelectSentiment(e.target.value)}
              className="bg-transparent text-slate-900 font-semibold focus:outline-none cursor-pointer text-xs"
            >
              {sentiments.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All Sentiments' : s}
                </option>
              ))}
            </select>
          </div>

          {/* Topic Filter Dropdown */}
          <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs">
            <span className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">
              Topic:
            </span>
            <select
              value={selectedTopic}
              onChange={(e) => onSelectTopic(e.target.value)}
              className="bg-transparent text-slate-900 font-semibold focus:outline-none cursor-pointer text-xs"
            >
              <option value="All">All Topics</option>
              {topicsList.map((t) => (
                <option key={t} value={t}>
                  #{t}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center space-x-1 text-xs text-slate-600 hover:text-red-700 font-medium px-2 py-1.5 rounded hover:bg-slate-100 transition-colors"
              title="Reset all active filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          {/* Filtered count badge */}
          <div className="text-xs text-slate-400 ml-auto font-mono">
            Filtered: <span className="font-bold text-slate-800">{totalFiltered}</span> posts
          </div>
        </div>
      </div>
    </div>
  );
}
