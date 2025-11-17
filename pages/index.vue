<script setup lang="ts">
import { getHead } from '@/configs/head';
import { useHomePageStore } from '@/stores/pageQueryStore';
import type { FeaturesModel } from '@/types/pages/DocModel';

const store = useHomePageStore();
const errMsg = ref<string>('');
const devSiteProducts = ref<FeaturesModel[]>([]);
const localePath = useLocalePath();

const {
  locale
} = useI18n();

const RUN_TYPE = process.env.RUN_TYPE || 'dev';
useHead(getHead(RUN_TYPE));

const initPage = async () => {
  const data = await store.fetchDevSiteProducts(locale.value);
  if (data.errMsg) {
    errMsg.value = data.errMsg;
  } else {
    devSiteProducts.value = data.data;
    navigateTo(localePath(data.data[0].href));
  }
};

initPage();
</script>
