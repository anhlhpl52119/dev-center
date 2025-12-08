<script setup lang="ts">
import type { LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem } from '@@/graphql';

import { PageTreeMode } from '@@/graphql';

export interface LNBModel extends LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem {
  children?: LNBModel[];
}

defineProps<{
  items?: LNBModel[];
}>();

const { LeftNavigationBarTree } = useGraphqlRequest();

const { locale } = useI18n();

const expandedItems = ref<Set<number>>(new Set());

function toggleExpand(id: number) {
  if (expandedItems.value.has(id)) {
    expandedItems.value.delete(id);
  }
  else {
    expandedItems.value.add(id);
  }
}

function convertToTree(models: LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem[]): LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem[] {
  // Create a map for quick lookup by id
  const map = new Map<number, LNBModel>();
  const result: LNBModel[] = [];

  // First pass: Create Tree nodes from Model objects
  models.forEach((model) => {
    const node: LNBModel = {
      ...model,
      children: [],
    };
    map.set(model.id, node);
  });

  // Second pass: Build the tree structure
  models.forEach((model) => {
    const node = map.get(model.id);
    if (!node)
      return;

    if (model.parent === null || model.parent === undefined) {
      // Root level nodes
      result.push(node);
    }
    else {
      // Child nodes - add to parent's children
      const parentNode = map.get(model.parent);
      if (parentNode) {
        if (!parentNode.children) {
          parentNode.children = [];
        }
        parentNode.children.push(node);
      }
      else {
        // If parent not found, treat as root
        result.push(node);
      }
    }
  });

  // Clean up empty children arrays (optional)
  const cleanEmptyChildren = (node: LNBModel) => {
    if (node.children && node.children.length === 0) {
      delete node.children;
    }
    else if (node.children) {
      node.children.forEach(cleanEmptyChildren);
    }
  };

  result.forEach(cleanEmptyChildren);

  return result;
}

const isExpanded = (id: number) => expandedItems.value.has(id);
const { data: lnbData } = await useAsyncData('lnb', () => LeftNavigationBarTree({
  locale: locale.value,
  mode: PageTreeMode.Like,
  path: '/web/etc',
}));

const lnb = computed<LNBModel[]>(() => {
  const tree = lnbData.value?.pages?.tree as LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem[] || [];
  return convertToTree(tree.filter(item => item.depth > 1));
});
</script>

<template>
  <nav>
    <ul class="space-y-2">
      <li
        v-for="item in lnb"
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
          <AppLeftNavigationBar :items="item.children" />
        </ul>
      </li>
    </ul>
  </nav>
</template>
