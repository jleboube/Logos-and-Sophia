
import React from 'react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="text-center py-20 px-4 glass rounded-3xl border-red-500/20 max-w-md mx-auto">
      <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <h3 className="font-cinzel text-xl text-red-200 mb-2">The Path is Obscured</h3>
      <p className="text-slate-400 text-sm mb-6">{message}</p>
      <button 
        onClick={onRetry}
        className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-amber-500 rounded-full border border-amber-500/30 transition-all font-cinzel text-sm"
      >
        Invoke Again
      </button>
    </div>
  );
};
