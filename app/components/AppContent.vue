<script lang="ts" setup>
defineProps<{
  content: string;
  updatedAt: string;
  description: string;
  heading: string;
}>();
</script>

<template>
  <div class="flex">
    <MarkdownRenderer
      :content="content"
      :description="description"
      :heading="heading"
      :updatedAt="updatedAt"
      class="flex-1"
    />

    <MarkdownTOC
      :content="content"
      class="w-204"
    />
  </div>
</template>
