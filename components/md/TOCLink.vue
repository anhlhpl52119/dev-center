<template>
  <li class="toc-nav-item">
    <a
      :class="['toc-link', { 'active': isActive }]"
      @click="onClickItem(tocItem);"
    >
      <SafeHtml class="text-truncate-2" tag="span" :html="tocItem.text" />
    </a>
    <ul v-if="tocItem.children" class="toc-nav-sub-list">
      <TOCLink
        v-for="item in tocItem.children"
        :key="`${tocItem.text}-link-${item.level}-${item.text}`"
        :tocItem="item"
        :isActive="currentHash === item.href"
        @select="scrollToHash({hash: $event, autoEncode: false})"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import type { TocItem } from '@/types/md/type';

defineProps<{
  tocItem: TocItem;
  isActive: boolean;
}>();

const emits = defineEmits<{
  select: [v: string];
}>();

const { currentHash, updateHash, scrollToHash } = useTOCLink();

const onClickItem = (item: TocItem) => {
  updateHash(item.href);
  emits('select', item.href);
};

</script>

<style scoped lang="scss">
@import "assets/scss/pages/detail/tocLink";
</style>
