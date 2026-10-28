import React from 'react';

export default function TopicRankedList({ topicsData, onSelectTopic }) {
  if (!topicsData || !topicsData.topics) return null;

  // Sort topics by total_posts descending
  const sortedTopics = [...topicsData.topics].sort(
    (a, b) => (b.total_posts || 0) - (a.total_posts || 0)
  );

  const maxPosts = sortedTopics[0]?.total_posts || 1;

  // Determine dominant sentiment for each topic
  const getDominantSentiment = (topic) => {
    const pos = topic.positive || 0;
    const neg = topic.negative || 0;
    const neu = topic.neutral || 0;

    if (pos >= neg && pos >= neu) {
      return { label: 'Positive', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    }
    if (neg >= pos && neg >= neu) {
      return { label: 'Negative', color: 'text-red-700 bg-red-50 border-red-200' };
    }
    return { label: 'Neutral', color: 'text-slate-700 bg-slate-100 border-slate-200' };
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Channel Volume
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Topic Activity Ranking
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {sortedTopics.length} tracked topics
          </span>
        </div>

        {/* Ranked Topic List */}
        <div className="divide-y divide-slate-100">
          {sortedTopics.map((topic, index) => {
            const dominant = getDominantSentiment(topic);
            const volumePercent = Math.round(((topic.total_posts || 0) / maxPosts) * 100);

            return (
              <div
                key={topic.topic || index}
                onClick={() => onSelectTopic?.(topic.topic)}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/70 p-2 rounded transition-colors cursor-pointer group"
                title={`Filter feed by #${topic.topic}`}
              >
                {/* Topic Name & Rank */}
                <div className="flex items-center space-x-3 sm:w-1/3">
                  <span className="text-xs font-mono font-bold text-slate-400 w-4">
                    #{index + 1}
                  </span>
                  <div>
                    <span className="text-sm font-bold text-slate-800 group-hover:text-teal-700 transition-colors uppercase tracking-tight">
                      {topic.topic}
                    </span>
                    <div className="text-[11px] text-slate-400 sm:hidden">
                      {topic.total_posts.toLocaleString()} posts
                    </div>
                  </div>
                </div>

                {/* Relative Volume Bar */}
                <div className="flex-1 max-w-xs mx-0 sm:mx-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 flex-1 bg-slate-100 rounded-xs overflow-hidden">
                      <div
                        className="h-full bg-slate-700 group-hover:bg-teal-700 transition-all rounded-xs"
                        style={{ width: `${volumePercent}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-slate-500 w-16 text-right hidden sm:inline">
                      {topic.total_posts.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Dominant Sentiment Badge */}
                <div className="flex items-center space-x-2 self-start sm:self-auto">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${dominant.color}`}
                  >
                    {dominant.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Editorial footer */}
      <div className="pt-3 border-t border-slate-100 mt-4 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Click any topic row to filter live social posts</span>
        <span className="text-teal-700 font-medium">Ranked by total volume</span>
      </div>
    </div>
  );
}
