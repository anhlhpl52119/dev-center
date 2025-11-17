import { getRunTypeConfig } from '@/configs/runtime/run-type';
import type { PublicRunTypeModel } from '@/types/run-type/PublicRunTypeModel';
import type { CookieOptions, CookieRef } from '#app';

export const useCookieWithDomain = <T = string | null | undefined>(
  key: string,
  options?: CookieOptions<T>
): CookieRef<T> => {
  const config = useRuntimeConfig();
  const RUN_TYPE = config.public.runTypeConfig.RUN_TYPE || 'live';
  const { SEED_CORE }: PublicRunTypeModel = getRunTypeConfig(RUN_TYPE);

  return useCookie(key, { ...options, domain: SEED_CORE?.DOMAIN });
};
