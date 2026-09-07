import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending form
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Developer Profile Section */}
      <div className="glass rounded-3xl p-8 md:p-12 mb-12 text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-white dark:from-slate-800/80 dark:to-slate-900/80 z-0"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-accent-primary/10 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-primary to-teal-400 p-1 mb-6 shadow-xl">
            <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center">
              <User className="w-10 h-10 text-slate-400 dark:text-slate-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Tentang Pengembang</h1>
          <p className="text-accent-primary font-medium mb-6">Web Developer & AI Enthusiast</p>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-6">
            Aplikasi Al-Qur'an Wahyu Digital ini dibangun dengan tujuan untuk memudahkan umat Muslim dalam membaca, mempelajari, dan mendengarkan ayat-ayat suci Al-Qur'an di mana saja. Dikembangkan menggunakan teknologi web modern untuk memastikan pengalaman yang cepat, ringan, dan responsif.
          </p>
          
          <div className="inline-block bg-accent-primary/5 dark:bg-accent-primary/10 border border-accent-primary/20 rounded-2xl p-4 text-sm text-slate-600 dark:text-slate-300">
            <span className="block font-semibold text-accent-primary mb-1">Atribusi API</span>
            Data Al-Qur'an & Terjemahan (Standar Kemenag RI) pada aplikasi ini sepenuhnya disediakan melalui layanan API Publik oleh <strong>equran.id</strong>. Kami mengucapkan banyak terima kasih atas kontribusi mereka bagi umat.
          </div>
        </div>
      </div>

      {/* Privacy Policy Section */}
      <div className="glass rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Kebijakan Privasi</h2>
        <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Kami sangat menghargai dan melindungi privasi Anda. Aplikasi <strong>Al-Qur'an Wahyu Digital</strong> dibangun dengan prinsip keamanan dan kenyamanan pengguna.
          </p>
          <ul className="list-disc list-outside space-y-2 ml-5">
            <li><strong>Data Lokal:</strong> Pengaturan aplikasi (seperti mode gelap, pilihan Qari, dan penanda bacaan) disimpan murni secara lokal di perangkat Anda (<em>Local Storage</em>). Kami tidak memanen, mengirim, atau menyimpan data tersebut ke server eksternal mana pun.</li>
            <li><strong>Bebas Pelacakan:</strong> Aplikasi ini 100% bebas dari iklan (<em>ads-free</em>) dan tidak menggunakan perangkat lunak pelacakan pihak ketiga (<em>trackers</em>) yang mengancam privasi Anda.</li>
            <li><strong>Transparansi:</strong> Segala komunikasi data hanya terjadi antara perangkat Anda dan API Publik terpercaya (seperti equran.id dan myquran.com) secara langsung untuk mengambil ayat dan jadwal shalat.</li>
          </ul>
        </div>
      </div>

      {/* Contact & Suggestion Form */}
      <div className="glass rounded-3xl p-8 md:p-12 relative">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Kritik & Saran</h2>
          <p className="text-slate-600 dark:text-slate-400">Punya masukan atau menemukan masalah? Beritahu kami agar aplikasi ini menjadi lebih baik.</p>
        </div>

        {isSubmitted ? (
          <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-500/20 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-teal-100 dark:bg-teal-800 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600 dark:text-teal-400">
              <Send className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Pesan Terkirim!</h3>
            <p className="text-slate-600 dark:text-slate-400">Terima kasih atas saran dan masukan Anda. Jazakumullah khairan.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <User className="w-4 h-4 text-accent-primary" /> Nama Lengkap
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary transition-all text-slate-800 dark:text-white"
                  placeholder="Nama Anda"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent-primary" /> Email
                </label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary transition-all text-slate-800 dark:text-white"
                  placeholder="email@contoh.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-accent-primary" /> Pesan / Saran
              </label>
              <textarea 
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary transition-all text-slate-800 dark:text-white resize-none"
                placeholder="Tulis pesan, kritik, atau saran Anda di sini..."
              />
            </div>
            
            <button 
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-primary to-teal-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <Send className="w-5 h-5" /> Kirim Pesan
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
