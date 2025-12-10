<script setup lang="ts">
import type { LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem } from '@@/graphql';

export interface LNBModel
  extends LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem {
  children?: LNBModel[];
}

const props = defineProps<{
  items?: LNBModel[];
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

const isExpanded = (id: number) => expandedItems.value.has(id);

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
const matchingParentId = computed(
  () => findMatchingPath(props.items, route.path) || ([] as number[]),
);

(() => {
  const parentIds = findMatchingPath(props.items, route.path);
  if (parentIds) {
    parentIds.forEach(id => expandedItems.value.add(id));
  }
})();
</script>

<template>
  <nav ref="navRef" :aria-label="level ? undefined : 'Main navigation'">
    <div :role="level ? 'group' : undefined" class="space-y-2">
      <div
        v-for="item in items"
        :key="item.id"
        class="rounded-full leading-24"
      >
        <!-- link -->
        <NuxtLinkLocale
          v-if="!item.isFolder"
          :to="`/${item.path}`"
          exactActiveClass="!bg-abg-active text-primary"
          class="text-14 focus-visible:ring-primary block rounded-full py-8 pr-12 pl-16 leading-24 font-medium capitalize transition-all duration-200 hover:bg-gray-500/5 focus-visible:ring-1 focus-visible:outline-none"
          @keydown="handleKeydown($event, item.id)"
        >
          {{ item.title }}
        </NuxtLinkLocale>

        <!-- Folder -->
        <NuxtLinkLocale
          v-else
          v-slot="{ isExactActive }"
          :to="`/${item.path}`"
          exactActiveClass="!bg-abg-active text-primary"
          class="focus-visible:ring-primary block rounded-full capitalize transition-all duration-200 hover:bg-gray-500/5 focus-visible:ring-1 focus-visible:outline-none"
          @keydown="handleKeydown($event, item.id)"
        >
          <div
            class="text-15 flex w-full items-center gap-8 rounded-full py-8 pr-12 pl-16 font-medium"
            :class="{
              '!bg-abg-active font-bold!': isExactActive,
              'font-bold!': matchingParentId.includes(item.id),
            }"
          >
            <span class="flex-1">
              {{ item.title }}
            </span>

            <button
              v-if="item.children?.length"
              :aria-expanded="isExpanded(item.id)"
              tabindex="-1"
              :aria-label="`${isExpanded(item.id) ? 'Collapse' : 'Expand'} ${item.title}`"
              class="hover:text-primary size-16 cursor-pointer rounded-full transition-all duration-200 hover:bg-gray-500/20"
              @click.prevent="toggleExpand(item.id)"
            >
              <Icon
                name="svg:single-arrow-down"
                class="h-6 w-10 align-[0.34em] leading-24 transition-all duration-200"
                :class="[
                  isExpanded(item.id) ? '-rotate-180 align-[-0.4em]' : '',
                ]"
                aria-hidden="true"
              />
            </button>
          </div>
        </NuxtLinkLocale>

        <!-- Nested child -->
        <Transition
          enterActiveClass="transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          leaveActiveClass="transition-all duration-250 ease-[cubic-bezier(0.4,0,0.6,1)]"
          enterFromClass="opacity-0 max-h-0 scale-y-0 origin-top"
          enterToClass="opacity-100 max-h-1000 scale-y-100 origin-top"
          leaveFromClass="opacity-100 max-h-1000 scale-y-100 origin-top"
          leaveToClass="opacity-0 max-h-0 scale-y-0 origin-top"
        >
          <div
            v-if="
              item.children?.length && (!item.isFolder || isExpanded(item.id))
            "
            class="mt-4 overflow-hidden pl-16"
          >
            <div>
              <AppLeftNavigationBar
                :items="item.children"
                :level="(level || 0) + 1"
              />
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </nav>
</template>
