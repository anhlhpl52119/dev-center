<template>
  <main v-if="isLoadingPageInit" class="container">
    <div class="d-flex align-items-center mx-auto sdc-loading-box min-vh-100">
      <div class="ball1 ball"></div>
      <div class="ball2 ball"></div>
      <div class="ball3 ball"></div>
    </div>
  </main>

  <main v-else class="sdc-search-page-wrapper container">
    <div class="mt-80 text-center">
      <h1 class="text-title font-bold">
        🔍 검색 결과
      </h1>
    </div>

    <section class="form-search-wrapper">
      <div class="form-search-recent-list-wrapper">
        <div class="form-search-container" role="search">
          <input
            ref="formKeywordInputRef"
            v-model="currentSearchTwoBinding"
            type="text"
            class="input-search form-control form-search-query"
            :placeholder="t('search')"
            aria-label="Search"
            @keydown="enterKeyword"
            @focus="handleFocusInputSearch"
          />
          <div class="form-search-ic right">
            <button
              v-show="currentSearchTwoBinding"
              ref="btnClearKeywordRef"
              type="button"
              class="btn btn-icon btn-clear-search"
              @click="clearKeyword"
            >
              <i class="ic-v2-control-close-circle-fill ic-clear-search"></i>
            </button>

            <button
              type="button"
              class="btn btn-icon btn-search"
              @click="enterKeyword"
            >
              <i class="ic-v2-navigation-search-line ic-search" aria-label="Icon search"></i>
            </button>
          </div>
        </div>
        <ClientOnly>
          <div role="presentation" class="recent-search-list-wrapper" :class="{'d-block' : isDisplayRecDocHitsPageSearch}">
            <template v-if="recDocSCHits.length">
              <h6 class="recent-search-list-title">{{ t('recent') }}</h6>
              <ul class="recent-search-list" role="listbox">
                <li v-for="(item, idx) in recDocSCHits" :key="idx" class="recent-search-list-item" role="option">
                  <div
                    role="button"
                    class="recent-search-list-item-title text-truncate-1 flex-grow-1 ms-auto"
                    @click="handleClickItemRecSearch(item)"
                  >
                    {{ item }}
                  </div>
                  <button
                    type="button"
                    class="btn btn-icon btn-del-recent-search-item flex-shrink-0"
                    @click="deleteReSCItem(item)"
                  >
                    <i class="ic-v2-control-close-line close-search"></i>
                  </button>
                </li>
              </ul>
            </template>
            <div v-else class="recent-search-list empty">
              <div class="text">{{ t('no-recent-search') }}</div>
            </div>
          </div>
        </ClientOnly>
      </div>
    </section>

    <div v-if="isLoadingPageBoxSearch" class="d-flex align-items-center mx-auto mt-72 sdc-loading-box">
      <div class="ball1 ball"></div>
      <div class="ball2 ball"></div>
      <div class="ball3 ball"></div>
    </div>

    <template v-else>
      <template v-if="resultsSearch && Object.keys(resultsSearch).length">
        <section class="sdc-results-wrapper">
          <article v-for="(value, key, index) in resultsSearch" :key="`c${index}`" class="">
            <div class="">
              <div v-for="(childItem, i) in value" :key="`i${i}`" class="sdc-result-list-item">
                <NuxtLink :to="localePath(childItem.href)" class="sdc-result-list-item-link">
                  <div class="sdc-result-list-item-card">
                    <!-- <div
                      class="sdc-result-breadcrumbs text-truncate-1"
                    >
                      {{ childItem.breadcrumb }}
                    </div> -->
                    <h5 class="sdc-result-title text-truncate-1">{{ childItem.title }}</h5>

                    <p class="sdc-result-description text-truncate-2" v-html="childItem.content"></p>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </article>
        </section>

        <ClientOnly>
          <BasePagination
            v-if="pagination.total"
            v-model="currentPage"
            :max="maxDisplayedPages"
            :pageCount="pagination.size"
            :total="pagination.total"
            class="justify-content-center"
          />
          <template #fallback>
            <!-- this will be rendered on server side -->
            <BasePaginationSkeleton class="justify-content-center" />
          </template>
        </ClientOnly>
      </template>
      <SafeHtml v-else class="text-center py-24 py-lg-56 min-vh-100" :html="t('api-returncode.E400')" />
    </template>
  </main>
</template>

<script setup lang="ts">
import useClickOutside from '@composables/useClickOutside';
import { MaxItemRecSearch } from '@constants/LimitDispalyItemUI';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGINATION_MAX_ITEM, MOBILE_PAGINATION_MAX_ITEM } from '@constants/PageSearchQuery';
import { useSearchDocsStore } from '@stores/pageQueryStore/search';

