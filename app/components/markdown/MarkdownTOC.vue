<script setup lang="ts">
import { slugifyWithCounter } from '@sindresorhus/slugify';
import { tryOnMounted, useEventListener } from '@vueuse/core';
import MarkdownIt from 'markdown-it';

const props = defineProps<{
  content?: string;
  title?: string;
}>();

interface TocItem {
  level: number;
  title: string;
  anchor: string;
}

const md = new MarkdownIt();
const activeAnchors = ref<string[]>([]);

const tocItems = computed(() => {
  if (!props.content) {
    return [];
  }

  const slugify = slugifyWithCounter();
  const tokens = md.parse(props.content, {});
  const items: TocItem[] = [];
  tokens.forEach((token) => {
    if (token.type === 'heading_open') {
      const level = Number.parseInt(token.tag.substring(1));
      const titleToken = tokens[tokens.indexOf(token) + 1];
      if (titleToken && titleToken.type === 'inline') {
        const childs
          = md.parseInline(titleToken.content, {})[0]?.children || [];
        const title
          = childs
            .map((i) => {
              if (i.type === 'text') {
                return i.content;
              }
              return '';
            })
            ?.join('') ?? '';

        const anchor = slugify(encodeURIComponent(title), {
          separator: '',
        });
        items.push({ level, title, anchor });
      }
    }
  });

  return items;
});

function updateActiveAnchors() {
  const headings = tocItems.value
    .map(item => document.getElementById(item.anchor))
    .filter(Boolean);

  if (headings.length === 0) {
    activeAnchors.value = [];
    return;
  }

  const scrollTop = window.scrollY;
  const viewportHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollBottom = scrollTop + viewportHeight;

  const activeIds: string[] = [];
  const OFFSET = 100;

  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    if (!heading)
      continue;

    const nextHeading = headings[i + 1];
    const start = heading.offsetTop;
    const end = nextHeading ? nextHeading.offsetTop : documentHeight;

    // Check if the section [start, end) overlaps with the viewport [scrollTop + OFFSET, scrollBottom)
    // Overlap condition: start < scrollBottom && end > scrollTop + OFFSET
    if (start < scrollBottom && end > scrollTop + OFFSET) {
      activeIds.push(heading.id);
    }
  }

  activeAnchors.value = activeIds;
}

tryOnMounted(() => {
  useEventListener(document, 'scroll', updateActiveAnchors);
  updateActiveAnchors();
});
</script>

<template>
  <nav>
    <div class="flex items-center justify-between leading-24">
      <span class="text-15 font-bold">{{ title }}</span>

      <button
        aria-label="title of content"
        aria-describedby="Content Heading list"
        aria-pressed="false"
        class="hover:bg-abd-active bg-abg-dimmed relative size-32 rounded-full p-8"
      >
        <Icon
          name="svg:close-arrow-right"
          class="absolute w-12 -translate-1/2"
        />
      </button>
    </div>

    <ul class="text-quiet text-13 mt-6 leading-22 tracking-[-0.025em]">
      <li
        v-for="item in tocItems"
        :key="item.anchor"
        :class="{
          'mt-8': item.level <= 2,
          'pl-4': item.level > 2,
        }"
      >
        <template v-if="item.level <= 2">
          <NuxtLink
            :to="`#${item.anchor}`"
            class="hover:text-primary block cursor-pointer font-medium transition-all duration-300"
            :class="{ 'text-primary': activeAnchors.includes(item.anchor) }"
            replace
          >
            {{ item.title }}
          </NuxtLink>
        </template>

        <template v-else>
          <div
            class="border-l-abd-base hover:border-l-primary border-l py-4 transition-all duration-300"
          >
            <NuxtLink
              :to="`#${item.anchor}`"
              class="hover:text-primary block cursor-pointer pl-16 font-normal transition-all duration-300"
              :class="{ 'text-primary': activeAnchors.includes(item.anchor) }"
              replace
            >
              {{ item.title }}
            </NuxtLink>
          </div>
        </template>
      </li>
    </ul>
  </nav>
</template>
