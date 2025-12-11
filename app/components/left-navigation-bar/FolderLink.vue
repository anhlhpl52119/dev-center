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
  <NavLinkItem :item="item">
    <span class="flex-1">
      {{ item.title }}
    </span>

    <button
      v-if="!!item.children?.length"
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
  </NavLinkItem>

  <Transition
    v-if="!!item.children?.length"
    enterActiveClass="transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
    leaveActiveClass="transition-all duration-250 ease-[cubic-bezier(0.4,0,0.6,1)]"
    enterFromClass="opacity-0 max-h-0 scale-y-0 origin-top"
    enterToClass="opacity-100 max-h-1000 scale-y-100 origin-top"
    leaveFromClass="opacity-100 max-h-1000 scale-y-100 origin-top"
    leaveToClass="opacity-0 max-h-0 scale-y-0 origin-top"
  >
    <ul
      v-if="isExpanded"
      class="pl-16 space-y-2"
    >
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
  </Transition>
</template>
