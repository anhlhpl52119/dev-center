<script lang="ts" setup>
import { dummyLNB } from '@/data/lnb';

definePageMeta({
  name: 'home',
});
const { $api } = useNuxtApp();
const markdown = ref('');
onMounted(async () => {
  const { data } = await $api('/api/markdown', {
    baseURL: '/',
  });
  markdown.value = data.pages.singleByPath.content;
});
</script>

<template>
  <main class="relative mx-auto flex max-w-7xl">
    <OldLeftNavBar
      class="sticky top-0 mr-26 hidden h-screen w-68 shrink-0 overflow-y-auto p-6 pt-8 md:block"
      :catalogs="dummyLNB"
      isShowTocMenuIcon
    />

    <div class="min-w-80 pt-10 pb-38.5 ">
      <ContentMain />
    </div>

    <MdTOC
      :content="markdown"
      class="sticky top-0 ml-10 hidden h-screen w-51 shrink-0 overflow-y-auto pt-8 lg:block"
    />
  </main>
</template>
