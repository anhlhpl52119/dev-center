import type { NuxtI18nOptions, Strategies } from '@nuxtjs/i18n/dist/module';
import type { Locale } from '@nuxtjs/i18n/dist/runtime/composables';

import { DEFAULT_COVERAGES, DEFAULT_LOCALE, DEFAULT_LOCALES, LANG_DIR } from '../constants/Locale';
import { LocaleStrategiesPrefix } from '../enum/i18n/LocaleStrategiesPrefix';
import type { LocaleObjectModel } from '../types/locale/LocaleObjectModel';

const getI18n = () : NuxtI18nOptions => {
  const STRATEGY: Strategies = LocaleStrategiesPrefix.PREFIX;
  const DEFAULT_COVERAGES_SET: LocaleObjectModel[] = DEFAULT_COVERAGES.map((code: Locale) => ({
    code,
    file: `${code}.ts`,
    name: DEFAULT_LOCALES[code]?.name ?? code,
    iso: DEFAULT_LOCALES[code]?.iso ?? code
  }));

  return {
    strategy: STRATEGY,
    defaultLocale: DEFAULT_LOCALE,
    detectBrowserLanguage: false,
    locales: DEFAULT_COVERAGES_SET,
    lazy: true,
    langDir: LANG_DIR,
    compilation: {
      strictMessage: false,
      escapeHtml: true
    },
    debug: false
  };
};

export { getI18n };
