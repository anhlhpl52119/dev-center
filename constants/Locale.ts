import type { Locale } from '@nuxtjs/i18n/dist/runtime/composables';

import type { LocaleObjectModel } from '../types/locale/LocaleObjectModel';

export const DEFAULT_LOCALE: Locale = 'ko';

export const LANG_DIR: string = './default';

export const DEFAULT_LOCALES: Record<string, LocaleObjectModel> = {
  ko: { code: 'ko', name: '한국어', iso: 'ko-KR' },
  // ja: { code: 'ja', name: '日本語', iso: 'ja' },
  en: { code: 'en', name: 'English (US)', iso: 'en-US' }
  // 'zh-tw': { code: 'zh-tw', name: '中文 (繁體)', iso: 'zh-TW' }, // Traditional
  // 'zh-cn': { code: 'zh-cn', name: '中文 (简体)', iso: 'zh-CN' } // Simplified
};
export const DEFAULT_COVERAGES: string[] = Object.keys(DEFAULT_LOCALES) as Locale[];
// export const DEFAULT_COVERAGES: string[] = getAllLocale();
// export const DEFAULT_COVERAGES: Locale[] = [
//   'en',
//   'ko',
//   'ja',
//   'zh-cn',
//   'zh-tw'
// ];

export const LOCALE_TIMEOUT_DELAY: number = 2000;
export const DEFAULT_TIMEZONE: string = 'Asia/Seoul';
