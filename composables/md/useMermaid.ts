import LRUCache from 'lru-cache';
import type { ComputedRef } from 'vue';
import { inject, nextTick, onMounted, shallowRef, watch } from 'vue';

import { configOption, mermaidUrl } from '@/types/md/config';
import type { contentPreviewProps } from '@/types/md/props';
import { uuid } from '@/utils/md';
import { appendHandler } from '@/utils/md/dom';

/**
 * Register the Katex extension for the page.
 *
 */
const useMermaid = (props: contentPreviewProps) => {
  const theme = inject('theme') as ComputedRef<string>;
  const { editorExtensions } = configOption;
  const mermaidConf = editorExtensions?.mermaid;

  const mermaidRef = shallowRef(mermaidConf?.instance);
  const reRenderRef = shallowRef(-1);

  const mermaidCache = new LRUCache({
    max: 1000,
    // Cache for 10 minutes
    ttl: 600000
  });

  const setMermaidTheme = () => {
    const mermaid = mermaidRef.value;

    if (!props.noMermaid && mermaid) {
      mermaid.initialize({
        startOnLoad: false,
        theme: theme.value === 'dark' ? 'dark' : 'default'
      });
      reRenderRef.value = reRenderRef.value + 1;
    }
  };

  watch(
    () => theme.value,
    () => {
      mermaidCache.clear();
      setMermaidTheme();
    }
  );

  onMounted(() => {
    if (props.noMermaid) {
      return;
    }

    // If an instance is not provided, introduce Mermaid
    if (!mermaidConf?.instance) {
      const jsSrc = mermaidConf?.js || mermaidUrl;

      if (/\.mjs/.test(jsSrc)) {
        import(
          /* @vite-ignore */
          /* webpackIgnore: true */
          jsSrc
        ).then((module: any) => {
          mermaidRef.value = module.default;
          setMermaidTheme();
        });
      } else {
        const mermaidScript = document.createElement('script');
        // mermaidScript.id = `${prefix}-mermaid`;
        mermaidScript.id = 'mermaid';
        mermaidScript.src = jsSrc;

        mermaidScript.onload = () => {
          mermaidRef.value = window.mermaid;
          setMermaidTheme();
        };

        appendHandler(mermaidScript, 'mermaid');
      }
    }
  });

  const replaceMermaid = () => {
    nextTick(() => {
      if (!props.noMermaid && mermaidRef.value) {
        // const mermaidSourceEles = document.querySelectorAll<HTMLElement>(
        //   `div.${prefix}-mermaid`
        // );
        const mermaidSourceEles = document.querySelectorAll<HTMLElement>(
          'div.mermaid'
        );

        const svgContainingElement = document.createElement('div');
        svgContainingElement.style.width = document.body.offsetWidth + 'px';
        svgContainingElement.style.height = document.body.offsetHeight + 'px';
        svgContainingElement.style.position = 'fixed';
        svgContainingElement.style.zIndex = '-10000';
        svgContainingElement.style.top = '-10000';

        let count = mermaidSourceEles.length;

        if (count > 0) {
          document.body.appendChild(svgContainingElement);
        }

        mermaidSourceEles.forEach(async (item: HTMLElement): Promise<void> => {
          let mermaidHtml = mermaidCache.get(item.innerText) as string;

          if (!mermaidHtml) {
            const idRand = uuid();
            // Render asynchronously for version 9, or use render for version 10
            const render = mermaidRef.value.renderAsync || mermaidRef.value.render;
            let svg: { svg: string } | string = '';
            try {
              svg = await render(idRand, item.innerText, svgContainingElement);
            } catch (error) {
              // console.error(error);
            }

            // For version 9:10
            mermaidHtml = typeof svg === 'string' ? svg : svg.svg;
            mermaidCache.set(item.innerText, mermaidHtml);
          }

          const p = document.createElement('p');
          // p.className = `${prefix}-mermaid`;
          p.className = 'mermaid';
          p.setAttribute('data-processed', '');
          p.innerHTML = mermaidHtml;

          if (item.dataset.line !== undefined) {
            p.dataset.line = item.dataset.line;
          }

          item.replaceWith(p);

          if (--count === 0) {
            svgContainingElement.remove();
          }
        });
      }
    });
  };

  return {
    mermaidRef,
    reRenderRef,
    replaceMermaid
  };
};

export default useMermaid;
