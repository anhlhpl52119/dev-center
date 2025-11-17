const noindex: { [key: string]: any } = {
  dev: { hid: 'robots', name: 'robots', content: 'noindex' },
  dev2: { hid: 'robots', name: 'robots', content: 'noindex' },
  qa: { hid: 'robots', name: 'robots', content: 'noindex' },
  qa2: { hid: 'robots', name: 'robots', content: 'noindex' },
  sandbox: { hid: 'robots', name: 'robots', content: 'noindex' },
  live: {}
};

export const getHead = (RUN_TYPE: string = 'dev') => {
  return {
    title: 'STOVE-스토브',
    meta: [
      { charset: 'utf-8' },
      { property: 'al:ios:url', content: 'mstove://' },
      { property: 'al:ios:app_store_id', content: '1342134971' },
      { property: 'al:ios:app_name', content: 'STOVE APP' },
      { property: 'al:android:url', content: 'mstove://' },
      { property: 'al:android:app_name', content: 'STOVE APP' },
      { property: 'al:android:package', content: 'com.stove.mstove.google' },
      { property: 'al:web:url', content: 'https://indie.onstove.com/' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'STOVE' },
      { property: 'og:locale', content: 'ko' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'google-site-verification', content: 'YAmnkL_CwVMvpzf7vfj8lhG_SKg1jU1qB8HVnTNTh30' },
      noindex[RUN_TYPE],
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'
      }
    ],
    link: [
      { rel: 'canonical', href: 'https://indie.onstove.com/' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  };
};

export const commonHead = () => {
  return {
    link: [{
      rel: 'stylesheet',
      href: 'https://d2x8kymwjom7h7.cloudfront.net/live/application_no/STATIC/common/stds-font-icon-v2/stds-font-icon.css'
    }]
  };
};
