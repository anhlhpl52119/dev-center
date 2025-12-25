<script lang="ts" setup>
import MarkdownTOC from '~/components/markdown/MarkdownTOC.vue';

definePageMeta({
  layout: 'docs',
});

const { content, title, description, updatedAt } = useRoutesContent();
</script>

<template>
  <div class="flex flex-1">
    <MarkdownRenderer
      :content="content"
      :description="description"
      :heading="title"
      :updatedAt="updatedAt"
      class="mx-8 mt-40 flex-1 lg:mx-20 xl:mr-40 xl:ml-104"
    />

    <div class="sticky top-64 mt-40 hidden w-204 self-start overflow-hidden lg:block">
      <MarkdownTOC :content="content" :title="title" />
    </div>
  </div>
</template>
