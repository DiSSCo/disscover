import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      api: '/src/api',
      app: '/src/app',
      components: '/src/components',
      "redux-store": '/src/redux-store',
      sources: '/src/sources',
      tests: '/src/tests',
      webroot: '/src/webroot'
    }
  },
  build: {
    outDir: './build',
    emptyOutDir: true
  }
});