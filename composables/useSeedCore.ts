import type { ContextModel } from 'seed-core';

export const useSeedCore = () => {
  const { $SeedCoreContext } = useNuxtApp();
  const { axiosService, authService, gdService } = $SeedCoreContext as ContextModel;
  const { globalDomain } = gdService;

  return {
    axiosService,
    authService,
    gdService,
    globalDomain
  };
};
