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
      class="flex-1 mx-8 mt-40 lg:mx-20 xl:ml-104 xl:mr-40"
    />

    <div class="sticky hidden mt-40 self-start lg:block top-64 w-204">
      <MarkdownTOC
        :content="content"
        :title="title"
      />
    </div>
  </div>
</template>
