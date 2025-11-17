<template>
  <div class="stds-landing-row-card card h-100">
    <div class="card-body p-0">
      <div class="stds-landing-row-info-wrapper">
        <div class="stds-landing-row-media">
          <NuxtImg
            :src="item.thumbnailDesktop"
            :placeholder="THUMBNAIL_DEFAULT"
            class="d-none d-sm-block"
            :alt="`${item.title} banner`"
            loading="lazy"
          />
          <NuxtImg
            :src="item.thumbnailMobile"
            :placeholder="THUMBNAIL_DEFAULT"
            class="d-sm-none"
            :alt="`${item.title} banner`"
            loading="lazy"
          />
        </div>
        <div class="stds-landing-row-content">
          <h4 class="stds-landing-row-title text-truncate-1">{{ item.title }}</h4>
          <p class="stds-landing-row-desc text-truncate-2">
            {{ item.desc }}
          </p>
        </div>
      </div>
    </div>

    <div class="stds-landing-row-footer card-footer d-none d-sm-block px-24 pb-24">
      <NuxtLink
        v-if="item.href"
        :to="localePath(item?.href)"
        class="stds-landing-row-link link-blue link-underline link-underline-opacity-0 link-underline-opacity-100-hover text-truncate-2"
      >
        <span>{{ t('learn-more') }}&nbsp;</span>
        <i class="ic-v2-control-arrow-right-line"></i>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { THUMBNAIL_DEFAULT } from '@/constants/Images';
import type { FeaturesModel } from '@/types/pages/DocModel';

interface FeatureProps {
  item: FeaturesModel;
}

defineProps<FeatureProps>();
const localePath = useLocalePath();
const { t } = useI18n();
</script>

<style scoped lang="scss">
@import "assets/scss/pages/landing/featureCard";
</style>
