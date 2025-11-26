<template>
  <header class="gnb-wrapper-dev-center">
    <nav class="container gnb-inner-dev-center">
      <div class="flex-grow-1 stds-gnb-row-start gnb-custom">
        <div class="d-flex align-items-center">
          <NuxtLink
            :to="logoLink"
            class="flex-shrink-0 navbar-brand stds-logo-wrapper d-flex align-items-center text-decoration-none"
            aria-label="Stove developers logo"
          >
            <i class="d-none d-md-inline-block  ic-v2-stove-wordtype-fill stds-logo-img" role="img"></i>
            <i
              class="d-md-inline-block d-md-none ic-v2-stove-symbol-fill stds-logo-img stds-logo-img-mobile"
              role="img"
            ></i>
            <span class="d-inline-block stds-logo-text">버블리즈 가이드</span>
          </NuxtLink>

          <!--Start Expand search form-->
          <ClientOnly>
            <div ref="formSCExpandWrapperRef" class="form-search-expand-wrapper" :class="{ open: isExpandSearchWrapper }">
              <div class="form-search-box" role="search">
                <input
                  ref="inputSearchExpand"
                  v-model="keyword"
                  type="text"
                  :placeholder="t('search')"
                  aria-label="Search"
                  class="form-control form-search-query"
                  role="searchbox"
                  @keyup.enter="enterSearch"
                />
                <div class="form-search-ic left" role="button">
                  <button type="button" class="btn btn-search-expand btn-icon" @click="enterSearch">
                    <i class="ic-v2-navigation-search-line ic-search"></i>
                  </button>
                </div>
                <div class="form-search-ic right">
                  <button
                    v-show="keyword !== ''"
                    id="demoClearKeyword"
                    ref="btnClearKeywordGNBRef"
                    type="button"
                    class="btn btn-clear-search btn-icon"
                    @click="clearKeyword"
                  >
                    <i class="ic-v2-control-close-circle-fill"></i>
                  </button>
                  <button type="button" class="btn btn-close-search btn-icon" @click="collapseSearchForm">
                    <i class="ic-v2-control-close-line ic-close-search"></i>
                  </button>
                </div>
              </div>

              <div role="presentation" class="recent-search-list-wrapper">
                <template v-if="recDocSCHits.length">
                  <h6 class="recent-search-list-title">{{ t('recent') }}</h6>
                  <ul class="recent-search-list" role="listbox">
                    <li v-for="(item, idx) in recDocSCHits" :key="idx" class="recent-search-list-item" role="option">
                      <NuxtLink
                        :to="{
                          path: localePath('/common/search'),
                          query: {
                            q: item
                          }
                        }"
                        class="recent-search-list-item-title text-truncate-1 flex-grow-1 ms-auto"
                        @click="collapseSearchForm"
                      >
                        {{ item }}
                      </NuxtLink>
                      <button
                        type="button"
                        class="btn btn-icon btn-del-recent-search-item flex-shrink-0"
                        @click="deleteReSCItem(item)"
                      >
                        <i class="ic-v2-control-close-line ic-close-search"></i>
                      </button>
                    </li>
                  </ul>
                </template>
                <div v-else class="recent-search-list empty">
                  <div class="text">{{ t('no-recent-search') }}</div>
                </div>
              </div>
            </div>
          </ClientOnly>
          <!--End Expand search form-->

          <!--Start search-icon-form screen sizes < md-->
          <div class="d-md-none ms-auto">
            <button
              ref="inputSearchMobileRef"
              type="button"
              class="btn btn-link btn-search btn-icon"
              aria-label="Open Navigation menu Stove developers"
              @click="expandSearchForm"
            >
              <i class="ic-v2-navigation-search-line ic-search-less-md"></i>
            </button>
          </div>
          <!--End search-icon-form screen sizes < md-->

          <!--Start icon-menu-->
          <!--case display: xs-sm and users not-logged-in-->
          <div v-if="!isAuthentication" class="gnb-offcanvas-sm-wrapper not-login d-block d-md-none">
            <button
              type="button"
              class="btn btn-link btn-nav-toggle"
              aria-label="Open Navigation menu Stove developers"
              @click="showGNBMobile"
            >
              <i class="ic-v2-navigation-option-vertical-fill ic-search-mobile-not-login"></i>
            </button>

            <ClientOnly>
              <div
                class="offcanvas offcanvas-end"
                :class="{ show: isToggleOffcanvasGNB }"
                tabindex="-1"
                aria-labelledby="Navigation menu Stove developers"
              >
                <div class="offcanvas-header">
                  <div class="d-flex align-items-center offcanvas-header-info">
                    <i class="ic-v2-navigation-profile-fill ic-profile"></i>
                    <NuxtLink
                      :to="loginUrl"
                      class="link-blue link-offset-2 link-underline link-underline-opacity-0 link-underline-opacity-100-hover link-login-mobile"
                    >
                      <span :class="{'text-reset': locale === DEFAULT_LOCALES.en.code}">{{ t('login-txt1') }}</span>
                      <span :class="{'text-reset': locale === DEFAULT_LOCALES.ko.code}">{{ t('login-txt2') }}</span>
                    </NuxtLink>
                  </div>
                  <button
                    type="button"
                    class="btn btn-link btn-close-menu"
                    aria-label="Close Navigation menu Stove developers"
                    @click="closeGNBMobile"
                  >
                    <i class="ic-v2-control-close-line"></i>
                  </button>
                </div>
                <div class="offcanvas-body">
                  <div class="language-settings-wrapper">
                    <div class="gnb-custom-lang-title">
                      <div class="gnb-lang-title-label text-truncate-1">{{ t('language-settings') }}</div>
                      <ClientOnly>
                        <VDropdown v-if="isToggleOffcanvasGNB" v-model:shown="isShowLanguageMenus" distance="0" popperClass="v-popper--theme-dc-dropdown-menu language-settings-wrapper" placement="auto-end">
                          <button
                            type="button"
                            class="btn btn-link btn-language"
                            :class="{ active: isShowLanguageMenus }"
                            aria-expanded="false"
                          >
                            {{ currentLocaleName }}
                          </button>
                          <template #popper>
                            <ul
                              class="gnb-custom-lang-list-vdropdown"
                            >
                              <li v-for="(value, key) in DEFAULT_LOCALES" :key="key" class="gnb-custom-lang-item">
                                <a
                                  class="dropdown-item gnb-custom-lang-item-link"
                                  :class="{'is-active': key === locale}"
                                  href="#"
                                  @click.prevent.stop="clickChangeLocale(value.code)"
                                >
                                  {{ value.name }}
                                </a>
                              </li>
                            </ul>
                          </template>
                        </VDropdown>
                      </ClientOnly>
                    </div>
                  </div>
                </div>
              </div>
            </ClientOnly>

            <div v-if="isToggleOffcanvasGNB" class="offcanvas-backdrop fade show"></div>
          </div>
          <!--End icon-menu-->

          <!--Start menu list for screen sizes >= md-->
          <div
            class="d-none d-md-flex align-items-center"
            :class="{ 'flex-grow-1': !isExpandSearchWrapper }"
          >
            <ul
              class="navbar-nav ms-md-auto stds-navbar-nav-horizontal gnb-nav-menu-custom"
              :class="{ 'd-none': isExpandSearchWrapper }"
            >
              <li>
                <NuxtLink :to="creatorCenterLink[RUN_TYPE]" external target="_blank" class="nav-link">
                  <span>창작자 센터 바로가기</span>
                  <i class="ic-v2-control-web-link-line nav-link-icon"></i>
                </NuxtLink>
              </li>
            </ul>

            <div
              ref="inputSearchDesktopRef"
              class="me-24 form-search-wrapper"
              :class="{ 'd-none': isExpandSearchWrapper }"
              @click="expandSearchForm"
            >
              <input type="text" class="form-control form-search-query" :placeholder="t('search')" aria-label="Search" />
              <div class="form-search-ic left" role="button">
                <i class="ic-v2-navigation-search-line ic-search"></i>
              </div>
            </div>
            <ClientOnly>
              <VDropdown v-if="isScreenAtLeastMedium" v-model:shown="isShowLanguageMenus" distance="0" popperClass="v-popper--theme-dc-dropdown-menu language-settings-wrapper" placement="bottom-end">
                <button
                  type="button"
                  class="btn btn-link btn-language"
                  aria-controls="language-menu"
                  aria-haspopup="true"
                >
                  <i class="ic-language ic-v2-navigation-language-line"></i>
                </button>
                <template #popper>
                  <ul
                    class="gnb-custom-lang-list-vdropdown"
                  >
                    <li v-for="(value, key) in DEFAULT_LOCALES" :key="key" class="gnb-custom-lang-item">
                      <a
                        class="dropdown-item gnb-custom-lang-item-link"
                        :class="{'is-active': key === locale}"
                        href="#"
                        @click.prevent.stop="clickChangeLocale(value.code)"
                      >
                        {{ value.name }}
                      </a>
                    </li>
                  </ul>
                </template>
              </VDropdown>
            </ClientOnly>
          </div>
          <!--End menu list for screen sizes >= md-->
        </div>
      </div>

      <!--UI GNB, text-login or icon-menu/avatar-->
      <!--case display icon-menu/avatar: users logged-in-->
      <!--case display text-login: users not-logged-in and sizes >=md-->
      <ClientOnly>
        <div
          id="generateGNBScript"
          class="flex-shrink-0 stds-gnb-end "
          :class="[isAuthentication ? 'd-block' : 'd-none d-md-block']"
        ></div>
        <template #fallback>
          <div
            id="generateGNBScript"
            class="flex-shrink-0 stds-gnb-end "
            :class="[isAuthentication ? 'd-block' : 'd-none d-md-block']"
          >
            <div class="placeholder-glow">
              <span class="placeholder avatar-skeleton-gnb"></span>
            </div>
          </div>
        </template>
      </ClientOnly>
    </nav>
  </header>
