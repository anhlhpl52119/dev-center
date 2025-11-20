<template>
  <nav class="sdc-lnb js-lnb d-flex d-md-block align-items-center" :class="{collapsed : isCollapseWidthLNBDesktop}">
    <div v-show="isShowBtnToggleLNB" class="sdc-lnb-toggle-wrapper flex-grow-1" @click="showSidebar">
      <i
        class="ic-v2-navigation-menu-line ic-toggle-lnb"
        aria-label="Toggle navigation left sidebar icon"
      ></i>

      <nav aria-label="breadcrumb" class="breadcrumb-lnb">
        <ol class="breadcrumb">
          <li
            v-for="(item, index) in breadcrumbs"
            :key="item.id"
            :class="['breadcrumb-item',{active: index === breadcrumbs.length - 1}]"
          >
            {{ item.label }}
          </li>
        </ol>
      </nav>
    </div>

    <button v-if="isShowTocMenuIcon" class="d-md-none btn btn-toggle-toc-mobile btn-toggle-toc btn-icon" @click="emit('toggleTOCMobile')">
      <i class="ic-v2-community-board-all-line ic-toggle-toc close"></i>
    </button>

    <div
      class="offcanvas-md offcanvas-start offcanvas-lnb js-sticky-lnb"
      :class="{show : isShowLNB }"
      tabindex="-1"
      aria-labelledby="stoveDevCenterSidebarOffcanvasLabel"
    >
      <div class="offcanvas-body overflow-y-auto">
        <div class="d-grid d-md-none justify-content-end">
          <button
            type="button"
            class="btn btn-icon btn-close ms-auto"
            data-bs-dismiss="offcanvas"
            aria-label="Close Stove Dev Center Sidebar"
            @click="closeSidebar"
          >
            <i class="ic-v2-control-close-line"></i>
          </button>
        </div>

        <button class="btn btn-icon btn-toggle-lnb-desktop d-none d-md-inline-flex" @click="toggleLNBDesktop">
          <i class="ic-v2-navigation-menu-line ic-toggle-lnb-desktop"></i>
        </button>

        <ul class="sdc-nav-list w-100" :class="{collapsed : isCollapseWidthLNBDesktop}">
          <TheLeftNavItem v-for="(item, index) in catalogs" :key="index" :navItem="item" />
        </ul>
      </div>
    </div>

    <div v-if="isShowLNB" class="offcanvas-backdrop fade show d-md-none" @click="clickBackdrop"></div>
  </nav>
</template>
<script setup lang="ts">
import TheLeftNavItem from '@/components/detail/TheLeftNavItem.vue';
import type { BreadcrumbModel, LNBModel } from '@/types/pages/DocModel';

interface CatalogProps {
  catalogs: LNBModel[];
  breadcrumbs?: BreadcrumbModel[];
  isShowTocMenuIcon: boolean;
}

const emit = defineEmits(['toggleTOCMobile']);

withDefaults(defineProps<CatalogProps>(), {
  breadcrumbs: () => []
});
const isShowBtnToggleLNB = ref<boolean>(false);
const isShowLNB = ref<boolean>(false);
const isCollapseWidthLNBDesktop = ref<boolean>(false);

const showSidebar = () => {
  isShowBtnToggleLNB.value = false;
  isShowLNB.value = true;
  document.body.style.overflow = 'hidden';
};

const closeSidebar = () => {
  isShowLNB.value = false;
  isShowBtnToggleLNB.value = true;
  document.body.style.removeProperty('overflow');
};

const handleResize = () => {
  isShowBtnToggleLNB.value = mediaBreakpointDown('md');
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  document.body.style.removeProperty('overflow');
});

// Watch for route changes and reset body overflow
const route = useRoute();
watch(() => route.path, () => {
  if (isShowLNB.value) {
    closeSidebar();
  }
});

const clickBackdrop = () => {
  closeSidebar();
};

const toggleLNBDesktop = () => {
  isCollapseWidthLNBDesktop.value = !isCollapseWidthLNBDesktop.value;
};
</script>
<style scoped lang="scss">
@import 'assets/scss/pages/detail/leftNavBar';
</style>
