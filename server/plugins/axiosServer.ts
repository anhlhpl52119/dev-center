import { getCookie, H3Event } from 'h3';
import type { NitroApp } from 'nitropack';
import type { CommonHeaderModel } from 'seed-core';
import { AxiosServer, COOKIE_KEYS } from 'seed-core';

import { getRunTypeConfig } from '@/configs/runtime/run-type';
import type { PublicRunTypeModel } from '@/types/run-type/PublicRunTypeModel';

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const config = useRuntimeConfig();
  const RUN_TYPE = config.public.runTypeConfig.RUN_TYPE || 'dev';
  const { SEED_CORE }: PublicRunTypeModel = getRunTypeConfig(RUN_TYPE);

  // @ts-ignore:next-line
  nitroApp.hooks.hook('request', (event: H3Event) => {
    const axiosServer = AxiosServer(SEED_CORE);
    const accessToken = getCookie(event, COOKIE_KEYS.ACCESS_TOKEN || '');
    const accessExpiredCheck = getCookie(event, COOKIE_KEYS.ACCESS_EXPIRED_CHECK || '');
    const commonHeader: CommonHeaderModel = {
      nation: getCookie(event, COOKIE_KEYS.REGULATION || '') || '',
      timezone: getCookie(event, COOKIE_KEYS.TIMEZONE || '') || '',
      utcOffset: getCookie(event, COOKIE_KEYS.UTC_OFFSET || '') || null,
      lang: getCookie(event, COOKIE_KEYS.LANGUAGE || '') || ''
    };
    if (accessToken && accessExpiredCheck) {
      axiosServer.setAccessToken(accessToken || '');
    }
    axiosServer.setCommonHeader(commonHeader);
    event.context.axiosServer = axiosServer;
  });
});
