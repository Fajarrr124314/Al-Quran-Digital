import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight } from 'lucide-react';

interface LastReadData {
  surahId: number;
  surahName: string;
  verseNumber: number;
}

export const LastReadCard: React.FC = () => {
  const [lastRead, setLastRead] = useState<LastReadData | null>(null);

  useEffect(() => {
    try {
      const data = localStorage.getItem('lastRead');
      if (data) {
        setLastRead(JSON.parse(data));
      }
    } catch (e) {
      console.error("Failed to parse last read", e);
    }
  }, []);

  if (!lastRead) return null;

  return (
    <div className="relative group cursor-pointer mb-8">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-teal-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
      
      <Link to={`/surah/${lastRead.surahId}`} className="relative block glass rounded-2xl p-6 overflow-hidden">
        {/* Background decorative pattern */}
        <div className="absolute right-0 top-0 opacity-10">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-accent-primary transform translate-x-4 -translate-y-4">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </div>

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary">
              <Bookmark className="w-6 h-6 fill-accent-primary/20" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Terakhir Dibaca</p>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                Surah {lastRead.surahName}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                Ayat {lastRead.verseNumber}
              </p>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 text-accent-primary font-semibold group-hover:translate-x-1 transition-transform">
            <span>Lanjutkan</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </Link>
    </div>
  );
};
