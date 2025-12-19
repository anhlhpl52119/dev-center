import type MarkdownIt from 'markdown-it';

export default function tableWrapperPlugin(md: MarkdownIt) {
  md.renderer.rules.table_open = (tokens, idx, options, env, self) => {
    return `
      <div class="relative my-10 w-full" data-table-wrapper>
        <div class="shadow-l pointer-events-none absolute rounded-tl-lg inset-y-0 left-0 bottom-7 w-20 z-10 transition-opacity duration-300 opacity-0 sentinel-shadow-left"></div>
        <div class="shadow-r pointer-events-none absolute inset-y-0 rounded-tr-lg right-0 w-20 bottom-7 z-10 transition-opacity duration-300 opacity-0 sentinel-shadow-right"></div>

        <div class="scroll-container overflow-x-auto w-full rounded-lg">
          <div class="flex w-max min-w-full items-stretch">
            <div class="sentinel-l w-1"></div>
            ${self.renderToken(tokens, idx, options)}
    `;
  };

  md.renderer.rules.table_close = (tokens, idx, options, env, self) => {
    return `
            ${self.renderToken(tokens, idx, options)}
            <div class="sentinel-r w-1"></div>
          </div>
        </div>
      </div>
    `;
  };
}
