import type { Locale } from '@nuxtjs/i18n/dist/runtime/composables';

export interface LocaleObjectModel {
  code: Locale;
  name?: string;
  iso?: string;
  file?: string;
}
