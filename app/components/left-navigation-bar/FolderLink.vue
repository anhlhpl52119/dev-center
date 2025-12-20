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
    class="focus-visible:ring-primary text-15 pl-16 relative flex w-full items-center gap-8 py-8 pr-36 font-medium rounded-full capitalize transition-all duration-200 hover:bg-gray-500/5 focus-visible:ring-1 focus-visible:outline-none"
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
        class="hover:text-primary flex items-center group justify-center absolute right-0 cursor-pointer w-36 rounded-r-full inset-y-0"
        @click.prevent="toggleExpand(item.id)"
      >
        <div class="size-16 group-hover:bg-gray-500/20 rounded-full transition-colors duration-200">
          <Icon
            name="svg:single-arrow-down"
            class="h-6 w-10 leading-24 align-[0.3em] transition-all duration-200"
            :class="[
              isExpanded ? '-rotate-180 align-[0.2em]' : '',
            ]"
            aria-hidden="true"
          />
        </div>
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
