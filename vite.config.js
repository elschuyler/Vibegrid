import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // This tells the builder to allow modern features like top-level await
    target: 'esnext',
    // Ensures the output is a clean module
    modulePreload: {
      polyfill: false
    }
  },
  // Ensures assets are handled correctly in the subfolder-heavy environment
  base: './'
});
