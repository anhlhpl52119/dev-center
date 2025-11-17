import type { ComputedRef } from 'vue';
import { inject, onMounted, shallowRef, watch } from 'vue';

import { configOption, prefix } from '@/types/md/config';
import type { contentPreviewProps } from '@/types/md/props';
import { appendHandler, updateHandler } from '@/utils/md/dom';

/**
 * Register code highlighting extension to the page.
 *
 * @param props Content component props
 */
const useHighlight = (props: contentPreviewProps) => {
  // Get the corresponding extension configuration link
  const hljsConf = configOption.editorExtensions?.highlight;
  const hljs = hljsConf?.instance;
  const highlightUrl = inject('highlight') as ComputedRef<{ js: string; css: string }>;

  // Whether hljs has been provided
  const hljsRef = shallowRef(hljs);

  onMounted(() => {
    // If not highlighting is enforced, do nothing
    if (props.noHighlight) {
      return;
    }

    if (!hljsRef.value) {
      const highlightScript = document.createElement('script');
      highlightScript.src = highlightUrl.value.js;
      highlightScript.onload = () => {
        hljsRef.value = window.hljs;
      };
      highlightScript.id = `${prefix}-hljs`;
      appendHandler(highlightScript, 'hljs');

      const highlightLink = document.createElement('link');
      highlightLink.rel = 'stylesheet';
      highlightLink.href = highlightUrl.value.css;
      highlightLink.id = `${prefix}-hlCss`;

      appendHandler(highlightLink);
    }
  });

  watch(
    () => highlightUrl.value.css,
    (url: string) => {
      updateHandler(`${prefix}-hlCss`, 'href', url);
    }
  );

  return hljsRef;
};

export default useHighlight;
