<template>
  <aside
    :class="[
      'd-none d-md-block',
      props.class,
      {collapse: isTocCollapse}
    ]"
  >
    <div class="toc-nav-heading-wrapper">
      <div v-show="!isTocCollapse" class="toc-nav-heading text-truncate-2" v-html="tocNavHeading.text"></div>
      <button class="btn btn-toggle-toc btn-icon" @click="toggleTOC">
        <i v-if="isTocCollapse" class="ic-v2-community-board-all-line ic-toggle-toc close"></i>
        <i v-else class="ic-v2-control-top-line ic-toggle-toc open"></i>
      </button>
    </div>

    <ul
      :class="[
        'toc-nav-list-wrapper',
        'toc-nav-list',
        {collapse : isTocCollapse}
      ]"
    >
      <TOCLink
        v-for="(item, index) in catalogs"
        :key="`link-${item.level}-${item.text}`"
        :tocItem="item"
        :index="index"
        :isActive="currentHash === item.href"
        @select="scrollToHash({ autoEncode: false })"
      />
    </ul>

    <Teleport to="#tocMobile">
      <div
        class="offcanvas-toc-mobile d-md-none offcanvas-md offcanvas-end offcanvas-lnb js-sticky-lnb"
        :class="{show : isOpenTOC }"
        tabindex="-1"
        aria-labelledby="stoveDevCenterSidebarOffcanvasLabel"
      >
        <div class="offcanvas-body offcanvas-body-rtl overflow-y-auto">
          <div class="d-grid d-md-none btn-close-wrap justify-content-end">
            <button
              type="button"
              class="btn btn-icon btn-close ms-auto"
              data-bs-dismiss="offcanvas"
              aria-label="Close Stove Dev Center Sidebar"
              @click="closeTOCMobile"
            >
              <i class="ic-v2-control-close-line"></i>
            </button>
          </div>

          <button class="btn btn-icon btn-toggle-lnb-desktop d-none d-md-inline-flex">
            <i class="ic-v2-navigation-menu-line ic-toggle-lnb-desktop"></i>
          </button>

          <ul
            :class="[
              'toc-nav-list-wrapper',
              'toc-nav-list',
              {collapse : isTocCollapse}
            ]"
          >
            <section class="toc-nav-heading-wrapper">
              <p class="toc-nav-heading text-truncate-2">{{ tocNavHeading.text }}</p>
            </section>
            <TOCLink
              v-for="(item, index) in catalogs"
              :key="`link-${item.level}-${item.text}`"
              :tocItem="item"
              :index="index"
              :isActive="currentHash === item.href"
              @select="scrollToHash({ autoEncode: false })"
            />
          </ul>
        </div>
      </div>
      <div v-if="isOpenTOC" class="offcanvas-backdrop fade show d-md-none" @click="closeTOCMobile"></div>
    </Teleport>
  </aside>
</template>

<script setup lang="ts">
import { slugify } from '@utils/StringUtil';
import { throttle } from '@vavt/util';

import TOCLink from '@/components/md/TOCLink.vue';
import { BREAKPOINTS } from '@/constants/breakpoints';
import { UNIQUE_START_INDEX_TOC } from '@/constants/md';
import { CATALOG_CHANGED, PUSH_CATALOG } from '@/constants/md/event-name';
import type { HeadList, Themes, TocItem } from '@/types/md/type';
import bus from '@/utils/event-bus';

interface CatalogProps {
  editorId: string;
  scrollElement?: string | HTMLElement;
  onClick?: (e: MouseEvent, t: TocItem) => void;
  class?: string;
  theme?: Themes;
  offsetTop?: number;
  scrollElementOffsetTop?: number;
  isOpenTOC: boolean;
}

const props = withDefaults(defineProps<CatalogProps>(), {
  class: '',
  theme: 'light',
  offsetTop: 0,
  scrollElementOffsetTop: 0,
  onClick: () => {},
  scrollElement: '',
  isOpenTOC: false
});

const emit = defineEmits(['update:isOpenTOC', 'update:tocList']);

