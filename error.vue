<template>
  <NuxtLayout>
    <main class="" role="main">
      <div class="text-center rror-api-info-wrapper">
        <div class="error-image-container">
          <div class="container-banner">
            <img :src="bannerErrorImg" alt="" class="img-layer layer-bg" />

            <img :src="penguinErrorImg" alt="Page not found mascot" class="img-layer layer-main" />
          </div>
        </div>

        <div>
          <SafeHtml
            tag="h1"
            class="error-title text-truncate-2 mt-20 text-center"
            :html="errMsgTitle"
          />

          <p class="error-msg text-truncate-3">{{ t('launcher.dev-center.error.msg') }}</p>

          <div class="group-btn-navigator">
            <!-- go previous -->
            <NuxtLink
              class="btn btn-secondary btn-error-back btn-vulcanus btn-vulcanus--plain"
              @click="goBack()"
            >
              {{ t(GO_TO_PREVIOUS_PAGE_KEY) }}
            </NuxtLink>

            <!-- go home -->
            <NuxtLink type="button" class="btn-error-back btn-vulcanus btn-vulcanus--primary" @click="navigateHome">
              <span class="text-truncate-1">{{ t('take-me-home') }}</span>
            </NuxtLink>
          </div>

          <ClientOnly>
            <SafeHtml tag="p" class="error-msg-back" :html="errMsgBack" />
            <template #fallback>
              <p class="error-msg-back"></p>
            </template>
          </ClientOnly>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>
<script lang="ts" setup>
import SafeHtml from '@/components/SafeHtml.vue';
import { RedirectTimeoutBySeconds } from '@/constants/ApiTimeout';
import { HttpStatusCode } from '@/constants/Axios';
import { GO_TO_PREVIOUS_PAGE_KEY } from '@/constants/i18n-key';
import type { NuxtError } from '#app';

const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  error: Object as () => NuxtError
});

useHead({
  bodyAttrs: {
    class: 'error-layout'
  }
});

const router = useRouter();
const { t } = useI18n();
const errMsgTitle = computed<string>(() => {
  return props.error?.statusCode === HttpStatusCode.NOT_FOUND ? t('launcher.dev-center.error.E404.title') : t('launcher.dev-center.error.title');
});

const seconds = ref<number>(RedirectTimeoutBySeconds);
const goBack = () => {
  router.back();
};
let _timerId : any = null;
const penguinErrorImg = ref<string>('/v1/img/vulcanus-penguin.png');
const bannerErrorImg = ref<string>('/v1/img/vulcanus-error-banner.png');

const errMsgBack = computed<string>(() => {
  return t('launcher.dev-center.error.msg-back', { second: seconds.value });
});

const localePath = useLocalePath();

const navigateHome = () => {
  window.location.href = localePath('/');
};

onMounted(() => {
  seconds.value = RedirectTimeoutBySeconds;
  if (seconds.value > 0) {
    _timerId = setInterval(() => {
      seconds.value--;
      if (seconds.value <= 0) {
        clearInterval(_timerId);
        navigateHome();
      }
    }, 1000);
  } else {
    navigateHome();
  }
});

onUnmounted(() => clearInterval(_timerId));

</script>
<style scoped lang="scss">
@import "assets/scss/pages/error";
.error-image-container {
  position: relative;
  margin: 0 auto;
  max-width: 46.4rem;
  height: 22rem;
}

.container-banner {
  position: absolute;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  left: 50%;
  top: 50%;
  max-width: 20rem;
  transform: translateX(-50%) translateY(-50%);
}

.img-layer {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
}

.layer-main {
  z-index: 2;
  height: 18.8rem;
  width: 12.8rem;
  transform: translateX(6.3rem);
}

.layer-bg {
  height: 15.9rem;
  width: 25.1rem;
  z-index: 1;
  transform: translateX(-6.3rem);
}
@include media-breakpoint-down(sm) {
  .layer-bg {
    position: absolute;
    transform: translateX(0);
  }

  .layer-main {
    display: none;
  }
}
</style>
