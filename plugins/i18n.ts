import { COOKIE_KEYS } from 'seed-core';

import { getRunTypeConfig } from '@/configs/runtime/run-type';
import type { PublicRunTypeModel } from '@/types/run-type/PublicRunTypeModel';
import { useNuxtApp } from '#app';

export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp();
  // called right after a new locale has been set
  nuxtApp.hook('i18n:localeSwitched', ({ newLocale }: { newLocale: string }) => {
    const config = useRuntimeConfig();
    const RUN_TYPE = config.public.runTypeConfig.RUN_TYPE || 'live';
    const { SEED_CORE }: PublicRunTypeModel = getRunTypeConfig(RUN_TYPE);

    const localeCookie = useCookie(COOKIE_KEYS.LOCALE || '', { domain: SEED_CORE?.DOMAIN });
    const upperCaseI18nLocale = newLocale.toUpperCase();
    if (upperCaseI18nLocale !== localeCookie.value?.toUpperCase()) {
      // GNB it is uppercase to set locale on cookie
      localeCookie.value = upperCaseI18nLocale;
    }
  });
});
