function normalizeRoutePath(rawPath: string, localeCode?: string) {
  if (!rawPath) {
    return '/';
  }

  let sanitized = decodeURIComponent(rawPath);

  if (localeCode) {
    const localizedPrefix = `/${localeCode}`;
    if (sanitized === localizedPrefix) {
      sanitized = '/';
    }
    else if (sanitized.startsWith(`${localizedPrefix}/`)) {
      sanitized = sanitized.slice(localizedPrefix.length + 1);
    }
  }

  sanitized = sanitized.replace(/^\/+/, '');
  return sanitized ?? '/';
}

export function useRoutesContent() {
  const route = useRoute();
  const { locale } = useI18n();

  const normalizedPath = computed(() => normalizeRoutePath(route.path, locale.value));

  const {
    data,
    pending,
    error,
    refresh,
  } = useFetch<any>('/api/single-page', {
    key: normalizedPath,
    query: {
      path: normalizedPath,
      locale: locale.value,
    },
    onRequest() {
      console.log(normalizedPath.value);
    },
  });

  const content = computed(() => data.value?.data?.pages?.singleByPath?.content ?? '');
  const title = computed(() => data.value?.data?.pages?.singleByPath?.title ?? '');
  const updatedAt = computed(() => data.value?.data.pages?.singleByPath?.updatedAt ?? '');

  return {
    content,
    title,
    updatedAt,
    pending,
    error,
    refresh,
  };
}
