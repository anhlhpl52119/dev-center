import type { Extension } from '@codemirror/state';

import type { CodeCss, Config, ConfigOption, MarkdownItConfigPlugin, StaticTextDefault, Themes } from './type';

export const prefix = 'md-editor';

// Editor ID
export const defaultEditorId = 'md-editor-v3';

// Font link
export const iconfontSvgUrl = 'https://at.alicdn.com/t/c/font_2605852_u82y61ve02.js';

export const iconfontClassUrl = 'https://at.alicdn.com/t/c/font_2605852_qm4cjcggwma.css';
export const cdnBase = 'https://cdnjs.cloudflare.com/ajax/libs';

// Code highlighting CDN link
export const highlightUrl = `${cdnBase}/highlight.js/11.7.0/highlight.min.js`;

export const staticTextDefault: StaticTextDefault = {
  'en-US': {
    toolbarTips: {
      bold: 'bold',
      underline: 'underline',
      italic: 'italic',
      strikeThrough: 'strikeThrough',
      title: 'title',
      sub: 'subscript',
      sup: 'superscript',
      quote: 'quote',
      unorderedList: 'unordered list',
      orderedList: 'ordered list',
      task: 'task list',
      codeRow: 'inline code',
      code: 'block-level code',
      link: 'link',
      image: 'image',
      table: 'table',
      mermaid: 'mermaid',
      katex: 'formula',
      revoke: 'revoke',
      next: 'undo revoke',
      save: 'save',
      prettier: 'prettier',
      pageFullscreen: 'fullscreen in page',
      fullscreen: 'fullscreen',
      preview: 'preview',
      htmlPreview: 'html preview',
      catalog: 'catalog',
      github: 'source code'
    },
    titleItem: {
      h1: 'Lv1 Heading',
      h2: 'Lv2 Heading',
      h3: 'Lv3 Heading',
      h4: 'Lv4 Heading',
      h5: 'Lv5 Heading',
      h6: 'Lv6 Heading'
    },
    imgTitleItem: {
      link: 'Add Img Link',
      upload: 'Upload Img',
      clip2upload: 'Clip Upload'
    },
    linkModalTips: {
      linkTitle: 'Add Link',
      imageTitle: 'Add Image',
      descLabel: 'Desc:',
      descLabelPlaceHolder: 'Enter a description...',
      urlLabel: 'Link:',
      urlLabelPlaceHolder: 'Enter a link...',
      buttonOK: 'OK'
    },
    clipModalTips: {
      title: 'Crop Image',
      buttonUpload: 'Upload'
    },
    copyCode: {
      text: 'Copy',
      successTips: 'Copied!',
      failTips: 'Copy failed!'
    },
    mermaid: {
      flow: 'flow',
      sequence: 'sequence',
      gantt: 'gantt',
      class: 'class',
      state: 'state',
      pie: 'pie',
      relationship: 'relationship',
      journey: 'journey'
    },
    katex: {
      inline: 'inline',
      block: 'block'
    },
    footer: {
      markdownTotal: 'Word Count',
      scrollAuto: 'Scroll Auto'
    }
  }
};

export const mermaidUrl = `${cdnBase}/mermaid/10.1.0/mermaid.esm.min.mjs`;

export const katexUrl = {
  js: `${cdnBase}/KaTeX/0.16.3/katex.min.js`,
  css: `${cdnBase}/KaTeX/0.16.3/katex.min.css`
};

export const codeCss: CodeCss = {
  a11y: {
    light: `${cdnBase}/highlight.js/11.7.0/styles/a11y-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.7.0/styles/a11y-dark.min.css`
  },
  atom: {
    light: `${cdnBase}/highlight.js/11.7.0/styles/atom-one-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.7.0/styles/atom-one-dark.min.css`
  },
  github: {
    light: `${cdnBase}/highlight.js/11.7.0/styles/github.min.css`,
    dark: `${cdnBase}/highlight.js/11.7.0/styles/github-dark.min.css`
  },
  gradient: {
    light: `${cdnBase}/highlight.js/11.7.0/styles/gradient-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.7.0/styles/gradient-dark.min.css`
  },
  kimbie: {
    light: `${cdnBase}/highlight.js/11.7.0/styles/kimbie-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.7.0/styles/kimbie-dark.min.css`
  },
  paraiso: {
    light: `${cdnBase}/highlight.js/11.7.0/styles/paraiso-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.7.0/styles/paraiso-dark.min.css`
  },
  qtcreator: {
    light: `${cdnBase}/highlight.js/11.7.0/styles/qtcreator-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.7.0/styles/qtcreator-dark.min.css`
  },
  stackoverflow: {
    light: `${cdnBase}/highlight.js/11.7.0/styles/stackoverflow-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.7.0/styles/stackoverflow-dark.min.css`
  }
};

export const configOption: ConfigOption = {
  editorExtensions: {},
  editorConfig: {},
  codeMirrorExtensions: (_theme: Themes, innerExtensions: Extension[]) => innerExtensions,
  markdownItConfig: () => {
  },
  markdownItPlugins: (s: MarkdownItConfigPlugin[]) => s,
  iconfontType: 'svg'
};

export const config: Config = (option: Partial<ConfigOption>) => {
  if (option) {
    for (const key in option) {
      const optionItem = option[key as keyof ConfigOption] as any;

      if (optionItem) {
        configOption[key as keyof ConfigOption] = optionItem;
      }
    }
  }
};
