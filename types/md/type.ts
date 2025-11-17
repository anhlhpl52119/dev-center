import type { Extension } from '@codemirror/state';
import type { KeyBinding } from '@codemirror/view';
import markdownit from 'markdown-it/lib';

export type Themes = 'light' | 'dark';

export interface CodeCss {
  [key: string]: {
    light: string;
    dark: string;
  };
}

export interface ToolbarTips {
  bold?: string;
  underline?: string;
  italic?: string;
  strikeThrough?: string;
  title?: string;
  sub?: string;
  sup?: string;
  quote?: string;
  unorderedList?: string;
  orderedList?: string;
  task?: string;
  codeRow?: string;
  code?: string;
  link?: string;
  image?: string;
  table?: string;
  mermaid?: string;
  katex?: string;
  revoke?: string;
  next?: string;
  save?: string;
  prettier?: string;
  pageFullscreen?: string;
  fullscreen?: string;
  preview?: string;
  htmlPreview?: string;
  catalog?: string;
  github?: string;
  '-'?: string;
  '='?: string;
}

export interface StaticTextDefaultValue {
  toolbarTips?: ToolbarTips;
  titleItem?: {
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
  };
  imgTitleItem?: {
    link: string;
    upload: string;
    clip2upload: string;
  };
  linkModalTips?: {
    linkTitle?: string;
    imageTitle?: string;
    descLabel?: string;
    descLabelPlaceHolder?: string;
    urlLabel?: string;
    urlLabelPlaceHolder?: string;
    buttonOK?: string;
  };
  clipModalTips?: {
    title?: string;
    buttonUpload?: string;
  };
  copyCode?: {
    text?: string;
    successTips?: string;
    failTips?: string;
  };
  mermaid?: {
    flow?: string;
    sequence?: string;
    gantt?: string;
    class?: string;
    state?: string;
    pie?: string;
    relationship?: string;
    journey?: string;
  };
  katex?: {
    inline: string;
    block: string;
  };
  footer?: {
    markdownTotal: string;
    scrollAuto: string;
  };
}

export interface MermaidTemplate {
  /**
   * Flowchart
   */
  flow?: string;
  /**
   * Sequence diagram
   */
  sequence?: string;
  /**
   * Gantt chart
   */
  gantt?: string;
  /**
   * Class diagram
   */
  class?: string;
  /**
   * State diagram
   */
  state?: string;
  /**
   * Pie chart
   */
  pie?: string;
  /**
   * Relationship diagram
   */
  relationship?: string;
  /**
   * Journey diagram
   */
  journey?: string;
}

export interface MarkdownItConfigPlugin {
  type: string;
  plugin: markdownit.PluginWithParams;
  options: any;
}

export interface ConfigOption {
  /**
   * Internal dependencies for the editor
   */
  editorExtensions: {
    highlight?: {
      instance?: any;
      js?: string;
      css?: CodeCss;
    };
    prettier?: {
      prettierInstance?: any;
      parserMarkdownInstance?: any;

      standaloneJs?: string;
      parserMarkdownJs?: string;
    };
    cropper?: {
      instance?: any;
      js?: string;
      css?: string;
    };
    /**
     * Icons in SVG format
     */
    iconfont?: string;
    /**
     * Icons in class format
     */
    iconfontClass?: string;
    screenfull?: {
      instance?: any;
      js?: string;
    };
    mermaid?: {
      instance?: any;
      js?: string;
    };
    katex?: {
      instance?: any;
      js?: string;
      css?: string;
    };
  };
  editorConfig: {
    /**
     * Customized language for prompts
     */
    languageUserDefined?: { [key: string]: StaticTextDefaultValue };
    /**
     * Custom internal Mermaid module
     */
    mermaidTemplate?: MermaidTemplate;
    /**
     * Input rendering delay (ms)
     */
    renderDelay?: number;
  };
  /**
   * Customize new extensions based on the theme and default internal CodeMirror extensions
   *
   * @params theme Current theme
   * @params innerExtensions List of extensions for the current theme
   * [keymap, minimalSetup, markdown, EditorView.lineWrapping, EditorView.updateListener, EditorView.domEventHandlers, oneDark??oneLight]
   * [key bindings, minimal setup, markdown recognition, line wrapping, update events, DOM event handlers, oneDark theme (dark mode), oneLight (default mode)]
   *
   * @params keyBindings Built-in shortcuts for md-editor-v3
   */
  codeMirrorExtensions: (
    theme: Themes,
    extensions: Array<Extension>,
    keyBindings: Array<KeyBinding>
  ) => Array<Extension>;
  /**
   * Custom extensions and properties for the markdown-it core library
   */
  markdownItConfig: (md: markdownit) => void;
  /**
   * Choose from the editor's preset markdown-it extensions
   *
   * @param plugins Markdown-it extensions with editor-specific properties
   * @returns Updated plugins
   */
  markdownItPlugins: (
    plugins: Array<MarkdownItConfigPlugin>
  ) => Array<MarkdownItConfigPlugin>;
  /**
   * If using internal icons, you can switch between display types
   *
   * To avoid certain issues, such as the support for SVG 'use' element in Shadow DOM
   */
  iconfontType: 'svg' | 'class';
}

