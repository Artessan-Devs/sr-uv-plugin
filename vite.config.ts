import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/semantic-release-pyproject.ts',
      name: 'SemanticReleasePyproject',
      fileName: 'index',
      formats: ['cjs']
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: [
        'fs',
        'path',
        '@iarna/toml'
      ],
      output: {
        format: 'cjs',
        exports: 'auto'
      }
    }
  },
  plugins: [dts({ insertTypesEntry: true })]
});