const editorId: string = props.editorId;
const { scrollToHash, currentHash } = useTOCLink();
const route = useRoute();
const hash = computed(() => {
  return route.hash;
});

const isTocCollapse = ref(false);

const state = reactive<{
  list: HeadList[];
  show: boolean;
  scrollElement: string | HTMLElement;
}>({
  list: [],
  show: false,
  scrollElement: props.scrollElement || `#${editorId}-preview-wrapper`
});

const tocNavHeading = ref<HeadList>({
  text: '',
  level: 1
});

const catalogs = computed(() => {
  const tocItems: TocItem[] = [];
  const sizesMdToc = state.list.length;
  const keyCounts: Record<string, number> = {};

  if (sizesMdToc) {
    const firstTOC = state.list[0];
    keyCounts[firstTOC.text] = UNIQUE_START_INDEX_TOC;
    tocNavHeading.value = {
      level: firstTOC.level,
      text: firstTOC.text
    };
  }

  for (let index = 1; index < sizesMdToc; index++) {
    const { text, level } = state.list[index];

    const idAnchor = state.list[index].idAnchor;
    let href;

    // Check only for the undefined, because the id is initialized as the string | undefined, so values like '0', 'undefined' ... are all valid
    if (idAnchor === undefined) {
      const keyCount = (keyCounts[text] || 0) + UNIQUE_START_INDEX_TOC;
      keyCounts[text] = keyCount;
      href = keyCount > 0 ? `#${slugify(text)}-${keyCount}` : `#${slugify(text)}`;
    } else {
      href = `#${idAnchor}`;
    }

    const item = {
      level,
      text,
      index: index + 1,
      active: hash.value === href,
      href
    };

    if (tocItems.length === 0) {
      // The first item is pushed directly
      tocItems.push(item);
    } else {
      let lastItem = tocItems[tocItems.length - 1]; // Last item

      if (item.level > lastItem.level) {
        // Item is a child of lastItem
        for (let i = lastItem.level + 1; i <= 6; i++) {
          const { children } = lastItem;
          if (!children) {
            // If children does not exist
            lastItem.children = [item];
            break;
          }

          lastItem = children[children.length - 1]; // Reset lastItem to the last item of children

          if (item.level <= lastItem.level) {
            // Item level is less than or equal to lastItem level and is considered to be at the same level as children
            children.push(item);
            break;
          }
        }
      } else {
        // At the top
        tocItems.push(item);
      }
    }
  }

  emit('update:tocList', tocItems);

  return tocItems;
});

const closeTOCMobile = () => {
  emit('update:isOpenTOC', false);
};

const updateCatalogs = throttle((list: HeadList[]) => {
  if (list.length === 0) {
    state.list = [];
    return false;
  }
  state.list = list;
});

const checkScreenSize = () => {
  if (typeof window !== 'undefined') {
    isTocCollapse.value = window.innerWidth >= BREAKPOINTS.MD && window.innerWidth < BREAKPOINTS.LG;
  }
};

watch(catalogs, (newCatalogs: TocItem[]) => {
  if (newCatalogs.length === 0) {
    isTocCollapse.value = true;
  } else {
    checkScreenSize();
  }
});

onMounted(() => {
  checkScreenSize(); // Initial check

  bus.on(editorId, {
    name: CATALOG_CHANGED,
    callback: (_list: HeadList[]) => {
      updateCatalogs(_list);
    }
  });

  // Trigger the reception once actively
  bus.emit(editorId, PUSH_CATALOG);

  // findout when markdown-it completed render to remove settimeOut
  setTimeout(() => {
    scrollToHash({ autoEncode: false });
  }, 500);
});

const toggleTOC = () => {
  isTocCollapse.value = !isTocCollapse.value;
};
</script>

<style scoped lang="scss">
@import "assets/scss/pages/detail/mdTOC";

// .offcanvas-md {
//   direction: rtl;
//   max-height: 100vh;

//   .btn-close-wrap {
//     direction: ltr;
//   }

//   .toc-nav-list-wrapper {
//     direction: ltr;
//   }
// }
</style>
