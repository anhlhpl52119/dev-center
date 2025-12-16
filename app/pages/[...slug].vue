<script lang="ts" setup>
definePageMeta({
  layout: 'article',
});

const { content, title, description, updatedAt } = useRoutesContent();
</script>

<template>
  <AppContent
    :description="description"
    :content="content"
    :heading="title"
    :updatedAt="updatedAt"
    class="mt-40 flex-1 w-full lg:max-w-716 mx-16 lg:ml-104 lg:mr-40"
  />
  <MarkdownTOC
    :content="content"
    class="sticky top-64 hidden h-screen w-204 shrink-0 overflow-y-auto pt-32 xl:block"
  />
</template>
