import { ArrowRight, Cpu } from 'lucide-react';

export default function HeroSection({ onNavigate }) {
  return (
    <section className="relative overflow-hidden bg-zinc-900 text-white min-h-[600px] flex items-center">
        
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-zinc-800/50 px-3 py-1 rounded-full border border-zinc-700 backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-zinc-300">Database Live Update</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Temukan Komponen <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                IoT Terbaik
              </span>
            </h1>
            
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto lg:mx-0">
              Katalog Mikrokontroler, Sensor, dan Aktuator untuk proyek elektronika Anda. 
              Dilengkapi spesifikasi teknis dan estimasi harga terkini.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button 
                // Tombol ini belum ada aksinya, nanti bisa diarahkan ke halaman katalog
                onClick={() => onNavigate('mcu')}
                className="bg-white text-zinc-900 px-6 py-3 rounded-full font-bold hover:bg-zinc-200 transition flex items-center"
              >
                Mulai Jelajahi <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Content (Illustration) */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 md:w-96 md:h-96 bg-gradient-to-tr from-zinc-800 to-zinc-700 rounded-2xl rotate-3 border border-zinc-600 flex items-center justify-center shadow-2xl">
               <Cpu className="w-32 h-32 text-zinc-500 opacity-50" />
               <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}