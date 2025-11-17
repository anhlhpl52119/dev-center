import { buildI18n } from './locale/build';

interface GetHooksParams {
  useHttps: boolean;
  isProduction: boolean;
  RUN_TYPE: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getHooks = ({ useHttps, isProduction, RUN_TYPE }: GetHooksParams) => ({
  'modules:before': async () => {
    await buildI18n();
  },
  'build:manifest': (manifest: any) => {
    const css = manifest['node_modules/nuxt/dist/app/entry.js']?.css;
    if (css) {
      // start from the end of the array and go to the beginning
      for (let i = css.length - 1; i >= 0; i--) {
        // if it starts with 'entry', remove it from the list
        if (css[i].startsWith('entry')) { css.splice(i, 1); }
      }
    }
  }
});
