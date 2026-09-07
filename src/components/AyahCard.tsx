import React from 'react';
import { Play, Pause, Bookmark, Share2 } from 'lucide-react';
import clsx from 'clsx';

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
}

export const AyahCard: React.FC<AyahCardProps> = ({
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
  hasAudio = true
}) => {
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
    <div id={`ayah-${verseNumber}`} className="glass rounded-xl p-6 md:p-8 mb-6 relative group transition-all duration-300 hover:border-accent-primary/30">
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
                onClick={onPlayToggle}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 hover:bg-accent-primary/10 text-slate-500 dark:text-slate-400 hover:text-accent-primary dark:hover:text-accent-primary border border-transparent hover:border-accent-primary/20 transition-all"
                title={isPlaying ? "Pause Audio" : "Play Audio"}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
            )}
            <button 
              onClick={onBookmarkToggle}
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
              onClick={handleShare}
              title="Bagikan Ayat"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white border border-transparent hover:border-slate-300 dark:hover:border-slate-600 transition-all"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="flex-1 w-full overflow-hidden">
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
        </div>
      </div>
    </div>
  );
};
