<script setup lang="ts">
import type { LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem } from '~~/graphql';

export interface LNBModel
  extends LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem {
  children?: LNBModel[];
}
const props = defineProps<{
  item: LNBModel;
  isRoot: boolean;
  expandIds: Set<number>;
}>();

const { expandIds: expandedItems } = toRefs(props);

const isExpanded = computed(() => expandedItems.value.has(props.item.id));

function toggleExpand(id: number) {
  if (expandedItems.value.has(id)) {
    expandedItems.value.delete(id);
  }
  else {
    expandedItems.value.add(id);
  }
}
</script>

<template>
  <NuxtLinkLocale
    :to="`/${item.path}`"
    exactActiveClass="!bg-abg-active text-primary"
    class="focus-visible:ring-primary text-15 flex w-full items-center gap-8 py-8 pr-12 pl-16 font-medium rounded-full capitalize transition-all duration-200 hover:bg-gray-500/5 focus-visible:ring-1 focus-visible:outline-none"
  >
    <span class="flex-1">
      {{ item.title }}
    </span>

    <!-- folder expand icon -->
    <template v-if="!!item.children?.length && item.isFolder">
      <button
        :aria-expanded="isExpanded"
        tabindex="-1"
        :aria-label="`${isExpanded ? 'Collapse' : 'Expand'} ${item.title}`"
        class="hover:text-primary size-16 cursor-pointer rounded-full transition-all duration-200 hover:bg-gray-500/20"
        @click.prevent="toggleExpand(item.id)"
      >
        <Icon
          name="svg:single-arrow-down"
          class="h-6 w-10 align-[0.34em] leading-24 transition-all duration-200"
          :class="[
            isExpanded ? '-rotate-180 align-[-0.4em]' : '',
          ]"
          aria-hidden="true"
        />
      </button>
    </template>
  </NuxtLinkLocale>

  <Transition name="fold">
    <!-- folder -->
    <template v-if="item.children?.length && isExpanded">
      <ul class="pl-16 mt-2 space-y-2">
        <li
          v-for="navItem in item.children"
          :key="navItem.id"
        >
          <FolderLink
            :expandIds="expandIds"
            :item="navItem"
            :isRoot="false"
          />
        </li>
      </ul>
    </template>
  </Transition>
</template>
