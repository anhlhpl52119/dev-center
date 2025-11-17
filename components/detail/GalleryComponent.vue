<template>
  <div class="gallery">
    <div
      v-for="(image, index) in images"
      :key="index"
      class="gallery-item"
      @click="openFullscreen(index)"
    >
      <img :src="image" class="gallery-img" />
    </div>

    <div
      v-if="selectedIndex !== null"
      class="fullscreen-overlay"
      @click.self="closeFullscreen"
    >
      <img :src="images[selectedIndex]" class="fullscreen-image" />
      <button class="fullscreen-close-button" @click="closeFullscreen">
        &times;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue';

defineProps<{
  images: string[]
}>();

const selectedIndex = ref<number | null>(null);

const openFullscreen = (index: number) => {
  selectedIndex.value = index;
  document.body.style.overflow = 'hidden';
};

const closeFullscreen = () => {
  selectedIndex.value = null;
  document.body.style.overflow = '';
};

onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<style lang="scss" scoped>
@import 'assets/scss/pages/detail/gallery.scss';
</style>
