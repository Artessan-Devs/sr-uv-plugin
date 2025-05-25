import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/semantic-release-pyproject.ts',
      name: 'SemanticReleasePyproject',
      fileName: 'index',
      formats: ['cjs', 'es']
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: [
        'fs',
        'path',
        '@iarna/toml'
      ]
    }
  },
  plugins: [dts({ insertTypesEntry: true })]
});
