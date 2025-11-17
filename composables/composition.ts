import { DEFAULT_LOCALE } from '@constants/Locale';
import { appendHandler } from '@utils/md/dom';
import { computed, provide } from 'vue';

import {
  codeCss,
  configOption,
  highlightUrl,
  iconfontClassUrl,
  iconfontSvgUrl,
  prefix,
  staticTextDefault
} from '@/types/md/config';
import type { mdPreviewProps } from '@/types/md/props';

/**
 * Extract the component global properties that the preview component needs to provide
 *
 * @param props Preview component props
 */
// Todo props
export const useProvidePreview = (props: mdPreviewProps) => {
  const { editorId } = props;
  const highlightConfig = configOption?.editorExtensions?.highlight;

  provide('editorId', editorId);

  provide(
    'theme',
    computed(() => props.theme)
  );

  provide(
    'language',
    computed(() => props.language)
  );

  // Inject highlight source
  provide(
    'highlight',
    computed(() => {
      // Alternative list
      const cssList: any = {
        ...codeCss,
        ...highlightConfig?.css
      };

      const theme =
        props.codeStyleReverse &&
        props.previewTheme &&
        props.codeStyleReverseList?.includes(props.previewTheme)
          ? props.theme || 'dark'
          : 'dark';

      const codeTheme = props?.codeTheme ?? 'atom';

      return {
        js: highlightConfig?.js || highlightUrl,
        css: cssList[codeTheme]
          ? cssList[codeTheme][theme]
          : codeCss.atom[theme]
      };
    })
  );

  // Inject code row number control
  provide('showCodeRowNumber', props.showCodeRowNumber);

  // Inject language settings
  const usedLanguageText = computed(() => {
    const allText: any = {
      ...staticTextDefault,
      ...configOption?.editorConfig?.languageUserDefined
    };

    const language = props.language ?? DEFAULT_LOCALE;

    return allText[language];
  });

  provide('usedLanguageText', usedLanguageText);

  // Provide preview theme
  provide(
    'previewTheme',
    computed(() => props.previewTheme)
  );

  // // Custom icons combined with defaults
  provide(
    'customIcon',
    computed(() => props?.customIcon ?? {})
  );
};

/**
 * Extract the scripts that need to be embedded in the preview component
 *
 * @param props MdPreviewProps
 */
// Todo @MdPreviewProps
export const useExpansionPreview = (props: mdPreviewProps) => {
  onMounted(() => {
    if (!props.noIconfont) {
      // icon
      if (configOption.iconfontType === 'svg') {
        const iconfontScript = document.createElement('script');
        iconfontScript.src = configOption.editorExtensions?.iconfont || iconfontSvgUrl;
        iconfontScript.id = `${prefix}-icon`;

        appendHandler(iconfontScript);
      } else {
        const iconfontLink = document.createElement('link');
        iconfontLink.rel = 'stylesheet';
        iconfontLink.href =
          configOption.editorExtensions?.iconfontClass || iconfontClassUrl;
        iconfontLink.id = `${prefix}-icon-class`;

        appendHandler(iconfontLink);
      }
    }
  });
};
