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
      return { label: 'Positive', color: 'text-[#176B5B] bg-[#DCEDE6] border-[#C1DFD3]' };
    }
    if (neg >= pos && neg >= neu) {
      return { label: 'Negative', color: 'text-[#D95757] bg-[#FCE8E8] border-[#F7C5C5]' };
    }
    return { label: 'Neutral', color: 'text-[#55635E] bg-[#E6EBE8] border-[#D2DDD7]' };
  };

  return (
    <div className="bg-[#F7F8F2] border border-[#D8E2D9] rounded-xl p-5 shadow-xs h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E4ECE5] mb-4">
          <div>
            <div className="text-[10px] font-bold text-[#68756F] uppercase tracking-wider">
              Channel Volume
            </div>
            <h2 className="text-base font-bold text-[#26332F] tracking-tight">
              Topic Activity Ranking
            </h2>
          </div>
          <span className="text-xs text-[#68756F] font-mono font-medium">
            {sortedTopics.length} tracked topics
          </span>
        </div>

        {/* Ranked Topic List */}
        <div className="divide-y divide-[#E4ECE5]">
          {sortedTopics.map((topic, index) => {
            const dominant = getDominantSentiment(topic);
            const volumePercent = Math.round(((topic.total_posts || 0) / maxPosts) * 100);

            return (
              <div
                key={topic.topic || index}
                onClick={() => onSelectTopic?.(topic.topic)}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#EEF3EE] p-2 rounded-lg transition-colors cursor-pointer group"
                title={`Filter feed by #${topic.topic}`}
              >
                {/* Topic Name & Rank */}
                <div className="flex items-center space-x-3 sm:w-1/3">
                  <span className="text-xs font-mono font-bold text-[#68756F] w-4">
                    #{index + 1}
                  </span>
                  <div>
                    <span className="text-sm font-bold text-[#26332F] group-hover:text-[#176B5B] transition-colors uppercase tracking-tight">
                      {topic.topic}
                    </span>
                    <div className="text-[11px] text-[#68756F] font-medium sm:hidden">
                      {topic.total_posts.toLocaleString()} posts
                    </div>
                  </div>
                </div>

                {/* Relative Volume Bar */}
                <div className="flex-1 max-w-xs mx-0 sm:mx-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 flex-1 bg-[#E4ECE5] rounded-xs overflow-hidden">
                      <div
                        className="h-full bg-[#176B5B] group-hover:bg-[#13594B] transition-all rounded-xs"
                        style={{ width: `${volumePercent}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-[#68756F] font-semibold w-16 text-right hidden sm:inline">
                      {topic.total_posts.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Dominant Sentiment Badge */}
                <div className="flex items-center space-x-2 self-start sm:self-auto">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border ${dominant.color}`}
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
      <div className="pt-3 border-t border-[#E4ECE5] mt-4 text-[11px] text-[#68756F] flex items-center justify-between">
        <span>Click any topic row to filter live social posts</span>
        <span className="text-[#176B5B] font-bold">Ranked by stream volume</span>
      </div>
    </div>
  );
}
