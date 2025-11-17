/**
 * Source code comes from https://github.com/docarys/markdown-it-admonition
 */
// import type Renderer from 'markdown-it/lib/renderer';
// import type { ParentType } from 'markdown-it/lib/rules_block/state_block';
// import type StateBlock from 'markdown-it/lib/rules_block/state_block';
// import type Token from 'markdown-it/lib/token';
type Token = any;
type StateBlock = any;
type ParentType = any;
type Renderer = any;
type markdownit = any;
const prefix = 's';

export interface AdmonitionPluginOps {
  marker: string;
}

function AdmonitionPlugin(md: markdownit, options: AdmonitionPluginOps): void {
  options = options || {};

  const markers: number = 3;
  const markerStr: string = options.marker || '!';
  const markerChar: number = markerStr.charCodeAt(0);
  const markerLen: number = markerStr.length;

  let type: string = '';
  let title: string = '';

  const render: Renderer.RenderRule = (tokens: Token[], idx: number, _options: object, _env: any, self: Renderer) => {
    const token: Token = tokens[idx];

    if (token.type === 'admonition_open') {
      tokens[idx].attrPush([
        'class',
        `${prefix}-admonition ${prefix}-admonition-${token.info}`,
      ]);
      tokens[idx].attrSet('data-line', String(tokens[idx].map![0]));
    }
    else if (token.type === 'admonition_title_open') {
      tokens[idx].attrPush(['class', `${prefix}-admonition-title`]);
    }

    return self.renderToken(tokens, idx, _options);
  };

  const validate = (params: string) => {
    const array = params.trim().split(/\s+/, 2);

    title = '';
    type = array[0];
    if (array.length > 1) {
      title = params.substring(type.length + 2);
    }

    if (title === '' || !title) {
      title = type;
    }
  };

  md.block.ruler.before(
    'code',
    'admonition',
    (state: StateBlock, startLine: number, endLine: number, silent: boolean): boolean => {
      let pos;
      let nextLine;
      let token;
      let autoClosed: boolean = false;
      let start: number = state.bMarks[startLine] + state.tShift[startLine];
      let max: number = state.eMarks[startLine];

      // Check out the first character quickly,
      // this should filter out most of non-containers
      //
      if (markerChar !== state.src.charCodeAt(start)) {
        return false;
      }

      // Check out the rest of the marker string
      //
      for (pos = start + 1; pos <= max; pos++) {
        if (markerStr[(pos - start) % markerLen] !== state.src[pos]) {
          break;
        }
      }

      const markerCount: number = Math.floor((pos - start) / markerLen);
      if (markerCount !== markers) {
        return false;
      }
      pos -= (pos - start) % markerLen;

      const markup: string = state.src.slice(start, pos);
      const params: string = state.src.slice(pos, max);

      validate(params);

      // Since start is found, we can report success here in validation mode
      //
      if (silent) {
        return true;
      }

      // Search for the end of the block
      //
      nextLine = startLine;

      for (;;) {
        nextLine++;
        if (nextLine >= endLine) {
          // unclosed block should be autoclosed by end of document.
          // also block seems to be autoclosed by end of parent
          break;
        }

        start = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];

        if (start < max && state.sCount[nextLine] < state.blkIndent) {
          // non-empty line with negative indent should stop the list:
          // - ```
          //  test
          break;
        }

        if (markerChar !== state.src.charCodeAt(start)) {
          continue;
        }

        if (state.sCount[nextLine] - state.blkIndent >= 4) {
          // closing fence should be indented less than 4 spaces
          continue;
        }

        for (pos = start + 1; pos <= max; pos++) {
          if (markerStr[(pos - start) % markerLen] !== state.src[pos]) {
            break;
          }
        }

        // closing adminition fence must be at least as long as the opening one
        if (Math.floor((pos - start) / markerLen) < markerCount) {
          continue;
        }

        // make sure tail has spaces only
        pos -= (pos - start) % markerLen;
        pos = state.skipSpaces(pos);

        if (pos < max) {
          continue;
        }

        // found!
        autoClosed = true;
        break;
      }

      const oldParent: ParentType = state.parentType;
      const oldLineMax: number = state.lineMax;
      // state.parentType = 'admonition';
      // Unknown
      state.parentType = 'root';

      // this will prevent lazy continuations from ever going past our end marker
      state.lineMax = nextLine;

      token = state.push('admonition_open', 'div', 1);
      token.markup = markup;
      token.block = true;
      token.info = type;
      token.map = [startLine, nextLine];

      // admonition title
      token = state.push('admonition_title_open', 'p', 1);
      token.markup = `${markup} ${type}`;
      token.map = [startLine, nextLine];

      token = state.push('inline', '', 0);
      token.content = title;
      token.map = [startLine, state.line - 1];
      token.children = [];

      token = state.push('admonition_title_close', 'p', -1);
      token.markup = `${markup} ${type}`;

      state.md.block.tokenize(state, startLine + 1, nextLine);

      token = state.push('admonition_close', 'div', -1);
      token.markup = state.src.slice(start, pos);
      token.block = true;

      state.parentType = oldParent;
      state.lineMax = oldLineMax;
      state.line = nextLine + (autoClosed ? 1 : 0);

      return true;
    },
    {
      alt: ['paragraph', 'reference', 'blockquote', 'list'],
    },
  );
  md.renderer.rules.admonition_open = render;
  md.renderer.rules.admonition_title_open = render;
  md.renderer.rules.admonition_title_close = render;
  md.renderer.rules.admonition_close = render;
}

export default AdmonitionPlugin;
