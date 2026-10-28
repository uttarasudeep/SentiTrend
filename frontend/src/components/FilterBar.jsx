import React from 'react';
import { Filter, Search, RotateCcw } from 'lucide-react';

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
    <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-2xl shadow-sm mb-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search posts by keyword..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Dropdown Filters & Reset */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Sentiment Filter */}
          <div className="flex items-center space-x-1.5 bg-slate-800/70 border border-slate-700/80 rounded-xl px-3 py-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <label className="text-xs text-slate-400 font-medium mr-1">Sentiment:</label>
            <select
              value={selectedSentiment}
              onChange={(e) => onSelectSentiment(e.target.value)}
              className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
            >
              {sentiments.map((s) => (
                <option key={s} value={s} className="bg-slate-900 text-white">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Topic Filter */}
          <div className="flex items-center space-x-1.5 bg-slate-800/70 border border-slate-700/80 rounded-xl px-3 py-1.5">
            <span className="text-xs text-indigo-400 font-bold">#</span>
            <label className="text-xs text-slate-400 font-medium mr-1">Topic:</label>
            <select
              value={selectedTopic}
              onChange={(e) => onSelectTopic(e.target.value)}
              className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900 text-white">
                All Topics
              </option>
              {topicsList.map((t) => (
                <option key={t} value={t} className="bg-slate-900 text-white">
                  #{t}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center space-x-1.5 text-xs text-rose-400 hover:text-rose-300 font-medium px-2.5 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          {/* Filtered count badge */}
          <div className="text-xs text-slate-400 ml-auto font-medium">
            Found <span className="text-white font-bold">{totalFiltered}</span> matching posts
          </div>
        </div>
      </div>
    </div>
  );
}
