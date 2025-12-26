<script setup lang="ts">
const props = defineProps<{ articleId: string; rawMarkdown: string }>();

// Gọi API render đã được cache
const { data, pending } = await useAsyncData(`render-${props.articleId}`, () =>
  $fetch('/api/render', {
    method: 'POST',
    body: {
      id: props.articleId,
      content: props.rawMarkdown,
    },
  }));

// Xử lý Event Delegation cho các nút bấm trong Markdown (ví dụ: nút Copy Code)
const mdContainer = ref<HTMLElement | null>(null);
onMounted(() => {
  if (mdContainer.value) {
    mdContainer.value.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('copy-code-btn')) {
        // Logic copy code...
      }
    });
  }
});
</script>

<template>
  <div class="markdown-wrapper">
    <div v-if="pending" class="skeleton-loader">
      Đang chuẩn bị nội dung...
    </div>
    <div
      v-else
      ref="mdContainer"
      class="prose lg:prose-xl"
      v-html="data?.html"
    />
  </div>
</template>
