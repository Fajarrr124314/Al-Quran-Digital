import React from 'react';
import { DailyVerse } from '../components/DailyVerse';
import { FeatureMenu } from '../components/FeatureMenu';
import { LastReadCard } from '../components/LastReadCard';
import { PrayerCountdown } from '../components/PrayerCountdown';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-12 relative pt-10">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-accent-primary/20 via-blue-500/10 to-purple-500/20 blur-[100px] -z-10 rounded-full animate-pulse-slow"></div>

        <div className="inline-block mb-6 px-5 py-2 rounded-full bg-gradient-to-r from-accent-primary/10 to-blue-500/10 border border-accent-primary/20 backdrop-blur-sm">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-blue-500 font-bold tracking-widest text-sm uppercase">
            Bismillahir-rahmanir-rahim
          </span>
        </div>
        
        {/* Prayer Countdown Widget */}
        <PrayerCountdown />
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          <span className="text-slate-800 dark:text-white transition-colors">Tenangkan Hati dengan</span> <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-accent-primary to-blue-500 animate-gradient-x">
            Lantunan Ayat Suci
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed transition-colors max-w-3xl mx-auto">
          Jelajahi keindahan Al-Qur'an melalui platform digital interaktif. Dirancang dengan sepenuh hati untuk memberikan pengalaman membaca yang damai dan khusyuk.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/quran"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-accent-primary to-teal-500 text-white font-semibold text-lg shadow-lg shadow-accent-primary/30 hover:shadow-xl hover:shadow-accent-primary/40 hover:-translate-y-1 transition-all duration-300"
          >
            <BookOpen className="w-5 h-5" />
            Mulai Membaca
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <LastReadCard />
      </div>

      <FeatureMenu />
      
      <div className="mt-8 mb-20">
        <DailyVerse />
      </div>

      {/* Value Proposition / Keutamaan */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-3">Keutamaan Membaca Al-Qur'an</h2>
          <p className="text-slate-600 dark:text-slate-400">Jadikan setiap huruf yang dibaca sebagai ladang pahala dan ketenangan jiwa.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-2xl p-8 border-t-4 border-t-teal-400">
            <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Pahala Berlipat</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">"Barangsiapa membaca satu huruf dari Kitabullah (Al-Qur'an), maka baginya satu pahala kebaikan..." (HR. Tirmidzi)</p>
          </div>
          
          <div className="glass rounded-2xl p-8 border-t-4 border-t-accent-primary">
            <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Ketenangan Hati</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">"Ingatlah, hanya dengan mengingati Allah-lah hati menjadi tenteram." (Ar-Ra'd: 28)</p>
          </div>
          
          <div className="glass rounded-2xl p-8 border-t-4 border-t-blue-400">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Syafaat di Hari Kiamat</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">"Bacalah Al-Qur'an, karena sesungguhnya ia akan datang pada hari kiamat memberi syafaat..." (HR. Muslim)</p>
          </div>
        </div>
      </div>
      
      {/* Standar & Validitas Section */}
      <div className="mb-20 glass rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-primary/10 blur-3xl rounded-full"></div>
        
        <div className="w-20 h-20 md:w-32 md:h-32 flex-shrink-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20 rotate-3 z-10">
          <svg className="w-10 h-10 md:w-16 md:h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        
        <div className="relative z-10 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-3">Sumber Data Terpercaya</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Aplikasi ini memadukan layanan API Public terpercaya: <strong>equran.id</strong> (Terjemahan Kemenag RI & Latin), <strong>Quran.com</strong> (Teks Utsmani, Tajwid, & Audio Qari Internasional), serta <strong>myquran.com</strong> (Jadwal Shalat akurat). Seluruh data bersumber dari basis data yang telah tervalidasi, sehingga Anda dapat beribadah dengan tenang dan nyaman.
          </p>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"></div>
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.4)_0%,transparent_70%)]"></div>
        
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-white mb-6">Mulai Perjalanan Spiritual Anda</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Tingkatkan kualitas ibadah dengan membaca dan mendengarkan lantunan ayat suci setiap hari tanpa batas.</p>
          <Link 
            to="/quran"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-accent-primary to-teal-400 text-white font-bold text-lg hover:scale-105 hover:shadow-[0_0_40px_rgba(20,184,166,0.5)] transition-all duration-300"
          >
            Baca Al-Qur'an Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
};
