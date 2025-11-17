import { DEFAULT_LOCALE } from '~/constants/Locale';

export default defineI18nConfig(() => ({
  fallbackLocale: DEFAULT_LOCALE,
  silentTranslationWarn: true
}));
