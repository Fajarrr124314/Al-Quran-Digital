import React, { forwardRef } from 'react';
import type { DoaItem } from '../services/api';
import { BookOpen } from 'lucide-react';

interface DoaFlyerProps {
  doa: DoaItem | null;
}

export const DoaFlyer = forwardRef<HTMLDivElement, DoaFlyerProps>(({ doa }, ref) => {
  if (!doa) return null;

  return (
    <div
      ref={ref}
      className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-16 flex flex-col justify-between relative overflow-hidden"
      style={{
        width: '1080px',
        minHeight: '1080px',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/30 rounded-full blur-[100px] -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/30 rounded-full blur-[100px] -ml-20 -mb-20"></div>
      
      {/* Header */}
      <div className="flex items-center gap-6 mb-16 relative z-10">
        <div className="w-20 h-20 bg-gradient-to-br from-accent-primary to-teal-400 rounded-3xl flex items-center justify-center shadow-2xl">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight">Al-Qur'an Digital</h2>
          <p className="text-accent-primary text-2xl font-bold mt-1 tracking-wide">Kumpulan Doa Harian</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center space-y-12 relative z-10 my-8">
        <div className="inline-block px-8 py-3 rounded-full bg-white/10 text-2xl font-bold border border-white/20 self-start text-accent-primary backdrop-blur-md">
          {doa.grup || "Doa Harian"}
        </div>
        
        <h1 className="text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
          {doa.nama}
        </h1>

        <div className="bg-slate-900/40 backdrop-blur-xl p-12 rounded-[2rem] border border-white/10 shadow-2xl">
          <p 
            className="font-arabic text-right text-white leading-[2.5]" 
            style={{ fontSize: doa.ar.length > 200 ? '48px' : '64px' }}
            dir="rtl"
          >
            {doa.ar}
          </p>
        </div>

        <div className="space-y-8 bg-slate-900/20 p-10 rounded-3xl border border-white/5 backdrop-blur-sm">
          <p className="text-3xl font-medium text-accent-primary italic leading-relaxed">
            "{doa.tr}"
          </p>
          <div className="w-16 h-1 bg-white/20 rounded-full"></div>
          <p className="text-3xl text-slate-200 leading-relaxed font-light drop-shadow-sm">
            {doa.idn}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-12 border-t border-white/10 flex justify-between items-end relative z-10 mt-16">
        <div>
          <p className="text-slate-400 text-xl font-medium">Bagikan kebaikan, sebarkan manfaat</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-teal-400">#AlQuranDigital</p>
        </div>
      </div>
    </div>
  );
});

DoaFlyer.displayName = 'DoaFlyer';
