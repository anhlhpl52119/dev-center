import { COOKIE_KEYS } from 'seed-core';

import { getRunTypeConfig } from '@/configs/runtime/run-type';
import type { PublicRunTypeModel } from '@/types/run-type/PublicRunTypeModel';

export default defineNuxtRouteMiddleware(() => {
  const config = useRuntimeConfig();
  const RUN_TYPE = config.public.runTypeConfig.RUN_TYPE || 'live';
  const { SEED_CORE }: PublicRunTypeModel = getRunTypeConfig(RUN_TYPE);

  const { locale } = useNuxtApp().$i18n;
  const upperCaseI18nLocale = locale.value.toUpperCase();
  const localeCookie = useCookie(COOKIE_KEYS.LOCALE || '', { domain: SEED_CORE?.DOMAIN });

  // GNB it is uppercase to set locale on cookie
  localeCookie.value = upperCaseI18nLocale;
});
