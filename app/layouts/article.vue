<script lang="ts" setup>
/**
 * Convert flat array of Model to hierarchical Tree structure
 * @param models - Array of Model objects
 * @returns Array of Tree objects with nested children
 */
</script>

<template>
  <AppHeader class="bg-abg-base sticky top-0 z-99" />

  <main class="relative mx-auto flex max-w-1336 justify-center">
    <div
      class="sticky top-0 mr-104 hidden h-screen w-272 shrink-0 overflow-y-auto p-24 pt-32 md:block"
    >
      <button class="mb-24">
        <Icon name="svg:menu" class="size-40" />
      </button>

      <AppLeftNavigationBar />
    </div>

    <!-- article -->
    <slot />
  </main>
</template>
