// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     open: true,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3001',
//         secure: false,
//         changeOrigin: true
//       }
//     }
//   }
// })


// import { defineConfig, loadEnv } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig(({ mode }) => {
//   // Load env file based on `mode` (dev/prod)
//   const env = loadEnv(mode, process.cwd(), '');

//   return {
//     plugins: [react()],
//     server: {
//       port: 3000,
//       open: true,
//       proxy: {
//         '/api': {
//           target: env.VITE_API_URL || 'http://localhost:3001', // Fallback to localhost
//           secure: false,
//           changeOrigin: true
//         }
//       }
//     },
//     // Optional: For production build optimization
//     build: {
//       outDir: 'dist',
//       assetsInlineLimit: 4096 // 4kb
//     }
//   };
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production' 
        ? 'https://www.lepalefox.com' 
        : 'http://localhost:3001',
        secure: false,
        changeOrigin: true
      }
    }
  }
})