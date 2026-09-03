import axios, { AxiosError } from 'axios';
import { Lead, LeadsApiResponse } from '../types/lead';

// Read API base URL from Vite environment or default to local NestJS backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Response interceptor for consistent error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message = (error.response?.data as any)?.message || error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

// Built-in Mock Data for offline testing or demo mode
export const MOCK_LEADS: Lead[] = [
  {
    _id: '6a982d3f9b1c2e001a45f901',
    name: 'Allen Sharma',
    mobile: '9936211336',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 mins ago
    conversation_id: 'cd844aa6-f022-4701-9cef-465b29d7a589',
  },
  {
    _id: '6a982d3f9b1c2e001a45f902',
    name: 'Priya Mehra',
    mobile: '9811234567',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    conversation_id: '8f3b92a1-d410-4821-bc55-71829e0129cd',
  },
  {
    _id: '6a982d3f9b1c2e001a45f903',
    name: 'Vikramaditya Roy',
    mobile: '9876543210',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    conversation_id: '12ef44bc-9921-4ba2-8fa0-bb65a31092ef',
  },
  {
    _id: '6a982d3f9b1c2e001a45f904',
    name: 'Ananya Deshmukh',
    mobile: '9123456780',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // Yesterday
    conversation_id: '991ac410-53bb-4039-92c1-301289fe2011',
  },
  {
    _id: '6a982d3f9b1c2e001a45f905',
    name: 'Rajesh K. Verma',
    mobile: '9845012345',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    conversation_id: 'e410bc39-11fa-4c7b-b092-aa0934125890',
  },
  {
    _id: '6a982d3f9b1c2e001a45f906',
    name: 'Sunita Menon',
    mobile: '9765432198',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    conversation_id: 'a901ff44-883c-4ef1-80bb-65239e110452',
  },
];

/**
 * Service methods for Leads
 */
export const LeadsService = {
  /**
   * Fetches all captured leads from GET /api/agent/leads
   */
  async getLeads(): Promise<Lead[]> {
    try {
      const response = await apiClient.get<LeadsApiResponse | Lead[]>('/api/agent/leads');
      const data = response.data;

      // Handle both { status: true, data: [...] } and raw [...]
      if (data && typeof data === 'object' && 'data' in data && Array.isArray((data as LeadsApiResponse).data)) {
        return (data as LeadsApiResponse).data;
      }
      if (Array.isArray(data)) {
        return data;
      }
      return [];
    } catch (error) {
      console.warn('Backend API /api/agent/leads unavailable or errored:', error);
      throw error;
    }
  },
};

