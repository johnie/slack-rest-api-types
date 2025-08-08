// vitest.config.ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./tests/setup.ts'],

    typecheck: {
      enabled: true,
      checker: 'tsc',
      tsconfig: './tsconfig.json',
      include: ['tests/**/*-d.ts'],
      ignoreSourceErrors: false,
      spawnTimeout: 10_000,
    },
  },
});
