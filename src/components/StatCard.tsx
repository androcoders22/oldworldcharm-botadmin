import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: 'brand' | 'emerald' | 'purple' | 'amber' | 'cyan';
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  trend,
}) => {
  const colorStyles = {
    brand: {
      bg: 'bg-brand-500/10',
      border: 'border-brand-500/20',
      iconBg: 'bg-brand-500/20 text-brand-400 ring-brand-500/30',
      glow: 'group-hover:border-brand-500/40',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      iconBg: 'bg-emerald-500/20 text-emerald-400 ring-emerald-500/30',
      glow: 'group-hover:border-emerald-500/40',
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      iconBg: 'bg-purple-500/20 text-purple-400 ring-purple-500/30',
      glow: 'group-hover:border-purple-500/40',
    },
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      iconBg: 'bg-amber-500/20 text-amber-400 ring-amber-500/30',
      glow: 'group-hover:border-amber-500/40',
    },
    cyan: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      iconBg: 'bg-cyan-500/20 text-cyan-400 ring-cyan-500/30',
      glow: 'group-hover:border-cyan-500/40',
    },
  }[color];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-slate-850/80 border ${colorStyles.border} p-5 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${colorStyles.glow}`}
    >
      {/* Background ambient gradient */}
      <div
        className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full ${colorStyles.bg} blur-2xl pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity`}
      />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {value}
            </span>
          </div>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-400 font-medium">{subtitle}</p>
          )}
        </div>

        <div
          className={`p-3 rounded-xl ${colorStyles.iconBg} ring-1 shadow-inner flex items-center justify-center`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {trend && (
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-1.5 text-xs">
          {trend.isPositive ? (
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
          )}
          <span
            className={`font-semibold ${
              trend.isPositive ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {trend.value}
          </span>
          <span className="text-slate-400 text-[11px]">vs yesterday</span>
        </div>
      )}
    </div>
  );
};
