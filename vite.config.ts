import { resolve } from 'path';
import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dtsPlugin(),
  ],
  build: {
    minify: false,
    lib: {
      entry: {
        'model-dot': resolve(__dirname, 'src/core/index.ts'),
        'model-dot.extensions.json-api': resolve(__dirname, 'src/extensions/json-api/index.ts'),
      },
      fileName: (format, name) => `${name}.${format === 'es' ? 'js' : 'cjs'}`,
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
