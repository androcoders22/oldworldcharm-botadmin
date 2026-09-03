import React from 'react';
import { 
  Phone, 
  Clock, 
  Calendar, 
  MessageCircle,
  Hash,
  User,
  Shield
} from 'lucide-react';
import { Lead } from '../types/lead';
import { 
  formatISTDateTime, 
  formatRelativeTime, 
  getWhatsAppLink, 
  getInitials, 
  getAvatarColor
} from '../utils/formatters';

interface LeadTableProps {
  leads: Lead[];
  searchQuery?: string;
}

export const LeadTable: React.FC<LeadTableProps> = ({ leads }) => {
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800/80 bg-slate-850/70 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-4 px-4 sm:px-6 w-12 text-center">
                <span className="flex items-center justify-center gap-1">
                  <Hash className="w-3.5 h-3.5" />
                </span>
              </th>
              <th className="py-4 px-4 sm:px-6 min-w-[200px]">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Client Details</span>
                </div>
              </th>
              <th className="py-4 px-4 sm:px-6 min-w-[220px]">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Phone & Quick Reach</span>
                </div>
              </th>
              <th className="py-4 px-4 sm:px-6 min-w-[190px]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Timestamp (IST)</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-sm">
            {leads.map((lead, index) => {
              const leadId = lead._id || lead.id || `lead-${index}`;
              const initials = getInitials(lead.name);
              const avatarBg = getAvatarColor(lead.name);
              const formattedDate = formatISTDateTime(lead.timestamp);
              const relativeDate = formatRelativeTime(lead.timestamp);
              const waLink = getWhatsAppLink(lead.mobile, `Hi ${lead.name}, regarding your inquiry about Old World Charm properties...`);

              return (
                <tr
                  key={leadId}
                  className="group hover:bg-slate-850/60 transition-colors duration-150"
                >
                  {/* # Index */}
                  <td className="py-4 px-4 sm:px-6 text-center font-mono text-xs text-slate-400">
                    <span className="inline-block w-6 text-center">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </td>

                  {/* Client Name + Avatar */}
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-md ring-2 ${avatarBg} transition-transform group-hover:scale-105`}
                      >
                        {initials}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-100 group-hover:text-brand-300 transition-colors">
                          {lead.name}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Shield className="w-3 h-3 text-emerald-400" />
                          <span>Verified Prospect</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Mobile & Direct Actions */}
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center gap-2.5">
                      <a
                        href={`tel:${lead.mobile}`}
                        className="font-mono text-xs text-slate-200 hover:text-brand-400 font-semibold flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-750 transition-all group/phone"
                        title={`Call ${lead.mobile}`}
                      >
                        <Phone className="w-3.5 h-3.5 text-brand-400 group-hover/phone:rotate-12 transition-transform" />
                        <span>{lead.mobile}</span>
                      </a>

                      {/* 1-Click WhatsApp Button */}
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 transition-all shadow-sm active:scale-95 cursor-pointer"
                        title="Open WhatsApp Chat"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span className="font-sans font-medium">WhatsApp</span>
                      </a>
                    </div>
                  </td>

                  {/* Date & Time */}
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 text-xs text-slate-200 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{formattedDate}</span>
                      </div>
                      {relativeDate && (
                        <span className="text-[11px] text-brand-400/90 font-mono mt-0.5">
                          ({relativeDate})
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
