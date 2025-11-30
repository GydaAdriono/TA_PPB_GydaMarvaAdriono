import { supabase } from "../config/supabaseClient.js";

export const ProductModel = {
  // 1. Mengambil SEMUA produk (untuk halaman Katalog)
  async getAll() {
    // Kita join dengan tabel categories agar nama kategorinya muncul
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories ( id, name )
      `);
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data;
  },

  // 2. Mengambil SATU produk berdasarkan ID (untuk halaman Detail)
  async getById(id) {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories ( id, name )
      `)
      .eq("id", id)
      .single(); // .single() artinya cuma ambil satu baris
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data;
  },

  // 3. Mengambil produk berdasarkan KATEGORI (Fitur filter)
  async getByCategory(categoryName) {
    // Cari dulu ID kategorinya
    const { data: catData } = await supabase
        .from('categories')
        .select('id')
        .eq('name', categoryName)
        .single();

    if (!catData) return []; // Kalau kategori ga ketemu, balikin array kosong

    // Ambil produk yang punya category_id tersebut
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories ( id, name )
      `)
      .eq("category_id", catData.id);

    if (error) throw new Error(error.message);
    return data;
  },

  // ... fungsi get lainnya ...

  // 4. Membuat Produk Baru
  async create(productData) {
    const { data, error } = await supabase
      .from("products")
      .insert([productData]) // Masukkan data object
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },


  async update(id, productData) {
      const { data, error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },

    // 6. Hapus Data Produk
    async delete(id) {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw new Error(error.message);
      return true;
    }
}