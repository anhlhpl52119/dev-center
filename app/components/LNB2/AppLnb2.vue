<script setup lang="ts">
import type { LNBItem } from './index';
import { findParent, getIdByPath } from './index';

const props = defineProps<{
  items: LNBItem[];
  level?: number;
}>();

const expandedItems = ref<Set<number>>(new Set());
const route = useRoute();

(function init() {
  const id = getIdByPath(props.items, route.path);
  if (isNullish(id)) {
    return;
  }
  const parentIds = findParent(props.items, id);
  if (parentIds) {
    parentIds.forEach(id => expandedItems.value.add(id));
  }
})();
</script>

<template>
  <aside>
    <slot name="trigger" />

    <nav :aria-label="level ? undefined : 'Main navigation'">
      <ul class="space-y-2">
        <li v-for="item in items" :key="item.id">
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
