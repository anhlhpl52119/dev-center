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
    <h1 class="text-2xl font-bold mb-6">
      Drawer Test Page
    </h1>

    <div class="space-y-4">
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        @click="openExampleDrawer"
      >
        Open Drawer with Custom Props
      </button>

      <button
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        @click="openSimpleDrawer"
      >
        Open Simple Drawer
      </button>
    </div>
  </div>
</template>
