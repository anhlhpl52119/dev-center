<script setup lang="js">
import { alert } from '@mdit/plugin-alert';
import { demo } from '@mdit/plugin-demo';
import { tasklist } from '@mdit/plugin-tasklist';
import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
import MarkdownIt from 'markdown-it';
import Anchor from 'markdown-it-anchor';
import MarkdownItAttrs from 'markdown-it-attrs';
import MarkdownItContainer from 'markdown-it-container';
import { full as emoji } from 'markdown-it-emoji';
import Footnote from 'markdown-it-footnote';
import ImageFiguresPlugin from 'markdown-it-image-figures';
import MarkdownLinkAttributes from 'markdown-it-link-attributes';
import MarkdownItMark from 'markdown-it-mark';

// import MarkdownItMermaid from 'markdown-it-mermaid';
import ReplaceLink from 'markdown-it-replace-link';
import MarkdownItSub from 'markdown-it-sub';
import MarkdownItSup from 'markdown-it-sup';
import MarkdownItTextualUml from 'markdown-it-textual-uml';
import MarkdownItTOC from 'markdown-it-toc-done-right';

import AdmonitionPlugin from '@/lib/markdown-it-plugins/admonition';
import ShikiCodeHighlightPlugin from '@/lib/markdown-it-plugins/shiki-code-highlight';
import tableWrapperPlugin from '@/lib/markdown-it-plugins/table';

const props = defineProps({
  content: String,
  description: String,
  heading: String,
  updatedAt: String,
});

const updateTime = computed(() => dayjs(props.updatedAt).format('YYYY.MM.DD 오후 hh:mm'));
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
  .use(MarkdownItAttrs, {
    allowedAttributes: ['id', 'class', 'target'],
  })
  .use(AdmonitionPlugin)
  .use(tableWrapperPlugin)
  .use(Anchor, {
    // permalink: Anchor.permalink.headerLink(),
    slugify: s => encodeURIComponent(s.trim().toLowerCase().replace(/\s+/g, '-')),
  })
  .use(ReplaceLink, {
    replaceLink: (link) => {
      if (link.startsWith('http://') || link.startsWith('https://')) {
        return link;
      }

      const articlePath = routes.fullPath.replace(/^\/(ko|en)\/docs\//, '/$1/');

      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
      const hasImgExtension = allowedExtensions.some(ext =>
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
  .use(MarkdownItMark)
  .use(ImageFiguresPlugin, {
    figcaption: true,
    classes: 'md-zoom',
  })
  .use(emoji)
  .use(MarkdownItSup)
  .use(MarkdownItSub)
  .use(Footnote)
  .use(MarkdownItTextualUml)
  .use(MarkdownItContainer)
  .use(MarkdownItTOC)
  .use(MarkdownLinkAttributes, {
    matcher(href) {
      return href.match(/^https?:\/\//);
    },
    attrs: {
      class: 'is-external-link',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  })
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
  <article
    itemscope
    itemtype="http://schema.org/Article"
  >
    <header class="min-h-72">
      <h1 itemprop="headline" class="text-32 mb-4 leading-44 font-bold">
        {{ heading }}
      </h1>
      <p
        v-if="description"
        itemprop="description"
        class="text-13 text-quiet leading-22 tracking-[-0.0025rem]"
      >
        {{ description }}
      </p>
    </header>

    <div
      class="grid bg-abg-base bd-radius-32 mt-40 p-30 shadow-lg"
      itemprop="articleBody"
    >
      <div
        v-if="renderedContent"
        class="markdown-body overflow-hidden"
        v-html="renderedContent"
      />
    </div>

    <p
      v-if="updatedAt"
      itemprop="lastUpdatedAt"
      class="text-quiet text-13 mt-20 text-right"
    >
      {{ $t('common.last_update_at', { at: updateTime }) }}
    </p>
  </article>
</template>
