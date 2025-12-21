<script lang="ts" setup>
import type { LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem } from '~~/graphql';
import type { LNBModel } from '~/components/left-navigation-bar/AppLeftNavigationBar.vue';
import { PageTreeMode } from '~~/graphql';
import AppLeftNavigationBar from '~/components/left-navigation-bar/AppLeftNavigationBar.vue';

const { LeftNavigationBarTree } = useGraphqlRequest();
const { open } = useDrawer();

const { locale } = useI18n();
const route = useRoute();

const { data: lnbData, execute } = await useAsyncData('lnb', () =>
  LeftNavigationBarTree({
    locale: locale.value,
    mode: PageTreeMode.Like,
    path: singleSlash(route.path.replace(locale.value, '')),
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

function openExampleDrawer() {
  open(AppLeftNavigationBar, {
    items: lnb.value,
  });
}

onMounted(() => {
  setTimeout(() => {
    const element = document.querySelector(route.hash);
    if (element) {
      element.scrollIntoView();
    }
  }, 300); // TODO: improve later
});
</script>

<template>
  <main class="mx-auto max-w-1320">
    <div
      class="bg-abg-base/80 backdrop-blur-xs border-y-abd-base sticky top-64 inset-y-0 w-full z-3 h-45 border-y md:hidden"
    >
      <div class="flex items-center justify-between">
        <button
          class="mb-24"
          aria-label="Navigation bar"
          aria-describedby="List of navigation page tree"
          aria-pressed="false"
          @click="openExampleDrawer"
        >
          <Icon name="svg:menu" class="size-40" />
        </button>

        <button
          class="mb-24"
          aria-label="Navigation bar"
          aria-describedby="List of navigation page tree"
          aria-pressed="false"
          @click="openExampleDrawer"
        >
          <Icon name="svg:menu" class="size-40" />
        </button>
      </div>
    </div>

    <div class="flex">
      <!-- LNB -->
      <AppLeftNavigationBar
        :items="lnb"
        class="scrollbar-gutter-stable sticky top-64 hidden max-h-[calc(100vh-6.4rem)] w-272 self-start overflow-auto p-24 pt-32 md:block"
      >
        <template #trigger>
          <button
            class="mb-24"
            aria-label="Navigation bar"
            aria-describedby="List of navigation page tree"
            aria-pressed="false"
            @click="execute()"
          >
            <Icon name="svg:menu" class="size-40" />
          </button>
        </template>
      </AppLeftNavigationBar>

      <!-- Content -->
      <NuxtPage class="flex-1" />
    </div>
  </main>
</template>
