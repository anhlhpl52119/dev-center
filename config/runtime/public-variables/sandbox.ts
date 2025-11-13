import type { PublicRuntimeConfig } from 'nuxt/schema';

export const sandbox: PublicRuntimeConfig = {
  runType: 'sandbox',
  defaultLocale: 'ko',
  apiBaseUrl: 'https://admin-developers-api.gate8.com',
  callerId: '',
  siteUrl: 'https://developers-sandbox.onstove.com',
};
