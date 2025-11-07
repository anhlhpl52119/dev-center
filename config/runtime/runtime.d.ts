/* Refer to https://nuxt.com/docs/4.x/guide/going-further/runtime-config#typing-runtime-config */
declare module 'nuxt/schema' {
  /* Secret run time config */
  interface RuntimeConfig {}

  /* Public runtime config */
  interface PublicRuntimeConfig {
    runType: 'dev2' | 'sandbox' | 'live';
    apiBaseUrl: string;
    defaultLocale: 'en' | 'ko';
    callerId: string;
    siteUrl: string;
  }
}

export {};
