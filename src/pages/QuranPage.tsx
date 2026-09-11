import React, { useEffect, useState, useDeferredValue, useMemo } from 'react';
import { SurahCard } from '../components/SurahCard';
import { getSurahList } from '../services/api';
import type { Surah } from '../services/api';
import { Search } from 'lucide-react';

export const QuranPage: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const deferredSearchQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const data = await getSurahList();
        setSurahs(data);
      } catch (err) {
        setError('Failed to load Surahs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  const filteredSurahs = useMemo(() => {
    const query = deferredSearchQuery.toLowerCase();
    if (!query) return surahs;
    return surahs.filter((surah) =>
      surah.name_simple.toLowerCase().includes(query) ||
      surah.translated_name.name.toLowerCase().includes(query)
    );
  }, [surahs, deferredSearchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="glass rounded-3xl p-8 md:p-12 mb-10 text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-white dark:from-slate-800/80 dark:to-slate-900/80 z-0 transition-colors duration-500"></div>
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-accent-primary/10 blur-3xl group-hover:bg-accent-primary/20 transition-all duration-700"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl group-hover:bg-teal-500/20 transition-all duration-700"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4 tracking-tight transition-colors">
            Al-Qur'anul Karim
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 transition-colors">
            Pilih surah yang ingin Anda baca atau cari berdasarkan nama dan terjemahannya.
          </p>
          
          <div className="relative max-w-lg mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 dark:text-slate-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Surah (misal: Al-Baqarah, Sapi Betina...)"
              className="block w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary transition-all shadow-lg dark:shadow-none text-lg"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-accent-primary/30 border-t-accent-primary rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-red-100/50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/20 rounded-xl text-red-500 dark:text-red-400">
          <p>{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSurahs.map((surah) => (
            <SurahCard
              key={surah.id}
              id={surah.id}
              name_arabic={surah.name_arabic}
              name_simple={surah.name_simple}
              translated_name={surah.translated_name.name}
              verses_count={surah.verses_count}
            />
          ))}
          
          {filteredSurahs.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-500">
              <p className="text-xl">Tidak ada surah yang cocok dengan pencarian "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
