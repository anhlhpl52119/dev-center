<template>
  <section class="error-api-info-wrapper">
    <img
      v-if="showErrImg"
      loading="lazy"
      :src="errorImg"
      class="error-thumbnail"
      alt="The red icon on a computer screen represents the image for a page error"
      @error="handleLoadImgErr()"
    />
    <SafeHtml tag="div" :class="['text-center', styleErrMsg]" :html="t(errMsg)" />
    <p v-if="errMsg === 'wikijs-returncode.E6013'">({{ t('dev_center.email') }}: <a href="mailto: stove.developers@smilegate.com">stove.developers@smilegate.com</a>)</p>
    <section class="d-grid gap-8 d-sm-flex justify-content-sm-center">
      <section v-if="errMsg === GraphQLErrorCode.REQUIRED_AUTHENTICATION.msg" class="text-center">
        <a class="btn btn-secondary btn-error-back btn-new-error" @click="goLogin()">{{ t('dev_center.go_to_login_page') }}</a>
        <!-- <SafeHtml tag="p" class="error-msg-back" :html="errMsgBack" /> -->
      </section>
      <section v-else-if="hasGoPreviousPage" class="text-center">
        <a class="btn btn-secondary btn-error-back btn-new-error" @click="goBack()">{{ t(GO_TO_PREVIOUS_PAGE_KEY) }}</a>
        <SafeHtml tag="p" class="error-msg-back" :html="errMsgBack" />
      </section>
      <NuxtLink v-else :to="localePath(toRedirect)" class="btn btn-secondary btn-error-back btn-new-error">
        {{ t('take-me-home') }}
      </NuxtLink>
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
</style>
