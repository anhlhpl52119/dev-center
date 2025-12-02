<template>
  <main v-if="isLoading" class="container loading loading-wrapper min-vh-100">
    <div class="d-flex align-items-center mx-auto sdc-loading-box">
      <div class="ball1 ball"></div>
      <div class="ball2 ball"></div>
      <div class="ball3 ball"></div>
    </div>
  </main>

  <template v-else>
    <main v-if="contentRender && contentRender.length" class="sdc-wrapper container-md height-wrapper">
      <TheLeftNavBar :isShowTocMenuIcon="isShowTocMenuIcon" :catalogs="lnb" :breadcrumbs="breadcrumbs" class="flex-grow-1 flex-md-grow-0" @toggleTOCMobile="toggleTOCMobile" />

      <div class="border-bottom d-md-none"></div>
      <section class="v-main sdc-main">
        <MdPreview
          :editorId="renderId"
          :modelValue="contentRender"
          :title="contentTitle"
          :description="contentDescription"
          :lastUpdate="lastUpdated"
          :versioning="versioningList"
          :currentVersion="versionQueryParam"
          :href="path"
          class="order-lg-1"
        />
      </section>

      <div id="tocMobile"></div>
      <ClientOnly>
        <MdTOC
          v-model:isOpenTOC="isOpenTOC"
          v-model:tocList="tocList"
          class="sdc-toc js-sticky-toc"
          :editorId="renderId"
        />

        <template #fallback>
          <TheTOCSkeleton class="d-none d-md-block sdc-toc" />
        </template>
      </ClientOnly>
    </main>
    <!-- Do not use v-else because SSR does not re-render the value-->
    <main v-if="!contentRender || !contentRender.length" class="container-fluid has-error-api-wrapper">
      <ErrorAPI :errMsg="errMsg" styleWrapper="text-center" />
    </main>
  </template>
</template>

<script setup lang="ts">
import { useLNBStore } from '@stores/pageQueryStore/lnb';
import { COOKIE_KEYS } from 'seed-core';

import TheLeftNavBar from '@/components/detail/TheLeftNavBar.vue';
import TheTOCSkeleton from '@/components/detail/TheTOCSkeleton.vue';
import MdPreview from '@/components/md/MdPreview.vue';
import { HttpStatusCode } from '@/constants/Axios';
import { DEFAULT_TIMEZONE } from '@/constants/Locale';
import { useSinglePageStore } from '@/stores/pageQueryStore/single';
import type { FetchSinglePageByPathOptions, FetchSinglePageByVersionOptions } from '@/types/mapper/single-page';
import type { TocItem } from '@/types/md/type';
import type { BreadcrumbModel, LNBModel, PageRender, VersionModel } from '@/types/pages/DocModel';
import { isCurrentNavItemOrDirectChild, removeLocalePrefix } from '@/utils';

// definePageMeta({
//   middleware: ['auth']
// });

const { locale, t } = useI18n();
// const localePath = useLocalePath();
const singlePageStore = useSinglePageStore();
const isLoading = ref<boolean>(false);
const lnbStore = useLNBStore();
const lnb = ref<LNBModel[]>([]);
const renderId = 'sdc-preview-docs';
const isOpenTOC = ref<boolean>(false);

const contentRender = ref<string>('');
const contentTitle = ref<string>('Title');
const contentDescription = ref<string>('description');
const lastUpdated = ref<string>('');
const route = useRoute();
const path = ref<string>(!(Array.isArray(route.params.slugs) && route.params.slugs.length > 0) ? '' : route.params.slugs.join('/'));
const pageId = ref<number>(0);
const versioningList = ref<VersionModel[]>([]);

const tocList = ref<TocItem[]>([]);
const isShowTocMenuIcon = true;
// const isShowTocMenuIcon = computed(() => !!tocList.value?.length);

const breadcrumbs = ref<BreadcrumbModel[]>([]);
const errMsg = ref<string>('');

const versionQueryParam = computed(() => {
  return route.query?.version?.toString() || '0';
});
const config = useRuntimeConfig();
const domainCookie = config.public?.runTypeConfig?.SEED_CORE?.DOMAIN || '.onstove.com';

const timeZone = computed(() => {
  const timezoneCookie = useCookie(COOKIE_KEYS.TIMEZONE || '', { domain: domainCookie });
  return timezoneCookie.value || DEFAULT_TIMEZONE;
});

const toggleTOCMobile = () => {
  isOpenTOC.value = true;
};

