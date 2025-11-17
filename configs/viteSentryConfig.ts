import type { SentryVitePluginOptions } from '@sentry/vite-plugin';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { execSync } from 'child_process';

import { getRunTypeConfig } from './runtime/run-type/';

const RUN_TYPE = process.env.RUN_TYPE || 'live';
const isForceSentryOn = true;
const isProduction = process.env.NODE_ENV === 'production';
const currentEnv = getRunTypeConfig(RUN_TYPE);
const releaseName = (() => {
  try {
    return execSync('git describe --abbrev=0 --tags').toString().trim();
  } catch {
    return `${currentEnv.SENTRY_PROJECT_NAME}-${new Date().toISOString()}`;
  }
})();

const sentryOptions: SentryVitePluginOptions = {
  authToken: currentEnv.SENTRY_AUTH_TOKEN,
  org: currentEnv.SENTRY_ORG,
  project: currentEnv.SENTRY_PROJECT_NAME,
  telemetry: false,
  disable: !isForceSentryOn,
  release: {
    name: releaseName,
    inject: true
  },
  debug: isForceSentryOn && !isProduction,
  sourcemaps: {
    filesToDeleteAfterUpload: ['.nuxt/dist/**/*.js.map']
  },
  url: currentEnv.SENTRY_URL
};

export default sentryVitePlugin(sentryOptions);