/**
 * Preview theme
 *
 * @list ['default']
 */
export type PreviewThemes = string;

export interface StaticTextDefault {
  'en-US': StaticTextDefaultValue;
}

export type StaticTextDefaultKey = keyof StaticTextDefault;

/**
 * Extend the internal functions of the editor, including marked and some internal dependency instances, such as highlight, cropper, etc.
 */
export type Config = (options: Partial<ConfigOption>) => void;

export interface SettingType {
  pageFullscreen?: boolean;
  fullscreen?: boolean;
  preview?: boolean;
  htmlPreview?: boolean;
}

export interface HeadList {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  active?: boolean;
  idAnchor?: string;
}

export type HtmlChangedEvent = (h: string) => void;
export type GetCatalogEvent = (list: HeadList[]) => void;

export type IconName =
  | 'bold'
  | 'underline'
  | 'italic'
  | 'strike-through'
  | 'title'
  | 'sub'
  | 'sup'
  | 'quote'
  | 'unordered-list'
  | 'ordered-list'
  | 'task'
  | 'code-row'
  | 'code'
  | 'link'
  | 'image'
  | 'table'
  | 'revoke'
  | 'next'
  | 'baocun'
  | 'prettier'
  | 'suoxiao'
  | 'fangda'
  | 'fullscreen-exit'
  | 'fullscreen'
  | 'preview'
  | 'coding'
  | 'catalog'
  | 'github'
  | 'mermaid'
  | 'formula'
  | 'close'
  | 'delete'
  | 'upload';

/**
 * Data type of custom icon
 */
export type CustomIcon = {
  [key in IconName]?: {
    // @ts-ignore
    component: Component | JSX.Element | string;
    props?: {
      [key: string | number | symbol]: any;
    };
  };
} & {
  copy?: string;
};

export interface TocItem {
  text: string;
  level: number;
  index: number;
  href: string;
  active?: boolean;
  children?: Array<TocItem>;
}

export interface ExposeEvent {
  pageFullscreen(status: boolean): void;
  fullscreen(status: boolean): void;
  preview(status: boolean): void;
  htmlPreview(status: boolean): void;
  catalog(status: boolean): void;
}

export interface InsertParam {
  // Insert content
  targetValue: string;
  // Whether to select the inserted content
  select?: boolean;
  // Start offset of selected position
  deviationStart?: number;
  // End offset of selected position
  deviationEnd?: number;
}

/**
 * Constructor of inserted content
 */
export type InsertContentGenerator = (selectedText: string) => InsertParam;

/**
 * Universal function type for inserting content
 */
export type Insert = (generate: InsertContentGenerator) => void;

export type FocusOption =
    | 'start'
    | 'end'
    | {
  // Selected starting position, default cursor position
  rangeAnchor?: number;
  // Selected end position, default cursor position
  rangeHead?: number;
  // cursor position
  cursorPos: number;
};

export interface ExposeParam {
  /**
   * Add event listener
   *
   * @param eventName
   * @param callBack
   */
  on<E extends keyof ExposeEvent, C extends ExposeEvent[E]>(
      eventName: E,
      callBack: C
  ): void;

  /**
   * Switch to full screen within the page
   *
   * @param status Whether the page is full screen
   */
  togglePageFullscreen(status?: boolean): void;

  /**
   * Switch screen to full screen
   *
   * @param status Whether the screen is full screen
   */
  toggleFullscreen(status?: boolean): void;

  /**
   * Toggle whether to show preview
   *
   * @param status Whether to show preview
   */
  togglePreview(status?: boolean): void;

  /**
   * Toggle whether to display html preview
   *
   * @param status html preview status
   */
  toggleHtmlPreview(status?: boolean): void;

  /**
   * Switch whether to display the directory
   *
   * @param status Whether to display the directory, if not set the default is the opposite
   */
  toggleCatalog(status?: boolean): void;

  /**
   * trigger save
   */
  triggerSave(): void;

  /**
   * Manually insert content into the text box
   *
   * @param {Function} generate constructs the insert content method
   * The construction method provides the "currently selected" content as an input parameter.
   * Returns "content to be inserted" and inserted attributes
   * Input parameter selectedText currently selected content

   * targetValue content to be inserted
   * select Whether to automatically select content after inserting
   * deviationStart is the starting offset of the selected position after insertion
   * deviationEnd is the end offset of the selected position after insertion
   *
   */
  insert: Insert;

  /**
   * manual focus
   *
   * @param options The position of the cursor when focusing, does not provide the default position when it was last out of focus.
   */
  focus(options?: FocusOption): void;
  /**
   * Manual re-rendering
   */
  rerender(): void;
  /**
   * Get the currently selected text
   */
  getSelectedText(): string | undefined;
  /**
   * Reset existing history
   */
  resetHistory(): void;
}

export type ExposePreviewParam = Pick<ExposeParam, 'rerender'>;

export type EditorEmits = Array<
    | 'onChange'
    | 'onSave'
    | 'onUploadImg'
    | 'onHtmlChanged'
    | 'onGetCatalog'
    | 'onError'
    | 'update:modelValue'
    | 'onBlur'
    | 'onFocus'
    | 'onInput'
    | 'onDrop'
    | 'onInputBoxWitdhChange'
>;
