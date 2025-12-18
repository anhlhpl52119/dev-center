<script lang="ts" setup>
definePageMeta({
  name: 'search',
});

const { locale } = useI18n();
const route = useRoute();
const inputKeyword = ref<string>(route.query?.keyword?.toString() ?? '');
const ipRef = useTemplateRef('ipRef');

watch(() => route.query.keyword, (v) => {
  inputKeyword.value = v?.toString() || '';
  onSearch(inputKeyword.value);
});

const { SearchPagesByKeyword } = useGraphqlRequest();

const { data, execute } = await useAsyncData('search', () =>
  SearchPagesByKeyword({
    locale: locale.value,
    query: inputKeyword.value || '',
    page: 0,
    size: 10,
    category: '',
    inCategory: ['web'],
  }));

function highlightMatchKeyword(fullText: string) {
  const trimmedSearchInput = inputKeyword.value?.trim();

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
  const rs: any[] = data.value?.pages?.search?.results?.web ?? [];
  return rs.map(i => ({
    title: i.title,
    matched: highlightMatchKeyword(i.content),
    path: i.path,
  }));
});

async function onSearch(keyword: string) {
  await navigateTo({ query: { keyword } });
  execute();
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
        v-model="inputKeyword"
        type="text"
        class="border-abd-base bg-abg-base mt-24 w-600 rounded-full border py-16 pr-72 pl-20"
        placeholder="검색어를 입력하세요."
        @keyup.enter="onSearch(inputKeyword)"
      >
    </div>

    <div class="mx-auto px-8 mt-40 grid max-w-1320 gap-16">
      <template v-for="(item, index) in searchContentV2" :key="index">
        <div
          class="bg-abg-base outline-abd-base bd-radius-32 p-30 transition hover:shadow-sm hover:outline"
          @click="navigateTo({ path: $localePath(`/${item.path}`) })"
        >
          <h2 class="text-20 mb-8 font-bold">
            {{ item.title }}
          </h2>
          <p class="text-quiet" v-html="item.matched" />
        </div>
      </template>
    </div>

    <div class="mb-66 flex py-8">
      <AppPagination class="mx-auto block" />
    </div>
  </main>
</template>
