import type MarkdownIt from 'markdown-it';
import type { Renderer, Token } from 'markdown-it/index.js';

export default function tableWrapperPlugin(md: MarkdownIt) {
  md.renderer.rules.table_open = (tokens: Token[], idx: number, opts: any, _env: any, self: Renderer) => {
    const htmlRender: string = self.renderToken(tokens, idx, opts);

    return `<div class="overflow-x-scroll mt-8 mb-40"> ${htmlRender}`;
  };

  md.renderer.rules.table_close = (tokens: Token[], idx: number, opts: any, _env: any, self: Renderer) => {
    const htmlRender: string = self.renderToken(tokens, idx, opts);
    return `${htmlRender} </div>`;
  };
}
