import React from 'react';
import { RefreshCw, Menu, AlertCircle, Database } from 'lucide-react';

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
    <header className="sticky top-0 z-30 bg-[#EEF3EE]/95 backdrop-blur-sm border-b border-[#D8E2D9]">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Mobile hamburger & Editorial Breadcrumb */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 rounded-lg text-[#68756F] hover:text-[#26332F] hover:bg-[#DCE7DF]"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-[#68756F] uppercase tracking-wider">
                SentiTrend
              </span>
              <span className="text-[#A2B3A8]">/</span>
              <span className="text-sm font-bold text-[#26332F] tracking-tight">
                {activeTabTitle}
              </span>
            </div>
            <p className="text-xs text-[#68756F] font-medium hidden sm:block">
              Real-time social sentiment intelligence & event-window monitoring
            </p>
          </div>
        </div>

        {/* Right: Actions & Indicators */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Last updated indicator */}
          {lastUpdated && (
            <span className="text-xs text-[#68756F] font-medium hidden md:inline">
              Synced {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          )}

          {/* Mode Switcher */}
          <button
            onClick={onToggleMock}
            title="Toggle between Mock Data and Live Backend API"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#D8E2D9] text-xs font-semibold text-[#26332F] bg-[#DCE7DF] hover:bg-[#CFDCD2] transition-colors shadow-2xs"
          >
            <Database className="w-3.5 h-3.5 text-[#176B5B]" />
            <span className="hidden sm:inline text-[#68756F] font-medium">Source:</span>
            <span>{isMock ? 'Mock' : 'Live:8000'}</span>
          </button>

          {/* Evaluation Error UI Toggle */}
          <button
            onClick={onToggleSimulateError}
            title="Toggle simulated error to demonstrate error handling during evaluation"
            className={`inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
              isSimulatingError
                ? 'bg-[#FCE8E8] border-[#D95757] text-[#D95757]'
                : 'border-[#D8E2D9] text-[#68756F] hover:text-[#26332F] hover:bg-[#DCE7DF]'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isSimulatingError ? 'Clear Error' : 'Test Error'}</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#176B5B] hover:bg-[#13594B] text-white text-xs font-semibold transition-colors shadow-xs disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>
    </header>
  );
}
