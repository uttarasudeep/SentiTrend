import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({ error, onRetry }) {
  return (
    <div className="bg-white border-l-4 border-l-[#FF5C69] border border-[#E3DCFC] rounded-2xl p-5 shadow-card my-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start space-x-3.5">
          <div className="p-2 rounded-xl bg-[#FF5C69]/15 text-[#FF5C69] shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-[#24213A]">
              Unable to load sentiment stream
            </h3>
            <p className="text-xs text-[#6F6A85] mt-0.5 font-semibold">
              {error || 'Check the stream API connection and try again.'}
            </p>
          </div>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="self-start sm:self-auto inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#5B3CC4] text-white text-xs font-bold hover:bg-[#452A9D] transition-all shadow-md shadow-[#5B3CC4]/20 hover:scale-[1.02]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>
        )}
      </div>
    </div>
  );
}
