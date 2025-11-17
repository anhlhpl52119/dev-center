import fs from 'fs';
import path from 'path';
import type { Options as OptionsPrettier } from 'prettier';
import { format as formatPrettier } from 'prettier';
import parserBabel from 'prettier/parser-babel';

import prettierConfig from '../../prettier.config.js';
import { fetchAllI18nAtBuildtime } from '../../utils/locale/FetchI18nUtil.js';
import { mergeData, nestingToFlatten } from '../../utils/locale/LocaleObjectUtil.js';

/**
 * Create locale file(en.ts, ko.ts...) in i18n/fallback
 * This directory contains the locale files used as fallbacks when fetching locale messages from the CDN fails.
 * @param data locale resource data
 * @param locale locale code
 */
const createI18nFolderFallback = (data: string, locale: string) => {
  // prettier setting
  const parseData = formatPrettier(data, {
    ...(prettierConfig as OptionsPrettier),
    parser: 'babel',
    plugins: [parserBabel]
  });

  const dir = path.join(process.cwd(), 'i18n', 'fallback');

  // Create folder if folder does not exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const pathDir = path.join(dir, `${locale}.ts`);
  fs.writeFileSync(pathDir, parseData);
};

/**
 * Create locale file(en.ts, ko.ts...) in i18n/default folder
 * This directory is used to load locale messages at runtime.
 * If the loading process fails, it will load the messages from the i18n/fallback folder.
 * @param locale locale code
 */
const createI18nFolderDefault = (locale: string) => {
  const dir = path.join(process.cwd(), 'i18n', 'default');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write function fetch locale message from CDN
  const functionFetchLocale = functionFetchLocaleFromCDN(locale);

  const parseData = formatPrettier(functionFetchLocale, {
    ...(prettierConfig as OptionsPrettier),
    parser: 'babel',
    plugins: [parserBabel]
  });

  const pathDir = path.join(dir, `${locale}.ts`);
  fs.writeFileSync(pathDir, parseData);
};

const functionFetchLocaleFromCDN = (locale: string) => {
  return `import { getResourcesByLocale } from '@configs/locale/runtime';

  import localeMessages from '../fallback/${locale}';
  
  export default defineI18nLocale(async (locale: string) => {
    try {
      // Get resources by locale merge from CDN + seed-data + default locale
      return await getResourcesByLocale(locale);
    } catch (error) {
      /**
       * When an error occurs while fetching the resource
       * it will callback to use the file locally represented in the 'i18n/fallback' folder, which was generated at build-time.
       */
      return {
        ...localeMessages
      };
    }
  });`;
};

/**
 * Generate i18n resource files at build time
 * The structure includes: i18n/default folder, i18n/fallback
 * i18n/default folder -> contains a file to load locale messages from CDN (merged with seed-data) at run-time.
 * i18n/fallback -> if an error occurs when loading resources from CDN, it loads the locale message file corresponding to the one generated at build-time.
 */
export const buildI18n = async () => {
  // Get all multilingual resources from the CDN
  // When an error occurs during the fetch from the CDN, the application is immediately halted, and the error is thrown.
  const res = await fetchAllI18nAtBuildtime();

  for (const locale in res) {
    // Merge the seed-universal locale file with the CDN locale file
    const data = await mergeData(locale, res[locale]);
    // Convert the nested object to a flattened object
    const flattenData = await nestingToFlatten(data);

    // Create the locale file
    createI18nFolderFallback(`export default ${JSON.stringify(flattenData)}`, locale);
    createI18nFolderDefault(locale);
  }
};
