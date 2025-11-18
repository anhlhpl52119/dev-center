// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';

import { getHead } from './configs/head';
import { getHooks } from './configs/hook';
import { getI18n } from './configs/i18nConfig';
import { getRuntimeOptions } from './configs/runtime';

const RUN_TYPE = process.env.RUN_TYPE || 'dev';
const isProduction = process.env.NODE_ENV === 'production';

const useHttps = RUN_TYPE !== 'sandbox';
const runTypeConfig = getRuntimeOptions({ RUN_TYPE }).public.runTypeConfig;

// Config CSS
const CSS: string[] = [
  '~/assets/scss/bases/main.scss',
  '~/assets/scss/pages/detail/md.scss',
  '~/assets/scss/style-admin.scss'
];
// Config Source map
const SOURCE_MAP: boolean | { server?: boolean | 'hidden'; client?: boolean | 'hidden' } = {
  client: true,
  server: true
};
// Config Modules
const MODULES: string[] = [
  '@pinia/nuxt',
  '@nuxtjs/i18n',
  'nuxt-simple-sitemap',
  'nuxt-simple-robots',
  '@nuxt/image',
  'nuxt-healthz'
];
// Config Alias
const ALIAS: any = {
  '@apis': resolve(__dirname, './apis'),
  '@assets': resolve(__dirname, './assets'),
  '@components': resolve(__dirname, './components'),
  '@composables': resolve(__dirname, './composables'),
  '@configs': resolve(__dirname, './configs'),
  '@constants': resolve(__dirname, './constants'),
  '@enum': resolve(__dirname, './enum'),
  '@layouts': resolve(__dirname, './layouts'),
  '@locales': resolve(__dirname, './locales'),
  '@mappers': resolve(__dirname, './mappers'),
  '@middleware': resolve(__dirname, './middleware'),
  '@mock': resolve(__dirname, './mock'),
  '@modules': resolve(__dirname, './modules'),
  '@pages': resolve(__dirname, './pages'),
  '@plugins': resolve(__dirname, './plugins'),
  '@server': resolve(__dirname, './server'),
  '@services': resolve(__dirname, './services'),
  '@stores': resolve(__dirname, './stores'),
  '@types': resolve(__dirname, './types'),
  '@utils': resolve(__dirname, './utils'),
  '@graphql': resolve(__dirname, './graphql')
};

export default defineNuxtConfig({
  ssr: true,
  spaLoadingTemplate: true,
  site: {
    url: runTypeConfig.SITE_URL,
    name: runTypeConfig.SITE_NAME
  },
  devtools: { enabled: RUN_TYPE === 'dev' },
  modules: [...MODULES],
  healthz: {
    path: '/api/healthz'
  },
  css: [...CSS],
  alias: { ...ALIAS },
  sourcemap: { ...SOURCE_MAP },
  experimental: { localLayerAliases: true },
  hooks: getHooks({ useHttps, isProduction, RUN_TYPE }),
  runtimeConfig: getRuntimeOptions({ RUN_TYPE }),
  i18n: getI18n(),
  app: { head: getHead(RUN_TYPE) },
  devServer: {
    https: true,
    host: '0.0.0.0' // expose to local network (LAN)
  },
  /** External Configuration **/
  vite: {
    build: {
      sourcemap: true,
      rollupOptions: {
        context: 'window'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "@/assets/scss/foundations/_variables.scss" as *; @import "@/assets/scss/foundations/mixins/_breakpoints.scss";'
        }
      }
    },
    server: {
      fs: {
        allow: ['..']
      }
    }
  },
  nitro: {
    prerender: {
      failOnError: true
    },
    compressPublicAssets: true,
    rollupConfig: {
      context: 'window'
    }
  },
  routeRules: {
    '/docs/common/search': { redirect: '/common/search' }
  },
  image: {
    domains: ['.onstove.com']
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          '@': ['.'],
          '@/*': ['./*']
        }
      }
    }
  }
});
