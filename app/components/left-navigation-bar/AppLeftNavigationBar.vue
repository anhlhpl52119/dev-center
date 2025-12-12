<script setup lang="ts">
import type { LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem } from '@@/graphql';

export interface LNBModel
  extends LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem {
  children?: LNBModel[];
}
const props = defineProps<{
  items: LNBModel[];
  level?: number;
}>();

const expandedItems = ref<Set<number>>(new Set());
const navRef = useTemplateRef('navRef');
const route = useRoute();
const localePath = useLocalePath();

function toggleExpand(id: number) {
  if (expandedItems.value.has(id)) {
    expandedItems.value.delete(id);
  }
  else {
    expandedItems.value.add(id);
  }
}

function getFocusableElements() {
  if (!navRef.value)
    return [];
  return Array.from(navRef.value.querySelectorAll('a')) as HTMLElement[];
}

function findParent(nodes: LNBModel[], id: number): number[] {
  // TODO: refactor
  const flattenTree = (nodes: LNBModel[]): LNBModel[] => {
    const flatArray: LNBModel[] = [];

    nodes.forEach((node) => {
      flatArray.push(node);
      if (node.children && node.children.length > 0) {
        flatArray.push(...flattenTree(node.children));
      }
    });

    return flatArray;
  };
  const flats = flattenTree(nodes);
  const rs: number[] = [];
  const loopFn = (loopId: number) => {
    for (const i of flats) {
      if (i.id !== loopId) {
        continue;
      }
      if (!i.parent) {
        return;
      }
      rs.push(i.parent);
      loopFn(i.parent);
    }
  };
  loopFn(id);
  return rs;
}

function handleKeydown(event: KeyboardEvent, id: number) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    toggleExpand(id);
    return;
  }

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    const elements = getFocusableElements();
    const currentIndex = elements.indexOf(event.target as HTMLElement);

    if (currentIndex === -1)
      return;

    const nextIndex
      = event.key === 'ArrowDown'
        ? (currentIndex + 1) % elements.length
        : (currentIndex - 1 + elements.length) % elements.length;

    elements[nextIndex]?.focus();
  }
}

(function init() {
  const getIdByPath = (items: LNBModel[]): number | null => {
    for (const i of items) {
      if (localePath(`/${i.path}`) === decodeURIComponent(route.path)) {
        return i.id;
      }
      if (i.children?.length) {
        const childId = getIdByPath(i.children);
        if (childId) {
          return childId;
        }
      }
    }
    return null;
  };

  const id = getIdByPath(props.items);
  if (isNullish(id)) {
    return;
  }
  const parentIds = findParent(props.items, id);
  if (parentIds) {
    parentIds.forEach(id => expandedItems.value.add(id));
  }
})();
</script>

<template>
  <nav ref="navRef" :aria-label="level ? undefined : 'Main navigation'">
    <ul class="space-y-2">
      <li
        v-for="item in items"
        :key="item.id"
      >
        <FolderLink
          isRoot
          :item="item"
          :expandIds="expandedItems"
        />
      </li>
    </ul>
  </nav>
</template>
