import type { PublicRuntimeConfig } from 'nuxt/schema';

export const dev: PublicRuntimeConfig = {
  runType: 'dev',
  defaultLocale: 'ko',
  apiBaseUrl: 'https://developers-vulcanus-api-dev.onstove.com',
  callerId: '',
  siteUrl: 'https://developers-vulcanus-dev.onstove.com',
};
