import { Home, Cpu, Radio, Zap, Info, Heart, PlusSquare } from 'lucide-react'; // Tambah import Heart

export default function MobileNavbar({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'mcu', label: 'MCU', icon: Cpu },
    { id: 'sensor', label: 'Sensor', icon: Radio },
    { id: 'actuator', label: 'Akt', icon: Zap }, // Label disingkat biar muat
    { id: 'favorit', label: 'Fav', icon: Heart }, // Label disingkat
    { id: 'about', label: 'About', icon: Info },
    { id: 'data', label: 'Data', icon: PlusSquare }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 px-2 py-2 z-50 safe-area-pb">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center py-1 px-1 transition-all duration-200 ${
                isActive ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'
              }`}
            >
              <div className={`p-1 rounded-full mb-1 transition-all ${
                isActive ? 'bg-zinc-100' : ''
              }`}>
                <IconComponent 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 1.5}
                  className={item.id === 'favorit' && isActive ? 'text-red-500 fill-current' : ''} // Biar ikon hati merah kalau aktif
                />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}