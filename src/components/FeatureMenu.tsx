import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, HeartHandshake } from 'lucide-react';

export const FeatureMenu: React.FC = () => {
  const features = [
    {
      name: "Baca Al-Qur'an",
      desc: "Baca dan dengarkan 114 Surah",
      path: "/quran",
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-teal-500 to-emerald-400"
    },
    {
      name: "Jadwal Shalat",
      desc: "Waktu shalat akurat sesuai lokasi",
      path: "/shalat",
      icon: <Clock className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-400"
    },
    {
      name: "Doa Harian",
      desc: "Kumpulan doa sehari-hari",
      path: "/doa",
      icon: <HeartHandshake className="w-8 h-8" />,
      color: "from-purple-500 to-pink-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
      {features.map((feature) => (
        <Link 
          key={feature.name} 
          to={feature.path}
          className="glass rounded-2xl p-6 flex items-center gap-5 group relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-primary/20"
        >
          {/* Subtle background glow on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500`}></div>
          <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-500 rounded-full -translate-y-10 translate-x-10`}></div>
          
          {/* Icon Container */}
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 relative z-10`}>
            {feature.icon}
          </div>
          
          {/* Text Content */}
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-accent-primary transition-colors mb-1">
              {feature.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {feature.desc}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
