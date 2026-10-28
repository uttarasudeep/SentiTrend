import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Inbox, Sparkles, Radio } from 'lucide-react';

export default function RecentPostsFeed({ posts, loading, totalFiltered }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getSentimentConfig = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return {
          dot: 'bg-[#12B8B0]',
          badge: 'text-[#0E8A84] bg-[#12B8B0]/15 border-[#12B8B0]/30',
          label: 'POSITIVE',
          scoreText: 'text-[#12B8B0]',
        };
      case 'negative':
        return {
          dot: 'bg-[#FF5C69]',
          badge: 'text-[#D73543] bg-[#FF5C69]/15 border-[#FF5C69]/30',
          label: 'NEGATIVE',
          scoreText: 'text-[#FF5C69]',
        };
      default:
        return {
          dot: 'bg-[#FFC857]',
          badge: 'text-[#9C710A] bg-[#FFC857]/20 border-[#FFC857]/40',
          label: 'NEUTRAL',
          scoreText: 'text-[#D49814]',
        };
    }
  };

  const formatScore = (score) => {
    if (typeof score !== 'number') return '0.0000';
    return score > 0 ? `+${score.toFixed(4)}` : score.toFixed(4);
  };

  const formatTime = (isoString) => {
    if (!isoString) return 'Just now';
    try {
      const date = new Date(isoString);
      return (
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
        ' · ' +
        date.toLocaleDateString([], { month: 'short', day: 'numeric' })
      );
    } catch {
      return isoString;
    }
  };

  if (!loading && (!posts || posts.length === 0)) {
    return (
      <div className="bg-white border border-[#E3DCFC] rounded-2xl p-12 text-center shadow-card">
        <Inbox className="w-10 h-10 text-[#6F6A85]/40 mx-auto mb-2" />
        <h3 className="text-base font-extrabold text-[#24213A]">No posts found</h3>
        <p className="text-xs text-[#6F6A85] font-medium mt-1 max-w-sm mx-auto">
          Try clearing or adjusting your sentiment and topic filters to resume live feed streaming.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Activity Header bar */}
      <div className="bg-white border border-[#E3DCFC] rounded-2xl p-4 shadow-card flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-[#5B3CC4]/10 text-[#5B3CC4]">
            <Radio className="w-4 h-4 text-[#5B3CC4] animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-extrabold text-[#5B3CC4] uppercase tracking-widest">
              Live Wire
            </div>
            <h2 className="text-base font-black text-[#24213A] tracking-tight">
              RECENT SOCIAL ACTIVITY
            </h2>
          </div>
        </div>
        <div className="text-xs font-bold text-[#6F6A85] bg-[#F1EEFF] px-3 py-1 rounded-xl">
          <span className="text-[#5B3CC4] font-black">{posts.length}</span> of {totalFiltered} filtered
        </div>
      </div>

      {/* Card Feed Items */}
      <div className="space-y-3">
        {posts.map((post) => {
          const isExpanded = expandedId === post.id;
          const config = getSentimentConfig(post.sentiment);
          const isLong = post.text && post.text.length > 130;

          return (
            <article
              key={post.id || Math.random()}
              className="bg-white border border-[#E3DCFC] rounded-2xl p-4 sm:p-5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Top metadata line: Status pill + Timestamp */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-black tracking-wider uppercase border ${config.badge}`}
                  >
                    {config.label}
                  </span>
                  <span className="text-[#E3DCFC]">|</span>
                  <span className="text-xs font-black text-[#5B3CC4]">
                    #{post.topic || 'general'}
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 text-xs text-[#6F6A85] font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTime(post.created_utc || post.collected_utc)}</span>
                </div>
              </div>

              {/* Post Text */}
              <p
                className={`text-[#24213A] text-sm leading-relaxed font-medium ${
                  !isExpanded ? 'line-clamp-2' : ''
                }`}
              >
                “{post.text}”
              </p>

              {/* Bottom footer: expand toggle & polarity score */}
              <div className="mt-3 flex items-center justify-between border-t border-[#F1EEFF] pt-2.5 text-xs">
                {isLong ? (
                  <button
                    onClick={() => toggleExpand(post.id)}
                    className="inline-flex items-center space-x-1 text-[#5B3CC4] hover:text-[#452A9D] font-extrabold text-[11px] focus:outline-none"
                  >
                    <span>{isExpanded ? 'Show less' : 'Read full comment'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                ) : (
                  <div className="text-[11px] text-[#6F6A85] uppercase tracking-wider font-bold">
                    Platform: {post.platform || 'Bluesky'}
                  </div>
                )}

                <div className="flex items-center space-x-2 font-mono text-[11px]">
                  <span className="text-[#6F6A85] font-semibold">VADER:</span>
                  <span className={`font-black text-xs ${config.scoreText}`}>
                    {formatScore(post.compound_score)}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
