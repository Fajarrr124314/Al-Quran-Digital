import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { QuranPage } from './pages/QuranPage';
import { SurahDetail } from './pages/SurahDetail';
import { AboutPage } from './pages/AboutPage';
import { DoaPage } from './pages/DoaPage';
import { ShalatPage } from './pages/ShalatPage';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar />
      <main className="pb-12 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quran" element={<QuranPage />} />
          <Route path="/surah/:id" element={<SurahDetail />} />
          <Route path="/doa" element={<DoaPage />} />
          <Route path="/shalat" element={<ShalatPage />} />
          <Route path="/tentang" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
