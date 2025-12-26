<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core';
import { isEmpty } from 'es-toolkit/compat';

const show = ref(false);
const inputKeyword = ref('');
const ipRef = useTemplateRef('ipRef');
const localePath = useLocalePath();
const searchHistory = useLocalStorage<string[]>('searhistory', []);

function toggle() {
  show.value = !show.value;
}

function addToHistory(keyword: string) {
  if (isEmpty(keyword)) {
    return;
  }
  const index = searchHistory.value.indexOf(keyword);
  if (index > -1) {
    searchHistory.value.splice(index, 1);
  }
  searchHistory.value.unshift(keyword);
  if (searchHistory.value.length > 20) {
    searchHistory.value.pop();
  }
}

function removeHistory(index: number) {
  searchHistory.value.splice(index, 1);
}

async function handleSearch(keyword: string) {
  if (!keyword) {
    return;
  }
  addToHistory(keyword);
  await navigateTo(localePath({ name: 'search', query: { keyword } }));
  inputKeyword.value = '';
  show.value = false;
  ipRef.value?.blur();
}
</script>

<template>
  <div
    class="bg-abg-base md:min-w-220"
    :class="{ 'absolute inset-x-0 z-2': show }"
  >
    <!-- Icon trigger -->
    <slot
      name="trigger"
      :toggle="toggle"
      :isShowed="show"
    />

    <!-- Search bar -->
    <input
      v-if="!$slots.trigger || show"
      ref="ipRef"
      v-model="inputKeyword"
      type="text"
      name="search"
      placeholder="검색어를 입력하세요."
      class="bg-abg-base border-abd-base h-44 w-full rounded-full border px-16 py-12 leading-20 outline-none"
      @keyup.enter="handleSearch(inputKeyword)"
      @click="show = true"
      @blur="show = true"
    >

    <!-- Results -->
    <div
      v-if="show"
      class="border-abd-base bg-abg-base base-shadow absolute z-2 mt-4 flex h-400 w-full flex-col overflow-hidden rounded-4xl border p-16"
    >
      <div class="text-muted mb-8 flex-none px-8 font-bold">
        최신
      </div>
      <ul class="text-quiet flex-1 overflow-y-auto">
        <li
          v-for="(history, index) in searchHistory"
          :key="history"
          class="hover:bg-abg-dimmed flex cursor-pointer items-center justify-between rounded-lg px-8 py-8"
          @mousedown.prevent
          @click="handleSearch(history)"
        >
          <button
            class="text-quiet mr-8 hover:text-base"
            title="삭제"
            @click.stop="removeHistory(index)"
          >
            <span class="block truncate text-base">{{ history }}</span>
          </button>
          <Icon name="svg:close" class="size-20" />
        </li>
      </ul>
    </div>
  </div>
</template>
