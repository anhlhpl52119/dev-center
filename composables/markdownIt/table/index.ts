import markdownit from 'markdown-it/lib';
import Renderer from 'markdown-it/lib/renderer';
import Token from 'markdown-it/lib/token';

interface TableWrapperPluginOps {
    class: string
}

const TableWrapperPlugin = (md: markdownit, options: TableWrapperPluginOps) => {
  md.renderer.rules.table_open = (tokens: Token[], idx: number, opts: any, _env: any, self: Renderer) => {
    const htmlRender: string = self.renderToken(tokens, idx, opts);

    return `<div class="${options.class}"> ${htmlRender}`;
  };

  md.renderer.rules.table_close = (tokens: Token[], idx: number, opts: any, _env: any, self: Renderer) => {
    const htmlRender: string = self.renderToken(tokens, idx, opts);
    return `${htmlRender} </div>`;
  };
};

export default TableWrapperPlugin;
