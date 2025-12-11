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

const localeRoute = useLocaleRoute();
const { locale } = useI18n();
const routeBaseName = useRouteBaseName();

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

function findParentIds(nodes: LNBModel[], targetId: number) {
  for (const node of nodes) {
    // 1. Nếu tìm thấy ID trùng khớp
    if (node.id === targetId) {
      return [node.id];
    }

    // 2. Nếu node này có con, tiếp tục tìm đệ quy trong children
    if (node.children && node.children.length > 0) {
      const foundPath: number[] = findParentIds(node.children, targetId);

      // 3. Nếu tìm thấy trong children (foundPath không phải null)
      if (foundPath) {
        // Thêm id của cha hiện tại vào phía sau mảng kết quả
        foundPath.push(node.id);
        return foundPath;
      }
    }
  }

  // 4. Nếu đi hết vòng lặp mà không thấy
  return [];
}

function findMatchingPath(
  items: LNBModel[] | undefined,
  currentPath: string,
  parentIds: number[] = [],
): number[] | null {
  if (!items)
    return null;

  for (const item of items) {
    const itemPath = localePath(`/${item.path}`);
    if (itemPath === currentPath) {
      return parentIds;
    }
    if (item.children?.length) {
      const result = findMatchingPath(item.children, currentPath, [
        ...parentIds,
        item.id,
      ]);
      if (result)
        return result;
    }
  }
  return null;
}

function getFocusableElements() {
  if (!navRef.value)
    return [];
  return Array.from(navRef.value.querySelectorAll('a')) as HTMLElement[];
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
  const getIdByPath = (items: LNBModel[]) => {
    for (const i of items) {
      if (localePath(`/${i.path}`) === decodeURIComponent(route.path)) {
        return i.id;
      }
      else if (i.children?.length) {
        return getIdByPath(i.children);
      }
    }

    return null;
  };

  const id = getIdByPath(props.items);
  if (isNullish(id)) {
    return;
  }
  const parentIds = findParentIds(props.items, id);
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
