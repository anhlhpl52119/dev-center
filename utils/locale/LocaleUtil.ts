import type { DefineLocaleMessage } from '@nuxtjs/i18n/dist/runtime/composables';

import { getRunTypeConfig } from '../../configs/runtime/run-type';
import { DEFAULT_COVERAGES } from '../../constants/Locale';
import type { PublicRunTypeModel } from '../../types/run-type/PublicRunTypeModel';

/**
 * Generate the CDN locale link for the specified locale.
 *
 * @param {string} locale - The locale for which to generate the CDN link.
 * @returns {string} The generated CDN link for the specified locale.
 */
const generateCDNLocaleLink = (locale: string): string => {
  let RUN_TYPE = process.env.RUN_TYPE || 'live';

  // In client-side rendering process, process.env is not accessible, so we have to use runtime config
  if (process.client) {
    const runtimeConfig = useRuntimeConfig();
    RUN_TYPE = runtimeConfig.public.runTypeConfig.RUN_TYPE || 'live';
  }

  const runTypeConfig: PublicRunTypeModel = getRunTypeConfig(RUN_TYPE);

  const baseUrl: string = runTypeConfig.TRANSLATION_BASE_URL || '';
  const folderName: string = runTypeConfig.TRANSLATION_FOLDER_NAME || '';
  const fileName: string = runTypeConfig.TRANSLATION_FILE_NAME || '';
  const pathFolder: string = folderName.replace('{locale}', locale);
  const pathFile: string = fileName.replace('{locale}', locale);
  return `${baseUrl}/${pathFolder}/${pathFile}`;
};

const cdnLocalesMap = (): Record<string, string> => {
  const cdnLocales: Record<string, string> = {};

  for (const locale of DEFAULT_COVERAGES) {
    const cdn = generateCDNLocaleLink(locale);
    cdnLocales[locale] = cdn;
  }

  return cdnLocales;
};

/**
 * Return an array of strings, whose value is the list of supported languages.
 * It is configured in runtimerunTypeConfig.LOCALE_DOMAIN
 * @return {string[]} An array of the list of supported language, Ex: ['ko', 'en', 'vi'...]
 */
const getAllLocale = (): string[] => Object.keys(cdnLocalesMap());

/**
 * Return default set of locale messages with their corresponding language names.
 * @return {DefineLocaleMessage} returns an object, where the keys represent language/locale codes (such as 'de', 'en', 'fr'...)
 * and the corresponding values represent the display names of those languages (such as 'Deutsch', 'English (US)', 'Français'...)
 */
const localeMessageDefault: DefineLocaleMessage = {
  de: 'Deutsch',
  ko: '한국어',
  pt: 'Português (BR)',
  th: 'ภาษาไทย',
  'zh-tw': '中文 (繁體)',
  ja: '日本語',
  en: 'English (US)',
  it: 'Italiano',
  fr: 'Français',
  es: 'Español (LA)',
  ru: 'Russian - русский',
  vi: 'Tiếng Việt',
  'zh-cn': 'Chinese (Traditional) - 中文（繁體)',
  id: 'Indonesian - Indonesia'
};

export { cdnLocalesMap, getAllLocale, localeMessageDefault };
