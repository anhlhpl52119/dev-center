import type { DefineLocaleMessage } from '@nuxtjs/i18n/dist/runtime/composables';
import { AxiosService, FormatResponse } from 'seed-core';

import { DEFAULT_COVERAGES, LOCALE_TIMEOUT_DELAY } from '../../constants/Locale';
import { cdnLocalesMap } from './LocaleUtil';

/**
 * Get all multilingual resources from the CDN at build-time to use build i18n folder
 * Using Axios instead of $fetch, useAsyncData, or useFetch composable in Nuxt
 * The reason is that these functions ($fetch, useAsyncData and useFetch) are only available in the setup function, plugins, and modules.
 * They are not accessible in the modules:before hook where you might need to perform data fetching.
 * When an error occurs during the fetch from the CDN, the application is immediately halted, and the error is thrown.
 * @return {Promise<Record<string, DefineLocaleMessage>>}
 */
export const fetchAllI18nAtBuildtime = async (): Promise<Record<string, DefineLocaleMessage>> => {
  const cdnLocalesResources = cdnLocalesMap();

  const allLocales: string[] = DEFAULT_COVERAGES;
  const { get } = AxiosService();

  /**
   * Return type of get()
   *
   * @template T - Type parameter for ResponseNormalization
   * @property {ResponseNormalization<T>} data - Data property of the response
   * @property {number} status - Status code of the response
   * @property {string} statusText - Status text of the response
   * @property {unknown} error - Error object if there's an error in the response
   * @property {AxiosRequestConfig} option - Axios request configuration
   */
  const resultsFetch = await Promise.allSettled(
    allLocales.map(async (locale: string) => {
      const res = await get(cdnLocalesResources[locale], {
        formatResponse: FormatResponse.Custom
      });

      return { res, locale };
    })
  );

  const resources: Record<string, DefineLocaleMessage> = {};
  resultsFetch.forEach((result: PromiseSettledResult<any>) => {
    if (result.status === 'fulfilled' && !result.value.res?.error && result.value.res?.data?.data) {
      resources[result.value.locale] = result.value.res?.data.data;
    } else {
      const errorMessage =
        result.status === 'rejected'
          ? result.reason ?? 'Unknown Error'
          : result.value?.res?.statusText ?? 'Unknown Error';

      throw new Error(`Failed to fetch i18n resources at buildtime ::: ${errorMessage}`);
    }
  });

  return resources;
};

/**
 * Get locale resources from the CDN for a specific locale at runtime
 * @param {string} locale
 * @return {Promise<DefineLocaleMessage>} Ready translated locale messages
 * Example
 * {
 *  message: {
 *    hello: 'hello world'
 *    }
 *  }
 */
export const fecthI18nByLocaleAtRuntime = async (locale: string): Promise<DefineLocaleMessage> => {
  const url: string = cdnLocalesMap()[locale];
  const data: DefineLocaleMessage = await $fetch<DefineLocaleMessage>(url);
  return data ?? {};
};

/**
 * Returns reject if the cdn i18n resource API request does not arrive within a certain period of time
 * @param {T} workPromise
 * @param {Error} timeoutError
 * @param {number} timeoutDelay
 */
export const timeoutPromise = async <T>(workPromise: T, timeoutError: Error) => {
  // const config = useRuntimeConfig();
  // const timeoutDelay = config.public.runTypeConfig.TIMEOUT_DELAY_LOCALE ?? LOCALE_TIMEOUT_DELAY;
  const timeoutDelay = LOCALE_TIMEOUT_DELAY;

  const i18nTimeout = new Promise<T>(
    (_resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: Error) => void) => {
      setTimeout(() => {
        reject(timeoutError);
      }, timeoutDelay);
    }
  );

  return await Promise.race([i18nTimeout, workPromise]);
};
