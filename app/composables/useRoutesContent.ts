import type { EffectScope } from 'vue';
import { refreshNuxtData } from '#app';
import { computed, effectScope, watch } from 'vue';
import { getSinglePageByPathQuery } from '~~/graphql/queries/single-page';

interface SinglePageByPathResponse {
  data?: {
    pages?: {
      singleByPath?: {
        id: number;
        title: string;
        content: string;
        updatedAt: string;
      } | null;
    };
  };
}

interface RouteContent {
  id: number;
  title: string;
  content: string;
  updatedAt: string;
  path: string;
}

const ASYNC_DATA_KEY = 'route-content';

function normalizeRoutePath(rawPath: string, localeCode?: string) {
  if (!rawPath) {
    return '/';
  }

  // let sanitized = decodeURIComponent(rawPath);

  // if (localeCode) {
  //   const localizedPrefix = `/${localeCode}`;
  //   if (sanitized === localizedPrefix) {
  //     sanitized = '/';
  //   }
  //   else if (sanitized.startsWith(`${localizedPrefix}/`)) {
  //     sanitized = sanitized.slice(localizedPrefix.length + 1);
  //   }
  // }

  // sanitized = sanitized.replace(/^\/+/, '');
  return rawPath.replace('/ko/', '').replace('/en/', '');
}

export function useRoutesContent() {
  const { $api } = useNuxtApp();
  const route = useRoute();
  const { locale } = useI18n();

  const asyncData = useAsyncData<RouteContent | null>(ASYNC_DATA_KEY, async () => {
    const path = normalizeRoutePath(route.path, locale.value);

    const graphqlQuery = {
      query: getSinglePageByPathQuery,
      variables: {
        path,
        locale: locale.value,
      },
    };

    const { data: response } = await $api<SinglePageByPathResponse>('/graphql', {
      method: 'POST',
      body: JSON.stringify(graphqlQuery),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const page = response?.pages?.singleByPath ?? '';
    if (!page) {
      return null;
    }

    return {
      id: page.id,
      title: page.title,
      content: page.content,
      updatedAt: page.updatedAt,
      path,
    };
  }, {
    default: () => null,
    server: true,
    lazy: false,
  });

  if (import.meta.client) {
    const watcherScope = useState<EffectScope | null>('routes-content:watcher', () => null);
    if (!watcherScope.value) {
      watcherScope.value = effectScope();
      watcherScope.value.run(() => {
        watch(
          () => [route.path, locale.value],
          () => {
            refreshNuxtData(ASYNC_DATA_KEY);
          },
        );
      });
    }
  }

  const content = computed(() => asyncData.data.value?.content ?? '');
  const title = computed(() => asyncData.data.value?.title ?? '');
  const updatedAt = computed(() => asyncData.data.value?.updatedAt ?? '');

  return {
    ...asyncData,
    content,
    title,
    updatedAt,
  };
}
