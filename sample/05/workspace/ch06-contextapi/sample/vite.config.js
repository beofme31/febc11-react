import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@components", replacement: "/src/components" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@context", replacement: "/src/context" },
      { find: "@redux", replacement: "/src/redux" },
      { find: "@redux-toolkit", replacement: "/src/redux-toolkit" },
    ],
  },
})
