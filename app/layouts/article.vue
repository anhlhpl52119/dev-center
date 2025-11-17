<script lang="ts" setup>
import type { LNBModel, Model } from '~/components/OldLeftNavBar/types';
import { getLNBQuery } from '~~/graphql/queries/lnb';

const { locale } = useI18n();

const { data: lnbData } = await useAPI<any>('graphql', {
  method: 'POST',
  body: {
    query: getLNBQuery,
    variables: {
      locale,
      mode: 'LIKE',
      path: 'web',
    },
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Convert flat array of Model to hierarchical Tree structure
 * @param models - Array of Model objects
 * @returns Array of Tree objects with nested children
 */
function convertToTree(models: Model[]): LNBModel[] {
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

const lnb = computed(() => (lnbData.value.data?.pages?.tree ?? [] as Model[]).filter((item: any) => item.depth > 1));
</script>

<template>
  <AppHeader class="bg-abg-base" />

  <main class="relative mx-auto flex max-w-7xl">
    <div class="sticky top-0 mr-26 hidden h-screen w-68 shrink-0 overflow-y-auto p-6 pt-8 md:block">
      <button class="mb-6">
        <Icon name="svg:menu" class="size-10" />
      </button>
      <NewLNB :items="convertToTree(lnb)" />
    </div>

    <!-- article -->
    <slot />
  </main>
</template>
