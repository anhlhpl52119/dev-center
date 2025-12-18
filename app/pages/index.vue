<script lang="ts" setup>
definePageMeta({ name: 'home' });
const localePath = useLocalePath();
const { SearchByTags } = useGraphqlRequest();

const { locale } = useI18n();
const { data: site } = await useAsyncData('site', () =>
  SearchByTags({
    tags: [`section-dev-products-${locale.value}`],
  }));

navigateTo(localePath(`/${site.value?.pages?.menu[0]?.path}`), { replace: true, redirectCode: 307 });
</script>
