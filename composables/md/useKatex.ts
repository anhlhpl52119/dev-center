import { appendHandler } from '@utils/md/dom';
import { onMounted, shallowRef } from 'vue';

import { configOption, katexUrl, prefix } from '@/types/md/config';
import type { contentPreviewProps } from '@/types/md/props';

/**
 * Register katex extension page
 *
 * @param props Content component props
 */
const useKatex = (props: contentPreviewProps) => {
  // Get the corresponding extension configuration link
  const katexConf: {
    instance?: any,
    js?: string,
    css?: string,
  } | undefined = configOption.editorExtensions?.katex;
  const katexIns: any = katexConf?.instance;

  // Is katex loaded?
  const katex = shallowRef(katexIns);

  onMounted((): void => {
    // Tag introduction katex
    if (!props.noKatex && !katex.value) {
      const katexScript: HTMLScriptElement = document.createElement('script');

      katexScript.src = katexConf?.js || katexUrl.js;
      katexScript.onload = (): void => {
        katex.value = window.katex;
      };
      katexScript.id = `${prefix}-katex`;

      const katexLink : HTMLLinkElement = document.createElement('link');
      katexLink.rel = 'stylesheet';
      katexLink.href = katexConf?.css || katexUrl.css;
      katexLink.id = `${prefix}-katexCss`;

      appendHandler(katexScript, 'katex');
      appendHandler(katexLink);
    }
  });

  return katex;
};

export default useKatex;
