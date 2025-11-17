import Renderer from 'markdown-it/lib/renderer';
import Token from 'markdown-it/lib/token';
import type { ComputedRef } from 'vue';

import { prefix } from '@/types/md/config';
import type { Themes } from '@/types/md/type';

const MermaidPlugin = (md: markdownit, options: { themeRef: ComputedRef<Themes> }) => {
  const temp = md.renderer.rules.fence!.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens: Token[], idx : number, ops : object, env : any, slf : Renderer) => {
    const token = tokens[idx];
    const code = token.content.trim();
    if (token.info === 'mermaid') {
      let line;
      if (tokens[idx].map && tokens[idx].level === 0) {
        line = tokens[idx].map![0];
        tokens[idx].attrSet('data-line', String(line));
      }

      // return `<div class="${prefix}-mermaid" ${
      //   line !== undefined ? 'data-line=' + line : ''
      // } data-mermaid-theme=${options.themeRef.value}>${code}</div>`;
      return `<div class="mermaid ${prefix}-mermaid" ${
        line !== undefined ? 'data-line=' + line : ''
      } data-mermaid-theme=${options.themeRef.value}>${code}</div>`;
    }

    return temp!(tokens, idx, ops, env, slf);
  };
};

export default MermaidPlugin;
