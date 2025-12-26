import type { NuxtConfig } from 'nuxt/schema';

export const typescript: NuxtConfig['nitro'] = {
  storage: {
    cache: {
      driver: 'fs',
      base: './.cache/markdown',
    },
  },
};
