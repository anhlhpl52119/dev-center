import type { PublicRuntimeConfig } from 'nuxt/schema';

export const live: PublicRuntimeConfig = {
  runType: 'live',
  defaultLocale: 'ko',
  apiBaseUrl: 'https://admin-developers-api.onstove.com',
  callerId: '',
  siteUrl: 'https://developers.onstove.com',
};
