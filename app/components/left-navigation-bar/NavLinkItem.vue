<script setup lang="ts">
import type { LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem } from '~~/graphql';

export interface LNBModel
  extends LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem {
  children?: LNBModel[];
}
defineProps<{
  item: LNBModel;
}>();
</script>

<template>
  <NuxtLinkLocale
    :to="`/${item.path}`"
    exactActiveClass="!bg-abg-active text-primary"
    class="focus-visible:ring-primary text-15 flex w-full items-center gap-8 py-8 pr-12 pl-16 font-medium rounded-full capitalize transition-all duration-200 hover:bg-gray-500/5 focus-visible:ring-1 focus-visible:outline-none"
  >
    <!-- item -->
    <slot>
      <span>{{ item.title }}</span>
    </slot>
  </NuxtLinkLocale>
</template>
