<script setup lang="ts">
import { Dropdown } from 'floating-vue';

const isAuthentication = false;
const { locale, setLocale } = useI18n();

const availableLocales: { code: 'en' | 'ko'; name: string }[] = [
  { code: 'ko', name: '한국어' },
  { code: 'en', name: 'English (US)' },
];
</script>

<template>
  <button
    aria-label="Toggle user menu"
    aria-describedby="Show menu"
    aria-pressed="false"
    class="clickable hover:bg-abg-dimmed ml-4 inline-flex items-center justify-center rounded-full p-8 md:hidden"
  >
    <Icon name="svg:dot-vertical" class="size-18" />
  </button>

  <Dropdown
    class="ml-24 hidden md:inline-flex"
    :distance="5"
    placement="bottom-end"
    strategy="fixed"
    aria-id="language-select-dropdown"
    :triggers="['click']"
  >
    <button
      aria-label="Switch locale"
      aria-describedby="Change locale"
      aria-pressed="false"
      class="clickable hover:bg-abg-dimmed flex items-center justify-center rounded-full p-10"
    >
      <Icon name="svg:locale" class="size-20" />
    </button>

    <template #popper="{ hide }">
      <div class="flex min-w-3xs flex-col py-8">
        <button
          v-for="l in availableLocales"
          :key="l.code"
          class="text-14 flex w-full items-center px-16 py-10 font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
          :class="[
            locale === l.code
              ? 'text-primary'
              : 'text-gray-900 dark:text-gray-100',
          ]"
          @click="
            setLocale(l.code);
            hide();
          "
        >
          <Icon
            v-if="locale === l.code"
            name="solar:check-read-linear"
            class="text-primary mr-8 size-20"
          />
          <span :class="{ 'ml-24': locale !== l.code }">{{ l.name }}</span>
        </button>
      </div>
    </template>
  </Dropdown>

  <!-- <button
    aria-label="User login"
    aria-describedby="Info logged user"
    aria-pressed="false"
    class="clickable hover:bg-abg-dimmed ml-16 hidden items-center justify-center rounded-full p-6 md:inline-flex"
  >
    <Icon name="svg:locale" class="size-20" />
  </button> -->

  <ClientOnly>
    <div
      id="generateGNBScript"
      class="stds-gnb-end"
      :class="[isAuthentication ? 'block' : 'hidden md:block']"
    />
    <template #fallback>
      <div
        id="generateGNBScript"
        class="stds-gnb-end"
        :class="[isAuthentication ? 'd-block' : 'hidden md:block']"
      >
        <div class="placeholder-glow">
          <span class="placeholder avatar-skeleton-gnb" />
        </div>
      </div>
    </template>
  </ClientOnly>
</template>
