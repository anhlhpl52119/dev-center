<script setup lang="ts">
import { Dropdown as VDropdown } from 'floating-vue';

const isShowLanguageMenus = ref<boolean>(false);
const { locale, setLocale } = useI18n();
const DEFAULT_LOCALES: Record<string, any> = {
  ko: { code: 'ko', name: '한국어', iso: 'ko-KR' },
  en: { code: 'en', name: 'English (US)', iso: 'en-US' },
};
const search = ref('');
</script>

<template>
  <header>
    <nav
      class="mx-auto flex h-16 max-w-400 items-center justify-end-safe px-10"
    >
      <!-- Left -->
      <div class="mr-auto">
        <NuxtLink to="/" class="mr-4">
          <Icon name="svg:stove-text-logo" class="h-4 align-middle" />
        </NuxtLink>

        <span class="inline-block align-middle text-xl font-bold">
          {{ $t('common.bubbliz_guide') }}
        </span>
      </div>

      <!-- Right -->
      <ul class="flex flex-wrap items-center gap-4">
        <li>
          <NuxtLink
            external
            class="group cursor-pointer font-medium"
            target="_blank"
          >
            <span>{{ $t('common.go_to_creator_center') }}</span>
            <Icon
              name="svg:navigate-out"
              class="group-hover:text-primary ml-1.5 size-3 transition-colors duration-200"
            />
          </NuxtLink>
        </li>

        <li>
          <input
            v-model="search"
            maxlength="100"
            type="text"
            class="border-abd-base w-55 rounded-full border py-3 pr-10 pl-4"
            placeholder="검색어를 입력하세요."
            @keyup.enter="navigateTo({ path: $localePath('/search'), query: { search } })"
          >
        </li>

        <li>
          <!-- <Icon name="svg:locale" class="py-auto block size-5" /> -->
          <VDropdown
            v-model:shown="isShowLanguageMenus"
            distance="0"
            popperClass="v-popper--theme-dc-dropdown-menu language-settings-wrapper"
            placement="bottom-end"
          >
            <!-- <button
              type="button"
              class="btn btn-link btn-language"
              aria-controls="language-menu"
              aria-haspopup="true"
            > -->
            <!-- <i class="ic-language ic-v2-navigation-language-line" /> -->
            <Icon name="svg:locale" class="py-auto block size-5" />
            <!-- </button> -->
            <template #popper>
              <ul
                class="gnb-custom-lang-list-vdropdown"
              >
                <li
                  v-for="(value, key) in DEFAULT_LOCALES"
                  :key="key"
                  class="gnb-custom-lang-item"
                >
                  <a
                    class="dropdown-item gnb-custom-lang-item-link"
                    :class="{ 'is-active': key === locale }"
                    href="#"
                    @click.prevent.stop="setLocale(value.code)"
                  >
                    {{ value.name }}
                  </a>
                </li>
              </ul>
            </template>
          </VDropdown>
        </li>

        <!-- <li><i class="block">avatar</i></li> -->
      </ul>
    </nav>
  </header>
</template>
