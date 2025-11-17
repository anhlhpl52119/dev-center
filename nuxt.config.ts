import tailwindcss from '@tailwindcss/vite';
import { runtimeConfig } from './config/runtime';
import { typescript } from './config/typescript';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  typescript,
  runtimeConfig,

  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/icon', '@nuxtjs/i18n', '@vueuse/nuxt', 'floating-vue/nuxt'],
  vite: { plugins: [tailwindcss()] },
  imports: {
    dirs: ['constants'],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        language: 'en',
        files: ['en/common.json'],
      },
      {
        code: 'ko',
        language: 'ko',
        name: 'Korean',
        files: ['ko/common.json'],
      },
    ],
    strategy: 'prefix',
    defaultLocale: 'ko',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'LOCALE',
    },
  },
  app: {
    head: {
      link: [{
        rel: 'stylesheet',
        href: 'https://d2x8kymwjom7h7.cloudfront.net/live/application_no/STATIC/common/stds-font-icon-v2/stds-font-icon.css',
      }],
    },
  },
  icon: {
    mode: 'css',
    cssLayer: 'base',
    customCollections: [
      {
        prefix: 'svg',
        dir: './app/assets/svg',
        recursive: true, // include all the icons in nested directories:
      },
    ],
  },
});
