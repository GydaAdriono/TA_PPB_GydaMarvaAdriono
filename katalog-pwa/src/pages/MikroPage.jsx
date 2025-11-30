import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductGrid from '../components/ProductGrid';
import { Loader2, Cpu } from 'lucide-react'; // Pakai ikon Cpu untuk Mikro

// 1. TERIMA PROPS onItemClick (dan props lain)
export default function MikroPage({ favorites, toggleFavorite, onItemClick }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Pastikan nama kategori di URL sama persis dengan di Database Supabase ('Mikrokontroler')
        console.log("CEK ENV:", import.meta.env.VITE_API_URL);
        const response = await axios.get('http://localhost:3000/api/products/category/Mikrokontroler');
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data Mikrokontroler.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 pb-20 md:pb-8 pt-20 px-4">
      <div className="max-w-7xl mx-auto py-8">  
        
        {/* Header dengan Ikon CPU */}
        <div className="mb-8 flex items-center space-x-3">
          <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
            <Cpu size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Mikrokontroler</h1>
            <p className="text-zinc-500">Otak dari proyek IoT Anda. Pilih yang sesuai spesifikasi.</p>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        )}

        {error && <div className="text-red-500 text-center">{error}</div>}

        {!loading && !error && (
          // 2. PASANG PROPS onItemClick KE PRODUCTGRID
          <ProductGrid 
            products={products} 
            onItemClick={onItemClick} 
          />
        )}

      </div>
    </div>
  );
}