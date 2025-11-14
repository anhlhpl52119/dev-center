import type { LNBModel } from './types';

export const DEFAULT_LOCALES: Record<string, any> = {
  ko: { code: 'ko', name: '한국어', iso: 'ko-KR' },
  // ja: { code: 'ja', name: '日本語', iso: 'ja' },
  en: { code: 'en', name: 'English (US)', iso: 'en-US' },
  // 'zh-tw': { code: 'zh-tw', name: '中文 (繁體)', iso: 'zh-TW' }, // Traditional
  // 'zh-cn': { code: 'zh-cn', name: '中文 (简体)', iso: 'zh-CN' } // Simplified
};
export const DEFAULT_COVERAGES: string[] = Object.keys(DEFAULT_LOCALES) as any[];
/**
 * Removes the locale prefix from a path if it exists
 * @param path - The path to process (e.g. '/en/something')
 * @returns The path without the locale prefix (e.g. '/something')
 */
export function removeLocalePrefix(path: string): string {
  // Check if path starts with a locale prefix
  for (const locale of DEFAULT_COVERAGES) {
    const prefix = `/${locale}/`;
    if (path.startsWith(prefix)) {
      return path.slice(prefix.length - 1); // Keep the leading slash
    }
  }
  return path;
}

export function isCurrentNavItemOrDirectChild(pageTreeModel: LNBModel, currentUrl: string) {
  const href = pageTreeModel.href;
  const decodedCurrentUrl = removeLocalePrefix(decodeURIComponent(currentUrl));

  return pageTreeModel.children?.length && (decodedCurrentUrl === href || (decodedCurrentUrl !== href && decodedCurrentUrl.startsWith(href)));
}
