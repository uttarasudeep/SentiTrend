import React from 'react';
import { Activity, RefreshCw, Database, AlertCircle, Radio } from 'lucide-react';

export default function Header({
  health,
  isMock,
  onToggleMock,
  isSimulatingError,
  onToggleSimulateError,
  onRefresh,
  loading,
  lastUpdated,
}) {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand info */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight text-white">SentiTrend</h1>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                v1.0 Stream Analytics
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Real-time Social Sentiment & Sliding Window Dashboard
            </p>
          </div>
        </div>

        {/* Status badges & Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Health & Backend status indicator */}
          <div
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${
              isSimulatingError
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                : health?.status === 'ok'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            }`}
          >
            <Radio
              className={`w-3.5 h-3.5 ${
                isSimulatingError
                  ? 'text-rose-400'
                  : 'text-emerald-400 animate-pulse'
              }`}
            />
            <span>
              {isSimulatingError
                ? 'Simulated Error State'
                : isMock
                ? 'Mock Data Engine'
                : 'Connected to Backend (Port 8000)'}
            </span>
          </div>

          {/* Toggle Mock / Live */}
          <button
            onClick={onToggleMock}
            title="Toggle between Mock Data and Live API Server"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
          >
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            <span>Mode: {isMock ? 'Mock' : 'Live API'}</span>
          </button>

          {/* Error state test toggle */}
          <button
            onClick={onToggleSimulateError}
            title="Toggle simulated error to demonstrate resilient error UI"
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isSimulatingError
                ? 'bg-rose-600 border-rose-500 text-white'
                : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-300'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{isSimulatingError ? 'Clear Error' : 'Test Error UI'}</span>
          </button>

          {/* Refresh button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-sm transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          {lastUpdated && (
            <span className="text-[11px] text-slate-500 hidden xl:inline">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
