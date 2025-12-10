<script setup lang="ts">
import type { LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem } from '@@/graphql';

export interface LNBModel extends LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem {
  children?: LNBModel[];
}

defineProps<{
  items?: LNBModel[];
  level?: number;
}>();

const expandedItems = ref<Set<number>>(new Set());
const navRef = useTemplateRef('navRef');

function toggleExpand(id: number) {
  if (expandedItems.value.has(id)) {
    expandedItems.value.delete(id);
  }
  else {
    expandedItems.value.add(id);
  }
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

    const nextIndex = event.key === 'ArrowDown'
      ? (currentIndex + 1) % elements.length
      : (currentIndex - 1 + elements.length) % elements.length;

    elements[nextIndex]?.focus();
  }
}
</script>

<template>
  <nav ref="navRef" :aria-label="level ? undefined : 'Main navigation'">
    <ul :role="level ? 'group' : undefined" class="space-y-2">
      <li
        v-for="item in items"
        :key="item.id"
        class="rounded-full leading-24 font-bold"
      >
        <!-- link -->
        <NuxtLinkLocale
          v-if="!item.isFolder"
          :to="`/${item.path}`"
          exactActiveClass="!bg-abg-active text-primary"
          class="hover:bg-gray-500/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary block rounded-full py-8 pr-12 pl-16 leading-24 font-medium capitalize"
          activeClass="font-medium"
          @keydown="handleKeydown($event, item.id)"
        >
          {{ item.title }}
        </NuxtLinkLocale>

        <!-- Folder -->
        <NuxtLinkLocale
          v-else
          v-slot="{ isExactActive }"
          :to="`/${item.path}`"
          exactActiveClass="!bg-abg-active"
          class="hover:bg-gray-500/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary block rounded-full"
          @keydown="handleKeydown($event, item.id)"
        >
          <div
            class="flex w-full items-center rounded-full py-8 pr-12 pl-16"
            :class="{ '!bg-abg-active': isExactActive }"
          >
            <span
              class="flex-1 capitalize"
              :class="{ 'text-primary': isExactActive }"
            >
              {{ item.title }}
            </span>

            <button
              v-if="item.children?.length"
              :aria-expanded="isExpanded(item.id)"
              tabindex="-1"
              :aria-label="`${isExpanded(item.id) ? 'Collapse' : 'Expand'} ${item.title}`"
              class="cursor-pointer hover:text-primary hover:bg-gray-500/20 size-16 rounded-full transition-all duration-200"
              @click.prevent="toggleExpand(item.id)"
            >
              <Icon
                name="svg:single-arrow-down"
                class="h-6 w-10 leading-24 align-[0.34em] transition-all duration-200"
                :class="[isExpanded(item.id) ? '-rotate-180' : '']"
                aria-hidden="true"
              />
            </button>
          </div>
        </NuxtLinkLocale>

        <!-- Nested child -->
        <Transition
          enterActiveClass="transition-all duration-200 ease-out"
          leaveActiveClass="transition-all duration-200 ease-in"
          enterFromClass="opacity-0 max-h-0"
          enterToClass="opacity-100 max-h-screen"
          leaveFromClass="opacity-100 max-h-screen"
          leaveToClass="opacity-0 max-h-0"
        >
          <ul
            v-if="item.children?.length && (!item.isFolder || isExpanded(item.id))"
            class="mt-4 pl-16 overflow-hidden"
          >
            <AppLeftNavigationBar :items="item.children" :level="(level || 0) + 1" />
          </ul>
        </Transition>
      </li>
    </ul>
  </nav>
</template>
