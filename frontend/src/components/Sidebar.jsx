import React from 'react';
import {
  LayoutDashboard,
  Radio,
  LineChart,
  Hash,
  Activity,
  Layers,
  X,
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  onSelectTab,
  health,
  isMock,
  isOpen,
  onClose,
}) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'feed', label: 'Live Posts', icon: Radio },
    { id: 'sentiment', label: 'Sentiment', icon: LineChart },
    { id: 'topics', label: 'Topics', icon: Hash },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-sm">
                ST
              </div>
              <div>
                <span className="font-semibold text-slate-900 text-base tracking-tight block">
                  SentiTrend
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase block">
                  Social Intelligence
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
              Dashboards
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onClose?.();
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-teal-800 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-teal-700' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* System Status Section */}
          <div className="p-4 mx-4 mt-4 rounded-lg bg-slate-50 border border-slate-200/80">
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2.5">
              System Telemetry
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 text-[11px]">API Status</span>
                <span className="inline-flex items-center text-[11px] font-medium text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5 animate-pulse" />
                  {isMock ? 'Mock Engine' : 'Online'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 text-[11px]">Data Ingestion</span>
                <span className="inline-flex items-center text-[11px] font-medium text-teal-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mr-1.5" />
                  Active Stream
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 text-[11px]">VADER Polarity</span>
                <span className="text-slate-500 text-[11px] font-mono font-medium">
                  UDF Ready
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>SentiTrend Engine</span>
          </div>
          <span className="font-mono text-slate-400 font-medium">v1.0.0</span>
        </div>
      </aside>
    </>
  );
}
