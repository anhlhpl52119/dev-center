export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const api = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return {
    provide: {
      api,
    },
  };
});
