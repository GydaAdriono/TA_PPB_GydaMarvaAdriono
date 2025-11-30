import { Github, Code, Database, Globe, Smartphone, Mail } from 'lucide-react';

export default function AboutPage() {
  // GANTI LINK INI DENGAN LINK GITHUB ASLI KAMU NANTI
  const githubLink = "https://github.com/gydaadriono"; // Contoh link profil

  return (
    <div className="min-h-screen bg-zinc-50 pb-20 md:pb-8 pt-20 px-4">
      <div className="max-w-3xl mx-auto py-8">
        
        <h1 className="text-3xl font-bold text-zinc-900 mb-8 text-center">Tentang Aplikasi</h1>
        
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 overflow-hidden">
          
          {/* Header Banner - Tanpa Foto Profil */}
          <div className="h-32 bg-zinc-900 relative flex flex-col items-center justify-center overflow-hidden">
            {/* Dekorasi Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-zinc-700/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
            
            {/* Logo Text di Tengah Banner (Opsional, biar gak kosong banget) */}
            <div className="relative z-10 flex items-center gap-3">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               <span className="text-zinc-400 font-mono text-sm tracking-widest uppercase">System Info</span>
            </div>
          </div>
          
          {/* Konten */}
          <div className="py-10 px-8 text-center">
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Katalog IoT PWA</h2>
            <p className="text-zinc-500 font-medium text-sm mt-1 mb-6">Versi 1.0.0 • Praktikum PPB</p>
            
            {/* Deskripsi Proyek */}
            <div className="text-left bg-zinc-50 p-6 rounded-2xl border border-zinc-100 mb-8">
              <h3 className="font-bold text-zinc-900 mb-2">Apa itu Katalog IoT?</h3>
              <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                Katalog IoT adalah aplikasi berbasis web modern (Progressive Web App) yang berfungsi sebagai 
                perpustakaan digital untuk komponen elektronika. Aplikasi ini dirancang untuk memudahkan 
                mahasiswa dan pengembang dalam mencari spesifikasi teknis Mikrokontroler, Sensor, dan Aktuator.
              </p>
              
              <h3 className="font-bold text-zinc-900 mb-2">Fitur Unggulan:</h3>
              <ul className="text-sm text-zinc-600 space-y-2 list-disc list-inside">
                <li><span className="font-medium text-zinc-800">PWA Support:</span> Dapat diinstal di HP dan berjalan offline.</li>
                <li><span className="font-medium text-zinc-800">Admin Dashboard:</span> Kelola data produk (Tambah, Edit, Hapus) dengan mudah.</li>
                <li><span className="font-medium text-zinc-800">Realtime Database:</span> Terintegrasi langsung dengan Supabase.</li>
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mb-10">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Dibangun Menggunakan</h3>
              <div className="flex flex-wrap justify-center gap-3">
                <TechBadge icon={Code} label="React + Vite" />
                <TechBadge icon={Smartphone} label="PWA" />
                <TechBadge icon={Globe} label="Tailwind CSS" />
                <TechBadge icon={Database} label="Supabase" />
              </div>
            </div>

            {/* Tombol GitHub */}
            <div className="flex justify-center">
              <a 
                href={githubLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3 bg-zinc-900 text-white rounded-full font-semibold hover:bg-zinc-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <Github size={20} />
                <span>Lihat Source Code</span>
              </a>
            </div>

          </div>
        </div>

        {/* Footer Kecil */}
        <p className="text-center text-zinc-400 text-xs mt-8">
          Dibuat dengan ❤️ oleh [Nama Kamu]
        </p>

      </div>
    </div>
  );
}

// Komponen Kecil untuk Badge Teknologi
function TechBadge({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200 rounded-lg shadow-sm text-zinc-600 text-xs font-medium">
      <Icon size={14} />
      <span>{label}</span>
    </div>
  );
}