</template>

<script setup lang="ts">
import 'floating-vue/dist/style.css';

import type { Locale } from '@nuxtjs/i18n/dist/runtime/composables';
import { useGNBStore } from '@stores/pageQueryStore/gnb';
import { Dropdown as VDropdown } from 'floating-vue';
import { createVNode, nextTick, onMounted, ref, render } from 'vue';

import GNBMyInfo from '@/components/GNBMyInfo.vue';
import useClickOutside from '@/composables/useClickOutside';
import { getRunTypeConfig } from '@/configs/runtime/run-type';
import { MaxItemRecSearch } from '@/constants/LimitDispalyItemUI';
import { DEFAULT_LOCALES } from '@/constants/Locale';
import { StateManagementKeys } from '@/constants/StateManagement';
import { LocalStorageKeys } from '@/types/LocalStorageKeys';
import type { GNBModel } from '@/types/pages/DocModel';
import type { PublicRunTypeModel } from '@/types/run-type/PublicRunTypeModel';

const isAuthentication = isLogin();

const config = useRuntimeConfig();
const RUN_TYPE = config.public.runTypeConfig.RUN_TYPE || 'live';
const { GNB_SCRIPT, API_BASE_URL, SEED_CORE }: PublicRunTypeModel = getRunTypeConfig(RUN_TYPE);
const { locale, t } = useI18n();
const localePath = useLocalePath();

