import React, { useState, useEffect } from 'react';
import { fetchKotaList, fetchJadwalShalat, type KotaItem, type JadwalShalat } from '../services/api';
import { Compass, Loader2, MapPin, Calendar, Clock, Sunrise, Sun, Sunset, Moon, Search, X, ChevronDown } from 'lucide-react';
import { PrayerCountdown } from '../components/PrayerCountdown';

const BULAN_LIST = [
  { value: '01', label: 'Januari' }, { value: '02', label: 'Februari' },
  { value: '03', label: 'Maret' }, { value: '04', label: 'April' },
  { value: '05', label: 'Mei' }, { value: '06', label: 'Juni' },
  { value: '07', label: 'Juli' }, { value: '08', label: 'Agustus' },
  { value: '09', label: 'September' }, { value: '10', label: 'Oktober' },
  { value: '11', label: 'November' }, { value: '12', label: 'Desember' }
];

export const ShalatPage: React.FC = () => {
  const [kotaList, setKotaList] = useState<KotaItem[]>([]);
  const [selectedKota, setSelectedKota] = useState<string>('1301'); // Default Jakarta
  
  const currentDate = new Date();
  const [selectedTahun] = useState<string>(currentDate.getFullYear().toString());
  const [selectedBulan, setSelectedBulan] = useState<string>((currentDate.getMonth() + 1).toString().padStart(2, '0'));
  const [selectedTanggal, setSelectedTanggal] = useState<string>(currentDate.getDate().toString().padStart(2, '0'));

  const [jadwal, setJadwal] = useState<JadwalShalat | null>(null);
  // Removed unused loading state
  const [jadwalLoading, setJadwalLoading] = useState(true);

  // Modal & Search State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Load Kota List
  useEffect(() => {
    const loadKota = async () => {
      try {
        const data = await fetchKotaList();
        setKotaList(data);
      } catch (error) {
        console.error("Failed to fetch kota", error);
      }
    };
    loadKota();
  }, []);

  // Load Jadwal when filters change
  useEffect(() => {
    const loadJadwal = async () => {
      setJadwalLoading(true);
      try {
        const data = await fetchJadwalShalat(selectedKota, selectedTahun, selectedBulan, selectedTanggal);
        setJadwal(data);
      } catch (error) {
        console.error("Failed to fetch jadwal", error);
      } finally {
        setJadwalLoading(false);
      }
    };
    if (selectedKota && selectedBulan && selectedTanggal) {
      loadJadwal();
    }
  }, [selectedKota, selectedTahun, selectedBulan, selectedTanggal]);

  // Determine active prayer (only if viewing today's schedule)
  const isToday = () => {
    const now = new Date();
    return selectedTahun === now.getFullYear().toString() &&
           selectedBulan === (now.getMonth() + 1).toString().padStart(2, '0') &&
           selectedTanggal === now.getDate().toString().padStart(2, '0');
  };

  const getNextPrayer = () => {
    if (!jadwal || !isToday()) return null;
    
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const times = [
      { id: 'imsak', time: jadwal.imsak },
      { id: 'subuh', time: jadwal.subuh },
      { id: 'dhuha', time: jadwal.dhuha },
      { id: 'dzuhur', time: jadwal.dzuhur },
      { id: 'ashar', time: jadwal.ashar },
      { id: 'maghrib', time: jadwal.maghrib },
      { id: 'isya', time: jadwal.isya },
    ];
    
    for (const t of times) {
      if (currentTime < t.time) return t.id;
    }
    return null;
  };

  const activePrayer = getNextPrayer();

  const WaktuCard = ({ title, time, icon: Icon, isActive }: { title: string, time: string, icon: any, isActive?: boolean }) => (
    <div className={`group relative overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
      isActive 
        ? 'bg-gradient-to-br from-accent-primary to-teal-600 shadow-accent-primary/30 text-white shadow-lg' 
        : 'glass glass-hover border border-slate-200/50 dark:border-slate-700/50'
    }`}>
      {/* Decorative Background Icon */}
      <Icon className={`absolute -right-4 -bottom-4 w-32 h-32 transform -rotate-12 transition-transform duration-500 group-hover:scale-110 ${
        isActive ? 'text-white opacity-10' : 'text-slate-300 dark:text-slate-600 opacity-10'
      }`} />
      
      <div className="relative z-10 flex flex-col items-start text-left">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm backdrop-blur-md transition-colors ${
          isActive 
            ? 'bg-white/20 text-white border border-white/30' 
            : 'bg-white dark:bg-slate-800 text-accent-primary border border-slate-100 dark:border-slate-700'
        }`}>
          <Icon className="w-6 h-6" />
        </div>
        
        <h3 className={`text-xs font-bold uppercase tracking-widest mb-1 ${
          isActive ? 'text-teal-100' : 'text-slate-400 dark:text-slate-500'
        }`}>{title}</h3>
        
        <div className="flex items-end gap-2">
          <p className={`text-4xl font-black tracking-tight ${
            isActive ? 'text-white' : 'text-slate-800 dark:text-white'
          }`}>{time}</p>
        </div>

        {isActive && (
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-sm border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            Waktu Berikutnya
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="text-center mb-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full -z-10"></div>
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center text-white shadow-xl mb-6 rotate-3">
          <Compass className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">Jadwal Shalat</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Tingkatkan kedisiplinan ibadah dengan jadwal shalat yang akurat sesuai standar Kementerian Agama RI.
        </p>
      </div>

      {/* Tampilkan Hitung Mundur hanya jika melihat hari ini */}
      {isToday() && jadwal && (
        <div className="-mt-8 mb-8">
          <PrayerCountdown customJadwal={jadwal} />
        </div>
      )}

      {/* Filters: 3 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16 relative z-10">
        
        {/* Card 1: Lokasi */}
        <div 
          className="glass p-5 rounded-2xl flex flex-col justify-center cursor-pointer group glass-hover transition-all" 
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex items-center gap-3 mb-3">
             <MapPin className="w-5 h-5 text-accent-primary" />
             <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Pilih Kabupaten/Kota</span>
          </div>
          <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 text-sm">
             <span className="truncate">{kotaList.find(k => k.id === selectedKota)?.lokasi || 'Pilih Kota'}</span>
             <ChevronDown className="w-4 h-4 group-hover:text-accent-primary transition-colors" />
          </div>
        </div>

        {/* Card 2: Bulan */}
        <div className="glass p-5 rounded-2xl flex flex-col justify-center relative hover:border-accent-primary/40 transition-colors">
          <div className="flex items-center gap-3 mb-3">
             <Calendar className="w-5 h-5 text-accent-primary" />
             <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Pilih Bulan</span>
          </div>
          <select
            value={selectedBulan}
            onChange={(e) => setSelectedBulan(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 p-0 text-slate-500 dark:text-slate-400 text-sm cursor-pointer appearance-none z-10 relative"
          >
            {BULAN_LIST.map(b => (
               <option key={b.value} value={b.value} className="text-slate-800">{b.label}</option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 absolute right-5 bottom-5 pointer-events-none text-slate-400 z-0" />
        </div>

        {/* Card 3: Tanggal */}
        <div className="glass p-5 rounded-2xl flex flex-col justify-center relative hover:border-accent-primary/40 transition-colors">
          <div className="flex items-center gap-3 mb-3">
             <Clock className="w-5 h-5 text-accent-primary" />
             <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Pilih Tanggal</span>
          </div>
          <select
            value={selectedTanggal}
            onChange={(e) => setSelectedTanggal(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 p-0 text-slate-500 dark:text-slate-400 text-sm cursor-pointer appearance-none z-10 relative"
          >
            {Array.from({ length: 31 }, (_, i) => {
              const val = (i + 1).toString().padStart(2, '0');
              return <option key={val} value={val} className="text-slate-800">{val}</option>;
            })}
          </select>
          <ChevronDown className="w-4 h-4 absolute right-5 bottom-5 pointer-events-none text-slate-400 z-0" />
        </div>

      </div>

      {/* Jadwal Display */}
      {jadwalLoading || !jadwal ? (
        <div className="flex flex-col items-center justify-center py-20 text-blue-500">
          <Loader2 className="w-12 h-12 animate-spin mb-4" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">Menghitung Jadwal Shalat...</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="text-center flex flex-col items-center gap-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700">
              <Calendar className="w-4 h-4 text-accent-primary" />
              {jadwal.tanggal}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <WaktuCard title="Imsak" time={jadwal.imsak} icon={Moon} isActive={activePrayer === 'imsak'} />
            <WaktuCard title="Subuh" time={jadwal.subuh} icon={Sunrise} isActive={activePrayer === 'subuh'} />
            <WaktuCard title="Dhuha" time={jadwal.dhuha} icon={Sun} isActive={activePrayer === 'dhuha'} />
            <WaktuCard title="Dzuhur" time={jadwal.dzuhur} icon={Sun} isActive={activePrayer === 'dzuhur'} />
            <WaktuCard title="Ashar" time={jadwal.ashar} icon={Sun} isActive={activePrayer === 'ashar'} />
            <WaktuCard title="Maghrib" time={jadwal.maghrib} icon={Sunset} isActive={activePrayer === 'maghrib'} />
            <WaktuCard title="Isya" time={jadwal.isya} icon={Moon} isActive={activePrayer === 'isya'} />
          </div>
        </div>
      )}

      {/* Search Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[80vh] border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
            
            {/* Header & Search */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Pilih Lokasi</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  autoFocus
                  placeholder="Cari nama kota atau kabupaten..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all placeholder:text-slate-400"
                />
              </div>
            </div>
            
            {/* City List */}
            <div className="overflow-y-auto flex-1 p-2">
              {kotaList.filter(k => k.lokasi.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                kotaList
                  .filter(k => k.lokasi.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((kota) => (
                    <button
                      key={kota.id}
                      onClick={() => {
                        setSelectedKota(kota.id);
                        setIsModalOpen(false);
                        setSearchQuery('');
                      }}
                      className={`w-full text-left px-6 py-4 rounded-xl transition-colors flex items-center justify-between group ${
                        selectedKota === kota.id 
                          ? 'bg-accent-primary/10 text-accent-primary' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="font-medium">{kota.lokasi}</span>
                      {selectedKota === kota.id && (
                        <div className="w-2 h-2 rounded-full bg-accent-primary"></div>
                      )}
                    </button>
                  ))
              ) : (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                  <MapPin className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>Kota tidak ditemukan</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
