import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'], // LOGORN.png sudah dihapus kan?
      injectRegister: 'auto',

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: 'Katalog IoT',
        short_name: 'IoT Catalog',
        description: 'Katalog lengkap Mikrokontroler, Sensor, dan Aktuator',
        theme_color: '#18181b',
        background_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        
        // 👇 INI BAGIAN PENTING YANG DITAMBAHKAN 👇
        runtimeCaching: [
          {
            // 1. Simpan Data API (JSON)
            // Setiap kali aplikasi minta data ke /api/, simpan hasilnya.
            urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
            handler: 'NetworkFirst', // Coba internet dulu (biar harga update), kalau mati baru buka simpanan.
            options: {
              cacheName: 'api-data-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 3 // Simpan selama 3 hari
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // 2. Simpan Gambar (Supabase/External)
            // Semua request gambar akan disimpan biar hemat kuota & cepat.
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst', // Cek simpanan dulu, kalau gak ada baru download.
            options: {
              cacheName: 'product-image-cache',
              expiration: {
                maxEntries: 500, // Simpan sampai 500 gambar
                maxAgeSeconds: 60 * 60 * 24 * 30 // Simpan selama 30 hari
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },

      devOptions: {
        enabled: true, // Ubah ke true biar bisa ngetes PWA di mode dev (localhost)
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    })
  ],
})