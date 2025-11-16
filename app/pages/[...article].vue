<script lang="ts" setup>
definePageMeta({
  layout: 'article',
});
const { content } = useRoutesContent();
const markdown = computed(() => content.value);
</script>

<template>
  <AppArticle class="mt-10" />
  <MarkdownTOC
    :content="markdown"
    class="sticky top-0 ml-10 hidden h-screen w-51 shrink-0 overflow-y-auto pt-8 lg:block"
  />
</template>
