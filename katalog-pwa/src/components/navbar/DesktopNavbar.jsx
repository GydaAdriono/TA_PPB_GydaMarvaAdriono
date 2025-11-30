import { Home, Cpu, Radio, Zap, Info, Heart,PlusSquare } from 'lucide-react'; // Tambah import Heart

export default function DesktopNavbar({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'mcu', label: 'MCU', icon: Cpu },
    { id: 'sensor', label: 'Sensor', icon: Radio },
    { id: 'actuator', label: 'Aktuator', icon: Zap },
    { id: 'favorit', label: 'Favorit', icon: Heart }, // <-- Menu Baru
    { id: 'about', label: 'About', icon: Info },
    { id: 'data', label: 'Data', icon: PlusSquare } // Menu Baru
  ];

  return (
    <nav className="hidden md:block shadow-sm border-b border-zinc-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <div className="bg-zinc-900 p-2 rounded-lg">
               <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
                IoT Catalog
              </h1>
              <p className="text-xs text-zinc-500 font-medium">
                Gudang Elektronika
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4"> {/* Jarak antar menu diperkecil dikit biar muat */}
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                  currentPage === item.id
                    ? 'bg-zinc-900 text-white shadow-md' 
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
         
        </div>
      </div>
    </nav>
  );
}