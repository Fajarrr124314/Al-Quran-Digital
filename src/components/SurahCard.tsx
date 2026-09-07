import React from 'react';
import { Link } from 'react-router-dom';

interface SurahCardProps {
  id: number;
  name_arabic: string;
  name_simple: string;
  translated_name: string;
  verses_count: number;
}

export const SurahCard: React.FC<SurahCardProps> = ({ id, name_arabic, name_simple, translated_name, verses_count }) => {
  return (
    <Link
      to={`/surah/${id}`}
      className="glass rounded-2xl p-6 group relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-primary/20 block"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/0 via-accent-primary/0 to-teal-500/5 group-hover:to-teal-500/20 dark:to-teal-500/10 dark:group-hover:to-teal-500/30 transition-all duration-500 z-0"></div>
      
      <div className="relative z-10 flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center flex-shrink-0 relative group-hover:scale-110 transition-transform duration-500 shadow-inner">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-primary to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-white relative z-10 transition-colors duration-500">{id}</span>
        </div>
        
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-accent-primary dark:group-hover:text-accent-primary transition-colors">{name_simple}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate w-32">{translated_name}</p>
          </div>
          
          <div className="text-right">
            <h3 className="font-arabic text-xl font-bold text-slate-800 dark:text-white mb-1 transition-colors">{name_arabic}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{verses_count} Ayat</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
