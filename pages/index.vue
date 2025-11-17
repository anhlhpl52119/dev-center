<template>
  <main class="height-wrapper">
    <CarouselHero />
    <FeaturesWrapper />
  </main>
</template>

<script setup lang="ts">
import CarouselHero from '@/components/landing/CarouselHero.vue';
import FeaturesWrapper from '@/components/landing/FeaturesWrapper.vue';
import { getHead } from '@/configs/head';

const RUN_TYPE = process.env.RUN_TYPE || 'dev';
useHead(getHead(RUN_TYPE));
</script>

<style scoped lang="scss"></style>
