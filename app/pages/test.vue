<script setup lang="ts">
import ExampleDrawerContent from '@/components/ExampleDrawerContent.vue';

defineI18nRoute(false);

const { open } = useDrawer();

function openExampleDrawer() {
  open(ExampleDrawerContent, {
    title: 'Custom Title',
    message: 'This drawer was opened from the test page!',
  });
}

function openSimpleDrawer() {
  open(ExampleDrawerContent);
}
</script>

<template>
  <div class="p-8">
    <h1 class="mb-6 text-2xl font-bold">
      Drawer Test Page
    </h1>

    <div class="space-y-4">
      <button
        class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        @click="openExampleDrawer"
      >
        Open Drawer with Custom Props
      </button>

      <button
        class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        @click="openSimpleDrawer"
      >
        Open Simple Drawer
      </button>
    </div>
  </div>
</template>
