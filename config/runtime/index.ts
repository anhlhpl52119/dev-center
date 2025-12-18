import type { NuxtConfig } from 'nuxt/schema';
import { dev } from './public-variables/dev';
import { dev2 } from './public-variables/dev2';
import { live } from './public-variables/live';
import { qa } from './public-variables/qa';
import { qa2 } from './public-variables/qa2';
import { sandbox } from './public-variables/sandbox';

const runType = process.env.RUN_TYPE || 'live';
const publicEnvConfig: Record<string, any> = {
  dev,
  dev2,
  qa,
  qa2,
  live,
  sandbox,
};

export const runtimeConfig: NuxtConfig['runtimeConfig'] = {
  public: publicEnvConfig[runType] || live,
};
