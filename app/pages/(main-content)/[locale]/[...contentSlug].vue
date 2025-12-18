<script lang="ts" setup>
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

    <MarkdownTOC
      :content="content"
      class="w-204"
    />
  </div>
</template>
