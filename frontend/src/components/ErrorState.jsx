import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({ error, onRetry }) {
  return (
    <div className="bg-white border-l-4 border-l-red-600 border border-slate-200 rounded-lg p-4 shadow-sm my-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Unable to load sentiment data
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {error || 'Check the API connection and try again.'}
            </p>
          </div>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="self-start sm:self-auto inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>
        )}
      </div>
    </div>
  );
}
