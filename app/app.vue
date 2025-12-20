<script setup lang="ts">
const i18nHead = useLocaleHead();
const { t } = useI18n();
useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
  title: t('common.vulcanus_guide'),
}));
useSeoMeta({
  title: 'Vulcanus developer center guide',
  ogTitle: 'Stove Vulcanus Developer center',
  description: 'This is developer center for vulcanus documentation',
  ogDescription:
    'Center for Developer of vulcanus documentation for integration',
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <GlobalDrawer />
</template>
