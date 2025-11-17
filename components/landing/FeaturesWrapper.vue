<template>
  <section class="stds-landing-row feature-section">
    <div class="stds-landing-row-inner container">
      <div v-if="isLoadingCard" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-24">
        <div v-for="n in 3" :key="n" class="col">
          <FeatureCardEmpty />
        </div>
      </div>

      <template v-else>
        <div
          v-if="devSiteProducts && devSiteProducts.length"
          class="stds-landing-row-group row row-cols-1 row-cols-sm-2 row-cols-md-3"
        >
          <div v-for="item in devSiteProducts" :key="item.id" class="col">
            <FeatureCard :item="item" />
          </div>
        </div>

        <h3 v-if="!errMsg && devSiteProducts.length === 0">{{ t(DEV_CENTER_EMPTY_DATA_KEY) }}</h3>
        <ErrorAPI
          v-else-if="!devSiteProducts || !devSiteProducts.length"
          :showTitle="false"
          :errMsg="errMsg"
          styleWrapper="text-center"
          style="min-height: calc(100vh - 6rem);"
        />
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import FeatureCardEmpty from '@components/landing/FeatureCardEmpty.vue';

import ErrorAPI from '@/components/ErrorAPI.vue';
import FeatureCard from '@/components/landing/FeatureCard.vue';
import { DEV_CENTER_EMPTY_DATA_KEY } from '@/constants/i18n-key';
import { useHomePageStore } from '@/stores/pageQueryStore';
import type { FeaturesModel } from '@/types/pages/DocModel';

const store = useHomePageStore();
const errMsg = ref<string>('');
const isLoadingCard = ref<boolean>(true);

const {
  t, locale
} = useI18n();
const devSiteProducts = ref<FeaturesModel[]>([]);

const initPage = async () => {
  isLoadingCard.value = true;
  errMsg.value = '';

  const data = await store.fetchDevSiteProducts(locale.value);
  if (data.errMsg) {
    errMsg.value = data.errMsg;
  } else {
    devSiteProducts.value = data.data;
  }

  isLoadingCard.value = false;
};

initPage();
</script>

<style scoped lang="scss">
@import "assets/scss/pages/landing/featureWrapper";
</style>
