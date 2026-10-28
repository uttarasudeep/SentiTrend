import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Inbox } from 'lucide-react';

export default function RecentPostsFeed({ posts, loading, totalFiltered }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getSentimentDot = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return {
          dot: 'bg-[#1F9D72]',
          badge: 'text-[#176B5B] bg-[#DCEDE6] border-[#C1DFD3]',
          label: 'POSITIVE',
        };
      case 'negative':
        return {
          dot: 'bg-[#D95757]',
          badge: 'text-[#D95757] bg-[#FCE8E8] border-[#F7C5C5]',
          label: 'NEGATIVE',
        };
      default:
        return {
          dot: 'bg-[#7A8793]',
          badge: 'text-[#55635E] bg-[#E6EBE8] border-[#D2DDD7]',
          label: 'NEUTRAL',
        };
    }
  };

  const formatScore = (score) => {
    if (typeof score !== 'number') return '0.0000';
    return score > 0 ? `+${score.toFixed(4)}` : score.toFixed(4);
  };

  const formatTime = (isoString) => {
    if (!isoString) return 'Recent';
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
      <div className="bg-[#F7F8F2] border border-[#D8E2D9] rounded-xl p-12 text-center shadow-xs">
        <Inbox className="w-10 h-10 text-[#68756F]/50 mx-auto mb-2" />
        <h3 className="text-sm font-bold text-[#26332F]">No matching posts found</h3>
        <p className="text-xs text-[#68756F] mt-1 max-w-sm mx-auto">
          No records match the current sentiment or topic filters in the active stream buffer.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F8F2] border border-[#D8E2D9] rounded-xl shadow-xs overflow-hidden">
      {/* Header bar */}
      <div className="px-5 py-4 border-b border-[#E4ECE5] flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold text-[#68756F] uppercase tracking-wider">
            Live Stream Wire
          </div>
          <h2 className="text-base font-bold text-[#26332F] tracking-tight">
            Recent Intelligence Feed
          </h2>
        </div>
        <div className="text-xs text-[#68756F] font-mono">
          Showing <span className="font-bold text-[#26332F]">{posts.length}</span> of {totalFiltered}
        </div>
      </div>

      {/* Intelligence Feed / Wire list */}
      <div className="divide-y divide-[#E4ECE5]">
        {posts.map((post) => {
          const isExpanded = expandedId === post.id;
          const config = getSentimentDot(post.sentiment);
          const isLong = post.text && post.text.length > 140;

          return (
            <article
              key={post.id || Math.random()}
              className="p-4 sm:p-5 hover:bg-[#EEF3EE]/60 transition-colors"
            >
              {/* Top metadata line */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border ${config.badge}`}
                  >
                    {config.label}
                  </span>
                  <span className="text-[#A2B3A8]">·</span>
                  <span className="font-bold text-[#26332F] uppercase tracking-tight text-[11px]">
                    #{post.topic || 'general'}
                  </span>
                  <span className="text-[#A2B3A8]">·</span>
                  <span className="text-[#68756F] text-[11px] font-medium flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-[#68756F] inline" />
                    <span>{formatTime(post.created_utc || post.collected_utc)}</span>
                  </span>
                </div>

                <div className="flex items-center space-x-2 font-mono text-[11px]">
                  <span className="text-[#68756F]">VADER Score:</span>
                  <span
                    className={`font-bold ${
                      post.compound_score >= 0.05
                        ? 'text-[#1F9D72]'
                        : post.compound_score <= -0.05
                        ? 'text-[#D95757]'
                        : 'text-[#68756F]'
                    }`}
                  >
                    {formatScore(post.compound_score)}
                  </span>
                </div>
              </div>

              {/* Post Text */}
              <p
                className={`text-[#26332F] text-sm leading-relaxed font-normal ${
                  !isExpanded ? 'line-clamp-2' : ''
                }`}
              >
                “{post.text}”
              </p>

              {/* Bottom footer: expand toggle & platform info */}
              <div className="mt-2.5 flex items-center justify-between text-xs pt-1">
                {isLong ? (
                  <button
                    onClick={() => toggleExpand(post.id)}
                    className="inline-flex items-center space-x-1 text-[#176B5B] hover:text-[#13594B] font-bold text-[11px] focus:outline-none"
                  >
                    <span>{isExpanded ? 'Show less' : 'Read full post'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center space-x-2 text-[11px] text-[#68756F]">
                  <span className="uppercase tracking-wider font-semibold">
                    Platform: {post.platform || 'Bluesky'}
                  </span>
                  {post.id && (
                    <span className="font-mono text-[10px] text-[#68756F]/80 hidden sm:inline">
                      ID: {post.id.slice(0, 16)}...
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
