import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const VERSES = [
  {
    surah: "Al-Imran",
    ayah: "103",
    arab: "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا",
    latin: "Dan berpegang teguhlah kamu semuanya pada tali (agama) Allah, dan janganlah kamu bercerai berai..."
  },
  {
    surah: "Al-Baqarah",
    ayah: "286",
    arab: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    latin: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya."
  },
  {
    surah: "Ar-Rahman",
    ayah: "13",
    arab: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ",
    latin: "Maka nikmat Tuhan kamu yang manakah yang kamu dustakan?"
  }
];

export const DailyVerse: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextVerse = () => {
    setCurrentIndex((prev) => (prev + 1) % VERSES.length);
  };

  const prevVerse = () => {
    setCurrentIndex((prev) => (prev - 1 + VERSES.length) % VERSES.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextVerse();
    }, 10000); // Auto-slide every 10 seconds
    return () => clearInterval(timer);
  }, []);

  const current = VERSES[currentIndex];

  return (
    <div className="relative overflow-hidden rounded-2xl p-8 mb-12 shadow-xl dark:shadow-2xl group">
      {/* Background Gradient & Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/90 via-white to-blue-50/80 dark:from-slate-800/80 dark:via-slate-900 dark:to-slate-900 z-0 transition-colors duration-500"></div>
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-accent-primary/20 dark:bg-accent-primary/10 blur-3xl group-hover:bg-accent-primary/30 dark:group-hover:bg-accent-primary/20 transition-all duration-700"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-teal-500/20 dark:bg-teal-500/10 blur-3xl group-hover:bg-teal-500/30 dark:group-hover:bg-teal-500/20 transition-all duration-700"></div>
      <div className="absolute inset-0 glass backdrop-blur-sm bg-transparent border-white/40 dark:border-white/5 z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* Nav Button Left */}
        <button onClick={prevVerse} className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/50 dark:bg-slate-800/50 text-slate-400 hover:text-accent-primary opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-20">
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex-1 md:px-10 transition-opacity duration-500" key={currentIndex}>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-semibold tracking-wider text-accent-primary dark:text-accent-primary uppercase bg-accent-primary/10 rounded-full border border-accent-primary/20">
              Ayat Pilihan
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">Surah {current.surah} | Ayat {current.ayah}</span>
          </div>
          
          <p className="text-3xl md:text-4xl font-arabic text-slate-800 dark:text-white mb-6 leading-relaxed text-right md:text-left text-glow-primary transition-colors" dir="rtl">
            {current.arab}
          </p>
          
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl transition-colors">
            "{current.latin}"
          </p>
        </div>
        
        {/* Nav Button Right */}
        <button onClick={nextVerse} className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/50 dark:bg-slate-800/50 text-slate-400 hover:text-accent-primary opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-20">
          <ChevronRight className="w-6 h-6" />
        </button>

      </div>
      
      {/* Pagination dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {VERSES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={clsx(
              "h-1.5 rounded-full transition-all duration-300",
              idx === currentIndex ? "w-6 bg-accent-primary" : "w-1.5 bg-slate-300 dark:bg-slate-600 hover:bg-accent-primary/50"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
