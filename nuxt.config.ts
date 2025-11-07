import tailwindcss from '@tailwindcss/vite';
import { runtimeConfig } from './config/runtime';
import { typescript } from './config/typescript';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/app.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  imports: {
    dirs: ['constants'],
  },
  typescript,
  runtimeConfig,
});
