
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6">
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-t-2 border-b-2 border-amber-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-r-2 border-l-2 border-emerald-500 animate-spin-slow"></div>
        </div>
      </div>
      <p className="font-lora italic text-slate-400 animate-pulse">
        Transmuting the logos...
      </p>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};
