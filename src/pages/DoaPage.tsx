import React, { useState, useEffect } from 'react';
import { fetchDoaList, type DoaItem } from '../services/api';
import { Search, Loader2, BookOpen } from 'lucide-react';

export const DoaPage: React.FC = () => {
  const [doaList, setDoaList] = useState<DoaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const [selectedDoa, setSelectedDoa] = useState<DoaItem | null>(null);

  useEffect(() => {
    const loadDoa = async () => {
      try {
        const data = await fetchDoaList();
        setDoaList(data);
      } catch (error) {
        console.error("Failed to fetch doa", error);
      } finally {
        setLoading(false);
      }
    };
    loadDoa();
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedDoa) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedDoa]);

  const filteredDoa = doaList.filter(doa => 
    doa.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doa.idn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500 relative">
      
      {/* Header Section */}
      <div className="text-center mb-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-accent-primary/20 blur-[100px] rounded-full -z-10"></div>
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent-primary to-teal-400 rounded-3xl flex items-center justify-center text-white shadow-xl mb-6 rotate-3">
          <BookOpen className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">Kumpulan Doa Harian</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Lengkapi ibadah harian Anda dengan memanjatkan doa-doa pilihan yang bersumber dari Al-Qur'an dan Hadits.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12 relative z-10">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-accent-primary transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-lg focus:ring-2 focus:ring-accent-primary focus:border-accent-primary dark:text-white transition-all text-lg"
            placeholder="Cari doa (misal: 'tidur', 'makan', 'hujan')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-accent-primary">
          <Loader2 className="w-12 h-12 animate-spin mb-4" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">Memuat Kumpulan Doa...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredDoa.map((doa) => (
            <button 
              key={doa.id}
              onClick={() => setSelectedDoa(doa)}
              className="glass rounded-2xl p-6 text-left flex flex-col items-start group hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-primary/20 transition-all duration-300 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent-primary"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent-primary/10 to-teal-500/10 rounded-full blur-xl group-hover:bg-accent-primary/20 transition-colors"></div>
              
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-accent-primary flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform shadow-sm">
                {doa.id}
              </div>
              
              <h3 className="font-bold text-slate-800 dark:text-white mb-2 group-hover:text-accent-primary transition-colors text-lg line-clamp-2">
                {doa.nama}
              </h3>
              
              <span className="inline-block mt-auto px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-xs font-semibold text-slate-500 dark:text-slate-400">
                {doa.grup || "Doa Harian"}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredDoa.length === 0 && (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Doa Tidak Ditemukan</h3>
          <p className="text-slate-500 dark:text-slate-400">Coba gunakan kata kunci lain untuk pencarian Anda.</p>
        </div>
      )}

      {/* Floating Modal for Doa Details */}
      {selectedDoa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedDoa(null)}
          ></div>
          
          <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-start gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-accent-primary/10 text-xs font-bold text-accent-primary mb-3">
                  {selectedDoa.grup || "Doa Harian"}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white leading-tight">
                  {selectedDoa.nama}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedDoa(null)}
                className="w-10 h-10 flex-shrink-0 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 md:p-8 overflow-y-auto">
              <div className="space-y-8">
                {/* Arabic Text */}
                <div className="bg-slate-50 dark:bg-slate-800/30 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                  <p className="font-arabic text-3xl md:text-4xl leading-relaxed text-right text-slate-900 dark:text-white" dir="rtl">
                    {selectedDoa.ar}
                  </p>
                </div>
                
                {/* Translations */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Latin / Transliterasi</h4>
                    <p className="text-lg font-medium text-accent-primary italic">
                      "{selectedDoa.tr}"
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Artinya</h4>
                    <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedDoa.idn}
                    </p>
                  </div>
                </div>
                
                {/* Sources / Notes */}
                {selectedDoa.tentang && (
                  <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                    <h4 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                      Sumber & Keterangan
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed whitespace-pre-wrap bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-xl border border-yellow-200 dark:border-yellow-900/30">
                      {selectedDoa.tentang}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
