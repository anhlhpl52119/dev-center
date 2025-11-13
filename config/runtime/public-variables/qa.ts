import type { PublicRuntimeConfig } from 'nuxt/schema';

export const qa: PublicRuntimeConfig = {
  runType: 'qa',
  defaultLocale: 'ko',
  apiBaseUrl: 'https://developers-vulcanus-api-qa.onstove.com',
  callerId: '',
  siteUrl: 'https://developers-dev2.onstove.com',
};
