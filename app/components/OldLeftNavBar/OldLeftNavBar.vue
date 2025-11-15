<script setup lang="ts">
import type { BreadcrumbModel, LNBModel } from './types';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import TheLeftNavItem from './LNBItem.vue';

interface CatalogProps {
  catalogs: LNBModel[];
  breadcrumbs?: BreadcrumbModel[];
  isShowTocMenuIcon: boolean;
}

withDefaults(defineProps<CatalogProps>(), {
  breadcrumbs: () => [],
});

const emit = defineEmits(['toggleTOCMobile']);

const isShowBtnToggleLNB = ref<boolean>(false);
const isCollapseWidthLNBDesktop = ref<boolean>(false);

function handleResize() {
  isShowBtnToggleLNB.value = useBreakpoints(breakpointsTailwind).isGreaterOrEqual('md');
}

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <nav>
    <button
      class="mb-6"
      @click="emit('toggleTOCMobile')"
    >
      <Icon name="svg:menu" class="size-10" />
    </button>

    <ul :class="{ collapsed: isCollapseWidthLNBDesktop }">
      <TheLeftNavItem
        v-for="(item, index) in catalogs"
        :key="index"
        :navItem="item"
      />
    </ul>
  </nav>
</template>
