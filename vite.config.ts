/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({mode}) => {
  // The way for Vite to process our local .env variables
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: '/',
    resolve: {
      alias: {
        api: '/src/api',
        app: '/src/app',
        components: '/src/components',
        hooks: '/src/hooks',
        pages: '/src/pages',
        services: '/src/services',
        styles: '/src/styles',
        "redux-store": '/src/redux-store',
        sources: '/src/sources',
        tests: '/src/tests',
        webroot: '/src/webroot'
      }
    },
    server: {
      port: 3000,
      proxy: {
        '^/api/.*': {
          target: env.VITE_PROXY_TARGET,
          changeOrigin: true,
          secure: false,
        },
      },
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
    },
    assetsInclude: ['**/*.md']
  }
});
