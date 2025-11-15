<script setup lang="ts">
import type { LNBModel } from './types';

interface Props {
  items: LNBModel[];
}

defineProps<Props>();

const expandedItems = ref<Set<number>>(new Set());

function toggleExpand(id: number) {
  if (expandedItems.value.has(id)) {
    expandedItems.value.delete(id);
  }
  else {
    expandedItems.value.add(id);
  }
}

const isExpanded = (id: number) => expandedItems.value.has(id);
</script>

<template>
  <nav>
    <ul class="space-y-1">
      <li
        v-for="item in items"
        :key="item.id"
        class="w-full"
      >
        <!-- link -->
        <NuxtLinkLocale
          v-if="!item.isFolder"
          :to="`/${item.path}`"
          replace
          class="block cursor-pointer px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md"
          activeClass="bg-blue-100 text-blue-900 font-medium"
        >
          {{ item.title }}
        </NuxtLinkLocale>

        <!-- Folder -->
        <div
          v-else
          class="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md"
          @click="toggleExpand(item.id)"
        >
          <span>{{ item.title }}</span>
          <Icon
            v-if="item.children?.length"
            name="svg:single-arrow-up"
            class="ml-auto w-2.5"
          />
        </div>

        <!-- Nested child -->
        <ul
          v-if="item.children?.length && (!item.isFolder || isExpanded(item.id))"
          class="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-4"
        >
          <NewLNB :items="item.children" />
        </ul>
      </li>
    </ul>
  </nav>
</template>
