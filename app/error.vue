<script setup lang="ts">
const error = useError();
</script>

<template>
  <main>
    <h1>Error please back home</h1>
    <pre>{{ error }}</pre>
    <NuxtLinkLocale class="mt-10 text-primary" to="/">
      Back home
    </NuxtLinkLocale>
  </main>
</template>
