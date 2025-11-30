import { ProductModel } from "../models/productModel.js";
import { supabase } from "../config/supabaseClient.js"; // Import dulu supabasenya!

export const ProductController = {
  // 1. Controller untuk mengambil SEMUA produk
  async getAllProducts(req, res) {
    try {
      const products = await ProductModel.getAll();
      // Kirim jawaban sukses (200) beserta datanya
      res.status(200).json(products);
    } catch (error) {
      // Kirim pesan error jika gagal
      res.status(500).json({ error: error.message });
    }
  },

  // 2. Controller untuk mengambil SATU produk berdasarkan ID
  async getProductById(req, res) {
    try {
      // Ambil ID dari alamat URL (misal: /products/123)
      const { id } = req.params;
      const product = await ProductModel.getById(id);
      
      if (!product) {
        return res.status(404).json({ error: "Produk tidak ditemukan" });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 3. Controller untuk mengambil produk berdasarkan KATEGORI
  async getProductsByCategory(req, res) {
    try {
      // Ambil nama kategori dari URL (misal: /products/category/sensor)
      const { categoryName } = req.params; 
      const products = await ProductModel.getByCategory(categoryName);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

// ... fungsi get lainnya ...

  // 4. Controller untuk CREATE Produk + Upload Gambar
  async createProduct(req, res) {
    try {
      const { name, description, price, specifications, category_id } = req.body;
      const file = req.file; // File gambar ada di sini

      if (!file) {
        return res.status(400).json({ error: "Gambar produk wajib diupload!" });
      }

      // --- PROSES 1: Upload Gambar ke Supabase Storage ---
      // Bikin nama file unik (pakai timestamp) biar gak bentrok
      const fileName = `img_${Date.now()}_${file.originalname}`;
      
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from("product-images") // Nama bucket tadi
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        });

      if (uploadError) throw new Error(`Upload Gagal: ${uploadError.message}`);

      // Ambil Link Publik Gambarnya
      const { data: urlData } = supabase
        .storage
        .from("product-images")
        .getPublicUrl(fileName);

      const finalImageUrl = urlData.publicUrl;

      // --- PROSES 2: Simpan Data ke Tabel Database ---
      const newProduct = {
        name,
        description,
        price: parseInt(price), // Pastikan jadi angka
        specifications: JSON.parse(specifications), // Ubah string JSON jadi Object
        category_id,
        image_url: finalImageUrl // Masukkan link gambar dari Supabase
      };

      const product = await ProductModel.create(newProduct);

      res.status(201).json({
        message: "Produk berhasil dibuat!",
        data: product
      });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // ... kode createProduct sebelumnya ...

  // 5. Controller Update Produk
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, specifications, category_id } = req.body;
      const file = req.file;

      // Siapkan data yang mau diupdate
      let updates = {
        name,
        description,
        price: parseInt(price),
        // Cek dulu apakah specifications dikirim sebagai string JSON atau object
        specifications: typeof specifications === 'string' ? JSON.parse(specifications) : specifications,
        category_id
      };

      // Kalo ada file baru, upload dulu & ganti link gambarnya
      if (file) {
        const fileName = `img_${Date.now()}_${file.originalname}`;
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, file.buffer, { contentType: file.mimetype });
        
        if (uploadError) throw new Error(uploadError.message);

        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);
          
        updates.image_url = urlData.publicUrl;
      }

      const updatedProduct = await ProductModel.update(id, updates);
      res.status(200).json({ message: "Update berhasil!", data: updatedProduct });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 6. Controller Hapus Produk
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await ProductModel.delete(id);
      res.status(200).json({ message: "Produk berhasil dihapus!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};