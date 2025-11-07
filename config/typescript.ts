import type { NuxtConfig } from 'nuxt/schema';

export const typescript: NuxtConfig['typescript'] = {
  tsConfig: {
    include: [
      '../config/**/*.ts', // relative path base on `.nuxt/tsconfig.app.json`
    ],
  },
};
