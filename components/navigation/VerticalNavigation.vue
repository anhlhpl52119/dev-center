<template>
  <nav class="nav-wrapper nav-vertical">
    <ul class="nav">
      <li
        :class="['nav-item', {
          active: !queryModule
        }]"
      >
        All
      </li>
      <li
        v-for="item in catalogs"
        :key="item.id"
        :class="['nav-item', {
          active: item.path === queryModule || (queryModule === undefined && item.id === 0)
        }]"
      >
        {{ item.title }}
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
import type { SearchItemModel } from '@/types/pages/DocModel';

interface Props {
  catalogs: SearchItemModel[];
}

withDefaults(defineProps<Props>(), {
  catalogs: () => [],
  isActive: false
});

const route = useRoute();
const queryModule = computed(() => {
  return route.query?.module ?? undefined;
});
</script>
<style scoped lang="scss"></style>
