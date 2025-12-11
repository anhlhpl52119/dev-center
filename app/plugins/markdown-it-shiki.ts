import type MarkdownIt from 'markdown-it';

export default function markdownItShiki(md: MarkdownIt) {
  if (!md.renderer || !md.renderer.rules)
    return;

  md.renderer.rules.fence = function (tokens, idx) {
    const token = tokens[idx]!;
    const info = token.info ? token.info.trim() : '';
    const lang = info.split(/\s+/g)[0] || 'bash';

    return `<pre class="shiki-code" data-lang="${lang}"><code>${md.utils.escapeHtml(token.content)}</code></pre>`;
  };
}