const route = useRoute();
const url = ref(useRequestURL());
const loginRedirectUrlByGnb = computed(() => {
  return `${API_BASE_URL}/login/onstove/callback?originalRedirect=${url.value}`;
});
// const loginRedirectUrlByGnb = ref(`${API_BASE_URL}/login/onstove/callback?originalRedirect=${url}`);
const loginUrl = computed(() => {
  return `${SEED_CORE?.AUTH_URL}/login?redirect_url=${loginRedirectUrlByGnb.value}`;
});

const keyword = ref<string>('');
const gnbStore = useGNBStore();
const gnbMenus = ref<GNBModel[]>([]);
// const gnbLocales = GNB_LANGUAGES
//   ? GNB_LANGUAGES.map((lang: GNBLocale) => lang.value)
//   : DEFAULT_COVERAGES;
const switchLocalePath = useSwitchLocalePath();
const currentLocaleName = computed<string>(() => {
  return DEFAULT_LOCALES[locale.value].name || locale.value;
});
const inputSearchExpand = ref<HTMLElement | null>(null); // Hide/show Offcanvas GNB on screens size < medium, user action [e.x taps the hamburger button...]
const isToggleOffcanvasGNB = ref<boolean>(false);
const isExpandSearchWrapper = ref<boolean>(false);
const recDocSCHits = ref<string[]>([]);
const formSCExpandWrapperRef = ref<HTMLElement | null>(null);
const inputSearchMobileRef = ref<HTMLElement | null>(null);
const inputSearchDesktopRef = ref<HTMLElement | null>(null);
const btnClearKeywordGNBRef = ref<HTMLElement | null>(null);
const isScreenAtLeastMedium = ref<boolean>(true);
const observerRenderGnb = ref<any>(null);
const isShowLanguageMenus = ref<boolean>(false);

