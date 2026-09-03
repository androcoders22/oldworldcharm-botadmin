/**
 * Utility functions for Old World Charm Admin Dashboard
 */

/**
 * Formats an ISO date string into Indian Standard Time (IST)
 */
export function formatISTDateTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;

    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date);
  } catch {
    return isoString;
  }
}

/**
 * Formats relative time (e.g., "5 mins ago", "2 hours ago")
 */
export function formatRelativeTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 10) return 'Just now';
    if (diffSecs < 60) return `${diffSecs}s ago`;
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;

    return formatISTDateTime(isoString).split(',')[0];
  } catch {
    return '';
  }
}

/**
 * Checks if an ISO timestamp is from today (in IST)
 */
export function isToday(isoString: string): boolean {
  try {
    const date = new Date(isoString);
    const now = new Date();

    const dateIST = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(date);

    const nowIST = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(now);

    return dateIST === nowIST;
  } catch {
    return false;
  }
}

/**
 * Formats file size in bytes to human-readable format (Bytes, KB, MB)
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (!bytes || bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Cleans phone number and returns digits
 */
export function cleanPhoneNumber(phone: string): string {
  if (!phone) return '';
  return phone.replace(/\D/g, '');
}

/**
 * Gets WhatsApp chat link for Indian phone numbers (prefix 91 if not present)
 */
export function getWhatsAppLink(mobile: string, text?: string): string {
  let cleaned = cleanPhoneNumber(mobile);
  if (cleaned.length === 10) {
    cleaned = `91${cleaned}`;
  }
  const defaultText = text ? encodeURIComponent(text) : encodeURIComponent('Hello! Thank you for inquiring about Old World Charm.');
  return `https://wa.me/${cleaned}?text=${defaultText}`;
}

/**
 * Generates initials from client name (e.g. "Allen Sharma" -> "AS")
 */
export function getInitials(name: string): string {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Deterministic color generator for avatar backgrounds based on name
 */
export function getAvatarColor(name: string): string {
  const colors = [
    'bg-blue-600 text-blue-100 ring-blue-500/30',
    'bg-indigo-600 text-indigo-100 ring-indigo-500/30',
    'bg-cyan-600 text-cyan-100 ring-cyan-500/30',
    'bg-emerald-600 text-emerald-100 ring-emerald-500/30',
    'bg-amber-600 text-amber-100 ring-amber-500/30',
    'bg-rose-600 text-rose-100 ring-rose-500/30',
    'bg-purple-600 text-purple-100 ring-purple-500/30',
    'bg-teal-600 text-teal-100 ring-teal-500/30',
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

/**
 * Shortens conversation ID or Mongo ObjectId for clean display
 */
export function truncateId(id: string, start = 8, end = 4): string {
  if (!id) return '';
  if (id.length <= start + end) return id;
  return `${id.substring(0, start)}...${id.substring(id.length - end)}`;
}
