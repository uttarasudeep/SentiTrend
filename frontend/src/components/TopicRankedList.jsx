import React from 'react';
import { Flame, ArrowUpRight } from 'lucide-react';

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
    const total = topic.total_posts || 1;

    if (pos >= neg && pos >= neu) {
      const pct = Math.round((pos / total) * 100);
      return {
        label: `Positive ${pct}%`,
        color: 'text-[#0E8A84] bg-[#12B8B0]/15 border-[#12B8B0]/30',
        dot: 'bg-[#12B8B0]',
      };
    }
    if (neg >= pos && neg >= neu) {
      const pct = Math.round((neg / total) * 100);
      return {
        label: `Negative ${pct}%`,
        color: 'text-[#D73543] bg-[#FF5C69]/15 border-[#FF5C69]/30',
        dot: 'bg-[#FF5C69]',
      };
    }
    const pct = Math.round((neu / total) * 100);
    return {
      label: `Neutral ${pct}%`,
      color: 'text-[#9C710A] bg-[#FFC857]/20 border-[#FFC857]/40',
      dot: 'bg-[#FFC857]',
    };
  };

  return (
    <div className="bg-white border border-[#E3DCFC] rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200 h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F1EEFF] mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-[#FF5C69]/15 text-[#FF5C69]">
              <Flame className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold text-[#5B3CC4] uppercase tracking-widest">
                Real-Time Virality
              </div>
              <h2 className="text-lg font-black text-[#24213A] tracking-tight">
                TRENDING TOPICS
              </h2>
            </div>
          </div>
          <span className="text-xs font-bold text-[#6F6A85] bg-[#F1EEFF] px-2.5 py-1 rounded-lg">
            {sortedTopics.length} Channels
          </span>
        </div>

        {/* Ranked Topic Cards */}
        <div className="space-y-2.5">
          {sortedTopics.map((topic, index) => {
            const dominant = getDominantSentiment(topic);
            const volumePercent = Math.round(((topic.total_posts || 0) / maxPosts) * 100);

            return (
              <div
                key={topic.topic || index}
                onClick={() => onSelectTopic?.(topic.topic)}
                className="group p-3.5 rounded-xl bg-[#F9F7FF] border border-[#E3DCFC]/60 hover:border-[#5B3CC4] hover:bg-white transition-all cursor-pointer shadow-2xs hover:shadow-sm"
                title={`Filter stream by #${topic.topic}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-black font-mono text-[#5B3CC4] w-5">
                      0{index + 1}
                    </span>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-sm font-black text-[#24213A] group-hover:text-[#5B3CC4] transition-colors">
                          #{topic.topic}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#B6A3FC] group-hover:text-[#5B3CC4] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-xs font-bold text-[#6F6A85]">
                        {topic.total_posts.toLocaleString()} posts
                      </div>
                    </div>
                  </div>

                  {/* Dominant Sentiment Pill */}
                  <div className="flex items-center space-x-1.5">
                    <span className={`w-2 h-2 rounded-full ${dominant.dot}`} />
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-black border ${dominant.color}`}
                    >
                      {dominant.label}
                    </span>
                  </div>
                </div>

                {/* Relative Volume Track */}
                <div className="mt-2.5 h-1.5 w-full bg-[#E3DCFC]/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#5B3CC4] to-[#12B8B0] rounded-full transition-all duration-300"
                    style={{ width: `${volumePercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3.5 border-t border-[#F1EEFF] mt-4 text-[11px] text-[#6F6A85] font-semibold flex items-center justify-between">
        <span>Click topic to filter social wire</span>
        <span className="text-[#5B3CC4] font-bold">Live Ranking</span>
      </div>
    </div>
  );
}
