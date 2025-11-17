import { DEFAULT_COVERAGES, DEFAULT_LOCALE } from '@constants/Locale';
import { IncomingMessage } from 'http';

import type { NuxtApp } from '#app';
/**
 * Retrieves the language from the user's device (browser) based on whether the code is executed on the server or the client (browser).
 * @param {boolean} isServer
 * @param {NuxtApp} context
 * @returns {string} a string value, which represents the locale
 * Ex: 'ko' or 'en'...
 */
export const getLanguageFromDevice = (isServer: boolean, context: NuxtApp): string => {
  return isServer
    ? getLanguageFromHeader(context?.ssrContext?.req)
    : getLanguageFromNavigator(window);
};

/**
 * Extracting the language from the request headers(server-side)
 * @param {IncomingMessage} req
 * @returns {string} a string value, which represents the locale
 * Ex: 'ko' or 'en'...
 */
export const getLanguageFromHeader = (req: IncomingMessage): string =>
  req?.headers?.['accept-language']?.split(',').shift() || DEFAULT_LOCALE;

/**
 * Extracting the language when executed in the browser(client-side)
 * @param window
 * @returns {string} a string value, which represents the locale
 * Ex: 'ko' or 'en'...
 */
export const getLanguageFromNavigator = (window: Window): string =>
  window.navigator.language || (window.navigator as any).userLanguage;

/**
 * Get the first part of a language code or locale.
 * @param {string} lang - The language code or locale to extract the first part from.
 * @returns {string} The first part of the language code or an empty string if 'lang' is not provided.
 * Ex: en-US -> 'en'
 */
export const getFirstLang = (lang: string = ''): string =>
  stripStartSlash(lang).split('-').shift()!;

/**
 * Remove leading slashes from a string.
 * @param {string} str - The string to remove leading slashes from.
 * @returns {string} The string with leading slashes removed or an empty string if 'str' is not provided.
 * Ex: /en-US -> en-US
 */
export const stripStartSlash = (str: string = ''): string => (str || '').replace(/^\//g, '');

/**
 * IETF Language Tag 형태의 코드는 동일 언어를 여러 국가에서 사용하고 있거나 중국어 간체 번체와 같이 구분이 필요한 경우에 대해서만 처리하고 있으며
 * 한국어나 일본어와 같이 단일 국가에서 사용되는 언어 코드는 ISO-639-1 코드만 처리 가능합니다.
 * http://jira.smilegate.net:8080/browse/COMMONWEB-14308
 * 국가별 언어처리
 * ex) ko-kr -> ko
 *     ja-jp -> jp
 *
 *     <예외>
 *     zh-tw -> zh-tw
 * @param language
 */
export const getNationalLanguage = (language: string): string => {
  const firstLang: string = getFirstLang(language);

  return firstLang === 'zh' ? language : firstLang;
};

/**
 * Retrieve the final language based on the following order of precedence:
 * url_prefix -> cookie -> device -> default locale
 * @param {string} urlLocale
 * @param {string} cookLocale
 * @param {string} deviceLocale
 * @returns {string} which is the locale present in the list of supported languages
 * Ex: 'ko' or 'en'...
 */
export const getFinalLanguage = (
  urlLocale: string,
  cookLocale: string,
  deviceLocale: string
): string => {
  urlLocale = getNationalLanguage(urlLocale);
  cookLocale = getNationalLanguage(cookLocale);
  deviceLocale = getNationalLanguage(deviceLocale);

  if (isIncludeInCoverages(urlLocale)) {
    return urlLocale;
  }
  if (isIncludeInCoverages(cookLocale)) {
    return cookLocale;
  }
  if (isIncludeInCoverages(deviceLocale)) {
    return deviceLocale;
  }
  return DEFAULT_LOCALE;
};

export const isIncludeInCoverages = (language: string): boolean =>
  DEFAULT_COVERAGES.includes(language);
