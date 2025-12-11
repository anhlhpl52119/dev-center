<script setup lang="ts">
import { alert } from '@mdit/plugin-alert';
import { demo } from '@mdit/plugin-demo';
import { tasklist } from '@mdit/plugin-tasklist';
import DOMPurify from 'dompurify';
import MarkdownIt from 'markdown-it';
import Anchor from 'markdown-it-anchor';
import replaceLink from 'markdown-it-replace-link';
import AdmonitionPlugin from '@/lib/markdown-it-plugins/admonition';
import ShikiCodeHighlightPlugin from '@/lib/markdown-it-plugins/shiki-code-highlight';

const props = defineProps<{
  content?: string;
}>();
const { locale } = useI18n();
const { highlightCodeBlocks } = useShikiHighlight();
const routes = useRoute();
const { apiBaseUrl, siteUrl } = useRuntimeConfig().public;
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  quotes: '“”‘’',
  xhtmlOut: true,
})
  .use(AdmonitionPlugin)
  .use(Anchor)
  .use(replaceLink, {
    replaceLink: (link: string) => {
      if (link.startsWith('http://') || link.startsWith('https://')) {
        return link;
      }

      const articlePath = routes.fullPath.replace(/^\/(ko|en)\/docs\//, '/$1/');

      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
      const hasImgExtension = allowedExtensions.some((ext: string) =>
        link.toLowerCase().endsWith(ext),
      );
      if (hasImgExtension) {
        const relativePath = new URL(link, singleSlash(`${apiBaseUrl}/${articlePath}`)).pathname;
        return singleSlash(`${apiBaseUrl}/resources/${relativePath}`);
      }

      const docsHost = singleSlash(`${siteUrl}/${articlePath}`);
      const mdPathname = new URL(link.replace('.md', ''), docsHost).pathname;

      if (mdPathname.startsWith('/ko')) {
        return mdPathname.replace('/ko', '/ko/docs');
      }
      else if (mdPathname.startsWith('/en')) {
        return mdPathname.replace('/en', '/en/docs');
      }

      return singleSlash(`/${locale.value}/${mdPathname}`);
    },
  })
  .use(tasklist)
  .use(demo)
  .use(alert)
  .use(ShikiCodeHighlightPlugin);

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

// TODO: improve later
onMounted(() => {
  nextTick(() => {
    highlightCodeBlocks();
  });
});

watch(() => props.content, () => {
  nextTick(() => {
    highlightCodeBlocks();
  });
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
