import { isMobileSdk } from '@utils/mobileSDK';
import { COOKIE_KEYS, DependencyInjectId, UseContext } from 'seed-core';

import { getRunTypeConfig } from '@/configs/runtime/run-type';
import { type MobileSDKResultModel, MobileSDKService } from '@/services/mobileSDK/mobileSDKService';
import { getGDSInfor } from '@/utils/GDSUtil';
import { parseJwt } from '@/utils/ParseJwt';

import type { PublicRunTypeModel } from '../types/run-type/PublicRunTypeModel';

export default defineNuxtPlugin(async () => {
  const nuxtApp = useNuxtApp();
  const config = useRuntimeConfig();
  const RUN_TYPE = config.public.runTypeConfig.RUN_TYPE || 'live';
  const { SEED_CORE, API_BASE_URL }: PublicRunTypeModel = getRunTypeConfig(RUN_TYPE);

  const useContext = await UseContext(SEED_CORE || {});
  const { authService, axiosService } = useContext;

  axiosService.setCommonHeader(getGDSInfor());
  const { checkRefreshToken, authenticateByToken } = authService;

  const { initializeJSBridge, authenticateForMobileSdk } = MobileSDKService();

  const accessToken = useCookieWithDomain(COOKIE_KEYS.ACCESS_TOKEN || '');
  const refreshToken = useCookieWithDomain(COOKIE_KEYS.REFRESH_TOKEN || '');
  const accessExpiredCheck = useCookieWithDomain(COOKIE_KEYS.ACCESS_EXPIRED_CHECK || '');

  await authenticateByToken(
    accessToken.value || '',
    accessExpiredCheck.value || '',
    refreshToken.value || ''
  );

  if (isMobileSdk()) {
    await initializeJSBridge();
    const authMobileSDK: MobileSDKResultModel = await authenticateForMobileSdk();
    const token = authMobileSDK?.value?.token;
    const refresh = authMobileSDK?.value?.refresh_token;
    await authenticateByToken(token, accessExpiredCheck.value || '', refresh);

    const accessToken = useCookie(COOKIE_KEYS.ACCESS_TOKEN || '', {
      domain: SEED_CORE?.DOMAIN
    });
    accessToken.value = token;
  }

  const autoRefreshToken = (accessToken: string) => {
    if (process.client && accessToken) {
      const accessTokenExpireTime = parseJwt(accessToken || '')?.expire_time;
      const currentTime = new Date().getTime();
      const gapTime = Math.abs(currentTime - accessTokenExpireTime);
      const safeMargin = (gapTime * 5) / 100;
      const refreshTime = gapTime - safeMargin;

      setTimeout(async () => {
        const newToken = await checkRefreshToken();
        if (!newToken) {
          const url = useRequestURL(); // Get the current URL path
          const redirectUrlParams : string = `${API_BASE_URL}/login/onstove/callback?originalRedirect=${url}`;
          const redirectUrl: string = `${SEED_CORE?.AUTH_URL}/login?redirect_url=${redirectUrlParams}`;
          authService.logout(redirectUrl);
        } else {
          await autoRefreshToken(newToken?.accessToken || '');
        }
      }, refreshTime);
    }
  };

  autoRefreshToken(accessToken.value || '');
  nuxtApp.provide(DependencyInjectId.ContextCore, useContext);
});
