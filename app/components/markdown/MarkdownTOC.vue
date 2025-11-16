<script setup lang="ts">
import slugify from '@sindresorhus/slugify';
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';

const props = defineProps<{
  content?: string;
}>();

interface TocItem {
  level: number;
  title: string;
  anchor: string;
}

const md = new MarkdownIt()
  .use(anchor, {
    slugify: s => slugify(s),
  });

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
        const title = titleToken.content.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

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
    <div class="flex items-center justify-between leading-6">
      <span class="text-md font-bold">{{ $t('common.vulcanus_guide') }}</span>
      <button
        class="hover:bg-abd-active relative size-8 rounded-full bg-[#eff0f6] p-2"
      >
        <Icon
          name="svg:close-arrow-right"
          class="absolute w-3 -translate-1/2"
        />
      </button>
    </div>

    <ul class="text-tcl-dimmed mt-1.5 text-sm leading-5.5">
      <li
        v-for="item in tocItems"
        :key="item.anchor"
        :class="{
          'mt-2 font-medium': item.level <= 2,
          'pl-1 font-normal': item.level > 2,
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
          <div class="border-l-abd-base hover:border-l-primary border-l-1 py-1">
            <NuxtLink
              class="pl-4 hover:text-primary cursor-pointer"
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
