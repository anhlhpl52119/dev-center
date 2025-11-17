import { isLogin, logout } from '@/utils/AuthUtil';

export default defineNuxtRouteMiddleware(async () => {
  // The purpose of this middleware is to check if the access token is in the correct environment.
  const nuxtApp = useNuxtApp();
  const { authService } = useSeedCore();

  if (process.client && isLogin()) {
    await authService
      .getMemberInfo()
      .then(() => {})
      .catch(() => {
        logout();
        return nuxtApp.runWithContext(() => navigateTo({ name: 'index' }, { external: true }));
      });
  }
});
