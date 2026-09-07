import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

// Inline SVG Logo (Outline Style)
const QuranLogo = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-primary flex-shrink-0">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    <path d="M12 7l1.5 2.5L16 10l-2.5 1.5L14 14l-2-1.5L10 14l.5-2.5L8 10l2.5-.5z" strokeWidth="1" />
  </svg>
);

export const Navbar: React.FC = () => {
  const { isDark, toggle } = useDarkMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Beranda' },
    { path: '/quran', label: "Baca Qur'an" },
    { path: '/doa', label: 'Doa Harian' },
    { path: '/shalat', label: 'Jadwal Shalat' },
    { path: '/tentang', label: 'Tentang' }
  ];

  const [activeTabStyle, setActiveTabStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);

  // Sliding pill effect logic
  React.useEffect(() => {
    // Timeout to ensure DOM is fully rendered before measuring
    const timeoutId = setTimeout(() => {
      const activeIndex = navItems.findIndex(item => 
        item.path === '/' 
          ? location.pathname === '/' 
          : location.pathname.startsWith(item.path)
      );
      
      if (activeIndex !== -1 && navRefs.current[activeIndex]) {
        const element = navRefs.current[activeIndex];
        if (element) {
          setActiveTabStyle({
            left: element.offsetLeft,
            width: element.offsetWidth,
            opacity: 1
          });
        }
      } else {
        setActiveTabStyle(prev => ({ ...prev, opacity: 0 }));
      }
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  // Handle Scroll for sticky header
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className={`sticky top-0 z-50 px-4 md:px-8 transition-all duration-300 flex items-center justify-between ${
        isScrolled 
          ? 'py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm' 
          : 'py-5 bg-transparent'
      }`}>
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 group">
          <div className="p-1.5 rounded-xl group-hover:scale-105 transition-transform duration-300">
            <QuranLogo />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white tracking-wide group-hover:text-accent-primary transition-colors">Al-Quran</h1>
            <p className="text-[9px] md:text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-medium">Wahyu Digital</p>
          </div>
        </Link>

        {/* Right: Navigation & Actions */}
        <div className="flex items-center gap-2 md:gap-6">
          
          {/* Desktop Navigation (Sliding Pill) */}
          <div className="hidden md:flex items-center relative p-1 rounded-full bg-slate-100/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/30">
            {/* The Animated Oval Indicator */}
            <div 
              className="absolute h-[calc(100%-8px)] top-1 bg-gradient-to-r from-accent-primary to-teal-500 rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-0 shadow-md shadow-accent-primary/20"
              style={{ left: `${activeTabStyle.left}px`, width: `${activeTabStyle.width}px`, opacity: activeTabStyle.opacity }}
            />
            
            {navItems.map((item, i) => (
              <NavLink 
                key={item.path} 
                to={item.path}
                ref={el => { navRefs.current[i] = el; }}
                className={({isActive}) => `relative z-10 px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          
          {/* Theme Toggle */}
          <button 
            onClick={toggle}
            className="p-2.5 text-slate-600 dark:text-slate-400 hover:text-accent-primary dark:hover:text-accent-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 top-[72px] bg-slate-900/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="absolute top-0 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl px-4 py-6 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200"
            onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the menu
          >
            <NavLink to="/" className={({isActive}) => `px-4 py-3 rounded-xl font-medium ${isActive ? 'bg-accent-primary/10 text-accent-primary' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Beranda</NavLink>
            <NavLink to="/quran" className={({isActive}) => `px-4 py-3 rounded-xl font-medium ${isActive ? 'bg-accent-primary/10 text-accent-primary' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Baca Qur'an</NavLink>
            <NavLink to="/doa" className={({isActive}) => `px-4 py-3 rounded-xl font-medium ${isActive ? 'bg-accent-primary/10 text-accent-primary' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Doa Harian</NavLink>
            <NavLink to="/shalat" className={({isActive}) => `px-4 py-3 rounded-xl font-medium ${isActive ? 'bg-accent-primary/10 text-accent-primary' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Jadwal Shalat</NavLink>
            <NavLink to="/tentang" className={({isActive}) => `px-4 py-3 rounded-xl font-medium ${isActive ? 'bg-accent-primary/10 text-accent-primary' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Tentang</NavLink>
          </div>
        </div>
      )}
    </>
  );
};
