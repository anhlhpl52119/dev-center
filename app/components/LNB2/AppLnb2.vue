<script setup lang="ts">
import type { LNBItem } from './index';
import { useLnb } from './index';

const props = defineProps<{
  items: LNBItem[];
}>();

const { convertToTree, findRelatedById, getItemByPath } = useLnb();
const expandedItems = ref<Set<number>>(new Set());
const tree = computed(() => convertToTree(props.items));

(() => {
  const lnbItem = getItemByPath();
  if (isNullish(lnbItem)) {
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

    <nav aria-label="'Main navigation'">
      <ul class="space-y-2">
        <li v-for="item in tree" :key="item.id">
          <FolderLink2
            isRoot
            :item="item"
            :expandIds="expandedItems"
          />
        </li>
      </ul>
    </nav>
  </aside>
</template>
