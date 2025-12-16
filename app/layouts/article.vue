<script lang="ts" setup>
import type { LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem } from '~~/graphql';
import type { LNBModel } from '~/components/left-navigation-bar/AppLeftNavigationBar.vue';
import { PageTreeMode } from '~~/graphql';

const { LeftNavigationBarTree } = useGraphqlRequest();

const { locale } = useI18n();
const { data: lnbData, execute } = await useAsyncData('lnb', () =>
  LeftNavigationBarTree({
    locale: locale.value,
    mode: PageTreeMode.Like,
    path: '/web/etc',
  }));

function convertToTree(
  models: LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem[],
): LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem[] {
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

const lnb = computed<LNBModel[]>(() => {
  const tree
    = (lnbData.value?.pages
      ?.tree as LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem[])
    || [];
  return convertToTree(tree.filter(item => item.depth > 1));
});
</script>

<template>
  <AppHeader class="bg-abg-base sticky top-0 z-99" />

  <main class="relative mx-auto flex max-w-1336 justify-center">
    <div class="sticky top-64 hidden min-w-272 h-screen overflow-auto p-24 pt-32 md:block scrollbar-gutter-stable">
      <button
        class="mb-24"
        aria-label="Navigation bar"
        aria-describedby="List of navigation page tree"
        aria-pressed="false"
        @click="execute()"
      >
        <Icon name="svg:menu" class="size-40" />
      </button>

      <AppLeftNavigationBar :items="lnb" />
    </div>

    <!-- article -->
    <slot />
  </main>
</template>
