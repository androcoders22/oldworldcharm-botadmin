import React from 'react';
import { 
  Users, 
  Building2,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  leadCount?: number;
  isBackendConnected?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
  leadCount = 0,
  isBackendConnected = true,
}) => {

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/20 ring-1 ring-white/20">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg font-bold tracking-tight text-white">
                  Old World Charm
                </span>
              </div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Lead Management Admin
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Management
          </div>

          {/* Leads & Inquiries Nav Item */}
          <div className="w-full group flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-brand-600/90 to-brand-700 text-white shadow-md shadow-brand-600/25 ring-1 ring-white/10">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-white" />
              <div className="text-left">
                <div className="font-semibold text-sm leading-tight">Leads & Inquiries</div>
                <div className="text-[11px] text-brand-100">Captured client leads</div>
              </div>
            </div>

            {leadCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full border bg-white/20 text-white border-white/30">
                {leadCount}
              </span>
            )}
          </div>
        </div>

        {/* Footer Status Bar */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="relative flex h-2.5 w-2.5">
                {isBackendConnected && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    isBackendConnected ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                ></span>
              </div>
              <span className="text-slate-300 font-medium text-[11px]">
                {isBackendConnected ? 'NestJS API Online' : 'Fallback / Offline'}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">v1.0.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};
