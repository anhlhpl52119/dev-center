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
    class="mt-10 flex-1 min-w-716 max-w-900"
  />
  <MarkdownTOC
    :content="content"
    class="sticky top-0 ml-40 hidden h-screen w-204 shrink-0 overflow-y-auto pt-32 lg:block"
  />
</template>
