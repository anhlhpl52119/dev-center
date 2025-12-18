<script lang="ts" setup>
const { content, title, description, updatedAt } = useRoutesContent();
</script>

<template>
  <div class="flex mt-40">
    <MarkdownRenderer
      :content="content"
      :description="description"
      :heading="title"
      :updatedAt="updatedAt"
      class="flex-1 mx-8 lg:mx-20 xl:ml-104 xl:mr-40"
    />

    <div class="sticky hidden lg:block top-64 w-204 h-[calc(100vh-6.4rem)] overflow-auto">
      <MarkdownTOC
        :content="content"
        :title="title"
      />
    </div>
  </div>
</template>
