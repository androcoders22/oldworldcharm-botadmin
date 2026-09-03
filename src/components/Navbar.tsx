import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  RefreshCw, 
  Clock,
  LogOut
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onToggleSidebar: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  onRefresh,
  isRefreshing,
}) => {
  const { logout } = useAuth();
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(now)
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    toast.info('Signed Out', {
      description: 'You have been logged out of the admin portal.',
    });
  };

  return (
    <header className="sticky top-0 z-30 h-20 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all">
      {/* Left side: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Client Leads & Inquiries
            </h1>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
              Live Admin
            </span>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block">
            Real-time captured phone leads from the AI concierge chatbot
          </p>
        </div>
      </div>

      {/* Right side: Clock, Refresh Button, and Sign Out */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* IST Clock */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-750 text-slate-300 text-xs font-medium">
          <Clock className="w-3.5 h-3.5 text-brand-400" />
          <span>{currentTime} IST</span>
        </div>

        {/* Manual Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/20 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
          title="Refresh lead records"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>

        {/* Quick Sign Out Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-rose-200 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 active:scale-95 transition-all cursor-pointer"
          title="Sign out of Admin Portal"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
};
