import HeroSection from '../components/home/HeroSection';
import { Cpu, Radio, Zap } from 'lucide-react';

export default function HomePage({ onNavigate }) {
  // Data Kategori Statis untuk Dashboard
  const categories = [
    {
      id: 'mcu',
      title: 'Mikrokontroler',
      desc: 'Otak pemrosesan dalam Sistem Terbenam.',
      icon: Cpu,
      color: 'bg-blue-500',
      // count: 'Tersedia'
    },
    {
      id: 'sensor',
      title: 'Sensor',
      desc: 'Perangkat masukan dan pendeteksi atau indra dari suatu sistem.',
      icon: Radio,
      color: 'bg-green-500',
      // count: 'Tersedia'
    },
    {
      id: 'actuator',
      title: 'Aktuator',
      desc: 'Perangkat keluaran berupa gerakan mekanis, suara atau lainnya.',
      icon: Zap,
      color: 'bg-orange-500',
      // count: 'Tersedia'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      <HeroSection onNavigate={onNavigate} />
      
      {/* Dashboard Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              onClick={() => onNavigate(cat.id)}
              className="bg-white p-6 rounded-2xl shadow-lg border border-zinc-100 hover:shadow-xl transition-all cursor-pointer group"
              // Nanti kita tambahkan fungsi navigasi di sini
            >
              <div className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                <cat.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">{cat.title}</h3>
              <p className="text-zinc-500 text-sm mb-4">{cat.desc}</p>
            </div>
          ))}
        </div>

        {/* Section Tambahan */}
        <div className="mt-16 mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 mb-6 text-center">Mengapa Menggunakan Katalog Ini?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Kemudahan Pencarian */}
            <div className="bg-white p-6 rounded-xl border border-zinc-200 hover:border-zinc-300 transition-colors">
              <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center mb-4 text-2xl">
                🔍
              </div>
              <h3 className="font-bold text-lg text-zinc-900 mb-2">Referensi Terpusat</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Tidak perlu lagi membuka banyak tab browser. Temukan spesifikasi teknis Mikrokontroler, Sensor, dan Aktuator dalam satu tempat yang terorganisir.
              </p>
            </div>
            {/* Card 2: Estimasi Budget */}
            <div className="bg-white p-6 rounded-xl border border-zinc-200 hover:border-zinc-300 transition-colors">
              <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center mb-4 text-2xl">
                💰
              </div>
              <h3 className="font-bold text-lg text-zinc-900 mb-2">Estimasi Biaya</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Rencanakan anggaran proyek IoT Anda dengan lebih akurat. Kami menyediakan estimasi harga pasar terkini untuk setiap komponen.
              </p>
            </div>
            {/* Card 3: Pemilihan Tepat */}
            <div className="bg-white p-6 rounded-xl border border-zinc-200 hover:border-zinc-300 transition-colors">
              <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center mb-4 text-2xl">
                ⚡
              </div>
              <h3 className="font-bold text-lg text-zinc-900 mb-2">Akurasi Spesifikasi</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Hindari kesalahan pembelian komponen. Bandingkan tegangan kerja, pinout, dan fitur antar komponen sebelum memutuskan untuk membeli.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}