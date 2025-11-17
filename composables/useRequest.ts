import type { AxiosRequestConfigModel, AxiosResponseModel, ResponseNormalization } from 'seed-core';

import { DEBUG_API_KEYS } from '@/constants/DebugApi';
import { Environment } from '@/constants/env';

export const useRequest = async <T>(
  url: string,
  option?: AxiosRequestConfigModel,
  key?: string
): Promise<ResponseNormalization<T>> => {
  const config = useRuntimeConfig();
  const RUN_TYPE = config.public.runTypeConfig.RUN_TYPE;

  const debug = ref<boolean>(false);
  const { axiosService } = useSeedCore();
  const { request } = axiosService;

  if (process.client) {
    debug.value = [Environment.Dev, Environment.Dev2].includes(RUN_TYPE as Environment) || Boolean(localStorage.getItem(DEBUG_API_KEYS)) || false;
  }

  const keyUseAsyncData = key || url;

  if (debug.value) {
    return request<T>(url, { isAuth: true, ...option }).then((data: AxiosResponseModel<T>) => {
      return data.data as ResponseNormalization<T>;
    });
  } else {
    const { data, error } = await useAsyncData(keyUseAsyncData, async () => {
      return await request<T>(url, { isAuth: true, ...option })
        .then((data: AxiosResponseModel<T>) => {
          return data.data as ResponseNormalization<T>;
        })
        .catch((error: any) => {
          return Promise.reject(error);
        });
    });
    if (error.value) {
      return Promise.reject(error);
    }
    return data.value as ResponseNormalization<T>;
  }
};
