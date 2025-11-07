<script lang="ts" setup>
definePageMeta({
  name: 'home',
});

const config = useRuntimeConfig();
</script>

<template>
  <main class="asdss">
    <h1>Ok bro</h1>
    <div>
      <h1 class="font-bold">
        Runtime
      </h1>
      <pre class="mt-24">{{ config.public }}</pre>
    </div>
    <span class="block mt-12 text-red-300">hello</span>
  </main>
</template>
