import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Download, 
  Search, 
  ArrowUpDown, 
  CalendarCheck,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';
import { Lead } from '../types/lead';
import { StatCard } from '../components/StatCard';
import { LeadTable } from '../components/LeadTable';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { EmptyState } from '../components/EmptyState';
import { exportLeadsToCSV } from '../utils/exportCsv';
import { isToday } from '../utils/formatters';

interface LeadsDashboardProps {
  leads: Lead[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
  isDemoMode?: boolean;
  setIsDemoMode: (val: boolean) => void;
}

export const LeadsDashboard: React.FC<LeadsDashboardProps> = ({
  leads,
  isLoading,
  error,
  onRefresh,
  setIsDemoMode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Compute Metrics
  const stats = useMemo(() => {
    const total = leads.length;
    const today = leads.filter((l) => isToday(l.timestamp)).length;

    return {
      total,
      today,
    };
  }, [leads]);

  // Filter & Sort Leads
  const filteredLeads = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    let result = leads.filter((lead) => {
      if (!query) return true;
      const nameMatch = lead.name?.toLowerCase().includes(query);
      const phoneMatch = lead.mobile?.includes(query);
      const convMatch = lead.conversation_id?.toLowerCase().includes(query);
      const idMatch = (lead._id || lead.id)?.toLowerCase().includes(query);
      return nameMatch || phoneMatch || convMatch || idMatch;
    });

    result.sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime() || 0;
      const timeB = new Date(b.timestamp).getTime() || 0;
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });

    return result;
  }, [leads, searchQuery, sortOrder]);

  const handleExportCSV = () => {
    try {
      if (filteredLeads.length === 0) {
        toast.error('Export Failed', {
          description: 'No leads available matching current filter.',
        });
        return;
      }
      exportLeadsToCSV(filteredLeads, `oldcharm_leads_${new Date().toISOString().split('T')[0]}.csv`);
      toast.success('CSV Exported!', {
        description: `Successfully downloaded ${filteredLeads.length} leads.`,
      });
    } catch (err: any) {
      toast.error('Export Error', {
        description: err.message || 'Failed to export CSV file',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Backend Error / Offline Alert Banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-200">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-sm font-semibold">Backend API Notice: {error}</p>
              <p className="text-xs text-amber-300/80">
                You can switch to Preview Demo Mode to test the full dashboard UI.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDemoMode(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-semibold border border-amber-500/40 transition-all"
            >
              Enable Demo Mode
            </button>
            <button
              onClick={onRefresh}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Top Metrics Cards */}
      {isLoading && leads.length === 0 ? (
        <SkeletonLoader type="cards" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <StatCard
            title="Total Client Leads"
            value={stats.total}
            subtitle="Captured via chatbot phone tool"
            icon={Users}
            color="brand"
            trend={{ value: `+${stats.today}`, isPositive: true }}
          />
          <StatCard
            title="Leads Captured Today"
            value={stats.today}
            subtitle="Prospective real estate buyers"
            icon={CalendarCheck}
            color="emerald"
            trend={{ value: `${stats.today} today`, isPositive: stats.today > 0 }}
          />
        </div>
      )}

      {/* Main Table Card */}
      <div className="space-y-4">
        {/* Controls Bar: Search, Sort, Export */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-850/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-sm">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name, mobile, or session ID..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-750 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Sort Toggle */}
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 transition-all cursor-pointer"
              title={`Sorting: ${sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}`}
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-brand-400" />
              <span>{sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
            </button>

            {/* Export CSV Button */}
            <button
              onClick={handleExportCSV}
              disabled={filteredLeads.length === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between px-1 text-xs text-slate-400">
          <div>
            Showing <span className="text-white font-semibold">{filteredLeads.length}</span> of{' '}
            <span className="text-white font-semibold">{leads.length}</span> recorded leads
          </div>
          {searchQuery && (
            <div className="text-brand-400 font-medium">
              Filtered for &ldquo;{searchQuery}&rdquo;
            </div>
          )}
        </div>

        {/* Lead Table / Skeletons / Empty State */}
        {isLoading && leads.length === 0 ? (
          <SkeletonLoader type="table" count={5} />
        ) : filteredLeads.length > 0 ? (
          <LeadTable leads={filteredLeads} searchQuery={searchQuery} />
        ) : leads.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No Leads Captured Yet"
            description="When users provide their contact details in the live Old World Charm chatbot, they will automatically appear here."
            actionText="Enable Demo Preview"
            onAction={() => setIsDemoMode(true)}
          />
        ) : (
          <EmptyState
            isSearch
            title="No Matching Leads Found"
            description={`No leads matched your search query "${searchQuery}". Try searching with a different name, phone number, or session ID.`}
            actionText="Clear Search Filter"
            onAction={() => setSearchQuery('')}
          />
        )}
      </div>
    </div>
  );
};
