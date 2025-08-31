import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      // includeAssets: ["favicon.svg", "robots.txt"],
      manifest: {
        name: "Weatherly",
        short_name: "Weatherly",
        start_url: "/",
        display: "standalone",
        background_color: "#e7e5e4",
        theme_color: "#6366f1",
        color:"#374151",
        icons: [
          {
            src: "vite.svg",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
       screenshots: [
              {
                src: '/screenshotDesktop.png',
                sizes: '1366x768',
                type: 'image/png', 
                platform: 'wide', 
                label: 'PWA Home Screen on Desktop',
              },
              {
                src: '/screenshotMobile.png',
                sizes: '322x701',
                type: 'image/png', 
                platform: 'narrow', 
                label: 'PWA Home Screen on Mobile',
              },
       ],
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api/weather"),
            handler: "NetworkFirst",
            options: {
              cacheName: "weather-api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 30,
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-stylesheets",
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === "image" ||
              request.destination === "style" ||
              request.destination === "script",
            handler: "CacheFirst",
            options: {
              cacheName: "assets-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
          {
            urlPattern: /^https:\/\/unpkg\.com\/leaflet/,
            handler: "CacheFirst",
            options: {
              cacheName: "leaflet-lib-cache",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            urlPattern:
              /^https:\/\/[abc]\.tile\.openstreetmap\.org\/|^https:\/\/\{s\}\.tile\.openstreetmap\.org\/\{z\}\/\{x\}\/\{y\}\.png$/,
            handler: "CacheFirst",
            options: {
              cacheName: "osm-tiles",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
        ],
      },
      injectManifest: {
        swSrc: "./swExtra.js", // custom SW file where we extend logic
      },
    }),
  ],
});
