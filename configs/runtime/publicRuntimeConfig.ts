import type { PublicRunTimeModel } from '@/types/run-time/PublicRunTimeModel';

import type { RuntimeConfigParams } from '.';
import { getRunTypeConfig } from './run-type';

/**
 * Represents the values that you want to access from the server-side and client-side
 * @param {RuntimeConfigParams} {RUN_TYPE}
 * @returns {object}
 *
 * Here's an example, return `runTypeConfig` varibles, which contain a value for a public API(FIRE_BASE_API_KEY, TEST_BASE_API_KEY)...
 * @param isForceSentryOn
 */
const getPublicRuntimeConfig = ({ RUN_TYPE }: RuntimeConfigParams, isForceSentryOn?: boolean): PublicRunTimeModel => {
  return { runTypeConfig: getRunTypeConfig(RUN_TYPE), isForceSentryOn };
};

export { getPublicRuntimeConfig };
