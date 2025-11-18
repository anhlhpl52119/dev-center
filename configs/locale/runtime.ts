import type { DefineLocaleMessage } from '@nuxtjs/i18n/dist/runtime/composables';

import { fecthI18nByLocaleAtRuntime, timeoutPromise } from '../../utils/locale/FetchI18nUtil';
import { mergeData, nestingToFlatten } from '../../utils/locale/LocaleObjectUtil';

const TIMEOUT_ERROR: string = 'i18n resource fetch timeout';

/**
 * Return an object of locale messages, merge from CDN + seed-data + default...
 * @param {string} locale The locale of localization
 * @return {Promise<DefineLocaleMessage | undefined>}  Return an object of locale messages, or throw an error if any occurs.
 */
export const getResourcesByLocale = async (
  locale: string
): Promise<DefineLocaleMessage | undefined> => {
  try {
    const res = await timeoutPromise<ReturnType<typeof fecthI18nByLocaleAtRuntime>>(
      fecthI18nByLocaleAtRuntime(locale),
      new Error(TIMEOUT_ERROR)
    );

    const data = await mergeData(locale, res);
    return await nestingToFlatten(data);
  } catch (e) {
    console.error(`I18en cdn of locale ${locale} resource download timeout..!`, e);
    throw e;
  }
};
