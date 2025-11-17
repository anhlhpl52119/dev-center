import { DEFAULT_COVERAGES } from '@/constants/Locale';
import type { LNBModel } from '@/types/pages/DocModel';

import { removeLocalePrefix } from './path/PathUtil';

export const getGNBOption = (renderGnbMyInfo: Function, localeValue: string, loginRedirectUrlByGnbValue: string) => {
  return {
    wrapper: '#generateGNBScript',
    isResponsive: true,
    skin: 'gnb-default',
    isMiniSizeStoveLogo: false,
    logArea: 'stove',
    stoveLogo: {
      use: false,
      url: '/'
    },
    serviceLogo: '',
    widget: {
      notification: false,
      gameListAndService: false,
      totalMenu: false,
      customArea: {
        template: '',
        eventHandler: null
      }
    },
    notice: {
      customNoticeType: []
    },
    userMenu: {
      myProfile: true,
      myCash: false,
      note: false,
      myInfo: false,
      userGameInfo: false,
      timeline: false,
      message: false,
      coupon: false,
      userPresentList: false,
      secuSetting: false,
      customerCenter: false,
      reportCenter: false,
      logout: false,
      notification: false,
      customArea: {
        template: null,
        eventHandler: renderGnbMyInfo
      }
    },
    global: {
      useGds: true,
      languageCoverages: DEFAULT_COVERAGES,
      defaultSelectedLanguage: localeValue,
      onChangeLanguage: ''
    },
    defaultLocale: {
      nation: '',
      lang: localeValue,
      timezone: '',
      utc_offset: '',
      locale: localeValue
    },
    withDrawRedirect: true,
    loginMethod: {
      redirectCurrentPage: false,
      params: {
        redirect_url: loginRedirectUrlByGnbValue
      },
      target: undefined
    }
  };
};

export const isCurrentNavItemOrDirectChild = (pageTreeModel: LNBModel, currentUrl: string) => {
  const href = pageTreeModel.href;
  const decodedCurrentUrl = removeLocalePrefix(decodeURIComponent(currentUrl));

  return pageTreeModel.children?.length && (decodedCurrentUrl === href || (decodedCurrentUrl !== href && decodedCurrentUrl.startsWith(href)));
};
