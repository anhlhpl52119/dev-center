<template>
  <nav aria-label="Page search navigation" class="sdc-cursor-wrapper">
    <ul :class="['pagination', props.class]">
      <slot name="firstPage" :onClick="moveFirstPage">
        <li class="page-item">
          <NuxtLink
            v-if="displayFirstAndLastButton"
            :to="{
              query: { ...route.query, page: 1}
            }"
            role="button"
            :class="['page-link', { disabled: !canGoPrev }]"
            aria-label="First page"
            @click="moveFirstPage"
          >
            <i class="ic-v2-control-double-arrow-left-line ic-control"></i>
          </NuxtLink>
        </li>
      </slot>

      <slot name="prev" :onClick="onClickPrev">
        <li class="page-item">
          <NuxtLink
            v-if="prevButton"
            :to="{
              query: { ...route.query, page: currentPage-1 }
            }"
            role="button"
            :class="['page-link', { disabled: !canGoPrev }]"
            aria-label="Prev"
            @click="onClickPrev"
          >
            <i class="ic-v2-control-arrow-left-line ic-control"></i>
          </NuxtLink>
        </li>
      </slot>

      <li v-for="(page, index) of displayedPages" :key="`${page}-${index}`" class="page-item">
        <NuxtLink
          :to="{
            query: { ...route.query, page: page }
          }"
          role="button"
          :class="['page-link', { active: page === currentPage }]"
          :aria-label="`Page ${page}`"
          @click="() => onClickPage(page)"
        >
          <span>{{ page }}</span>
        </NuxtLink>
      </li>

      <slot name="next" :onClick="onClickNext">
        <li class="page-item">
          <NuxtLink
            v-if="nextButton"
            :to="{
              query: { ...route.query, page: currentPage+1 }
            }"
            role="button"
            class="page-link"
            :class="['page-link', { disabled: !canGoNext }]"
            aria-label="Next"
            @click="onClickNext"
          >
            <i class="ic-v2-control-arrow-right-line ic-control"></i>
          </NuxtLink>
        </li>
      </slot>

      <slot name="firstPage" :onClick="moveLastPage">
        <li class="page-item">
          <NuxtLink
            v-if="displayFirstAndLastButton"
            :to="{
              query: { ...route.query, page: lastPage }
            }"
            role="button"
            :class="['page-link', { disabled: !canGoNext }]"
            aria-label="Last page"
            @click="moveLastPage"
          >
            <i class="ic-v2-control-double-arrow-right-line ic-control"></i>
          </NuxtLink>
        </li>
      </slot>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import type { Button, ButtonSize } from '@/types/ui';
import { BUTTON_SIZES, Pagination } from '@/types/ui';

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  pageCount: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    default: 10,
    validate(value: number) {
      return value >= 5 && value < Number.MAX_VALUE;
    }
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: () => BUTTON_SIZES.md
  },
  prevButton: {
    type: Object as PropType<Button>,
    default: () => Pagination.default.prevButton as Button
  },
  nextButton: {
    type: Object as PropType<Button>,
    default: () => Pagination.default.nextButton as Button
  },
  divider: {
    type: String,
    default: '…'
  },
  class: {
    type: [String, Object, Array],
    default: undefined
  },
  displayFirstAndLastButton: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits<{
  'update:modelValue': [value: number]; // named tuple syntax
}>();

const route = useRoute();

const currentPage = computed({
  get() {
    return props.modelValue;
  },
  set(value: number) {
    emit('update:modelValue', value);
  }
});

const lastPage = Math.ceil(props.total / props.pageCount);

const pages = computed(() => {
  return Array.from(
    { length: Math.ceil(props.total / props.pageCount) },
    (_: any, i: number) => i + 1
  );
});

const displayedPages = computed(() => {
  const totalPages = pages.value.length;
  const current = currentPage.value;
  const maxDisplayedPages = Math.max(props.max, 5);

  const r = Math.floor((Math.min(maxDisplayedPages, totalPages) - 5) / 2);
  const r1 = current - r;
  const r2 = current + r;

  const beforeWrapped = r1 - 1 > 1;
  const afterWrapped = r2 + 1 < totalPages;

  const items: Array<number | string> = [];

  if (totalPages <= maxDisplayedPages) {
    for (let i = 1; i <= totalPages; i++) {
      items.push(i);
    }
    return items;
  }

  items.push(1);

  if (beforeWrapped) {
    items.push(props.divider);
  }

  if (!afterWrapped) {
    const addedItems = current + r + 2 - totalPages;
    for (let i = current - r - addedItems; i <= current - r - 1; i++) {
      items.push(i);
    }
  }

  for (let i = Math.max(2, r1); i <= Math.min(totalPages, r2); i++) {
    items.push(i);
  }

  if (!beforeWrapped) {
    const addedItems = 1 - (current - r - 2);
    for (let i = current + r + 1; i <= current + r + addedItems; i++) {
      items.push(i);
    }
  }

  if (afterWrapped) {
    items.push(props.divider);
  }

  if (r2 < totalPages) {
    items.push(totalPages);
  }

  // Replace divider by number on start edge case [1, '…', 3, ...]
  if (items.length >= 3 && items[1] === props.divider && items[2] === 3) {
    items[1] = 2;
  }

  // Replace divider by number on end edge case [..., 48, '…', 50]
  if (
    items.length >= 3 &&
    items[items.length - 2] === props.divider &&
    items[items.length - 1] === items.length
  ) {
    items[items.length - 2] = items.length - 1;
  }

  return items;
});

const canGoPrev = computed(() => currentPage.value > 1);
const canGoNext = computed(() => currentPage.value < pages.value.length);
const onClickPage = (page: number | string) => {
  if (typeof page === 'string') {
    return;
  }

  currentPage.value = page;
};

const onClickPrev = () => {
  if (!canGoPrev.value) {
    return;
  }

  currentPage.value--;
};

const onClickNext = () => {
  if (!canGoNext.value) {
    return;
  }

  currentPage.value++;
};

const moveFirstPage = () => {
  if (!canGoPrev.value) {
    return;
  }

  currentPage.value = 1;
};

const moveLastPage = () => {
  if (!canGoNext.value) {
    return;
  }

  currentPage.value = lastPage;
};
</script>

<style scoped lang="scss">
@import "assets/scss/pages/search/pagination";
</style>
