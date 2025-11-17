import type { NuxtApp } from '#app';

import { getLanguageFromDevice } from '../utils/LanguageUtil';

export interface LocaleConfig {
  device: string;
}
export const getLocaleConfig = (isServer: boolean, context: NuxtApp): LocaleConfig => ({
  device: getLanguageFromDevice(isServer, context)
});
