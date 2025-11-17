import type { Options } from 'markdown-it/lib';
import markdownit from 'markdown-it/lib';
import Renderer from 'markdown-it/lib/renderer';
import Token from 'markdown-it/lib/token';
import type { Ref } from 'vue';

import type { HeadList } from '@/types/md/type';

export interface HeadingPluginOps extends Options {
  headsRef: Ref<HeadList[]>;
}

const HeadingPlugin = (md: markdownit, options: HeadingPluginOps) => {
  md.renderer.rules.heading_open = (tokens: Token[], idx: number) => {
    const token: Token = tokens[idx];

    const text =
      tokens[idx + 1].children?.reduce((p: any, c: any) => {
        return p + (c.content || '');
      }, '') || '';

    const level = token.markup.length as 1 | 2 | 3 | 4 | 5 | 6;

    if (token?.attrs) {
      const attrsArr = token.attrs;
      let idAnchor;
      const findIdAnchor = attrsArr.find((attribute : [string, string]) => attribute[0] === 'id');
      if (findIdAnchor) {
        idAnchor = findIdAnchor[1];
      }

      options.headsRef.value.push({
        text,
        level,
        idAnchor
      });
    } else {
      options.headsRef.value.push({
        text,
        level
      });
    }

    if (token.map && token.level === 0) {
      token.attrSet('data-line', String(token.map![0]));
      token.attrSet('data-role', 'toc');
    }

    return md.renderer.renderToken(tokens, idx, options);
  };

  md.renderer.rules.heading_close = (tokens : Token[], idx : number, opts : Options, _env : any, self : Renderer) => {
    return self.renderToken(tokens, idx, opts);
  };
};

export default HeadingPlugin;
