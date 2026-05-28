import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/__tests__/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@ethosagent/types': resolve(__dirname, '../ethos/packages/types/src/index.ts'),
      '@ethosagent/plugin-sdk/tool-helpers': resolve(
        __dirname,
        '../ethos/packages/plugin-sdk/src/tool-helpers.ts',
      ),
      '@ethosagent/plugin-sdk/testing': resolve(
        __dirname,
        '../ethos/packages/plugin-sdk/src/testing.ts',
      ),
      '@ethosagent/plugin-sdk': resolve(__dirname, '../ethos/packages/plugin-sdk/src/index.ts'),
      '@ethosagent/core': resolve(__dirname, '../ethos/packages/core/src/index.ts'),
    },
  },
});
