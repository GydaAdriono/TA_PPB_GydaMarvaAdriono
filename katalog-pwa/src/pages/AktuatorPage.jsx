import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductGrid from '../components/ProductGrid';
import { Loader2, Zap } from 'lucide-react';

export default function AktuatorPage({ favorites, toggleFavorite, onItemClick }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Pastikan nama kategori 'Aktuator' sesuai
        const response = await axios.get('http://localhost:3000/api/products/category/Aktuator');
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data Aktuator.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 pb-20 md:pb-8 pt-20 px-4">
      <div className="max-w-7xl mx-auto py-8">
        
        <div className="mb-8 flex items-center space-x-3">
          <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
            <Zap size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Aktuator</h1>
            <p className="text-zinc-500">Komponen penggerak seperti motor, servo, dan relay.</p>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
          </div>
        )}

        {error && <div className="text-red-500 text-center">{error}</div>}

        {!loading && !error && (
          <ProductGrid 
            products={products} 
            onItemClick={onItemClick} 
          />
        )}

      </div>
    </div>
  );
}