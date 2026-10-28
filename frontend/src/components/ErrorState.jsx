import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorState({ error, onRetry }) {
  return (
    <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6 text-center max-w-xl mx-auto my-8 shadow-lg backdrop-blur-sm">
      <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-white tracking-wide">
        Unable to Load SentiTrend Data
      </h3>
      <p className="text-xs text-rose-300/90 mt-1 max-w-md mx-auto leading-relaxed">
        {error || 'An unexpected error occurred while communicating with the data service.'}
      </p>

      <div className="mt-5 flex items-center justify-center space-x-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Request</span>
          </button>
        )}
      </div>
    </div>
  );
}