import BasePagination from '@/components/navigation/BasePagination.vue';
import BasePaginationSkeleton from '@/components/navigation/BasePaginationSkeleton.vue';
import { StateManagementKeys } from '@/constants/StateManagement';
import { LocalStorageKeys } from '@/types/LocalStorageKeys';
import type { CategoryModel, CategoryResultSearch, PageSearchModel, Pagination, SearchItemModel } from '@/types/pages/DocModel';
import type { PageSearchReq } from '@/types/pages/request/PageSearchReq';
import type { LocationQueryValue } from '#vue-router';

// definePageMeta({
//   middleware: ['auth']
// });

const { t, locale } = useI18n();
const route = useRoute();
const localePath = useLocalePath();

const searchDocsStore = useSearchDocsStore();
const isLoadingPageBoxSearch = ref<boolean>(false);
const isLoadingPageInit = ref<boolean>(true);
const formKeywordInputRef = ref<null | HTMLInputElement>(null);
const resultsSearch = ref<Record<string, SearchItemModel[]>>({});
const currentTab = ref<string>(route.query.module ? route.query.module.toString() : '');
const categories = ref<CategoryModel[]>([]);
const categoriesResultSearch = ref<CategoryResultSearch>({});
const pagination = ref<Pagination>({
  total: 0,
  size: DEFAULT_PAGE_SIZE,
  currentPage: 1
});
const currentSearch = computed<string | undefined>(() => {
  return route.query.q ? route.query.q.toString() : undefined;
});

const currentSearchTwoBinding = ref<string | undefined>(currentSearch.value);

const currentPage = ref(route.query.page ? Number(route.query.page) : 1);
const query = ref<PageSearchReq>({
  category: currentTab.value,
  query: currentSearch.value,
  locale: locale.value
});
const paginationRq = ref<Pagination>({
  total: 0,
  currentPage: currentPage.value,
  size: DEFAULT_PAGE_SIZE
});

const maxDisplayedPages = ref<number>(DEFAULT_PAGINATION_MAX_ITEM);

const recDocSCHits = ref<string[]>([]);
const recDocSCHitsSaveStorage = useState<string[]>(StateManagementKeys.RecentDocSearchHits);
const btnClearKeywordRef = ref<HTMLElement|null>(null);
const isDisplayRecDocHitsPageSearch = ref<boolean>(false);
let eventClickOutsideInputSearch : any;

const handleCallSearchInit = async (locale: string) => {
  try {
    isLoadingPageInit.value = true;

    categories.value = await searchDocsStore.fetchCategories(locale, t('all'));
    if (categories.value.length > 1) {
      query.value.inCategory = categories.value.map((item: CategoryModel) => item.category);
    }

    const searchRs: PageSearchModel = await searchDocsStore.fetchPagesBySearch(query.value, paginationRq.value);
    resultsSearch.value = searchRs.list;
    pagination.value = searchRs.pagination;
    categoriesResultSearch.value = searchRs.description;
  } catch (e) {
    errorLog('Error in handleCallSearchInit =>:', e);
  } finally {
    isLoadingPageInit.value = false;
  }
};

await handleCallSearchInit(locale.value);

const getRecDocSCHits = () => {
  const recDocSCHitsStorage = localStorage.getItem(LocalStorageKeys.RecentDocSearchHits);
  if (recDocSCHitsStorage) {
    const paresRecDocSCHits = JSON.parse(recDocSCHitsStorage);
    if (Array.isArray(paresRecDocSCHits) && paresRecDocSCHits.length) {
      recDocSCHits.value = paresRecDocSCHits;
      recDocSCHitsSaveStorage.value = paresRecDocSCHits;
    }
  }

  eventClickOutsideInputSearch = useClickOutside(
    formKeywordInputRef.value,
    () => {
      if (isDisplayRecDocHitsPageSearch.value) {
        collapseRecDocHitsSearch();
      }
    },
    [btnClearKeywordRef.value]
  );
};

const handleResize = () => {
  maxDisplayedPages.value = mediaBreakpointUp('sm') ? DEFAULT_PAGINATION_MAX_ITEM : MOBILE_PAGINATION_MAX_ITEM;
};

onMounted(async () => {
  handleResize();
  window.addEventListener('resize', handleResize);
  getRecDocSCHits();
});

onBeforeUnmount(() => {
  eventClickOutsideInputSearch?.removeEvent();
  window.removeEventListener('resize', handleResize);
});

