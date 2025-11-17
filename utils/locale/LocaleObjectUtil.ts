import type { DefineLocaleMessage } from '@nuxtjs/i18n/dist/runtime/composables';
import deepMerge from 'deepmerge';
import { axios } from 'seed-core';

import { getRunTypeConfig } from '../../configs/runtime/run-type/index';
import type { PublicRunTypeModel } from '../../types/run-type/PublicRunTypeModel';
import { localeMessageDefault } from './LocaleUtil';

const RUN_TYPE = process.env.RUN_TYPE || 'live';
const { I18N_SEED }: PublicRunTypeModel = getRunTypeConfig(RUN_TYPE);

/**
 * Merge the seed-data locale file + the CDN locale file + default...
 * @param {string} locale
 * @return {Promise<{}>} JSON of all locale folder
 */
const getLocalFromCDN = async (locale: string): Promise<{}> => {
  const cdnLink = I18N_SEED?.[locale] ?? '';
  const { data } = await axios.get(cdnLink);
  return data;
};

/**
 * Merge the seed-data locale file + the CDN locale file + default + custom...
 * Custom contains specific translations for the project Dev Center
 * @param {string} locale
 * @param {DefineLocaleMessage} apiData Locale messages from the CDN
 * @return {Promise<DefineLocaleMessage>} Locale messages merge from seed-universal, cdn, and default.
 */
const mergeData = async (
  locale: string,
  apiData: DefineLocaleMessage
): Promise<DefineLocaleMessage> => {
  try {
    const componentJsonData: {} = await getLocalFromCDN(locale);
    const customJsonData: {} = (await import(`../../i18n/custom/${locale}.ts`)).default;
    return deepMerge.all<DefineLocaleMessage>([apiData, localeMessageDefault, componentJsonData, customJsonData]);
  } catch (e) {
    console.info(`No ${locale} language was included in the seed`);
  }
  return apiData;
};

/**
 * Flatten data
 * @async
 * @param {DefineLocaleMessage} obj
 * @param {string} [prefix='']
 * @returns {Promise<DefineLocaleMessage>}
 */
const nestingToFlatten = async (
  obj: DefineLocaleMessage,
  prefix: string = ''
): Promise<DefineLocaleMessage> => {
  const result: DefineLocaleMessage = {};

  await Promise.all(
    Object.keys(obj).map(async (cur: string) => {
      const pre = prefix ? `${prefix}.` : '';
      if (typeof obj[cur] === 'object') {
        const nestedResult = await nestingToFlatten(obj[cur] as DefineLocaleMessage, pre + cur);
        Object.assign(result, nestedResult);
      } else {
        result[pre + cur] = obj[cur];
      }
    })
  );

  return result;
};

export { mergeData, nestingToFlatten };
