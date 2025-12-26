<script setup lang="ts">
import type { NavigationTreeNodes } from '../index';
import isEmpty from 'es-toolkit/compat/isEmpty';
import { useNavigationTree } from '../index';

import TreeNodeFolder from './TreeNodeFolder.vue';

const props = defineProps<{
  item: NavigationTreeNodes;
}>();

const route = useRoute();
const localePath = useLocalePath();
const { expandedIds } = useNavigationTree();

const isActive = computed(
  () => localePath(`/${props.item.path}`) === route.path,
);
const isFolder = computed(
  () => !isEmpty(props.item.children) && props.item.isFolder,
);
</script>

<template>
  <!-- folder -->
  <TreeNodeFolder
    v-if="isFolder"
    :item="item"
    class="focus-visible:ring-primary text-15 relative flex w-full cursor-pointer items-center gap-8 overflow-hidden rounded-full py-8 pr-36 pl-16 font-medium capitalize transition-colors duration-200 hover:bg-gray-500/5 focus-visible:ring-1 focus-visible:outline-none"
    :class="{
      'font-bold!': expandedIds.has(item.id),
      'bg-abg-active text-primary font-bold!': isActive,
    }"
  />

  <!-- link -->
  <NuxtLinkLocale
    v-else
    :to="{ path: `/${item.path}` }"
    exactActiveClass="!bg-abg-active text-primary"
    class="focus-visible:ring-primary text-14 flex w-full items-center gap-8 overflow-hidden rounded-full px-16 py-8 leading-24 font-medium capitalize transition-colors duration-200 hover:bg-gray-500/5 focus-visible:ring-1 focus-visible:outline-none"
  >
    <span class="flex-1 truncate">
      {{ item.title }}
    </span>
  </NuxtLinkLocale>
</template>
