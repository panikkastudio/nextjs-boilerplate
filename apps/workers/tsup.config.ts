import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/index.ts'],
  platform: 'node',
  target: 'esnext',
  format: ['esm'],
  cjsInterop: true,
  legacyOutput: false,
  splitting: false,
  sourcemap: true,
  shims: true,
});
