import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      entry: {
        'core': resolve(__dirname, 'src/core.ts'),
        'fetch-json-api': resolve(__dirname, 'src/fetch-json-api.ts'),
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
