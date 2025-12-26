<script setup lang="ts">
import type { NavigationTreeNodes } from '../index';
import { isNil } from 'es-toolkit/predicate';
import { useNavigationTree } from '../index';
import TreeNode from './TreeNode.vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  item: NavigationTreeNodes;
}>();

const { toggleExpand, expandedIds } = useNavigationTree();
const localePath = useLocalePath();

const isFolderNoLink = computed(
  () => props.item.isFolder && isNil(props.item.pageId),
);

function onclick() {
  if (isFolderNoLink.value) {
    toggleExpand(props.item.id);
  } else {
    expandedIds.value.add(props.item.id);
    navigateTo(localePath(`/${props.item.path}`));
  }
}
</script>

<template>
  <button
    v-bind="$attrs"
    type="button"
    :aria-expanded="expandedIds.has(item.id)"
    :aria-label="`${expandedIds.has(item.id) ? 'Collapse' : 'Expand'} ${item.title}`"
    @click="onclick"
  >
    <span class="flex-1 truncate text-left">
      {{ item.title }}
    </span>

    <!-- folder expand icon -->
    <div
      v-if="item.children?.length"
      class="hover:text-primary group absolute inset-y-0 right-0 flex w-36 items-center justify-center rounded-r-full"
      @click.stop="toggleExpand(item.id)"
    >
      <div
        class="size-16 rounded-full transition-colors duration-200 group-hover:bg-gray-500/20"
      >
        <Icon
          name="svg:single-arrow-down"
          class="h-6 w-10 align-[0.3em] leading-24 transition-all duration-200"
          :class="[expandedIds.has(item.id) ? '-rotate-180 align-[0.2em]' : '']"
          aria-hidden="true"
        />
      </div>
    </div>
  </button>

  <!-- Folder children -->
  <Transition name="fold">
    <!-- folder -->
    <template v-if="item.children?.length && expandedIds.has(item.id)">
      <ul class="mt-2 space-y-2 pl-16">
        <li v-for="navItem in item.children" :key="navItem.id">
          <TreeNode :item="navItem" />
        </li>
      </ul>
    </template>
  </Transition>
</template>
