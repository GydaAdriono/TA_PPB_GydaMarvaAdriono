import ProductGrid from '../components/ProductGrid';
import { Heart } from 'lucide-react';

export default function FavoritesPage({ favorites, toggleFavorite,onItemClick }) {
  return (
    <div className="min-h-screen bg-zinc-50 pb-20 md:pb-8 pt-20 px-4">
      <div className="max-w-7xl mx-auto py-8">
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2 flex items-center justify-center gap-2">
            <Heart className="text-red-500 fill-current" /> Favorit Saya
          </h1>
          <p className="text-zinc-500">Koleksi komponen pilihan Anda.</p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-zinc-200 border-dashed">
            <p className="text-zinc-400">Belum ada item favorit.</p>
            <p className="text-sm text-zinc-300 mt-1">Klik ikon hati pada produk untuk menambahkan.</p>
          </div>
        ) : (
          <ProductGrid 
            products={favorites} 
            onItemClick={onItemClick}
          />
        )}

      </div>
    </div>
  );
}