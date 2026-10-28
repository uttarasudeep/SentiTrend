import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, ExternalLink, Inbox } from 'lucide-react';

export default function RecentPostsFeed({ posts, loading, totalFiltered }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getSentimentDot = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return {
          dot: 'bg-emerald-600',
          badge: 'text-emerald-700 bg-emerald-50 border-emerald-200',
          label: 'POSITIVE',
        };
      case 'negative':
        return {
          dot: 'bg-red-600',
          badge: 'text-red-700 bg-red-50 border-red-200',
          label: 'NEGATIVE',
        };
      default:
        return {
          dot: 'bg-slate-500',
          badge: 'text-slate-700 bg-slate-100 border-slate-200',
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
      <div className="bg-white border border-slate-200 rounded-lg p-12 text-center shadow-xs">
        <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-2" />
        <h3 className="text-sm font-bold text-slate-800">No matching posts found</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          No records match the current sentiment or topic filters in the active stream buffer.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      {/* Header bar */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Live Stream Wire
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Recent Intelligence Feed
          </h2>
        </div>
        <div className="text-xs text-slate-500 font-mono">
          Showing <span className="font-bold text-slate-800">{posts.length}</span> of {totalFiltered}
        </div>
      </div>

      {/* Intelligence Feed / Wire list */}
      <div className="divide-y divide-slate-100">
        {posts.map((post) => {
          const isExpanded = expandedId === post.id;
          const config = getSentimentDot(post.sentiment);
          const isLong = post.text && post.text.length > 140;

          return (
            <article
              key={post.id || Math.random()}
              className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors"
            >
              {/* Top metadata line: Sentiment dot + Label + Topic + Timestamp + Score */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border ${config.badge}`}
                  >
                    {config.label}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="font-semibold text-slate-700 uppercase tracking-tight text-[11px]">
                    #{post.topic || 'general'}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-400 text-[11px] flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-slate-400 inline" />
                    <span>{formatTime(post.created_utc || post.collected_utc)}</span>
                  </span>
                </div>

                <div className="flex items-center space-x-2 font-mono text-[11px]">
                  <span className="text-slate-400">VADER Score:</span>
                  <span
                    className={`font-semibold ${
                      post.compound_score >= 0.05
                        ? 'text-emerald-700'
                        : post.compound_score <= -0.05
                        ? 'text-red-700'
                        : 'text-slate-600'
                    }`}
                  >
                    {formatScore(post.compound_score)}
                  </span>
                </div>
              </div>

              {/* Post Text */}
              <p
                className={`text-slate-900 text-sm leading-relaxed ${
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
                    className="inline-flex items-center space-x-1 text-teal-700 hover:text-teal-900 font-semibold text-[11px] focus:outline-none"
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

                <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                  <span className="uppercase tracking-wider font-medium">
                    Platform: {post.platform || 'Bluesky'}
                  </span>
                  {post.id && (
                    <span className="font-mono text-[10px] text-slate-400 hidden sm:inline">
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
