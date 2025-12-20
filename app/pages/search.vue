<script lang="ts" setup>
definePageMeta({
  name: 'search',
});

const { locale } = useI18n();
const { SearchPagesByKeyword } = useGraphqlRequest();

const route = useRoute();
const searchKeyword = ref<string>(route.query?.keyword?.toString() ?? '');
const ipRef = useTemplateRef('ipRef');
const pageSize = 10;
const currentPage = ref(Number(route.query?.page) ?? 1);

const { data, execute } = await useAsyncData('search', () =>
  SearchPagesByKeyword({
    locale: locale.value,
    query: searchKeyword.value || '',
    page: (currentPage.value - 1) || 0,
    size: pageSize,
    category: '',
    inCategory: ['', 'mobile', 'web', 'common', 'security', 'partners', 'PC_new', 'multi', 'mobile', 'mobile', 'web', 'Store', 'bubblyz', 'readme'],

  }));

const totalPage = computed(() => Math.floor((data.value?.pages?.search?.totalHits ?? 0) / 10));

watch(() => route.query, (v) => {
  searchKeyword.value = v?.keyword?.toString() || '';
  currentPage.value = Number(v?.page ?? 1) || 1;
  execute();
});

function highlightMatchKeyword(fullText: string) {
  const trimmedSearchInput = searchKeyword.value?.trim();

  // If search input is empty, return the original string
  if (!trimmedSearchInput) {
    return fullText;
  }

  const escapedInput = trimmedSearchInput.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&',
  );

  const matchedReg = new RegExp(`(${escapedInput})`, 'gi');

  return fullText.replace(
    matchedReg,
    `<span class="text-primary font-medium">\$1</span>`,
  );
}

const searchContentV2 = computed(() => {
  const rs: any[] = Object.values(data.value?.pages?.search?.results)?.flat() ?? [];
  return rs.map(i => ({
    title: i.title,
    matched: highlightMatchKeyword(i.content),
    path: i.path,
  }));
});

async function onSearch(keyword: string) {
  await navigateTo({ query: { keyword } });
  ipRef.value?.blur(); // TODO: add debounce improve UX
}
</script>

<template>
  <main>
    <div class="mt-80 text-center">
      <h1 class="text-42 font-bold">
        🔍 검색 결과
      </h1>
      <input
        ref="ipRef"
        v-model="searchKeyword"
        type="text"
        class="border-abd-base bg-abg-base mt-24 w-full md:w-600 rounded-full border py-16 pr-72 pl-20"
        placeholder="검색어를 입력하세요."
        @keyup.enter="onSearch(searchKeyword)"
      >
    </div>

    <div class="mx-auto px-8 mt-40 grid max-w-1320 gap-16">
      <template v-for="(item, index) in searchContentV2" :key="index">
        <div
          class="bg-abg-base outline-abd-base bd-radius-32 p-30 transition hover:base-shadow hover:outline"
          @click="navigateTo({ path: $localePath(`/${item.path}`) })"
        >
          <h2 class="text-20 mb-8 font-bold">
            {{ item.title }}
          </h2>
          <p class="text-quiet line-clamp-2 break-all" v-html="item.matched" />
        </div>
      </template>
    </div>

    <div class="mb-66 flex py-8">
      <AppPagination
        v-if="totalPage >= 1"
        :currentPage="currentPage"
        :totalPages="totalPage"
        class="mx-auto block"
        @pageChange="navigateTo({ query: { ...$route.query, page: $event } })"
      />
    </div>
  </main>
</template>
