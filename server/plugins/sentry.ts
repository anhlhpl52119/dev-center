import { getRunTypeConfig } from '@configs/runtime/run-type';
import * as Sentry from '@sentry/node';
import {
  nodeProfilingIntegration
} from '@sentry/profiling-node';
import { H3Error } from 'h3';

import { Environment } from '@/constants/env';

const RUN_TYPE = process.env.RUN_TYPE || 'dev';
const currentEnv = getRunTypeConfig(RUN_TYPE);
const environment = process.env.NODE_ENV;

export default defineNitroPlugin((nitroApp: any) => {
  // const runTypeConfig = true;
  const isEnabled: boolean = true;
  if (!currentEnv.SENTRY_DSN) {
    console.warn('Sentry DSN not set, skipping Sentry initialization');
    return;
  }

  Sentry.init({
    enabled: isEnabled,
    dsn: currentEnv.SENTRY_DSN,
    environment: RUN_TYPE === Environment.Sandbox ? RUN_TYPE : environment,
    integrations: [
      nodeProfilingIntegration()
    ],
    // Performance Monitoring
    tracesSampleRate: 0.1,
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 0.1
  });

  nitroApp.hooks.hook('error', (error: any) => {
    // Do not handle 404s and 422s
    if (error instanceof H3Error) {
      if (error.statusCode === 404 || error.statusCode === 422) {
        return;
      }
    }

    Sentry.captureException(error);
  });

  nitroApp.hooks.hook('request', (event: any) => {
    event.context.$sentry = Sentry;
  });

  nitroApp.hooks.hookOnce('close', async () => {
    await Sentry.close(2000);
  });
});
