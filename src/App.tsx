import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';
import { LeadsDashboard } from './pages/LeadsDashboard';
import { LeadsService, MOCK_LEADS } from './services/api';
import { Lead } from './types/lead';
import { toast } from 'sonner';

export const App: React.FC = () => {
  // Leads State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLeadsLoading, setIsLeadsLoading] = useState<boolean>(true);
  const [leadsError, setLeadsError] = useState<string | null>(null);

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Connection & Demo Mode
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  // Fetch Leads
  const fetchLeads = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLeadsLoading(true);
    setLeadsError(null);

    if (isDemoMode) {
      setLeads(MOCK_LEADS);
      setIsBackendConnected(false);
      setIsLeadsLoading(false);
      return;
    }

    try {
      const data = await LeadsService.getLeads();
      setLeads(data);
      setIsBackendConnected(true);
    } catch (err: any) {
      const msg = err.message || 'Unable to connect to NestJS backend on http://localhost:3000';
      setLeadsError(msg);
      setIsBackendConnected(false);
      // Auto fallback to mock data if empty
      setLeads((prev) => (prev.length > 0 ? prev : MOCK_LEADS));
    } finally {
      setIsLeadsLoading(false);
    }
  }, [isDemoMode]);

  // Refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchLeads(true);
      toast.success('Leads synchronized!', {
        description: 'Lead records are up to date.',
        duration: 2000,
      });
    } catch {
      toast.error('Sync failed', {
        description: 'Could not reach the NestJS API server.',
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  // Initial Data Fetch
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Periodic background synchronization (every 15s)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLeads(true);
    }, 15000);

    return () => clearInterval(interval);
  }, [fetchLeads]);

  return (
    <Layout
      leadCount={leads.length}
      onRefresh={handleRefresh}
      isRefreshing={isRefreshing}
      isBackendConnected={isBackendConnected}
    >
      <LeadsDashboard
        leads={leads}
        isLoading={isLeadsLoading}
        error={leadsError}
        onRefresh={handleRefresh}
        isDemoMode={isDemoMode}
        setIsDemoMode={setIsDemoMode}
      />
    </Layout>
  );
};

export default App;
