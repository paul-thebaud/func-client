import { resolve } from 'path';
import { BuildOptions, defineConfig } from 'vite';

type LibFormat = 'es' | 'cjs' | 'umd';

const libChunks = [
  { name: 'core', dir: resolve(__dirname, 'src/core') },
  { name: 'json-api', dir: resolve(__dirname, 'src/json-api') },
  { name: 'blueprints', dir: resolve(__dirname, 'src/blueprints') },
];

const makeLibOptions = (format: LibFormat) => ({
  entry: resolve(__dirname, 'src/func-client.ts'),
  formats: [format],
  fileName: 'func-client',
  name: 'FuncClient',
});

const makeRollupOptions = (ext: 'js' | 'cjs') => ({
  output: {
    minifyInternalExports: false,
    chunkFileNames: '[name]',
    manualChunks(id: string) {
      if (id.endsWith('func-client.ts')) {
        return 'func-client';
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

let build = undefined;

const buildFormat = process.env.BUILD_FORMAT as LibFormat | undefined;
if (buildFormat) {
  const buildConfig = buildFormat && buildFormats[buildFormat];
  if (!buildConfig) {
    throw new Error('vite build must be called with BUILD_FORMAT env set to `es`, `cjs` or `umd`');
  }

  build = {
    minify: false,
    sourcemap: true,
    emptyOutDir: false,
    lib: buildConfig.lib,
    rollupOptions: buildConfig.rollupOptions,
  };
}

export default defineConfig({
  build,
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
