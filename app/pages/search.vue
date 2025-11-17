<script lang="ts" setup>
import { getPagesBySearchQuery } from '~~/graphql/queries/search';

definePageMeta({
  name: 'search',
});

const { locale } = useI18n();
const route = useRoute();
const search = ref(route.query?.search?.toString()?.trim() ?? '');
const localePath = useLocalePath();
const { data, execute } = useAPI<any>('graphql', {
  method: 'POST',
  body: {
    query: getPagesBySearchQuery,
    variables: {
      query: search,
      locale,
      page: 0,
      size: 10,
      category: '',
      inCategory: ['web'],
    },
  },
  headers: {
    'Content-Type': 'application/json',
  },
  watch: false,
});

function highlightMatchKeyword(fullText: string) {
  const trimmedSearchInput = search.value?.trim();

  // If search input is empty, return the original string
  if (!trimmedSearchInput) {
    return fullText;
  }

  const escapedInput = trimmedSearchInput.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const matchedReg = new RegExp(`(${escapedInput})`, 'gi');

  return fullText.replace(matchedReg, `<span class="text-primary font-medium">\$1</span>`);
}

const searchContentV2 = computed(() => {
  const rs: any[] = data.value?.data?.pages?.search?.results?.web ?? [];
  return rs.map(i => ({ title:
     i.title, matched: highlightMatchKeyword(i.content), path: i.path }));
});

async function onSearch() {
  await navigateTo({ path: localePath('/search'), query: { search: search.value } });
  execute();
}
</script>

<template>
  <main>
    <div class="mt-20 text-center">
      <h1 class="text-title font-bold">
        🔍 검색 결과
      </h1>
      <input
        v-model="search"
        type="text"
        class="border-abd-base bg-abg-base mt-6 w-150 rounded-full border py-4 pr-18 pl-5"
        placeholder="검색어를 입력하세요."
        @keyup.enter="onSearch"
      >
    </div>

    <div class="mx-auto mt-10 grid max-w-330 gap-4">
      <template v-for="(item, index) in searchContentV2" :key="index">
        <div
          class="bg-abg-base outline-abd-base rounded-4xl p-7.5 transition hover:shadow-sm hover:outline"
          @click="navigateTo({ path: $localePath(`/${item.path}`) })"
        >
          <h2 class="text-2xl font-bold">
            {{ item.title }}
          </h2>
          <p class="text-tcl-dimmed" v-html="item.matched" />
        </div>
      </template>
    </div>

    <div class="mb-17 flex py-8">
      <AppPagination class="mx-auto block" />
    </div>
  </main>
</template>
