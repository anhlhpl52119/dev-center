<script lang="ts" setup>
import { dummyLNB } from '@/data/lnb';

definePageMeta({
  name: 'home',
});
</script>

<template>
  <main class="relative mx-auto flex max-w-7xl">
    <OldLeftNavBar
      class="sticky top-0 mr-26 hidden h-screen w-68 shrink-0 overflow-y-auto p-6 pt-8 md:block"
      :catalogs="dummyLNB"
      isShowTocMenuIcon
    />

    <!-- <AppArticle class="min-w-80 pt-10 pb-38.5" /> -->

    <AppAside
      class="sticky top-0 ml-10 hidden h-screen w-51 shrink-0 overflow-y-auto pt-8 lg:block"
    />
  </main>
</template>
