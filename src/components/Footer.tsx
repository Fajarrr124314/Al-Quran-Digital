import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md pt-8 pb-28 md:pb-8 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-primary">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <span className="font-bold text-slate-800 dark:text-white tracking-wide">Al-Quran</span>
        </div>
        
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
            Dibuat dengan <Heart className="w-4 h-4 text-red-500 fill-red-500/20" /> untuk umat Islam
          </p>
        </div>
        
      </div>
    </footer>
  );
};
