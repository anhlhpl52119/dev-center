import type { CSSProperties } from 'vue';

import type { VersionModel } from '@/types/pages/DocModel';

import type {
  CustomIcon,
  GetCatalogEvent,
  HtmlChangedEvent,
  PreviewThemes,
  SettingType,
  StaticTextDefaultKey,
  Themes
} from './type';

export interface mdPreviewProps {
  title: string;
  description: string;
  /**
   * Markdown content.
   */
  modelValue: string;
  /**
   * Last update date
   */
  lastUpdate: string;
  /**
   * URL address
   */
  href: string;
  /**
   * Current version of content-page
   */
  currentVersion: string;
  /**
   * Editor unique identifier
   *
   * @default 'md-editor-v3'
   */
  editorId: string;
  /**
   * List version of content-page
   */
  versioning?: VersionModel[];
  /**
   * Theme; supports light and dark
   *
   * @default 'light'
   */
  theme?: Themes;
  /**
   * Outer class name
   *
   * @default ''
   */
  class?: string;
  /**
   * Default language name
   *
   * @default 'en'
   */
  language?: StaticTextDefaultKey;
  /**
   * Whether the code in the preview displays line numbers
   *
   * @default false
   */
  showCodeRowNumber?: boolean;
  /**
   * Preview content style
   *
   * @default 'default'
   */
  previewTheme?: PreviewThemes;
  /**
   * Editor style
   */
  style?: CSSProperties | string;

  /**
   * Do not use the mermaid
   *
   * @default false
   */
  noMermaid?: boolean;
  /**
   * Not using katex
   *
   * @default false
   */
  noKatex?: boolean;
  /**
   * Code theme
   *
   * @default 'atom'
   */
  codeTheme?: string;
  /**
   * Copy code formatting method
   *
   * @default (text) => text
   */
  formatCopiedText?: (text: string) => string;
  /**
   * The code module background of some preview themes is dark.
   * Setting this property to true will automatically use a dark code style in the light mode of the theme.
   *
   * @default true
   */
  codeStyleReverse?: boolean;
  /**
   * Preview theme that needs to be automatically adjusted
   *
   * @default ['default'; 'mk-cute']
   */
  codeStyleReverseList?: string[];
  noHighlight?: boolean;
  onHtmlChanged?: HtmlChangedEvent;
  onGetCatalog?: GetCatalogEvent;
  noImgZoomIn?: boolean;
  noIconfont?: boolean;
  customIcon?: CustomIcon
}

export interface contentPreviewProps {
  modelValue: string;
  onHtmlChanged?: HtmlChangedEvent;
  onGetCatalog?: GetCatalogEvent;
  setting?: SettingType;
  noMermaid?: boolean;
  noKatex?: boolean;
  formatCopiedText?: (text: string) => string;
  noHighlight?: boolean;
  noImgZoomIn?: boolean;
}
