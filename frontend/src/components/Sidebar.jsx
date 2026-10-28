import React from 'react';
import {
  LayoutDashboard,
  Radio,
  LineChart,
  Hash,
  Zap,
  X,
  Activity,
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
    { id: 'feed', label: 'Live Feed', icon: Radio },
    { id: 'sentiment', label: 'Sentiment Pulse', icon: LineChart },
    { id: 'topics', label: 'Trending Topics', icon: Hash },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Deep Violet / Plum Sidebar (#5B3CC4) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#5B3CC4] text-white flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 shadow-xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="h-20 px-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#12B8B0] text-white flex items-center justify-center font-extrabold text-base tracking-tight shadow-md">
                <Zap className="w-5 h-5 text-white fill-current" />
              </div>
              <div>
                <span className="font-extrabold text-white text-lg tracking-tight block">
                  SentiTrend
                </span>
                <span className="text-[10px] text-[#D4C9FF] font-semibold tracking-widest uppercase block">
                  Social Pulse Engine
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 py-2 text-[10px] font-bold text-[#D4C9FF] uppercase tracking-widest">
              Live Monitoring
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
                  className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#12B8B0] text-white shadow-md shadow-[#12B8B0]/30'
                      : 'text-[#D4C9FF] hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-white' : 'text-[#D4C9FF]'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* System Status Section */}
          <div className="p-4 mx-4 mt-4 rounded-2xl bg-[#4A2CAE]/60 border border-white/10 shadow-inner">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-[#D4C9FF] uppercase tracking-widest">
                Telemetry
              </span>
              <span className="flex items-center text-[10px] font-bold text-[#12B8B0] bg-[#12B8B0]/15 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#12B8B0] mr-1.5 animate-ping" />
                ACTIVE
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#D4C9FF] text-[11px] font-medium">Data Pipeline</span>
                <span className="inline-flex items-center text-[11px] font-bold text-white">
                  {isMock ? 'Mock Stream' : 'Kafka :9092'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#D4C9FF] text-[11px] font-medium">Spark Engine</span>
                <span className="inline-flex items-center text-[11px] font-bold text-[#12B8B0]">
                  Structured UDF
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#D4C9FF] text-[11px] font-medium">HBase Sink</span>
                <span className="text-white text-[11px] font-mono font-bold">
                  REST :8080
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Indicator Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-black/20 text-[11px] text-[#D4C9FF]">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5C69] animate-pulse" />
              <span className="font-bold tracking-wider text-white">STREAM ACTIVE</span>
            </div>
            <span className="font-mono text-white/60 font-bold">v1.0</span>
          </div>
        </div>
      </aside>
    </>
  );
}
