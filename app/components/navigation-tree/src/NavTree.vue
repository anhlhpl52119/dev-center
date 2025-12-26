<script setup lang="ts">
import type { FlattenedNavigationNode } from '../index';
import { isNil } from 'es-toolkit';
import { useNavigationTree } from '../index';
import TreeNode from './TreeNode.vue';

const props = defineProps<{
  flatNodes: FlattenedNavigationNode[];
}>();

const { convertToTree, findRelatedById, getItemByPath, expandedIds }
  = useNavigationTree();
const tree = computed(() => convertToTree(props.flatNodes));

(() => {
  const lnbItem = getItemByPath(props.flatNodes);
  if (isNil(lnbItem)) {
    return;
  }
  const parentIds = findRelatedById(lnbItem.id, props.flatNodes);
  if (parentIds) {
    parentIds.forEach(id => expandedIds.value.add(id));
  }
})();
</script>

<template>
  <aside>
    <slot name="trigger" />

    <nav aria-label="Main navigation">
      <ul class="space-y-2">
        <li v-for="item in tree" :key="item.id">
          <TreeNode :item="item" />
        </li>
      </ul>
    </nav>
  </aside>
</template>
