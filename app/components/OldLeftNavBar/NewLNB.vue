<script setup lang="ts">
import type { LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem } from '~~/graphql/generated/codegen-typescript';

export interface LNBModel extends LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem {
  children?: LNBModel[];
}

defineProps<{
  items: LNBModel[];
}>();

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
    <ul class="space-y-2">
      <li
        v-for="item in items"
        :key="item.id"
        class="rounded-full leading-24 font-bold"
      >
        <!-- link -->
        <NuxtLinkLocale
          v-if="!item.isFolder"
          :to="`/${item.path}`"
          exactActiveClass="bg-abg-active text-tcl-primary"
          class="hover:bg-abg-raised/7 block rounded-full py-8 pr-12 pl-16 leading-24 font-medium capitalize"
          activeClass="font-medium"
        >
          {{ item.title }}
        </NuxtLinkLocale>

        <!-- Folder -->
        <div
          v-else
          class="text-md hover:bg-abg-raised/7 flex cursor-pointer items-center rounded-full py-8 pr-12 pl-16"
          @click="toggleExpand(item.id)"
        >
          <span class="capitalize">{{ item.title }}</span>
          <Icon
            v-if="item.children?.length"
            name="svg:single-arrow-up"
            class="ml-auto w-10"
          />
        </div>

        <!-- Nested child -->
        <ul
          v-if="
            item.children?.length && (!item.isFolder || isExpanded(item.id))
          "
          class="mt-4 pl-16"
        >
          <NewLNB :items="item.children" />
        </ul>
      </li>
    </ul>
  </nav>
</template>
