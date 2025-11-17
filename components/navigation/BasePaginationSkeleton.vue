<template>
  <nav aria-label="Page search navigation" class="sdc-cursor-wrapper sdc-cursor-placeholder-wrapper">
    <ul :class="['pagination placeholder-glow', props.class]">
      <li v-for="n of MOBILE_PAGINATION_MAX_ITEM" :key="n" class="page-item page-item-placeholder placeholder rounded-circle" :aria-label="`Page ${n}`"></li>
    </ul>
  </nav>
</template>

<script setup lang="ts">

import { MOBILE_PAGINATION_MAX_ITEM } from '@/constants/PageSearchQuery';

const props = defineProps({
  class: {
    type: [String, Object, Array],
    default: undefined
  }
});
</script>

<style scoped lang="scss">
@import "assets/scss/molecules/paginationSkeleton";
</style>
