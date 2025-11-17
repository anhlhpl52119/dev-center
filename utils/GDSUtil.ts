import type { CommonHeaderModel } from 'seed-core';

import { getRuntimeOptions } from '@/configs/runtime';
import { COOKIE_KEYS } from '@/constants/Cookie';
import type { PublicRunTypeModel } from '@/types/run-type/PublicRunTypeModel';

/**
 * Get General Data Storage Information
 * @returns {CommonHeaderModel} General data storage information
 */
export const getGDSInfor = (): CommonHeaderModel => {
  const RUN_TYPE : string = process.env.RUN_TYPE || 'dev';
  const runTypeConfig : PublicRunTypeModel = getRuntimeOptions({ RUN_TYPE }).public.runTypeConfig;
  const { SEED_CORE } = runTypeConfig;
  return {
    nation: useCookie(COOKIE_KEYS.REGULATION || '', { domain: SEED_CORE?.DOMAIN }).value || '',
    timezone: useCookie(COOKIE_KEYS.TIMEZONE || '', { domain: SEED_CORE?.DOMAIN }).value || '',
    utcOffset: useCookie(COOKIE_KEYS.UTC_OFFSET || '', { domain: SEED_CORE?.DOMAIN }).value || null,
    lang: useCookie(COOKIE_KEYS.LANGUAGE || '', { domain: SEED_CORE?.DOMAIN }).value || ''
  };
};
