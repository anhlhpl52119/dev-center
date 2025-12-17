<script lang="ts" setup>
defineProps<{
  path: string;
}>();
const { content, title, description, updatedAt } = useRoutesContent();
</script>

<template>
  <div class="flex">
    <MarkdownRenderer
      :content="content"
      :description="description"
      :heading="title"
      :updatedAt="updatedAt"
      class="flex-1"
    />
    <pre>{{ $route.params.locale }}</pre>
    <!-- <MarkdownTOC
      :content="content"
      class="w-204"
    /> -->
  </div>
</template>