/**
 * Throws an error with the specified status code and status message.
 * When throwing an exception at this point, it will immediately redirect the error page
 *
 * @param {number} [statusCode=400] - The HTTP status code of the error.
 * @param {string} [statusMessage='Page Not Found'] - The status message of the error.
 * @throws {Error} - The error with the specified status code and status message.
 */
const throwError = (statusCode: number = HttpStatusCode.BAD_REQUEST, statusMessage: string = 'Page Not Found') => {
  // on client-side, it will throw a non-fatal error for you to handle. If you need to trigger a full-screen error page,
  // then you can do this by setting fatal: true.
  // Ref: https://nuxt.com/docs/api/utils/create-error
  throw createError({ statusCode, statusMessage, fatal: true });
};

const generateBreadcrumb = (path: string, lnbItems: LNBModel[], breadcrumb: BreadcrumbModel[] = []): BreadcrumbModel[] => {
  const activedItem = lnbItems.find((item: LNBModel) => {
    return isCurrentNavItemOrDirectChild(item, path) || removeLocalePrefix(path).toLowerCase() === item.href.toLowerCase();
  });

  if (!activedItem) {
    return breadcrumb;
  }

  breadcrumb.push({
    id: Math.random(),
    label: capitalizeFirstLetter(activedItem.title),
    href: ''
  });

  if (!activedItem.children) {
    return breadcrumb;
  }

  return generateBreadcrumb(path, activedItem.children, breadcrumb);
};

const init = async () => {
  try {
    isLoading.value = true;
    errMsg.value = '';

    const fetchSinglePageOptions: FetchSinglePageByPathOptions = {
      path: path.value,
      locale: locale.value,
      timezone: timeZone.value
    };

    const [lnbRs, detailRs]: [LNBModel[], PageRender] = await Promise.all([
      lnbStore.fetchLNB(path.value, locale.value),
      singlePageStore.fetchSinglePageByPath(fetchSinglePageOptions)
    ]);

    const { slugs } = route.params;
    const isStoreInfoPage = slugs[0]?.toLowerCase() === 'store';
    if (isStoreInfoPage) {
      useHead({
        title: t('meta.sdg-title'),
        meta: [
          {
            name: 'description',
            content: t('meta.sdg-description')
          },
          {
            name: 'keywords',
            content: t('meta.sdg-keywords')
          }
        ]
      });
    }

    lnb.value = lnbRs;
    // Check if there is any problem from API
    if (detailRs?.errMsg) {
      errMsg.value = detailRs.errMsg;
    } else {
      pageId.value = detailRs.pageId;

      // Call API by query params version
      if (versionQueryParam.value && versionQueryParam.value !== '0' && pageId.value) {
        const fetchSinglePageByVersionOptions: FetchSinglePageByVersionOptions = {
          pageId: pageId.value,
          locale: locale.value,
          timezone: timeZone.value,
          versionId: versionQueryParam.value
        };

        const rsByVersion = await singlePageStore.fetchSinglePageByVersion(fetchSinglePageByVersionOptions);

        if (!rsByVersion.render) {
          throwError(HttpStatusCode.NOT_FOUND);
        }

        contentRender.value = rsByVersion.render;
        contentTitle.value = rsByVersion.title;
        contentDescription.value = rsByVersion.description;
        lastUpdated.value = rsByVersion.lastUpdate;
        if (process.client) {
          versioningList.value = await singlePageStore.fetchVersioningList(pageId.value);
        }
      } else {
        if (!detailRs.render) {
          throwError(HttpStatusCode.NOT_FOUND);
        }

        contentRender.value = detailRs.render;
        contentTitle.value = detailRs.title;
        contentDescription.value = detailRs.description;
        lastUpdated.value = detailRs.lastUpdate;
        if (process.client) {
          versioningList.value = await singlePageStore.fetchVersioningList(pageId.value);
        }
      }

      const trimmedPath = path.value.replace(/^\/|\/$/g, '');
      const splitPath = trimmedPath.split('/');
      breadcrumbs.value = generateBreadcrumb(route.path.toString(), lnb.value, [{
        id: lnbStore.lnbRoot!.id,
        label: capitalizeFirstLetter(lnbStore.lnbRoot!.title),
        href: '/' + splitPath.slice(0, 1).join('/')
      }]);
      // breadcrumbs.value = getBreadcrumbsDoc(path.value, detailRs.title);
    }
  } catch (e: any) {
    throwError();
  } finally {
    isLoading.value = false;
  }
};

init();
</script>

<style scoped lang="scss">
@import 'assets/scss/pages/detail/index.scss';
</style>
