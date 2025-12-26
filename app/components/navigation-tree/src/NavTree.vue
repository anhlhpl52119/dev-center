<script setup lang="ts">
import type { FlattenedNavigationNode } from '../index';
import { isNil } from 'es-toolkit';
import { useNavigationTree } from '../index';
import TreeNode from './TreeNode.vue';

const props = defineProps<{
  flatNodes: FlattenedNavigationNode[];
}>();

const { convertToTree, findRelatedById, getItemByPath } = useNavigationTree();
const expandedItems = ref<Set<number>>(new Set());
const tree = computed(() => convertToTree(props.flatNodes));

(() => {
  const lnbItem = getItemByPath();
  if (isNil(lnbItem)) {
    return;
  }
  const parentIds = findRelatedById(lnbItem.id);
  if (parentIds) {
    parentIds.forEach(id => expandedItems.value.add(id));
  }
})();
</script>

<template>
  <aside>
    <slot name="trigger" />

    <nav aria-label="Main navigation">
      <ul class="space-y-2">
        <li v-for="item in tree" :key="item.id">
          <TreeNode
            isRoot
            :item="item"
            :expandIds="expandedItems"
          />
        </li>
      </ul>
    </nav>
  </aside>
</template>
