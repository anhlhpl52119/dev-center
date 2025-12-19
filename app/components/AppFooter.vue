<script lang="ts" setup>
const STOVE_MAIN_LINK = ref('https://www.smilegate.com/');
const { t } = useI18n();
</script>

<template>
  <footer class="layout-footer md:mx-0 md:mt-8">
    <div class="footer sm:pb-40 lg:justify-center">
      <div class="footer-container md:mx-4 md:py-0 sm:px-20 lg:max-w-940">
        <!-- <FooterContent /> -->
        <p class="copy lg:mt-20">
          © Smilegate. All Rights Reserved.
        </p>
        <p class="footer-logo">
          <a :href="STOVE_MAIN_LINK" target="_blank">
            <img
              class="ci-logo"
              src="/footer-logo.png"
              alt="Smilegate Stove"
            >
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.layout-footer {
  overflow: hidden;
  position: relative;

  .footer {
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 1.6rem 0 4rem;
    letter-spacing: -0.25px;
    background-color: hsl(0deg 0% 12.16%);

    & > * {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 2.2rem;
      color: hsla(0, 0%, 100%, 0.5);
      letter-spacing: -0.0325rem;
    }

    .footer-container {
      width: 100%;
      max-width: 130rem;
    }

    .copy {
      margin-top: 2rem;
    }
  }

  .footer-logo {
    display: flex;
    align-items: center;
    margin-top: 2.4rem;

    img {
      width: auto;
      height: 4.4rem;
      margin-right: 3.2rem;
    }
  }
}
</style>
