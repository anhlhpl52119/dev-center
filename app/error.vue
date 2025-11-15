<script setup lang="ts">
const error = useError();
// navigateTo('/', { replace: true });
if (error.value?.statusCode) {
  navigateTo('/', { replace: true });
}
</script>

<template>
  <main>404</main>
</template>
