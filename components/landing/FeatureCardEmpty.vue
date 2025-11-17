<template>
  <div class="stds-landing-row-card card h-100">
    <div class="card-body p-0">
      <div class="stds-landing-row-info-wrapper">
        <div class="stds-landing-row-media">
          <NuxtImg :src="THUMBNAIL_DEFAULT" :placeholder="THUMBNAIL_DEFAULT" alt="Thumbnail product" loading="lazy" />
        </div>
        <div class="stds-landing-row-content">
          <h5 class="card-title placeholder-glow mb-lg-48">
            <span class="text-on-surface-elevation-1 placeholder col-6"></span>
            <span class="text-secondary placeholder col-12"></span>
            <span class="text-secondary placeholder col-12"></span>
          </h5>

          <a class="text-blue disabled placeholder col-6" aria-disabled="true"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { THUMBNAIL_DEFAULT } from '@/constants/Images';

</script>

<style scoped lang="scss">
@import "assets/scss/pages/landing/featureCard";
</style>
