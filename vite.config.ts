import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      entry: {
        'core': resolve(__dirname, 'src/core.ts'),
        'plugins/fetch-json-api': resolve(__dirname, 'src/plugins/fetch-json-api.ts'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
