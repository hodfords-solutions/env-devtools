import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint2';
import dtsPlugin from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import terser from '@rollup/plugin-terser';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/app.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-router', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  resolve: {
    alias: {
      types: path.resolve(__dirname, 'lib/types'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  plugins: [
    react(),
    terser(),
    eslintPlugin(),
    libInjectCss(),
    dtsPlugin({ rollupTypes: true }),
  ],
});
