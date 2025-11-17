<template>
  <div
    ref="scrollTopButton"
    class="scrollTopButton invisible text-gray-400 hover:text-blue-400 transition"
  >
    <button
      type="button"
      class="btn"
      @click="scrollToTop"
    >
      <i class="ic-v2-control-long-arrow-up-line"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { debounce } from '@vavt/util';

const scrollTopButton = ref<HTMLDivElement | null>(null);
const handleDebouncedScroll = ref<any>(null);

const handleScroll = () => {
  const scrollBtn = scrollTopButton.value;

  if (scrollBtn) {
    if (window.scrollY > 0) {
      scrollBtn.classList.remove('invisible');
    } else {
      scrollBtn.classList.add('invisible');
    }
  }
};

onMounted(() => {
  handleDebouncedScroll.value = debounce(handleScroll, 10);
  window.addEventListener('scroll', handleDebouncedScroll.value);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleDebouncedScroll.value);
});

const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

<style scoped lang="scss">

</style>
