export default {
  APP_ID: 'stove-dev',
  APP_PUBLISH_VER: '0.0.1',
  RUN_TYPE: 'dev2',
  API_BASE_URL: 'https://developers-vulcanus-api-dev2.onstove.com',
  SITE_URL: 'https://developers-dev2.onstove.com',
  SITE_NAME: 'Stove Developers',
  SEED_CORE: {
    AUTH_URL: 'https://accounts-dev.onstove.com',
    SESSION_URL: 'https://auth-dev.onstove.com',
    MEMBER_URL: 'https://member-dev.onstove.com',
    DOMAIN: '.onstove.com',
    API_URL: 'https://api-dev.onstove.com',
    ENABLE_CORS: false,
    ENABLE_GDS: true,
    CAllE4R_ID: 'caller-id'
  },
  GNB_SCRIPT: 'https://js-cdn-dev.onstove.com/libs/common-gnb/6.11.11/cp-header.js',
  // GNB_LANGUAGES: [
  //   { value: 'ko', label: '한국어' },
  //   { value: 'en', label: 'English' },
  //   { value: 'ja', label: '日本語' }
  // ],
  ONSTOVE_COOKIE_DOMAIN: '.onstove.com',
  BI_LOG_SCRIPT_SRC: 'https://dvudc0gwzz5wc.cloudfront.net/v3.1/dev/svc_81plug.min.js',
  /**
   * Maximum wait time(unit milliseconds) to fetch resource data from the CDN for i18n.
   */
  TIMEOUT_DELAY_LOCALE: 2000,
  TRANSLATION_BASE_URL: 'https://d2eq8hyjn4yxr6.cloudfront.net/dev/application_no/resource',
  TRANSLATION_FOLDER_NAME: '222-json-sim_front_dev_{locale}-0.0.1',
  TRANSLATION_FILE_NAME: '222-json-sim_front_dev_{locale}-0.0.1.json',
  SENTRY_DSN: 'https://34fd45e698864df4b8df85b28cb80953@sentry-dev.onstove.com/20',
  SENTRY_PROJECT_NAME: 'developer-center-dev',
  SENTRY_AUTH_TOKEN: '5b37ffb09e4b45989bb01ca61a2c006c5fa318cba0764c5b91c069fe3322953b',
  SENTRY_ORG: 'smilegate-sentry',
  SENTRY_URL: 'https://sentry-dev.onstove.com',
  I18N_SEED: {
    fr: 'http://d2eq8hyjn4yxr6.cloudfront.net/dev/application_no/STATIC/seed-locale/base/fr.json',
    it: 'http://d2eq8hyjn4yxr6.cloudfront.net/dev/application_no/STATIC/seed-locale/base/it.json',
    de: 'http://d2eq8hyjn4yxr6.cloudfront.net/dev/application_no/STATIC/seed-locale/base/de.json',
    pt: 'http://d2eq8hyjn4yxr6.cloudfront.net/dev/application_no/STATIC/seed-locale/base/pt.json',
    id: 'http://d2eq8hyjn4yxr6.cloudfront.net/dev/application_no/STATIC/seed-locale/base/id.json',
    vi: 'http://d2eq8hyjn4yxr6.cloudfront.net/dev/application_no/STATIC/seed-locale/base/vi.json',
    th: 'http://d2eq8hyjn4yxr6.cloudfront.net/dev/application_no/STATIC/seed-locale/base/th.json',
    es: 'http://d2eq8hyjn4yxr6.cloudfront.net/dev/application_no/STATIC/seed-locale/base/es.json',
    en: 'http://d2eq8hyjn4yxr6.cloudfront.net/dev/application_no/STATIC/seed-locale/base/en.json',
    ja: 'http://d2eq8hyjn4yxr6.cloudfront.net/dev/application_no/STATIC/seed-locale/base/ja.json',
    ko: 'http://d2eq8hyjn4yxr6.cloudfront.net/dev/application_no/STATIC/seed-locale/base/ko.json',
    'zh-tw':
      'http://d2eq8hyjn4yxr6.cloudfront.net/dev/application_no/STATIC/seed-locale/base/zh-tw.json',
    'zh-cn':
      'http://d2eq8hyjn4yxr6.cloudfront.net/dev/application_no/STATIC/seed-locale/base/zh-cn.json'
  },
  WIKI_JS_KEY: 'onstove',
  PREFIX_I18N: true
};
