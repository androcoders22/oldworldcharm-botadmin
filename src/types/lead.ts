export interface Lead {
  _id?: string;
  id?: string;
  name: string;
  mobile: string;
  timestamp: string;
  conversation_id: string;
  email?: string;
  notes?: string;
}

export interface LeadsApiResponse {
  status: boolean;
  message: string;
  data: Lead[];
}

export interface LeadStats {
  totalLeads: number;
  todayLeads: number;
  activeConversations: number;
  weeklyGrowth: number;
}
