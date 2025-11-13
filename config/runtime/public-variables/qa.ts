import type { PublicRuntimeConfig } from 'nuxt/schema';

export const qa: PublicRuntimeConfig = {
  runType: 'qa',
  defaultLocale: 'ko',
  apiBaseUrl: 'https://admin-developers-api-dev.onstove.com',
  callerId: '',
  siteUrl: 'https://developers-dev2.onstove.com',
};
