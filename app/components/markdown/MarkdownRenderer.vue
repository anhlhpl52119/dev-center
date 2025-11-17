<script setup lang="ts">
import { alert } from '@mdit/plugin-alert';
import { figure } from '@mdit/plugin-figure';
import { footnote } from '@mdit/plugin-footnote';
import { mark } from '@mdit/plugin-mark';
import { sub } from '@mdit/plugin-sub';
import { sup } from '@mdit/plugin-sup';
import { tab } from '@mdit/plugin-tab';
import { tasklist } from '@mdit/plugin-tasklist';
import slugify from '@sindresorhus/slugify';
import DOMPurify from 'dompurify';
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import markdownItAttrs from 'markdown-it-attrs';

import linkAttrs from 'markdown-it-link-attributes';
import markdownItTOC from 'markdown-it-toc-done-right';
import AdmonitionPlugin from '@/lib/markdown-it-plugins/admonition';

const props = defineProps<{
  content?: string;
}>();

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  quotes: '“”‘’',
  xhtmlOut: true,
})
  .use(tasklist)
  .use(figure)
  .use(mark)
  .use(sub)
  .use(tab)
  .use(sup)
  .use(alert)
  .use(markdownItAttrs)
  .use(footnote)
  .use(linkAttrs)
  .use(markdownItTOC)
  .use(AdmonitionPlugin)
  .use(anchor, {
    slugify: s => slugify(s),
  });

const renderedContent = computed(() => {
  if (!props.content) {
    return '';
  }
  const html = md.render(props.content);

  if (import.meta.client) {
    return DOMPurify.sanitize(html);
  }

  return html;
});
</script>

<template>
  <div v-if="!renderedContent" />
  <div
    v-else
    class="markdown-body"
    v-html="renderedContent"
  />
</template>

<style>
@import '~/assets/css/github/github-markdown.css';
@import '~/assets/css/github/github-light.css';
/* @import '~/assets/css/github/github-dark.css'; */

/* @reference "~/assets/css/main.css";

.markdown-content {
  @apply leading-relaxed;

  &:deep(h1) {
    @apply text-heading my-4 font-bold;
  }

  &:deep(h2) {
    @apply my-3 text-2xl font-bold;
  }

  &:deep(h3) {
    @apply my-3 text-xl font-bold;
  }

  &:deep(h4) {
    @apply my-2 text-xl font-bold;
  }

  &:deep(h5) {
    @apply my-2 text-lg font-bold;
  }

  &:deep(h6) {
    @apply text-body my-2 font-bold;
  }

  &:deep(p) {
    @apply my-4;
  }

  &:deep(ul) {
    @apply my-4 list-disc pl-8;
  }

  &:deep(ol) {
    @apply my-4 list-decimal pl-8;
  }

  &:deep(li) {
    @apply my-1;
  }

  &:deep(code) {
    @apply rounded bg-abg-active px-1.5 py-0.5 font-mono text-sm;
  }

  &:deep(pre) {
    @apply my-4 overflow-x-auto rounded-lg bg-abg-active p-4;

    code {
      @apply bg-transparent p-0;
    }
  }

  &:deep(blockquote) {
    @apply my-4 border-l-4 border-abd-base pl-4 text-tcl-base italic;
  }

  &:deep(a) {
    @apply text-primary no-underline hover:underline;
  }

  &:deep(img) {
    @apply h-auto max-w-full rounded;
  }

  &:deep(hr) {
    @apply my-6 border-t border-abd-base;
  }

  &:deep(table) {
    @apply my-4 w-full border-collapse;
  }

  &:deep(th) {
    @apply border border-abd-base bg-abg-active px-3 py-2 text-left font-bold;
  }

  &:deep(td) {
    @apply border border-abd-base px-3 py-2 text-left;
  }

  &:deep(strong) {
    @apply font-bold;
  }

  &:deep(em) {
    @apply italic;
  }

  &:deep(del) {
    @apply line-through;
  }
} */
</style>
