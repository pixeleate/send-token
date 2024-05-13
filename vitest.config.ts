import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    exclude: [
      '**/.{idea,git,cache,output,temp}/**',
      '**/cypress/**',
      '**/dist/**',
      '**/node_modules/**',
      './test/pages/**',
    ],
    globals: true,
    setupFiles: './test/setup.ts',
  },
});
