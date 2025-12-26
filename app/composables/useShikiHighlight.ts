import { getHighlighter } from '@/plugins/shiki-highlighter.client';

export function useShikiHighlight() {
  const highlightCodeBlocks = async () => {
    if (import.meta.server)
      return;

    const codeBlocks = document.querySelectorAll('pre.shiki-code');
    if (codeBlocks.length === 0)
      return;

    try {
      const highlighter = await getHighlighter();

      codeBlocks.forEach((block) => {
        const lang = block.getAttribute('data-lang') || 'text'; // ref: https://shiki.style/languages
        const code = block.querySelector('code')?.textContent || '';

        try {
          const html = highlighter.codeToHtml(code, {
            lang,
            theme: 'vitesse-light',
          });
          block.outerHTML = html;
        } catch (e) {
          console.warn(`Failed to highlight ${lang}:`, e);
        }
      });
    } catch (e) {
      console.warn('Shiki highlighter failed to load:', e);
    }
  };

  return { highlightCodeBlocks };
}
