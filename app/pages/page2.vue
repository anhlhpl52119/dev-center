<script lang="ts" setup>
import MarkdownTOC from '~/components/markdown/MarkdownTOC.vue';

defineI18nRoute(false);

definePageMeta({
  layout: 'docs',
});

const { content, title, description, updatedAt } = useRoutesContent();
const { open } = useDrawer();

function openTocDrawer() {
  open(
    shallowRef(MarkdownTOC),
    {
      content: content.value,
      title: title.value,
    },
    'right',
  );
}

defineExpose({ openTocDrawer });
</script>

<template>
  <div class="flex">
    <MarkdownRenderer
      :content="content"
      :description="description"
      :heading="title"
      :updatedAt="updatedAt"
      class="mx-8 mt-40 flex-1 lg:mx-20 xl:mr-40 xl:ml-104"
    />

    <div class="sticky top-64 mt-40 hidden w-204 self-start lg:block">
      <MarkdownTOC :content="content" :title="title" />
    </div>
  </div>
</template>
