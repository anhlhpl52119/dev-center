<script setup lang="js">
import { alert } from '@mdit/plugin-alert';
import { demo } from '@mdit/plugin-demo';
import { tasklist } from '@mdit/plugin-tasklist';
import { slugifyWithCounter } from '@sindresorhus/slugify';
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

import ReplaceLink from 'markdown-it-replace-link';
import MarkdownItSub from 'markdown-it-sub';
import MarkdownItSup from 'markdown-it-sup';
import MarkdownItTextualUml from 'markdown-it-textual-uml';
import MarkdownItTOC from 'markdown-it-toc-done-right';

import AdmonitionPlugin from '@/lib/markdown-it-plugins/admonition';
import copyButtonPlugin from '@/lib/markdown-it-plugins/copy-button';
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
let slug = slugifyWithCounter();

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
    slugify: s => slug(encodeURIComponent(s), { separator: '' }),
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
  .use(ShikiCodeHighlightPlugin)
  .use(copyButtonPlugin);

const renderedContent = computed(() => {
  if (!props.content) {
    return '';
  }
  slug = slugifyWithCounter();
  const html = md.render(props.content);

  if (import.meta.client) {
    return DOMPurify.sanitize(html);
  }

  return html;
});

let globalObserver = null;

function initTableShadows() {
  // init sentinel dom observer
  globalObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const sentinel = entry.target;
      // find related sentinel wrapper
      const wrapper = sentinel.closest('[data-table-wrapper]');
      if (!wrapper)
        return;

      const isLeft = sentinel.classList.contains('sentinel-l');
      const shadow = isLeft
        ? wrapper.querySelector('.shadow-l')
        : wrapper.querySelector('.shadow-r');

      if (shadow) {
        // 1: end of block => hidden shadow
        // 0: scrollable
        shadow.style.opacity = entry.isIntersecting ? '0' : '1';
      }
    });
  });

  // regis each table each sentinel observer
  const wrappers = document.querySelectorAll('[data-table-wrapper]');
  wrappers.forEach((wrapper) => {
    const container = wrapper.querySelector('.scroll-container');
    const sentinels = wrapper.querySelectorAll('.sentinel-l, .sentinel-r');

    // ass sentinel observer for specific container
    const containerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const isLeft = entry.target.classList.contains('sentinel-l');
        const shadow = isLeft ? wrapper.querySelector('.shadow-l') : wrapper.querySelector('.shadow-r');
        if (shadow)
          shadow.style.opacity = entry.isIntersecting ? '0' : '1';
      });
    }, {
      root: container,
      threshold: 0.9,
    });

    sentinels.forEach(s => containerObserver.observe(s));
  });
}

onUnmounted(() => {
  if (globalObserver) {
    globalObserver.disconnect();
  }
});

function addCopyButtons() {
  const copyButtons = document.querySelectorAll('[data-copy-btn]');

  copyButtons.forEach((btn) => {
    btn.onclick = async () => {
      const pre = btn.parentElement?.querySelector('pre code');
      const code = pre?.textContent || '';

      try {
        await navigator.clipboard.writeText(code);
        btn.innerHTML = '<span class="icon-[solar--unread-outline] size-20 text-primary"></span>';
        setTimeout(() => {
          btn.innerHTML = '<span class="icon-[solar--copy-linear] size-20 text-gray-600"></span>';
        }, 1000);
      }
      catch (err) {
        console.error('Failed to copy code:', err);
      }
    };
  });
}

// TODO: improve later
onMounted(async () => {
  await nextTick();
  highlightCodeBlocks();
  initTableShadows();
  addCopyButtons();
});

watch(() => props.content, () => {
  nextTick(() => {
    highlightCodeBlocks();
    initTableShadows();
    addCopyButtons();
    slug = slugifyWithCounter();
  });
});
</script>

<template>
  <article
    itemscope
    itemtype="http://schema.org/Article"
  >
    <header class="min-h-72">
      <h1 itemprop="headline" class="text-32 mb-4 break-all leading-44 font-bold">
        {{ heading }}
      </h1>
      <p
        itemprop="description"
        class="text-13 text-quiet break-all leading-22 tracking-[-0.0025rem]"
      >
        {{ description }}
      </p>
    </header>

    <div
      class="grid bg-abg-base bd-radius-32 mt-40 p-30 base-shadow"
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
