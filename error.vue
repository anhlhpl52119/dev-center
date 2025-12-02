<template>
  <NuxtLayout>
    <main class="sdc-error-page container" role="main">
      <div class="text-center sdc-error-wrapper">
        <img
          loading="lazy"
          :src="errorImg"
          class="error-thumbnail"
          alt="The red icon on a computer screen represents the image for a page error"
          @error="handleLoadImgErr()"
        />
        <div>
          <SafeHtml tag="h1" class="error-title text-truncate-2" :html="errMsgTitle" />
          <p class="error-msg text-truncate-3">{{ t('launcher.dev-center.error.msg') }}</p>

          <button type="button" class="btn btn-secondary btn-error-back" @click="navigateHome">
            <span class="text-truncate-1">{{ t('take-me-home') }}</span>
          </button>

          <ClientOnly>
            <SafeHtml tag="p" class="error-msg-back" :html="errMsgBack" />
            <template #fallback>
              <!-- this will be rendered on server side -->
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
import { ERR_LIGHT_ASSERT, ERR_LIGHT_CND } from '@/constants/Images';
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

const { t } = useI18n();
const errMsgTitle = computed<string>(() => {
  return props.error?.statusCode === HttpStatusCode.NOT_FOUND ? t('launcher.dev-center.error.E404.title') : t('launcher.dev-center.error.title');
});

const errorImg = ref<string>(ERR_LIGHT_CND);
const seconds = ref<number>(RedirectTimeoutBySeconds);
let _timerId : any = null;

const errMsgBack = computed<string>(() => {
  return t('launcher.dev-center.error.msg-back', { second: seconds.value });
});

const localePath = useLocalePath();

const handleLoadImgErr = () => {
  errorImg.value = ERR_LIGHT_ASSERT;
};

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
</style>
