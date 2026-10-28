import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, Clock, MessageSquareOff } from 'lucide-react';

export default function RecentPostsTable({ posts, loading }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getSentimentBadge = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Positive
          </span>
        );
      case 'negative':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Negative
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-400 border border-slate-500/20">
            Neutral
          </span>
        );
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
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch {
      return isoString;
    }
  };

  if (!loading && (!posts || posts.length === 0)) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center shadow-md">
        <MessageSquareOff className="w-12 h-12 text-slate-500 mx-auto mb-3" />
        <h3 className="text-sm font-bold text-white">No matching posts found</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          Try adjusting your sentiment or topic filters to view more stream records.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl shadow-md overflow-hidden">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white tracking-wide">Processed Social Stream Feed</h2>
          <p className="text-xs text-slate-400">Live records scored with VADER Polarity</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/40 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Post Content</th>
              <th className="py-3 px-4">Topic</th>
              <th className="py-3 px-4">Sentiment</th>
              <th className="py-3 px-4">Score</th>
              <th className="py-3 px-4">Platform</th>
              <th className="py-3 px-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
            {posts.map((post) => {
              const isExpanded = expandedId === post.id;
              const textLength = post.text ? post.text.length : 0;
              const isLongText = textLength > 100;

              return (
                <tr
                  key={post.id || Math.random()}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  {/* Post Content */}
                  <td className="py-3.5 px-4 max-w-md">
                    <div>
                      <p className={`text-slate-200 leading-relaxed font-normal ${!isExpanded ? 'line-clamp-2' : ''}`}>
                        {post.text}
                      </p>
                      {isLongText && (
                        <button
                          onClick={() => toggleExpand(post.id)}
                          className="mt-1 flex items-center space-x-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium focus:outline-none"
                        >
                          <span>{isExpanded ? 'Show less' : 'Read more'}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </td>

                  {/* Topic */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-indigo-300 border border-slate-700">
                      #{post.topic || 'general'}
                    </span>
                  </td>

                  {/* Sentiment Badge */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getSentimentBadge(post.sentiment)}
                  </td>

                  {/* Compound Score */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`font-mono font-semibold ${
                        post.compound_score >= 0.05
                          ? 'text-emerald-400'
                          : post.compound_score <= -0.05
                          ? 'text-rose-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {formatScore(post.compound_score)}
                    </span>
                  </td>

                  {/* Platform */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="capitalize text-slate-400 font-medium text-[11px]">
                      {post.platform || 'bluesky'}
                    </span>
                  </td>

                  {/* Timestamp */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-400 text-[11px]">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{formatTime(post.created_utc || post.collected_utc)}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
