import { UNIQUE_START_INDEX_TOC } from '@constants/md';
import { debounce } from '@vavt/util';
import mdit from 'markdown-it';
import type { RenderRule } from 'markdown-it/lib/renderer';
import Renderer from 'markdown-it/lib/renderer';
import Token from 'markdown-it/lib/token';
import MarkdownItAnchor from 'markdown-it-anchor';
import markdownItAttrs from 'markdown-it-attrs';
import MarkdownItContainer from 'markdown-it-container';
import { full as emoji } from 'markdown-it-emoji';
import footnote from 'markdown-it-footnote';
import ImageFiguresPlugin from 'markdown-it-image-figures';
import mila from 'markdown-it-link-attributes';
import MarkdownItMark from 'markdown-it-mark';
import replaceLink from 'markdown-it-replace-link';
import MarkdownItSub from 'markdown-it-sub';
import MarkdownItSup from 'markdown-it-sup';
import TaskListPlugin from 'markdown-it-task-lists';
import markdownItTextualUml from 'markdown-it-textual-uml';
import MarkdownItTOC from 'markdown-it-toc-done-right';
import type { ComputedRef } from 'vue';

import useHighlight from '@/composables/md/useHighlight';
import useKatex from '@/composables/md/useKatex';
import useMermaid from '@/composables/md/useMermaid';
import { BUILD_FINISHED, CATALOG_CHANGED, PUSH_CATALOG, RERENDER } from '@/constants/md/event-name';
import { configOption } from '@/types/md/config';
import type { contentPreviewProps } from '@/types/md/props';
import type { HeadList, MarkdownItConfigPlugin, Themes } from '@/types/md/type';
import bus from '@/utils/event-bus';
import { generateCodeRowNumber, uuid } from '@/utils/md';
import { processMdTextBeforeRender } from '@/utils/StringUtil';

import AdmonitionPlugin from '../markdownIt/admonition';
import CodeTabsPlugin from '../markdownIt/codetabs';
import HeadingPlugin from '../markdownIt/heading';
import KatexPlugin from '../markdownIt/katex';
import MermaidPlugin from '../markdownIt/mermaid';
import TabContentPlugin from '../markdownIt/tab-content';
import TableWrapperPlugin from '../markdownIt/table';

// Todo Need to review why if I put it in it won't render the table
// import mdMultiTable from 'markdown-it-multimd-table';

const initLineNumber = (md: mdit) => {
  [
    'paragraph_open',
    'table_open',
    'ordered_list_open',
    'bullet_list_open',
    'blockquote_open',
    'hr',
    'html_block',
    'fence'
  ].forEach((rule: string) => {
    const backup : (RenderRule | undefined) = md.renderer.rules[rule];

    if (!backup) {
      md.renderer.rules[rule] = (tokens: Token[], idx: number, options: object, _env: object, self: Renderer) => {
        let line;
        if (tokens[idx].map && tokens[idx].level === 0) {
          line = tokens[idx].map![0];
          tokens[idx].attrSet('data-line', String(line));
        }
        return self.renderToken(tokens, idx, options);
      };
    } else {
      md.renderer.rules[rule] = (tokens: Token[], idx: number, options: object, env: object, self: Renderer) => {
        let line;
        const _htmlCode = backup(tokens, idx, options, env, self);

        // Do not add line numbers to commented lines
        if (tokens[idx].map && tokens[idx].level === 0 && !/^<!--/.test(_htmlCode)) {
          line = tokens[idx].map![0];
          return _htmlCode.replace(/^(<[^>]*)/, `$1 data-line="${line}"`);
        }

        return _htmlCode;
      };
    }
  });
};

