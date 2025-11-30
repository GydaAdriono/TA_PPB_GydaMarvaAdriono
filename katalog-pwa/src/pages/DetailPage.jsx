import { ArrowLeft, Tag, Heart, Share2 } from 'lucide-react';

export default function DetailPage({ product, onBack, isFavorited, onToggleFavorite }) {
  if (!product) return null;

  // Format Rupiah
  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Parsing Spesifikasi (Karena dari database bentuknya mungkin Text JSON, kita parse dulu kalau perlu)
  let specs = {};
  try {
    // Cek apakah specifications sudah berupa Objek atau masih String
    specs = typeof product.specifications === 'string' 
      ? JSON.parse(product.specifications) 
      : product.specifications;
  } catch (e) {
    console.error("Gagal parse spesifikasi", e);
    specs = { "Info": "Spesifikasi tidak tersedia" };
  }

  return (
    <div className="min-h-screen bg-zinc-50 pb-24 pt-6 md:pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Tombol Back */}
        <button 
          onClick={onBack}
          className="flex items-center text-zinc-500 hover:text-zinc-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali ke Katalog
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Bagian Kiri: Gambar */}
            <div className="bg-white p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-zinc-100">
              <div className="relative w-full aspect-square max-w-sm">
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Bagian Kanan: Info */}
            <div className="p-6 md:p-10 flex flex-col h-full">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wide">
                  {product.categories?.name || 'Komponen'}
                </span>
                <div className="flex items-center gap-1">
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mt-4 mb-2">
                {product.name}
              </h1>

              <div className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                <Tag className="w-5 h-5 mr-2" />
                {formatRupiah(product.price)}
              </div>

              <p className="text-zinc-600 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Tabel Spesifikasi */}
              <div className="mt-auto">
                <h3 className="font-semibold text-zinc-900 mb-3">Spesifikasi Teknis</h3>
                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  {Object.entries(specs).map(([key, value], index) => (
                    <div 
                      key={key} 
                      className={`flex justify-between p-3 text-sm ${
                        index !== Object.keys(specs).length - 1 ? 'border-b border-zinc-200' : ''
                      }`}
                    >
                      <span className="text-zinc-500 capitalize">{key.replace(/_/g, ' ')}</span>
                      <span className="font-medium text-zinc-900 text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-zinc-100">
                <button 
                  onClick={() => onToggleFavorite(product)}
                  className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    isFavorited 
                      ? 'bg-red-50 text-red-600 border border-red-200' 
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  {isFavorited ? 'Disukai' : 'Favoritkan'}
                </button>
                <button className="p-3 rounded-xl border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}