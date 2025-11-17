<template>
  <section class="stds-landing-row hero-section">
    <div class="stds-landing-row-inner clearfix">
      <figure class="stds-landing-row-media">
        <NuxtImg
          format="webp"
          :src="images.mobile.cdn"
          :placeholder="images.mobile.fallback"
          class="d-block d-sm-none img-fluid banner-mobile"
          alt="A banner with a white background with a bunch of orange and black cubes"
        />
        <NuxtImg
          format="webp"
          :src="images.tablet.cdn"
          :placeholder="images.tablet.fallback"
          class="d-none d-sm-block d-md-none img-fluid banner-tablet"
          alt="A banner with a white background with a bunch of orange and black cubes"
        />
        <NuxtImg
          format="webp"
          :src="images.desktop.cdn"
          :placeholder="images.desktop.fallback"
          class="d-none d-md-block img-fluid banner-desktop"
          alt="A banner with a white background with a bunch of orange and black cubes"
        />
      </figure>
      <div class="stds-landing-row-header">
        <h1 class="stds-landing-row-title">STOVE DEVELOPERS</h1>
        <p class="stds-landing-row-desc">
          <span>{{ t('banner-text.1') }}</span>
          <br />
          <span>{{ t('banner-text.2') }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ImageLinkConfig {
  cdn: string;
  fallback: string;
}
const images : Record<string, ImageLinkConfig> = {
  desktop: {
    cdn: 'https://static-resource.onstove.com/live/application_no/STATIC/developer-center/common/main-banner-desktop.png',
    fallback: '/v1/img/banner/lg.png'
  },
  tablet: {
    cdn: 'https://static-resource.onstove.com/live/application_no/STATIC/developer-center/common/main-banner-tablet.png',
    fallback: '/v1/img/banner/sm.png'
  },
  mobile: {
    cdn: 'https://static-resource.onstove.com/live/application_no/STATIC/developer-center/common/main-banner-mobile.png',
    fallback: '/v1/img/banner/xs.png'
  }
};

const { t } = useI18n();

</script>

<style scoped lang="scss">
@import "assets/scss/pages/landing/hero";
</style>
