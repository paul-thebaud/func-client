import { resolve } from 'path';
import { BuildOptions, defineConfig } from 'vite';

type LibFormat = 'es' | 'cjs' | 'umd';

const libChunks = [
  { name: 'core', dir: resolve(__dirname, 'src/core') },
  { name: 'fetch-json-api', dir: resolve(__dirname, 'src/fetch-json-api') },
];

const makeLibOptions = (format: LibFormat) => ({
  entry: resolve(__dirname, 'src/func-model.ts'),
  formats: [format],
  fileName: 'func-model',
  name: 'FuncModel',
});
const makeRollupOptions = (ext: 'js' | 'cjs') => ({
  output: {
    chunkFileNames: '[name]',
    manualChunks(id: string) {
      if (id.endsWith('func-model.ts')) {
        return 'func-model';
      }

      const libModule = libChunks.find((m) => id.startsWith(m.dir));
      if (libModule) {
        return `${libModule.name}.${ext}`;
      }

      throw new Error(`missing lib module config for ${id}`);
    },
  },
});

const buildFormats = {
  es: {
    lib: makeLibOptions('es'),
    rollupOptions: makeRollupOptions('js'),
  } as BuildOptions,
  cjs: {
    lib: makeLibOptions('cjs'),
    rollupOptions: makeRollupOptions('cjs'),
  } as BuildOptions,
  umd: {
    lib: makeLibOptions('umd'),
  } as BuildOptions,
};


const buildFormat = process.env.BUILD_FORMAT as LibFormat | undefined;
const buildConfig = buildFormat && buildFormats[buildFormat];
if (!buildConfig) {
  throw new Error('vite build must be called with BUILD_FORMAT env set to `es` or `umd`');
}

export default defineConfig({
  build: {
    minify: false,
    sourcemap: true,
    emptyOutDir: false,
    lib: buildConfig.lib,
    rollupOptions: buildConfig.rollupOptions,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
