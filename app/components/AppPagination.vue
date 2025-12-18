<script setup lang="ts">
interface Props {
  currentPage?: number;
  totalPages?: number;
  showFirstLast?: boolean;
  maxVisible?: number;
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  totalPages: 10,
  showFirstLast: true,
  maxVisible: 5,
});

const emit = defineEmits<{
  pageChange: [page: number];
}>();

const canGoPrev = computed(() => props.currentPage > 1);
const canGoNext = computed(() => props.currentPage < props.totalPages);

const displayedPages = computed(() => {
  const { currentPage, totalPages, maxVisible } = props;
  const pages: number[] = [];

  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

function goToPage(page: number) {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('pageChange', page);
  }
}
</script>

<template>
  <nav role="navigation" aria-label="Pagination navigation">
    <ul class="flex items-center gap-4">
      <!-- First page -->
      <li v-if="showFirstLast">
        <button
          type="button"
          :disabled="!canGoPrev"
          aria-label="Go to first page"
          class="flex h-32 w-32 items-center justify-center rounded-full border border-abd-base bg-surface text-quiet transition-colors hover:bg-abg-dimmed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-surface"
          @click="goToPage(1)"
        >
          <Icon name="svg:double-arrow-left" class="size-12" />
        </button>
      </li>

      <!-- Previous page -->
      <li>
        <button
          type="button"
          :disabled="!canGoPrev"
          aria-label="Go to previous page"
          class="flex h-32 w-32 items-center justify-center rounded-full border border-abd-base bg-surface text-quiet transition-colors hover:bg-abg-dimmed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-surface"
          @click="goToPage(currentPage - 1)"
        >
          <Icon name="svg:single-arrow-left" class="size-12" />
        </button>
      </li>

      <!-- Page numbers -->
      <li v-for="page in displayedPages" :key="page">
        <button
          type="button"
          :aria-label="`Go to page ${page}`"
          :aria-current="page === currentPage ? 'page' : undefined"
          class="flex h-32 w-32 items-center justify-center rounded-full border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2"
          :class="page === currentPage
            ? 'border-primary bg-primary text-surface'
            : 'border-abd-base bg-surface text-base hover:bg-abg-dimmed'"
          @click="goToPage(page)"
        >
          <span class="text-14 leading-24 font-medium">{{ page }}</span>
        </button>
      </li>

      <!-- Next page -->
      <li>
        <button
          type="button"
          :disabled="!canGoNext"
          aria-label="Go to next page"
          class="flex h-32 w-32 items-center justify-center rounded-full border border-abd-base bg-surface text-quiet transition-colors hover:bg-abg-dimmed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-surface"
          @click="goToPage(currentPage + 1)"
        >
          <Icon name="svg:single-arrow-right" class="size-12" />
        </button>
      </li>

      <!-- Last page -->
      <li v-if="showFirstLast">
        <button
          type="button"
          :disabled="!canGoNext"
          aria-label="Go to last page"
          class="flex h-32 w-32 items-center justify-center rounded-full border border-abd-base bg-surface text-quiet transition-colors hover:bg-abg-dimmed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-surface"
          @click="goToPage(totalPages)"
        >
          <Icon name="svg:double-arrow-right" class="size-12" />
        </button>
      </li>
    </ul>
  </nav>
</template>
