import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  leadCount?: number;
  onRefresh: () => void;
  isRefreshing: boolean;
  isBackendConnected: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  leadCount,
  onRefresh,
  isRefreshing,
  isBackendConnected,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col antialiased">
      {/* Sonner Toast Notification Center */}
      <Toaster 
        theme="dark" 
        position="top-right" 
        richColors 
        closeButton 
        toastOptions={{
          style: {
            background: '#1e293b',
            borderColor: '#334155',
            color: '#f8fafc',
          },
        }}
      />

      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        leadCount={leadCount}
        isBackendConnected={isBackendConnected}
      />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex flex-col flex-1 min-h-screen">
        <Navbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onRefresh={onRefresh}
          isRefreshing={isRefreshing}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
