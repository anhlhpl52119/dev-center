import type { ConfigModel } from 'seed-core';

export interface LocaleI18n {
  [locale: string]: string;
}

// export interface GNBLocale {
//   value: string;
//   label: string;
// }
export interface PublicRunTypeModel {
  APP_ID?: string;
  APP_PUBLISH_VER?: string;
  API_BASE_URL?: string;
  SEED_CORE?: ConfigModel;
  SITE_URL: string;
  SITE_NAME: string;
  GNB_SCRIPT?: string;
  // GNB_LANGUAGES?: Array<GNBLocale>;
  LOCALE_DOMAIN?: Record<string, string>;
  TIMEOUT_DELAY_LOCALE?: number; // unit milliseconds
  RUN_TYPE?: string;
  BI_LOG_SCRIPT_SRC: string;
  SENTRY_DSN?: string;
  SENTRY_AUTH_TOKEN?: string;
  SENTRY_PROJECT_NAME?: string;
  TRANSLATION_BASE_URL?: string;
  TRANSLATION_FOLDER_NAME?: string;
  TRANSLATION_FILE_NAME?: string;
  SENTRY_ORG?: string;
  SENTRY_URL?: string;
  I18N_SEED?: LocaleI18n;
  WIKI_JS_KEY?: string;
  PREFIX_I18N?: boolean;
}
