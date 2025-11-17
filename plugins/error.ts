import { useNuxtApp } from '#app';

export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp();
  nuxtApp.hook('vue:error', async (error: any) => {
    errorLog('vue:error', error);
  });
  nuxtApp.hook('app:error', (..._args: any[]) => {
    errorLog('app:error', _args);
  });
  nuxtApp.vueApp.config.errorHandler = (..._args: any[]) => {
    errorLog('global error handler', _args);
  };
});