const useMarkdownIt = (props: contentPreviewProps) => {
  const {
    editorConfig,
    markdownItConfig,
    markdownItPlugins
  } = configOption;

  const runtime = useRuntimeConfig();
  const apiBaseUrl = runtime.public.runTypeConfig.API_BASE_URL;
  const editorId = inject('editorId') as string;
  // Whether to display line numbers
  const showCodeRowNumber = inject('showCodeRowNumber') as boolean;
  const themeRef = inject('theme') as ComputedRef<Themes>;

  const headsRef = ref<HeadList[]>([]);

  const hljsRef = useHighlight(props);
  const katexRef = useKatex(props);
  const {
    reRenderRef,
    replaceMermaid
  } = useMermaid(props);

  const md = mdit({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
    quotes: '“”‘’',
    xhtmlOut: true,
    langPrefix: 'language-'
    // replaceLink: function(link: any) {
    // // is relative path (begin with . or .. or no protocol)
    //   if (link.startsWith('.') || link.startsWith('/') || !link.match(/^[a-zA-Z]+:\/\//)) {
    //   // concat Base URL before relative link
    //     return 'https://abc.com' + link;
    //   }
    //   // if absolute path, retain (http...)
    //   return link;
    // }
  });

    markdownItConfig!(md);
    const plugins: MarkdownItConfigPlugin[] = [
      {
        type: 'markdownItAttrs',
        plugin: markdownItAttrs,
        options: {
          allowedAttributes: ['id', 'class', 'target']
        }
      },
      {
        type: 'mark',
        plugin: MarkdownItMark,
        options: { editorId }
      },
      {
        type: 'katex',
        plugin: KatexPlugin,
        options: { katexRef }
      },
      {
        type: 'image',
        plugin: ImageFiguresPlugin,
        options: {
          figcaption: true,
          classes: 'md-zoom'
        }
      },
      {
        type: 'admonition',
        plugin: AdmonitionPlugin,
        options: {}
      },
      {
        type: 'taskList',
        plugin: TaskListPlugin,
        options: {}
      },
      {
        type: 'heading',
        plugin: HeadingPlugin,
        options: {
          headsRef
        }
      },
      {
        type: 'codeTabs',
        plugin: CodeTabsPlugin,
        options: { editorId }
      },
      {
        type: 'emoji',
        plugin: emoji,
        options: {}
      },
      {
        type: 'footnote',
        plugin: footnote,
        options: { }
      },
      {
        type: 'subscript',
        plugin: MarkdownItSub,
        options: {}
      },
      {
        type: 'superscript',
        plugin: MarkdownItSup,
        options: {}
      },
      {
        type: 'plantUml',
        plugin: markdownItTextualUml,
        options: { server: 'https://plantuml.requarks.io' }
      },
      {
        type: 'tableWrapper',
        plugin: TableWrapperPlugin,
        options: { class: 'table-container' }
      },
      {
        type: 'mila',
        plugin: mila,
        options: [
          {
            matcher(href: string) {
              return href.match(/^https?:\/\//);
            },
            attrs: {
              class: 'is-external-link',
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          }
        ]
      },
      {
        type: 'container',
        plugin: MarkdownItContainer,
        options: {}
      },
      {
        // Important! Do not change the default ID rendering method,
        // as it is currently dependent on the MdToc component rendering
        type: 'anchor',
        plugin: MarkdownItAnchor,
        options: {
          uniqueSlugStartIndex: UNIQUE_START_INDEX_TOC
        }
      },
      {
        type: 'toc',
        plugin: MarkdownItTOC,
        options: {
          listType: 'ul'
        }
      },
      {
        type: 'replaceLink',
        plugin: replaceLink,
        options: {}
      },
      {
        type: 'tabContent',
        plugin: TabContentPlugin,
        options: {}
      }
    ];

    if (!props.noMermaid) {
      plugins.push({
        type: 'mermaid',
        plugin: MermaidPlugin,
        options: { themeRef }
      });
    }

    md.linkify.set({
      fuzzyLink: false // Recognize URL-s without http(s):// head.
    });

    markdownItPlugins!(plugins).forEach((item: MarkdownItConfigPlugin) => {
      md.use(item.plugin, item.options);
    });

    const userDefHighlight = md.options.highlight;

    md.set({
      highlight: (str: string, language: string, attrs: string): any | string => {
        if (userDefHighlight) {
          const result = userDefHighlight(str, language, attrs);
          if (result) {
            return result;
          }
        }
        let codeHtml;

        // Not highlighted or no instance, return to default
        if (!props.noHighlight && hljsRef.value) {
          const hljsLang = hljsRef.value.getLanguage(language);
          if (hljsLang) {
            codeHtml = hljsRef.value.highlight(str, {
              language,
              ignoreIllegals: true
            }).value;
          } else {
            codeHtml = hljsRef.value.highlightAuto(str).value;
          }
        } else {
          codeHtml = md.utils.escapeHtml(str);
        }

        const codeSpan = showCodeRowNumber
          ? generateCodeRowNumber(codeHtml.replace(/^\n+|\n+$/g, ''))
          : `<span class="code-block">${codeHtml.replace(/^\n+|\n+$/g, '')}</span>`;

        return `<pre><code class="language-${language}" language="${language}">${codeSpan}</code></pre>`;
      }
    });

    initLineNumber(md);

    const mdText: string = props.modelValue;
    const modifiedMdText: string = processMdTextBeforeRender(mdText, apiBaseUrl);
    // The key of the article node
    const key = ref(`_article-key_${uuid()}`);
    const html = ref<string>(md.render(modifiedMdText));

    const updatedTodo = () => {
    // Trigger an asynchronous save event (html will always be updated after text)
      bus.emit(editorId, BUILD_FINISHED, html.value);

      if (props?.onHtmlChanged) {
        props.onHtmlChanged(html.value);
      }

      if (props?.onGetCatalog) {
      // Pass title
        props.onGetCatalog(headsRef.value);
      }

      // Generate directory
      bus.emit(editorId, CATALOG_CHANGED, headsRef.value);
      replaceMermaid();
    };

    onMounted(updatedTodo);

    const markHtml = debounce<any, void>(
      async () => {
        // Clean up historical titles
        headsRef.value = [];

        const mdText = props.modelValue;
        const modifiedMdText: string = processMdTextBeforeRender(mdText, apiBaseUrl);
        html.value = md.render(modifiedMdText);
        updatedTodo();
        await nextTick();
        tabEventHydration();
      }
    );

    const needReRender = computed(() => {
      return (props.noKatex || katexRef.value) && (props.noHighlight || hljsRef.value);
    });

    // watch([toRef(props, 'modelValue'), needReRender, reRenderRef], markHtml);
    watch(
      [toRef(props, 'modelValue'), needReRender, reRenderRef],
      debounce<any, void>(
        markHtml,
        editorConfig?.renderDelay || 0
      )
    );

    // Add a directory to actively trigger receiving monitoring
    onMounted(() => {
      bus.on(editorId, {
        name: PUSH_CATALOG,
        callback() {
          bus.emit(editorId, CATALOG_CHANGED, headsRef.value);
        }
      });

      bus.on(editorId, {
        name: RERENDER,
        callback: () => {
          markHtml().then();
          // 强制更新节点
          key.value = `_article-key_${uuid()}`;
        }
      });
    });

    const tabEventHydration = () => {
      document.querySelectorAll('.tabbed-content').forEach((tabContainer: Element) => {
        const tabList = tabContainer.querySelector('.tabbed-labels');
        const buttons = tabContainer.querySelectorAll('button[role="tab"]');
        const panels = tabContainer.querySelectorAll('[role="tabpanel"]');

        // Variables for drag scrolling
        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        if (!tabList) { return; }

        // Add drag scroll events
        tabList?.addEventListener('mousedown', (e: Event) => {
          isDown = true;
          tabList.classList.add('grabbing');
          startX = (e as MouseEvent).pageX - (tabList as HTMLElement).offsetLeft;
          scrollLeft = tabList.scrollLeft;
        });

        tabList.addEventListener('mouseleave', () => {
          isDown = false;
          tabList.classList.remove('grabbing');
        });

        tabList.addEventListener('mouseup', () => {
          isDown = false;
          tabList.classList.remove('grabbing');
        });

        tabList.addEventListener('mousemove', (e: Event) => {
          if (!isDown) { return; }
          e.preventDefault();
          const x = (e as MouseEvent).pageX - (tabList as HTMLElement).offsetLeft;
          const walk = (x - startX) * 2; // Scroll speed multiplier
          tabList.scrollLeft = scrollLeft - walk;
        });

        // Handle tab switching
        buttons.forEach((button: Element) => {
          button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Update button states
            buttons.forEach((btn: Element) => {
              const isSelected = btn === button;
              btn.setAttribute('aria-selected', isSelected.toString());
              btn.classList.toggle('tabbed-active', isSelected);
            });

            // Update panel visibility
            panels.forEach((panel: Element) => {
              const isVisible = panel.getAttribute('data-tab') === tabId;
              panel.setAttribute('aria-hidden', (!isVisible)?.toString());
              panel.classList.toggle('tabbed-active', isVisible);
            });

            // Scroll selected tab into view if needed
            button.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center'
            });
          });
        });
      });
    };

    return { html, key };
};

export default useMarkdownIt;
