import type { ApiEndPoints } from '@/types/api';

export const useAPIEndPoints = (): ApiEndPoints => {
  const runtime = useRuntimeConfig();
  const apiBaseUrl = runtime.public.runTypeConfig.API_BASE_URL;

  return {
    apiBaseGraphQLWikiJs: `${apiBaseUrl}/graphql`
  };
};
