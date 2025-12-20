<script setup lang="ts">
interface Props {
  title?: string;
  message?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Example Drawer',
  message: 'This is an example drawer content',
});

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">
        {{ title }}
      </h2>
      <button class="text-gray-500 hover:text-gray-700" @click="emit('close')">
        ✕
      </button>
    </div>
    <p class="mb-4">
      {{ message }}
    </p>
    <p class="text-sm text-gray-600">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Quidem ut quo doloremque deleniti praesentium voluptate
      adipisci sit eius facere rem facilis esse tenetur.
    </p>
  </div>
</template>
