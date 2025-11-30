import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Membaca file .env
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Membuat koneksi
export const supabase = createClient(supabaseUrl, supabaseKey);