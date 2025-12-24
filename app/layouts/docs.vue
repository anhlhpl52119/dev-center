<script lang="ts" setup>
import { PageTreeMode } from '~~/graphql';

const { LeftNavigationBarTree } = useGraphqlRequest();
const { locale } = useI18n();
const route = useRoute();

const { data: lnbData } = await useAsyncData('lnb', () =>
  LeftNavigationBarTree({
    locale: locale.value,
    mode: PageTreeMode.Like,
    path: singleSlash(route.path.replace(locale.value, '')),
  }));
</script>

<template>
  <AppHeader class="bg-abg-base sticky inset-y-0 top-0 z-3 h-64" />

  <AppMobileHeaderNav class="bg-abg-base/80 border-y-abd-base sticky inset-y-0 top-64 z-3 h-45 w-full border-y backdrop-blur-sm md:hidden" />

  <div class="min-h-[calc(100vh-6.4rem)]">
    <AppLnb2
      :items="lnbData?.pages?.tree || []"
      class="scrollbar-gutter-stable sticky top-64 hidden max-h-[calc(100vh-6.4rem)] w-272 self-start overflow-auto p-24 pt-32 md:block"
    >
      <template #trigger>
        <button
          class="mb-24"
          aria-label="Navigation bar"
          aria-describedby="List of navigation page tree"
          aria-pressed="false"
        >
          <Icon name="svg:menu" class="size-40" />
        </button>
      </template>
    </AppLnb2>

    <!-- content -->
    <slot />
  </div>

  <AppFooter class="mt-100 md:mx-0 md:mt-200" />
</template>
