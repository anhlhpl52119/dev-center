<script setup lang="ts">
import type { NavigationTreeNodes } from '../index';

const props = defineProps<{
  item: NavigationTreeNodes;
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
    :to="{ path: `/${item.path}` }"
    exactActiveClass="!bg-abg-active text-primary"
    class="focus-visible:ring-primary text-15 relative flex w-full items-center gap-8 rounded-full py-8 pr-36 pl-16 font-medium capitalize transition-all duration-200 hover:bg-gray-500/5 focus-visible:ring-1 focus-visible:outline-none"
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
        class="hover:text-primary group absolute inset-y-0 right-0 flex w-36 cursor-pointer items-center justify-center rounded-r-full"
        @click.prevent="toggleExpand(item.id)"
      >
        <div
          class="size-16 rounded-full transition-colors duration-200 group-hover:bg-gray-500/20"
        >
          <Icon
            name="svg:single-arrow-down"
            class="h-6 w-10 align-[0.3em] leading-24 transition-all duration-200"
            :class="[isExpanded ? '-rotate-180 align-[0.2em]' : '']"
            aria-hidden="true"
          />
        </div>
      </button>
    </template>
  </NuxtLinkLocale>

  <Transition name="fold">
    <!-- folder -->
    <template v-if="item.children?.length && isExpanded">
      <ul class="mt-2 space-y-2 pl-16">
        <li v-for="navItem in item.children" :key="navItem.id">
          <TreeNode
            :expandIds="expandIds"
            :item="navItem"
            :isRoot="false"
          />
        </li>
      </ul>
    </template>
  </Transition>
</template>
