<template>
  <GNBHeader />
  <slot></slot>
  <Footer />
  <ScrollButton />
</template>

<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import GNBHeader from '@/components/GNBHeader.vue';
import ScrollButton from '@/components/ScrollButton.vue';
import { commonHead } from '@/configs/head';

useHead(commonHead);

const pageshowHandler = (evt: PageTransitionEvent) => {
  if (evt.persisted) {
    window.location.reload();
  }
};

onMounted(() => {
  if (isProdMode()) {
    // Use to fix temp when run production mode, back browser middleware not run
    // Fix follow https://jira.smilegate.net/browse/SGVTN-10157
    window.addEventListener('pageshow', pageshowHandler, false);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('pageshow', pageshowHandler, false);
});
</script>
<style scoped lang="scss">
</style>
