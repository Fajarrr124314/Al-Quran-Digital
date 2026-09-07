import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, List } from 'lucide-react';
import { getSurahDetail } from '../services/api';
import type { SurahDetail as SurahDetailType } from '../services/api';
import { AyahCard } from '../components/AyahCard';

export const SurahDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [surah, setSurah] = useState<SurahDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Last read feature
  const [lastReadAyah, setLastReadAyah] = useState<number | null>(null);

  // Settings state
  const [showTajweed, setShowTajweed] = useState(true);
  const [showLatin, setShowLatin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  
  const [selectedReciter, setSelectedReciter] = useState<number>(() => {
    const saved = localStorage.getItem('selectedReciter');
    return saved ? parseInt(saved, 10) : 7;
  });

  // Audio Playback state
  const [playingAyahNumber, setPlayingAyahNumber] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play audio when playingAyahNumber changes
  useEffect(() => {
    if (playingAyahNumber !== null && audioRef.current && surah) {
      
      // Auto-scroll to the playing verse
      const el = document.getElementById(`ayah-${playingAyahNumber}`);
      if (el) {
        const yOffset = -120;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }

      const ayah = surah.ayat.find(a => a.verse_number === playingAyahNumber);
      if (ayah?.audio?.url) {
        const fullUrl = ayah.audio.url.startsWith('http') ? ayah.audio.url : `https://verses.quran.com/${ayah.audio.url}`;
        audioRef.current.src = fullUrl;
        audioRef.current.play().catch(e => console.error("Audio playback error:", e));
      } else {
        // Skip if no audio
        handleAudioEnded();
      }
    } else if (playingAyahNumber === null && audioRef.current) {
      audioRef.current.pause();
    }
  }, [playingAyahNumber, surah]);

  const handleAudioEnded = () => {
    if (!surah) return;
    if (playingAyahNumber !== null && playingAyahNumber < surah.verses_count) {
      setPlayingAyahNumber(playingAyahNumber + 1);
    } else {
      setPlayingAyahNumber(null);
    }
  };

  const handlePlayToggle = (ayahNumber: number) => {
    if (playingAyahNumber === ayahNumber) {
      // Pause
      setPlayingAyahNumber(null);
    } else {
      // Play
      setPlayingAyahNumber(ayahNumber);
    }
  };

  useEffect(() => {
    const fetchSurahDetail = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      setPlayingAyahNumber(null); // Reset audio on surah/reciter change
      
      try {
        const data = await getSurahDetail(parseInt(id, 10), selectedReciter);
        setSurah(data);
        
        // Check local storage for last read in this surah
        const saved = localStorage.getItem(`lastRead_${id}`);
        if (saved) {
          setLastReadAyah(parseInt(saved, 10));
        }
      } catch (err) {
        setError('Failed to load Surah details.');
      } finally {
        setLoading(false);
      }
    };

    fetchSurahDetail();
  }, [id, selectedReciter]);

  const handleBookmark = (ayahNumber: number) => {
    if (!id) return;
    const key = `lastRead_${id}`;
    if (lastReadAyah === ayahNumber) {
      localStorage.removeItem(key);
      setLastReadAyah(null);
    } else {
      localStorage.setItem(key, ayahNumber.toString());
      setLastReadAyah(ayahNumber);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-accent-primary/30 border-t-accent-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !surah) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="bg-red-100/50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/20 rounded-xl p-6 text-red-500 dark:text-red-400 mb-6">
          <p>{error || 'Surah tidak ditemukan'}</p>
        </div>
        <Link to="/" className="text-accent-primary hover:underline">Kembali ke Beranda</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="glass rounded-2xl p-8 mb-10 text-center relative group z-20">
        {/* Background layer with overflow-hidden for rounded corners */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-white dark:from-slate-800/80 dark:to-slate-900/80 transition-colors duration-500"></div>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-accent-primary/10 dark:bg-accent-primary/5 blur-3xl group-hover:bg-accent-primary/20 dark:group-hover:bg-accent-primary/10 transition-all duration-700"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-2 tracking-tight transition-colors">{surah.name_simple}</h1>
          <p className="text-xl font-arabic text-accent-primary mb-4">{surah.name_arabic}</p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-slate-600 dark:text-slate-300 font-medium uppercase tracking-wider mb-6 transition-colors">
            <span className="px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50">{surah.revelation_place}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
            <span className="px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50">{surah.verses_count} Ayat</span>
          </div>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent my-6 transition-colors"></div>
          
          {/* Bismillah */}
          {surah.bismillah_pre && (
            <p className="font-arabic text-3xl text-slate-800 dark:text-white text-glow-primary transition-colors">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          )}
        </div>
      </div>
      
      {/* Global Audio Player */}
      <audio ref={audioRef} onEnded={handleAudioEnded} className="hidden" />

      {/* Verses List */}
      <div className="space-y-6">
        {surah.ayat.map((ayah) => {
          const translationIdn = ayah.translations[0]?.text || "Terjemahan tidak tersedia";

          return (
            <AyahCard
              key={ayah.id}
              verseNumber={ayah.verse_number}
              textUthmani={ayah.text_uthmani}
              textUthmaniTajweed={ayah.text_uthmani_tajweed || ayah.text_uthmani}
              latinText={ayah.teksLatin}
              translationIdn={translationIdn}
              isBookmarked={lastReadAyah === ayah.verse_number}
              onBookmarkToggle={() => handleBookmark(ayah.verse_number)}
              showTajweed={showTajweed}
              showLatin={showLatin}
              showTranslation={showTranslation}
              isPlaying={playingAyahNumber === ayah.verse_number}
              onPlayToggle={() => handlePlayToggle(ayah.verse_number)}
              hasAudio={!!ayah.audio?.url}
              totalVerses={surah.verses_count}
              onToggleTajweed={() => setShowTajweed(!showTajweed)}
              onToggleLatin={() => setShowLatin(!showLatin)}
              onToggleTranslation={() => setShowTranslation(!showTranslation)}
              selectedReciter={selectedReciter}
              onReciterChange={(id) => {
                setSelectedReciter(id);
                localStorage.setItem('selectedReciter', id.toString());
              }}
            />
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="mt-12 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-8 transition-colors">
        {surah.id > 1 ? (
          <Link to={`/surah/${surah.id - 1}`} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Sebelumnya</p>
              <p className="font-medium">Surah ke-{surah.id - 1}</p>
            </div>
          </Link>
        ) : (
          <div></div>
        )}

        <Link to="/quran" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all font-medium text-sm shadow-sm">
          <List className="w-4 h-4" />
          <span className="hidden sm:inline">Daftar Surah</span>
        </Link>

        {surah.id < 114 ? (
          <Link to={`/surah/${surah.id + 1}`} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors group">
            <div className="text-right">
              <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Selanjutnya</p>
              <p className="font-medium">Surah ke-{surah.id + 1}</p>
            </div>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
