import React from 'react';
import { RefreshCw, Menu, AlertCircle, Database, Radio, Sparkles } from 'lucide-react';

export default function TopBar({
  activeTabTitle = 'Overview',
  isMock,
  onToggleMock,
  isSimulatingError,
  onToggleSimulateError,
  onRefresh,
  loading,
  lastUpdated,
  onOpenSidebar,
}) {
  return (
    <header className="sticky top-0 z-30 bg-[#F1EEFF]/90 backdrop-blur-md border-b border-[#E3DCFC]/80 px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Left: Mobile hamburger & Greeting */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 rounded-xl text-[#5B3CC4] hover:bg-white/80 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center space-x-2.5">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#5B3CC4]">
                SentiTrend
              </span>
              <span className="text-[#B6A3FC]">/</span>
              <span className="text-xs font-bold text-[#6F6A85] uppercase tracking-wider">
                {activeTabTitle}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#12B8B0]/15 text-[#12B8B0] border border-[#12B8B0]/25">
                <span className="w-1.5 h-1.5 rounded-full bg-[#12B8B0] mr-1.5 animate-pulse" />
                LIVE STREAM
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#24213A] tracking-tight mt-0.5">
              What's the social pulse today?
            </h1>
          </div>
        </div>

        {/* Right: Actions & Status */}
        <div className="flex items-center space-x-2 sm:space-x-3 self-end sm:self-auto">
          {lastUpdated && (
            <span className="text-xs font-semibold text-[#6F6A85] hidden md:inline">
              Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          )}

          {/* Mode Switcher */}
          <button
            onClick={onToggleMock}
            title="Toggle between Mock Data and Live Backend API"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-[#E3DCFC] text-xs font-bold text-[#5B3CC4] bg-white hover:bg-[#F9F7FF] transition-all shadow-xs"
          >
            <Database className="w-3.5 h-3.5 text-[#5B3CC4]" />
            <span className="hidden sm:inline text-[#6F6A85] font-medium">Source:</span>
            <span>{isMock ? 'Mock' : 'Live:8000'}</span>
          </button>

          {/* Evaluation Error UI Toggle */}
          <button
            onClick={onToggleSimulateError}
            title="Toggle simulated error to demonstrate error UI during evaluation"
            className={`inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xs ${
              isSimulatingError
                ? 'bg-[#FF5C69] border-[#FF5C69] text-white shadow-[#FF5C69]/20'
                : 'bg-white border-[#E3DCFC] text-[#6F6A85] hover:text-[#24213A] hover:bg-[#F9F7FF]'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isSimulatingError ? 'Reset Error' : 'Test Error'}</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#5B3CC4] hover:bg-[#452A9D] text-white text-xs font-bold transition-all shadow-md shadow-[#5B3CC4]/20 hover:scale-[1.02] disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>
    </header>
  );
}
