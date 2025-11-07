import tailwindcss from '@tailwindcss/vite';
import { runtimeConfig } from './config/runtime';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  typescript: {
    tsConfig: {
      include: [
        '../config/**/*.ts', // relative path base on `.nuxt/tsconfig.app.json`
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  imports: {
    dirs: ['constants'],
  },
  runtimeConfig,
});
