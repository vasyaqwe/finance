import { defineConfig } from 'vite'
import { cloudflare } from "@cloudflare/vite-plugin"
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from "vite-tsconfig-paths"
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
         tsconfigPaths(),         cloudflare(),
         
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
      viteReact({
            babel: {
               plugins: [["babel-plugin-react-compiler"]],
            },
         }),
         tailwindcss(),
  ],
      preview: {
         port: 3000,
      },
      server: {
         port: 3000,
      },
      optimizeDeps: {
    exclude: ['@electric-sql/pglite'],
  },
})
