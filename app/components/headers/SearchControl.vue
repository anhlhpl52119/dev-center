<script lang="ts" setup>
const show = ref(false);
const searchTxt = ref('');

function toggle() {
  show.value = !show.value;
}
const localePath = useLocalePath();
function handleSearch(keyword: string) {
  if (!keyword) {
    return;
  }
  navigateTo(localePath({ name: 'search', query: { q: keyword } }));
  searchTxt.value = '';
  show.value = false;
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
      v-model="searchTxt"
      type="text"
      name="search"
      placeholder="검색어를 입력하세요."
      class="bg-abg-base abd-base-1 h-44 w-full rounded-full px-16 py-12 leading-20 outline-none"
      @keyup.enter="handleSearch(searchTxt)"
      @click="show = true"
      @blur="show = false"
    >

    <!-- Results -->
    <div
      v-if="show"
      class="abd-base-1 bg-abg-base bd-radius-20 absolute z-2 mt-4 h-400 w-full p-16 shadow-md"
    >
      <pre>{{ $slots.trigger }}</pre>
    </div>
  </div>
</template>
