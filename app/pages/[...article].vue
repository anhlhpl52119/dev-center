<script lang="ts" setup>
definePageMeta({
  layout: 'article',
});

const { content, title, updatedAt } = useRoutesContent();
</script>

<template>
  <AppArticle
    description="desc"
    :content="content"
    :heading="title"
    :updatedAt="updatedAt"
    class="mt-10 max-w-900 min-w-716 flex-1"
  />
  <MarkdownTOC
    :content="content"
    class="sticky top-64 ml-40 hidden h-[calc(100vh-256px)] w-204 shrink-0 overflow-y-auto pt-32 xl:block"
  />
</template>
