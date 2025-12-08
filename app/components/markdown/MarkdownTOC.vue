<script setup lang="ts">
import MarkdownIt from 'markdown-it';

const props = defineProps<{
  content?: string;
}>();

interface TocItem {
  level: number;
  title: string;
  anchor: string;
}

const md = new MarkdownIt();

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

        const anchor = slugify(title);
        items.push({ level, title, anchor });
      }
    }
  });

  return items;
});
</script>

<template>
  <aside>
    <div class="flex items-center justify-between leading-24">
      <span class="text-15 font-bold">{{ $t('common.vulcanus_guide') }}</span>
      <button
        class="hover:bg-abd-active relative size-32 rounded-full bg-[#eff0f6] p-8"
      >
        <Icon
          name="svg:close-arrow-right"
          class="absolute w-12 -translate-1/2"
        />
      </button>
    </div>

    <ul class="text-quiet mt-6 text-13 leading-22">
      <li
        v-for="item in tocItems"
        :key="item.anchor"
        :class="{
          'mt-8 font-medium': item.level <= 2,
          'pl-4 font-normal': item.level > 2,
        }"
      >
        <template v-if="item.level <= 2">
          <NuxtLink
            class="hover:text-primary cursor-pointer"
            :to="`#${item.anchor}`"
          >
            {{ item.title }}
          </NuxtLink>
        </template>

        <template v-else>
          <div class="border-l-abd-base hover:border-l-primary border-l-1 py-4">
            <NuxtLink
              class="hover:text-primary cursor-pointer pl-16"
              :to="`#${item.anchor}`"
            >
              {{ item.title }}
            </NuxtLink>
          </div>
        </template>
      </li>
    </ul>
  </aside>
</template>
