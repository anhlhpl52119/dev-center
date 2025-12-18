<script setup lang="ts">
const error = useError();
</script>

<template>
  <main>
    <h1>Error please back home</h1>
    <pre>{{ error }}</pre>
    <NuxtLinkLocale class="text-primary mt-10" to="/">
      Back home
    </NuxtLinkLocale>
  </main>
</template>
