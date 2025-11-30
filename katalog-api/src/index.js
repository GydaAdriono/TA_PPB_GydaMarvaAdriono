import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

// Load konfigurasi .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Agar bisa diakses dari frontend mana saja
app.use(express.json()); // Agar bisa baca data JSON dari request body

// Routing (Papan Petunjuk Jalan)
// "Kalau ada yang ke alamat /api/products, arahkan ke productRoutes"
app.use("/api/products", productRoutes);

// Jalankan Server
app.listen(port, () => {
  console.log(`Server katalog IoT berjalan di port ${port} 🚀`);
});