import type { CookieKeys } from '@/types/CookieKeys';

export const COOKIE_KEYS: CookieKeys = {
  ACCESS_TOKEN: 'SUAT',
  REFRESH_TOKEN: 'SURT',
  SDK_ACCESS_TOKEN: 'authorization',
  SDK_REFRESH_TOKEN: 'authorizationr',
  // (구) 토큰
  HEADER: 'HD',
  PAYLOAD: 'PLD',
  SIGN: 'SIGN',
  OLD_REFRESH_TOKEN: 'RFT',

  FOREVER: 'FOREVER',
  LOCALE: 'LOCALE',
  LANGUAGE: 'PRM',
  NNTO: 'NNTO',
  COUNTRY: 'NNTO',
  TIMEZONE: 'TZ',
  UTC_OFFSET: 'TZ_OFFSET',
  COVERAGES: 'COVERAGES',
  UUID: 'sgs_da_uuid',
  ISSDK: 'ISSDK',
  REGULATION: 'REGULATION'
};
export const TIMER_REFRESH_TOKEN = 10 * 60 * 1000; // seconds
