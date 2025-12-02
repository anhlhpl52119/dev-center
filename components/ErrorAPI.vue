<template>
  <section class="error-api-info-wrapper">
    <div class="error-image-container">
      <img :src="bannerErrorImg" alt="" class="img-layer layer-bg" />

      <img :src="penguinErrorImg" alt="Page not found mascot" class="img-layer layer-main" />
    </div>

    <SafeHtml tag="div" :class="['mt-20 text-center ', styleErrMsg]" :html="t(errMsg)" />
    <p v-if="errMsg === 'wikijs-returncode.E6013'">
      ({{ t('dev_center.email') }}: <a href="mailto: stove.developers@smilegate.com">stove.developers@smilegate.com</a>)
    </p>
    <section class="d-grid gap-8 d-sm-flex justify-content-sm-center">
      <section v-if="errMsg === GraphQLErrorCode.REQUIRED_AUTHENTICATION.msg" class="text-center">
        <a class="btn btn-secondary btn-error-back btn-vulcanus" @click="goLogin()">{{ t('dev_center.go_to_login_page')
        }}</a>
      </section>
      <section class="text-center">
        <div class="group-btn-navigator">
          <!-- go previous -->
          <NuxtLink
            v-if="hasGoPreviousPage"
            class="btn btn-secondary btn-error-back btn-vulcanus btn-vulcanus--plain"
            @click="goBack()"
          >
            {{ t(GO_TO_PREVIOUS_PAGE_KEY) }}
          </NuxtLink>

          <!-- go home -->
          <NuxtLink :to="localePath(toRedirect)" class="btn-error-back btn-vulcanus btn-vulcanus--primary">
            {{ t('take-me-home') }}
          </NuxtLink>
        </div>

        <SafeHtml tag="p" class="error-msg-back" :html="errMsgBack" />
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { getRunTypeConfig } from '@/configs/runtime/run-type';
import { RedirectTimeoutBySeconds } from '@/constants/ApiTimeout';
import { GraphQLErrorCode } from '@/constants/GraphQL';
import { API_RETURNCODE_E500_KEY, ERROR_CONNECTION_KEY, GO_TO_PREVIOUS_PAGE_KEY } from '@/constants/i18n-key';
import { ERR_LIGHT_ASSERT, ERR_LIGHT_CND } from '@/constants/Images';
import type { PublicRunTypeModel } from '@/types/run-type/PublicRunTypeModel';

const config = useRuntimeConfig();
const RUN_TYPE = config.public.runTypeConfig.RUN_TYPE || 'live';
const { API_BASE_URL, SEED_CORE }: PublicRunTypeModel = getRunTypeConfig(RUN_TYPE);
const url = useRequestURL();
const loginRedirectUrlByGnb = `${API_BASE_URL}/login/onstove/callback?originalRedirect=${url}`;
const loginUrl: string = `${SEED_CORE?.AUTH_URL}/login?redirect_url=${loginRedirectUrlByGnb}`;

export interface ErrorAPIProps {
  styleWrapper?: string;
  showTitle?: boolean;
  // showRedirectButton?: boolean;
  errMsg?: string;
  labelButton?: string;
  toRedirect?: string;
  styleErrMsg?: string;
  showErrImg?: boolean
}
const router = useRouter();
const { t } = useI18n();
const localePath = useLocalePath();

const props = withDefaults(defineProps<ErrorAPIProps>(), {
  styleWrapper: '',
  showTitle: true,
  // showRedirectButton: true,
  errMsg: ERROR_CONNECTION_KEY,
  labelButton: 'takeMeHome',
  toRedirect: '/',
  styleErrMsg: '',
  showErrImg: true
});

const penguinErrorImg = ref<string>('/v1/img/vulcanus-penguin.png');
const bannerErrorImg = ref<string>('/v1/img/vulcanus-error-banner.png');

const hasGoPreviousPage = [GraphQLErrorCode.PAGE_NOT_FOUND.msg, API_RETURNCODE_E500_KEY].includes(props.errMsg);
const errorImg = ref<string>(ERR_LIGHT_CND);
const errMsg = computed(() => {
  return props?.errMsg || ERROR_CONNECTION_KEY;
});

const seconds = ref<number>(RedirectTimeoutBySeconds);
const errMsgBack = computed<string>(() => {
  return t('launcher.dev-center.error.msg-previous-page', { second: seconds.value });
});
let _timerId : any = null;

const handleLoadImgErr = () => {
  errorImg.value = ERR_LIGHT_ASSERT;
};

const goBack = () => {
  router.back();
};

const goLogin = () => {
  navigateTo(loginUrl, { external: true });
};

onMounted(() => {
  if (hasGoPreviousPage) {
    seconds.value = RedirectTimeoutBySeconds;
    if (seconds.value > 0) {
      _timerId = setInterval(() => {
        seconds.value--;
        if (seconds.value <= 0) {
          clearInterval(_timerId);
          goBack();
        }
      }, 1000);
    } else {
      goBack();
    }
  }
});

onUnmounted(() => clearInterval(_timerId));
</script>

<style scoped lang="scss">
@import "assets/scss/pages/errorAPI";

.error-image-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  max-width: 46.4rem;
  height: 22rem;
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
    transform: translateX(0);
  }

  .layer-main {
    display: none;
  }
}
</style>
