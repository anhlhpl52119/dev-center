import { DEFAULT_COVERAGES } from '@/constants/Locale';

/**
 * Removes the locale prefix from a path if it exists
 * @param path - The path to process (e.g. '/en/something')
 * @returns The path without the locale prefix (e.g. '/something')
 */
export const removeLocalePrefix = (path: string): string => {
  // Check if path starts with a locale prefix
  for (const locale of DEFAULT_COVERAGES) {
    const prefix = `/${locale}/`;
    if (path.startsWith(prefix)) {
      return path.slice(prefix.length - 1); // Keep the leading slash
    }
  }
  return path;
};
