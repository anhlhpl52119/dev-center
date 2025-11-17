<template>
  <div class="gallery">
    <div
      class="fullscreen-overlay"
      @click.self="onCloseFullscreen"
    >
      <img :src="imageUrl" class="fullscreen-image" />
      <button class="fullscreen-close-button" @click="onCloseFullscreen">
        &times;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';

defineProps<{
  imageUrl: string;
}>();

const emit = defineEmits(['closeFullscreen']);

const onCloseFullscreen = () => {
  document.body.style.overflow = '';
  emit('closeFullscreen');
};

onMounted(() => {
  document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<style lang="scss" scoped>
@import 'assets/scss/pages/detail/gallery.scss';
</style>
