<script lang="ts" setup>
import { subtle } from 'node:crypto';

const props = defineProps<{
  title?: string;
  subtitle?: string;
  content?: string;
}>();

const { $api } = useNuxtApp();
const markdown = ref('');
const _subtitle = ref('');
const _title = ref('');

onMounted(async () => {
  const { data } = await $api('/api/markdown', {
    baseURL: '/',
  });
  markdown.value = data.pages.singleByPath.content;
  _subtitle.value = data.pages.singleByPath.title;
  _title.value = data.pages.singleByPath.title;
});
</script>

<template>
  <article itemscope itemtype="http://schema.org/Article">
    <header>
      <h1 itemprop="headline" class="text-heading mb-1 font-bold">
        {{ _title }}
      </h1>

      <p itemprop="description" class="text-sx text-tcl-dimmed">
        {{ _subtitle }}
      </p>
    </header>

    <MarkdownRenderer
      :content="markdown"
      itemprop="articleBody"
      class="bg-abg-base mt-10 min-h-10 max-w-179 rounded-4xl p-7.5 shadow-sm overflow-x-auto"
    />

    <p itemprop="lastUpdatedAt" class="text-tcl-dimmed mt-5 text-right text-xs">
      {{ $t('common.last_update_at', { at: '2025.09.11 오후 20:22' }) }}
    </p>
  </article>
</template>
