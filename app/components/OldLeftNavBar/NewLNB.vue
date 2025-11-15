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
    <ul class="space-y-0.5">
      <li
        v-for="item in items"
        :key="item.id"
        class="rounded-full leading-6 font-bold"
      >
        <!-- link -->
        <NuxtLinkLocale
          v-if="!item.isFolder"
          :to="`/${item.path}`"
          exactActiveClass="bg-abg-active text-tcl-primary"
          class="capitalize rounded-full block py-2 pr-3 pl-4 leading-6 font-medium hover:bg-abg-raised/7"
          activeClass="font-medium"
        >
          {{ item.title }}
        </NuxtLinkLocale>

        <!-- Folder -->
        <div
          v-else
          class="cursor-pointer text-md flex items-center rounded-full py-2 pr-3 pl-4 hover:bg-abg-raised/7"
          @click="toggleExpand(item.id)"
        >
          <span class="capitalize">{{ item.title }}</span>
          <Icon
            v-if="item.children?.length"
            name="svg:single-arrow-up"
            class="ml-auto w-2.5"
          />
        </div>

        <!-- Nested child -->
        <ul
          v-if="item.children?.length && (!item.isFolder || isExpanded(item.id))"
          class="mt-1 pl-4"
        >
          <NewLNB :items="item.children" />
        </ul>
      </li>
    </ul>
  </nav>
</template>
