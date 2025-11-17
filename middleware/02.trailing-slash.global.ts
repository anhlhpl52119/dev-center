// eslint-disable-next-line @typescript-eslint/typedef
export default defineNuxtRouteMiddleware(({ path, query, hash }) => {
  if (path === '/' || !path.endsWith('/')) { return; }

  const nextPath: string = path.replace(/\/+$/, '') || '/';
  const nextRoute = { path: nextPath, query, hash };

  return navigateTo(nextRoute, { redirectCode: 301 });
});
