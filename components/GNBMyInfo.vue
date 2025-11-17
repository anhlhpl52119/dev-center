<template>
  <ul v-if="gnbMenus?.length" class="d-md-none navbar-nav stds-navbar-nav-vertical gnb-divider--top my-8">
    <li v-for="item in gnbMenus" :key="item.id" class="nav-item">
      <a :href="item.href" class="nav-link">{{ item.title }}</a>
    </li>
  </ul>

  <div v-if="isAuthentication" class="d-block d-md-none language-settings-wrapper gnb-divider--bottom py-8">
    <div class="gnb-custom-lang-title min-h-40">
      <div class="gnb-lang-title-label text-truncate-1">{{ languageSettingsText }}</div>
      <ClientOnly>
        <VDropdown v-model:shown="isShowLanguageMenus" distance="0" popperClass="v-popper--theme-dc-dropdown-menu language-settings-wrapper" placement="auto-end">
          <button
            type="button"
            class="btn btn-link btn-language"
            :class="{ active: isShowLanguageMenus }"
            aria-expanded="false"
          >
            {{ currentLocaleName }}
          </button>
          <template #popper>
            <ul
              class="gnb-custom-lang-list-vdropdown"
            >
              <li v-for="(value, key) in DEFAULT_LOCALES" :key="key" class="gnb-custom-lang-item">
                <a
                  class="dropdown-item gnb-custom-lang-item-link"
                  :class="{'is-active': key === locale}"
                  href="#"
                  @click.prevent.stop="clickChangeLocale(value.code)"
                >
                  {{ value.name }}
                </a>
              </li>
            </ul>
          </template>
        </VDropdown>
      </ClientOnly>
    </div>
  </div>
  <button type="button" class="btn btn-logout-gnb mt-8" @click="onLogout">{{ logoutText }}</button>
</template>

<script lang="ts" setup>
import type { Locale } from '@nuxtjs/i18n/dist/runtime/composables';
import { Dropdown as VDropdown } from 'floating-vue';

import { DEFAULT_LOCALES } from '@/constants/Locale';

const props = defineProps<{
  logoutText: string;
  onLogout:() => void;
  gnbMenus: Array<{ id: number; title: string; href: string }>;
  isAuthentication: boolean;
  isScreenAtLeastMedium: boolean;
  languageSettingsText: string;
  isShowLanguageMenus: boolean;
  currentLocaleName: string;
  locale: string;
  clickChangeLocale: (_newLocale: Locale) => void;
}>();

const { isShowLanguageMenus } = toRefs(props);
</script>
