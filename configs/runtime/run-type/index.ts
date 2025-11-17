import type { PublicRunTypeModel } from '@/types/run-type/PublicRunTypeModel';

import dev from './dev';
import dev2 from './dev2';
import live from './live';
import qa from './qa';
import qa2 from './qa2';
import sandbox from './sandbox';

type RunTypeObject = Record<string, PublicRunTypeModel>;

const configs: RunTypeObject = {
  dev,
  dev2,
  qa,
  qa2,
  sandbox,
  live
};

/**
 * Retrieve variable values based on the RUN_TYPE environment
 *
 * @param {string} runType
 * @param {string} [defaultRunType="pc"]
 * @returns {PublicRunTypeModel}
 */
const getRunTypeConfig = (runType: string, defaultRunType: string = 'live'): PublicRunTypeModel => {
  return configs[runType] || configs[defaultRunType] || {};
};

export { getRunTypeConfig };
