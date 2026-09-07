import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, Clock, Heart, Info } from 'lucide-react';
import clsx from 'clsx';

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Beranda', icon: Home },
    { path: '/quran', label: 'Qur\'an', icon: BookOpen },
    { path: '/shalat', label: 'Shalat', icon: Clock, isCenter: true },
    { path: '/doa', label: 'Doa', icon: Heart },
    { path: '/tentang', label: 'Tentang', icon: Info }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[150]">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-white/85 dark:bg-slate-950/90 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]"></div>
      
      {/* Navigation Items */}
      <nav className="relative flex items-end justify-around px-2 pb-2 h-[72px]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path === '/' 
            ? location.pathname === '/' 
            : location.pathname.startsWith(item.path);

          if (item.isCenter) {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center justify-end w-16 h-full group pb-1"
              >
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                  <div className={clsx(
                    "w-[64px] h-[64px] rounded-full flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-105 group-active:scale-95 border-[5px] border-white dark:border-slate-900",
                    isActive 
                      ? "bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white shadow-purple-500/40" 
                      : "bg-purple-500 text-white shadow-purple-500/30"
                  )}>
                    <Icon className="w-7 h-7" />
                  </div>
                </div>
                <span className={clsx(
                  "text-[9px] font-medium transition-colors mt-auto",
                  isActive ? "text-purple-600 dark:text-purple-400 font-bold" : "text-slate-500 dark:text-slate-400"
                )}>
                  {item.label}
                </span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-end h-full gap-1.5 w-16 group pb-1"
            >
              <div className={clsx(
                "p-1.5 rounded-xl transition-all duration-300 group-hover:bg-accent-primary/10",
                isActive ? "text-accent-primary" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"
              )}>
                <Icon className={clsx("w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-active:scale-95", isActive && "fill-accent-primary/20")} />
              </div>
              <span className={clsx(
                "text-[9px] font-medium transition-colors",
                isActive ? "text-accent-primary font-bold" : "text-slate-500 dark:text-slate-400"
              )}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
