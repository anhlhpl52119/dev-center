<template>
  <footer class="layout-footer">
    <div class="footer">
      <div class="footer-container">
        <!-- <FooterContent /> -->
        <p class="copy">{{ t('footer.copyRighter') }}</p>
        <p class="footer-logo">
          <a :href="STOVE_MAIN_LINK" target="_blank">
            <img class="ci-logo" src="https://d2x8kymwjom7h7.cloudfront.net/live/application_no/10009/iop-center-front/ci-group-copy2x.png" alt="Smilegate Stove" />
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const STOVE_MAIN_LINK = ref('https://www.smilegate.com/');
const { t } = useI18n();
</script>

<style lang="scss">
@import "assets/scss/pages/footer";
</style>
