import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'icons/*'],
      manifest: {
        name: 'Gastos del Hogar',
        short_name: 'Gastos Hogar',
        description: 'Lleva el control mensual de tus gastos del hogar',
        lang: 'es-CO',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
          {
            src: '/icons/pwa-icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: "any"
          },
          {
            src: '/icons/pwa-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: "any"
          },
          {
            src: '/icons/pwa-icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: "maskable"
          },
          {
            src: '/icons/pwa-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: "maskable"
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === 'style' ||
              request.destination === 'script' ||
              request.destination === 'worker',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets-cache',
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === 'image' ||
              request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'media-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
        navigateFallback: '/', // Support SPA
        cleanupOutdatedCaches: true, // Clean outdated versions
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'], // Precache
      },
    }),
  ],
});
