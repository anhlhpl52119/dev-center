<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import Anchor from 'markdown-it-anchor';

const props = defineProps<{
  content?: string;
  title?: string;
}>();

interface TocItem {
  level: number;
  title: string;
  anchor: string;
}

const md = new MarkdownIt().use(Anchor, {
  slugify: (s: string) => encodeURIComponent(s.trim().toLowerCase().replace(/\s+/g, '-')),
});

const activeAnchors = ref<string[]>([]);

const tocItems = computed(() => {
  if (!props.content)
    return [];

  const tokens = md.parse(props.content, {});
  const items: TocItem[] = [];

  tokens.forEach((token) => {
    if (token.type === 'heading_open') {
      const level = Number.parseInt(token.tag.substring(1));
      const titleToken = tokens[tokens.indexOf(token) + 1];
      if (titleToken && titleToken.type === 'inline') {
        const title = titleToken.content.replace(
          /\[([^\]]+)\]\([^)]+\)/g,
          '$1',
        );

        const anchor = encodeURIComponent(title.trim().toLowerCase().replace(/\s+/g, '-'));
        items.push({ level, title, anchor });
      }
    }
  });

  return items;
});

function scrollToHeading(anchor: string) {
  nextTick(() => {
    const element = document.getElementById(anchor);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - 100, behavior: 'smooth' });
    }
  });
}

function updateActiveAnchors() {
  const headings = tocItems.value.map(item => document.getElementById(item.anchor)).filter(Boolean);
  const viewportHeight = window.innerHeight;

  activeAnchors.value = headings
    .filter((heading) => {
      const rect = heading!.getBoundingClientRect();
      return rect.top <= viewportHeight && rect.bottom >= 0;
    })
    .map(heading => heading!.id);
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveAnchors);
  updateActiveAnchors();
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveAnchors);
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
        class="hover:bg-abd-active relative size-32 rounded-full bg-abg-dimmed p-8"
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
            class="hover:text-primary font-medium cursor-pointer block transition-all duration-300"
            :class="{ 'text-primary': activeAnchors.includes(item.anchor) }"
            @click="scrollToHeading(item.anchor)"
          >
            {{ item.title }}
          </NuxtLink>
        </template>

        <template v-else>
          <div class="border-l-abd-base hover:border-l-primary border-l-1 py-4 transition-all duration-300">
            <NuxtLink
              :to="`#${item.anchor}`"
              class="hover:text-primary font-normal cursor-pointer pl-16 block transition-all duration-300"
              :class="{ 'text-primary': activeAnchors.includes(item.anchor) }"
              @click="scrollToHeading(item.anchor)"
            >
              {{ item.title }}
            </NuxtLink>
          </div>
        </template>
      </li>
    </ul>
  </nav>
</template>
