import type { RunTimeConfig } from '@/types/run-time/RunTimeConfig';

import { getPublicRuntimeConfig } from './publicRuntimeConfig';

export interface RuntimeConfigParams {
  RUN_TYPE: string;
}

/**
 * Return config and environment variables to the Nuxt app context.
 *
 * @param {RuntimeConfigParams} { RUN_TYPE } RUN_TYPE - variable defines the build process for each environment in the script.
 * @returns {RunTimeConfig}
 *
 * To access runtimeConfig values within your application, you can use the `useRuntimeConfig` composable.
 * An example in pages/demo-config.vue, server/api/testRuntimeConfig.ts
 *
 * By default, these keys are only available server-side.
 * The keys within `runtimeConfig.public` are available client-side and server-side.
 *
 * Values are automatically replaced by matching env variables at runtime, e.g. setting an environment
 * variable `NUXT_API_SECRET_1, would overwrite the values in the example below.
 *
 * @example
 * ```js
 * export default {
 *  runtimeConfig: {
 *    apiSecret1: 'https://nuxtjs.org' // Only available server-side, can be overridden by NUXT_API_SECRET_1 environment variable
 *    public: {
 *      baseURL: '' // Accessible on both the client-side and the server side
 *    }
 *  }
 * }
 *```
 *
 * @param isForceSentryOn
 */
const getRuntimeOptions = ({ RUN_TYPE }: RuntimeConfigParams, isForceSentryOn?: boolean): RunTimeConfig => {
  return {
    /**
     * The keys within public are accessible on both the client-side and the server side
     */
    public: getPublicRuntimeConfig({ RUN_TYPE }, isForceSentryOn)
  };
};

export { getRuntimeOptions };
