import { resolve } from 'path';
import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dtsPlugin({ outputDir: 'dist' }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'func-model',
      name: 'FuncModel',
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
