import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.test.js'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['tests/setup/test-setup.js'],
    testTimeout: 300000,
  }
})
