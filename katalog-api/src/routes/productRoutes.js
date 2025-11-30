import express from "express";
import { ProductController } from "../controllers/productController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// 1. Rute untuk mengambil SEMUA produk
// Alamat: GET /api/products
router.get("/", ProductController.getAllProducts);

// 2. Rute untuk mengambil produk berdasarkan KATEGORI
// Alamat: GET /api/products/category/sensor
// (PENTING: Rute spesifik seperti ini harus ditaruh SEBELUM rute /:id)
router.get("/category/:categoryName", ProductController.getProductsByCategory);

// 3. Rute untuk mengambil SATU produk berdasarkan ID
// Alamat: GET /api/products/123
router.get("/:id", ProductController.getProductById);

// 4. Rute Create Produk (Upload Gambar)
// 'image' adalah nama field di form-data nanti
router.post("/", upload.single("image"), ProductController.createProduct);
export default router;

// 5. Rute Update (PUT) - Pakai upload.single('image') jaga-jaga user ganti gambar
router.put("/:id", upload.single("image"), ProductController.updateProduct);

// 6. Rute Delete (DELETE)
router.delete("/:id", ProductController.deleteProduct);