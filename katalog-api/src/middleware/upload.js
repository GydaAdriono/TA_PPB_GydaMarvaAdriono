import multer from "multer";

// Kita gunakan Memory Storage
// Artinya: File disimpan sementara di RAM (sebagai Buffer) sebelum dikirim ke Supabase.
// Kita TIDAK menyimpan file di harddisk laptop biar server tetap bersih.
const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // Batas ukuran file: 2MB (biar hemat storage)
  },
});