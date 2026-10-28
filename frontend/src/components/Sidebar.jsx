import React from 'react';
import {
  LayoutDashboard,
  Radio,
  LineChart,
  Hash,
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
          className="fixed inset-0 z-40 bg-black/25 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container: muted deeper sage (#DCE7DF) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#DCE7DF] border-r border-[#D8E2D9] flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="h-16 px-6 border-b border-[#D0DDD3] flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#176B5B] text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs">
                ST
              </div>
              <div>
                <span className="font-bold text-[#26332F] text-base tracking-tight block">
                  SentiTrend
                </span>
                <span className="text-[10px] text-[#68756F] font-semibold tracking-wider uppercase block">
                  Social Intelligence
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-md text-[#68756F] hover:text-[#26332F] hover:bg-[#D0DDD3]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-bold text-[#68756F] uppercase tracking-widest">
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
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#176B5B] text-white shadow-xs'
                      : 'text-[#3D4C46] hover:text-[#176B5B] hover:bg-[#CFDCD2]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-white' : 'text-[#68756F]'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* System Status Section */}
          <div className="p-4 mx-4 mt-3 rounded-xl bg-[#F7F8F2] border border-[#D8E2D9] shadow-xs">
            <div className="text-[10px] font-bold text-[#68756F] uppercase tracking-widest mb-2.5">
              System Telemetry
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#68756F] text-[11px] font-medium">API Status</span>
                <span className="inline-flex items-center text-[11px] font-bold text-[#1F9D72]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1F9D72] mr-1.5 animate-pulse" />
                  {isMock ? 'Mock Engine' : 'Online'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#68756F] text-[11px] font-medium">Data Ingestion</span>
                <span className="inline-flex items-center text-[11px] font-bold text-[#176B5B]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#176B5B] mr-1.5" />
                  Active Stream
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#68756F] text-[11px] font-medium">VADER Polarity</span>
                <span className="text-[#26332F] text-[11px] font-mono font-semibold">
                  UDF Ready
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#D0DDD3] flex items-center justify-between text-[11px] text-[#68756F]">
          <div className="flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-[#68756F]" />
            <span className="font-medium">SentiTrend Engine</span>
          </div>
          <span className="font-mono text-[#3D4C46] font-bold">v1.0.0</span>
        </div>
      </aside>
    </>
  );
}
