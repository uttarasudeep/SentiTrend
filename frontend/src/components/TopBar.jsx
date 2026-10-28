import React from 'react';
import { RefreshCw, Menu, Radio, AlertCircle, Database } from 'lucide-react';

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
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Mobile hamburger & Editorial Breadcrumb */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                SentiTrend
              </span>
              <span className="text-slate-300">/</span>
              <span className="text-sm font-bold text-slate-900 tracking-tight">
                {activeTabTitle}
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Real-time social sentiment intelligence & event-window monitoring
            </p>
          </div>
        </div>

        {/* Right: Actions & Indicators */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Last updated indicator */}
          {lastUpdated && (
            <span className="text-xs text-slate-400 hidden md:inline">
              Synced {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          )}

          {/* Mode Switcher */}
          <button
            onClick={onToggleMock}
            title="Toggle between Mock Data and Live Backend API"
            className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded border border-slate-200 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <Database className="w-3.5 h-3.5 text-teal-700" />
            <span className="hidden sm:inline">Source:</span>
            <span className="font-semibold text-slate-900">{isMock ? 'Mock' : 'Live:8000'}</span>
          </button>

          {/* Evaluation Error UI Toggle */}
          <button
            onClick={onToggleSimulateError}
            title="Toggle simulated error to demonstrate error handling during evaluation"
            className={`inline-flex items-center space-x-1 px-2 py-1.5 rounded border text-xs font-medium transition-colors ${
              isSimulatingError
                ? 'bg-red-50 border-red-300 text-red-700 font-semibold'
                : 'border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isSimulatingError ? 'Clear Error' : 'Test Error'}</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-slate-900 text-white hover:bg-slate-800 text-xs font-medium transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>
    </header>
  );
}
