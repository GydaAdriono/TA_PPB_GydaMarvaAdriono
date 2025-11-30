import { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, Save, Loader2, ArrowLeft, Trash2, Pencil, X, PlusCircle } from 'lucide-react';

export default function DataPage({ onBack }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Mode Edit atau Tambah?
  const [editId, setEditId] = useState(null); // Simpan ID produk yg diedit

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    specifications: '{}',
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // KATEGORI (GANTI DENGAN UUID ASLI SUPABASE KAMU!)
  const categories = [
    { id: '686f1842-6c0a-4a56-8a82-880d1a7753ea', name: 'Mikrokontroler' },
    { id: '0ba4ee5e-331a-4bc5-9685-60dc53d94604', name: 'Sensor' },
    { id: 'ca0e93b7-2888-4116-b35c-d5a9b857f750', name: 'Aktuator' },
  ];

  // 1. Ambil Data Produk saat halaman dibuka
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Tembak langsung ke localhost:3000
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Gagal ambil data", error);
    }
  };

  // 2. Handle File Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 3. Handle Submit (Bisa Create atau Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('category_id', formData.category_id);
      data.append('specifications', formData.specifications);
      if (imageFile) data.append('image', imageFile);

      if (isEditing) {
        // --- LOGIKA UPDATE ---
        await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${editId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Produk berhasil diupdate!');
      } else {
        // --- LOGIKA CREATE ---
        await axios.post(`${import.meta.env.VITE_API_URL}/api/products/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Produk berhasil ditambahkan!');
      }

      resetForm();
      fetchProducts(); // Refresh tabel
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  // 4. Handle Tombol Delete
  const handleDelete = async (id) => {
    if (window.confirm("Yakin mau menghapus produk ini?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        fetchProducts(); // Refresh tabel
      } catch (error) {
        alert("Gagal menghapus");
      }
    }
  };

  // 5. Handle Tombol Edit (Isi Form dengan Data Lama)
  const handleEdit = (product) => {
    setIsEditing(true);
    setEditId(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category_id: product.category_id,
      // Ubah Object JSON jadi String biar bisa diedit di Textarea
      specifications: JSON.stringify(product.specifications, null, 2),
    });
    setPreviewUrl(product.image_url); // Tampilkan gambar lama
    window.scrollTo(0, 0); // Scroll ke atas
  };

  // 6. Reset Form
  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', category_id: '', specifications: '{}' });
    setImageFile(null);
    setPreviewUrl(null);
    setIsEditing(false);
    setEditId(null);
  };

  // Helper Format Rupiah
  const formatRupiah = (num) => new Intl.NumberFormat('id-ID').format(num);

  return (
    <div className="min-h-screen bg-zinc-50 pt-24 px-4 pb-20">
      <div className="max-w-5xl mx-auto">
        
        {/* Header & Back Button */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="flex items-center text-zinc-500 hover:text-zinc-900">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
          </button>
          <h1 className="text-2xl font-bold text-zinc-900">Dashboard Kelola Data</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- KOLOM KIRI: FORMULIR --- */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">{isEditing ? 'Edit Produk' : 'Tambah Baru'}</h2>
                {isEditing && (
                  <button onClick={resetForm} className="text-xs text-red-500 hover:underline flex items-center">
                    <X className="w-3 h-3 mr-1" /> Batal Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Upload Preview */}
                <div className="flex justify-center">
                  <label className="w-full h-32 border-2 border-dashed border-zinc-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all relative overflow-hidden bg-zinc-50">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
                    ) : (
                      <div className="text-center p-2">
                        <Upload className="w-6 h-6 text-zinc-400 mx-auto mb-1" />
                        <span className="text-xs text-zinc-500">Upload Foto</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>

                <input 
                  type="text" placeholder="Nama Produk" required
                  className="w-full p-2.5 rounded-lg border border-zinc-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                />

                <div className="grid grid-cols-2 gap-2">
                  <select 
                    required className="w-full p-2.5 rounded-lg border border-zinc-200 text-sm bg-white"
                    value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})}
                  >
                    <option value="">Kategori</option>
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
                  <input 
                    type="number" placeholder="Harga" required
                    className="w-full p-2.5 rounded-lg border border-zinc-200 text-sm"
                    value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                  />
                </div>

                <textarea 
                  rows="2" placeholder="Deskripsi Singkat" required
                  className="w-full p-2.5 rounded-lg border border-zinc-200 text-sm"
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                />

                <textarea 
                  rows="3" placeholder='Spesifikasi JSON: {"volt": "5V"}'
                  className="w-full p-2.5 rounded-lg border border-zinc-200 text-xs font-mono bg-zinc-50"
                  value={formData.specifications} onChange={e => setFormData({...formData, specifications: e.target.value})}
                />

                <button 
                  type="submit" disabled={loading}
                  className={`w-full py-3 text-white rounded-xl font-bold transition flex items-center justify-center ${isEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-zinc-900 hover:bg-zinc-800'}`}
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isEditing ? 'Update Produk' : 'Simpan Produk')}
                </button>
              </form>
            </div>
          </div>

          {/* --- KOLOM KANAN: TABEL DAFTAR BARANG --- */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
              <div className="p-4 border-b border-zinc-100 bg-zinc-50 flex justify-between items-center">
                <h3 className="font-bold text-zinc-700">Daftar Produk ({products.length})</h3>
                <button onClick={fetchProducts} className="text-xs text-blue-600 hover:underline">Refresh</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-zinc-50 text-zinc-500 font-medium">
                    <tr>
                      <th className="p-4">Produk</th>
                      <th className="p-4">Kategori</th>
                      <th className="p-4">Harga</th>
                      <th className="p-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {/* {products.map((item) => ( */}
                    {(Array.isArray(products) ? products : []).map((item) => (
                      <tr key={item.id} className="hover:bg-zinc-50 transition">
                        <td className="p-4 flex items-center space-x-3">
                          <img src={item.image_url} className="w-10 h-10 rounded-lg object-cover border border-zinc-200 bg-white" />
                          <span className="font-medium text-zinc-900 line-clamp-1">{item.name}</span>
                        </td>
                        <td className="p-4 text-zinc-500">
                          {/* Nama Kategori (Optional Chaining biar gak error kalau null) */}
                          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                            {item.categories?.name || '-'}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-zinc-600">
                          Rp {formatRupiah(item.price)}
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center space-x-2">
                            <button 
                              onClick={() => handleEdit(item)}
                              className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(item.id)}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {products.length === 0 && (
                <div className="p-8 text-center text-zinc-400">Belum ada data.</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}