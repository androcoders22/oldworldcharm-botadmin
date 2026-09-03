import React from 'react';

interface SkeletonProps {
  type: 'table' | 'cards';
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({ type, count = 5 }) => {
  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-slate-850/80 border border-slate-800 p-5 animate-pulse"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-3 w-20 bg-slate-700/60 rounded"></div>
                <div className="h-7 w-14 bg-slate-700 rounded"></div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-700/80"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Table Skeleton
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-slate-850/80 border border-slate-800 animate-pulse">
      <div className="p-4 border-b border-slate-800 bg-slate-900/50">
        <div className="h-4 w-40 bg-slate-700/70 rounded"></div>
      </div>
      <div className="divide-y divide-slate-800">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-8 h-8 rounded-full bg-slate-700"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 w-32 bg-slate-700 rounded"></div>
                <div className="h-3 w-24 bg-slate-700/50 rounded"></div>
              </div>
            </div>
            <div className="h-4 w-28 bg-slate-700/60 rounded hidden sm:block"></div>
            <div className="h-6 w-20 bg-slate-700/80 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
