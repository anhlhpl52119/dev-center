<script lang="ts" setup>
import MarkdownRenderer from '~/components/markdown/MarkdownRenderer.vue';
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

    <div
      class="scrollbar-gutter-stable sticky top-64 hidden max-h-[calc(100vh-6.4rem)] w-204 self-start overflow-y-auto lg:block"
    >
      <MarkdownTOC
        :content="content"
        :title="title"
        class="mt-40 mb-20"
      />
    </div>
  </div>
</template>
