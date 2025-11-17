<script setup lang="ts">
const search = ref('');
</script>

<template>
  <header>
    <nav
      class="mx-auto flex h-16 max-w-400 items-center justify-end-safe px-10"
    >
      <!-- Left -->
      <div class="mr-auto">
        <NuxtLink to="/" class="mr-4">
          <Icon name="svg:stove-text-logo" class="h-4 align-middle" />
        </NuxtLink>

        <span class="inline-block align-middle text-xl font-bold">
          {{ $t('common.bubbliz_guide') }}
        </span>
      </div>

      <!-- Right -->
      <ul class="flex flex-wrap items-center gap-4">
        <li>
          <NuxtLink
            external
            class="group cursor-pointer font-medium"
            target="_blank"
          >
            <span>{{ $t('common.go_to_creator_center') }}</span>
            <Icon
              name="svg:navigate-out"
              class="group-hover:text-primary ml-1.5 size-3 transition-colors duration-200"
            />
          </NuxtLink>
        </li>

        <li>
          <input
            v-model="search"
            maxlength="100"
            type="text"
            class="border-abd-base w-55 rounded-full border py-3 pr-10 pl-4"
            placeholder="검색어를 입력하세요."
            @keyup.enter="navigateTo({ path: $localePath('/search'), query: { search } })"
          >
        </li>

        <li>
          <Icon name="svg:locale" class="py-auto block size-5" />
        </li>
        <!-- <li><i class="block">avatar</i></li> -->
      </ul>
    </nav>
  </header>
</template>
