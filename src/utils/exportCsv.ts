import { Lead } from '../types/lead';
import { formatISTDateTime } from './formatters';

/**
 * Exports leads list to an Excel-friendly CSV file
 */
export function exportLeadsToCSV(leads: Lead[], filename = 'oldcharm_leads.csv'): void {
  if (!leads || leads.length === 0) {
    throw new Error('No leads available to export');
  }

  const headers = ['#', 'Client Name', 'Mobile Number', 'Date & Time (IST)', 'Conversation ID', 'Lead ID'];

  const rows = leads.map((lead, idx) => {
    const formattedDate = formatISTDateTime(lead.timestamp);
    // Escape double quotes in strings
    const safeName = (lead.name || '').replace(/"/g, '""');
    const safeMobile = (lead.mobile || '').replace(/"/g, '""');
    const safeConvId = (lead.conversation_id || '').replace(/"/g, '""');
    const safeId = (lead._id || lead.id || '').replace(/"/g, '""');
    const safeDate = formattedDate.replace(/"/g, '""');

    // Tab/apostrophe prefix prevents Excel from dropping leading zeros in phone numbers
    return [
      idx + 1,
      `"${safeName}"`,
      `"=""${safeMobile}"""`, // Forces Excel to treat as string
      `"${safeDate}"`,
      `"${safeConvId}"`,
      `"${safeId}"`,
    ].join(',');
  });

  // UTF-8 BOM for Excel UTF-8 compatibility
  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
