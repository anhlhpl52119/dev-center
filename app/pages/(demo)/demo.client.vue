<script setup lang="js">
import { alert } from '@mdit/plugin-alert';
import { demo } from '@mdit/plugin-demo';
import { tasklist } from '@mdit/plugin-tasklist';
import MarkdownIt from 'markdown-it';
import Anchor from 'markdown-it-anchor';
import MarkdownItAttrs from 'markdown-it-attrs';
import MarkdownItContainer from 'markdown-it-container';
import { full as emoji } from 'markdown-it-emoji';
import Footnote from 'markdown-it-footnote';
import ImageFiguresPlugin from 'markdown-it-image-figures';
import MarkdownItMark from 'markdown-it-mark';
import MarkdownItSub from 'markdown-it-sub';
import MarkdownItSup from 'markdown-it-sup';
import MarkdownItTextualUml from 'markdown-it-textual-uml';
import MarkdownItTOC from 'markdown-it-toc-done-right';
import tabContentPlugin, {
  tabEventHydration,
} from '@/lib/markdown-it-plugins/tab-content';

defineI18nRoute(false);

const { highlightCodeBlocks } = useShikiHighlight();

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
})
  .use(MarkdownItAttrs)
  .use(tasklist)
  .use(demo)
  .use(alert)
  .use(MarkdownItMark)
  .use(ImageFiguresPlugin)
  .use(emoji)
  .use(MarkdownItSup)
  .use(MarkdownItSub)
  .use(Footnote)
  .use(MarkdownItTextualUml)
  .use(MarkdownItContainer)
  .use(MarkdownItTOC)
  .use(tabContentPlugin)
  .use(Anchor);

const examples = [
  {
    name: 'Headers',
    markdown: `
# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header`,
  },
  {
    name: 'Text Formatting',
    markdown: `
**Bold text**
*Italic text*
~~Strikethrough~~
==Highlighted text==
H~2~O (subscript)
X^2^ (superscript)`,
  },
  {
    name: 'Lists',
    markdown: `
- Unordered list item 1
- Unordered list item 2
  - Nested item

1. Ordered list item 1
2. Ordered list item 2
   1. Nested ordered item`,
  },
  {
    name: 'Task Lists',
    markdown: `
- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task`,
  },
  {
    name: 'Links and Images',
    markdown: `
[Link text](https://example.com)
![Alt text](https://developers-vulcanus-api-dev.onstove.com/resources/pc-lg.png)
<https://auto-linked-url.com>`,
  },
  {
    name: 'Code Blocks',
    markdown: `
Inline \`code\` example

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\``,
  },
  {
    name: 'Tables',
    markdown: `
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | More     |
| Row 2    | Info     | Content  |`,
  },
  {
    name: 'Blockquotes',
    markdown: `
> This is a blockquote
> 
> It can span multiple lines
> 
> > And can be nested`,
  },
  {
    name: 'Horizontal Rules',
    markdown: `
Above the line

---

Below the line`,
  },
  {
    name: 'Emojis',
    markdown: `
:smile: 
:heart: 
:thumbsup: 
:rocket: 
:fire:`,
  },
  {
    name: 'Footnotes',
    markdown: `
Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.`,
  },
  {
    name: 'Alerts',
    markdown: `
> [!NOTE]
> This is a note alert

> [!WARNING]
> This is a warning alert

> [!IMPORTANT]
> This is an important alert`,
  },
  {
    name: 'Containers',
    markdown: `
::: info
This is an info container
:::

::: warning
This is a warning container
:::

::: danger
This is a danger container
:::`,
  },
  {
    name: 'Attributes',
    markdown: `
# Header with ID {#custom-id}

Paragraph with class {.custom-class}

[Link with target](https://example.com){target="_blank"}`,
  },
  {
    name: 'HTML',
    markdown: `
<div class="custom-div">
  <p>HTML content is allowed</p>
  <strong>Bold HTML</strong>
</div>`,
  },
  {
    name: 'Tab Content',
    markdown: `
=== "Tab 1"
    Markdown **content**.

    Multiple paragraphs.

=== "Tab 2"
    More Markdown **content**.

    - list item a
    - list item b`,
  },
];

onMounted(async () => {
  await nextTick();

  // Add markdown syntax highlighting to pre elements
  const preElements = document.querySelectorAll('pre.markdown-raw');
  preElements.forEach((pre) => {
    pre.classList.add('shiki-code');
    pre.setAttribute('data-lang', 'markdown');
  });

  highlightCodeBlocks();
  tabEventHydration();
});
</script>

<template>
  <main class="container mx-auto p-6">
    <h1 class="text-25 my-40 text-center font-bold">
      Markdown Syntax Demo
    </h1>

    <div class="space-y-32">
      <div
        v-for="example in examples"
        :key="example.name"
        class="border-abd-base overflow-hidden rounded-lg border"
      >
        <div class="bg-abg-active border-abd-base border-b px-16 py-8">
          <h2 class="text-20 text-primary font-semibold">
            {{ example.name }}
          </h2>
        </div>

        <div class="grid grid-cols-1 gap-0 lg:grid-cols-2">
          <!-- Raw Markdown Column -->
          <div class="border-abd-base border-r">
            <div class="bg-white px-16 py-8 font-medium">
              Raw Markdown
            </div>

            <div class="overflow-hidden p-16">
              <pre
                data-lang="markdown"
                class="shiki vitesse-light border-abd-base overflow-x-scroll rounded-lg border bg-gray-200 p-12"
              >
              <code>{{ example.markdown }}</code>
            </pre>
            </div>
          </div>

          <!-- Rendered Output Column -->
          <div>
            <div class="bg-white px-16 py-8 font-medium">
              Rendered Output (HTML)
            </div>
            <div class="p-16">
              <br>
              <div class="markdown-body" v-html="md.render(example.markdown)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
