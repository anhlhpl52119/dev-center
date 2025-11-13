<script setup lang="ts">
const displayFirstAndLastButton = true;
const canGoPrev = true;
const prevButton = true;
const nextButton = true;
const canGoNext = true;
const currentPage = 1;
const lastPage = 10;
function moveFirstPage() {}
function onClickPrev() {}
function onClickNext() {}
function onClickPage(page: number) {}
function moveLastPage() {}
const displayedPages = Array.from({ length: 10 }).map((_, index) => index + 1);
</script>

<template>
  <nav aria-label="Page search navigation">
    <ul class="pagination">
      <li class="page-item">
        <NuxtLink
          v-if="displayFirstAndLastButton"
          :to="{
            query: { ...$route.query, page: 1 },
          }"
          role="button"
          class="page-link"
          :class="[{ disabled: !canGoPrev }]"
          aria-label="First page"
          @click="moveFirstPage"
        >
          <Icon name="svg:double-arrow-left" class="size-3" />
        </NuxtLink>
      </li>

      <li class="page-item">
        <NuxtLink
          v-if="prevButton"
          :to="{
            query: { ...$route.query, page: currentPage - 1 },
          }"
          role="button"
          class="page-link"
          :class="[{ disabled: !canGoPrev }]"
          aria-label="Prev"
          @click="onClickPrev"
        >
          <Icon name="svg:single-arrow-left" class="size-3" />
        </NuxtLink>
      </li>

      <li
        v-for="(page, index) of displayedPages"
        :key="`${page}-${index}`"
        class="page-item"
        :class="{ active: page === currentPage }"
      >
        <NuxtLink
          :to="{
            query: { ...$route.query, page },
          }"
          role="button"
          class="page-link"
          :class="{ active: page === currentPage }"
          :aria-label="`Page ${page}`"
          @click="() => onClickPage(page)"
        >
          <span>{{ page }}</span>
        </NuxtLink>
      </li>

      <li class="page-item">
        <NuxtLink
          v-if="nextButton"
          :to="{
            query: { ...$route.query, page: currentPage + 1 },
          }"
          role="button"
          class="page-link"
          :class="[{ disabled: !canGoNext }]"
          aria-label="Next"
          @click="onClickNext"
        >
          <Icon name="svg:single-arrow-right" class="size-3" />
        </NuxtLink>
      </li>

      <li class="page-item">
        <NuxtLink
          v-if="displayFirstAndLastButton"
          :to="{
            query: { ...$route.query, page: lastPage },
          }"
          role="button"
          class="page-link"
          :class="[{ disabled: !canGoNext }]"
          aria-label="Last page"
          @click="moveLastPage"
        >
          <i class="ic-v2-control-double-arrow-right-line ic-control" />
          <Icon name="svg:double-arrow-right" class="size-3" />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