let eventClickOutside: any;
const recDocSCHitsSaveStorage = useState<string[]>(StateManagementKeys.RecentDocSearchHits, () => []);

const renderGnbMyInfo = (customDom: HTMLElement) => {
  const vNode = createVNode(GNBMyInfo, {
    logoutText: t('dev_center.logged_in.pre_grp_join.btn_logout'),
    onLogout: async () => {
      logout();
      await navigateTo(loginUrl.value, {
        external: true
      });
    },
    gnbMenus: gnbMenus.value,
    isAuthentication,
    isScreenAtLeastMedium: isScreenAtLeastMedium.value,
    languageSettingsText: t('language-settings'),
    isShowLanguageMenus: isShowLanguageMenus.value,
    currentLocaleName: currentLocaleName.value,
    locale: locale.value,
    clickChangeLocale: async (newLocale: Locale) => {
      await navigateTo(switchLocalePath(newLocale), { external: true });
    }
  });
  render(vNode, customDom.querySelector('.menu-user .gnb-dropdown-content')!);
};

const creatorCenterLink: Record<string, string> = {
  dev: 'https://dev-prob-bb.onstove.com',
  dev2: 'https://dev2-prob-bb.onstove.com',
  qa: 'https://qa-prob-bb.onstove.com',
  qa2: 'https://qa2-prob-bb.onstove.com',
  sandbox: 'https://prob-bb.gate8.com',
  live: 'https://prob-bb.gate8.com'
};

const logoLink = computed(() => {
  if (['live', 'sandbox'].includes(RUN_TYPE) && locale.value === 'en') {
    return localePath('/docs/bubblyz/Int');
  }
  return localePath('/');
});

// const gnbOption = {
//   wrapper: '#generateGNBScript',
//   isResponsive: true,
//   skin: 'gnb-default',
//   isMiniSizeStoveLogo: false,
//   logArea: 'stove',
//   stoveLogo: {
//     use: false,
//     url: '/'
//   },
//   serviceLogo: '',
//   widget: {
//     notification: false,
//     gameListAndService: false,
//     totalMenu: false,
//     customArea: {
//       template: '',
//       eventHandler: null
//     }
//   },
//   notice: {
//     customNoticeType: []
//   },
//   userMenu: {
//     myProfile: true,
//     myCash: false,
//     note: false,
//     myInfo: false,
//     userGameInfo: false,
//     timeline: false,
//     message: false,
//     coupon: false,
//     userPresentList: false,
//     secuSetting: false,
//     customerCenter: false,
//     reportCenter: false,
//     logout: false,
//     notification: false,
//     customArea: {
//       template: null,
//       eventHandler: renderGnbMyInfo
//     }
//   },
//   global: {
//     useGds: true,
//     languageCoverages: DEFAULT_COVERAGES,
//     defaultSelectedLanguage: locale.value,
//     onChangeLanguage: ''
//   },
//   defaultLocale: {
//     nation: '',
//     lang: locale.value,
//     timezone: '',
//     utc_offset: '',
//     locale: locale.value
//   },
//   withDrawRedirect: true,
//   loginMethod: {
//     redirectCurrentPage: false,
//     params: {
//       redirect_url: loginRedirectUrlByGnb.value
//     },
//     target: undefined
//   }
// };

const handleScriptLoad = () => {
  if (!window.cp) {
    console.error('cp-header.js has loaded, but the window.cp member does not exist.');
    return;
  }

  const gnbOption = getGNBOption(renderGnbMyInfo, locale.value, loginRedirectUrlByGnb.value);
  window.optionsGNB = gnbOption;
  new window.cp.Header(gnbOption).render();
};

const renderGNBHeader = () => {
  useHead({
    script: [
      {
        type: 'text/javascript',
        src: GNB_SCRIPT,
        defer: true,
        tagPosition: 'bodyOpen',
        id: 'dev-center-cp-header-script',
        onload: () => {
          handleScriptLoad();
        }
      }
    ]
  });
};
renderGNBHeader();

const showGNBSmallScreen = async () => {
  isScreenAtLeastMedium.value = mediaBreakpointUp('md');
  await nextTick();
  if (isScreenAtLeastMedium.value) {
    isToggleOffcanvasGNB.value = false;
  }
};

