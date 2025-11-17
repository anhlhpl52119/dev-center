/**
 * Source code comes from: https://github.com/cncws/markdown-it-codetabs
 *
 * Only adaptation is done here
 *
 * If there are multiple editors in the source code but the content is the same, the content at the beginning of the second one will be a bit confusing.
 * Needs to be bound to the editorId of the editor
 */
import type { Options } from 'markdown-it/lib';
import markdownit from 'markdown-it/lib';
import type { RenderRule } from 'markdown-it/lib/renderer';
import Renderer from 'markdown-it/lib/renderer';
import Token from 'markdown-it/lib/token';

export interface CodeTabsPluginOps extends Options {
  editorId: string;
}

const codetabs = (md: markdownit, _opts: CodeTabsPluginOps) => {
  const defaultRender: RenderRule | undefined = md.renderer.rules.fence;
  const unescapeAll = md.utils.unescapeAll;
  // [group:tab], :tab is optional
  // const re: RegExp = /\[(\w*)(?::([\w ]*))?\]/;
  const re: RegExp = /\[(\w*)(?::([\w ]*))?]/;

  function getInfo(token: Token) {
    return token.info ? unescapeAll(token.info).trim() : '';
  }

  function getGroupAndTab(token: Token): [any, string] {
    const info = getInfo(token);
    // eslint-disable-next-line @typescript-eslint/typedef
    const [group = null, tab = ''] = (re.exec(info) || []).slice(1);
    return [group, tab];
  }

  function getLangName(token: Token) {
    const info: string = getInfo(token);
    return info ? info.split(/(\s+)/g)[0] : '';
  }

  md.renderer.rules.fence = (
    tokens: Token[],
    idx: number,
    options: markdownit.Options,
    env: any,
    slf: Renderer
  ): string => {
    if (tokens[idx].hidden) {
      return '';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [GROUP, _]: [string[] | null, string] = getGroupAndTab(tokens[idx]);
    if (GROUP === null) {
      return defaultRender!(tokens, idx, options, env, slf);
    }

    let token;
    let group;
    let tab;
    let checked;
    let labels : string = '';
    let pres : string = '';
    for (let i : number = idx; i < tokens.length; i++) {
      token = tokens[i];

      [group, tab] = getGroupAndTab(token);
      if (group !== GROUP) {
        break;
      }

      token.info = token.info.replace(re, '');
      token.hidden = true;

      checked = i - idx > 0 ? '' : ' checked';
      labels +=
        `<li><input type="radio" name="label-group-${_opts.editorId}-${idx}"${checked}>` +
        `<label for="group-${_opts.editorId}-${idx}-tab-${
          i - idx
        }" onclick="this.previousElementSibling.click()">${
          tab || getLangName(token)
        }</label></li>\n`;
      pres +=
        `<input type="radio" id="group-${_opts.editorId}-${idx}-tab-${
          i - idx
        }" name="group-${_opts.editorId}-${idx}"${checked}>\n` +
        defaultRender!(tokens, i, options, env, slf);
    }

    return '<div class="code-tabs">\n<ul>\n' + labels + '</ul>\n' + pres + '</div>';
  };
};

export default codetabs;
