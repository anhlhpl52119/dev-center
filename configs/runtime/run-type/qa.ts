export default {
  APP_ID: 'stove-qa',
  APP_PUBLISH_VER: '0.0.1',
  RUN_TYPE: 'qa',
  API_BASE_URL: 'https://developers-vulcanus-api-qa.onstove.com',
  SITE_URL: 'https://developers-vulcanus-qa.onstove.com',
  SITE_NAME: 'Stove Developers',
  SEED_CORE: {
    AUTH_URL: 'https://accounts-qa.onstove.com',
    SESSION_URL: 'https://auth-qa.onstove.com',
    MEMBER_URL: 'https://member-qa.onstove.com',
    DOMAIN: '.onstove.com',
    API_URL: 'https://api-qa.onstove.com',
    ENABLE_CORS: true,
    ENABLE_GDS: true,
    CAllER_ID: 'caller-id'
  },
  GNB_SCRIPT: 'https://js-cdn-qa.onstove.com/libs/common-gnb/6.11.11/cp-header.js',
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
  TRANSLATION_BASE_URL: 'https://d2psesh1x3i95y.cloudfront.net/qa/application_no/resource',
  TRANSLATION_FOLDER_NAME: '222-json-sim_front_qa_{locale}-0.0.1',
  TRANSLATION_FILE_NAME: '222-json-sim_front_qa_{locale}-0.0.1.json',
  SENTRY_DSN: 'https://45678df0eed24128a4d0b58dcb81a3dd@sentry-dev.onstove.com/12',
  SENTRY_PROJECT_NAME: 'developer-center-dev',
  SENTRY_AUTH_TOKEN: '5b37ffb09e4b45989bb01ca61a2c006c5fa318cba0764c5b91c069fe3322953b',
  SENTRY_ORG: 'smilegate-sentry',
  SENTRY_URL: 'https://sentry-dev.onstove.com',
  I18N_SEED: {
    fr: 'https://d2psesh1x3i95y.cloudfront.net/qa/application_no/STATIC/seed-locale/base/fr.json',
    it: 'https://d2psesh1x3i95y.cloudfront.net/qa/application_no/STATIC/seed-locale/base/it.json',
    de: 'https://d2psesh1x3i95y.cloudfront.net/qa/application_no/STATIC/seed-locale/base/de.json',
    pt: 'https://d2psesh1x3i95y.cloudfront.net/qa/application_no/STATIC/seed-locale/base/pt.json',
    id: 'https://d2psesh1x3i95y.cloudfront.net/qa/application_no/STATIC/seed-locale/base/id.json',
    vi: 'https://d2psesh1x3i95y.cloudfront.net/qa/application_no/STATIC/seed-locale/base/vi.json',
    th: 'https://d2psesh1x3i95y.cloudfront.net/qa/application_no/STATIC/seed-locale/base/th.json',
    es: 'https://d2psesh1x3i95y.cloudfront.net/qa/application_no/STATIC/seed-locale/base/es.json',
    en: 'https://d2psesh1x3i95y.cloudfront.net/qa/application_no/STATIC/seed-locale/base/en.json',
    ja: 'https://d2psesh1x3i95y.cloudfront.net/qa/application_no/STATIC/seed-locale/base/ja.json',
    ko: 'https://d2psesh1x3i95y.cloudfront.net/qa/application_no/STATIC/seed-locale/base/ko.json',
    'zh-tw':
      'https://d2psesh1x3i95y.cloudfront.net/qa/application_no/STATIC/seed-locale/base/zh-tw.json',
    'zh-cn':
      'https://d2psesh1x3i95y.cloudfront.net/qa/application_no/STATIC/seed-locale/base/zh-cn.json'
  },
  WIKI_JS_KEY: 'onstove',
  PREFIX_I18N: true
};
