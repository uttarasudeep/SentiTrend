import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({ error, onRetry }) {
  return (
    <div className="bg-[#FCE8E8] border-l-4 border-l-[#D95757] border border-[#F7C5C5] rounded-xl p-4 shadow-xs my-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-[#D95757] shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-[#26332F]">
              Unable to load sentiment data
            </h3>
            <p className="text-xs text-[#68756F] mt-0.5 font-medium">
              {error || 'Check the API connection and try again.'}
            </p>
          </div>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="self-start sm:self-auto inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#176B5B] text-white text-xs font-bold hover:bg-[#13594B] transition-colors shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>
        )}
      </div>
    </div>
  );
}
