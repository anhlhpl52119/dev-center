import * as Sentry from '@sentry/vue';

import { Environment } from '@/constants/env';

// eslint-disable-next-line @typescript-eslint/typedef
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const runtime = useRuntimeConfig();
  const runType = runtime.public.runTypeConfig;
  const isForceSentryOn: boolean = true;
  const releaseName = (() => {
    return `${runType.SENTRY_PROJECT_NAME}-${new Date().toISOString()}`;
  })();
  const environment = process.env.NODE_ENV;
  const RUN_TYPE = process.env.RUN_TYPE || 'dev';

  Sentry.init({
    enabled: isForceSentryOn,
    app: nuxtApp.vueApp,
    environment: RUN_TYPE === Environment.Sandbox ? RUN_TYPE : environment,
    debug: false,
    dsn: runType.SENTRY_DSN,
    release: releaseName,
    integrations: [
      Sentry.browserTracingIntegration({ router })
    ],
    trackComponents: true,
    hooks: ['activate', 'create', 'destroy', 'mount', 'update'],
    tracesSampleRate: 0.1,
    profilesSampleRate: 0.1
  });

  return {
    provide: {
      sentrySetContext: Sentry.setContext,
      sentrySetUser: Sentry.setUser,
      sentrySetTag: Sentry.setTag,
      sentryAddBreadcrumb: Sentry.addBreadcrumb,
      sentryCaptureException: Sentry.captureException
    }
  };
});
