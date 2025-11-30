import { Tag, ArrowRight } from 'lucide-react';

export default function ProductGrid({ products, onItemClick }) {
  // Debugging: Cek isi products di Console browser
  console.log("ISI PRODUK:", products);

  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 👇 PERBAIKAN DI SINI: Tambahkan pengecekan Array.isArray() */}
        {Array.isArray(products) && products.map((item) => (
          <div 
            key={item.id}
            onClick={() => onItemClick(item)}
            className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
          >
            {/* Bagian Gambar */}
            <div className="relative h-48 overflow-hidden bg-white">
              <img 
                src={item.image_url} 
                alt={item.name}
                className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Bagian Info */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="mb-2">
                <h3 className="font-bold text-lg text-zinc-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h3>
              </div>

              <p className="text-sm text-zinc-500 line-clamp-2 mb-4 flex-1">
                {item.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100">
                <div className="flex items-center text-blue-600 font-bold">
                  <Tag className="w-4 h-4 mr-2" />
                  {formatRupiah(item.price)}
                </div>
                <button className="p-2 bg-zinc-900 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Tampilkan pesan jika kosong ATAU jika products bukan array */}
      {(!Array.isArray(products) || products.length === 0) && (
        <div className="text-center py-20">
            <p className="text-zinc-400">Belum ada data produk.</p>
        </div>
      )}
    </section>
  );
}