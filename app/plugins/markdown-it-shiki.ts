import type MarkdownIt from 'markdown-it';
import { createHighlighter } from 'shiki';

let highlighter: any = null;

async function initHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: ['javascript', 'typescript', 'vue', 'html', 'css', 'json', 'bash', 'python', 'java', 'go', 'rust'],
    });
  }
  return highlighter;
}

export default function markdownItShiki(md: MarkdownIt) {
  if (!md.renderer || !md.renderer.rules) {
    return;
  }

  const defaultRender = md.renderer.rules.fence || function (tokens, idx, options, env, renderer) {
    return renderer.renderToken(tokens, idx, options);
  };

  md.renderer.rules.fence = function (tokens, idx, options, env, renderer) {
    const token = tokens[idx]!;
    const info = token.info ? token.info.trim() : '';
    const lang = info.split(/\s+/g)[0];

    if (lang && highlighter) {
      try {
        const code = highlighter.codeToHtml(token.content, {
          lang,
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
        });
        return `<div class="shiki-container">${code}</div>`;
      }
      catch (e) {
        // Fallback
      }
    }

    return `<div class="shiki-container"><pre class="shiki"><code class="language-${lang || 'text'}">${md.utils.escapeHtml(token.content)}</code></pre></div>`;
  };
}

if (process.client) {
  initHighlighter();
}
