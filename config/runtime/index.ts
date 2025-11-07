import type { NuxtConfig, PublicRuntimeConfig } from 'nuxt/schema';
import { dev2 } from './public-variables/dev2';
import { live } from './public-variables/live';
import { sandbox } from './public-variables/sandbox';

const runType = process.env.RUN_TYPE || 'live';
const publicEnvConfig: Record<string, PublicRuntimeConfig> = {
  dev2,
  live,
  sandbox,
};

export const runtimeConfig: NuxtConfig['runtimeConfig'] = {
  public: publicEnvConfig[runType] || live,
};
