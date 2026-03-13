import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // This allows modern JS features 
    // like top-level await to compile
    target: 'esnext',
    outDir: 'dist'
  }
});
