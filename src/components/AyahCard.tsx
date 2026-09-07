import React from 'react';
import { Play, Pause, Bookmark, Share2, Settings2, X } from 'lucide-react';
import clsx from 'clsx';

const RECITERS = [
  { id: 7, name: 'Mishary Rashid Alafasy' },
  { id: 2, name: 'AbdulBaset AbdulSamad' },
  { id: 3, name: 'Abdur-Rahman as-Sudais' },
  { id: 4, name: 'Abu Bakr al-Shatri' },
  { id: 5, name: 'Hani ar-Rifai' },
];

interface AyahCardProps {
  verseNumber: number;
  textUthmani: string;
  textUthmaniTajweed: string;
  latinText?: string;
  translationIdn: string;
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void;
  showTajweed?: boolean;
  showLatin?: boolean;
  showTranslation?: boolean;
  
  // Audio controls
  isPlaying?: boolean;
  onPlayToggle?: () => void;
  hasAudio?: boolean;

  // Settings & Navigation
  totalVerses?: number;
  onToggleTajweed?: () => void;
  onToggleLatin?: () => void;
  onToggleTranslation?: () => void;
  selectedReciter?: number;
  onReciterChange?: (id: number) => void;
}

export const AyahCard = React.memo<AyahCardProps>(({
  verseNumber,
  textUthmani,
  textUthmaniTajweed,
  latinText,
  translationIdn,
  isBookmarked = false,
  onBookmarkToggle,
  showTajweed = true,
  showLatin = true,
  showTranslation = true,
  isPlaying = false,
  onPlayToggle,
  hasAudio = true,
  totalVerses,
  onToggleTajweed,
  onToggleLatin,
  onToggleTranslation,
  selectedReciter,
  onReciterChange
}) => {
  const [showSettings, setShowSettings] = React.useState(false);

  const handleShare = async () => {
    // Strip HTML tags from tajweed for sharing
    const cleanText = textUthmaniTajweed.replace(/<[^>]*>?/gm, '');
    const cleanTrans = translationIdn.replace(/<[^>]*>?/gm, '');
    const shareText = `"${cleanText}"\n\n"${cleanTrans}"\n\n(Ayat ${verseNumber})`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ayat Al-Quran',
          text: shareText,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Ayat disalin ke clipboard!');
    }
  };

  return (
    <div 
      id={`ayah-${verseNumber}`} 
      onClick={() => {
        // Don't trigger if user is just selecting text
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) return;
        if (onPlayToggle) onPlayToggle();
      }}
      className={clsx(
        "glass rounded-xl p-6 md:p-8 mb-6 relative group transition-all duration-300 cursor-pointer",
        showSettings ? "z-50" : "z-10",
        isPlaying 
          ? "ring-2 ring-accent-primary dark:ring-white shadow-xl bg-slate-50/80 dark:bg-slate-800/80 md:scale-[1.02] border-transparent" 
          : "border border-slate-200/50 dark:border-slate-700/50 hover:border-accent-primary/30"
      )}
    >
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        
        {/* Left Side: Number and Actions */}
        <div className="flex md:flex-col items-center gap-4 w-full md:w-auto border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700/50 pb-4 md:pb-0 md:pr-6">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center relative shadow-inner">
            <span className="text-lg font-bold text-slate-700 dark:text-slate-300 relative z-10 group-hover:text-accent-primary transition-colors">{verseNumber}</span>
            <div className="absolute inset-0 rounded-full border border-accent-primary/0 group-hover:border-accent-primary/50 scale-110 group-hover:scale-100 transition-all duration-300"></div>
          </div>
          
          <div className="flex md:flex-col gap-2 ml-auto md:ml-0">
            {hasAudio && (
              <button 
                onClick={(e) => { e.stopPropagation(); if(onPlayToggle) onPlayToggle(); }}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 hover:bg-accent-primary/10 text-slate-500 dark:text-slate-400 hover:text-accent-primary dark:hover:text-accent-primary border border-transparent hover:border-accent-primary/20 transition-all"
                title={isPlaying ? "Pause Audio" : "Play Audio"}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
            )}
            <button 
              onClick={(e) => { e.stopPropagation(); if(onBookmarkToggle) onBookmarkToggle(); }}
              className={clsx(
                "p-2.5 rounded-xl border transition-all",
                isBookmarked 
                  ? "bg-accent-primary/10 border-accent-primary/50 text-accent-primary" 
                  : "bg-slate-100 dark:bg-slate-800/50 border-transparent hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
              )}
              title="Tandai Ayat"
            >
              <Bookmark className={clsx("w-5 h-5", isBookmarked && "fill-current")} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleShare(); }}
              title="Bagikan Ayat"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white border border-transparent hover:border-slate-300 dark:hover:border-slate-600 transition-all"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="flex-1 w-full min-w-0">
          <div className={clsx("mb-8", showTajweed && "tajweed-container")}>
            {showTajweed ? (
              <div 
                className="text-3xl md:text-4xl lg:text-5xl font-arabic text-slate-900 dark:text-white leading-loose md:leading-loose lg:leading-[1.8] text-right break-words transition-colors" 
                dir="rtl"
                dangerouslySetInnerHTML={{ __html: textUthmaniTajweed }}
              />
            ) : (
              <div 
                className="text-3xl md:text-4xl lg:text-5xl font-arabic text-slate-900 dark:text-white leading-loose md:leading-loose lg:leading-[1.8] text-right break-words transition-colors" 
                dir="rtl"
              >
                {textUthmani}
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            {showLatin && latinText && (
              <p className="text-accent-primary dark:text-accent-gold/90 text-sm md:text-base italic font-medium leading-relaxed transition-colors">
                {latinText}
              </p>
            )}
            {showTranslation && (
              <div 
                className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed transition-colors prose-p:my-1 prose-sup:text-xs prose-sup:text-accent-primary"
                dangerouslySetInnerHTML={{ __html: translationIdn }}
              />
            )}
          </div>
          
          {/* Settings & Jump Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800" onClick={(e) => e.stopPropagation()}>
            {/* Jump Dropdown */}
            {totalVerses && (
              <div className="inline-flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-1.5 shadow-sm transition-all hover:bg-slate-100 dark:hover:bg-slate-700">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Loncat:</span>
                <select
                  className="bg-transparent border-none text-accent-primary font-bold focus:ring-0 cursor-pointer outline-none text-xs appearance-none pr-1"
                  onChange={(e) => {
                    const ayahId = `ayah-${e.target.value}`;
                    const el = document.getElementById(ayahId);
                    if (el) {
                      const yOffset = -120; // Offset for sticky navbar
                      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                      e.target.value = ""; // Reset after jumping
                    }
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>Pilih Ayat...</option>
                  {Array.from({ length: totalVerses }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>
                      Ayat {num}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Settings Button */}
            <div>
              <button 
                onClick={(e) => { e.stopPropagation(); setShowSettings(true); }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all shadow-sm text-xs font-medium"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>Pengaturan</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={(e) => e.stopPropagation()}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setShowSettings(false)}></div>
          
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-2xl relative z-10 p-5 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200 text-left">
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="text-base font-bold text-slate-800 dark:text-white">Pengaturan Tampilan</h4>
              <button 
                onClick={() => setShowSettings(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-accent-primary transition-colors">Tajwid Berwarna</span>
                  <input type="checkbox" checked={showTajweed} onChange={onToggleTajweed} className="w-5 h-5 rounded text-accent-primary focus:ring-accent-primary" />
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-accent-primary transition-colors">Teks Latin</span>
                  <input type="checkbox" checked={showLatin} onChange={onToggleLatin} className="w-5 h-5 rounded text-accent-primary focus:ring-accent-primary" />
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-accent-primary transition-colors">Terjemahan</span>
                  <input type="checkbox" checked={showTranslation} onChange={onToggleTranslation} className="w-5 h-5 rounded text-accent-primary focus:ring-accent-primary" />
                </label>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Audio Qari</h5>
                <select 
                  value={selectedReciter} 
                  onChange={(e) => onReciterChange?.(parseInt(e.target.value, 10))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-xl focus:ring-accent-primary focus:border-accent-primary block p-3"
                >
                  {RECITERS.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}, (prev, next) => {
  // Custom equality check for React.memo to prevent re-rendering all 300 cards when parent state changes.
  // We ignore function props since they are inline in SurahDetail.tsx and change every render.
  return (
    prev.verseNumber === next.verseNumber &&
    prev.isPlaying === next.isPlaying &&
    prev.isBookmarked === next.isBookmarked &&
    prev.showTajweed === next.showTajweed &&
    prev.showLatin === next.showLatin &&
    prev.showTranslation === next.showTranslation &&
    prev.selectedReciter === next.selectedReciter
  );
});
