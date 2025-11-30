import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// Import Komponen Halaman
// import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import MikroPage from './pages/MikroPage'; 
import SensorPage from './pages/SensorPage'; 
import AktuatorPage from './pages/AktuatorPage'; 
import AboutPage from './pages/AboutPage';
import FavoritesPage from './pages/FavoritesPage';
import DetailPage from './pages/DetailPage'; 
import DataPage from './pages/DataPage';

// Import Komponen UI
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import PWABadge from './PWABadge';
import './index.css';

function AppRoot() {
  // const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null); // State untuk data detail

  // State Favorit dengan LocalStorage
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product) => {
    const isFavorited = favorites.some((fav) => fav.id === product.id);
    if (isFavorited) {
      setFavorites(favorites.filter((fav) => fav.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  // const handleSplashComplete = () => {
  //   setShowSplash(false);
  // };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll ke paling atas saat pindah halaman
  };

  // --- LOGIKA HALAMAN DETAIL ---
  const handleProductClick = (product) => {
    setSelectedProduct(product); // Simpan data produk yg diklik
    setCurrentPage('detail');    // Pindah ke mode detail
    window.scrollTo(0, 0);
  };

  const handleBackToCatalog = () => {
    // Logika cerdas untuk kembali ke kategori yang benar
    if (selectedProduct?.categories?.name === 'Mikrokontroler') setCurrentPage('mcu');
    else if (selectedProduct?.categories?.name === 'Sensor') setCurrentPage('sensor');
    else if (selectedProduct?.categories?.name === 'Aktuator') setCurrentPage('actuator');
    else if (currentPage === 'favorit') setCurrentPage('favorit'); // Kalau dari favorit, balik ke favorit
    else setCurrentPage('home');
    
    setSelectedProduct(null); // Reset data produk
  };

  // --- RENDER HALAMAN ---
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
            <HomePage 
              favorites={favorites} 
              toggleFavorite={toggleFavorite} 
              onNavigate={handleNavigation} // <-- TAMBAHKAN INI (Kirim fungsi navigasi)
            />
          );     
      case 'mcu':
        return <MikroPage favorites={favorites} toggleFavorite={toggleFavorite} onItemClick={handleProductClick} />;
      
      case 'sensor':
        return <SensorPage favorites={favorites} toggleFavorite={toggleFavorite} onItemClick={handleProductClick} />;
      
      case 'actuator':
        return <AktuatorPage favorites={favorites} toggleFavorite={toggleFavorite} onItemClick={handleProductClick} />;
      
      case 'favorit':
        return <FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} onItemClick={handleProductClick} />;
      
      case 'about':
        return <AboutPage />;

      case 'data':
        return <DataPage onBack={() => handleNavigation('home')} />;
      
      // Halaman Detail (Tidak ada di Navbar, muncul saat klik produk)
      case 'detail':
        return (
          <DetailPage 
            product={selectedProduct} 
            onBack={handleBackToCatalog}
            isFavorited={favorites.some(fav => fav.id === selectedProduct?.id)}
            onToggleFavorite={toggleFavorite}
          />
        );
        
      default:
        return <HomePage favorites={favorites} toggleFavorite={toggleFavorite} />;
    }
  };

  // if (showSplash) {
  //   return <SplashScreen onComplete={handleSplashComplete} />;
  // }

  return (
    <div className="min-h-screen bg-zinc-50">
      <DesktopNavbar currentPage={currentPage} onNavigate={handleNavigation} />
      <main className="min-h-screen">
        {renderCurrentPage()}
      </main>
      <MobileNavbar currentPage={currentPage} onNavigate={handleNavigation} />
      <PWABadge />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
);