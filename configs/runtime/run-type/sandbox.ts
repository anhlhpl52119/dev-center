export default {
  APP_ID: 'stove-sandbox',
  APP_PUBLISH_VER: '0.0.1',
  RUN_TYPE: 'sandbox',
  API_BASE_URL: 'https://developers-vulcanus-api.gate8.com',
  SITE_URL: 'https://developers-vulcanus.gate8.com',
  SITE_NAME: 'Stove Developers',
  SEED_CORE: {
    AUTH_URL: 'https://accounts.gate8.com',
    SESSION_URL: 'https://auth.gate8.com',
    MEMBER_URL: 'https://member.gate8.com',
    DOMAIN: '.gate8.com',
    API_URL: 'https://api.gate8.com',
    ENABLE_CORS: true,
    ENABLE_GDS: true,
    CAllER_ID: 'caller-id'
  },
  GNB_SCRIPT: 'https://js-cdn.gate8.com/libs/common-gnb/6.11.11/cp-header.js',
  // GNB_LANGUAGES: [
  //   { value: 'ko', label: '한국어' },
  //   { value: 'en', label: 'English' },
  //   { value: 'ja', label: '日本語' }
  // ],
  ONSTOVE_COOKIE_DOMAIN: '.gate8.com',
  BI_LOG_SCRIPT_SRC: 'https://dvudc0gwzz5wc.cloudfront.net/v3.1/dev/svc_81plug.min.js',
  /**
   * Maximum wait time(unit milliseconds) to fetch resource data from the CDN for i18n.
   */
  TIMEOUT_DELAY_LOCALE: 2000,
  TRANSLATION_BASE_URL: 'https://d2eq8hyjn4yxr6.cloudfront.net/dev/application_no/resource',
  TRANSLATION_FOLDER_NAME: '222-json-sim_front_dev_{locale}-0.0.1',
  TRANSLATION_FILE_NAME: '222-json-sim_front_dev_{locale}-0.0.1.json',
  SENTRY_DSN: 'https://75c79c5c61114187a38b184ccbf48d65@sentry.onstove.com/49',
  SENTRY_PROJECT_NAME: 'developer-center',
  SENTRY_AUTH_TOKEN: 'db09f8fc6d184175878fbeaefb01151c18d9141adea84f9194b27e91f51c4b03',
  SENTRY_ORG: 'smilegate-sentry',
  SENTRY_URL: 'https://sentry.onstove.com',
  I18N_SEED: {
    fr: 'https://d2x8kymwjom7h7.cloudfront.net/sandbox/application_no/STATIC/seed-locale/base/fr.json',
    it: 'https://d2x8kymwjom7h7.cloudfront.net/sandbox/application_no/STATIC/seed-locale/base/it.json',
    de: 'https://d2x8kymwjom7h7.cloudfront.net/sandbox/application_no/STATIC/seed-locale/base/de.json',
    pt: 'https://d2x8kymwjom7h7.cloudfront.net/sandbox/application_no/STATIC/seed-locale/base/pt.json',
    id: 'https://d2x8kymwjom7h7.cloudfront.net/sandbox/application_no/STATIC/seed-locale/base/id.json',
    vi: 'https://d2x8kymwjom7h7.cloudfront.net/sandbox/application_no/STATIC/seed-locale/base/vi.json',
    th: 'https://d2x8kymwjom7h7.cloudfront.net/sandbox/application_no/STATIC/seed-locale/base/th.json',
    es: 'https://d2x8kymwjom7h7.cloudfront.net/sandbox/application_no/STATIC/seed-locale/base/es.json',
    en: 'https://d2x8kymwjom7h7.cloudfront.net/sandbox/application_no/STATIC/seed-locale/base/en.json',
    ja: 'https://d2x8kymwjom7h7.cloudfront.net/sandbox/application_no/STATIC/seed-locale/base/ja.json',
    ko: 'https://d2x8kymwjom7h7.cloudfront.net/sandbox/application_no/STATIC/seed-locale/base/ko.json',
    'zh-tw':
      'https://d2x8kymwjom7h7.cloudfront.net/sandbox/application_no/STATIC/seed-locale/base/zh-tw.json',
    'zh-cn':
      'https://d2x8kymwjom7h7.cloudfront.net/sandbox/application_no/STATIC/seed-locale/base/zh-cn.json'
  },
  WIKI_JS_KEY: 'onstove',
  PREFIX_I18N: true
};
