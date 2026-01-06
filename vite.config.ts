/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      api: '/src/api',
      app: '/src/app',
      components: '/src/components',
      styles: '/src/styles',
      "redux-store": '/src/redux-store',
      sources: '/src/sources',
      tests: '/src/tests',
      webroot: '/src/webroot'
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
    },
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/tests-e2e/**'
    ]
  },
  build: {
    outDir: './build',
    emptyOutDir: true
  }
});