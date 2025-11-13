<script lang="ts" setup>
definePageMeta({
  name: 'home',
});
</script>

<template>
  <main class="relative mx-auto flex max-w-7xl">
    <AppLNB
      class="sticky top-0 hidden h-screen w-68 shrink-0 overflow-y-auto p-6 pt-8 md:block"
    />

    <AppArticle class="min-w-80 pt-10 pb-38.5" />

    <AppAside
      class="sticky top-0 hidden h-screen w-72 shrink-0 overflow-y-auto p-8 lg:block"
    />
  </main>
</template>
