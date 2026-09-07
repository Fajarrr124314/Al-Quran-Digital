import React, { useState, useEffect } from 'react';
import { fetchJadwalShalat, type JadwalShalat } from '../services/api';
import { Moon, Sun, Sunrise, Sunset } from 'lucide-react';

export const PrayerCountdown: React.FC = () => {
  const [jadwal, setJadwal] = useState<JadwalShalat | null>(null);
  const [nextPrayer, setNextPrayer] = useState<{ name: string, time: string, icon: any } | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('--:--:--');

  useEffect(() => {
    const loadJadwal = async () => {
      try {
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        // Gunakan Jakarta (1301) sebagai default jika tidak ada di localStorage
        const data = await fetchJadwalShalat('1301', year, month, day);
        setJadwal(data);
      } catch (error) {
        console.error("Failed to fetch jadwal for countdown", error);
      }
    };
    loadJadwal();
  }, []);

  useEffect(() => {
    if (!jadwal) return;

    const calculateCountdown = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentSeconds = now.getSeconds();
      const currentTimeStr = `${currentHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')}`;

      const times = [
        { name: 'Subuh', time: jadwal.subuh, icon: Sunrise },
        { name: 'Dhuha', time: jadwal.dhuha, icon: Sun },
        { name: 'Dzuhur', time: jadwal.dzuhur, icon: Sun },
        { name: 'Ashar', time: jadwal.ashar, icon: Sun },
        { name: 'Maghrib', time: jadwal.maghrib, icon: Sunset },
        { name: 'Isya', time: jadwal.isya, icon: Moon },
      ];

      let targetPrayer = null;
      for (const t of times) {
        if (`${t.time}:00` > currentTimeStr) {
          targetPrayer = t;
          break;
        }
      }

      if (!targetPrayer) {
        // Jika sudah melewati isya, arahkan ke subuh hari esok (disederhanakan)
        setNextPrayer({ name: 'Subuh (Esok)', time: jadwal.subuh, icon: Sunrise });
        setTimeLeft('Menunggu esok');
        return;
      }

      setNextPrayer(targetPrayer);

      // Hitung selisih waktu
      const [targetH, targetM] = targetPrayer.time.split(':').map(Number);
      const targetDate = new Date();
      targetDate.setHours(targetH, targetM, 0, 0);

      const diffMs = targetDate.getTime() - now.getTime();
      if (diffMs <= 0) {
        setTimeLeft('00:00:00');
        return;
      }

      const h = Math.floor(diffMs / (1000 * 60 * 60));
      const m = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeLeft(
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      );
    };

    calculateCountdown();
    const intervalId = setInterval(calculateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [jadwal]);

  if (!nextPrayer || !jadwal) return null;

  const Icon = nextPrayer.icon;

  return (
    <div className="flex justify-center w-full mb-8 relative z-20">
      <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 backdrop-blur-md shadow-lg shadow-slate-200/20 dark:shadow-none">
        
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-primary/10 text-accent-primary">
          <Icon className="w-5 h-5 animate-pulse-slow" />
        </div>
        
        <div className="flex flex-col text-left">
          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            Menuju {nextPrayer.name}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-800 dark:text-white tabular-nums tracking-tight">
              {timeLeft}
            </span>
            <span className="text-xs font-semibold text-accent-primary">
              {nextPrayer.time}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