const initData = async () => {
  gnbMenus.value = await gnbStore.fetchGNBMenus(locale.value);
};

await initData();

const getRecDocSCHits = () => {
  const recDocSCHitsStorage = localStorage.getItem(LocalStorageKeys.RecentDocSearchHits);
  if (recDocSCHitsStorage) {
    const paresRecDocSCHits = JSON.parse(recDocSCHitsStorage);
    if (Array.isArray(paresRecDocSCHits) && paresRecDocSCHits.length) {
      recDocSCHitsSaveStorage.value = paresRecDocSCHits;
      recDocSCHits.value = recDocSCHitsSaveStorage.value;
    }
  }
};

if (process.client) {
  getRecDocSCHits();
}

onMounted(async () => {
  getRecDocSCHits();
  showGNBSmallScreen();
  window.addEventListener('resize', showGNBSmallScreen);
});

onBeforeUnmount(() => {
  eventClickOutside?.removeEvent();
  window.removeEventListener('resize', showGNBSmallScreen);
  if (observerRenderGnb.value) {
    observerRenderGnb.value.disconnect();
  }
});

watch(
  locale,
  async (newI18nLocale: Locale) => {
    useHead({
      htmlAttrs: {
        lang: newI18nLocale
      },
      meta: [{ property: 'og:locale', content: newI18nLocale }]
    });
  },
  { immediate: true }
);

const addItemRecSearchStorage = (newItem: string): void => {
  const index = recDocSCHits.value.indexOf(newItem);

  if (newItem && index === -1) {
    if (recDocSCHits.value.length >= MaxItemRecSearch) {
      recDocSCHits.value.shift();
    }

    recDocSCHits.value.push(newItem);
    localStorage.setItem(LocalStorageKeys.RecentDocSearchHits, JSON.stringify(recDocSCHits.value));
  }
};
const collapseSearchForm = () => {
  isExpandSearchWrapper.value = false;
  keyword.value = '';
  eventClickOutside.removeEvent();
};

const enterSearch = async () => {
  const keywordTrim = keyword.value.trim();
  addItemRecSearchStorage(keywordTrim);
  collapseSearchForm();
  await navigateTo({
    path: localePath('/common/search'),
    query: {
      q: keywordTrim
    }
  });
};

const closeGNBMobile = () => {
  isToggleOffcanvasGNB.value = false;
};

const showGNBMobile = () => {
  isToggleOffcanvasGNB.value = true;
};

const clickChangeLocale = async (newLocale: Locale) => {
  await navigateTo(switchLocalePath(newLocale), { external: true });
};

const expandSearchForm = async () => {
  isExpandSearchWrapper.value = true;
  await nextTick();
  eventClickOutside = useClickOutside(
    formSCExpandWrapperRef.value,
    () => {
      if (isExpandSearchWrapper.value) {
        collapseSearchForm();
      }
    },
    [inputSearchMobileRef.value, inputSearchDesktopRef.value, btnClearKeywordGNBRef.value]
  );
  eventClickOutside.initEvent();

  inputSearchExpand.value?.focus();

  // if (isAuthentication) {
  //   isExpandSearchWrapper.value = true;
  //   await nextTick();
  //   eventClickOutside = useClickOutside(
  //     formSCExpandWrapperRef.value,
  //     () => {
  //       if (isExpandSearchWrapper.value) {
  //         collapseSearchForm();
  //       }
  //     },
  //     [inputSearchMobileRef.value, inputSearchDesktopRef.value, btnClearKeywordGNBRef.value]
  //   );
  //   eventClickOutside.initEvent();

  //   inputSearchExpand.value?.focus();
  // } else {
  //   localStorage.removeItem(LocalStorageKeys.RecentDocSearchHits);
  //   await navigateTo(loginUrl, {
  //     external: true
  //   });
  // }
};

const clearKeyword = async () => {
  keyword.value = '';
  inputSearchExpand.value?.focus();
};
const deleteReSCItem = (item: string) => {
  const index = recDocSCHits.value.indexOf(item);
  if (index !== -1) {
    recDocSCHits.value.splice(index, 1);
  }
  inputSearchExpand.value?.focus();
};

watch(
  () => recDocSCHitsSaveStorage.value,
  (newValue: string[]) => {
    recDocSCHits.value = newValue;
  }
);

watch(
  () => route.path,
  (_path: string) => {
    url.value = useRequestURL();
  }
);
</script>

<style scoped lang="scss"></style>