watch(currentSearch, async (newValue: string | undefined, _oldValue: string | undefined) => {
  paginationRq.value.currentPage = 1;
  query.value.query = newValue;
  if (newValue !== currentSearchTwoBinding.value) {
    currentSearchTwoBinding.value = newValue;
  }

  // currentPage is being watched, it triggers an API call
  // Therefore, on pages other than page 1, watching the current page will trigger the API call,
  // eliminating the need for additional API calls.
  // However, on page 1, if no change is detected, it necessitates an API call.
  if (currentPage.value === 1) {
    await handleCallSearchBox();
  } else {
    isLoadingPageBoxSearch.value = true;
    currentPage.value = 1;
    isLoadingPageBoxSearch.value = false;
  }
});

watch(currentPage, async (newPage: number, _oldPage: number) => {
  paginationRq.value.currentPage = newPage;

  await handleCallSearchBox();
});

watch(
  () => route.query.module,
  async (newMenu: LocationQueryValue | LocationQueryValue[]) => {
    const newMenuValue = newMenu?.toString() || '';
    currentTab.value = newMenuValue;
    paginationRq.value.currentPage = 1;
    query.value.category = newMenuValue;

    // currentPage is being watched, it triggers an API call
    // Therefore, on pages other than page 1, watching the current page will trigger the API call,
    // eliminating the need for additional API calls.
    // However, on page 1, if no change is detected, it necessitates an API call.
    if (currentPage.value === 1) {
      await handleCallSearchBox();
    } else {
      isLoadingPageBoxSearch.value = true;
      currentPage.value = 1;
      isLoadingPageBoxSearch.value = false;
    }
  });

const handleCallSearchBox = async () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  try {
    isLoadingPageBoxSearch.value = true;
    const searchRs = await searchDocsStore.fetchPagesBySearch(query.value, paginationRq.value);
    resultsSearch.value = searchRs.list;
    pagination.value = searchRs.pagination;
    categoriesResultSearch.value = searchRs.description;
  } catch (e) {
    errorLog('Error in handleCallSearchBox =>:', e);
  } finally {
    isLoadingPageBoxSearch.value = false;
  }
};

const addItemRecSearchStorage = (newItem: string): void => {
  const index = recDocSCHits.value.indexOf(newItem);

  if (index === -1) {
    if (recDocSCHits.value.length >= MaxItemRecSearch) {
      recDocSCHits.value.shift();
    }

    recDocSCHits.value.push(newItem);
    localStorage.setItem(LocalStorageKeys.RecentDocSearchHits, JSON.stringify(recDocSCHits.value));
    recDocSCHitsSaveStorage.value = recDocSCHits.value;
  }
};

const enterKeyword = async (event: any) => {
  if ((!event.isComposing && event.key === 'Enter') || event.type === 'click') {
    let queryParamKeyword;
    const trimKeyword = currentSearchTwoBinding.value?.trim() || '';
    if (trimKeyword) {
      addItemRecSearchStorage(trimKeyword);
      queryParamKeyword = trimKeyword;
    }
    isDisplayRecDocHitsPageSearch.value = false;

    return navigateTo(localePath(
      {
        path: '/common/search',
        query: {
          ...route.query,
          q: queryParamKeyword,
          page: undefined
        }
      }
    ));
  }
};

const clearKeyword = () => {
  currentSearchTwoBinding.value = '';
  formKeywordInputRef.value?.focus();
};

const deleteReSCItem = (item: string) => {
  const index = recDocSCHits.value.indexOf(item);
  if (index !== -1) {
    recDocSCHits.value.splice(index, 1);
  }
};

const handleFocusInputSearch = () => {
  isDisplayRecDocHitsPageSearch.value = true;
  eventClickOutsideInputSearch?.initEvent();
};

const collapseRecDocHitsSearch = () => {
  isDisplayRecDocHitsPageSearch.value = false;
  eventClickOutsideInputSearch?.removeEvent();
};

const handleClickItemRecSearch = async (keyword: string) => {
  collapseRecDocHitsSearch();
  if (currentSearchTwoBinding.value !== keyword) {
    currentSearchTwoBinding.value = keyword;
  }

  if (currentSearch.value === keyword) {
    await handleCallSearchBox();
  } else {
    await navigateTo(localePath({
      path: '/common/search',
      query: {
        ...route.query,
        q: keyword
      }
    }));
  }
};

</script>

<style scoped lang="scss">
@import 'assets/scss/pages/search/index';
</style>
